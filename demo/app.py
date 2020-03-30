
from flask import Flask, escape, url_for, render_template, request
from cjio import cityjson
import json
import os

app = Flask(__name__)

jindex = json.loads(open('./datasets/index.json').read())
PATHDATASETS = './datasets/'

#-- errors
JINVALIDFORMAT     = {"code": "InvalidParameterValue", "description": "Invalid format"}
JINVALIDCOLLECTION = {"code": "InvalidParameterValue", "description": "Invalid feature collection"}
JINVALIDIDENTIFIER = {"code": "NotFound", "description": "identifier not found"}


@app.route('/', methods=['GET'])
def root():
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        return render_template("root.html")
    elif re == 'json':
        return render_template("todo.html")
    else:
        return JINVALIDFORMAT


@app.route('/collections/', methods=['GET']) #-- html/json
def collections():
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        return render_template("collections.html", datasets=jindex['collections'])
    elif re == 'json':
        return jindex
    else:
        return JINVALIDFORMAT



@app.route('/collections/<dataset>/', methods=['GET']) #-- html/json
def collection(dataset):
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        for each in jindex['collections']:
            if each['id'] == dataset:
                return render_template("collection.html", dataset=each)
        return JINVALIDFORMAT
    elif re == 'json':
        for each in jindex['collections']:
            if each['id'] == dataset:
                return each
        return JINVALIDCOLLECTION
    else:
        return JINVALIDFORMAT


# http://data.example.org/collections/buildings/items.json?limit=50&offset=50
@app.route('/collections/<dataset>/items/', methods=['GET']) #-- html/json/bbox/limit/offset
def items(dataset):
    #-- fetch the dataset, invalid if not found
    cm = getcm(dataset)
    if cm == None:
        return JINVALIDCOLLECTION
    #-- bbox
    re_bbox = request.args.get('bbox', None) # TODO : only 2D bbox? I'd say yes, but should be discussed...
    if re_bbox is not None:
        r = re_bbox.split(',')
        if len(r) != 4:
            return JINVALIDFORMAT
        try:
            b = list(map(float, r))
        except:
            return JINVALIDFORMAT
        cm = cm.get_subset_bbox(bbox=b, exclude=False)
    #-- bbox
    re_bbox = request.args.get('bbox', None) # TODO : only 2D bbox? I'd say yes, but should be discussed...
    if re_bbox is not None:
        r = re_bbox.split(',')
        if len(r) != 4:
            return JINVALIDFORMAT
        try:
            b = list(map(float, r))
        except:
            return JINVALIDFORMAT
        cm = cm.get_subset_bbox(bbox=b, exclude=False)
    #-- bbox
    re = request.args.get('limit', None)
    if re is None:
        re_limit = 10
    else:
        re_limit = int(re)
    #-- offset
    re = request.args.get('offset', None)
    if re is None:
        re_offset = 0
    else:
        re_offset = int(re)
    #-- html/json        
    theids = cm.get_ordered_ids_top_co(limit=re_limit, offset=re_offset)
    cm = cm.get_subset_ids(theids, exclude=False)
    re_f = request.args.get('f', None)
    if re_f == 'html' or re_f is None:
        return render_template("items.html", datasetname=dataset, jcm=cm.j['CityObjects'])
    elif re_f == 'json':
        return cm.j
    else:
        return JINVALIDFORMAT


@app.route('/collections/<dataset>/items/<featureID>/', methods=['GET']) #-- html/json
def item(dataset, featureID):
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        cm = getcm(dataset)
        if cm == None:
            return JINVALIDFORMAT
        else:
            if featureID not in cm.j['CityObjects']:
                return JINVALIDIDENTIFIER
            f = cm.get_subset_ids([featureID], exclude=False).j
            if 'metadata' in f:
                del f['metadata']
            if 'version' in f:
                del f['version']
            if 'extensions' in f:
                del f['extensions']
            f['type'] = 'CityJSONFeature'
            f['id'] = featureID
            return render_template("item.html", jitem=f, datasetname=dataset)
    elif re == 'json':
        cm = getcm(dataset)
        if cm == None:
            return JINVALIDFORMAT
        else:
            if featureID not in cm.j['CityObjects']:
                return JINVALIDIDENTIFIER
            f = cm.get_subset_ids([featureID], exclude=False).j
            if 'metadata' in f:
                del f['metadata']
            if 'version' in f:
                del f['version']
            if 'extensions' in f:
                del f['extensions']
            f['type'] = 'CityJSONFeature'
            f['id'] = featureID
            return f
    else:
        return JINVALIDFORMAT


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

def getcm(filename):
    p = PATHDATASETS + filename + '.json'
    if os.path.isfile(p) == False:
        return None
    f = open(p)
    return cityjson.reader(file=f, ignore_duplicate_keys=True)


@app.route('/collections/<dataset>/visualise/', methods=['GET'])
def visualise(dataset):
    for each in jindex['collections']:
        if each['id'] == dataset:
            return render_template("visualise.html", dataset = dataset)
    return JINVALIDFORMAT


@app.route('/stream/', methods=['GET'])
def stream():
    dataset = request.args.get('dataset', None)
    f = open(PATHDATASETS + dataset + ".json", "r")
    cj = json.loads(f.read())
    
    # line-delimited JSON generator
    def generate():
        if cj['type'] == "CityJSONCollection":
            for k, v in cj.items():
                if k == "features":
                    for feature in cj[k]:
                        feature = str(feature)
                        yield '{}\n'.format(feature)
                else:
                    yield '{}\n'.format({k: v})
        elif cj['type'] == "CityJSON":
            cm = str(cj)
            yield '{}\n'.format(cm)
            
            
    f.close()
            
    return app.response_class(generate(), mimetype='application/json')


# @app.route('/<filename>/download/')
# def cmd_download(filename):
#     cm = getcm(filename)
#     if cm == None:
#         return render_template("wrongdataset.html")
#     else:        
#         return cm.j


# @app.route('/<filename>/')
# def cmd_info(filename):
#     cm = getcm(filename)
#     if cm == None:
#         return render_template("wrongdataset.html")
#     else:        
#         i = cm.get_info()
#         return json.loads(i)


# @app.route('/<filename>/subset/random/<number>/')
# def cmd_subset_random(filename, number):
#     cm = getcm(filename)
#     if cm == None:
#         return render_template("wrongdataset.html")
#     else:        
#         cm2 = cm.get_subset_random(number=int(number), exclude=False)
#         return cm2.j


# @app.route('/<filename>/subset/bbox/<minx>/<miny>/<maxx>/<maxy>/')
# def cmd_subset_bbox(filename, minx, miny, maxx, maxy):
#     cm = getcm(filename)
#     if cm == None:
#         return render_template("wrongdataset.html")
#     else:        
#         cm2 = cm.get_subset_bbox(bbox=mybbox, exclude=False)
#         return cm2.j


# @app.route('/<filename>/subset/cotype/<thecotype>/')
# def cmd_subset_cotype(filename, thecotype):
#     cm = getcm(filename)
#     if cm == None:
#         return render_template("wrongdataset.html")
#     else:        
#         cm2 = cm.get_subset_cotype(cotype=thecotype, exclude=False)
#         return cm2.j


    
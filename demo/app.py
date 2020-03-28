
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


@app.route('/collections/', methods=['GET'])
def collections():
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        return render_template("collections.html", datasets=jindex['collections'])
    elif re == 'json':
        return jindex
    else:
        return JINVALIDFORMAT



@app.route('/collections/<dataset>/', methods=['GET'])
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



@app.route('/collections/<dataset>/items/', methods=['GET'])
def items(dataset):
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        return render_template("todo.html")
    elif re == 'json':
        cm = getcm(dataset)
        if cm == None:
            return JINVALIDCOLLECTION
        else:        
            return cm.j
    else:
        return JINVALIDFORMAT


@app.route('/collections/<dataset>/items/<featureID>/', methods=['GET'])
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
            return render_template("item.html", jitem=f)
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
    cjc = json.loads(f.read())
    
    # line-delimited JSON generator
    def generate():
        for feature in cjc["features"]:
            feature = str(feature)
            yield '{}\n'.format(feature)
            
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


    
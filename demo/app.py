
from flask import Flask, escape, url_for, render_template, request
from cjio import cityjson
import json
import os

app = Flask(__name__)

PATHDATASETS = './datasets/'
JINVALIDFORMAT = {"code": "InvalidParameterValue", "description": "Invalid format"}

jindex = json.loads(open('./datasets/index.json').read())

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
        return JINVALIDFORMAT



@app.route('/collections/<dataset>/items/', methods=['GET'])
def items(dataset):
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        return render_template("todo.html")
    elif re == 'json':
        cm = getcm(dataset)
        if cm == None:
            return render_template("wrongdataset.html")
        else:        
            return cm.j


@app.route('/collections/<dataset>/items/<identifier>/', methods=['GET'])
def item(dataset, identifier):
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        return render_template("todo.html")
    elif re == 'json':
        cm = getcm(dataset)
        if cm == None:
            return JINVALIDFORMAT
        else:        
            return cm.j


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

def getcm(filename):
    p = PATHDATASETS + filename + '.json'
    if os.path.isfile(p) == False:
        return None
    f = open(p)
    return cityjson.reader(file=f, ignore_duplicate_keys=True)


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


    
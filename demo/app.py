
from flask import Flask, escape, url_for, render_template, request
from cjio import cityjson
import json
import os

PATHDATASETS = './datasets/'
JINVALIDFORMAT = {"code": "InvalidParameterValue", "description": "Invalid format"}

def getcm(filename):
    p = PATHDATASETS + filename + '.json'
    if os.path.isfile(p) == False:
        return None
    f = open(p)
    return cityjson.reader(file=f, ignore_duplicate_keys=True)


app = Flask(__name__)

@app.route('/', methods=['GET'])
def root():
    re = request.args.get('f', None)
    if re == 'html' or re is None:
        return render_template("root.html", datasets=os.listdir(PATHDATASETS))
    elif re == 'json':
        j = {}
        j["hugo"] = "ledoux"
        return j
    else:
        return JINVALIDFORMAT


@app.route('/collections/', methods=['GET'])
def collections():
    return render_template("root.html", datasets=os.listdir(PATHDATASETS))

@app.route('/collections/<filename>/')
def collection(filename):
    cm = getcm(filename)
    if cm == None:
        return render_template("wrongdataset.html")
    else:        
        return cm.j


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404



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


    
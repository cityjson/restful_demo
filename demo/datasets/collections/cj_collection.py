import glob
import json
from cjio import cityjson

#files = glob.glob('subsets/*.json')
dataset = "montreal"
file = "../" + dataset + ".json"

cjc = {"type": "CityJSONCollection",
       "bbox": [],
       "features": []}

#for file in files:
with open(file, "r") as f:
    cm = cityjson.reader(file=f, ignore_duplicate_keys=True)
    try:
        cjc["bbox"] = cm.j["metadata"]["geographicalExtent"]
    except:
        cjc["bbox"] = cm.calculate_bbox()
    for co in cm.j["CityObjects"]:
        cjf = {}
        cjf["type"] = "CityJSONFeature"
        cjf["id"] = co
        feature = cm.get_subset_ids([cjf["id"]], exclude=False).j
        cjf["CityObjects"] = feature["CityObjects"]
        cjf["vertices"] = feature["vertices"]
        cjc["features"].append(cjf)
        

with open(dataset + "_collection.json", "w") as f:
    f.write(json.dumps(cjc))
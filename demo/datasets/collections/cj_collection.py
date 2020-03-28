import glob
import json

files = glob.glob('subsets/*.json')

collection = {"type": "CityJSONCollection",
              "features": []}

for file in files:
    with open(file, "r") as f:
        feature = json.loads(f.read())
        cjf = {}
        cjf["type"] = "CityJSONFeature"
        cjf["id"] = list(feature["CityObjects"].keys())[0]
        cjf["CityObjects"] = feature["CityObjects"]
        cjf["vertices"] = feature["vertices"]
        collection["features"].append(cjf)

with open("delft_collection.json", "w") as f:
    f.write(json.dumps(collection))
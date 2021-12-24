import glob
import json

cms = glob.glob('*.json')
try:
    cms.remove('index.json')
except:
    pass


j = {}
j["collections"] = []

for cm in cms:
    ji = {}
    ji['id'] = cm[:-10]
    jcm = json.loads(open(cm).read())


    ji['itemType'] = "feature"
    if 'metadata' in jcm and 'title' in jcm['metadata']: 
        ji['title'] = jcm['metadata']['title']
    else:
        ji['title'] = ""
    j['collections'].append(ji)

f = open("index.json", "w")
f.write(json.dumps(j, indent=2))
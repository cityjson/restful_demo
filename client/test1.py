
import requests
import json

r = requests.get('http://localhost:5000/collections/denhaag/stream/', stream=True)

count = 0
for line in r.iter_lines():
    print("=====>%d" % count)
    count += 1
    # print (line)
    j = json.loads(line.decode('utf-8'))
    for f in j['CityObjects']:
        print("%s--%s" % (j['CityObjects'][f]['type'], j['id']))
    # break



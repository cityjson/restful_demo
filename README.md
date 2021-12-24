# CityJSON + RESTful access + streaming


This is a small demo implementation of the [streaming capabilities of CityJSON v1.1](https://www.cityjson.org/specs/1.1.0/#text-sequences-and-streaming-with-cityjsonfeature).

It's a simple RESTful access to a few CityJSON files, implemented with a [Flask](https://palletsprojects.com/p/flask/) server.
[cjio](https://github.com/cityjson/cjio) must be installed too to be run (v0.8+).



## Demo

In `/demo/` the code of the server is there.
There are a few CityJSON datasets in one folder, and then the behaviour of [pygeoapi](https://demo.pygeoapi.io/stable) has been more or less copied.

It's not finished (OpenAPI and conformance are TODO), but it works and shows the idea are implementable.

[-->demo is hosted online for a few users](http://hugoledoux.pythonanywhere.com/) (if 1000s of you go there at the same time it might not work 😬)


## Streaming

The same hack as used by everyone: [Line-delimited JSON](https://en.m.wikipedia.org/wiki/JSON_streaming#Line-delimited_JSON): one JSON object per line, that is separated by a CR.
There's a standard for it too: https://tools.ietf.org/html/rfc7464

Called [GeoJSON Text Sequences](https://tools.ietf.org/html/rfc8142) also.

In the demo, if you add `/stream` after a collection, you get a stream of `CityJSONFeature` (type is `json-seq`), with the first line containing the metadata and other data useful for the whole data (`cjio myfile.city.json export --format jsonl` is used):

http://hugoledoux.pythonanywhere.com/collections/tudelft/stream/


## Demo online

[-->demo](http://hugoledoux.pythonanywhere.com/)


## To run locally

__Watch out, [cjio](https://github.com/cityjson/cjio) must use v0.8+ otherwise nothing will work__

```bash
$ env FLASK_APP=app.py flask run
```

In debug mode:
```bash
$ env FLASK_APP=app.py FLASK_ENV=development flask run
```

## API examples

1. `/collections/` -> HTML/JSON of all datasets
1. `/collections/{mycollection}/` -> overview of dataset (metadata [bbox, CRS], version CityJSON, extensions)
1. `/collections/{mycollection}/items/` -> a CityJSON object
1. `/collections/{mycollection}/items/{featureID}/` -> one CityJSONFeature (which can contain sub-parts, like `BuildingPart`)

If many Features must be returned, like all objects inside a bbox, then a CityJSON is returned (equivalent to a FeatureCollection.


## Some examples of URL queries

```
http://localhost:5000/collections/tudelft/items/?limit=5&offset=10
```

```
http://localhost:5000/collections/tudelft/stream/
```

```
http://localhost:5000/collections/tudelft/items/?f=json
```

```
http://localhost:5000/collections/tudelft/items/?bbox=1.2,44.9,55.0,1909.1
```
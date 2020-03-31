
# CityJSON & OGC API -- Features (formely known as WFS3)

Here are some thoughts, and a concrete proposal, on making CityJSON "work" with [OGC API--Features](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html) ([GitHub repo](https://github.com/opengeospatial/ogcapi-features)).

The most frequent criticism related to CityJSON is "yeah but we cannot *stream* it, and OGCAPIF is impossible, look at the global list of vertices!".

I don't think the that list is the major problem, more the fact that OGCAPIF wasn't designed (its core at least) for complex models in 3D where features are linked to each other and where there are appearances and metadata and etc.


## How is OGCAPIF currently implemented?

The main demo is [pygeoapi](https://demo.pygeoapi.io) and the main encoding is GeoJSON.
This means:

  - for 2D geometries only
  - only for Simple Features, without textures/material
  - only one geometry per feature
  - GeoJSON is the recommended format, along with HTML (webpage with map and some nice info to click). 
  - GML is "supported", but there is no enthusiasm about it in the specs...
  - no support for structured metadata, there can be a link to an arbitray HTML page
  - CRS must be WGS84 (but others will be added in the future)

Hovewer, the OGCAPIF specifications are not restricted to the above: 3D geometries and complex encodings can be supported by the API.

Fitting CityJSON--even with its list of vertices--is in my opinion not a problem.
This is rather easy to solve, as I show below.


## A proposal to make CityJSON OGCAPIF-compliant

### What is a FeatureCollection?

It's a collection of features, so a CityJSON object is technically exactly this.

### What is a Feature?

This is more tricky, clearly one `Building` is one. 
But if that `Building` has 3 children (2 `BuildingPart`s and 1 `BuildingInstallation`), do we have 1 or 4 Features?

I would argue 1.
If a user requests the `Building` (by its ID), they get the 4 features.
If a user requests the ID of one `BuildingPart`, do they get the parent too or only the `BuildingPart` (which becomes a Feature then)?
This is up to discussion.


### Proposal

1. CityJSON stays as it is, with the global list of vertices
1. a CityJSON object is a FeatureCollection
1. the `"transform"` property should not be allowed, to ensure that one unambiguous CRS is used
1. to represent one Feature, a new type `CityJSONFeature` is introduced; almost the same as CityJSON

  - `"transform"` not allowed
  - `"version"` not present: in the collection or as metadata
  - `"metadata"` not present: in the metadata of the collection
  - `"geometry-templates"` not present: those should be resolved/dereferenced
  - `"extensions"` not present: in the metadata or collection


```json
{
  "type": "CityJSONFeature",
  "id": "myid", //-- to clearly identify which of the CityObjects is the "main" one
  "CityObjects": {},
  "vertices": [],
  "appearance": {},
}
```

### API examples

1. `/collections/` -> HTML/JSON of all datasets
1. `/collections/{mycollection}/` -> overview of dataset (metadata [bbox, CRS], version CityJSON, extensions)
1. `/collections/{mycollection}/items/` -> a CityJSON object
1. `/collections/{mycollection}/items/{featureID}/` -> one CityJSONFeature (which can contain sub-parts, like `BuildingPart`)

If many Features must be returned, like all objects inside a bbox, then a CityJSON is returned (equivalent to a FeatureCollection.


### Streaming

The same hack as used by everyone: [Line-delimited JSON](https://en.m.wikipedia.org/wiki/JSON_streaming#Line-delimited_JSON): one JSON object per line, that is separated by a CR.

Called [GeoJSON Text Sequences](https://tools.ietf.org/html/rfc8142) also.

So each line can be either a CityJSON or a CityJSONFeature, inline with OGCAPIF specs.


### Demo

In `/demo/` there's a simple [Flask](https://palletsprojects.com/p/flask/) server that can be run locally, and [cjio](https://github.com/cityjson/cjio) must be installed too (watch out, the "develop" branch!) to be run.

There are a few CityJSON datasets in one folder, and then the behaviour of [pygeoapi](https://demo.pygeoapi.io/stable) has been more or less copied.

It's not finished (OpenAPI and conformance are TODO), but it works and shows the idea are implementable.

[-->demo is hosted online for a few users](http://hugoledoux.pythonanywhere.com/) (if 1000s of you go there at the same time it might not work 😬)
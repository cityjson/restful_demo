
# CityJSON & OGC API -- Features (aka WFS3)

Here are some thoughts on making CityJSON "work" with [WFS3](docs.opengeospatial.org/is/17-069r3/17-069r3.html).
[GitHub repo for all matters WFS3](https://github.com/opengeospatial/ogcapi-features)


The most common criticism related to CityJSON is "yeah but cannot *stream* CityJSON and WFS is impossible, look at the global list of vertices".
This assumes that everyone is streaming CityGML; no they are not.


## What WFS3 (currently) is

- for 2D geometries only, explicitly stated
- only one geometry per feature
- for SF features, without textures/material
- GeoJSON is the recommended format, along with HTML. "GML if you want" is almost said, but you feel that it's discouraged.
- no support for structured metadata, there can be a link to an arbitray HTML page
- CRS must be WGS84

So CityJSON doesn't fit with the above, but to fair neither does CityGML-XML.
This is little to do with the list of vertices in my opinion.
This is rather easy to solve, as I show below.


## A proposal to make CityJSON WFS3-compliant

### What is a FeatureCollection?

Duh, it's a collection of features, so a CityJSON object is technically exactly this.

### What is a Feature?

This is more tricky, clearly one `Building` is one. 
But if that `Building` has 3 children (2 `BuildingPart`s and 1 `BuildingInstallation`), do we have 1 or 4 Features?

I would argue 1.
If a user request the `Building` (by its ID), they get the 4 features.
If a user request the ID of one `BuildingPart`, do they get the parent too or only the `BuildingPart` (which becomes a Feature then)?
This is up to discussion.


### Proposal

1. CityJSON stays as it is, with the global list of vertices
1. a CityJSON object is a FeatureCollection
1. perhaps the `"transform"` should not be allowed, to ensure that one clear CRS is used
1. to represent one Feature, a new type `CityJSONFeature` is introduced; almost the same as CityJSON

  - `"transform"` not allowed
  - `"version"` not present: in the collection or as metadata
  - `"metadata"` not present: in the metadata (perhaps WFS should be modified)
  - `"geometry-templates"` not present: those should be resolved/deferenced
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


/collections/ -> HTML/JSON of all datasets
/collections/{mycollection}/ -> overview of dataset (metadata [bbox, CRS], version CityJSON, extensions)
/collections/{mycollection}/items/{myid}/ -> one CityJSONFeature

If many Features must be returned, like all objects inside a bbox, then a CityJSON is returned.


### Streaming

The same hack as used by everyone: [Line-delimited JSON](https://en.m.wikipedia.org/wiki/JSON_streaming#Line-delimited_JSON): one JSON object per line, that is separated by a CR.

Called [GeoJSON Text Sequences](https://tools.ietf.org/html/rfc8142) also.

So each line can be either a CityJSON or a CityJSONFeature, inline with WFS3 specs.

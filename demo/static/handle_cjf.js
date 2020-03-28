//=== Functions for visualisation
// Adapted from https://github.com/tudelft3d/CityJSON-viewer/blob/master/js/viewer.js

// JSON variables
var featureDict = {} //contains the features
var meshes = [] //contains the meshes of the objects
var geoms = {} //contains the geometries of the objects

// Variables for map focus position and coordinate normalisation
// hardcoded is bad
var bbox = [84829.322, 447477.674,
            85079.554, 447750.636];
var mid_wgs = [4.3668943, 52.0124627];


async function handleNewFeature(feature) {
  // JSON needs to have double quotes
   feature = feature.replace(/'/g, '"');
   var json = JSON.parse(feature);
   
   var featureName = 'cityjson';
   //add json to the dict
   featureDict[featureName] = json;

   //load the CityObjects into the viewer
   await loadCityObjects(featureName)

   for(var i = 0; i < meshes.length; i++)
   {
      meshes[i].geoPosition = new harp.GeoCoordinates(mid_wgs[1], mid_wgs[0]);
      map.mapAnchors.add(meshes[i]);
   }
   map.update();
}

//convert CityObjects to mesh and add them to the viewer
async function loadCityObjects(featureName) {

   var json = featureDict[featureName]

    // Normalise vertices
    var helftx = (bbox[2] - bbox[0]) / 2;
    var helfty = (bbox[3] - bbox[1]) / 2;

   for (var i = 0; i < json.vertices.length; i++) {
     
     json.vertices[i][0] = json.vertices[i][0] - bbox[0] - helftx
     json.vertices[i][1] = json.vertices[i][1] - bbox[1] - helfty
     json.vertices[i][2] = json.vertices[i][2]
   }
   

   //count number of objects
   var totalco = Object.keys(json.CityObjects).length;
   console.log("Total # City Objects: ", totalco);
 
   //create dictionary
   var children = {}
 
   //iterate through all cityObjects
   for (var cityObj in json.CityObjects) {
      console.log(cityObj);
 
     try {
       //parse cityObj that it can be displayed in three js
       var returnChildren = await parseObject(cityObj, featureName)

       //if object has children add them to the childrendict
       for (var i in returnChildren) {
         children[featureName + '_' + returnChildren[i]] = cityObj
       }
 
     } catch (e) {
       console.log("ERROR at creating: " + cityObj);
       continue
     }

 
     var appendix = $('#ul_' + featureName)
     if (featureName + '_' + cityObj in children) {
       appendix = $('#ul_' + featureName + '_' + children[featureName + '_' + cityObj])
       delete children[featureName + '_' + cityObj]
     }

     appendix.append('<li><input type="checkbox" onclick="toggleMesh(this);" id="check_' + cityObj + '" checked>' + cityObj + '</li>');
 
     //if object has children
     if (returnChildren != "") {
       //change toggleMesh to toggleParent
       $("#check_" + cityObj).attr("onclick", "toggleParent(this)");
       appendix.append('<ul class="objectTree" id="ul_' + featureName + '_' + cityObj + '"></ul>');
       continue
     }

     //set color of object
     var coType = json.CityObjects[cityObj].type;
     var material = new THREE.MeshLambertMaterial();
     material.color.setHex(ALLCOLOURS[coType]);
 
     //create mesh
     //geoms[cityObj].normalize()
     var _id = featureName + "_" + cityObj
     var coMesh = new THREE.Mesh(geoms[_id], material)
     coMesh.name = cityObj;
     coMesh.featureName = featureName
     coMesh.castShadow = true;
     coMesh.receiveShadow = true;
     //scene.add(coMesh);
     //console.log(coMesh);
     meshes.push(coMesh);
   }
 }
 
 //convert json file to viewer-object
 async function parseObject(cityObj, featureName) {
 
   var json = featureDict[featureName]

   if (json.CityObjects[cityObj].children != undefined) {
       
     return (json.CityObjects[cityObj].children)
   };
   
   //create geometry and empty list for the vertices
   var geom = new THREE.Geometry()
   
   //each geometrytype must be handled different
   var geomType = json.CityObjects[cityObj].geometry[0].type
   if (geomType == "Solid") {
     boundaries = json.CityObjects[cityObj].geometry[0].boundaries[0];
   } else if (geomType == "MultiSurface" || geomType == "CompositeSurface") {
     boundaries = json.CityObjects[cityObj].geometry[0].boundaries;
   } else if (geomType == "MultiSolid" || geomType == "CompositeSolid") {
     boundaries = json.CityObjects[cityObj].geometry[0].boundaries;
   }

   
   //needed for assocation of global and local vertices
   var verticeId = 0
 
   var vertices = [] //local vertices
   var indices = [] //global vertices
   var boundary = [];
 
   //contains the boundary but with the right verticeId
   for (var i = 0; i < boundaries.length; i++) {
 
     for (var j = 0; j < boundaries[i][0].length; j++) {
 
       //the original index from the json file
       var index = boundaries[i][0][j];
 
       //if this index is already there
       if (vertices.includes(index)) {
 
         var vertPos = vertices.indexOf(index)
         indices.push(vertPos)
         boundary.push(vertPos)
 
       } else {
 
         //add vertice to geometry
         var point = new THREE.Vector3(
           json.vertices[index][0],
           json.vertices[index][1],
           json.vertices[index][2]
         );
         geom.vertices.push(point)
 
         vertices.push(index)
         indices.push(verticeId)
         boundary.push(verticeId)
 
         verticeId = verticeId + 1
       }
 
     }
 
     //create face
     //triangulated faces
     if (boundary.length == 3) {
       geom.faces.push(
         new THREE.Face3(boundary[0], boundary[1], boundary[2])
       )
 
       //non triangulated faces
     } else if (boundary.length > 3) {
 
       //create list of points
       var pList = []
       for (var j = 0; j < boundary.length; j++) {
         pList.push({
           x: json.vertices[vertices[boundary[j]]][0],
           y: json.vertices[vertices[boundary[j]]][1],
           z: json.vertices[vertices[boundary[j]]][2]
         })
       }
       //get normal of these points
       var normal = await get_normal_newell(pList)
 
       //convert to 2d (for triangulation)
       var pv = []
       for (var j = 0; j < pList.length; j++) {
         var re = await to_2d(pList[j], normal)
         pv.push(re.x)
         pv.push(re.y)
       }
 
       //triangulate
       var tr = await earcut(pv, null, 2);
 
       //create faces based on triangulation
       for (var j = 0; j < tr.length; j += 3) {
         geom.faces.push(
           new THREE.Face3(
             boundary[tr[j]],
             boundary[tr[j + 1]],
             boundary[tr[j + 2]]
           )
         )
       }
     }
     //reset boundaries
     boundary = []
   }

     //needed for shadow
  geom.computeFaceNormals();

  //add geom to the list
  var _id = featureName + "_" + cityObj
  geoms[_id] = geom

  return ("")
}
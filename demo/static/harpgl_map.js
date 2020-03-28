// Loading harp.gl map
const canvas = document.getElementById('map');
const map = new harp.MapView({
   canvas,
   //theme: "../../static/harpgltheme.json",
   theme: "https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_night_reduced.json",
   //For tile cache optimization:
   maxVisibleDataSourceTiles: 40, 
   tileCacheSize: 100
});

map.setCameraGeolocationAndZoom(
    // hardcoded
   new harp.GeoCoordinates(52.0121375, 4.3673237),
   16
);

const mapControls = new harp.MapControls(map);
const ui = new harp.MapControlsUI(mapControls);
canvas.parentElement.appendChild(ui.domElement);

mapControls.maxPitchAngle = 90;

map.resize(window.innerWidth, window.innerHeight);
window.onresize = () => map.resize(window.innerWidth, window.innerHeight);

const omvDataSource = new harp.OmvDataSource({
   baseUrl: "https://xyz.api.here.com/tiles/herebase.02",
   apiFormat: harp.APIFormat.XYZOMV,
   styleSetName: "tilezen",
   authenticationCode: 'ACrmXbstQJO4gKaVpEWNIAA',
});
map.addDataSource(omvDataSource);
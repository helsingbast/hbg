

jQuery.parseJSON( jsonString );

<script type="text/javascript"> 
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRbwcQXOrpxbUzDB1SlmJfT1K5mVKjei4&libraries=visualization&sensor=true_or_false">

var myLatlng = new google.maps.LatLng(latitude, longitude);
var mapOptions = {
  zoom: 8,
  center: myLatlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("map"),
    mapOptions);

var heatmapData = {
}

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData


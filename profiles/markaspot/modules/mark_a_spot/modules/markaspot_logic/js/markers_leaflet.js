/**
 * Mark-a-Spot marker_leaflet.js
 *
 * Main Map-Application File with Leaflet Maps api
 *
 */

var arg = "";
var markerLayer, queryString;
(function ($) {
  $(document).ready(function () {
    if ($('#markers-list-view #map').length != 0) {
      var offset = $("#markers-list-view #map").offset();
      var topPadding = 120;
      $(window).scroll(function () {
        if ($(window).scrollTop() > offset.top) {
          $("#markers-list-view #map").stop().animate({
            marginTop: $(window).scrollTop() - offset.top + topPadding
          });
        } else {
          $("#map").stop().animate({
            marginTop: 0
          });
        }
      });
    }
    var mas = Drupal.settings.mas;

    Drupal.Markaspot = new Object();
    Drupal.Markaspot.maps = new Array();
    Drupal.Markaspot.markers = new Array();
    var categoryCond = mas.params.field_category_tid;
    var statusCond = mas.params.field_status_tid;
    var queryString = mas.params.q.split('?');
    var pathId = mas.params.q.split('/');

    /**
     * Split URL and read MarkerID
     *
     */

    switch (pathId[0]) {
      case "map":
        readData(2, arg, "All", "5&field_status_tid[]=6");
        arg = '';
        break;

      case "list":
        readData(2, "list", "All", "5&field_status_tid[]=6");
        break;

      case "admin":
        return false;
    }

    var initialLatLng = new L.LatLng(mas.markaspot_ini_lat, mas.markaspot_ini_lng);

    Drupal.Markaspot.maps[0] = new L.Map('map');

    if (mas.cloudmade_api_key) {
      var url = 'https://ssl_tiles.cloudmade.com/' + mas.cloudmade_api_key + '/22677/256/{z}/{x}/{y}.png';
      var attribution = 'Map data &copy; 2013 OpenStreetMap contributors, Imagery &copy; 2013 CloudMade';
    } else {
      var url = mas.osm_custom_tile_url;
      var attribution = mas.osm_custom_attribution;
    }

    layer = new L.TileLayer(url, {maxZoom: 18, attribution: attribution});
    Drupal.Markaspot.maps[0].setView(new L.LatLng(mas.markaspot_ini_lat, mas.markaspot_ini_lng), 13).addLayer(layer);

    $("#markers-list").append("<ul>");

    /**Sidebar Marker-functions*/

    $("#block-markaspot-logic-taxonomy-category ul li a.map-menue").click(function (e) {
      e.preventDefault();
      hideMarkers();
      readData(1, arg, getTaxId(this.id), "All");
      return false;
    });

    $("#block-markaspot-logic-taxonomy-status ul li a.map-menue").click(function (e) {
      e.preventDefault();
      hideMarkers();
      readData(2, arg, "All", getTaxId(this.id));
      return false;
    });

    $("#block-markaspot-logic-taxonomy-category ul li a.map-menue-all").click(function (e) {
      e.preventDefault();
      hideMarkers();
      readData(1, arg, "All", "All");
      return false;
    });

    $("#block-markaspot-logic-taxonomy-status ul li a.map-menue-all").click(function (e) {
      e.preventDefault();
      hideMarkers();
      readData(2, arg, "All", "All");
      return false;
    });


    function getTaxId(id) {
      id = id.split("-");
      return id[1];
    }	

    function readData(getToggle, arg, categoryCond, statusCond) {
      // markerLayer = new L.LayerGroup();
      markerLayer = new L.MarkerClusterGroup({disableClusteringAtZoom: 15, maxClusterRadius: 40 });

      uri = mas.uri.split('?');

      if (mas.node_type == "report") {
        url = Drupal.settings.basePath + 'reports/json/' + arg;
      } else if (uri[0].search('node/') != -1) {
        url = Drupal.settings.basePath + 'reports/json/' + arg;
      } else if (uri[0].search('map') != -1 || uri[0].search('home') != -1) {
        // map view
        url = Drupal.settings.basePath + 'reports/json/map?' + 'field_category_tid=' + categoryCond + '&field_status_tid[]=' + statusCond;
      } else {
        url = Drupal.settings.basePath + 'reports/json?' + uri[1];
        categoryCond = mas.params.field_category_tid;
        statusCond = mas.params.field_status_tid;
      }
      // $("#markersidebar >*").remove();
      // $('#map').showLoading({'indicatorZIndex':2,'overlayZIndex':1, 'parent': '#map'});
      var target = document.getElementById('map');
      var opts = {
        lines: 13,
        length: 20,
        width: 10,
        radius: 30,
        corners: 1,
        rotate: 0,
        direction: 1,
        color: '#000',
        speed: 2,
        trail: 60,
        shadow: false,
        hwaccel: false,
        className: 'spinner'
      };
      var spinner = new Spinner(opts).spin(target);

      $.getJSON(url,function (data) {
      }).success(function (data) {
        }).done(function (data) {
          spinner.stop();
          data = data.nodes;

          points = [];
          var bounds = new L.LatLngBounds(initialLatLng);

          //var infoWindow = new google.maps.InfoWindow;

          if (!data[0] && mas.node_type == 'report') {
            // invoke a message box or something less permanent than an alert box later
            alert(Drupal.t('No reports found for this category/status'));
          }

          $.each(data, function (markers, item) {
            item = item.node;
            var latlon = new L.LatLng(item.positionLat, item.positionLng);
            var html = '<div class="marker-title"><h4><a class="infowindow-link" href="' + item.path + '">' + item.title + '</a></h4><span class="meta-info date">' + item.created + '</span></div>';
            if (item.address) {
              html += '<div class="marker-address"><p>' + item.address + '</p></div>';
              html += '<div><a class="infowindow-link" href="' + item.path + '">' + Drupal.t('read more') + '</a></div>';
            }
            if (getToggle == 1) {
              colors = [
                {"color": "red", "hex": "FF0000"},
                {"color": "darkred", "hex": "8B0000" },
                {"color": "orange", "hex": "FFA500" },
                {"color": "green", "hex": "008000"},
                {"color": "darkgreen", "hex": "006400"},
                {"color": "blue", "hex": "0000FF"},
                {"color": "darkblue", "hex": "00008B"},
                {"color": "purple", "hex": "800080"},
                {"color": "darkpurple", "hex": "871F78"},
                {"color": "cadetblue", "hex": "5F9EA0"},
              ]
            }
            if (getToggle == 2) {
              colors = [
                {"color": "red", "hex": "cc0000"},
                {"color": "green", "hex": "8fe83b"},
                {"color": "orange", "hex": "ff6600"},
                {"color": "cadetblue", "hex": "5F9EA0"},

              ]
            }

            $.each(colors, function (key, element) {
              if (item.statusHex == element.hex || item.categoryHex == element.hex) {
                var awesomeColor = element.color;
                var awesomeIcon = (getToggle == 1) ? item.categoryIcon : item.statusIcon;
                var marker = new L.Marker(latlon, {icon: L.AwesomeMarkers.icon({icon: awesomeIcon, prefix: 'icon', markerColor: awesomeColor, spin: false}) });
                marker.bindPopup(html);
                markerLayer.addLayer(marker);
                bounds.extend(latlon);
              }
            });
            var fn = markerClickFn(latlon, html);
            $('#marker_' + item.nid).on('hover', fn);
          });
          Drupal.Markaspot.maps[0].addLayer(markerLayer);
          // Drupal.Markaspot.maps[0].fitBounds(bounds);
        });
    }
  });
})(jQuery);

function hideMarkers() {
  Drupal.Markaspot.maps[0].removeLayer(markerLayer);
};

function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function () {
    Drupal.Markaspot.maps[0].setView(marker.getPosition());
    Drupal.Markaspot.maps[0].setZoom(15);
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}

function markerClickFn(latlon, html) {
  return function () {

    Drupal.Markaspot.maps[0].panTo(latlon);
    Drupal.Markaspot.maps[0].setZoom(16);
    Drupal.Markaspot.maps[0].closePopup();

    popup = new L.Popup();

    popup.setLatLng(latlon);
    popup.setContent(html);

    Drupal.Markaspot.maps[0].openPopup(popup);
  };
}

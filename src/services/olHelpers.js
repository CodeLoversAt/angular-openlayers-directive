angular.module("openlayers-directive").factory('olHelpers', function ($q, $log) {
    var isDefined = function(value) {
        return angular.isDefined(value);
    };

    return {
        // Determine if a reference is defined
        isDefined: isDefined,

        // Determine if a reference is a number
        isNumber: function(value) {
            return angular.isNumber(value);
        },

        // Determine if a reference is defined and not null
        isDefinedAndNotNull: function(value) {
            return angular.isDefined(value) && value !== null;
        },

        // Determine if a reference is a string
        isString: function(value) {
            return angular.isString(value);
        },

        // Determine if a reference is an array
        isArray: function(value) {
            return angular.isArray(value);
        },

        // Determine if a reference is an object
        isObject: function(value) {
            return angular.isObject(value);
        },

        // Determine if two objects have the same properties
        equals: function(o1, o2) {
            return angular.equals(o1, o2);
        },

        isValidCenter: function(center) {
            return angular.isDefined(center) &&
                   (angular.isNumber(center.lat) && angular.isNumber(center.lon) ||
                   typeof center.autodiscover === "boolean" && center.autodiscover === true ||
                   (angular.isArray(center.bounds) && center.bounds.length === 4 &&
                   angular.isNumber(center.bounds[0]) && angular.isNumber(center.bounds[1]) &&
                   angular.isNumber(center.bounds[1]) && angular.isNumber(center.bounds[2])));
        },

        safeApply: function($scope, fn) {
            var phase = $scope.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                $scope.$eval(fn);
            } else {
                $scope.$apply(fn);
            }
        },

        isSameCenterOnMap: function(center, map) {
            var mapCenter = map.getView().getCenter();
            var zoom = map.getView().getZoom();
            if (mapCenter[1].toFixed(4) === center.lat.toFixed(4) &&
                mapCenter[1].toFixed(4) === center.lon.toFixed(4) &&
                zoom === center.zoom) {
                  return true;
            }
            return false;
        },

        obtainEffectiveMapId: function(d, mapId) {
            var id, i;
            if (!angular.isDefined(mapId)) {
                if (Object.keys(d).length === 1) {
                    for (i in d) {
                        if (d.hasOwnProperty(i)) {
                            id = i;
                        }
                    }
                } else if (Object.keys(d).length === 0) {
                    id = "main";
                } else {
                    $log.error("[AngularJS - Openlayers] - You have more than 1 map on the DOM, you must provide the map ID to the olData.getXXX call");
                }
            } else {
                id = mapId;
            }
            return id;
        },

        generateUniqueUID: function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },

        createLayer: function(layer) {
            var oLayer, oSource;

            switch(layer.source.type) {
                case 'OSM':
                    if (layer.source.attribution) {
                        oSource = new ol.source.OSM({
                            attributions: [
                              new ol.Attribution({ html: layer.source.attribution }),
                              ol.source.OSM.DATA_ATTRIBUTION
                            ]
                        });
                    } else {
                        oSource = new ol.source.OSM();
                    }

                    oLayer = new ol.layer.Tile({ source: oSource });

                    if (layer.source.url) {
                        oSource.setUrl(layer.source.url);
                    }

                    break;
                case 'TileJSON':
                    oSource = new ol.source.TileJSON({
                        url: layer.source.url,
                        crossOrigin: 'anonymous'
                    });

                    oLayer = new ol.layer.Tile({ source: oSource });
                    break;
            }

            if (angular.isNumber(layer.opacity)) {
                oLayer.setOpacity(layer.opacity);
            }
            return oLayer;
        }
    };
});

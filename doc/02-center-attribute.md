'center' Attribute Documentation
==================================

This is an attribute of the **openlayers** main directive, and we will use it like this:

```
<openlayers center="center"><openlayers>
```

It will map an object _center_ of our controller scope with the corresponding object on our directive isolated scope. It's a bidirectional relationship, so a change in this object on the controller scope will affect the map center position, or an interaction on the map which changes the map center will update our _center_ values. Let's define the center model with an example:


```
$scope.center = {
    lat: 51.505,
    lon: -0.09
    zoom: 4
}
```

It uses the projection EPSG:4326 by default, and we can see that a center is conformed by two required attributes: _lat_, _lon_ and _zoom_. When we associate that object with our _openlayers-directive_ the bi-directional relation will start.


Let's see a complete example of how to use this. We must create a center object in our controller, pass its name to our directive _center_ attribute, an that's all.

```
angular.extend($scope, {
    center: {
        lat: 51.505,
        lon: -0.09
        zoom: 4
    }
});
```

And after that, in our HTML code we will define our openlayers directive like this:
```
<openlayers center="center"></openlayers>
```

And that's all. A full example of using this attribute can be found [here](http://tombatossals.github.io/angular-openlayers-directive/examples/020-center-example.html).

Autodiscover
------------
The _coord_, and _center_ properties are mandatory to make the center work, but we have an optional property which we can use to auto-discover the position of the user browsing our page using the [W3C Geolocation API](http://dev.w3.org/geo/api/spec-source.html) using the corresponding methods defined in the [Openlayers API](http://openlayers.org/en/v3.0.0/apidoc/ol.Geolocation.html).

For example, we could show the user map position on start, or conditionally when he press a button. This property is defined like this:

```
angular.extend($scope, {
    center: {
        autodiscover: true
    }
});
```

We can see an example of how to use it [here](http://tombatossals.github.io/angular-openlayers-directive/examples/021-center-autodiscover-example.html).


Center position coded on a hash URL param
------------------------------------------
We can use a special feature of the center attribute which will allow us to synchronize the center position of the map with the URL of the browser, adding to it a special GET parameter where the center is coded. This way, we can persist the map position on the browser URL.
```
center: {
    lat: 51.505,
    lon: -0.09
    zoom: 4,
    urlHash: true
}
```

Adding that attribute to our center object will synchronize the map center with a GET parameter on the URL of this form `?c=lat:lon:zoom`. Furthermore, whenever the map center is changed a new event `centerUrlHashChanged` will be emitted to the parent scope so you can update your `$location.search` with the new info (if you want).

You can take a look of this feature on this [demo](http://tombatossals.github.io/angular-openlayers-directive/examples/022-url-hash-center-example.html).


Extent
------
This is another way to set the center view of our map, stablishing the bounds coordinates that we want to be shown on screen. We will use it this way:
```
center {
    extent: [ 0, 0, 51.505, -0.09 ]
}
```

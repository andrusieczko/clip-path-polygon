clipPathPolygon
===============

This is a jQuery plugin that makes using clip-path property easy on whatever tag under different browsers.

Tested on Chrome and Firefox so far.

What it does?

Let's say that you want to achieve something like this:

<img src="http://www.andrusieczko.pl/files_to_share/clipPath.png" width="300">

So need to have a rectangle (e.g. 300x200) and you have to **crop** this image like with such coordinates: 
`(0; 0), (145; 0), (150; 20), (155; 0), (300; 0), (300; 200), (0; 200), (0; 0)`

In *Webkit* all you have to do is to write a css style:
`-webkit-clip-path: polygon(0 0, 145px 0, 150px 20px, 155px 0, 300px 0, 300px 200px, 0 200px, 0 0)`

In *Firefox* and in W3C standard what you should do is:
`clip-path: url(#my-definition)`

and somewhere in the file:

```html
<svg>
    <defs>
        <clippath id="my-definition">
            <polygon points="0 0, 145 0, 150 20, 155 0, 300 0, 300 200, 0 200, 0 0"></polygon>
        </clippath>
    </defs>
</svg>
```

*clipPathPolygon* does this job for you!

Installation
------------

Just download [clipPathPolygon.min.js](https://raw.github.com/andrusieczko/clipPathPolygon/master/build/clipPathPolygon.min.js) and include to your project.

Compilation
-----------
If you want to compile the whole package with unit tests, run:
`npm install`

I use [mocha](http://visionmedia.github.io/mocha/) and [sinon](http://sinonjs.org) for testing.

API
-------

Definition:
`clipPath(points [, options])`

You cam call it on a jQuery element:
```javascript
$('#my-element').clipPath(points);
```

where `points` is an array of two-elements arrays: `[[x0, y0], [x1, y1], [x2, y2]...]` crops the element to this area defined by these points.

There are some options that you can use:
<table>
  <thead>
    <th>Option</th>
    <th>Default</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>isForWebkit</td>
      <td>*true*</td>
      <td>specifies if `-webkit-clip-path` property should be added to element</td>
    </tr>
    <tr>
      <td>isForSvg</td>
      <td>*true*</td>
      <td>specifies if `-clip-path` property and `<svg>` element should be added</td>
    </tr>
    <tr>
      <td>svgDefId</td>
      <td>*clipPathPolygonGenId*</td>
      <td>specifies *id* of SVG clippath definition</td>
    </tr>
  </tbody>
</table>

Example
-------

```html
<html>
  <head>
    <script src="jquery.min.js"></script>
    <script src="clipPathPolygon.min.js"></script>
    <script>
      $(function() {
        var points = [[0, 0], [145, 0], [150, 20], [155, 0], [300, 0], [300, 200], [0, 200], [0, 0]];
        $('#test').clipPath(points);
      });
    </script>
  </head>
  <body>
    <div style="width: 300px; height: 200px">
      <div id="test" style="width: 100%; height: 100%; background-color: green"></div>
    </div>
  </body>
</html>
```

which gives you such an html code:

```html
<div style="width: 300px; height: 200px">
  <div id="test" style="width: 100%; height: 100%; background-color: green;
    -webkit-clip-path: polygon(0 0, 145px 0, 150px 20px, 155px 0, 300px 0, 300px 200px, 0 200px, 0 0);
    clip-path: url(#clipPathPolygonGenId)"></div>
</div>

<svg>
  <defs>
    <clippath id="clipPathPolygonGenId">
      <polygon points="0 0, 145 0, 150 20, 155 0, 300 0, 300 200, 0 200, 0 0"></polygon>
    </clippath>
  </defs>
</svg>
```
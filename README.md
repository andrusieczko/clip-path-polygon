clip-path-polygon [![Build Status](https://travis-ci.org/andrusieczko/clip-path-polygon.png?branch=master)](https://travis-ci.org/andrusieczko/clip-path-polygon) [![Coverage Status][coveralls-image]][coveralls]
===============

This is a jQuery plugin that makes using clip-path property easy on whatever tag under different browsers.

Tested on Chrome and Firefox so far.

What it does?

Let's say that you want to achieve something like this:

<img src="http://www.andrusieczko.pl/others/files_to_share/clipPath.png" width="300">

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

*clip-path-polygon* does this job for you!

## Installation

### Node

Install with [https://npmjs.org](NPM) or add it to your `package.json`:

`$ npm install clip-path-polygon`

Then require it:

```javascript
require('clip-path-polygon');
```

and use:
```javascript
$myElement.clipPath();
```

### Browser

Download [clip-path-polygon.min.js (minified)](https://raw.github.com/andrusieczko/clip-path-polygon/master/build/clip-path-polygon.min.js) or [clip-path-polygon.js (dev)](https://raw.github.com/andrusieczko/clip-path-polygon/master/js/clip-path-polygon.js) and add it to you HTML file:

```html
<script src="clip-path-polygon.min.js"></script>
```

Compilation
-----------
If you want to compile the whole package with unit tests, run:
`npm install`

I use [mocha](http://visionmedia.github.io/mocha/), [sinonjs](http://sinonjs.org) and [expect.js](https://github.com/LearnBoost/expect.js) for testing.

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
    <script src="clip-path-polygon.min.js"></script>
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

which gives you such an html code (remember that `svg` element has to have *http://www.w3.org/2000/svg* namespace!):

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
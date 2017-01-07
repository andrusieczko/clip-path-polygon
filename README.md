clip-path-polygon [![Build Status](https://travis-ci.org/andrusieczko/clip-path-polygon.png?branch=master)](https://travis-ci.org/andrusieczko/clip-path-polygon)
===============

This is a jQuery plugin that makes using clip-path property easy on whatever tag under different browsers.

Tested on latest Chrome, Safari, Firefox and Opera.

It should work on Chrome ≥31, Firefox ≥31, Safari ≥7 and Opera ≥30.

What it does?

Let's say that you want to achieve something like this:

<img src="https://raw.githubusercontent.com/andrusieczko/clip-path-polygon/master/resources/example.png" width="300">

**Take a look at the [example html file](https://raw.githubusercontent.com/andrusieczko/clip-path-polygon/master/resources/example.html)!**

So you need to have a rectangle (e.g. 300x200) and you have to **crop** this image with such coordinates:
`(0; 0), (145; 0), (150; 20), (155; 0), (300; 0), (300; 200), (0; 200), (0; 0)`

### Absolute values

In *Webkit* all you have to do is to write a css style:
`-webkit-clip-path: polygon(0 0, 145px 0, 150px 20px, 155px 0, 300px 0, 300px 200px, 0 200px, 0 0)`

In *Firefox* and in W3C standard what you should do is:
`clip-path: url(#my-definition)` and somewhere in the file:

```html
<svg>
    <defs>
        <clippath id="my-definition">
            <polygon points="0 0, 145 0, 150 20, 155 0, 300 0, 300 200, 0 200, 0 0"></polygon>
        </clippath>
    </defs>
</svg>
```

### Relative values

If your design is resposive, you might want to use relative unit - percents. Then, the expected values would be:

- *Webkit*: `polygon(0 0, 49% 0, 50% 10%, 51% 0, 100% 0, 100% 100%, 0 100%, 0 0)`
- *Firefox*: `<polygon points="0 0, 0.49 0, 0.5 0.1, 0.51 0, 1 0, 1 1, 0 1, 0 0"></polygon>`

*clip-path-polygon* does this job for you!

## Installation

### Npm

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

### Bower

`$ bower install clip-path-polygon --save`

and then add `bower_components/clip-path-polygon/build/clip-path-polygon.min.js` to your scripts.

```html
<script src="bower_components/clip-path-polygon/build/clip-path-polygon.min.js"></script>
```

I'm assuming here that your `bower` installation folder is called `bower_components`.

### Browser

Download [clip-path-polygon.min.js (minified)](https://raw.github.com/andrusieczko/clip-path-polygon/master/build/clip-path-polygon.min.js) or [clip-path-polygon.js (dev)](https://raw.github.com/andrusieczko/clip-path-polygon/master/js/clip-path-polygon.js) and add it to you HTML file:

```html
<script src="clip-path-polygon.min.js"></script>
```

Compilation
-----------
If you want to compile the whole package with unit tests, run:
`npm install` and then `grunt` (compilation) or `grunt test` (tests).

I use [mocha](http://mochajs.org/), [sinonjs](http://sinonjs.org) and [expect.js](https://github.com/LearnBoost/expect.js) for testing.

Changelog
---------
Changlelog is available here: [CHANGELOG.md](https://github.com/andrusieczko/clip-path-polygon/blob/master/CHANGELOG.md)

API
-------

Definition:
`clipPath(points [, options])`

You can call it on a jQuery element:
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
      <td>isPercentage</td>
      <td>*false*</td>
      <td>specifies whether you want to use absolute numbers (pixels) or relative unit (percents)</td>
    </tr>
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
      <td>*clipPathPolygonGenId<unique_id>*</td>
      <td>specifies *id* of SVG clippath definition</td>
    </tr>
  </tbody>
</table>

Examples
-------

### Basic

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

### Relative values

To use relative values, you have to pass `isPercentage` option. You might want to name the SVG `clippath` definition differently too:

```html
<html>
  <head>
    <script src="jquery.min.js"></script>
    <script src="clip-path-polygon.min.js"></script>
    <script>
      $(function() {
        var points = [[0, 0], [49, 0], [50, 10], [51, 0], [100, 0], [100, 100], [0, 100], [0, 0]];
        $('#test').clipPath(points, {
          isPercentage: true,
          svgDefId: 'mySvg'
        });
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
    -webkit-clip-path: polygon(0 0, 49% 0, 50% 10%, 51% 0, 100% 0, 100% 100%, 0 100%, 0 0);
    clip-path: url(#mySvg)"></div>
</div>

<svg>
  <defs>
    <clippath id="mySvg">
      <polygon points="0 0, 0.49 0, 0.5 0.1, 51% 0, 1 0, 1 1, 0 1, 0 0"></polygon>
    </clippath>
  </defs>
</svg>
``` 

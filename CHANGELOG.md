# clip-path-polygon changelog

### 0.1.11 (2016-12-20)
* [BUGFIX] Chrome 55+ hot fix: render SVG first, then add clip-path property

### 0.1.10 (2016-05-07)
* [BUGFIX] change `display: none` on the created `svg` elements to `position: absolute; visibility: hidden` (sometimes `display: none` didn't work in Firefox)

### 0.1.9 (2016-05-05)
* [BUGFIX] add `window.jQuery` as an option of loading jQuery
* [BUGFIX] hide created `svg` elements so that they do not appear on the bottom of the page

### 0.1.8 (2016-02-26)
* [BUGFIX] parameters `isForWebkit`, `isForSvg` were set to false when empty map was passed options

### 0.1.7 (2016-01-01)
* [BUGFIX] parameters `isForWebkit`, `isForSvg` were ignored when `false` was passed as value
* jsdom 3.1.2 -> 7.2.2

### 0.1.6 (2015-07-21)
* [IMPROVEMENT] `svgDefId` not mandatory anymore when using more than one `.clipPath` in Firefox
* tests updated with `jsdom`

### 0.1.5 (2014-04-01)
* [FEATURE] added a percentage option (fixes [#2](https://github.com/andrusieczko/clip-path-polygon/issues/2))
* [DOCS] documentation enhaced
* [FIX] `grunt test` uses local copy of *mocha* 
* *.jshintrc* files added
* example html file provided

### 0.1.4 (2013-08-31)
* stable version working with Chrome & Firefox

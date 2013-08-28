/*!
 * jQuery clipPathPolygon Plugin v0.9
 * https://github.com/andrusieczko/jquery-clippath-polygon
 * jQuery plugin that makes easy to use clip-path on whatever tag under different browsers
 *
 * Copyright 2013 Karol Andrusieczko
 * Released under the MIT license
 */
(function($) {

  var ClipPath = function(jQuery, $el, points, options) {
    this.$ = jQuery;
    this.$el = $el;
    this.points = points;

    this.processOptions(options);
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = ClipPath;
    }
    exports.ClipPath = ClipPath;
  } else {
    root.ClipPath = ClipPath;
  }

  ClipPath.prototype = {

    $: null,
    $el: null,
    points: null,

    isForWebkit: true,
    isForSvg: true,
    svgDefId: 'clipPathPolygonGenId',

    create: function() {
      this._createClipPath(this.points);
    },

    _createClipPath: function(points) {
      this._createSvgDefs();
      if (this.isForWebkit) {
        this._createWebkitClipPath(points);
      }
      if (this.isForSvg) {
        this._createSvgBasedClipPath(points);
      }
    },

    _createWebkitClipPath: function(points) {
      var clipPath = "polygon(" + this._translatePoints(points, true) + ")";
      this.$el.css('-webkit-clip-path', clipPath);
    },

    _createSvgBasedClipPath: function(points) {
      this.$('#' + this.svgDefId + '').find('polygon').attr('points', this._translatePoints(points, false));
      this.$el.css('clip-path', 'url(#' + this.svgDefId + ')');
    },


    _translatePoints: function(points, withPxs) {
      var result = [];
      for (var i in points) {
        var x = this._handlePxs(points[i][0], withPxs);
        var y = this._handlePxs(points[i][1], withPxs);
        result.push(x + ' ' + y);
      }
      return result.join(', ');
    },

    _handlePxs: function(number, withPxs) {
      if (number === 0 || !withPxs) {
        return number;
      }
      return number + "px";
    },

    _createSvgElement: function(elementName) {
      return this.$(document.createElementNS('http://www.w3.org/2000/svg', elementName));
    },

    _createSvgDefs: function() {
      if (this.$('#' + this.svgDefId + '').size() === 0) {
        var $svg = this._createSvgElement('svg').attr('width', 0).attr('height', 0);
        var $defs = this._createSvgElement('defs');
        $svg.append($defs);
        var $clippath = this._createSvgElement('clipPath').attr('id', this.svgDefId);
        $defs.append($clippath);
        var $polygon = this._createSvgElement('polygon');
        $clippath.append($polygon);
        this.$('body').append($svg);
      }
    },

    processOptions: function(options) {
      this.isForWebkit = (options && options.isForWebkit) || this.isForWebkit;
      this.isForSvg = (options && options.isForSvg) || this.isForSvg;
      this.svgDefId = (options && options.svgDefId) || this.svgDefId;
    }
  };

  $.fn.clipPath = function(points, options) {
    return this.each(function() {
      var $el = $(this);
      var clipPath = new ClipPath($, $el, points, options);
      clipPath.create();
    });
  };

}).call(this, jQuery);
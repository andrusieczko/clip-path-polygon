var ClipPath = require("../js/clip-path-polygon.js");
var sinon = require('sinon');

var expect = require('expect.js');

describe('ClipPath', function() {

  var cut = null;
  var jQueryMock = null;
  var $el = null;

  beforeEach(function() {
    jQueryMock = {
      find: function(selector) {
        this.selector = this.selector + " " + selector;
        return jQueryMock;
      },
      attr: function() {
        return jQueryMock;
      }
    };
    var jQuery = function(selector) {
      jQueryMock.selector = selector;
      return jQueryMock;
    };
    $el = {
      css: sinon.spy()
    };

    cut = new ClipPath(jQuery, $el, [
      [3, 2],
      [6, 7]
    ]);
  });

  describe('_handlePxs', function() {

    it('should return number when withUnit is false', function() {
      // given
      var expected = 20;

      // when
      var result = cut._handlePxs(20, false, false);

      // then
      expect(expected).to.be.equal(result);
    });

    it('should return number when 0 and withUnit = true', function() {
      // given
      var expected = 0;

      // when
      var result = cut._handlePxs(0, true, false);

      // then
      expect(expected).to.be.equal(result);
    });

    it('should return number when 0 and withUnit = false', function() {
      // given
      var expected = 0;

      // when
      var result = cut._handlePxs(0, false, false);

      // then
      expect(expected).to.be.equal(result);
    });

    it('should return number with pxs when number is > 0 and withUnit = true', function() {
      // given
      var expected = "20px";

      // when
      var result = cut._handlePxs(20, true, false);

      // then
      expect(expected).to.be.equal(result);
    });

    it('should return a number/100 when no unit and percentage', function() {
      // given
      var expected = 0.2;

      // when
      var result = cut._handlePxs(20, false, true);

      // then
      expect(expected).to.be.equal(result);
    });

    it('should return a number with percent sign when  withUnit and percentage', function() {
      // given
      var expected = '20%';

      // when
      var result = cut._handlePxs(20, true, true);

      // then
      expect(expected).to.be.equal(result);
    });

  });

  describe('_translatePoints', function() {

    it('should translate points with pxs', function() {
      // given
      var points = [
        [0, 20],
        [9, 2],
        [4, 4],
        [2, 0],
        [0, 0]
      ];
      var expected = "0 20px, 9px 2px, 4px 4px, 2px 0, 0 0";

      // when
      var result = cut._translatePoints(points, true, false);

      // then
      expect(expected).to.be.equal(result);
    });

    it('should translate points with no pxs', function() {
      // given
      var points = [
        [0, 20],
        [9, 2],
        [4, 4],
        [2, 0],
        [0, 0]
      ];
      var expected = "0 20, 9 2, 4 4, 2 0, 0 0";

      // when
      var result = cut._translatePoints(points, false, false);

      // then
      expect(expected).to.be.equal(result);
    });

    it('should translate points with percents', function() {
      // given
      var points = [
        [0, 20],
        [9, 2],
        [4, 4],
        [2, 0],
        [0, 0]
      ];
      var expected = "0 20%, 9% 2%, 4% 4%, 2% 0, 0 0";

      // when
      var result = cut._translatePoints(points, true, true);

      // then
      expect(expected).to.be.equal(result);
    });

    it('should translate points with no percents and divided by 100', function() {
      // given
      var points = [
        [0, 20],
        [9, 2],
        [4, 4],
        [2, 0],
        [0, 0]
      ];
      var expected = "0 0.2, 0.09 0.02, 0.04 0.04, 0.02 0, 0 0";

      // when
      var result = cut._translatePoints(points, false, true);

      // then
      expect(expected).to.be.equal(result);
    });

  });

  describe('create clip path definition', function() {
    it('should create clipPath using _createSvgBasedClipPath', function() {
      // given
      var id = cut.svgDefId;
      var attrSpy = sinon.spy(jQueryMock, "attr");
      var selector = "#" + id + " " + 'polygon';
      var attrArg1 = 'points';
      var attrArg2 = '2 1, 5 7, 8 8';

      // when
      cut._createSvgBasedClipPath([
        [2, 1],
        [5, 7],
        [8, 8]
      ]);

      // then
      expect(jQueryMock.selector).to.be.equal(selector);
      expect(attrSpy.withArgs(attrArg1, attrArg2).calledOnce).to.be.equal(true);
      expect($el.css.withArgs('clip-path', 'url(#' + id + ')').calledOnce).to.be.equal(true);
    });

    it('should create clipPath using _createSvgBasedClipPath with percentage', function() {
      // given
      cut.isPercentage = true;
      var id = cut.svgDefId;
      var attrSpy = sinon.spy(jQueryMock, "attr");
      var selector = "#" + id + " " + 'polygon';
      var attrArg1 = 'points';
      var attrArg2 = '0.02 0.01, 0.05 0.07, 0.08 0.08';

      // when
      cut._createSvgBasedClipPath([
        [2, 1],
        [5, 7],
        [8, 8]
      ]);

      // then
      expect(jQueryMock.selector).to.be.equal(selector);
      expect(attrSpy.withArgs(attrArg1, attrArg2).calledOnce).to.be.equal(true);
      expect($el.css.withArgs('clip-path', 'url(#' + id + ')').calledOnce).to.be.equal(true);
    });

    it('should create clipPath using _createWebkitClipPath', function() {
      // given
      var clipPathText = 'polygon(2px 1px, 0 7px, 8px 8px)';
      var attrSpy = sinon.spy(jQueryMock, "attr");

      // when
      cut._createWebkitClipPath([
        [2, 1],
        [0, 7],
        [8, 8]
      ]);

      // then
      expect(attrSpy.calledOnce).to.be.equal(false);
      expect($el.css.withArgs('-webkit-clip-path', clipPathText).calledOnce).to.be.equal(true);
    });

    it('should create clipPath using _createWebkitClipPath with percentage', function() {
      // given
      cut.isPercentage = true;
      var clipPathText = 'polygon(2% 1%, 0 7%, 8% 8%)';
      var attrSpy = sinon.spy(jQueryMock, "attr");

      // when
      cut._createWebkitClipPath([
        [2, 1],
        [0, 7],
        [8, 8]
      ]);

      // then
      expect(attrSpy.calledOnce).to.be.equal(false);
      expect($el.css.withArgs('-webkit-clip-path', clipPathText).calledOnce).to.be.equal(true);
    });

  });

});
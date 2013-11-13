;if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

(function($, window, document, undefined) {

  var ImageFillWrapper = {

    init: function(options, cb, elm) {
      var self = this;
      self.$img = $(elm);
      self.ratio = self.$img.attr('width') / self.$img.attr('height');

      var newWrapper = {};
      newWrapper.wrapper = options.wrapper ? self.$img.closest(options.wrapper) : self.$img.parent();
      self.options = $.extend({}, $.fn.imageFillWrapper.options, newWrapper);

      $(window).on('resize orientationchange', function(e) {
        if (!self.$img.parent().hasClass('js-zoomed')) {
          self.scaleImg();
        }
      });

      self.scaleImg();
      if (typeof cb == 'function') {
        cb.call(self.$img);
      }
    },

    scaleImg: function() {

      var wrapperHeight = this.options.wrapper.height(),
          wrapperWidth = this.options.wrapper.width();

      if(wrapperWidth / this.ratio >= wrapperHeight) {
        this.scaleTall(wrapperWidth, wrapperHeight);
      }
      else {
        this.scaleWide(wrapperWidth, wrapperHeight);
      }
    },

    scaleTall: function(ww, wh) {
      this.$img.css({
        'width': ww,
        'height': Math.ceil(ww / this.ratio),
        'margin-top': Math.ceil((wh - ww / this.ratio) / 2),
        'margin-left': 0 // We need to reset the margin-left
      });
    },

    scaleWide: function(ww, wh) {
      this.$img.css({
        'height': wh,
        'width': Math.ceil(wh * this.ratio),
        'margin-left': Math.ceil((ww - wh * this.ratio) / 2),
        'margin-top': 0 // We need to reset the margin-top
      });
    }
  };

  $.fn.imageFillWrapper = function(options, cb) {

    return this.each(function() {
      var imageFillWrapper = Object.create(ImageFillWrapper);
      imageFillWrapper.init(options, cb, this);
    });
  };

  $.fn.imageFillWrapper.options = {
    wrapper: ''
  };

})(jQuery, window, document);

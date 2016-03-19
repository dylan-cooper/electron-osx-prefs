const assert = require('chai').assert;
const appStub = {
  addDistributedNotificationObserver: function(a,b){}
};

require('./index.js')(appStub);

describe('node-osx-prefs', function(){
  describe('getAquaColor', function(){
    it('returns Blue or Graphite', function(){
      var color = appStub.getAquaColor();
      assert(color === 'Blue' || color === 'Graphite');
    });
  });
  describe('getHighlightColor', function(){
    it('returns an array of 3 integers between 0 and 255', function(){
      var color = appStub.getHighlightColor();
      assert(Array.isArray(color));
      assert(color.length === 3);
      for (var i = 0; i < 3; i++){
        //In range
        assert(color[i] >=0);
        assert(color[i] <= 255);
        //Integer
        assert(color[i] % 1 === 0);
      }
    });
  });
  describe('getSidebarIconSize', function(){
    it('returns Small, Medium or Large', function(){
      var size = appStub.getSidebarIconSize();
      assert(size === 'Small' || size === 'Medium' || size === 'Large');
    });
  });
  describe('getScrollbarVisibility', function(){
    it('returns Automatic, WhenScrolling or Always', function(){
      var visibility = appStub.getScrollbarVisibility();
      console.log(visibility);
      assert(visibility == 'Automatic' || visibility == 'WhenScrolling' || visibility == 'Always');
    });
  });
  describe('isScrollbarPaging', function(){
    it('returns a boolean', function(){
      var paging = appStub.isScrollbarPaging();
      assert(paging === true || paging === false);
    });
  });
});

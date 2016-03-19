const cp = require('child_process');

var getSystemDefault = function(key){
  val = cp.execSync('defaults read -g ' + key).toString();
  return val;
}
app.getSystemDefault = getSystemDefault;

exports = module.exports = function(electronApp){
  exports.electronApp = electronApp;
  
  //Aqua Color Appearance Setting
  electronApp.addDistributedNotificationObserver(
    'AppleAquaColorVariantChanged',
    'aqua-color-changed'
  );

  electronApp.getAquaColor = function(){
    return (getSystemDefault('AppleAquaColorVariant') == 1) ? 'Blue' : 'Graphite';
  }

  //Highlight Color
  electronApp.addDistributedNotificationObserver(
    'AppleColorPreferencesChangedNotification',
    'highlight-color-changed'
  );

  electronApp.getHighlightColor = function(){
    var string_rep = getSystemDefault('AppleHighlightColor');
    var num_list = string_rep.toString().split(' ').map((i) => Math.round(Number(i)*255));
    return num_list;
  }

  //Sidebar Icon Size
  electronApp.addDistributedNotificationObserver(
    'AppleSideBarDefaultIconSizeChanged',
    'sidebar-icon-size-changed'
  );

  electronApp.getSidebarIconSize = function(){
    size = getSystemDefault('NSTableViewDefaultSizeMode');
    return (size == 1) ? 'Small' : (size == 2) ? 'Medium' : 'Large';
  }

  //Scrollbar Visibility
  electronApp.addDistributedNotificationObserver(
    'AppleShowScrollBarsSettingChanged',
    'scrollbar-visibility-changed'
  );

  electronApp.getScrollbarVisibility = function(){
    return getSystemDefault('AppleShowScrollBars');
  }

  //Scrollbar Paging
  electronApp.addDistributedNotificationObserver(
    'AppleNoRedisplayAppearancePreferenceChanged',
    'scrollbar-paging-changed'
  );

  electronApp.isScrollbarPaging = function(){
    return getSystemDefault('AppleScrollerPagingBehaviour') == 0;
  }
}


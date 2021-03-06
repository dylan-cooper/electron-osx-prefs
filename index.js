const cp = require('child_process');

var getSystemDefault = function(key){
  try {
    val = cp.execSync(
      'defaults read -g ' + key, 
      stdio=['ignore', 'ignore', 'ignore']
    );
    return val.toString();
  } catch(e) {
    return null;
  }
}

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
    if (string_rep === null){
      //default blue highlight color
      num_list = [165, 203, 255];
    } else {
      num_list = string_rep.toString().split(' ').map((i) => Math.round(Number(i)*255));
    }
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
    return getSystemDefault('AppleShowScrollBars').trim();
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


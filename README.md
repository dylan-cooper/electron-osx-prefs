# electron-osx-prefs
> Electron API for some OSX System Preferences

Note that this relies on changes to electron that haven't yet been merged with this master branch.

## Usage

```js
app = require('electron').app;
require('electron-osx-prefs')(app);

app.getAquaColor();

app.on('aqua-color-changed', function(){
  //Event handler here
});

//...
```

##API

This API makes extensions to electron's 'app' API.  To make these changes, you simply run it as a function that takes the app object.

### Functions

#### app.getAquaColor()

Returns a string value, 'Blue' if the "aqua" color is blue, 'Graphite' if the "aqua" color is graphite.

#### app.getHighlightColor()

Returns an array of three integers between 0 and 255 corresponding to the RGB values of the system's highlight color.

#### app.getSidebarIconSize()

Returns a string value, either 'Small', 'Medium' or 'Large'.

#### app.getScrollbarVisibility()

Returns a string value, either 'Automatic', 'Always' or 'WhenScrolling' depending on the user's system preference.

#### app.isScrollbarPaging()

Returns a boolean value, true if the clicking the scrollbar is meant to go to the next page, false if clicking the scrollbar is meant to skip to that section.

### Events

This API also adds some events to the 'app'.

#### aqua-color-changed

Emitted when the "aqua" color is changed.

#### highlight-color-changed

Emitted when the highlight color is changed.

#### sidebar-icon-size-changed

Emitted when the sidebar icon size is changed.

#### scrollbar-visibility-changed

Emitted when the scrollbar visibility setting is changed.

#### scrollbar-paging-changed

Emitted when the scrollbar paging behaviour is changed.

## Building

Building the package:

```sh
$ npm install
```

## Testing

Unit tests for the package:

```sh
$ npm run test
```

## License

MIT © [Dylan Cooper]()

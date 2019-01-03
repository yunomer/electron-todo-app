'use strict'

const {app, BrowserWindow} = require('electron')

const defaultProps = {
  width: 500,
  height: 500,
  show: false
}

class Window extends BrowserWindow {
  constructor ({file, ...windowSettings}) {

    // calling new browser with these props
    super({...defaultProps, ...windowSettings})

    // load the HTML and open devtools
    this.loadFile(file)

    // this sets the menu to not show
    this.setMenu(null)

    // Show window when ready to prevent flickering
    this.once('ready-to-show', () => {
      this.show();
    })
  }
}

module.exports = Window;
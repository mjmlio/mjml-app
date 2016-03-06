<h3 align="center">
	Mjml app
</h3>

<br />

<p align="center">
	<a href="#" target="_blank">
    	<img width="250"src="https://mjml.io/assets/img/component.png">
    </a>
</p>

<br />

<p align="center">
	The first MJML Email Editor
</p>

<br />

This is a local editor for the [MJML](https://github.com/mjmlio/mjml) language.
It allows you to create responsive emails with a live preview on both phone and Desktop.

The app is based on React, Redux and Electron.

<p align="center">
  <img src="screenshot.png">
</p>

### Installation

Visit the [website](http://mjmlio.github.io/mjml-app/) to download the version that fits your platform.

### Build from source

OSX

``` bash
$ git clone <repo> mjml-app && cd mjml-app
$ npm install && npm run package
$ cp -r node_modules/electron-prebuilt release/darwin-x64/mjml-desktop-darwin-x64/mjml-app.app/Contents/Resources/app/node_modules/
```

### Releases and Changelogs

#### 1.0.0
 - Templates manager on the Home Page
 - Mobile/Desktop preview
 - Live reloading
 - Auto save
 - Theme manager
 - Test email
 - Export as Gist

pinceau - Firefox userChrome
=====

[Download](https://github.com/gocom/pinceau/releases/latest/download/pinceau.zip) | [Changes](https://github.com/gocom/pinceau/releases)

Personal userChrome.css, userContent.css and user.js customization for
[Firefox](https://www.mozilla.org/en-US/firefox/new/) 99 and newer, targeting more minimal user-interface and reduces on-boarding messages and tweaks Firefox's scrolling behaviour.

[![Firefox on Windows](https://raw.githubusercontent.com/gocom/pinceau/screenshots/images/firefox-windows.png)](https://raw.githubusercontent.com/gocom/pinceau/screenshots/images/firefox-windows.png)
*Firefox on Windows with pinceau*

[![Firefox on macOS](https://raw.githubusercontent.com/gocom/pinceau/screenshots/images/firefox.png)](https://raw.githubusercontent.com/gocom/pinceau/screenshots/images/firefox.png)
*Firefox on macOS with pinceau*

Install
-----

[Download a pre-built pinceau.zip package](https://github.com/gocom/pinceau/releases/latest/download/pinceau.zip) and extract the contents to your Firefox profile directory.

Tip: You open `about:profiles` page in Firefox to find and navigate to your profile directory.

Build manually from source
-----

On Unix-like systems you can clone the repository and build it:

```
$ git clone https://github.com/gocom/pinceau.git && cd pinceau
$ make build
```

Building requires [Node.js](https://nodejs.org/) and npm to be installed and available in path. Then place the built
files in the `build` directory to your Firefox profile, either manually, or by running:

```
$ make install
```

OpenSearch engines
-----

Open search engines can be installed through the included server and the web page:

```
$ make start
```

You can find the web server from the address printed after running the above command.

Customization
-----

### New tab page top site thumbnails

Custom thumbnails can be added by creating a `custom/sites` directory and adding thumbnail images named after the
site's hostname:

```
$ mkdir -p custom/sites
$ curl -s http://via.placeholder.com/320x180.jpg > custom/sites/google.com.jpg
$ curl -s http://via.placeholder.com/320x180.jpg > custom/sites/mozilla.org.jpg
$ make build
```

### Custom userContent style sheets

Custom styles sheets can be created to `custom/content` directory and will be appended to the generated userContent.css.

### Custom search engines

Custom OpenSearch engines can be created to `custom/opensearch/engines`.

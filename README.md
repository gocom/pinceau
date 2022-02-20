pinceau - Firefox userChrome
=====

[Download](https://github.com/gocom/pinceau/releases)

Personal userChrome.css, userContent.css and user.js customization for
[Firefox](https://www.mozilla.org/en-US/firefox/new/) 89 and newer, targeting more native-like macOS experience,
and disables on-boarding messages.

[![Screenshot](https://raw.githubusercontent.com/gocom/pinceau/screenshots/images/firefox.png)](https://raw.githubusercontent.com/gocom/pinceau/screenshots/images/firefox.png)

Install
----

[Download a pre-built package](https://github.com/gocom/pinceau/releases), or clone the repository and build it:

```
$ git clone https://github.com/gocom/pinceau.git && cd pinceau
$ make build
```

Then place the built files in the `build` directory to your Firefox profile, either manually, or running:

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

Custom thumbnails can be added by creating a `custom/sites` directory and adding thumbnail images named after the site's hostname:

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

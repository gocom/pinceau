pinceau - Firefox userChrome
=====

Personal userChrome.css, userContent.css and user.js customization for [Firefox](https://www.mozilla.org/en-US/firefox/new/) 65 and newer, targeting more native-like Mac OS experience, and disables on-boarding messages.

Install
----

Clone the repository, install dependencies and build it:

```
$ git clone https://github.com/gocom/pinceau.git && cd pinceau
$ npm install
$ npm run build
```

Then place the built files in the `build` directory to your Firefox profile:

```
$ npm run install
```

OpenSearch engines
-----

Open search engines can be installed through the included server and the web page:

```
$ npm start
```

Customization
-----

### New tab page top site thumbnails

Custom thumbnails can be added by creating a `custom/sites` directory and adding thumbnail images named after the site's hostname:

```
$ mkdir -p custom/sites
$ curl -s http://via.placeholder.com/320x180.jpg > custom/sites/google.com.jpg
$ curl -s http://via.placeholder.com/320x180.jpg > custom/sites/mozilla.org.jpg
$ npm run build
```

### Custom userContent style sheets

Custom styles sheets can be created to `custom/content` directory and will be appended to the generated userContent.css.

### Custom search engines

Custom OpenSearch engines can be created to `custom/opensearch/engines`.

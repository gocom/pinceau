Contributing
=====

License
-----

[MIT](https://raw.github.com/gocom/pinceau/master/LICENSE).

Versioning
----

[Semantic Versioning](https://semver.org/).

Development environment
-----

The local development environment uses nvm through Makefile wrapper to manage Node and npm version.

### Requirements

* GNU make
* GNU Coreutils
* [nvm](https://github.com/nvm-sh/nvm)

### Available commands

For available commands, see:

```shell
$ make help
```

### Building

To build distributable files, run:

```shell
$ make build
```

Builds are created to a `build` directory in the project directory,
which can be installed to a Firefox profile.

The current build can be installed to a locally installed Firefox
profiles by running:

```shell
$ make install
```

### Working on code

When making changes to code please make sure that linter and tests pass before opening a pull request. Linter
can be run with:

```shell
$ make lint
```

OpenSearch engines
-----

Open search engines can be installed through the included server and the web page:

```shell
$ make start
```

You can find the web server from the address printed after running the above command.

Customization
-----

Builds can be customized following these instructions.

### New tab page top site thumbnails

Custom thumbnails can be added by creating a `custom/sites` directory
and adding thumbnail images named after the
site's hostname:

```shell
$ mkdir -p custom/sites
$ curl -s http://via.placeholder.com/320x180.jpg > custom/sites/google.com.jpg
$ curl -s http://via.placeholder.com/320x180.jpg > custom/sites/mozilla.org.jpg
$ make build
```

### Custom userContent style sheets

Custom styles sheets can be created to `custom/content` directory and will be
appended to the generated userContent.css.

### Custom user.js preferences

Custom user settings file can be created to `custom/user.js` and it will be
appended to the generated user.js.

### Custom search engines

Custom OpenSearch engines can be created to `custom/opensearch/engines`.

Contributing
=====

License
-----

[MIT](https://raw.github.com/gocom/pinceau/master/LICENSE).

Versioning
----

[Semantic Versioning](https://semver.org/).

Requirements
-----

* GNU make
* [Docker](https://www.docker.com/) and Docker Compose

Development
-----

For available commands, see:

```shell
$ make help
```

Building
-----

To build distributable files, run:

```shell
$ make build
```

Builds are created to a `build` directory in the project directory,
which can be installed to a Firefox profile. If the build directory
exists already, you can force rebuilding with:

```shell
$ make rebuild
```

The current build can be installed to a locally installed Firefox
profile by running:

```shell
$ make install
```

The above install command requires that Node.js is installed locally
on the system, rather than only depending on Docker containers, due to the
installation process requiring access to query the host OS' file system.

OpenSearch engines
-----

Open search engines can be installed through the included server and the web page:

```shell
$ make start
```

You can find the web server from the address printed after running the above command.

Customization
-----

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

Coding style
-----

To verify that your additions follows coding style, run:

```shell
$ make lint
```

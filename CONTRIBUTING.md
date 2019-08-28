Contributing
=====

License
-----

[MIT](https://raw.github.com/gocom/pinceau/master/LICENSE).

Versioning
----

[Semantic Versioning](https://semver.org/).

Install dependencies
----

The project uses [npm](https://nodejs.org/) to manage dependencies and [Grunt](https://gruntjs.com/) to run tasks. To install dependencies, run:

```
$ npm install
```

Development
-----

Available commands to ease development, packaging and installing:

```
$ npm run project:build
$ npm run project:install
$ npm run project:pack
$ npm run watch
$ npm start
```

Coding style
-----

To verify that your additions follows coding style, run:

```
$ npm run lint
```

Configure git
-----

For convenience your committer, git user, should be linked to your GitHub account:

```
$ git config --global user.name "John Doe"
$ git config --global user.email john.doe@example.com
```

Make sure to use an email address that is linked to your GitHub account. It can be a throwaway address or you can use GitHub's email protection features. We don't want your emails, but this is to make sure we know who did what. All commits nicely link to their author, instead of them coming from ``foobar@invalid.tld``.

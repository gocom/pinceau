module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    prefix: {
      home: process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
    },

    build: {
      css: [
        'clean:css',
        'handlebars:userChrome',
        'handlebars:userContent'
      ],
      js: [
        'clean:js',
        'copy:js'
      ],
      opensearch: [
        'clean:opensearch',
        'copy:opensearch',
        'handlebars:opensearch',
        'handlebars:bookmarks'
      ]
    },

    clean: {
      'css': ['build/chrome/**/*.css'],
      'js': ['build/user.js'],
      'dist': ['dist/'],
      'opensearch': ['build/opensearch/']
    },

    compress: {
      publish: {
        options: {
          archive: 'dist/pinceau.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'build/',
            src: ['**'],
            dest: '/'
          }
        ]
      }
    },

    connect: {
      opensearch: {
        options: {
          port: 8314,
          protocol: 'http',
          hostname: '127.0.0.1',
          base: 'build/opensearch',
          open: false,
          keepalive: true,
          useAvailablePort: true
        }
      }
    },

    copy: {
      js: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'build/'
          }
        ]
      },
      opensearch: {
        files: [
          {
            flatten: true,
            expand: true,
            src: ['{src,custom}/opensearch/engines/*.xml'],
            dest: 'build/opensearch/engines/'
          }
        ]
      }
    },

    eslint: {
      target: ['Gruntfile.js', 'src/**/*.js']
    },

    handlebars: {
      bookmarks: {
        options: {
          engines: [
            '{src,custom}/opensearch/engines/*.xml'
          ],
          bookmarklets: [
            'src/opensearch/bookmarklet.js'
          ]
        },
        src: [
          'src/opensearch/bookmarks.html'
        ],
        dest: 'build/opensearch/bookmarks.html'
      },
      opensearch: {
        options: {
          engines: [
            '{src,custom}/opensearch/engines/*.xml'
          ],
          bookmarklets: [
            'src/opensearch/bookmarklet.js'
          ]
        },
        src: [
          'src/opensearch/install.html'
        ],
        dest: 'build/opensearch/index.html'
      },
      userChrome: {
        src: [
          'src/chrome/userChrome.css',
          'custom/chrome/*.css'
        ],
        dest: 'build/chrome/userChrome.css'
      },
      userContent: {
        options: {
          thumbnails: ['custom/sites/*.{gif,jpg,png}']
        },
        src: [
          'src/chrome/userContent.css',
          'custom/content/*.css',
          'custom/sites/*.css'
        ],
        dest: 'build/chrome/userContent.css'
      }
    },

    install: {
      options: {
        profiles: [
          '<%= prefix.home %>/Library/Application Support/Firefox/Profiles/*',
          '<%= prefix.home %>/.mozilla/firefox/*'
        ],
        backups: 'backup/<%= Date.now() %>/'
      },
      main: {
        files: [
          {
            expand: true,
            cwd: 'build/',
            src: '**/*.{css,js}',
            dest: '/'
          }
        ]
      }
    },

    jshint: {
      src: {
        files: {
          src: ['Gruntfile.js', 'src/**/*.js']
        },
        options: {
          jshintrc: true
        }
      }
    },

    watch: {
      css: {
        files: ['src/**/*.css', 'custom/{chrome,content,sites}/*'],
        tasks: ['build:css', 'install']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['build:js', 'install']
      },
      opensearch: {
        files: ['src/opensearch/**/*', 'custom/opensearch/engines/*'],
        tasks: ['build:opensearch']
      }
    }
  });

  /*
   * Lint.
   */
  grunt.registerTask('lint', 'Run linter.', [
    'eslint'
  ]);

  /*
   * Test.
   */
  grunt.registerTask('test', 'Run tests.', [
    'lint'
  ]);

  /*
   * Build.
   */
  grunt.registerMultiTask('build', 'Builds the project.', function () {
    grunt.task.run(this.data);
  });

  /*
   * Build templates.
   */
  grunt.registerMultiTask('handlebars', 'Builds templates.', function () {
    const path = require('path');
    const mime = require('mime-types');
    const handlebars = require('handlebars');
    const xml = require('xml2js');

    let options = this.options({
      bookmarklets: [],
      engines: [],
      thumbnails: []
    });

    let data = {
      bookmarklets: [],
      engines: [],
      thumbnails: []
    };

    grunt.file.expand(options.engines).forEach(function (src) {
      let contents, info;

      if (!grunt.file.exists(src)) {
        return;
      }

      contents = grunt.file.read(src, { encoding: null });
      info = path.parse(src);

      xml.parseString(contents, function (err, plugin) {
        let name, query;

        if (err) {
          return false;
        }

        plugin.OpenSearchDescription.Url.forEach(function (url) {
          if (url.$.type === 'text/html' && url.$.method === 'get') {
            query = url.$.template.replace('{searchTerms}', '%s');
            return false;
          }
        });

        name = plugin.OpenSearchDescription.ShortName[0];

        data.engines.push({
          engine: info.base,
          icon: plugin.OpenSearchDescription.Image[0]._,
          title: name,
          url: query,
          home: plugin.OpenSearchDescription['moz:SearchForm'],
          keyword: info.name.split('.').shift()
        });
      });
    });

    data.engines.sort(function (a, b) {
      return ('' + a.title).localeCompare(b.title);
    });

    grunt.file.expand(options.bookmarklets).forEach(function (src) {
      let contents;

      if (!grunt.file.exists(src)) {
        return;
      }

      contents = ('' + grunt.file.read(src, { encoding: null })).trim();

      data.bookmarklets.push({
        href: 'javascript:' + encodeURIComponent(contents)
      });
    });

    grunt.file.expand(options.thumbnails).forEach(function (src) {
      let contents, info, type;

      if (!grunt.file.exists(src)) {
        return;
      }

      contents = grunt.file.read(src, { encoding: null }).toString('base64');
      info = path.parse(src);
      type = mime.lookup(info.ext);

      if (type === false) {
        return;
      }

      data.thumbnails.push({
        site: info.name,
        type: type,
        base64: contents
      });
    });

    this.files.forEach(function (file) {
      let contents = [];

      file.src.forEach(function (src) {
        if (grunt.file.exists(src)) {
          contents.push(handlebars.compile(grunt.file.read(src))(data));
        }
      });

      grunt.file.write(file.dest, contents.join(''));
    });
  });

  /*
   * Installs.
   *
   * Firefox does not appear to follow symbolic links, and as such we
   * have to actually place the files in its profile directories, either
   * manually, or by automation.
   */
  grunt.registerMultiTask('install', 'Installs to browser profile.', function () {
    const path = require('path');

    const profiles = [];

    let options = this.options({
      backups: null,
      create: true,
      profiles: []
    });

    grunt.file.expand(options.profiles).forEach(function (profile) {
      if (grunt.file.exists(profile) && grunt.file.isDir(profile)) {
        grunt.verbose.ok(profile);
        profiles.push(profile);
      }
    });

    if (profiles.length === 0) {
      return;
    }

    this.files.forEach(function (file) {
      file.src.forEach(function (src) {
        if (!grunt.file.exists(src)) {
          return;
        }

        profiles.forEach(function (profile, id) {
          let dest = path.join(profile, file.dest);
          let backup = path.join(options.backups, id.toString(), path.basename(profile), file.dest);

          if (options.backups && grunt.file.exists(dest)) {
            grunt.file.copy(dest, backup);
          }

          if (options.create) {
            grunt.file.copy(src, dest);
          }
        });
      });
    });
  });

  /*
   * Packs.
   */
  grunt.registerTask('pack', 'Package the project.', [
    'compress'
  ]);

  /*
   * Default task.
   */
  grunt.registerTask('default', ['watch']);
};

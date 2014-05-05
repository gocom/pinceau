module.exports = function(grunt)
{
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jscs-checker');
    grunt.loadNpmTasks('grunt-mozilla-addon-sdk');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        addon: grunt.file.readJSON('src/package.json'),

        copy: {
            src: {
                files: [
                    {expand: true, cwd: 'src/', src: ['!**/*.css', '!**/*.js', '**'], dest: 'build/'}
                ]
            }
        },

        jscs: {
            src: {
                files: {
                    src: ['Gruntfile.js', 'src/**/*.js']
                },
                options: {
                    config: '.jscs.json'
                }
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

        'mozilla-cfx': {
            'run_stable': {
                options: {
                    'mozilla-addon-sdk': '1_16',
                    'extension_dir': 'src',
                    command: 'run'
                }
            },

            'run_experimental': {
                options: {
                    'mozilla-addon-sdk': 'master',
                    'extension_dir': 'src',
                    command: 'run'
                }
            }
        },

        'mozilla-cfx-xpi': {
            'stable': {
                options: {
                    'mozilla-addon-sdk': '1_16',
                    'extension_dir': 'src',
                    'dist_dir': 'dist',
                    'arguments': '--strip-sdk'
                }
            },

            'experimental': {
                options: {
                    'mozilla-addon-sdk': 'master',
                    'extension_dir': 'src',
                    'dist_dir': 'dist'
                }
            }
        },

        'mozilla-addon-sdk': {
            '1_16': {
                options: {
                    revision: '1.16',
                    'dest_dir': 'build_tools/'
                }
            },

            'master': {
                options: {
                    revision: 'master',
                    github: true
                }
            }
        },

        watch: {
            src: {
                files: ['src/**'],
                tasks: ['build']
            },

            js: {
                files: ['Gruntfile.js', 'src/**/*.js'],
                tasks: ['jshint']
            }
        }
    });

    grunt.registerTask('build', ['test', 'mozilla-cfx-xpi:stable']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['jshint', 'jscs']);
};

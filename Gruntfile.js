/*jslint node: true */
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },

        copy: {
            main: {
                files: [{
                    //for jquery files
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/jquery/dist',
                    src: ['jquery.min.js','jquery.min.map'],
                    dest: 'dist/js'
                },{
                  //for HTML5Shiv files
                  expand: true,
                  dot: true,
                  cwd: 'bower_components/html5shiv/dist',
                  src: ['html5shiv.min.js'],
                  dest: 'dist/js'
                },{
                  //for Fontawesome stylesheet files
                  expand: true,
                  dot: true,
                  cwd: 'bower_components/fontawesome/css',
                  src: ['font-awesome.min.css'],
                  dest: 'dist/css'
                },{
                  //for Bootstrap stylesheet files
                  expand: true,
                  dot: true,
                  cwd: 'bower_components/bootstrap/dist/css',
                  src: ['bootstrap.css'],
                  dest: 'dist/css'
                },{
                  //for Bootstrap theme stylesheet files
                  expand: true,
                  dot: true,
                  cwd: 'bower_components/bootstrap/dist/css',
                  src: ['bootstrap-theme.css'],
                  dest: 'dist/css'
                },{
                  //for Angular Material stylesheet files
                  expand: true,
                  dot: true,
                  cwd: 'bower_components/angular-material',
                  src: ['angular-material.css'],
                  dest: 'dist/css'
                },{
                    //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                },{
                    //for dripicons fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/dripicons',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                },{
                    //for weather fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/weather-icons',
                    src: ['font/*.*'],
                    dest: 'dist'
                },{
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                },
                {
                    //for Images
                    expand: true,
                    dot: true,
                    cwd: 'images',
                    src: ['*.*','background/*'],
                    dest: 'dist/images'
                }]
            },
            copyicons: {
                files: [{
                    //for Images
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/material-design-icons',
                    src: ['*/svg/production/*.svg'],
                    dest: 'dist/img/icons',
                    flatten: true
                }]
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/app.js': [ 'dist/js/app.js' ]
                },
                options: {
                    mangle: false,
                    preserveComments: 'some'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/css/main.css': [
                        'bower_components/dripicons/css/dripicons.css',
                        'bower_components/weather-icons/css/weather-icons.min.css',
                        'styles/styles.css'
                    ]
                }
            },
            add_banner: {
                options: {
                    banner: '/* My minified admin css file */'
                },
                files: {
                    'dist/css/main.css': ['dist/css/main.css']
                }
            }
        },

        html2js: {
            dist: {
                src: [ 'app/views/*.html','app/views/charts/*.html'],
                dest: 'tmp/views.js'
            }
        },

        clean: {
            temp: {
                src: [ 'tmp' ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.js',
                    'bower_components/jquery.sparkline.build/dist/jquery.sparkline.min.js',
                    'bower_components/ngmap/build/scripts/ng-map.js',
                    'bower_components/ng-breadcrumbs/dist/ng-breadcrumbs.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/slimScroll/jquery.slimscroll.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-messages/angular-messages.min.js',
                    'bower_components/angular-aria/angular-aria.min.js',
                    'bower_components/angular-material/angular-material.min.js',
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/raphael/raphael-min.js',
                    'bower_components/morrisjs/morris.min.js',

                    'bower_components/jqvmap/jqvmap/jquery.vmap.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'app/views/charts/directives/sparkDanger.js',
                    'app/views/charts/flotCharts/directives/*.js',
                    'app/*.js',
                    'app/views/sensors/**/*.js'],
                dest: 'dist/js/app.js'
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8888
                }
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'app/*.js',"app/views/sensors/**/*.js",'*.html','styles/*.scss','app/views/charts/directives/*.js' ],
                tasks: [ 'jshint','html2js:dist','copy:main', 'concat:dist', 'clean:temp','cssmin' ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'app/*.js', '*.html','styles/*.scss' ],
                tasks: [ 'jshint','html2js:dist','copy:main', 'concat:dist', 'clean:temp', 'uglify:dist','cssmin' ],
                options: {
                    atBegin: true
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: [ 'index.html' ],
                    dest: '/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('dev', [ 'bower', 'connect:server', 'watch:dev' ]);
    grunt.registerTask('test', [ 'bower', 'jshint' ]);
    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
    grunt.registerTask('copy-icons', [ 'copy:copyicons' ]);
};
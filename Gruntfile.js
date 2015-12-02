var grunt = require('grunt');

grunt.initConfig({
    clean: {
        styleguide: ['styleguide'],
        build: ['build']
    },
    watch: {
        styleguide: {
            files: ['assets/less/**', 'assets/template/**'],
            tasks: ['styleguide']
        }
    },
    copy: {
        main: {
            files: [
                { expand: true, cwd: 'build/css', src: '**', dest: 'styleguide/public', filter: 'isFile' },
                { expand: true, cwd: 'bower_components/bootstrap/fonts', src: '**', dest: 'styleguide/fonts' }
            ]
        }
    },
    less: {
        main: {
            files: {
                'build/css/main.css': 'assets/less/main.less',
                'build/css/styleguide.css': 'assets/less/styleguide.less'
            }
        }
    },
    shell: {
        kss: {
            command: function () {
                return 'kss-node ' + [
                    '--source assets/less',
                    '--destination styleguide',
                    '--template assets/template',
                    // '--css public/main.css',
                    '--css public/styleguide.css',
                    '--helpers assets/template/helpers',
                    '--title "GEWIS Styleguide"'
                ].join(' ');
            }
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-shell');

grunt.registerTask('styleguide', ['clean:styleguide', 'less:main', 'shell:kss', 'copy:main']);
grunt.registerTask('default', ['styleguide']);

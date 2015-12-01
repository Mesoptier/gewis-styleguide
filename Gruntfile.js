var grunt = require('grunt');

grunt.initConfig({
    clean: {
        styleguide: ['styleguide']
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
                { expand: true, cwd: 'assets/css', src: '**', dest: 'styleguide/public', filter: 'isFile' }
            ]
        }
    },
    less: {
        main: {
            files: {
                'assets/css/main.css': 'assets/less/main.less'
            }
        }
    },
    shell: {
        kss: {
            command: 'kss-node --source assets/less --destination styleguide --template assets/template --css public/main.css --title "GEWIS Styleguide"'
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

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> */\n'
			},
			build: {
				src: 'js/src/*.js',
				dest: 'js/dist/<%= pkg.name %>.min.js'
			}
		},
		sass: {
			default: {
				options: {
					style  : 'compressed',
					compass: true
				},
				files  : [{
					expand: true,
					cwd   : 'sass',
					src   : ['*.scss'],
					dest  : 'stylesheets',
					ext   : '.css'
				}]
			}
		},
                shipit: {
                        options: {
                                workspace: '/tmp/statetable-com',
                                deployTo: '/srv/www/statetable.com',
                                repositoryUrl: 'https://github.com/daveross/statetable-com.git',
                                ignores: ['.git', 'node_modules'],
                                keepReleases: 2,
                                key: '/Users/dave-work/.ssh/id_rsa',
                                shallowClone: true
                        },
                        // grunt shipit:production deploy
                        production: {
                                servers: 'root@davidmichaelross.com'
                        }
                }
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-shipit');
        grunt.loadNpmTasks('shipit-deploy');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'sass']);

        // Update Node Modules and Bower Components
        grunt.shipit.on('updated', function() {
                grunt.task.run([
                        'update-node-components'
                ]);
        });

        // update node components
        grunt.registerTask('update-node-components', function() {
                var     done              = this.async();

                grunt.shipit.remote(['cd', grunt.shipit.releasePath, '&&', 'npm install --allow-root', '&&', 'service statetable.com restart'].join(' ')).then(done);
        });



};

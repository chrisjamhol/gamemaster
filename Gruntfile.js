module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['*.js']//,'public/js/*.js']
		},
		express: {
			dev: {
				options: {
					script: 'app.js',
					node_env: 'development'
				}
			}
		},
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint'],
			},
			express: {
				files: ['app.js','routes/*.js','db/*.js','db/models/*.js','api/*.js'],
				tasks: ['jshint','express:dev'],
				options: {
					spawn: false
				}
			},
			css: {
				files: 'public/css/*.css',
				options: {
					livereload: true
				}
			},
			script: {
				files: 'public/js/*.js',
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['views/**/*.jade','views/**/*.html','*.js'],
				options: {
					livereload: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['jshint','watch','express:dev']);
};
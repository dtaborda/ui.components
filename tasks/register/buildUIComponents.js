//Common ui.component module containing all modules for src and templates
//findModule: Adds a given module to config
module.exports = function (grunt) {
    var foundModules = {};
    function findModule(name) {
        if (foundModules[name]) { return;}
        foundModules[name] = true;

        function breakup(text, separator) {
            return text.replace(/[A-Z]/g, function (match) {
                return separator + match;
            });
        }
        function ucwords(text) {
            return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        }
        function enquote(str) {
            return '"' + str + '"';
        }

        var module = {
            name: name,
            moduleName: enquote('<%= config.name %>.' + name),
            displayName: ucwords(breakup(name, ' ')),
            srcFiles: grunt.file.expand('src/components/'+name+'/*.js'),
            tplFiles: grunt.file.expand('src/components/'+name+'/*.html'),
            tpljsFiles: grunt.file.expand('dist/templates.js/src/components/'+name+'/*.html.js'),
            tplModules: grunt.file.expand('src/components/'+name+'/*.html').map(enquote),
            dependencies: dependenciesForModule(name)
        };
        module.dependencies.forEach(findModule);
        grunt.config('config.modules', grunt.config('config.modules').concat(module));
    }

    function dependenciesForModule(name) {
        var deps = [];
        grunt.file.expand('src/components/' + name + '/*.js')
        .map(grunt.file.read)
        .forEach(function(contents) {
          //Strategy: find where module is declared,
          //and from there get everything inside the [] and split them by comma
          var moduleDeclIndex = contents.indexOf('angular.module(');
          var depArrayStart = contents.indexOf('[', moduleDeclIndex);
          var depArrayEnd = contents.indexOf(']', depArrayStart);
          var dependencies = contents.substring(depArrayStart + 1, depArrayEnd);
          dependencies.split(',').forEach(function(dep) {
            if (dep.indexOf('<%= config.name %>.') > -1) {
              var depName = dep.trim().replace('<%= config.name %>.','').replace(/['"]/g,'');
              if (deps.indexOf(depName) < 0) {
                deps.push(depName);
                //Get dependencies for this new dependency
                deps = deps.concat(dependenciesForModule(depName));
              }
            }
          });
        });
        return deps;
    }

    //build ui-componets
    grunt.registerTask('build', 'Create ui-components build files', function() {
        var _ = grunt.util._;

        //If arguments define what modules to build, build those. Else, everything
        if (this.args.length) {
            this.args.forEach(findModule);
            grunt.config('filename', grunt.config('filenamecustom'));
        } else {
            grunt.file.expand({
                filter: 'isDirectory', cwd: '.'
            }, 'src/components/*').forEach(function(dir) {
                findModule(dir.split('/')[2]);
            });
        }

        var modules = grunt.config('config.modules');
        grunt.config('srcModules', _.pluck(modules, 'moduleName'));
        grunt.config('tplModules', _.pluck(modules, 'tplModules').filter(function(tpls) { return tpls.length > 0;} ));

        var srcFiles = _.pluck(modules, 'srcFiles');
        var tpljsFiles = _.pluck(modules, 'tpljsFiles');
        //Set the concat task to concatenate the given src modules
        grunt.config('concat.dist.src', grunt.config('concat.dist.src')
                     .concat(srcFiles));
        //Set the concat-with-templates task to concat the given src & tpl modules
        grunt.config('concat.dist_tpls.src', grunt.config('concat.dist_tpls.src')
                     .concat(srcFiles).concat(tpljsFiles));

        grunt.task.run([
            'jshint:dist',
            'clean',
            'html2js:dist',
            'concat',
            'uglify',
        ]);
    });
}
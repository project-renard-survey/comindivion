exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: "js/app.js",
      order: {
        before: ["node_modules/jquery/dist/jquery.min.js",
                 "node_modules/select2/dist/js/select2.min.js"]
        // after: ["web/static/js/app.js"] // concat app.js last
      },

      // To use a separate vendor.js bundle, specify two files path
      // http://brunch.io/docs/config#-files-
      // joinTo: {
      //  "js/app.js": /^(web\/static\/js)/,
      //  "js/vendor.js": /^(web\/static\/vendor)|(deps)/
      // }
      //
      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     "web/static/vendor/js/jquery-2.1.1.js",
      //     "web/static/vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: "css/app.css",
      order: {
        after: ["web/static/css/app.css"] // concat app.css last
      }
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/web/static/assets". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(web\/static\/assets)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "deps/phoenix/web/static",
      "deps/phoenix_html/web/static",
      "web/static",
      "test/static"
    ],

    // Where to compile files to
    public: "priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/web\/static\/vendor/]
    },
    css: {
      cssModules: true
    },
    sass: {
      options: {
        includePaths: ["node_modules"], // tell sass-brunch where to look for files to @import
        precision: 8 // minimum precision required by bootstrap
      }
    },
    afterBrunch: [
      // Make symlinks on images from vis.js to expected location
      'mkdir -p web/static/assets/css/img/network && cd web/static/assets/css/img/network && if [ -z "$(ls -A ./)" ]; then ln -s ../../../../../../node_modules/vis/dist/img/network/* ./; fi'
    ]
  },

  modules: {
    autoRequire: {
      "js/app.js": ["web/static/js/app"]
    }
  },

  npm: {
    enabled: true,
    globals: {
      $: 'jquery',
      jQuery: 'jquery'
    },
    styles: {
      flatpickr: ['dist/flatpickr.css'],
      select2: ['dist/css/select2.css'],
      awesomplete: ['awesomplete.css'],
      // 'select2-bootstrap-css': ['select2-bootstrap.css'],
      vis: ['dist/vis.css']
    }
  }
};

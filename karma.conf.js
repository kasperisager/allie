module.exports = config => {
  config.set({
    frameworks: [
      'browserify',
      'mocha'
    ],
    browsers: [
      'ChromeHeadless'
    ],
    files: [
      'test/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.js': [
        'browserify'
      ],
      'test/**/*.js': [
        'browserify'
      ]
    },
    reporters: [
      'mocha',
      'coverage'
    ],
    browserify: {
      transform: [
        ['babelify', {
          presets: [
            'power-assert'
          ],
          plugins: [
            'transform-runtime',
            ['istanbul', {
              excllude: 'test/**/*'
            }]
          ]
        }]
      ]
    }
  });
};

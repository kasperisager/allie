const headers = require('./test/helper/headers');

headers.forEach(header =>
  Object.assign(header, {match: '.*\\.html'})
);

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
            'istanbul'
          ]
        }]
      ]
    },
    customHeaders: headers
  });
};

/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'node',

  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: 'reports',
        filename: 'index.html'
      }
    ]
  ],

};

export default config;
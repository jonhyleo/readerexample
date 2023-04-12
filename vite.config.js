const path = require('path');

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './src/index.html',
        login: './src/login/index.html'
      }
    }
  },
  server: {
    port: 3001,
    hot: true
  }
};

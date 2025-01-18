const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/wait-times',
    createProxyMiddleware({
      target: 'https://disneyland.wdwpassport.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/wait-times': '/wait-times/disneyland'
      },
    })
  );
};

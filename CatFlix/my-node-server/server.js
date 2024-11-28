const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy API requests to the actual API
app.use('/api', createProxyMiddleware({
  target: 'https://api.themoviedb.org', // Replace with your API's URL
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Rewrite the URL to remove '/api' prefix
  },
}));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

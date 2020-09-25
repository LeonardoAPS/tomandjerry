const express = require('express');

const guacamoleRoute = require('./guacamole');

const router = express.Router();

module.exports = params => {
	const { response } = params;
  
  router.use('/guacamole', guacamoleRoute(params));
  
  return router;
};
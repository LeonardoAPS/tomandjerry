const express = require('express');
const router = express.Router();

module.exports = params => {
  const { guacamoleService } = params;
  
router.get('/', async (request, response, next) => {
    try {
      //***************** Start DEBUG 
      console.log(">>> Starting '/' router for guacamole...");
      //***************** End DEBUG        
    } catch (err) {
      return next(err);
    }
  });    

  router.get('/:id', async (request, response, next) => {
    try {
       //***************** Start DEBUG 
      console.log(">>> Starting '/id' router for guacamole...");
      //***************** End DEBUG       

      //const playerId = await guacamoleService.getId();
      let player = {'id': request.params.id};

      return response.render('layout', {
        pageTitle: 'Guacamole',
        template: 'guacamole',
        player
      }); 
    } catch (err) {
      return next(err);
    }
  });  

  return router;
};
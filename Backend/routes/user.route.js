const  express =  require('express');
const { test , updateUser} = require('../controller/user.controller.js');
const verifyUser = require('../Utils/UserVerifier.js');
const  router =  express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
router.get('/test', test)
router.post('/update/:id',verifyUser, updateUser)

module.exports = router;
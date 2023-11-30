const  express =  require('express');
const { test , updateUser ,deleteUser} = require('../controller/user.controller.js');
// const verifyUser = require('../Utils/verifyUser.js');
const  router =  express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
router.get('/test', test)
router.post('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router;
const  express =  require('express');
const { test , updateUser ,deleteUser, getUserConctact , getUserListing} = require('../controller/user.controller.js');
const  router =  express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
router.get('/test', test)
router.post('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/listings/:id', getUserListing)
router.get('/:id', getUserConctact)

module.exports = router;
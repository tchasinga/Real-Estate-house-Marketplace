const  express =  require('express');
const { test } = require('../controller/user.controller');
const  router =  express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
router.get('/test', test)

module.exports = router;
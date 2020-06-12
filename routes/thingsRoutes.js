const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const thingController = require('../controllers/thing');


router.get('/stuff', auth, thingController.getThings);
router.post('/stuff', auth, multer, thingController.postThing);

router.get('/stuff/:id', auth, thingController.getThing);

router.put('/stuff/:id', auth, thingController.updateThing)

router.delete('/stuff/:id', auth, thingController.deleteThing);



module.exports = router;
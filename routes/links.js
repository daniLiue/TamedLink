const { Router } = require('express');

const LinkController = require('../controllers/link'); 
const auth = require('../middlewares/authMiddleware');

const router = Router();

router.post('/generate', auth, LinkController.generate)

router.get('/', auth, LinkController.allLinks)

router.get('/:id', auth, LinkController.getLinks)

module.exports = router;
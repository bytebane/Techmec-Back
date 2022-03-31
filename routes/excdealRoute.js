const router = require('express').Router();
const excdealController = require('../controllers/excdealController')
const { verifyAdmin } = require("../middleware/verifyToken"); 

router.post('/', verifyAdmin, excdealController.createExcdeal);

router.get('/', excdealController.getExcdeal);

router.patch('/:dealId', verifyAdmin, excdealController.editExcdeal);

router.delete('/:dealId', verifyAdmin, excdealController.deleteExcdeal);

module.exports = router;
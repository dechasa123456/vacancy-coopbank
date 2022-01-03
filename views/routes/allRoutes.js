const express = require('express');
const router = express.Router();
router.use(require('./allRows'));
router.use(require('./registration'));
router.use(require('./admin_registration'));
module.exports = router;
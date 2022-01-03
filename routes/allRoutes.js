const express = require('express');
const router = express.Router();
router.use(require('./allRows'));
router.use(require('./registration'));
module.exports = router;
'use strict';
const express = require('express');
const router = express.Router();
const UrlController = require('../src/controllers/UrlController');

router.post('/api/url/shorten', UrlController.generator);
router.get('/:code', UrlController.redirect)

module.exports = router;
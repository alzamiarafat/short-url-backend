'use strict';
const UrlService = require('../services/UrlService');

const UrlController = {
    generator: async (req, res, next) => {
        try {
            const shortUrl = await UrlService.generator(req);
            res.json(shortUrl);
        } catch (error) {
            next(error);
        }
    },

    redirect: async (req, res, next) => {
        try {
            const shortUrl = await UrlService.redirect(req);
            if (shortUrl) {
                return res.redirect(shortUrl.original_url);
            } else {
                return res.status(404).json('No URL found');
            }
        } catch (error) {
            next(error);
        }
    }
};

UrlController.name = 'UrlController';
module.exports = UrlController;
'use strict';
const Url = require('../models/Url');

const UrlRepository = {
    store: async (body) => {
        const url = new Url(body);
        return await url.save();
    },

    getByCode: async (code) => {
        return await Url.findOne({ url_code: code });
    }
};

UrlRepository.name = 'UrlRepository';
module.exports = UrlRepository;
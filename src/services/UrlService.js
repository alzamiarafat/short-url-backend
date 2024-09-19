'use strict';
const CommonService = require('../services/CommonService');
const UrlRepository = require('../repositories/UrlRepository');

const UrlService = {
    generator: async (req) => {
        const { original_url } = req.body;

        const hashNumber = CommonService.hashUrlToNumber(original_url);
        let encoded = CommonService.encodeBase62(hashNumber);

        const uniqueCode = CommonService.generateUniqueCodeForUrl(encoded);
        const data = {
            original_url,
            url_code: uniqueCode,
            short_url: `${req.headers.host}/${uniqueCode}`
        }
        return await UrlRepository.store(data);
    },

    redirect: async (req) => {
        const { code } = req.params;
        return await UrlRepository.getByCode(code);
    }
};

UrlService.name = 'UrlService';
module.exports = UrlService;
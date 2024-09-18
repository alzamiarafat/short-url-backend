'use strict';
const crypto = require('crypto');
const CommonConstant = require('../constants/CommonConstant');

const CommonService = {
    // Function to encode a number to Base62
    encodeBase62(num) {
        let result = '';

        // Repeat until the number has been fully converted
        while (num > 0) {
            result = CommonConstant.BASE62_CHAR[num % 62] + result;
            num = Math.floor(num / 62);
        }

        return result;
    },

    // Function to hash a URL to a numeric value
    hashUrlToNumber(url) {
        // Create a hash of the URL using SHA-256, which generates a 64-character hex string
        const hash = crypto.createHash('sha256').update(url).digest('hex');

        // Take the first 10 characters of the hash and convert them to a number
        const num = parseInt(hash.substring(0, 10), 16);

        return num;
    },

    // Function to generate a unique 6-character code for a given URL
    generateUniqueCodeForUrl(encoded) {
        // Ensure the code is exactly 6 characters long (truncate or pad if necessary)
        if (encoded.length > 6) {
            encoded = encoded.substring(0, 6);  // Truncate to 6 characters
        } else {
            while (encoded.length < 6) {
                encoded = '0' + encoded;  // Pad with leading zeros if necessary
            }
        }

        return encoded;
    }
};

CommonService.name = 'CommonService';
module.exports = CommonService;
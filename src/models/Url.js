const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    original_url: { type: String, required: true },
    url_code: { type: String, required: true, unique: true },
    short_url: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
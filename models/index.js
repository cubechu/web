var mongoose = require('mongoose');
var config = require('../config/config');
var msgSchema = require('./msg');
var cmtSchema = require('./cmt');

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

exports.microblog = mongoose.model('msg', msgSchema);
exports.comments = mongoose.model('cmt', cmtSchema);
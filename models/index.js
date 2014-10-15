var mongoose = require('mongoose');
var config = require('../config/config');
var microblogSchema = require('./microblog');
var commentSchema = require('./comment');

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

exports.microblog = mongoose.model('microblog', microblogSchema);
exports.comments = mongoose.model('comment', commentSchema);
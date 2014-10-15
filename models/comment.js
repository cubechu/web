var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    receiverId: {type: String},
    receiverName: {type: String},
    cmtUserId: {type: String},
    cmtUserName: {type: String},
    cmtUserAvatar: {type: String},
    content: {type: String},
    mbId: {type: String},
    sendTime: {type: Date, default: Date.now()}
});

commentSchema.statics = {
    fetch: function(cb){
        return this.find({}).sort({'sendTime': 'desc'}).exec(cb);
    }
};

module.exports = commentSchema;
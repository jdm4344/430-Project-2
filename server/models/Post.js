const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let PostModel = {};

const convertId = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: setTitle,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
      },
    createdData: {
    type: Date,
    default: Date.now,
    },
});

PostSchema.statics.findByOwner = (ownerID, callback) => {
    const search = {
      owner: convertId(ownerID),
    };
  
    return DomoModel.find(search).select('title content createdDate').exec(callback);
};

PostModel = mongoose.model("Post", PostSchema);

module.exports.PostModel = PostModel;
module.exports.PostSchema = PostSchema;
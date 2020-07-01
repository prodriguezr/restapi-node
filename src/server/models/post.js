const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema ({
    title   : { type: String,  required: true },
    message : { type: String,  required: true },
    user    : { type: String,  required: true },
    inserted: { type: Date,    required: true, default: new Date() },
    updated : { type: Date,    required: false                     },
    deleted : { type: Boolean, required: true, default: false      }
});

PostSchema.index({ title: 1, deleted: 1 }, { unique: true, sparse: true});

module.exports = mongoose.model('Post', PostSchema);
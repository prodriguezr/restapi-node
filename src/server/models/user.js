const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    username: { type: String,  required: true, lowercase: true     },
    name:     { type: String,  required: true                      },
    password: { type: String,  required: true                      },
    email:    { type: String,  required: false, lowercase: true    },
    office:   { type: String,  required: false                     },
    salary:   { type: Number,  required: false                     },
    inserted: { type: Date,    required: true, default: new Date() },
    updated:  { type: Date,    required: false                     },
    deleted:  { type: Boolean, required: true, default: false      }
});

UserSchema.index({ username: 1, email: 1, deleted: 1 },{ unique: true, sparse: true});

module.exports = mongoose.model('User', UserSchema);
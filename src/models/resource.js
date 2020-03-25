const mongoose = require('mongoose');
const {Schema} = mongoose;

const resoourceSchema = new Schema({
    title: {type: String, required: true},
    key: {type: String, required: true},
    description:{type: String, required: false},
    source:{type: String, required: false},
    typeResource:{type: String, required:false},
    coverage:{type:String, required: false}
});

module.exports = mongoose.model('Resource', resoourceSchema);
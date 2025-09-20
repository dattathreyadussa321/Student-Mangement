const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    grade: { type: String, required: true }  ,
    phone : {type:Number,required:true}
});

module.exports = mongoose.model('Student', studentSchema, 'students');

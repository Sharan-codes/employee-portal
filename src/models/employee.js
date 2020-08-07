const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');

empSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Improper email.');
          }
        }
    },
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date
    },
    phone: {
        type: Number
    },
    manager: {
        type: Number
    },
    empManaged: {
        type : Array,
        default : []
    }
}, {
    timestamps: true
});

empSchema.plugin(AutoIncrement, {id:'empId_counter', inc_field: 'empId'});

const Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;
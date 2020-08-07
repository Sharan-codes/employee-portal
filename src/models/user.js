const mongoose = require('mongoose');
const validator = require('validator');

const Employee = mongoose.model('Employee', new mongoose.Schema({
    empId: {
        type: Number,
        default: TRUE,
        validate(value) {
          if (value < 0) {
            throw new Error('empId must be a positive number');
          }
        }
    },
    name: {
        type: String,
        required: true,
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
})
);

module.exports = Employee;
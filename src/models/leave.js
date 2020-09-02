require('../constants');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');

leaveSchema = new mongoose.Schema({
    appliedBy: {
        type: Number,
        required: true
    },
    appliedTo: {
        type: Number,
        required: true
    },
    watchers: {
        type : Array,
        default : []
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    numDays: {
        type: Number
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
      type: Number,
      default: APPLIED
    }
}, {
    timestamps: true
})

leaveSchema.plugin(AutoIncrement, {id:'leaveId_counter', inc_field: 'leaveId'});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
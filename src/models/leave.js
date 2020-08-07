const mongoose = require('mongoose');
const validator = require('validator');

const Leave = mongoose.model('Leave', new mongoose.Schema({
    leaveId: {
        type: Number,
        default: TRUE,
        validate(value) {
          if (value < 0) {
            throw new Error('leaveId must be a positive number');
          }
        }
    },
    appliedBy: {
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
      default: TRUE,
      validate(value) {
        if (value!==TRUE && value!==FALSE) {
          throw new Error('status must be TRUE or FALSE');
        }
      }
    }
}, {
    timestamps: true
})
);

module.exports = Leave;
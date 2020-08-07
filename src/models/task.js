const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task', new mongoose.Schema({
    taskId: {
        type: Number,
        default: TRUE,
        validate(value) {
          if (value < 0) {
            throw new Error('taskId must be a positive number');
          }
        }
    },
    projId: {
        type: Number,
        default: TRUE,
        validate(value) {
          if (value < 0) {
            throw new Error('projId must be a positive number');
          }
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: Number,
        required: true,
    },
    estTime: {
        type: Number
    },
    assignedTo: {
        type: Number,
        required: true,
    },
    timeSpent: {
        type: Number
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

module.exports = Task;
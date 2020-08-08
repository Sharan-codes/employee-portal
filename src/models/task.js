const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');

taskSchema = new mongoose.Schema({
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
});

taskSchema.plugin(AutoIncrement, {id:'taskId_counter', inc_field: 'taskId'});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
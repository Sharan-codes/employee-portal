require('../constants');
const mongoose = require('mongoose');
const validator = require('validator');

projSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  createdBy: {
      type: Number,
      required: true,
  },
  empsAssigned: {
      type : Array,
      default : []
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

projSchema.plugin(AutoIncrement, {id:'projId_counter', inc_field: 'projId'});

const Project = mongoose.model('Project', projSchema);

module.exports = Project;
const mongoose = require('mongoose');
const validator = require('validator');

const Project = mongoose.model('Project', new mongoose.Schema({
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
    empsAssigned: {
        type : Array,
        default : []
    },
    status: {
      type: Number,
      default: TRUE,
      validate(value) {
        if (value!==1 && value!==2) {
          throw new Error('status must be 1 or 2');
        }
      }
    }
}, {
    timestamps: true
})
);

module.exports = Project;
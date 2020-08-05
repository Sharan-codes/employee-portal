const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongodbuser:mongodbuser@cluster0.ephto.mongodb.net/employee-portal?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useCreateIndex : true,
  useUnifiedTopology: true,
  useFindAndModify : false
});


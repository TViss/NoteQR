// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var qrcodesSchema = new Schema({
  hash: String,
  message: String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Qrcodes = mongoose.model('Qrcodes', qrcodesSchema);

module.exports = Qrcodes;

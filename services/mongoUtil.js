const mongoose = require("mongoose");
const keys = require("../config/keys");
let _db;

module.exports = {
  connectToServer: function( callback ) {
    mongoose.connect(keys.mongoURI, function(err, db) {
      if (err) {
        console.log("error connecting to DB:", err);
      } else {
        _db = db;
        console.log("db is ready");
      }
    });
  },
  getDb: function() {
    return _db;
  }
};

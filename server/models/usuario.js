const mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El name es necesario"],
  },
  dni: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
  },
  password: {
    type: String,
    required: [true, "Le contraseña es obligatoria"],
  },
  scheduled_slot: {
    type: Date,
    required: false,
  },
  vaccines: {
    type: [Date],
    required: true,
  },
});

// elimina la key password del objeto que retorna al momento de crear un usuario
userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

userSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser único",
});

module.exports = mongoose.model("User", userSchema);

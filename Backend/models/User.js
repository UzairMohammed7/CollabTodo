const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter a valid email address",
        ], },
    password: { type: String, required: true, minlength: [6, "Password must be at least 6 characters"],
        match: [
          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
          "Password must be at least 6 characters long and include at least one letter and one number",
        ], },
    soketId:{ type: String }
});

module.exports = mongoose.model("User", UserSchema);

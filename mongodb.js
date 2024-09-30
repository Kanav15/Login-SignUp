const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginSignup")
.then(() => {
    console.log("mongodb Connected");
})
.catch(() => {
    console.log("failed to connect");
});

const LogInSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'faculty']  // Only allow these two roles
    }
});

const collection = new mongoose.model("collection1", LogInSchema);

module.exports = collection;

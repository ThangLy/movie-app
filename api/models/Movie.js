const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String },
        img: { type: String },
        vote_count: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
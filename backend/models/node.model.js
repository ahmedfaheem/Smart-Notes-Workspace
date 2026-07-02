const mongoose = require("mongoose");
const { CATEGORIES, STATUS} = require("../constants/note.constants")
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: CATEGORIES,
      default: "General",
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: STATUS,
      default: "Todo",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Note", noteSchema);

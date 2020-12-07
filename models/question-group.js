const mongoose = require('mongoose');

const questionGroupSchema = new mongoose.Schema({
    name: String,
    creator: {
        name: String
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    questions: [
        new mongoose.Schema({
            title: String,
            content: String
        })
    ]
});

module.exports = mongoose.model('QuestionGroup', questionGroupSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const examSchema = new Schema({
    examName: { type: String, required: true },
    description: { type: String },
    images:[{ type: Schema.Types.ObjectId, ref: 'Image' }],
    size: { type: Number, required: true },
    attempts : { type: Number, required: true },
    date: { type: Date, required: true },
    examDueDate: {type: Date, required: true}
}, {
    timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
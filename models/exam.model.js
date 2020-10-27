const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    imageURL : { type: String, required: true },
    classification : { type: String, required: true },
}, {
    timestamps: true,
});

const examSchema = new Schema({
    examName: { type: String, required: true },
    images :[{type: Schema.Types.ObjectId, ref: 'Image'}],
    description: { type: String},
}, {
    timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);
const Image = mongoose.model('Image', imageSchema);

module.exports = Exam;
module.exports = Image;
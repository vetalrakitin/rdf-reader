const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rdfSchema = new Schema({
    id: String,
    title: String,
    authors: { type: [String] },
    publisher: String,
    issued: String,
    language: String,
    subjects: { type: [String] },
    rights: String,
});

rdfSchema.index({ title: 1 });
rdfSchema.index({ authors: 1 });
rdfSchema.index({ issued: 1 });
rdfSchema.index({ title: 1, authors: 1 });
rdfSchema.index({ title: 1, issued: 1 });
rdfSchema.index({ authors: 1, issued: 1 });
rdfSchema.index({ title: 1, authors: 1, issued: 1 });

module.exports =  mongoose.model('rdf', rdfSchema);

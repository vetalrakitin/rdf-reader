const cheerio = require("cheerio");

function parse(content) {
    let $ = cheerio.load(content),
        collect = function (index, elem) {
            return $(elem).text();
        };

    return {
        id: $("pgterms\\:ebook").attr("rdf:about").replace("ebooks/", ""),
        title: $("dcterms\\:title").text(),
        authors: $("pgterms\\:agent pgterms\\:name").map(collect).toArray(),
        publisher: $("dcterms\\:publisher").text(),
        issued: $("dcterms\\:issued").text(),
        language: $("dcterms\\:language rdf\\:value").text(),
        subjects: $("[rdf\\:resource$='/LCSH']")
             .parent()
             .find("rdf\\:value")
             .map(collect)
             .toArray(),
        rights: $("dcterms\\:rights").text()
    };
}

module.exports = {
    parse
};

function convert(input) {
    let query = extract(input);
    return "https://www.google.co.kr/search?q=" + query;
}

function extract(input) {
    return input.split("구글:")[1]
        .replace(/(^\s*)|(\s*$)/gi, "")
        .split(" ")
        .join("+")
}

module.exports.convert = convert;

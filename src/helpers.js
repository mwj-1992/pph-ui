exports.setUrlParams = (key, value) => {
    var baseUrl = [
        document.location.protocol,
        "//",
        document.location.host,
        document.location.pathname,
    ].join(""),
        urlQueryString = document.location.search,
        newParam = key + "=" + value,
        params = "?" + newParam;
    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        let updateRegex = new RegExp("([?&])" + key + "[^&]*");
        let removeRegex = new RegExp("([?&])" + key + "=[^&;]+[&;]?");
        if (
            typeof value == "undefined" ||
            value == null ||
            value == "" ||
            value == "Show All"
        ) {
            // Remove param if value is empty
            params = urlQueryString.replace(removeRegex, "$1");
            params = params.replace(/[&;]$/, "");
        } else if (urlQueryString.match(updateRegex) !== null) {
            // If param exists already, update it
            params = urlQueryString.replace(updateRegex, "$1" + newParam);
        } else {
            // Otherwise, add it to end of query string
            params = urlQueryString + "&" + newParam;
        }
    }
    window.history.replaceState({}, "", baseUrl + params);
};

exports.getUrlParams = (name, url = null) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return undefined;
    if (!results[2]) return "";
    const res = decodeURIComponent(results[2].replace(/\+/g, " "));
    return res;
};
exports.highlightFilterResult = (text, pattern) => {
    if (!text || !pattern) return { __html: text };
    return {
        __html: text.replace(
            new RegExp(`(${pattern})`, "ig"),
            '<span class="highlight">$1</span>'
        ),
    };
};

export function utf8ToString(originalText)
{
    var text = originalText;
    text = text.split("=?utf-8?Q?").join("");
    text = text.split("?=").join("");
    text = text.split("=").join("%");
    text = decodeURI(text);

    return text;
} 
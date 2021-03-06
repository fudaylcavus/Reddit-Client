import { format } from "timeago.js";

//Images being forbidden without doing this
export const urlFix = (url) => {
    let fixed = url.replaceAll("amp;", "")
    return fixed;
}

export const shortenNumber = (ups) => {
    if (ups > 1000000)
        return (ups / 1000000).toFixed(1) +'m';
    if (ups > 1000)
        return (ups / 1000).toFixed(1) +'k';
    return ups;
}

export const secondsToDate = ms => {
    return format(ms * 1000, 'en_US')
}
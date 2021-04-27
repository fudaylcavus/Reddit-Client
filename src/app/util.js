//Images being forbidden without doing this
export const urlFix = (url) => {
    let fixed = url.replaceAll("amp;", "")
    return fixed;
}

export const upVoteStyle = (ups) => {
    if (ups > 1000000)
        return (ups / 1000000).toFixed(1) +'m';
    if (ups > 1000)
        return (ups / 1000).toFixed(1) +'k';
    return ups;
}

export const milisecondsToDate = ms => {
    let dt = new Date()
    dt.setMilliseconds(ms);
    return dt.toString().substring(3, 15)
}
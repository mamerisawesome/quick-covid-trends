const cleanRow = row => {
    return row.map(tr => {
        const out = Array.prototype.slice
            .call(tr.children, [1])
            .map(td => td.innerText);
        out.splice(1, 1);
        return out
    })
};

const handleFile = (file, cb) => {
    fetch(file)
        .then(res => res.arrayBuffer())
        .then(arrayBufferData => {
            const enc = new TextDecoder("utf-8");
            const arr = new Uint8Array(arrayBufferData);
            return enc.decode(arr);
        })
        .then(htmlOutput =>
            new DOMParser().parseFromString(htmlOutput, "text/html")
        )
        .then(doc => {
            const rawCovidData = doc.querySelectorAll("tbody > tr");
            const headers = rawCovidData[0];
            const cases = Array.prototype.slice.call(
                rawCovidData,
                [2]
            );
            cb(cleanRow([headers])[0], cleanRow(cases));
        });
};

const sheetConnector = cb => {
    const URL = "https://docs.google.com"
        + "/spreadsheets/u/0/d"
        + "/16g_PUxKYMC0XjeEKF6FPUBq2-pFgmTkHoj5lbVrGLhE"
        + "/htmlview";

    handleFile(URL, cb);
};

export default sheetConnector;

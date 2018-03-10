//Init
function start() {
    document.getElementById('codeCheck').addEventListener('click', codeCheckClick, false);
}

function codeCheckClick() {
    var barcode = document.getElementById('barcode').value;


    document.getElementById("checkGTINID").innerHTML = "GTIN ID: " + checkGTINID(barcode);
    document.getElementById("formatBarcode").innerHTML = "GS1 formatted barcode: " + formatBarcode(barcode);
    document.getElementById("verify").innerHTML = "GS1 verified: " + verify(barcode);
    document.getElementById("getEANNumber").innerHTML = "EAN number: " + getEANNumber(barcode);


}


/**Check the firs character of the barcode
 * @param  {str} code barcode
 * @returns {bool} wether barcode starts with 01
 */
function checkGTINID(code) {
    var ret = false;
    if (code.slice(0, 2) == "01") {
        ret = true;
    }
    return ret;
}

/**Format barcode  
 * @param  {str} code
 * @returns {str} formatted barcode
 */
function formatBarcode(code) {
    var ret = "";
    ret = replaceAll(code, "\\(", "");
    ret = replaceAll(ret, "\\)", "");
    return ret;
}

/**Verify GS1 barcode   
 * @param  {str} code
 * @returns wether the code is 01..10..17..21.. format
 */
function verify(code) {
    var ret = false;
    if (code.match(/^(01)(\d{14})10(\d*)17(\d{6})21(\d{9})$/)) {
        ret = true;
    }
    return ret;
}


function getEANNumber(code) {
    if (code.match(/^(01)(\d{14})10(\d*)17(\d{6})21(\d{9})$/)) {
        var e = new RegExp(/^01(\d{14})/);
        ret = e.exec(code);
    }
    return ret[1];
}

function checkLOTinit(code) {
    var ret = false;
    if (code.slice(16, 18) == "10") {
        ret = true;
    }
    return ret;
}

function getLOTnumber(code) {
    return code.slice(18, 22);
}

function checkExpirationInit(code) {
    var ret = false;
    if (code.slice(22, 24) == "17") {
        ret = true;
    }
    return ret;
}

function getExpiration(code) {
    return code.slice(24, 30);
}

function checkCatalogInit(code) {
    var ret = false;
    if (code.slice(30, 32) == "21") {
        ret = true;
    }
    return ret;
}

function getCatalog(code) {
    return code.slice(32, 41);
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
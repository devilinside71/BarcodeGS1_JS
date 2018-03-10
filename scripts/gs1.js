//Init
function start() {
    document.getElementById('codeCheck').addEventListener('click', codeCheckClick, false);
}

function codeCheckClick() {
    var codeCat = document.getElementById('codeCat').value;


    document.getElementById("resCodeStart").innerHTML = "Kód kezdete: " + checkCodeStart(codeCat);
    document.getElementById("resGTIN").innerHTML = "GTIN: " + getGTIN(codeCat);
    document.getElementById("resLOTinit").innerHTML = "LOT init: " + checkLOTinit(codeCat);
    document.getElementById("resLOTnumber").innerHTML = "LOT: " + getLOTnumber(codeCat);
    document.getElementById("resExpirationInit").innerHTML = "Expiration init: " + checkExpirationInit(codeCat);
    document.getElementById("resExpiration").innerHTML = "Expiration: " + getExpiration(codeCat);
    document.getElementById("resCatalogInit").innerHTML = "Catalog init: " + checkCatalogInit(codeCat);
    document.getElementById("resCatalog").innerHTML = "Catalog: " + getCatalog(codeCat);
}


/**Check the firs character of the barcode
 * @param  {str} code barcode
 * @returns {bool} wether barcode starts with 01
 */
function checkCodeStart(code) {
    var ret = false;
    if (code.slice(0, 2) == "01") {
        ret = true;
    }
    return ret;
}

function getGTIN(code) {
    return code.slice(2, 16);
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
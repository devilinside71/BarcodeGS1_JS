//Init
function start() {
    document.getElementById('codeCheck').addEventListener('click', codeCheckClick, false);
}

function codeCheckClick() {
    var barcode = document.getElementById('barcode').value;
    barcode = formatBarcode(barcode);

    document.getElementById("checkGTINID").innerHTML = "GTIN ID: " + checkGTINID(barcode);
    document.getElementById("formatBarcode").innerHTML = "GS1 formatted barcode: " + formatBarcode(barcode);
    document.getElementById("verify").innerHTML = "GS1 verified: " + verify(barcode);
    document.getElementById("getEANNumber").innerHTML = "EAN number: " + getEANnumber(barcode);
    document.getElementById("getLOTnumber").innerHTML = "LOT number: " + getLOTnumber(barcode);
    document.getElementById("getExpirationDate").innerHTML = "Expiration date: " + getExpirationDate(barcode);
    document.getElementById("getCatalogNumber").innerHTML = "Catalog number: " + getCatalogNumber(barcode);
    var res = parseGS1(barcode)
    document.getElementById("parseGS1").innerHTML = "Parsed GS1: " + res[0] + "*" + res[1] + "*" + res[2] + "*" + res[3];
    document.getElementById("GS1_1").innerHTML = "GS1_1: " +
        createGS1(
            document.getElementById("eancode").value,
            document.getElementById("lotcode").value,
            document.getElementById("expirationcode").value,
            document.getElementById("catalogcode").value,
            false
        );
    document.getElementById("GS1_2").innerHTML = "GS1_2: " +
        createGS1(
            document.getElementById("eancode").value,
            document.getElementById("lotcode").value,
            document.getElementById("expirationcode").value,
            document.getElementById("catalogcode").value,
            true
        );
}

var gtinID = "01";
var lotID = "10";
var expirationDateID = "17";
var catalogNumberID = "21";

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
 * @param  {str} code barcode
 * @returns {str} formatted barcode
 */
function formatBarcode(code) {
    var ret = "";
    ret = replaceAll(code, "\\(", "");
    ret = replaceAll(ret, "\\)", "");
    return ret;
}

/**Verify GS1 barcode   
 * @param  {str} code barcode
 * @returns {bool} wether the code is 01..10..17..21.. format
 */
function verify(code) {
    var ret = false;
    if (code.match(/^(01)(\d{14})10(\d*)17(\d{6})21(\d{9})$/)) {
        ret = true;
    }
    return ret;
}

/**Get EAN number
 * @param  {str} code barcode
 * @returns {str} EAN number
 */
function getEANnumber(code) {
    var ret = "";
    if (code.match(/^(01)(\d{14})10(\d*)17(\d{6})21(\d{9})$/)) {
        var reg = new RegExp(/^01(\d{14})/);
        ret = reg.exec(code);
    }
    return ret[1];
}

/**Get LOT number
 * @param  {str} code barcode
 * @returns {str} LOT number (10)
 */
function getLOTnumber(code) {
    var ret = "";
    if (code.match(/^(01)(\d{14})10(\d*)17(\d{6})21(\d{9})$/)) {
        var reg = new RegExp(/^01(\d{14})10(\d*)17/);
        ret = reg.exec(code);
    }
    return ret[2];
}

/**Get expiration date
 * @param  {str} code barcode
 * @returns {str} expiration date YYDDMM (17)
 */
function getExpirationDate(code) {
    var ret = "";
    if (code.match(/^(01)(\d{14})10(\d*)17(\d{6})21(\d{9})$/)) {
        var reg = new RegExp(/^01(\d{14})10(\d*)17(\d{6})21/);
        ret = reg.exec(code);
    }
    return ret[3];
}

/**Get catalog number
 * @param  {str} code barcode
 * @returns {str} catalog number
 */
function getCatalogNumber(code) {
    var ret = "";
    if (code.match(/^(01)(\d{14})10(\d*)17(\d{6})21(\d{9})$/)) {
        var reg = new RegExp(/^01(\d{14})10(\d*)17(\d{6})21(\d{9})$/);
        ret = reg.exec(code);
    }
    return ret[4];
}

/**Parse GS1 code
 * @param  {str} code barcode
 * @returns {str[]} barcode elements, (01) EAN, (10) LOT, (17) expiration date, (21) catalog number
 */
function parseGS1(code) {
    var ret = new Array("", "", "", "");
    var res = "";
    if (code.match(/^(01)(\d{14})10(\d*)17(\d{6})21(\d{9})$/)) {
        var reg = new RegExp(/^01(\d{14})10(\d*)17(\d{6})21(\d{9})$/);
        res = reg.exec(code);
    }
    ret[0] = res[1];
    ret[1] = res[2];
    ret[2] = res[3];
    ret[3] = res[4];
    return ret;
}

/**Create GS1 code
 * @param  {str} eanNumber EAN number
 * @param  {str} lotNumber LOT number
 * @param  {str} expirationDate expiration date YYMMDD
 * @param  {str} catalogNumber catalog number
 * @param  {bool} withBrackets=false wether output contains 
 * brackets for human reading
 * @returns {str} GS1 barcode
 */
function createGS1(eanNumber, lotNumber, expirationDate, catalogNumber, withBrackets = false) {
    var ret = "";
    var bracketBefore = "";
    var bracketAfter = "";
    if (withBrackets) {
        bracketBefore = "(";
        bracketAfter = ")";
    }
    ret = bracketBefore + gtinID + bracketAfter + eanNumber + bracketBefore + lotID +
        bracketAfter + lotNumber + bracketBefore + expirationDateID + bracketAfter + expirationDate +
        bracketBefore + catalogNumberID + bracketAfter + catalogNumber;
    return ret;
}

/**Replace all occurences in string with RegExp
 * @param  {str} str text to search
 * @param  {str} find old text
 * @param  {str} replace new text
 * @returns {str} modified text
 */
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
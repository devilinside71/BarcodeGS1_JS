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
            "Normal"
        );
    document.getElementById("GS1_2").innerHTML = "GS1_2: " +
        createGS1(
            document.getElementById("eancode").value,
            document.getElementById("lotcode").value,
            document.getElementById("expirationcode").value,
            document.getElementById("catalogcode").value,
            "Brackets"
        );
    document.getElementById("GS1_3").innerHTML = "GS1_3 ZPL: " +
        createGS1(
            document.getElementById("eancode").value,
            document.getElementById("lotcode").value,
            document.getElementById("expirationcode").value,
            document.getElementById("catalogcode").value,
            "ZPL"
        );
    document.getElementById("GS1_4").innerHTML = "GS1_4 karakterek Code128 fonthoz: " +
        convertToXML(createGS1(
            document.getElementById("eancode").value,
            document.getElementById("lotcode").value,
            document.getElementById("expirationcode").value,
            document.getElementById("catalogcode").value,
            "Character"
        ));
    document.getElementById("GS1_4_barcode").innerHTML =
        convertToXML(createGS1(
            document.getElementById("eancode").value,
            document.getElementById("lotcode").value,
            document.getElementById("expirationcode").value,
            document.getElementById("catalogcode").value,
            "Character"
        ));
}

var gtinID = "01";
var lotID = "10";
var expirationDateID = "17";
var catalogNumberID = "21";
var GS1charDict = {
    0: "Â",
    1: "!",
    2: "",
    3: "#",
    4: "$",
    5: "%",
    6: "&",
    7: "'",
    8: "(",
    9: ")",
    10: "*",
    11: "+",
    12: ",",
    13: "-",
    14: ".",
    15: "/",
    16: "0",
    17: "1",
    18: "2",
    19: "3",
    20: "4",
    21: "5",
    22: "6",
    23: "7",
    24: "8",
    25: "9",
    26: ":",
    27: ";",
    28: "<",
    29: "=",
    30: ">",
    31: "?",
    32: "@",
    33: "A",
    34: "B",
    35: "C",
    36: "D",
    37: "E",
    38: "F",
    39: "G",
    40: "H",
    41: "I",
    42: "J",
    43: "K",
    44: "L",
    45: "M",
    46: "N",
    47: "O",
    48: "P",
    49: "Q",
    50: "R",
    51: "S",
    52: "T",
    53: "U",
    54: "V",
    55: "W",
    56: "X",
    57: "Y",
    58: "Z",
    59: "[",
    60: "\\",
    61: "]",
    62: "^",
    63: "_",
    64: "`",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    91: "{",
    92: "|",
    93: "}",
    94: "~",
    95: "Ã",
    96: "Ä",
    97: "Å",
    98: "Æ",
    99: "Ç",
    100: "È",
    101: "É",
    102: "Ê",
    103: "Ë",
    104: "Ì",
    105: "Í",
    106: "Î"

}
var GS1charDictC = {
    "00": "Â",
    "01": "!",
    "02": "",
    "03": "#",
    "04": "$",
    "05": "%",
    "06": "&",
    "07": "'",
    "08": "(",
    "09": ")",
    "10": "*",
    "11": "+",
    "12": ",",
    "13": "-",
    "14": ".",
    "15": "/",
    "16": "0",
    "17": "1",
    "18": "2",
    "19": "3",
    "20": "4",
    "21": "5",
    "22": "6",
    "23": "7",
    "24": "8",
    "25": "9",
    "26": ":",
    "27": ";",
    "28": "<",
    "29": "=",
    "30": ">",
    "31": "?",
    "32": "@",
    "33": "A",
    "34": "B",
    "35": "C",
    "36": "D",
    "37": "E",
    "38": "F",
    "39": "G",
    "40": "H",
    "41": "I",
    "42": "J",
    "43": "K",
    "44": "L",
    "45": "M",
    "46": "N",
    "47": "O",
    "48": "P",
    "49": "Q",
    "50": "R",
    "51": "S",
    "52": "T",
    "53": "U",
    "54": "V",
    "55": "W",
    "56": "X",
    "57": "Y",
    "58": "Z",
    "59": "[",
    "60": "\\",
    "61": "]",
    "62": "^",
    "63": "_",
    "64": "`",
    "65": "a",
    "66": "b",
    "67": "c",
    "68": "d",
    "69": "e",
    "70": "f",
    "71": "g",
    "72": "h",
    "73": "i",
    "74": "j",
    "75": "k",
    "76": "l",
    "77": "m",
    "78": "n",
    "79": "o",
    "80": "p",
    "81": "q",
    "82": "r",
    "83": "s",
    "84": "t",
    "85": "u",
    "86": "v",
    "87": "w",
    "88": "x",
    "89": "y",
    "90": "z",
    "91": "{",
    "92": "|",
    "93": "}",
    "94": "~",
    "95": "Ã",
    "96": "Ä",
    "97": "Å",
    "98": "Æ",
    "99": "Ç"

}

/**Covert special characters to XML(HTML) format
 * @param  {str} textToConvert=""
 * @returns {str} XML compatible text
 */
function convertToXML(textToConvert = "") {
    var ret = "";
    ret = replaceAll(textToConvert, "&", "&amp;");
    ret = replaceAll(ret, "<", "&lt;");
    ret = replaceAll(ret, ">", "&gt;");
    return ret;
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
 * @param  {str} outputStyle output style (normal, brackets, ZPL, character for Code128 font)
 * @returns {str} GS1 barcode
 */
function createGS1(eanNumber = "", lotNumber = "", expirationDate = "", catalogNumber = "", outputStyle = "Normal") {
    var ret = "";
    var bracketBefore = "";
    var bracketAfter = "";
    if (outputStyle == "Normal" || outputStyle == "Brackets") {
        if (outputStyle == "Brackets") {
            bracketBefore = "(";
            bracketAfter = ")";
        }
        ret = bracketBefore + gtinID + bracketAfter + eanNumber + bracketBefore + lotID +
            bracketAfter + lotNumber + bracketBefore + expirationDateID + bracketAfter + expirationDate +
            bracketBefore + catalogNumberID + bracketAfter + catalogNumber;
    }
    if (outputStyle == "ZPL") {
        //>;>80105996527176340102014>6AA>5>8171907312128012280>64
        ret = "^BCN,,N,N^FD>;>8" + gtinID + eanNumber + lotID;
        if (lotNumber.length > 4) {
            ret = ret + lotNumber.slice(0, 4) + ">6" + lotNumber.slice(4) + ">5";
        } else {
            ret = ret + lotNumber;
        }
        ret = ret + ">8" + expirationDateID + expirationDate;
        ret = ret + catalogNumberID + catalogNumber.slice(0, 8) + ">6" + catalogNumber.slice(8) + "^FS";
    }
    if (outputStyle == "Character") {
        ret = "ÍÊ!" + GS1charDictC[eanNumber.slice(0, 2)] + GS1charDictC[eanNumber.slice(2, 4)] + GS1charDictC[eanNumber.slice(4, 6)];
        ret = ret + GS1charDictC[eanNumber.slice(6, 8)] + GS1charDictC[eanNumber.slice(8, 10)] + GS1charDictC[eanNumber.slice(10, 12)];
        ret = ret + GS1charDictC[eanNumber.slice(12, 14)];
        ret = ret + "*" + GS1charDictC[lotNumber.slice(0, 2)] + GS1charDictC[lotNumber.slice(2, 4)];
        if (lotNumber.length > 4) {
            ret = ret + "È" + lotNumber.slice(4) + "Ç";
        }
        ret = ret + "Ê1" + GS1charDictC[expirationDate.slice(0, 2)] + GS1charDictC[expirationDate.slice(2, 4)] + GS1charDictC[expirationDate.slice(4)];
        ret = ret + "5" + GS1charDictC[catalogNumber.slice(0, 2)] + GS1charDictC[catalogNumber.slice(2, 4)];
        ret = ret + GS1charDictC[catalogNumber.slice(4, 6)] + GS1charDictC[catalogNumber.slice(6, 8)];
        ret = ret + "È" + catalogNumber.slice(8);
        //checkdigit
        ret = ret + getCheckDigit(ret);
        //Stop
        ret = ret + "Î";
    }
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

//TODO: create checkdigit
/**Generate CheckDigit
 * @param  {str} gs1Code code witjout CHeckDigit and Stop character
 * @returns {str} Checkdigit
 */
function getCheckDigit(gs1Code = "") {
    var ret = "";

    ret = "p";
    return ret;
}
/**
 * Check for the GDPR compliance of the cookie banner  
 * @param {object} arg DOM object 
 * @returns {Array} Criteria results
 */
 module.exports = async function (arg) {
    const dom = await arg
    const regex = /.*cookie.*law.*|.*cookie.*notice.*|.*cookie.*bar.*/gmi
    let divs = dom.window.document.querySelectorAll('div[id]');
    for (let div of divs) {
        let id = div.getAttribute('id')
        if (regex.test(id)) {
            let resultsCSV = getCookieHtml(div)
            return resultsCSV
        }
    }
    let resultsCSV = ['Bannière de cookie', '0', 'Pas de bannière détectée']
    return resultsCSV
}
/**
 * Check for accept and reject buttons on the cookie banner
 * @param {object} div html object (cookie banner) 
 * @returns {Array} Criteria results
 */
function getCookieHtml(div) {//arg is the cookie banner
    let elements = div.querySelectorAll('*')
    let acceptCookies = false;
    let rejectCookies = false;
    for (let element of elements) {
        if (element.tagName == 'A' || element.tagName == 'BUTTON') { //if element is a link or a button
            const regexAccept = /.*accepte.*|.*ok.*|.*agree.*|.*accept.*/gmi;
            const regexReject = /.*refuse.*/gmi;
            if (regexAccept.test(element.textContent)) {
                acceptCookies = true;
            }
            if (regexReject.test(element.textContent)) {
                rejectCookies = true;
            }
        }
    }
 
}

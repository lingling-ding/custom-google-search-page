const API_KEY = 'AIzaSyBHtunlBtVyP-Kl9a_4kKUMlA1xLe8P_G8'
const ENDPOINT = 'https://www.googleapis.com/customsearch/v1'
const SEARCH_ENGINE_ID = '012989571078063497199:vtaqe4t4loc'


// get data from google search API
export default class GoogleApi {
    constructor() {
        this.query = ''
    }

    searchUrl(pageNumber = 1) {
        const startIndex = (pageNumber - 1) * 4 + 1
        return `${ENDPOINT}?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${this.query}&num=4&start=${startIndex}`
    }

    getData(pageNumber) {
        // have to save "this" in to a variable beacause this not accessible within the call
        const self = this;
        // ajax
        return new Promise(function (resolve, reject) {
            if (window.XMLHttpRequest) {
                var xmlhttp = new XMLHttpRequest()
            } else {
                // for old version of browsers
                var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
            }

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        const json = JSON.parse(xmlhttp.responseText)
                        // json from google search
                        resolve(json)
                    }
                    else {
                        reject(xmlhttp)
                    }
                }
            }
            // request couldn't be made at all
            xmlhttp.onerror = function() { 
                reject(xmlhttp)
            }

            xmlhttp.open("GET", self.searchUrl(pageNumber), true)
            xmlhttp.send()
        })
    }
}
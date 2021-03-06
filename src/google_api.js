const API_KEY = 'AIzaSyCZiYvB9lLG3lnzCCWHoFtM4yo7CaLLBeM'
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
        // ajax
        return new Promise((resolve, reject) => {
            if (window.XMLHttpRequest) {
                var xmlHttp = new XMLHttpRequest()
            } else {
                // for old version of browsers
                var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
            }

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlHttp.status == 200) {
                        const json = JSON.parse(xmlHttp.responseText)
                        // json from google search
                        resolve(json)
                    }
                    else {
                        // server error
                        reject(xmlHttp)
                    }
                }
            }
            xmlHttp.open("GET", this.searchUrl(pageNumber), true)
            xmlHttp.send()
        })
    }
}

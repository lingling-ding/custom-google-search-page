import ErrorMessage from './error_message'

// controls HTML on index
export default class Render {
    constructor(search) {
        this.search = search
        this.page = search.page
        this.results = search.results
        this.nextPageInfo = search.nextPageInfo
        this.previousPageInfo = search.previousPageInfo
    }

    // displaying the xmlHttp error in html
    static renderError(xmlHttp) {
        document.getElementById('results').style.display = 'none'
        document.getElementById('no-results').style.display = 'none'
        const errorMessage = new ErrorMessage(xmlHttp)
        const error = document.getElementById('error')
        error.style.display = 'block'
        error.innerHTML = `<h2> ${errorMessage.message()} </h2>`
    }

    // click event on the page number
    addEventListenerToPageList() {
        const nextPage = document.getElementById('nextPage')
        const previousPage = document.getElementById('previousPage')

        if (nextPage) {
            nextPage.addEventListener('click', () => {
                this.search.nextPage()
            })
        }
        if (previousPage) {
            previousPage.addEventListener('click', () => {
                this.search.previousPage()
            })
        }
    }

    // render the page count
    renderPageNavigation() {
        let pageNavigation = '<tr>'
        if (this.previousPageInfo) {
            pageNavigation += '<td><button id="previousPage">&lt previous</button></td>'
        }
        pageNavigation += `<td class="currentPage">${this.page}</td>`
        if (this.nextPageInfo) {
            pageNavigation += '<td><button id="nextPage">next &gt</button></td>'
        }
        pageNavigation += '</tr>'

        document.getElementById('page-results').innerHTML = pageNavigation
    }

    // render images on the left side
    renderImageResults() {
        let renderImgResults = ''
        for (let index = 0; index < this.results.length; index++) {
            const result = this.results[index];
            if (result.pagemap && result.pagemap.cse_thumbnail && result.pagemap.cse_thumbnail[0]) {
                renderImgResults += `<div>
                <a href=${result.pagemap.cse_image[0].src}>
                <img src=${result.pagemap.cse_thumbnail[0].src} />
                </a>
                </div>`
            }
        }
        document.getElementById('image-results').innerHTML = renderImgResults
    }

    static showSpinner() {
        document.getElementById('loading').style.display = 'flex'
    }


    static hideSpinner() {
        document.getElementById('loading').style.display = 'none'
    }

    // render the text on the right side
    renderWebResults() {
        let webResults = ''
        for (let index = 0; index < this.results.length; index++) {
            const result = this.results[index]
            if (result) {
                webResults += `<div>
                <div><a href=${result.link}>${result.title}</a> 
                <p> ${result.snippet}</p></div>
            </div>`
            }
        }
        document.getElementById('web-results').innerHTML = webResults
    }

    // showing and hiding results by coditions
    displayResults() {
        if (this.results.length > 0) {
            document.getElementById('no-results').style.display = 'none'
            document.getElementById('results').style.display = 'flex'
        } else {
            document.getElementById('results').style.display = 'none'
            document.getElementById('no-results').style.display = 'block'
        }
        document.getElementById('error').style.display = 'none'
    }

    renderResults() {
        this.renderWebResults()
        this.renderImageResults()
        this.renderPageNavigation()
        this.addEventListenerToPageList()
        this.displayResults()
    }
}
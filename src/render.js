// controls HTML on index
export default class Render {
    constructor(search) {
        this.search = search
        this.maxPage = search.maxPage
        this.page = search.page
        this.results = search.results
    }

    isPageActive(pageNumber) {
        return this.page == pageNumber
    }
    // render the page count
    renderPageNavigation() {
        let pageNavigation = '<tr>';
        for (let page = 1; page <= this.maxPage; page++) {
            pageNavigation += `
            <td class='page-number ${this.isPageActive(page) ? 'page-active' : ''}' data-id="${page}">${page}</td>`
        }
        pageNavigation += '</tr>'

        document.getElementById('page-results').innerHTML = pageNavigation
    }
    // render images on the left side
    renderImageResults() {
        let renderImgResults = '';
        for (let index = 0; index < this.results.length; index++) {
            const result = this.results[index];
            if (result['pagemap'] && result['pagemap']['cse_thumbnail'] && result['pagemap']['cse_thumbnail'][0]) {
                renderImgResults += `<div><a href=${result['pagemap']['cse_image'][0]['src']}><img src=${result['pagemap']['cse_thumbnail'][0]['src']} /></a></div>`
            }
        }
        document.getElementById('image-results').innerHTML = renderImgResults
    }
    // render the text on the right side
    renderWebResults() {
        let webResults = ''
        console.log(this.results)
        for (let index = (this.page - 1) * 4; index < this.page * 4; index++) {
            const result = this.results[index]
            if (result) {
                webResults += `<div>
                <div><a href=${result['link']}>${result['title']}</a> 
                <p> ${result['snippet']}</p></div>
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
    }
    // click event on the page number
    addEventListenerToPageList() {
        const pages = document.getElementsByClassName('page-number')
        const self = this;
        for (let index = 0; index < pages.length; index++) {
            const page = pages[index]
            page.addEventListener('click', function () {
                self.search.changePage(this.getAttribute('data-id'))
            })

        }
    }
    
    renderResults() {
        this.renderWebResults()
        this.renderImageResults()
        this.renderPageNavigation()
        this.addEventListenerToPageList()
        this.displayResults()
    }
}
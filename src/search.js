import GoogleApi from './google_api'
import Render from './render';

// call the google api and rendering
export default class Search {
    constructor() {
        this.google_api = new GoogleApi()
        this.results = []
        this.page = 1;
        this.startIndex = 1;
        // this.maxPage = 1;
    }

    // changePage(pageNumber) {
    //     this.page = pageNumber;
    //     const render = new Render(this)
    //     render.renderResults()
    // }

    makeRequest() {
        this.google_api.getData(this.page).then(data => {
            if (data['searchInformation']['totalResults'] > 0) {
                this.results = data['items']
            } else {
                this.results = []
            }
            const render = new Render(this)
            render.renderResults()
        })
    }

    nextPage() {
        this.page += 1
        this.makeRequest()
    }

    previousPage() {
        this.page -= 1
        this.makeRequest()
    }

    initialize() {
        const submitButton = document.getElementById('submit-button')
        const self = this  //save "this" in to a variable
        submitButton.addEventListener('click', function () {
            self.google_api.query = document.getElementById('search-bar').value
            // resolving promise
            self.makeRequest()
        })
    }
}
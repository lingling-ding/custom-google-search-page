import GoogleApi from './google_api'
import Render from './render';

// call the google api and rendering
export default class Search {
    constructor() {
        this.google_api = new GoogleApi()
        this.results = []
        this.page = 1;
        this.maxPage = 1;
    }

    changePage(pageNumber) {
        this.page = pageNumber;
        const render = new Render(this)
        render.renderResults()
    }

    initialize() {
        const submitButton = document.getElementById('submit-button')
        const self = this  //save "this" in to a variable
        submitButton.addEventListener('click', function () {
            self.google_api.query = document.getElementById('search-bar').value
            // resolving promise
            self.google_api.getData().then(data => {
                if (data['searchInformation']['totalResults'] > 0) {
                    self.results = data['items']
                } else {
                    // no result
                    self.results = []
                }

                // calatulate the count of pages
                self.maxPage = Math.floor(self.results.length / 4) + 1
                self.changePage(1)
            })
        })
    }
}
import GoogleApi from './google_api'
import Render from './render'

// call the google api and rendering
export default class Search {
    constructor() {
        this.google_api = new GoogleApi()
        this.results = []
        this.nextPageInfo = []
        this.previousPageInfo = []
        this.page = 1
        this.startIndex = 1
    }
    // calling the google api and handling the result of the request
    makeRequest() {
        Render.showSpinner();
        this.google_api.getData(this.page).then(data => {
            if (data.searchInformation.totalResults > 0) {
                this.results = data.items
                this.nextPageInfo = data.queries.nextPage
                this.previousPageInfo = data.queries.previousPage
            } else {
                this.results = []
                this.nextPageInfo = []
                this.previousPageInfo = []
            }
            Render.hideSpinner()
            const render = new Render(this)
            render.renderResults()
        }, error => {
            Render.hideSpinner()
            Render.renderError(error)
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
            self.google_api.query = encodeURIComponent(document.getElementById('search-bar').value)
            // resolving promise
            self.page = 1
            self.makeRequest()
        })
    }
}
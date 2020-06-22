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
            // success
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
            // error
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
        // save "this" in to a variable
        const self = this  
        submitButton.addEventListener('click', () => {
            self.google_api.query = encodeURIComponent(document.getElementById('search-bar').value)
            self.page = 1
            self.makeRequest()
        })
    }
}
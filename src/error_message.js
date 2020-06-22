// helper for displaying error messages in Render
export default class ErrorMessage {
    constructor(xmlHttp) {
        this.request = xmlHttp
    }

    message() {
        let message
        if (this.request.responseText) {
            const response = JSON.parse(this.request.responseText)
            message = response.error && response.error.message
        }

        if (!message) {
            message = `There was an error processing your request.`
        }

        return `ERROR (${this.request.status}): ${message}`
    }
}
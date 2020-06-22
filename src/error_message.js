export default class ErrorMessage {
    constructor(xmlhttp) {
        this.request = xmlhttp
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
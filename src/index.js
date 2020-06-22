import '../styles/results.css'
import '../images/loading.gif'

const overlay = document.getElementById('overlay')
const content = document.getElementById('content')

// display the content when the page is loaded
window.addEventListener('load', () => {
    overlay.style.display = 'none'
    content.style.display = 'block'
})

import Search from './search'

const search = new Search()
search.initialize()



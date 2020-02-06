import { films } from './films.js'

let filmSort = films.sort((a,b) => (a.episode_id > b.episode_id) ? 1 : -1)

const movie = document.querySelector('.movie')

films.forEach((filmSort) => {

let tile = document.createElement('div')

let titleElement = document.createElement("h1")
let crawlElement = document.createElement("p")

titleElement.textContent = filmSort.title
crawlElement.textContent = filmSort.opening_crawl

tile.appendChild(titleElement)
tile.appendChild(crawlElement)
movie.appendChild(tile)
})

// let titleElement = document.querySelector('.title')
// let crawlElement = document.querySelector('.crawl')

// titleElement.textContent = films[0].title
// crawlElement.textContent = films[0].opening_crawl
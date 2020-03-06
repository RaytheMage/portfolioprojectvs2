import { films } from './Data/films.js'
import { people } from './Data/people.js'
import { planets } from './Data/planets.js'
import { species } from './Data/species.js'
import { starships } from './Data/starships.js'
import { vehicles } from './Data/vehicles.js'

const gallery = document.querySelector('.greeting')
const maleButton = document.querySelector('#male')
const femaleButton = document.querySelector('#female')
const otherButton = document.querySelector('#other')

const otherCharacters = people.filter(person => {
    if (person.gender === 'hermaphrodite' 
    || person.gender === 'n/a'
    || person.gender === 'none'
    ) {
    return person}
})

maleButton.addEventListener('click', event => {
    populateDOM(people.filter(person => person.gender === 'male'))
})

femaleButton.addEventListener('click', event => {
    populateDOM(people.filter(person => person.gender === 'female'))
})

otherButton.addEventListener('click', event => {
    populateDOM(otherCharacters)
})

function getCharNumber(url){
let end = url.lastIndexOf('/')
let start = end - 2
if(url.charAt(start) === '/') {
    start++
}
return url.slice(start, end)
}

function removeChildren(element) {
    while (element.firstChild) {
    element.removeChild(element.firstChild)
}}

function populateDOM(characters) {
    characters.forEach(person => {

    // need to extract number from person.url
    let charNum = getCharNumber(person.url)

    let anchorWrap = document.createElement('a')
    anchorWrap.href = '#'

    let imageItem = document.createElement('img')
    imageItem.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

    imageItem.addEventListener('error', (event) => {
        //console.log(`${event.type}: Loading image\n`;
        //console.log(event)
        imageItem.hidden = true
        //imageItem.src = '../MyPortfolio_Images/starwarsallcharacters.jpg'
    })

    // add some way to handle user clicks on the image
    imageItem.addEventListener('click', (event) => {
    })

    anchorWrap.appendChild(imageItem)
    gallery.appendChild(anchorWrap)
})
}


// adding a testing comment for commit
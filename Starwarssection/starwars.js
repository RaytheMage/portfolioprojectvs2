import { films } from './Data/films.js'
import { people } from './Data/people.js'
import { planets } from './Data/planets.js'
import { species } from './Data/species.js'
import { starships } from './Data/starships.js'
import { vehicles } from './Data/vehicles.js'

const greetingDiv = document.querySelector('.greeting')
const maleButton = document.querySelector('#male')
const femaleButton = document.querySelector('#female')
const otherButton = document.querySelector('#other')

const maleCharacters = people.filter(person => person.gender === 'male')
console.log(maleCharacters)

const femaleCharacters = people.filter(person => person.gender === 'female')
console.log(femaleCharacters)

const otherCharacters = people.filter(person => {
    if (person.gender === 'hermaphrodite' || person.gender === 'n/a') {
    return person}
})

console.log(otherCharacters)

let counter = 1

people.forEach(person => {

    let anchorWrap = document.createElement('a')
    anchorWrap.href = '#'

    let imageItem = document.createElement('img')
    imageItem.src = `https://starwars-visualguide.com/assets/img/characters/${counter}.jpg`

    imageItem.addEventListener('error', (event) => {
        //console.log(`${event.type}: Loading image\n`;
        //console.log(event)
        imageItem.hidden = true
        //imageItem.src = '../MyPortfolio_Images/starwarsallcharacters.jpg'
    })

    // add some way to handle user clicks on the image
    imageItem.addEventListener('click', (event) => {
        console.log(event)
    })
    anchorWrap.appendChild(imageItem)
    greetingDiv.appendChild(anchorWrap)
    counter ++
})

maleButton.addEventListener('click', (event) => {
    console.log('clicked on male button')
})

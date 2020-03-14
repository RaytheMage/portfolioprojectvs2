import { people } from '../Data/people.js'
import { getLastNumber, removeChildren } from '../utils.js'

const gallery = document.querySelector('.gallery')
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

function populateDOM(characters) {
    removeChildren(gallery)
    characters.forEach(person => {

    // need to extract number from person.url
    let charNum = getLastNumber(person.url)

    let anchorWrap = document.createElement('a')
    anchorWrap.href = '#'

    let imageItem = document.createElement('img')
    imageItem.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

    imageItem.addEventListener('error', event => {
        //console.log(`${event.type}: Loading image\n`
        //console.log(event)
        imageItem.hidden = true
        //imageItem.src = '../MyPortfolio_Images/starwarsallcharacters.jpg'
    })

    // add some way to handle user clicks on the image
    imageItem.addEventListener('click', event => {
        console.log(event)
    })

    anchorWrap.appendChild(imageItem)
    gallery.appendChild(anchorWrap)
})
}

import { films } from './Data/films.js'
import { people } from './Data/people.js'
import { planets } from './Data/planets.js'
import { species } from './Data/species.js'
import { starships } from './Data/starships.js'
import { vehicles } from './Data/vehicles.js'

const greetingDiv = document.querySelector('.greeting')

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

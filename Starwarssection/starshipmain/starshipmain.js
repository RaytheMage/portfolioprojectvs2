import { starships } from '../Data/starships.js'

const nav = document.querySelector('.nav')

const navList = document.querySelector('.navlist')

function populateNav(starships) {
    starships.forEach(starship => {

        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        anchorWrap.addEventListener('click', event => {
         console.log(event)
        })

        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
        // nav.appendChild(navList)
    })
}

populateNav(starships)
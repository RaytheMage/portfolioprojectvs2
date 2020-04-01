import {senators} from '../Data/senators.js'

const senatorDiv = document.createElement('div')
const main = document.querySelector('main')

function populateSenatorDiv() {
    senators.forEach(senator => {
        let senatorName = `${senator.first_name} ${senator.last_name}`
        let nameParagraph = document.createElement('p')
        nameParagraph.textContent = senatorName
        senatorDiv.appendChild(nameParagraph)
    })
    main.appendChild(senatorDiv)
}

populateSenatorDiv

// Reusable async funtion to fetch data from the provieded URL
async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// now, use the async getAPIData function
function loadPage() {
    getAPIData('https://pokeapi.co/api/v2/pokemon/?&limit=25').then((data) => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url).then((pokeData) => {
            populatePokeCard(pokeData)
        })
    }
})
}

let pokemonGrid = document.querySelector('.pokemonGrid')
let startButton = document.querySelector('#startButton')
let newButton = document.querySelector('#newButton')

startButton.addEventListener('click', () => {
    loadPage()
})

newButton.addEventListener('click', () => {
    addPokemon()
})

function populatePokeCard(singlePokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () =>
        pokeCard.classList.toggle('is-flipped'),
        )
    let pokeFront = populateCardFront(singlePokemon)
    let pokeBack = populateCardBack(singlePokemon)

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    pokemonGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let cardFront = document.createElement('div')
    cardFront.className = 'card_face card_face--front'
    let frontImage = document.createElement('img')
    frontImage.src = '../images/${getImageName(pokeman)}.png'
    
    let frontLabel = document.createElement('p')
    frontLabel.textContent = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`
    cardFront.appendChild(frontImage)
    cardFront.appendChild(frontLabel)
    return cardFront
}

function getImageName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`
    } else if (pokemon.id > 9 && pokemon.id < 100) {
        return `0${pokemon.id}`
    } else if (pokemon.id > 809) {
        return `pokeball`
    }
}

function populateCardBack(pokemon) {
    let cardBack = document.createElement('div')
    cardBack.className = 'card_face card_face--back'
    let abilityList = document.createElement('ul')
    pokemon.abilities.forEach(ability => {
        let abilityName = document.createElement('li')
        abilityName.textContent = ability.ability.name
        abilityList.appendChild(abilityName)
    })
    cardBack.appendChild(abilityList)
    return cardBack
}

class Pokemon {
    constructor(height, weight, name, abilities) {
        this.height = height
        this.weight = weight
        this.name = name
        this.abilities = abilities
        this.id = 900
    }
}

function addPokemon() {
    let Thoremon = new Pokemon(190, 290, 'thoremon',
    [
        {
            ability: {
                name: 'Thunder Belly'
            }
        },
        {
            ability: {
                name: 'Beard Power'
            }
        },
        {
            ability: {
                name: 'Rancid Stench'
            }
        }
    ])
    populatePokeCard(Thoremon)
}
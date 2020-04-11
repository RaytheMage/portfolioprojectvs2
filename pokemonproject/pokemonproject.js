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
getAPIData('https://pokeapi.co/api/v2/pokemon/?&limit=25').then((data) => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url).then((pokeData) => {
            populatePokeCard(pokeData)
        })
    }
})

let pokemonGrid = document.querySelector('.pokemonGrid')


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
    cardFront.textContent = pokemon.className
    let frontImage = document.createElement('img')
    frontImage.src = '../images/${pokemon.id}.png'
    cardFront.appendChild(frontImage)
    return cardFront
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

// https://github.com/fanzeyi/pokemon.json/blob/master/images/001.png?raw=true
import {houseofrepresentatives} from '../Data/houseofrepresentatives.js'

const repGrid = document.querySelector('.repGrid')

function getSimplifiedReps(repArray) {
    return repArray.map(rep => {
        let middleName = rep.middle_name ? ` ${
            rep.middle_name
        } ` : ` `
        return {
            id: rep.id,
            name: `${
                rep.first_name
            }${middleName}${
                rep.last_name
            }`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${
                rep.govtrack_id
            }-200px.jpeg`,
            state: rep.state,
            seniority: parseInt(rep.seniority, 10),
            missedVotesPct: rep.missed_votes_pct,
            party: rep.party,
            loyaltyPct: rep.votes_with_party_pct
        }
    })
}

function populateRepresentativeDiv(simpleReps) {
    simpleReps.forEach(rep => {
        let repDiv = document.createElement('div')
        let repFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')
        if (rep.party === 'R') 
            partyIcon.className = 'fas fa-republican'
        
        if (rep.party === 'D') 
            partyIcon.className = 'fas fa-democrat'
        
        if (rep.party === 'ID') 
            partyIcon.className = 'fas fa-star'
        
        figImg.src = rep.imgURL
        figCaption.textContent = rep.name

        figCaption.appendChild(partyIcon)
        repFigure.appendChild(figImg)
        repFigure.appendChild(figCaption)
        repDiv.appendChild(repFigure)
        repDiv.appendChild(stateAbbr(rep))
        repDiv.appendChild(progressBars(rep))
        repGrid.appendChild(repDiv)
    })
}

function stateAbbr(rep) {
    let stateDiv = document.createElement('div')
    stateDiv.className = 'stateDiv'
    let stateTitle = document.createElement('p')
    stateTitle.textContent = 'State'
    let repState = document.createElement('p')
    repState.textContent = rep.state

    stateDiv.appendChild(stateTitle)
    stateDiv.appendChild(repState)
    return stateDiv
}

function progressBars(rep) {
    let progressDiv = document.createElement('div')
    progressDiv.className = 'progressDiv'
    let loyaltyLabel = document.createElement('label')
    loyaltyLabel.for = 'loyalty'
    loyaltyLabel.textContent = 'Loyalty'
    let loyaltyBar = document.createElement('progress')
    loyaltyBar.id = 'loyalty'
    loyaltyBar.max = 100
    loyaltyBar.value = rep.loyaltyPct
    let seniorityLabel = document.createElement('label')
    seniorityLabel.for = 'seniority'
    seniorityLabel.textContent = 'Seniority'
    let seniorityBar = document.createElement('progress')
    seniorityBar.id = 'seniority'
    seniorityBar.max = 100
    seniorityBar.value = parseInt((rep.seniority / mostSeniority.seniority) * 100)
    let votingLabel = document.createElement('label')
    votingLabel.for = 'voting'
    votingLabel.textContent = 'Vote'
    let votingBar = document.createElement('progress')
    votingLabel.id = 'voting'
    votingBar.max = 100
    votingBar.value = 10

    progressDiv.appendChild(loyaltyLabel)
    progressDiv.appendChild(loyaltyBar)
    progressDiv.appendChild(seniorityLabel)
    progressDiv.appendChild(seniorityBar)
    progressDiv.appendChild(votingLabel)
    progressDiv.appendChild(votingBar)
    return progressDiv
}

const filterReps = (prop, value) => {
    return houseofrepresentatives.filter(rep => {
        return rep[prop] === value
    })
}

const republicans = filterReps('party', 'R')
const democrats = filterReps('party', 'D')

const mostSeniority = getSimplifiedReps(houseofrepresentatives).reduce((acc, rep) => acc.seniority > rep.seniority ? acc : rep)

const missedVotes = getSimplifiedReps(houseofrepresentatives).reduce((acc, rep) => acc.missedVotesPct > rep.missedVotesPct ? acc : rep)

let loyalArray = []

const mostLoyal = getSimplifiedReps(republicans).reduce((acc, rep) => {
    if (rep.loyaltyPct === 100) {
        loyalArray.push(rep)
    }
    return acc.loyaltyPct > rep.loyaltyPct ? acc : rep
})

populateRepresentativeDiv(getSimplifiedReps(houseofrepresentatives))

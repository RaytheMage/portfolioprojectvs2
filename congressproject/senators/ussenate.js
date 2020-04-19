import { senators } from '../data/senators.js'

const senatorDiv = document.querySelector('.senators')

function getSimplifiedSenators(senatorArray){
 return senatorArray.map(senator => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
        id: senator.id,
        name: `${senator.first_name}${middleName}${senator.last_name}`,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
        seniority: parseInt(senator.seniority, 10),
        missedVotesPct: senator.missed_votes_pct,
        party: senator.party,
        loyaltyPct: senator.votes_with_party_pct
    }
})
}

function populateSenatorDiv(simpleSenators) {
    console.log(simpleSenators)
    simpleSenators.forEach(senator => {
        let senDiv = document.createElement('div') 
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')  
        if (senator.party === 'R') partyIcon.className = 'fas fa-republican'
        if (senator.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (senator.party === 'ID') partyIcon.className = 'fas fa-star'
        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        figCaption.appendChild(partyIcon)
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senDiv.appendChild(senFigure)
        senDiv.appendChild(progressBars(senator))
        senatorGrid.appendChild(sendiv)
    })
}

function progressBars(senator) {
    let progressDiv = document.createElement('div')
    progressDiv.className = 'progressDiv'
    let loyaltyLabel = document.createElement('label')
    loyaltyLabel.for = 'loyalty'
    loyaltyLabel.textContent = 'Loyalty'
    let loyaltyBar = document.createElement('progress')
    loyaltyBar.id = 'loyalty'
    loyaltyBar.max = 100
    loyaltyBar.value = senator.loyaltyPct
    let seniorityLabel = document.createElement('label')
    seniorityLabel.for = 'seniority'
    seniorityLabel.textContent = 'Seniority'
    let seniorityBar = document.createElement('progress')
    seniorityBar.id = 'seniority'
    seniorityBar.max = 100
    seniorityBar.value = parseInt((senator.seniority / mostSeniority) * 100)
    let votingLabel = document.createElement('label')
    votingLabel.for = 'voting'
    votingLabel.textContent = "Vote"
    let votingBar = document.createElement('label')
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

const filterSenators = (prop, value) => {
    return senators.filter(senator => {
        return senator[prop] === value
    })
}

const republicans = filterSenators('party', 'R')
const democrats = filterSenators('party', 'D')

const mostSeniority = getSimplifiedSenators(senators).reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

const missedVotes = getSimplifiedSenators(senators).reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)

let loyalArray = []

const mostLoyal = getSimplifiedSenators(republicans).reduce((acc, senator) => {
        if (senator.loyaltyPct === 100) {
            loyalArray.push(senator)
        }
            return acc.loyaltyPct > senator.loyaltyPct ? acc : senator
    })

// console.log(loyalArray)

populateSenatorDiv(getSimplifiedSenators(senators))
console.log(mostSeniority.seniority)

console.log(data);

//You can start simple and just render a single 
//pokemon card from the first element
console.log(data[0]);

const selection = {
    sprite: Array(20).fill(0),
    side: Array(20).fill(0)
}

function RenderCards() {
    const pokemonCards = document.querySelector('.cards')
    pokemonCards.innerHTML = ''

    data.forEach(card => {
        const li = document.createElement('li')
        li.className = 'card'

        const h2 = document.createElement('h2')
        h2.className = 'card--title'
        h2.textContent = `${card.name.charAt(0).toUpperCase() + card.name.slice(1)}`;

        const div = document.createElement('div')
        div.className = 'card--imageAndButtons'

       const nextBtn = document.createElement('btn')
       nextBtn.className = 'card--button'
       nextBtn.textContent = ' ->'
       nextBtn.onclick = () => NextSprite(card.id)

       const prevBtn = document.createElement('btn')
       prevBtn.className = 'card--button'
       prevBtn.textContent = '<- '
       prevBtn.onclick = () => PreviousSprite(card.id)

        const image = document.createElement('img')
        image.className = 'card--img'
        image.src = FindSprite(card.id)
        image.onclick = () => FlipCard(card.id)
        image.width = 256

        div.appendChild(image)
        div.appendChild(prevBtn)
        div.appendChild(nextBtn)        
      


        const ul = document.createElement('ul')
        ul.className = 'card--text'

        const statDiv = document.createElement('div')
        statDiv.className = 'card--text-stats'
        const spriteLi = document.createElement('li')
        spriteLi.className = 'card--text-base'
        spriteLi.textContent = 'Base Stats'
        statDiv.appendChild(spriteLi)
        
        card.stats.forEach(stat => {
            const statLi = document.createElement('li')

            statLi.className = 'card--text-base-stats'
            statLi.textContent =  `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`
            statDiv.appendChild(statLi)
        })

        const gameDiv = document.createElement('div')
        gameDiv.className = 'card--text-games'
        const gameLi = document.createElement('li')
        gameLi.textContent = 'Appearance'
        gameLi.className = 'card--text-appearance'
        gameDiv.appendChild(gameLi)

        FindAppearance(card.id, gameDiv) 

        ul.appendChild(statDiv)
        ul.appendChild(gameDiv)
        
        li.appendChild(h2)
        li.appendChild(div)
        li.appendChild(ul)
        
        

        pokemonCards.appendChild(li)
    }) 
}

function NextSprite(card_id) {
    const id = card_id - 1
    selection.sprite[id]++
    if (selection.sprite[id] > 5) {
        selection.sprite[id] = 0
    }
    RenderCards()
}

function PreviousSprite(card_id) {
    const id = card_id - 1
    selection.sprite[id]--
    if (selection.sprite[id] < 0) {
        selection.sprite[id] = 5
    }
    RenderCards()
}


function FindAppearance(card_id, div) {
    const id = card_id - 1
    const sprite = selection.sprite[id]
    if(sprite === 0) {
        const li = document.createElement('li')
        li.textContent = 'Official Artwork'
        div.appendChild(li)
    } else if(sprite === 1) {
        for(let i = 0; i < 3; i++) {
            const li = document.createElement('li')
            li.textContent = `${data[id].game_indices[i].version.name.charAt(0).toUpperCase() + data[id].game_indices[i].version.name.slice(1)}`
            div.appendChild(li)
        }
    } else if(sprite === 2) {
        for(let i = 3; i < 6; i++) {
            const li = document.createElement('li')
            li.textContent = `${data[id].game_indices[i].version.name.charAt(0).toUpperCase() + data[id].game_indices[i].version.name.slice(1)}`
            div.appendChild(li)
        }
    } else if(sprite === 3) {
        for(let i = 6; i < 11; i++) {
            const li = document.createElement('li')
            li.textContent = `${data[id].game_indices[i].version.name.charAt(0).toUpperCase() + data[id].game_indices[i].version.name.slice(1)}`
            div.appendChild(li)
        }
    } else if(sprite === 4) {
        for(let i = 11; i < 16; i++) {
            const li = document.createElement('li')
            li.textContent = `${data[id].game_indices[i].version.name.charAt(0).toUpperCase() + data[id].game_indices[i].version.name.slice(1)}`
            div.appendChild(li)
        }
    } else if(sprite === 5) {
        for(let i = 16; i < 20; i++) {
            const li = document.createElement('li')
            li.textContent = `${data[id].game_indices[i].version.name.charAt(0).toUpperCase() + data[id].game_indices[i].version.name.slice(1)}`
            div.appendChild(li)
        }
    }
}

function FlipCard(poke_id) {
    const id = poke_id - 1
    selection.side[id]++
    if (selection.side[id] > 1) {
        selection.side[id] = 0
    }
    RenderCards()
}


function FindSprite(poke_id) {
    const id = poke_id - 1
    const current = selection.sprite[id]
    if(selection.side[id] === 0) {
        if(current === 0) {
            return `${data[id].sprites.other["official-artwork"].front_default}`
        } else if(current === 1) {
            return `${data[id].sprites.versions["generation-i"]["red-blue"].front_default}`
        } else if(current === 2) {
            return `${data[id].sprites.versions["generation-ii"].gold.front_default}`
        } else if(current === 3) {
            return `${data[id].sprites.versions["generation-iii"]["ruby-sapphire"].front_default}`
        } else if(current === 4) {
            return `${data[id].sprites.versions["generation-iv"].platinum.front_default}`
        } else if(current === 5) {
          return `${data[id].sprites.versions["generation-v"]["black-white"].front_default}`
        } 
    } else {
        if(current === 0) {
            return `${data[id].sprites.other["official-artwork"].front_default}`
        } else if(current === 1) {
            return `${data[id].sprites.versions["generation-i"]["red-blue"].back_default}`
        } else if(current === 2) {
            return `${data[id].sprites.versions["generation-ii"].gold.back_default}`
        } else if(current === 3) {
            return `${data[id].sprites.versions["generation-iii"]["ruby-sapphire"].back_default}`
        } else if(current === 4) {
            return `${data[id].sprites.versions["generation-iv"].platinum.back_default}`
        } else if(current === 5) {
          return `${data[id].sprites.versions["generation-v"]["black-white"].back_default}`
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    RenderCards()
})
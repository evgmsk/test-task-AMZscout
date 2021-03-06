// Constants & and helper functions  

const TextSource = `"Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes. But I warn you, if you don't tell me that this means war, if you still try to defend the infamies and horrors perpetrated by that Antichrist--I really believe he is Antichrist--I will have nothing more to do with you and you are no longer my friend, no longer my 'faithful slave,' as you call yourself! But how do you do? I see I have frightened you--sit down and tell me all the news."

It was in July, 1805, and the speaker was the well-known Anna Pavlovna Scherer, maid of honor and favorite of the Empress Marya Fedorovna. With these words she greeted Prince Vasili Kuragin, a man of high rank and importance, who was the first to arrive at her reception. Anna Pavlovna had had a cough for some days. She was, as she said, suffering from la grippe; grippe being then a new word in St. Petersburg, used only by the elite.

All her invitations without exception, written in French, and delivered by a scarlet-liveried footman that morning, ran as follows:

"If you have nothing better to do, Count [or Prince], and if the prospect of spending an evening with a poor invalid is not too terrible, I shall be very charmed to see you tonight between 7 and 10--Annette Scherer."

"Heavens! what a virulent attack!" replied the prince, not in the least disconcerted by this reception. He had just entered, wearing an embroidered court uniform, knee breeches, and shoes, and had stars on his breast and a serene expression on his flat face. He spoke in that refined French in which our grandfathers not only spoke but thought, and with the gentle, patronizing intonation natural to a man of importance who had grown old in society and at court. He went up to Anna Pavlovna, kissed her hand, presenting to her his bald, scented, and shining head, and complacently seated himself on the sofa.

"First of all, dear friend, tell me how you are. Set your friend's mind at rest," said he without altering his tone, beneath the politeness and affected sympathy of which indifference and even irony could be discerned.

"Can one be well while suffering morally? Can one be calm in times like these if one has any feeling?" said Anna Pavlovna. "You are staying the whole evening, I hope?"

"And the fete at the English ambassador's? Today is Wednesday. I must put in an appearance there," said the prince. "My daughter is coming for me to take me there."

"I thought today's fete had been canceled. I confess all these festivities and fireworks are becoming wearisome."

"If they had known that you wished it, the entertainment would have been put off," said the prince, who, like a wound-up clock, by force of habit said things he did not even wish to be believed.

"Don't tease! Well, and what has been decided about Novosiltsev's dispatch? You know everything."

"What can one say about it?" replied the prince in a cold, listless tone. "What has been decided? They have decided that Buonaparte has burnt his boats, and I believe that we are ready to burn ours."

Prince Vasili always spoke languidly, like an actor repeating a stale part. Anna Pavlovna Scherer on the contrary, despite her forty years, overflowed with animation and impulsiveness. To be an enthusiast had become her social vocation and, sometimes even when she did not feel like it, she became enthusiastic in order not to disappoint the expectations of those who knew her. The subdued smile which, though it did not suit her faded features, always played round her lips expressed, as in a spoiled child, a continual consciousness of her charming defect, which she neither wished, nor could, nor considered it necessary, to correct.

In the midst of a conversation on political matters Anna Pavlovna burst out:

"Oh, don't speak to me of Austria. Perhaps I don't understand things, but Austria never has wished, and does not wish, for war. She is betraying us! Russia alone must save Europe. Our gracious sovereign recognizes his high vocation and will be true to it. That is the one thing I have faith in! Our good and wonderful sovereign has to perform the noblest role on earth, and he is so virtuous and noble that God will not forsake him. He will fulfill his vocation and crush the hydra of revolution, which has become more terrible than ever in the person of this murderer and villain! We alone must avenge the blood of the just one.... Whom, I ask you, can we rely on?... England with her commercial spirit will not and cannot understand the Emperor Alexander's loftiness of soul. She has refused to evacuate Malta. She wanted to find, and still seeks, some secret motive in our actions. What answer did Novosiltsev get? None. The English have not understood and cannot understand the self-abnegation of our Emperor who wants nothing for himself, but only desires the good of mankind. And what have they promised? Nothing! And what little they have promised they will not perform! Prussia has always declared that Buonaparte is invincible, and that all Europe is powerless before him.... And I don't believe a word that Hardenburg says, or Haugwitz either. This famous Prussian neutrality is just a trap. I have faith only in God and the lofty destiny of our adored monarch. He will save Europe!"`

const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

let pattern = /(?<=(\.|\?|\!)"?)\s+/gm
const sentenceArray = TextSource.split(pattern)
    .filter(i => i !== '.' && i !== '!' && i !== '?')
    .map(i => i.replace(/\s+/gm, " "))
    .reduce((acc, item, i) => {
        if (item[0] === item[0].toLocaleLowerCase) {
            acc[i-1] = acc[i-1].concat(item)
        } acc.push(item)
        return acc
    }, []).map(i => i.replace(/("|')/g, ''))

const textLengthRandomiser = () => Math.floor(Math.random() * 190 + 10)

const titleGenerator = () => LoremIpsum.substring(0, textLengthRandomiser())

const itemsGenerator = (dimension) => new Array(dimension).fill(0).map((item) => titleGenerator())

const mapper = (item) => new Promise((resolve) => {
    setTimeout(() => resolve(item), Math.round(Math.random() * 9000) + 1000);
})

const FormState = {length: 0, limit: 10}

const Content = document.querySelector('#content')
const searchForm = this.document.querySelector('.header_search-container')
const inputs = {
    limit: document.querySelector('#limit'),
    length: document.querySelector('#length'),
    submit: document.querySelector('#submit'),
    progress: document.querySelector('#progress')
}

// Queue implemantaion
class Queue {
    constructor(props) {
        this.requested = {}
        this.requestedLength = 0
        this.lastRequested = 0
        this.limit = props.limit
        this.length = props.length
        this.items = itemsGenerator(props.length).map((i , j) => ({
            index: j, title: i, resolved: false
        }))
    }

    mapper = (item) => new Promise((resolve) => {
        resolve = item => {
            const key = item.index
            this.items[key].resolved = true
            delete this.requested[key]
            this.updateItem(this.items[key])
            this.requestedLength -= 1
            this.setProgress()
            if (this.lastRequested <= this.items.length - 1 
                && this.requestedLength < this.limit) {
                return this.startQueue(this.items, this.mapper, this.limit)
            }
            if (item.index === this.items.length - 1) {
                inputs.submit.removeAttribute('disabled')
            }
        }
        setTimeout(() => resolve(item), Math.round(Math.random() * 9000) + 1000);
    })

    startQueue = (arr = this.items, fn = this.mapper, limit = this.limit) => {
        if (!this.lastRequested) {
            this.clearContent()
        }
        this.drawItem(arr[this.lastRequested])
        this.requested[this.lastRequested] = fn(arr[this.lastRequested])
        this.lastRequested += 1
        this.requestedLength += 1
        if (this.requestedLength < this.limit && this.lastRequested <= this.items.length - 1) {        
            return this.startQueue(arr, fn, limit)
        }
    }

    drawItem = (item) => {
        let itemClass = `item${item.index}`
        const itemTemplate =`
                <h3 class="item-title">${item.index + 1}.&nbsp;${item.title}</h3>
                <div class="item-description"></div>  
            `;
        const Item = document.createElement('div');
        Item.classList.add('item-wrapper')
        Item.classList.add(itemClass)
        Item.innerHTML = itemTemplate;
        Content.insertAdjacentElement('beforeend', Item)
        setTimeout(() => {
            document.querySelector(`.item-wrapper.item${item.index}`).classList.add('show-title')
        })
       
    }

    updateItem = (item) => {
        const selector = `.item-wrapper.item${item.index}`
        const ItemElement = document.querySelector(selector)
        ItemElement.querySelector('.item-description').innerHTML = sentenceArray[item.index]
        setTimeout(() => {
            document.querySelector(`.item-wrapper.item${item.index}`)
            .classList.add('show-description')
        })
    }

    setProgress = () => {
        const resolved = this.items.filter(i => i.resolved).length
        const total = this.items.length
        const progress = `${resolved} of ${total}`
        inputs.progress.value = progress
        inputs.progress.removeAttribute('hidden')
    }

    clearContent = () => {
        const nodesToRemove = Content.childNodes;
        this.setProgress()
        while (nodesToRemove.length > 2) {
            nodesToRemove[nodesToRemove.length - 1].remove();
        }
    }
}

function onScroll(e) {
    if (window.scrollY) {
        searchForm.classList.add('fixed')
    } else {
        searchForm.classList.remove('fixed')
    }
}

const onSubmit = (e) => {
    e.preventDefault()
    if (!FormState.length) {
        return
    }
    const queue = new Queue(FormState)
    Items = itemsGenerator(length).map((i , j) => ({
        index: j, title: i, resolved: false
    }))
    inputs.submit.setAttribute('disabled', 'true')
    queue.startQueue()
}

const onChange = (e) => { 
    const {name, value} = e.target
    const isNumber = parseInt(value)
    if (value) {
        inputs[name].classList.add('dirty')
    }
    if (Object.is(isNumber, NaN)) {
        inputs[name].classList.add('error')
    } else {
        FormState[name] =  isNumber
        inputs[name].classList.remove('error')
    }
}

window.addEventListener('scroll', onScroll);
searchForm.addEventListener('change', onChange)
searchForm.addEventListener('submit', onSubmit)

window.onclose = () => {
    window.removeEventListener('scroll', onScroll)
    searchForm.removeEventListener('change', onChange)
    searchForm.removeEventListener('submit', onSubmit)
}

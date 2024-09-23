const cards = document.querySelectorAll('.card')
let currentCard

cards.forEach(card=>{
    card.addEventListener('drag', dragCard)
    card.addEventListener('dragend', dropCard)
    card.addEventListener('mouseover', updateCurrentCard)
});

document.addEventListener('keydown', keyHandler)

function dragCard (e){
    e.preventDefault();
    const cardElement = e.currentTarget;
    cardElement.style.position = 'absolute';
    cardElement.style.setProperty(`top`, `${e.clientY - 450/2}px`);
    cardElement.style.setProperty(`left`, `${e.clientX - 350/2}px`);
}

function dropCard(e){
    e.preventDefault();
    const cardElement = e.currentTarget;
    cardElement.style.position = 'absolute';
    cardElement.style.setProperty(`top`, `${e.clientY - 450/2}px`);
    cardElement.style.setProperty(`left`, `${e.clientX - 350/2}px`);
}

function updateCurrentCard(e){
    currentCard = e.currentTarget;
}

function flipCard(card){
    const faces = [...card.children];
    console.log(faces[0],faces[1])
    faces.forEach(face => {
        if (face.style.getPropertyValue('transform') == 'rotateY(180deg)'){
            face.style.setProperty('transform', 'rotateY(0deg)');
        } else {
            face.style.setProperty('transform', 'rotateY(180deg)');
        }
    });
}

function keyHandler(e){
    if (e.key === 'f'){
        flipCard(currentCard);
    }
}
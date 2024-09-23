const cards = document.querySelectorAll('.card');
const deckArea = document.querySelector('.deck-area');
const deckAreaBounds = deckArea.getBoundingClientRect();
let dragging = false;
let selectedCard;
let dropArea;

cards.forEach(card=>{
    card.addEventListener('mouseover', updateSelectedCard)
    card.addEventListener('mousedown', startDragCard)
    card.addEventListener('mousemove', dragCard)
    card.addEventListener('mouseup', dropCard)
    card.addEventListener('mouseout', deselectCard)
});

document.addEventListener('keydown', keyHandler);

function updateSelectedCard(e){
    if(!dragging){
        selectedCard = e.currentTarget;
        selectedCard.style.setProperty('z-index', '10');
    }
}

function startDragCard(){
    if (selectedCard){ 
        dragging = true;
    }
}

function dragCard (e){
    if (dragging){
        selectedCard.style.setProperty('position', 'absolute');
        selectedCard.style.setProperty(`top`, `${e.clientY - 450/2}px`);
        selectedCard.style.setProperty(`left`, `${e.clientX - 350/2}px`);
        activateDropArea(e);
    }
}

function dropCard(){
    dragging = false;
    if (dropArea){
        selectedCard.style.setProperty('position', 'relative');
        selectedCard.style.setProperty('top', '0px');
        selectedCard.style.setProperty('left', '0px');
        dropArea.appendChild(selectedCard);
    }
}

function deselectCard(){
    selectedCard.style.setProperty('z-index', '0');
}

function flipCard(card){
    if (card){
        const faces = [...card.children];
        faces.forEach(face => {
            if (face.style.getPropertyValue('transform') == 'rotateY(180deg)'){
                face.style.setProperty('transform', 'rotateY(0deg)');
            } else {
                face.style.setProperty('transform', 'rotateY(180deg)');
            }
        });
    }
}

console.log(deckAreaBounds)

function activateDropArea(e){
    if (e.clientX <= deckAreaBounds.x || e.clentX >= deckAreaBounds.bottom || e.clientY <= deckAreaBounds.y || e.clientY >= deckAreaBounds.right){
        dropArea = null; 
    }
    else {
        dropArea = deckArea;
    }
}

function deactivateDropArea(){
    dropArea = null;
}

function keyHandler(e){
    if (e.key === 'f'){
        flipCard(selectedCard);
    }
}
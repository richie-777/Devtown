score = 0;
cross = true;
audio = new Audio('music.mp3');
audioend = new Audio('over.mp3');
setTimeout(() => {
    audio.play()

}, 1000);
// document.addEventListener('keydown',function(event){
//     console.log(event.key);
// })

document.onkeydown = function (e) {
    console.log("keycode is:", e.keyCode);
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('.dinoAnim');
        setTimeout(() => {
            dino.classList.remove('.dinoAnim');
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + "px";
    }
};
setInterval(() => {
    dino = document.querySelector('.dino');
    over = document.querySelector('.over');
    obstacle = document.querySelector('.obstacle');
    dx = window.getComputedStyle(dino, null).getPropertyValue("left");
    dy = window.getComputedStyle(dino, null).getPropertyValue("top");
    ox = window.getComputedStyle(obstacle, null).getPropertyValue("left");
    oy = window.getComputedStyle(obstacle, null).getPropertyValue("top");
    
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        over.innerHTML = "game over reload the game to play again!";
        obstacle.classList.remove('obstacleAnim');
        audioend.play();
        setTimeout(() => {
            audioend.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 112 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('.animate-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('new animation duration: ', newDur);
        }, 500);
    }
}, 10);
function updateScore(score) {
    scoreCount.innerHTML = "your score" + score;
}
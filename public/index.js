
// Declare canvas variables
let c = document.getElementById('canvas');
let ctx = c.getContext('2d');
// Resizes canvas when the window is resized
window.addEventListener('resize', ()=>{ c.width = window.innerWidth;
    c.height = window.innerHeight; });
document.addEventListener('mousedown', ()=>{ clicks++;
// Lock cursor when canvas is clicked
    if (document.pointerLockElement !== c) c.requestPointerLock();
// Checks when the mouse is clicked and if crosshair is on a circle, then adds score and adds new // circle, deleting the old one
    for (let i = 0; i < circles.length; i++) {
        if (Math.sqrt((circles[i][0] - cursorX) * (circles[i][0] - cursorX) + (circles[i][1] - cursorY) * (circles[i][1] - cursorY)) < 54) {
            addCircle(); circles.splice(i, 1); return score++;
        } }
})
//
//
//
document.addEventListener('mousemove', (e)=>{
    if (document.pointerLockElement === c) {
// Moves cursor location according to the event cursor movement (X VALUE)
        if (Math.abs(e.movementX - previousX) <= 30) {
            cursorX += e.movementX * sensitivity; previousX = e.movementX } else {
            cursorX += previousX * sensitivity;
        }
// Moves cursor location according to the event cursor movement (Y VALUE)
        if (Math.abs(e.movementY - previousY) <= 30) {
            cursorY += e.movementY * sensitivity; previousY = e.movementY
        } else {
            cursorY += previousY * sensitivity;
        }

    }
});
// Resize canvas to window size
c.width = window.innerWidth; c.height = window.innerHeight;
// Variable declaration
let previousX = 0;
let previousY = 0;
let cursorX = -62.75; // -125.5 centers the cursor in-between the 4x4 circle grid let cursorY = -125.5;
let cursorY = -62.75;
let circles = [[ // Adds one circle at the start
    Math.floor(Math.random() * 4) * 125 - 250, Math.floor(Math.random() * 4) * 125 - 250
]];
let sensitivity = 1.3; // Multiplier for how far your crosshair moves with your mouse movement let score = 1;
let score = 1;
let clicks = 0;
addCircle(); addCircle();
// CREATE CIRCLE // Adds a circle randomly to the array, making sure no circles overlap
function addCircle() {
    for (let i = 0; i < 1024; i++) { let invalidLocation = 0; let newCircle = [
        Math.floor(Math.random() * 4) * 125 - 250, Math.floor(Math.random() * 4) * 125 - 250
    ];
        for (let i = 0; i < circles.length; i++) {
            if (circles[i][0] === newCircle[0] && circles[i][1] === newCircle[1]) {
                invalidLocation = 1;
            }

        }
        if (invalidLocation === 0) {
            return circles.push(newCircle) }
    } }
// Calculates percent out of 100 given two numbers (Parameters). Defaults to 100 if NaN.
function calculatePercentage(number1, number2) {

    if (number2 === 0) return 100

    return Math.round(100 * number1 / number2).toString(10).padStart(3, '0');

}
// Called every frame
function animate(timeStamp = 0) { // CLEAR CANVAS //
    ctx.clearRect(0,0, c.width, c.height);
    ctx.lineWidth = '5'; ctx.fillStyle = 'white'; ctx.strokeStyle = 'gray';
// DRAW CIRCLES // Iterates through the circles array and positions circles and draws them accordingly
    for (let i = 0; i < circles.length; i++) {
        ctx.beginPath();
        ctx.arc(circles[i][0] - cursorX + c.width / 2, circles[i][1] - cursorY + c.height / 2, 50, 0, 2 * Math.PI); ctx.fill();
        ctx.stroke();
    }
// DRAW CROSSHAIR //
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(c.width / 2 - 25, c.height / 2); ctx.lineTo(c.width / 2 + 25, c.height / 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(c.width / 2, c.height / 2 - 25); ctx.lineTo(c.width / 2, c.height / 2 + 25); ctx.stroke();
// DRAW OVERLAY TEXT //
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.font = 'bold 45px Courier New';
// I had to split up the overlay text into 4 variables due to the horizontal // constraint of the CodePrint PDF maker
    let scoreTxt = `Score: ${(score - 1).toString(10).padStart(3, '0')}    `;

    let accuracyTxt = `Accuracy: ${calculatePercentage(score, clicks)}%    `; // Passing parameters to function

    let timeTxt1 = `Time: ${Math.floor((Math.round(parseInt(timeStamp) / 1000)) / 60).toString(10).padStart(2, '0')}`;
    let timeTxt2 = `:${((Math.round(parseInt(timeStamp) / 1000)) % 60).toString(10).padStart(2, '0')}`;
    ctx.fillText(scoreTxt + accuracyTxt + timeTxt1 + timeTxt2, c.width / 2, 50); ctx.font = 'bold 35px Courier New';
    ctx.fillText(`Gridshot Unlimited by Tristan Copley`, c.width / 2, c.height - 25); // CALLBACK AFTER FRAME COMPLETION //
    requestAnimationFrame( animate );

    console.log(Math.round(cursorX) + ' ' + Math.round(cursorY))

}
animate(0);
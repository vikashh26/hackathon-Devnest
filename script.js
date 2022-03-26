// counter
const counter = document.getElementById("counter");

// reload button
const reload_button = document.getElementById("reload")

// simon game parts
const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");

// Keeping Level Record
let count = 1;


// Game Sound
simonSound = new Audio('tap.wav')
simonFailedSound = new Audio('drum.wav')



function disable(){
    for(let i of simonArray){
        i.classList.remove("simonAble")
    }
}


function enable(){
    for(let i of simonArray){
        i.classList.add("simonAble")
    }
}

// for random number
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

simonArray = [green,red,yellow,blue];

// array for rembering the sequence
order = [];


function flash(panel){
    return new Promise ((resolve, reject) => {
        panel.classList.add("active");
        setTimeout(() => {
            panel.classList.remove("active");
            setTimeout(() => {resolve();},250)
        },1000);
    });
};

async function startGame(num){
    
    for(let i =0; i < num; i++){
        panel = simonArray[getRndInteger(0,4)];
        await flash(panel)
        order.push(panel)
    };
    enable()
}


const planelClicked = panel => {
    
    if( panel != order.shift()){
        simonFailedSound.play()
        counter.innerHTML = "Fail";
        count = 1;
        order = [];
        disable()
        reload_button.classList.remove("display-none")
        return

    }else if(order.length == 0){
        count ++
        gameStart()
    }
    simonSound.play()
}




function gameStart (){
    counter.removeEventListener("click",gameStart)
    reload_button.classList.add("display-none")
    disable()
    counter.innerHTML = count;
    startGame(count)
}


counter.addEventListener("click",gameStart);



let Turret = document.querySelector("#turret");
let Hull = document.querySelector("#hull");
let motor = document.querySelector("#motor");
let loader = document.querySelector("#loader");
let points = 0;
let reload = 0;
let TargetDestroyed = false;
let DamagedPart = false;

Turret.addEventListener("click", Hit);

Hull.addEventListener("click", Hit);

motor.addEventListener("click", MotorBoom);


function Reload() {
    if (reload > 0) {
    loader.innerHTML = reload +"s";
    reload--;
}
else{
    loader.innerHTML = "Jelenleg felvan töltve";
}
}

function GifCheck() {
    motor.innerHTML = "";
}

setInterval(function() {
    GifCheck();
    Reload();
} , 1000);

function MotorBoom() {
    Hit();
    Hull.style.animationPlayState = "paused";
    motor.style.animationPlayState = "paused";
    Turret.style.animationPlayState = "paused";
    let currentPosition = Turret.getBoundingClientRect();
    Turret.style.backgroundColor = "Red";
    Turret.style.left = currentPosition.left + "px";
    Turret.style.animation = "Shootah 5s forwards";
    Turret.style.animationPlayState = "resume";  
    PointCalc(); 
    DamagedPart = true;
    console.log(points);
}

function Hit() { 
    if (reload > 0) {
        alert("Még nem töltődött újra!");
    }
    reload = 3;
    motor.innerHTML = '<img src="képek/boom.gif">';
}

function PointCalc() {
    if (TargetDestroyed == true) {
        points += 1000;
        TargetDestroyed = false;
    }
    else if (DamagedPart == true){
        points += 350;
        DamagedPart = false;
    }
    else if (Hit == false){
        points += 50;
    }
}
let wholeTank = document.querySelector("#tank");
let Turret = document.querySelector("#turret");
let Hull = document.querySelector("#hull");
let motor = document.querySelector("#motor");
let loader = document.querySelector("#loader");
let shot = document.querySelector("#shot");
let cannon = document.querySelector("#cannon");
let track = document.querySelector("#track");
let button  = document.querySelector("#gombDiv");
let mainField = document.querySelector("#intro");
let hits = 0;
let points = 0;
let reload = 0;
let TargetDestroyed = false;
let targetAlive = false;
let DamagedPart = false;
let unfinishedTarget = 0;
let Spawntime = 0;
let jatekKezdezdetE = false;

Turret.addEventListener("click", TankDestroyed());

Hull.addEventListener("click", Hit);

motor.addEventListener("click", MobilityKill());

track.addEventListener("click", MobilityKill);

cannon.addEventListener("click", Hit);


setInterval(function() {
    Reload;
    Spawn;
} , 1000);


function jatekKezdese() {
    button.innerHTML = "";
    mainField.style.visibility = "visible";
    jatekKezdezdetE = true;
}

function Spawn() {
    let rn1 = Math.floor(Math.random() * 20);
    console.log(targetAlive)
    console.log(TargetDestroyed)
    console.log(Spawntime);
    if (TargetDestroyed == false && targetAlive == false && Spawntime == 0 && jatekKezdezdetE == true) {
        targetAlive = true;
        wholeTank.style.animationDuration = rn1 + "s";
        wholeTank.style.visibility = "visible";
        wholeTank.style.animationPlayState = "running";
        targetAlive = true;
        console.log("spawnolt");
    }
    else if (Spawntime > 0) {
        Spawntime--;
    }
}
function Reload() {
    if (reload > 0) {
    loader.innerHTML = reload +"s";
    reload--;
}
else{
    loader.innerHTML = "Jelenleg felvan töltve";
}
}

function MobilityKill() {
    if (Hit() == true) {
        wholeTank.style.animationPlayState = 'paused';  
        hits++;
        shotTargetPic();
        PointCalc(); 
        DamagedPart = true;
        console.log(points);        
    }
}

function TankDestroyed() {
    if (Hit() == true) {
        TargetDestroyed = true;
        PointCalc();
        wholeTank.style.animationPlayState = "paused";
        let leftpx = wholeTank.getBoundingClientRect().left;   
        wholeTank.style.left = leftpx + "px";
        wholeTank.style.animation ='fadeAway 3s forwards';
        Spawntime = 3;
        targetAlive = false;    
    }
}

function Hit() { 
    if (reload > 0) {
        alert("Még nem töltődött újra!");
        return false;
    }
    hits++;
    reload = 3;
    console.log("Meglötte!");
    return true;
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
}

/*function shotTargetPic() {
    var x = event.clientX;
    var y = event.clientY;
    console.log(x)
    console.log(y)
    shot.innerHTML += `<div id="shot${hits}"></div>`;
    let currentShot = document.querySelector(`#shot${hits}`);
    currentShot.style.backgroundImage = 'url(képek/Bullet_Shot.png)';
    currentShot.style.position= "absolute";
    currentShot.style.width= "50px";
    currentShot.style.height= "50px";
    currentShot.style.left = x+"px";
    currentShot.style.botom = y +"px";        
}*/

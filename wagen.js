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
let livetime = 0;
let jatekKezdezdetE = false;

Turret.addEventListener("click", TankDestroyed);

Hull.addEventListener("click", Hit);

motor.addEventListener("click", MobilityKill);

track.addEventListener("click", MobilityKill);

cannon.addEventListener("click", Hit);


setInterval(function() {
    Reload();
    Spawn();
} , 1000);


function jatekKezdese() {
    button.innerHTML = "";
    let rn = Math.floor(Math.random() * 3);
    mainField.style.visibility = "visible";
    document.querySelector("#audioBG").innerHTML = `<audio src="bg${rn}.mp3" controls="controls" style="display: none;" autoplay></audio>`;
    jatekKezdezdetE = true;

}

function Spawn() {
    if (unfinishedTarget == 3) {
        jatekKezdezdetE = false;
        hits = 0;
        points = 0;
        reload = 0;
        TargetDestroyed = false;
        targetAlive = false;
        DamagedPart = false;
        unfinishedTarget = 0;
        Spawntime = 0;
        livetime = 0;
        jatekKezdezdetE = false;
        mainField.style.visibility = "hidden";
        button.innerHTML = '<button onclick="jatekKezdese()" id="gomb">Játék újra indítása</button>'
    }
    else if (TargetDestroyed == false && targetAlive == false && Spawntime == 0 && jatekKezdezdetE == true) {
        document.querySelector("#audio").innerHTML = "";
        let rn1 = Math.floor(Math.random() * 20) + 3;
        targetAlive = true;
        wholeTank.style.left = "-200px"
        wholeTank.style.animationName = "Moving";
        wholeTank.style.animationDuration = rn1 + "s";
        wholeTank.style.visibility = "visible";
        wholeTank.style.animationPlayState = "running";
        targetAlive = true;
        console.log("spawnolt");
    }
    else if (Spawntime > 0) {
        Spawntime--;
        console.log(Spawntime + "s");
    }

    else if (livetime > 12){
        wholeTank.style.animation = "none";
        wholeTank.style.visibility = "hidden";
        livetime = 0;
        unfinishedTarget++;
        targetAlive = false;
        console.log(unfinishedTarget);
    }
    else {
        livetime++;
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
        document.querySelector("#HitEvent").innerHTML = "Célpont Sikeres neutralizálása +350pont";
        DamagedPart = true;
        wholeTank.style.animationPlayState = 'paused';  
        livetime = -9999;
        // shotTargetPic();
        PointCalc(); 
        DamagedPart = true;
        console.log(points);        
    }
}

function TankDestroyed() {
    if (Hit() == true) {
        document.querySelector("#audio").innerHTML = '<audio src="Destroyed.mp3" controls="controls" style="display: none;" autoplay></audio>';
        document.querySelector("#HitEvent").innerHTML = "Célpont Sikeres megsemmisíése +1000pont";
        TargetDestroyed = true;
        PointCalc();
        wholeTank.style.animationPlayState = "paused";
        let leftpx = wholeTank.getBoundingClientRect().left;   
        wholeTank.style.left = leftpx + "px";
        wholeTank.style.animation ='fadeAway 3s forwards';
        Spawntime = 3;
        targetAlive = false;  
        let num = document.querySelector("#num") .innerHTML ;
        document.querySelector("#num").innerHTML = ++num;
    }
}

function Hit() { 
    if (reload > 0) {
        alert("Még nem töltődött újra!");
        return false;
    }
    document.querySelector("#audio").innerHTML += '<audio src="shot.mp3" controls="controls" style="display: none;" autoplay></audio>';
    hits++;
    reload = 3;
    console.log("Meglötte!");
    document.querySelector("#All_hit").innerHTML = hits;
    return true;
}

function PointCalc() {
    if (TargetDestroyed == true) {
        points += 1000;
        TargetDestroyed = false;
        document.querySelector("#points").innerHTML = points;
    }
    else if (DamagedPart == true){
        points += 350;
        DamagedPart = false;
        document.querySelector("#points").innerHTML = points;
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

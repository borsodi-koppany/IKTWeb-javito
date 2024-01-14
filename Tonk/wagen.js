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
let pointStat = document.querySelector("#points");
let destroyedStat = document.querySelector("#num");
let hitStat = document.querySelector("#All_hit");
let HItEvent =  document.querySelector("#HitEvent");
let Escaped = document.querySelector("#escaper");
let hits = 0;
let points = 0;
let reload = 0;
let TargetDestroyed = false;
let targetAlive = false;
let DamagedPart = false;
let DamagedALready = false;
let unfinishedTarget = 0;
let Spawntime = 0;
let livetime = 0;
let jatekKezdezdetE = false;
let difficulty = 25;
let thisRoundCD = 0;

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
    difficulty = 25;
    destroyedStat.innerHTML = 0;
    hitStat.innerHTML = 0;
    pointStat.innerHTML = 0;
    Escaped.innerHTML = 0;
    button.innerHTML = "";
    Spawntime = 2;
    let rn = Math.floor(Math.random() * 3);
    mainField.style.visibility = "visible";
    document.querySelector("#audioBG").innerHTML = `<audio src="bg${rn}.mp3" controls="controls" style="display: none;" autoplay></audio>`;
    jatekKezdezdetE = true;
    Spawntime = rn;
}

function Spawn() {
    let rn1 = Math.floor(Math.random() * 5) + 2;
    if (difficulty - rn1 > 5 && targetAlive == false && Spawntime == 0 && jatekKezdezdetE == true) {
        difficulty -= rn1;
        console.log(difficulty);
        if (difficulty > 10) {
            thisRoundCD = 15;
        }
        else{
            thisRoundCD = 5;
        }
    }
    else if (targetAlive == false && Spawntime == 0){
        difficulty = 5;
    }
    console.log(thisRoundCD +"ido");
    if (unfinishedTarget == 3) {
        HItEvent.innerHTML = "";
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
        DamagedALready = false;
        mainField.style.visibility = "hidden";
        button.innerHTML = '<button onclick="jatekKezdese()" id="gomb">Játék újra indítása</button>';
    }
    else if (TargetDestroyed == false && targetAlive == false && Spawntime == 0 && jatekKezdezdetE == true) {
        let rn2 = Math.floor(Math.random() * 2);
        if (rn2 == 0) {
        targetAlive = true;
        livetime = 0;
        wholeTank.id = "tank2";
        wholeTank = document.querySelector("#tank2");
        Turret.id = "turret2";
        Turret = document.querySelector("#turret2");
        Hull.id = "hull2";
        Hull = document.querySelector("#hull2");
        motor.id = "motor2";
        motor = document.querySelector("#motor2");
        cannon.id = "cannon2";
        cannon = document.querySelector("#cannon2");
        track.id = "track2";
        track = document.querySelector("#track2");
        document.querySelector("#audio").innerHTML = "";
        DamagedALready = false;
        wholeTank.style.right = "-600px";
        wholeTank.style.animationName = "Moving1";
        wholeTank.style.animationDuration = difficulty + "s";
        wholeTank.style.visibility = "visible";
        wholeTank.style.animationPlayState = "running";
        targetAlive = true;
        console.log("spawnoltJ");            
        }
        else{
            wholeTank.id = "tank";
            wholeTank = document.querySelector("#tank");
            Turret.id = "turret";
            Turret = document.querySelector("#turret");
            Hull.id = "hull";
            Hull = document.querySelector("#hull");
            motor.id = "motor";
            motor = document.querySelector("#motor");
            cannon.id = "cannon";
            cannon = document.querySelector("#cannon");
            track.id = "track";
            track = document.querySelector("#track");
        targetAlive = true;
        livetime = 0;
        document.querySelector("#audio").innerHTML = "";
        DamagedALready = false;
        wholeTank.style.left = "-600px";
        wholeTank.style.animationName = "Moving2";
        wholeTank.style.animationDuration = difficulty + "s";
        wholeTank.style.visibility = "visible";
        wholeTank.style.animationPlayState = "running";
        targetAlive = true;
        console.log("spawnoltB");      
        }
    }
    else if (Spawntime > 0) {
        Spawntime--;
    }
    else if (livetime > thisRoundCD && jatekKezdezdetE == true){
        document.querySelector("#HitEvent").innerHTML = "";
        DamagedALready = false;
        DamagedPart = false;
        wholeTank.style.animation = "none";
        wholeTank.style.visibility = "hidden";
        livetime = 0;
        unfinishedTarget++;
        targetAlive = false;
        console.log(unfinishedTarget);
        PointCalc();
        HItEvent.innerHTML = "A célpont elmenekült -1000pont";
        let num = Escaped.innerHTML;
        Escaped.innerHTML = ++num;
        console.log("megsemmisult");
    }
    else {
        livetime++;
        console.log(livetime)
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
        HItEvent.innerHTML = "Célpont Sikeres neutralizálása +350pont";
        DamagedPart = true;
        wholeTank.style.animationPlayState = 'paused';  
        livetime = -9999;
        PointCalc(); 
        DamagedALready = true;
        console.log(points);        
    }
}

function TankDestroyed() {
    if (Hit() == true) {
        document.querySelector("#audio").innerHTML = '<audio src="Destroyed.mp3" controls="controls" style="display: none;" autoplay></audio>';
        HItEvent.innerHTML = "Célpont Sikeres megsemmisíése +1000pont";
        TargetDestroyed = true;
        DamagedALready = false;
        PointCalc();
        wholeTank.style.animationPlayState = "paused";
        var leftpx = wholeTank.getBoundingClientRect().left-150;
        wholeTank.style.left = leftpx+ "px";
        wholeTank.style.animation ='fadeAway 3s forwards';
        Spawntime = 3;
        targetAlive = false;  
        let num = destroyedStat.innerHTML ;
        destroyedStat.innerHTML = ++num;
    }
}

function Hit() { 
    if (reload > 0) {
        alert("Még nem töltődött újra!");
        return false;
    }
    document.querySelector("#audio").innerHTML = '<audio src="shot.mp3" controls="controls" style="display: none;" autoplay></audio>';
    hits++;
    reload = 3;
    console.log("Meglötte!");
    hitStat.innerHTML = hits;
    return true;
}

function PointCalc() {
    if (TargetDestroyed == true && DamagedALready == false) {
        points += 1500;
        TargetDestroyed = false;
        pointStat.innerHTML = points;
    }
    else if(TargetDestroyed == true) {
        points += 800;
        TargetDestroyed = false;
        pointStat.innerHTML = points;
    }
    else if (DamagedPart == true && DamagedALready == false){
        points += 350;
        DamagedPart = false;
        pointStat.innerHTML = points;
    }
    else if (DamagedALready == true){
        points += 1;
        pointStat.innerHTML = points;
    }
    else{
        points -= 1000;
        pointStat.innerHTML = points;
    }
}
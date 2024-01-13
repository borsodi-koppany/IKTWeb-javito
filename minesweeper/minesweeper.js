// let tabla = [];
// let sorok = 8;
// let oszlopok = 8;

// let aknaSzam = 5;
// let aknaHelye = [];

// let megnyomottMezok = 0;
// let zaszlo = false;
// let zaszloGomb = document.querySelector('.zaszlo-gomb') 

// let jatekVege = false;

// window.onload = function(){
//     JatekInditasa();
// }

// function JatekInditasa(){
//     document.querySelector('.akna-szam').innerHTML = aknaSzam;
//     zaszloGomb.addEventListener('click', ZaszloAllitas);
//     for(let s = 0; s < sorok; s++){
//         let sor = [];
//         for(let o = 0; o < oszlopok; o++){
//             let mezo = document.createElement('div')
//             mezo.id = s.toString() + '-' + o.toString();
//             document.querySelector('.tabla').append(mezo);
//             sor.push(mezo);
//         }
//         tabla.push(sor);
//     }
//     console.log(tabla);
// }

// function ZaszloAllitas(){
//     if(zaszlo == true){
//         zaszlo = false
//         zaszloGomb.style.backgroundColor = 'lightgray';
//     }
//     else{
//         zaszlo = true;
//         zaszloGomb.style.backgroundColor = 'darkgray';
//     }
// }

// function MezoMegnyomas() {
//     let mezo = this;
//     console.log(mezo)
//     if(zaszlo == true) {
//         if(mezo.innerHTML == ''){
//             mezo.innerHTML = '🚩';
//         }
//         else if (mezo.innerHTML == '🚩'){
//             mezo.innerHTML = '';
//         }
//         return;
//     }
// }

let board = [];
let rows = 8;
let columns = 8;

let minesCount = 10;
let minesLocation = []; // "2-2", "3-4", "2-1"

let tilesClicked = 0; //goal to click all tiles except the ones containing mines
let flagEnabled = false;

let gameOver = false;

window.onload = function() {
    startGame();
}

function setMines() {
    // minesLocation.push("2-2");
    // minesLocation.push("2-3");
    // minesLocation.push("5-6");
    // minesLocation.push("3-4");
    // minesLocation.push("1-1");

    let minesLeft = minesCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}


function startGame() {
    document.querySelector('.akna-szam').innerText = minesCount;
    document.querySelector('.zaszlo-gomb').addEventListener("click", setFlag);
    setMines();

    //populate our board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.querySelector('.tabla').append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.querySelector('.zaszlo-gomb').style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true;
        document.querySelector('.zaszlo-gomb').style.backgroundColor = "darkgray";
    }
}

function clickTile() {
    if (gameOver || this.classList.contains("ures-mezo")) {
        return;
    }

    let tile = this;
    if (flagEnabled) {
        if (tile.innerText == "") {
            tile.innerText = "🚩";
        }
        else if (tile.innerText == "🚩") {
            tile.innerText = "";
        }
        return;
    }

    if (minesLocation.includes(tile.id)) {
        // alert("GAME OVER");
        gameOver = true;
        revealMines();
        return;
    }


    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}

function revealMines() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("ures-mezo")) {
        return;
    }

    board[r][c].classList.add("ures-mezo");
    tilesClicked += 1;

    let minesFound = 0;

    //top 3
    minesFound += checkTile(r-1, c-1);      //top left
    minesFound += checkTile(r-1, c);        //top 
    minesFound += checkTile(r-1, c+1);      //top right

    //left and right
    minesFound += checkTile(r, c-1);        //left
    minesFound += checkTile(r, c+1);        //right

    //bottom 3
    minesFound += checkTile(r+1, c-1);      //bottom left
    minesFound += checkTile(r+1, c);        //bottom 
    minesFound += checkTile(r+1, c+1);      //bottom right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        board[r][c].innerText = "";
        
        //top 3
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);      //top
        checkMine(r-1, c+1);    //top right

        //left and right
        checkMine(r, c-1);      //left
        checkMine(r, c+1);      //right

        //bottom 3
        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);      //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.querySelector('.akna-szam').innerText = "Cleared";
        gameOver = true;
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}
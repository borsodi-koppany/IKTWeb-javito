let board = [];
let rows = 8;
let columns = 8;

let minesCount = 10;
let minesLocation = []; 

let tilesClicked = 0; 
let flagEnabled = false;

let gameOver = false;

window.onload = function() {
    startGame();
}

function setMines() {
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
    document.querySelector(".akna-szam").innerText = minesCount;
    document.querySelector(".zaszlo-gomb").addEventListener("click", setFlag);
    setMines();
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.querySelector(".tabla").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.querySelector(".zaszlo-gomb").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true;
        document.querySelector(".zaszlo-gomb").style.backgroundColor = "darkgray";
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
        gameOver = true;
        revealMines();
        alert('A Játéknak Vége')
        return;
    }
    let coords = tile.id.split("-"); 
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

    
    minesFound += checkTile(r-1, c-1);      
    minesFound += checkTile(r-1, c);        
    minesFound += checkTile(r-1, c+1);

    
    minesFound += checkTile(r, c-1);        
    minesFound += checkTile(r, c+1);        

   
    minesFound += checkTile(r+1, c-1);     
    minesFound += checkTile(r+1, c);        
    minesFound += checkTile(r+1, c+1);      

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        board[r][c].innerText = "";
        
        
        checkMine(r-1, c-1);    
        checkMine(r-1, c);      
        checkMine(r-1, c+1);    

        checkMine(r, c-1);      
        checkMine(r, c+1);      

        checkMine(r+1, c-1);    
        checkMine(r+1, c);      
        checkMine(r+1, c+1);    
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.querySelector(".ures-mezo").innerText = "Teljesítve";
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
const menu = document.createElement("button");
menu.className = "menu__btn";
menu.innerHTML = "MENU";
document.body.append(menu);

const menuWrapper = document.createElement("div");
menuWrapper.className = "menu__wrapper";
document.body.append(menuWrapper);

const menuList = document.createElement("ul");
menuList.className = "menu__list";
menuWrapper.append(menuList);

const menuListItem = document.createElement("li");
menuListItem.className = "menu__list__item";
menuListItem.innerHTML = "NEW GAME";
menuList.append(menuListItem);

// const menuListItem3 = document.createElement("li");
// menuListItem3.className = "menu__list__item";
// menuListItem3.innerHTML = "SAVE GAME";
// menuList.append(menuListItem3);

// const menuListItem4 = document.createElement("li");
// menuListItem4.className = "menu__list__item";
// menuListItem4.innerHTML = "CONTINUE GAME";
// menuList.append(menuListItem4);


// const menuListItem5 = document.createElement("li");
// menuListItem5.className = "menu__list__item";
// menuListItem5.innerHTML = "SCORE";
// menuList.append(menuListItem5);

// const menuListItem6 = document.createElement("li");
// menuListItem6.className = "menu__list__item";
// menuListItem6.innerHTML = "Instruction";
// menuList.append(menuListItem6);

const sound = document.createElement('div');
sound.classList.add('sound');
sound.classList.add('hidden');
document.body.append(sound);


sound.innerHTML = `<audio class="audio" src="./src/tink.wav"></audio>`;  

const menuListItem2 = document.createElement("li");
menuListItem2.className = "menu__list__item";
menuListItem2.innerText = `SOUND: `;
menuList.append(menuListItem2);

const on = document.createElement("label");
on.className = "switch";
on.innerHTML = `<input type="checkbox" checked><span class="slider round"></span>`;
menuListItem2.append(on);


let checkSound = document.querySelector('input');
let soundProp = true;
checkSound.addEventListener('change', () => {
    
        soundProp = checkSound.checked;
    
})




const cellsWrapper = document.createElement("div");
cellsWrapper.className = "cells__wrapper";
document.body.append(cellsWrapper);


const gameWrapper = document.createElement("div");
gameWrapper.className = "game__wrapper";
document.body.append(gameWrapper);

let moves = 0;
const decription = document.createElement("div");
decription.className = "decription";
decription.innerHTML = `<span>Moves: </span>${moves}`;
gameWrapper.append(decription);


const time = document.createElement("div");
time.id = 'timer';
time.innerHTML = `<span> 0:0:0</span>`;
gameWrapper.append(time);

const size = document.createElement("select");
size.className = 'size';
gameWrapper.append(size);
for (let i = 0; i<6;i++) {
    let opt= document.createElement('option');
    if (i===1) opt.selected = 'true';
    opt.innerHTML = `${i+3}x${i+3}`;
     size.appendChild(opt);
 
 }

let count;
if(document.documentElement.clientWidth >= 1280){
    count = 100;
}

if(document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280){
    count = 70;
}
if(document.documentElement.clientWidth < 768){
    count = 50;
    size.options[3].setAttribute("disabled", "true");
        size.options[4].setAttribute("disabled", "true");
        size.options[5].setAttribute("disabled", "true");
    } else {
        size.options[3].removeAttribute("disabled");
        size.options[4].removeAttribute("disabled");
        size.options[5].removeAttribute("disabled");
}






let gameSize = 4;

size.onchange = function() {
    
    gameSize = Number(this.options[this.selectedIndex].innerText[0]);
    document.querySelector('.field').remove();
    cellsWrapper.style.width = `${gameSize*count +(gameSize-1)*10 + 20}px`;
    cellsWrapper.style.height = `${gameSize*count +(gameSize-1)*10 + 20}px`;
    

    stopwatch.endStopWatch();
    stopwatch.startStopWatch();
    createCells();
    currCells.map(cell => {
        cell.addEventListener('click', () => {
            if (!checkWON) {
                move(cell);
                checkWin();
                if (soundProp) {
                    const tink = document.querySelector('audio');
                    tink.currentTime = 0;
                    tink.play();
                }
                
            }
        });
    })
}

window.onresize = function () {
    if(window.innerWidth >= 1280){
        count = 100;
    }
    
    if(window.innerWidth >= 768 && window.innerWidth < 1280){
        count = 70;
    }
    const field = document.querySelector('.field');
    field.style.width = `${gameSize*count + (gameSize-1)*10}px`;
    field.style.height = `${gameSize*count +(gameSize-1)*10}px`;
    cellsWrapper.style.width = `${gameSize*count +(gameSize-1)*10 + 20}px`;
    cellsWrapper.style.height = `${gameSize*count +(gameSize-1)*10 + 20}px`;
    let i = 0;
    document.querySelectorAll('.cell').forEach(cell => {
        const left = i %gameSize;
        const top = (i-left)/gameSize;
        cell.style.left = `${left * (count+10)}px`;
        cell.style.top = `${top * (count+10)}px`;
        cell.style.transition = 'none';
        i++;
    })

    if(window.innerWidth>= 320 && window.innerWidth < 768){
        count = 50;
        size.options[3].setAttribute("disabled", "true");
        size.options[4].setAttribute("disabled", "true");
        size.options[5].setAttribute("disabled", "true");
    } else {
        size.options[3].removeAttribute("disabled");
        size.options[4].removeAttribute("disabled");
        size.options[5].removeAttribute("disabled");
    }
    
}
let currCells = [];

var dragSrcEl;

let empty = {
    left: 0,
    top: 0
}
let cells = [];

function move(cell1) {
    let cell;
    
    for (let i = 0; i< cells.length; i++) {
        if (cell1 === cells[i].element) cell =cells[i];
    }
    const leftDiff = Math.abs(empty.left -cell.left);
    const toptDiff = Math.abs(empty.top -cell.top);

    let cellEmpty = document.querySelector(".cell.cell-hidden");

    if (leftDiff+toptDiff>1) {
        return
    } 
    cellEmpty.style.left = cell.element.style.left;
    cellEmpty.style.top = cell.element.style.top;
    cell.element.style.left = `${empty.left * (count+10)}px`;
    cell.element.style.top = `${empty.top * (count+10)}px`;

    const left1 = empty.left;
    const top1 = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = left1;
    cell.top = top1;


    let j =currCells.indexOf(cellEmpty);
    let index = currCells.indexOf(cell1);
    let tmp = currCells[index];
    currCells[index] = currCells[j];
    currCells[j] = tmp;

    moves+=1;
    decription.innerHTML = `<span>Moves: </span>${moves}`;

    // const qsCells = document.querySelectorAll(".cell");
    // qsCells.forEach(e => dragNDrop(e));
}

const dragNDrop = () => {
    const cellDrag = document.querySelectorAll(".cell");
    // const cellDrag = cell;
    const cellEmpty = document.querySelector(".cell.cell-hidden");
    // let cellHelp;
    // for (let i=0; i<cells.length;i++) {
    //     if (cells[i].element === cell)
    //         cellHelp = cells[i]
    // }
    // const leftDiff = Math.abs(empty.left - cellHelp.left);
    // const toptDiff = Math.abs(empty.top -cellHelp.top);
    for (let j=0;j<cellDrag.length;j++){
    const dragStart = function () {
        setTimeout(() => {
            this.style.display = 'none';
        }, 0)
        
    };

    const dragEnd = function () {
        this.style.display = 'flex';
    };

    const dragOver = function (evt) {
        evt.preventDefault();
    };

    const dragEnter = function () {
        
    };

    const dragLeave = function () {

    };

    const dragDrop = function () {
        this.classList.remove("cell-hidden");
        console.log(cellDrag[j].innerHTML)
        // this.innerHTML = cellDrag.innerHTML;

        
    };


    // if (leftDiff+toptDiff<=1) {
        
        
        
    // }
// cell.draggable = "true"
    
        cellDrag[j].draggable = "true";
        cellEmpty.addEventListener('dragover', dragOver);
        cellEmpty.addEventListener('dragenter', dragEnter);
        cellEmpty.addEventListener('dragleave', dragLeave);
        cellEmpty.addEventListener('drop', dragDrop);

        cellDrag[j].addEventListener('dragstart', dragStart);
        cellDrag[j].addEventListener('dragend', dragEnd);

    }
    
    
}
function randomArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
function createCells() {
    currCells = [];
    cells = [];
    const field = document.createElement("div");
    field.className = "field";
    field.style.width = `${gameSize*count + (gameSize-1)*10}px`;
    field.style.height = `${gameSize*count +(gameSize-1)*10}px`;
    cellsWrapper.appendChild(field);
    let num = [...Array(gameSize**2).keys()];
    num = randomArray(num);
    console.log(checkSolve(num));
    while (!checkSolve(num)) {
        num = randomArray(num);
        console.log(checkSolve(num));
    }
    
    

    for (let i=0; i<gameSize**2; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerHTML = num[i];
        // cell.innerHTML = i+1;
        if (num[i] === 0/*cell.innerHTML === '15'*/) {
            cell.classList.add("cell-hidden");
            // cell.innerHTML = '0'
            empty.left = i%gameSize;
            empty.top =  (i-empty.left)/gameSize;
        } 
        // if (cell.innerHTML === '16') cell.innerHTML = '15'
        

        const left = i%gameSize;
        const top = (i-left)/gameSize;

        cells.push({
            left: left,
            top: top, 
            element: cell
        });

        cell.style.left = `${left * (count+10)}px`;
        cell.style.top = `${top * (count+10)}px`;

        field.appendChild(cell);
        currCells.push(cell);

       
    }
}


menu.addEventListener('click', () => {
    
    menuWrapper.style.display = "flex";
    document.querySelector('body').style.overflow = 'hidden';
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu__wrapper')) {
        document.querySelector('body').style.overflow = 'auto';
        menuWrapper.style.display = 'none';
    }
})

menuListItem.addEventListener('click', (event) => {
    // document.querySelector('body').style.overflow = 'auto';
    // menuWrapper.style.display = 'none';
    // document.querySelector('.field').remove();
    // createCells();
    // currCells.map(cell => {
    //     cell.addEventListener('click', () => {
    //         if (!checkWON) {
    //             move(cell);
    //             checkWin();
    //         }
    //     });
    // })
    document.location.reload();
   

})

createCells();

function addZero(n) {
    return  (parseInt(n, 10) < 10 ? '0' : '') + n;
}

var Start = 0;
var pTime = 0;
var Seconds = 0;
var Minutes = 0;
var Hours = 0;

function StopWatch() {

  var timer2;

  // инициализируем переменную для фиксации текущего времени секундомера
  var stopWatchTime;
  var q;
  // определяем публичный метод запуска секундомера
  this.startStopWatch = function() {
    Start++;
    if (Start==1)
    {
    pTime = new Date();
    // фиксируем время запуска секундомера
    var startTime = new Date();

    (function animateStopWatch2() {
      ChangeP();
      var currentTime = new Date();
      // фиксируем общее время работы секундомера
      stopWatchTime = currentTime - startTime;
      q=stopWatchTime;
      // Запускаем числовой таймер раз в 1 миллисекунду
      timer2 = setTimeout(animateStopWatch2, 1);
    })();
    } else {
        (function animateStopWatch2() {
            ChangeP();
            var currentTime = new Date();
            // фиксируем общее время работы секундомера
            stopWatchTime = currentTime - q;
            // Запускаем числовой таймер раз в 1 миллисекунду
            timer2 = setTimeout(animateStopWatch2, 1);
          })();
    }
  }

  // определяем публичный метод паузы секундомера
  this.pauseStopWatch = function() {
    clearTimeout(timer2);    
  }
  this.endStopWatch = function() {
    Start=0;
    clearTimeout(timer2);

  }
}

var stopwatch = new StopWatch();

stopwatch.startStopWatch();
menu.addEventListener('click', stopwatch.pauseStopWatch);
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu__wrapper') && !checkWON) {
        stopwatch.startStopWatch();
    }
})

menuListItem.addEventListener('click', (event) => {
    stopwatch.endStopWatch();
    stopwatch.startStopWatch();

})

function ChangeP(){
if (pTime==0) return;
  //Если 60 секунд или больше
  if (Math.round((new Date().getTime()-pTime)/1000*10)/10 >= 60)
  {
    //+1 минута
    Minutes++;
    //Секуды - 60
    /*
      Когда нам нужно отнять секунды нам сначала нужно сделать
      основными единицами времени секунды (делим на 1000).
      Добавляем 60, так как мы од настоящего времени отнимаем
      от момента запуска. Затем умножаем на 1000, приводя в 
      исходный вид!
    */
    pTime = (pTime/1000+60)*1000;
  }
  //Если 60 минут
  if (Minutes == 60)
  {
    //+1 час
    Hours++;
    //Минут 0
    Minutes = 0;
  }
  Seconds = Math.round((new Date().getTime()-pTime)/100)/10;
  //Если число целое (без дробной части), то мы приписуем ".0"
  //Иначе оставляем таким же
  //Выводим результат
  if (Math.round((new Date().getTime()-pTime)/1000) == Math.round((new Date().getTime()-pTime)/1000*10)/10){
    document.getElementById('timer').innerHTML = addZero(Hours) + ":" + addZero(Minutes) + ":" + addZero(Math.round((new Date().getTime()-pTime)/1000*10)/10) + ".0";
  } else {
    document.getElementById('timer').innerHTML = addZero(Hours) + ":" + addZero(Minutes) + ":" + addZero(Math.round((new Date().getTime()-pTime)/1000*10)/10);
  }
}
let checkWON = false;

function checkWin(){
    // const cellsCheck = document.querySelectorAll(".cell");
    
    let check = true;
    for (let i = 0; i< currCells.length-1; i++) {
        if (currCells[i].innerHTML !== `${i+1}`){
            check = false;
        }
    }

    if (check){
        checkWON = check;
        menuWrapper.style.display = "flex";
        document.querySelector('body').style.overflow = 'hidden';
        const menuListItem = document.createElement("li");
        menuListItem.className = "menu__list__item";
        menuListItem.innerHTML = `HOORAY! You solved the puzzle in ${moves} step and ${document.getElementById('timer').innerHTML}`;
        menuList.append(menuListItem);
        stopwatch.endStopWatch();
    
    }
    
}


currCells.map(cell => {
    cell.addEventListener('click', () => {
        if (!checkWON) {
            move(cell);
            checkWin();
            if (soundProp) {
                const tink = document.querySelector('audio');
                tink.currentTime = 0;
                tink.play();
            }
            
        }
    });
})


function checkSolve(num) {
    let inv = 0;
    let index = num.indexOf(0);
    let arr = num.slice();
    arr.splice(arr.indexOf(0), 1);
    if (gameSize%2 === 0) {
        let nLeft = num.indexOf(0)%gameSize;
        let nTop =  (num.indexOf(0)-nLeft)/gameSize;
    
        if (nTop%2 === 0) {
            for (let i = 0; i < arr.length -1; i++) {
                for (let j = i+1; j < arr.length -1; j++) {
                    if (arr[i] > arr[j])  inv++;
                }
            }
            if (inv%2 !== 0) return true;
        } else {
            for (let i = 0; i < arr.length -1; i++) {
                for (let j = i+1; j < arr.length -1; j++) {
                    if (arr[i] > arr[j])  inv++;
                }
            }
            if (inv%2 === 0) return true;
        }
    } else {
        for (let i = 0; i < arr.length -1; i++) {
            for (let j = i+1; j < arr.length -1; j++) {
                if (arr[i] > arr[j])  inv++;
            }
        }
        if (inv%2 === 0) return true;
    }
    
    
    return false;
}

// function getGame() {
//     document.querySelector('.field').remove();
//     const field = localStorage.getItem('game');
//     cellsWrapper.appendChild(field);
//   }

// function setGame(e) {
//     localStorage.setItem('game', document.querySelector('.field'));
// }
// menuListItem3.addEventListener('click', setGame);
// menuListItem4.addEventListener('click', getGame);
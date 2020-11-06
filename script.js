const cellsWrapper = document.createElement("div");
cellsWrapper.className = "cells__wrapper";
document.body.append(cellsWrapper);

const field = document.createElement("div");
field.className = "field";
cellsWrapper.append(field);

let empty = {
    left: 0,
    top: 0
}
const cells = [];

function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left -cell.left);
    const toptDiff = Math.abs(empty.top -cell.top);
    if (leftDiff+toptDiff>1) {
        return
    } 
    cell.element.style.left = `${empty.left * (100+10)}px`;
    cell.element.style.top = `${empty.top * (100+10)}px`;

    const left1 = empty.left;
    const top1 = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = left1;
    cell.top = top1;
}
const num = [...Array(16).keys()].sort(() => Math.random() - 0.5);

for (let i=0; i<16; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.innerHTML = num[i];
    if (num[i] === 0) {
        cell.classList.add("cell-hidden");
        empty.left = i%4;
        empty.top =  (i-empty.left)/4;
    } 

    const left = i%4;
    const top = (i-left)/4;

    cells.push({
        left: left,
        top: top, 
        element: cell
    });

    cell.style.left = `${left * (100+10)}px`;
    cell.style.top = `${top * (100+10)}px`;

    field.appendChild(cell);

    cell.addEventListener ('click', () => {
        move(i);
    })
}
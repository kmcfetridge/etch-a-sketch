/* repaints grids background white */
function clearGrid() {
	let quadElements = document.getElementsByClassName('quad');
	for(let i = 0;i<quadElements.length;i++) {
		quadElements[i].style.backgroundColor = 'lightgray';
	}
}
/* colors grid based on mouse event */
function colorQuad(e) {
	if(isHover || (!isHover && e.type === 'mousedown') || (!isHover && isMouseDown)) {
		e.target.style.backgroundColor = hexColorValue;
	}
}
/* sets mousedown flag */
function mouseType(e) {
	(e.type === 'mousedown') ? isMouseDown = true : isMouseDown = false;
	(e.type === 'dragend') ? isMouseDown = false : isMouseDown = isMouseDown;
}
/* adds css hover effect to sizeInput when size button has hover */
function sizeHoverStyleHelper(e) {
	if(e.type === 'mouseover') {
		sizeInput.style.backgroundColor = 'red';
		sizeInput.style.color = 'gold';
	} else {
		sizeInput.style.backgroundColor = 'gold';
		sizeInput.style.color = 'red';
	}
}
/* sets new color */
function getColor() {
	let regx = /(^#[0-9a-f]{6}$)|(^#[0-9a-f]{3}$)/i;
	if(regx.test(this.value)) {
		hexColorValue = this.value;
	} else {
		alert("This is not a valid Hex Color Value");
	}
}
/* sets draw style */
function drawType() {
	(this.value === 'hover') ? isHover = true : isHover = false;
}
/* builds a grid */
function buildGrid(num) {
	let quadElements = document.getElementsByClassName('quad');
	let totalDivs = num * num;
	let divSize = 600.0 / num; 

	while(quadElements[0]) {
		quadElements[0].parentNode.removeChild(quadElements[0]);
	}

	for(let i = 0;i<totalDivs;i++) {
		let divElement = document.createElement('div');
		divElement.className = "quad";
		divElement.setAttribute('draggable', false);
		divElement.style.height = divSize + 'px';
		divElement.style.width = divSize + 'px';
		divElement.addEventListener('mouseover', colorQuad);
		divElement.addEventListener('mousedown', colorQuad);
		grid.appendChild(divElement);
	}
}
/* builds a new grid with new size */
function buildNewGrid() {
	let validate = document.getElementById('sizeValue');
	let temp = parseInt(validate.value);
	if(temp > 100 || temp < 1 || isNaN(temp)) {
		alert("Enter a size from 1 to 100");
	} else {
		gridSize = temp;
		buildGrid(gridSize);
	}
	validate.value = "";
}
let global;
let circles;
const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
let centerX = 380;
let centerY = 200;
const radius = 90;

function onCirclesNumberChange() {
	let num = $('#circles_num').val();
	circles.html('');
	let angle = 2 * Math.PI / num;
	circles.html('');
	global.html('');
	for(let i = 0; i < num; ++i) {
		let x = centerX + radius * Math.cos(angle * i - Math.PI/2);
		let y = centerY + radius * Math.sin(angle * i - Math.PI/2);
		let circle = $('<div class="circle" id="' + letters[i] + '" style="left: ' + x + 'px; top: ' + y + 'px">' + letters[i] + '</div>');
		circles.append(circle);
	}
	onFormulaChange();
}

function onFormulaChange() {
	let formula = $('#formula').val();
	if(formula === '') {
		global.html('');
		return;
	}
	if(!/^(!?[ABCDEF])([&|]!?[ABCDEF])*$/.test(formula)) {
		return;
	}
	global.html('');
	global.append(
		or(
			formula.split('|')
				.map(s => s.split('&'))
				.map(arr => arr.map(e => e[0] === '!' ? not(e[1]) : pure(e)))
				.map(and)));
}

window.onload = () => {
	global = $('.global');
	circles = $('.circles');
	
	onCirclesNumberChange();
	onFormulaChange();
};

function and(ids) {
	let parent = $('<div></div>');
	for(let i in ids) {
		ids[i].addClass('multiply');
		parent.append(ids[i]);
	}
	return parent;
}

function or(ids) {
	let parent = $('<div></div>');
	for(let i in ids) {
		ids[i].addClass('lighten');
		parent.append(ids[i]);
	}
	return parent;
}

function not(id) {
	let circle = $('#' + id);
	let filter = $('<div class="filter-negative"></div>');
	let intersection = $('<div class="intersection"></div>');
	intersection.css('left', circle.css('left'));
	intersection.css('top', circle.css('top'));
	intersection.append('<div class="leaf-negative"></div>');
	filter.append(intersection);
	return filter;
}

function pure(id) {
	let circle = $('#' + id);
	let filter = $('<div class="filter"></div>');
	let intersection = $('<div class="intersection"></div>');
	intersection.css('left', circle.css('left'));
	intersection.css('top', circle.css('top'));
	intersection.append('<div class="leaf"></div>');
	filter.append(intersection);
	return filter;
}
document.addEventListener("DOMContentLoaded", function(){

	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');

	const tools = document.querySelector('.content__tools');
	let toolsH = $('.content__tools').height();
	const out = document.querySelector('.controller__output');

	const slider = document.querySelector('.slider');
	const items = document.querySelectorAll('.slider__slide');
	let dataIndex = 0;
	let translateValue = 0;
	// ==
	// let blockH = slider.offsetHeight;

	out.innerText = `0${dataIndex+1}`;

	// ====================func===============
	function checkState(){
		if(dataIndex === 0) {
			prevBtn.disabled = true;
			prevBtn.classList.add('js-disabled');
			// nextBtn.disabled = false;
		} else {
			prevBtn.disabled = false;
			prevBtn.classList.remove('js-disabled');
		}

		if(dataIndex === 9) {
			// prevBtn.disabled = false;
			nextBtn.disabled = true;
			nextBtn.classList.add('js-disabled');
		} else {
			nextBtn.disabled = false;
			nextBtn.classList.remove('js-disabled');
		}
	}

	checkState();


	nextBtn.addEventListener('click', function(){
		// translateValue += 480;
		translateValue += slider.offsetHeight;

		items.forEach((elem, id) => {
			let x = id === dataIndex ? translateValue + toolsH : translateValue;

			const seq = [
				{e: $(elem), p: {scaleX: 0.95, scaleY: 0.95}, o: {duration: 300}},
				{e: $(elem), p: {translateY: `-${x}px`}, o: {duration: 800}},
				{e: $(elem), p: {scaleX: 1, scaleY: 1}, o: {duration: 300}}
			];

			$.Velocity.RunSequence(seq);
		});

		dataIndex++;
		out.innerText = dataIndex+1 !== 10 ? `0${dataIndex+1}` : `${dataIndex+1}`;

		checkState();
	});

	prevBtn.addEventListener('click', function(){
		// translateValue -= 480;
		translateValue -= slider.offsetHeight;

		items.forEach((elem, id) => {
			let x = id-1 === dataIndex ? translateValue + tools.offsetHeight : translateValue;

			const seq = [
				{e: $(elem), p: {scaleX: 0.95, scaleY: 0.95}, o: {duration: 300}},
				{e: $(elem), p: {translateY: `-${x}px`}, o: {duration: 800}},
				{e: $(elem), p: {scaleX: 1, scaleY: 1}, o: {duration: 300}}
			];

			$.Velocity.RunSequence(seq);
		});

		dataIndex--;
		out.innerText = dataIndex+1 !== 10 ? `0${dataIndex+1}` : `${dataIndex+1}`;

		checkState();
	});

	// ======================
	const menu = document.getElementById('menu');
	const main = document.querySelector('.main');
	const testMenu = document.querySelector('.testMenu');

	main.addEventListener('click', e => {
		console.log(e.target);
		if(e.target == menu) {
			main.classList.add('show-menu');
		}

		if(e.target == testMenu) {
			main.classList.remove('show-menu');
		}
	});
});

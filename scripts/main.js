document.addEventListener("DOMContentLoaded", function(){

	const navigation = {
		topBtn: document.querySelector(".navigation__btn--top"),
		botBtn: document.querySelector(".navigation__btn--bot"),
		outPut: document.querySelector(".navigation__output"),
		mainOrderValue: 1,
		setDataAttr() {
			this.topBtn.setAttribute("data-anchor", `#root_${this.mainOrderValue}`);
			this.botBtn.setAttribute("data-anchor", `#root_${this.mainOrderValue}`);

			this.addDisabledClass(this.mainOrderValue);

			//вынести
			this.outPut.querySelector('.test').innerHTML = this.mainOrderValue;
		},
		addDisabledClass(order) {
			if(order === 1) {
				this.topBtn.classList.add('navigation__btn--js-disable');
				this.topBtn.disabled = true;
			} else {
				this.topBtn.classList.remove('navigation__btn--js-disable');
				this.topBtn.disabled = false;
			}

			if(order === 10) {
				this.botBtn.classList.add('navigation__btn--js-disable');
				this.botBtn.disabled = true;
				this.outPut.querySelector('.test1').style.display = "none";
			} else {
				this.botBtn.classList.remove('navigation__btn--js-disable');
				this.botBtn.disabled = false;
			}
		},

	};

	navigation.setDataAttr();

	navigation.topBtn.addEventListener('click', e => {
		e.preventDefault();
		if(navigation.mainOrderValue !== 1){
			navigation.mainOrderValue--;
		}
		navigation.setDataAttr();
		let id = e.target.getAttribute("data-anchor");
		// JQ (заменить)
		let	top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 1000);

	});

	navigation.botBtn.addEventListener('click', e => {
		e.preventDefault();
		if(navigation.mainOrderValue !== 10){
			navigation.mainOrderValue++;
		}
		navigation.setDataAttr();
		let id = e.target.getAttribute("data-anchor");
		// JQ (заменить)
		let	top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 1000);

	});

	//=====
	// первый эл
	// let firstBlock = document.getElementById('root_1');
	// // 680рх
	// let winDef = document.documentElement.clientHeight;

	// window.addEventListener('scroll', e => {
	// 	console.log(winDef);
	// 	// минус пиксели за верхний край
	// 	let scrollH = firstBlock.getBoundingClientRect().top;
	// 	console.error(scrollH);
	// 	let diff = Math.ceil(scrollH*(-1)/winDef);
	// 	console.log(diff);

	// 	if(Math.abs(diff - navigation.mainOrderValue) >= 1) {
	// 		navigation.mainOrderValue = diff;
	// 		navigation.setDataAttr();
	// 	}
	// });
	//=====

	// burger+menu
	$('.header__burger').on('click', e => {
		console.log(e);
		$('.wrapper').toggleClass("wrapper--js-active");
	});

});

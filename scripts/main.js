$(document).ready(function () {
	const topBtn = document.querySelector(".navigation__btn--top");
	const botBtn = document.querySelector(".navigation__btn--bot");
	const outPut = document.querySelector(".navigation__output");
	let mainOrderValue = 1;

	function setDataAttr(value) {
		topBtn.setAttribute("data-anchor", `#root_${value}`);
		botBtn.setAttribute("data-anchor", `#root_${value}`);

		if(value === 1) {
			topBtn.classList.add('navigation__btn--js-disable');
		} else {
			topBtn.classList.remove('navigation__btn--js-disable');
		}

		if(value === 10) {
			botBtn.classList.add('navigation__btn--js-disable');
		} else {
			botBtn.classList.remove('navigation__btn--js-disable');
		}


		outPut.innerHTML = value;
		console.log(value);
		return value;
	}

	setDataAttr(mainOrderValue);

	$("#navigation").on("click", "button", function(event) {

		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		if(event.target.classList.contains("navigation__btn--top")){
			// не гибкий примитив
			if(mainOrderValue !== 1){
				mainOrderValue--;
			}
			setDataAttr(mainOrderValue);
		}

		if(event.target.classList.contains("navigation__btn--bot")){
			// не гибкий примитив
			if(mainOrderValue !== 10){
				mainOrderValue++;
			}
			setDataAttr(mainOrderValue);
		}

		//забираем идентификатор бока с атрибута href
		let id = $(this).attr('data-anchor');

		//узнаем высоту от начала страницы до блока на который ссылается якорь
		let	top = $(id).offset().top;

		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({ scrollTop: top }, 1000);
	});

	// burger+menu
	$('.header__burger').on('click', e => {
		console.log(e);
		$('.wrapper').toggleClass("wrapper--js-active");
	});

	// slider-arrows


});

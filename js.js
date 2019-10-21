document.addEventListener('DOMContentLoaded', function() {
	var body = document.querySelector('body');
	var mobile = body.classList.contains('mobile');

	// собираем все якоря; устанавливаем время анимации и количество кадров
	const anchors = document.querySelectorAll('.js-anchor-link');

	if (anchors.length) {
		// const animationTime = 300,
		// framesCount = 20;

		anchors.forEach(function(item) {
			item.addEventListener('click', function(e) {
				const tearget = document.querySelector(`[data-anchor-id="${this.dataset.targetId}"]`) ;
				if (!tearget) { return false; };

				// let coordY = tearget.getBoundingClientRect().top + window.pageYOffset;
				// let scrollBy = coordY / framesCount;

				// let diraction = window.pageYOffset - coordY < 0 ? 1 : -1;

				// const scroller = setInterval(function() {

				// 	if(scrollBy > (window.pageYOffset - coordY) * diraction && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {

				// 	  window.scrollBy(0, scrollBy * diraction);
				// 	} else {

				// 	  window.scrollTo(0, coordY);
				// 	  clearInterval(scroller);
				// 	}
				//   // время интервала равняется частному от времени анимации и к-ва кадров
				// }, animationTime / framesCount);

				let coordY = tearget.getBoundingClientRect().top + window.pageYOffset;
				console.warn($(tearget).offset().top);
				console.log(window.pageYOffset);
				console.log(tearget.getBoundingClientRect().top);

				$('body,html').animate({
					scrollTop: coordY
				}, 1600);

				// tearget.scrollIntoView({
				// 	behavior: "smooth",
				// 	block:    "start"
				// });
			});
		});
	}

	// Tabs_base
	const tabsWrapper = document.querySelector('.js-tabs');
	// if (!tabsWrapper) { return false; };
	if (Boolean(tabsWrapper)) {
		const tabsBtnsCollection = tabsWrapper.querySelectorAll('.js-tabs-btn');
		const tabsSectionsCollection = tabsWrapper.querySelectorAll('.js-tabs-section');

		if (tabsBtnsCollection.length && tabsSectionsCollection.length) {
			tabsBtnsCollection.forEach(function(btn) {

				btn.addEventListener('click', function(event) {
					const target = this.dataset.sectionTarget;
					tabsClean();

					this.classList.add('is-active');
					tabsSectionsCollection.forEach(function(tab) {
						if(tab.dataset.sectionId == target) {
							tab.classList.add('is-active');
						}
					});
				});

			});
		}

		function tabsClean() {
			tabsBtnsCollection.forEach((el)=>{
				el.classList.remove('is-active');
			});
			tabsSectionsCollection.forEach((el)=>{
				el.classList.remove('is-active');
			});
		}
	}

	// titles
	const headerCollection = document.querySelectorAll('.js-header');
	if (headerCollection.length) {
		// Объявление хранилищ данных
		let collection = [],
			windowPosition = {
				top: window.pageYOffset,
				bottom: window.pageYOffset + document.documentElement.clientHeight
			};

		// создать и сохранить объекты заголовков
		headerCollection.forEach(function(elem) {
			// let output = document.createElement('div');
			// output.classList.add('js-header-output');
			// elem.appendChild(output);

			collection.push({
				name: elem,
				top: window.pageYOffset + elem.getBoundingClientRect().top,
				bottom: window.pageYOffset + elem.getBoundingClientRect().bottom,
				// строка заголовка
				txt: elem.innerText
				// обертка для вывода
				// ,out: output
			});

			// очистка для последующего заполнения
			elem.innerText = '';
		});

		console.log(collection);

		// провесить обработчик
		window.addEventListener('scroll', scrolHandler);

		// триггер проверки до первого скролла
		isElementInView();

		function scrolHandler() {
			// обновить координаты
			windowPosition = {
				top: window.pageYOffset,
				bottom: window.pageYOffset + document.documentElement.clientHeight
			};

			// проверка
			isElementInView();
		}

		// элемен попал в область видимости
		function isElementInView() {

			collection.forEach(function(elem, index) {
				elem.top = window.pageYOffset + elem.name.getBoundingClientRect().top;
				elem.bottom = window.pageYOffset + elem.name.getBoundingClientRect().bottom;

				if (elem.bottom > windowPosition.top && elem.top < windowPosition.bottom) {
					// запуск анимации
					headerAnimate(elem);

					// очистка хранилища
					update(index);
				}
			});

		}

		// чек состояния для удаления слушателя
		function update(index) {
			collection.splice(index, 1);

			if (!collection.length) {
				window.removeEventListener('scroll', scrolHandler);
			}
		}

		// анимация заголовка
		function headerAnimate(currentHeader) {
			// let strArr = currentHeader.txt.split('');

			// strArr.forEach((symbol) => {
			// 	currentHeader.name.innerText
			// 	console.info(el);
			// });

			let str = currentHeader.txt,
				len = currentHeader.txt.length,
				delay = 70,
				coin = 0;


			function show() {
				currentHeader.name.innerHTML += str.substr(coin, 1);
				coin++;

				if (coin < len) {
					setTimeout(show ,delay);
				}
			}

			show();
		}
	}


	if (!mobile) {

	} else {

	}


});

/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
var sections = document.querySelectorAll('section');
var timer = null;
/**
 * End Global Variables
 * Start Functions
 *
 */
const updateSec = () => {
	sections = document.querySelectorAll('section');
};

const addClickEl = (element) => {
	element.addEventListener('click', (evt) => {
		if (evt.target.nodeName === 'LI') {
			const viewSection = document.querySelector(`[data-nav='${evt.target.id}']`);
			viewSection.scrollIntoView(false);
		}
	});
};

const addNavBar = () => {
	let parent = document.getElementById('navbar__list');
	let lis = document.createDocumentFragment();
	sections.forEach((sec) => {
		if (!document.getElementById(sec.dataset.nav)) {
			const newElement = document.createElement('li');
			newElement.id = sec.dataset.nav;
			newElement.innerText = sec.dataset.nav;
			newElement.className = 'menu__link';
			lis.appendChild(newElement);
		}
	});
	parent.appendChild(lis);
};
const addBtnEl = () => {
	let btn = document.getElementById('addsection');
	btn.addEventListener('click', () => {
		let parent = document.querySelector('main');
		let newElement = document.createElement('section');
		newElement.id = 'section' + (sections.length + 1);
		newElement.dataset.nav = 'section ' + (sections.length + 1);
		newElement.innerHTML = `<div class="landing__container">
        <h2>Section ${sections.length + 1}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>`;
		parent.appendChild(newElement);
		updateSec();
		addNavBar();
	});
};

const isInViewPort = (element) => {
	let bound = element.getBoundingClientRect();
	return bound.top < window.innerHeight && bound.bottom >= window.innerHeight;
};

const setNavActive = (ele) => {
	ele.classList.add('active');
};
const cancelNvaActive = (ele) => {
	ele.classList.remove('active');
};
// Add class 'active' to section when near top of viewport
const setSectionActive = () => {
	sections.forEach((sec) => {
		let navEle = document.getElementById(`${sec.dataset.nav}`);
		sec.classList.remove('your-active-class');
		cancelNvaActive(navEle);
		if (isInViewPort(sec)) {
			sec.classList.add('your-active-class');
			setNavActive(navEle);
		}
	});
};

window.addEventListener('scroll', (evt) => {
	let headerNav = document.querySelector('.page__header');
	headerNav.style.display = 'initial';
	if (timer !== null) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		headerNav.style.display = 'none';
		setSectionActive();
	}, 500);
});
/**
 * End Functions
 *
 *
 */

/**
 * End Functions
 * call functions
 *
 */
addNavBar();
addBtnEl();

addClickEl(document.querySelector('#navbar__list'));

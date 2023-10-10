const reviewWrap = document.getElementById("reviewWrap");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const imgDiv = document.getElementById("imgDiv");
const personName = document.getElementById("personName");
const description = document.getElementById("description");
const sections = document.querySelector('.sections');
const sectionsFix = document.querySelector('.sections-fix');
const servicesCards = document.querySelectorAll('.services-card');
const openMenu = document.querySelector("#openMenu");
const closeMenu = document.querySelector("#closeMenu");


let isChickenVisible;

let people = [
	{
		photo:
			'url("https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843_960_720.jpg")',
		name: "Susan Smith",
		
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt metus eget malesuada dictum. Etiam dolor mauris, scelerisque ac felis non, blandit aliquam lectus. Donec sit amet aliquet nulla. Nunc dapibus facilisis erat in euismod. Curabitur posuere placerat rhoncus. Curabitur dictum, odio nec tincidunt posuere, augue elit feugiat ante, ac gravida metus dolor vel nulla. Vestibulum vel dapibus ante. Aliquam cursus erat quis neque interdum, eget eleifend dolor ornare."
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2019/02/11/20/20/woman-3990680_960_720.jpg')",
		name: "Anna Grey",
		
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt metus eget malesuada dictum. Etiam dolor mauris, scelerisque ac felis non, blandit aliquam lectus. Donec sit amet aliquet nulla. Nunc dapibus facilisis erat in euismod. Curabitur posuere placerat rhoncus. Curabitur dictum, odio nec tincidunt posuere, augue elit feugiat ante, ac gravida metus dolor vel nulla. Vestibulum vel dapibus ante. Aliquam cursus erat quis neque interdum, eget eleifend dolor ornare."
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg')",
		name: "Branson Cook",
		
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt metus eget malesuada dictum. Etiam dolor mauris, scelerisque ac felis non, blandit aliquam lectus. Donec sit amet aliquet nulla. Nunc dapibus facilisis erat in euismod. Curabitur posuere placerat rhoncus. Curabitur dictum, odio nec tincidunt posuere, augue elit feugiat ante, ac gravida metus dolor vel nulla. Vestibulum vel dapibus ante."
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2014/10/30/17/32/boy-509488_960_720.jpg')",
		name: "Julius Grohn",
		
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt metus eget malesuada dictum. Etiam dolor mauris, scelerisque ac felis non, blandit aliquam lectus. Donec sit amet aliquet nulla. Nunc dapibus facilisis erat in euismod. Curabitur posuere placerat rhoncus. Curabitur dictum, odio nec tincidunt posuere, augue elit feugiat ante, ac gravida metus dolor vel nulla. Vestibulum vel dapibus ante. Aliquam cursus erat quis neque interdum, eget eleifend dolor ornare."
	}
];

imgDiv.style.backgroundImage = people[0].photo;
personName.innerText = people[0].name;
description.innerText = people[0].description;
let currentPerson = 0;



//Funcion para pasar el slide de las rewiews
function slide(whichSide, personNumber) {
	let reviewWrapWidth = reviewWrap.offsetWidth + "px";
	let descriptionHeight = description.offsetHeight + "px";
	let side1symbol = whichSide === "left" ? "" : "-";
	let side2symbol = whichSide === "left" ? "-" : "";

	let tl = gsap.timeline();

	if (isChickenVisible) {
		tl.to(chicken, {
			duration: 0.4,
			opacity: 0
		});
	}

	tl.to(reviewWrap, {
		duration: 0.4,
		opacity: 0,
		translateX: `${side1symbol + reviewWrapWidth}`
	});

	tl.to(reviewWrap, {
		duration: 0,
		translateX: `${side2symbol + reviewWrapWidth}`
	});

	setTimeout(() => {
		imgDiv.style.backgroundImage = people[personNumber].photo;
	}, 400);
	setTimeout(() => {
		description.style.height = descriptionHeight;
	}, 400);
	setTimeout(() => {
		personName.innerText = people[personNumber].name;
	}, 400);
	setTimeout(() => {
		description.innerText = people[personNumber].description;
	}, 400);

	tl.to(reviewWrap, {
		duration: 0.4,
		opacity: 1,
		translateX: 0
	});


}

function setNextCardLeft() {
	if (currentPerson === 3) {
		currentPerson = 0;
		slide("left", currentPerson);
	} else {
		currentPerson++;
	}

	slide("left", currentPerson);
}

function setNextCardRight() {
	if (currentPerson === 0) {
		currentPerson = 3;
		slide("right", currentPerson);
	} else {
		currentPerson--;
	}

	slide("right", currentPerson);
}

// Función para verificar si el elemento está en el campo de visión
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para controlar la aparición del menu fijo
function handleScrollMenu() {
    if (isInViewport(sections)) {
        // Si .sections está visible, oculta .sections-fix
		sectionsFix.classList.remove('visible');
		
        
    } else {
        // Si .sections no está visible, muestra .sections-fix
        sectionsFix.classList.add('visible');
    }
}

// Función para controlar la animación de las tarjetas del apartado secciones
function handleScrollCard() {
    servicesCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            // La tarjeta es visible en la pantalla
            card.classList.add('visible');
        } else {
            // La tarjeta ya no es visible en la pantalla
			card.classList.remove('visible');
            
        }
    });
}

// Función para manejar el clic en los elementos 'a' de 'sections'
function handleSectionClick(event) {
    // Verifica si el elemento clicado es un 'a' dentro de 'sections'
    if (event && event.target.tagName === 'A') {
        // Elimina la clase 'visible-mobile' de 'sectionsFix'
        sectionsFix.classList.remove('visible-mobile');
    }
}



window.addEventListener("resize", () => {
	description.style.height = "100%";
});

//Funcion para abrir el menu de hamburguesa en mobile
openMenu.addEventListener("click", () => {
	sectionsFix.classList.add("visible-mobile");
})
//Funcion para cerrar el menu de hamburguesa en mobile
closeMenu.addEventListener("click", () => {
	sectionsFix.classList.remove("visible-mobile");
	
})

sectionsFix.addEventListener('click', handleSectionClick);
window.addEventListener('scroll', handleScrollMenu);
window.addEventListener('scroll', handleScrollCard);
leftArrow.addEventListener("click", setNextCardLeft);
rightArrow.addEventListener("click", setNextCardRight);




handleScrollMenu();
handleScrollCard();
handleSectionClick();




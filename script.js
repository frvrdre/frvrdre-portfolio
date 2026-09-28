
let clickCount = 0;


const chaosBtn = document.getElementById("chaos-btn");
const returnBtn = document.getElementById("return-btn");
const achievementPop = document.getElementById("achievement");
const pingAudio = document.getElementById("ping");

chaosBtn.addEventListener("click", clickChaos);

// ACHIEVEMENT

function clickChaos() {
  clickCount++;

  if (clickCount > 2) {
   
  

    achievementPop.classList.remove("hidden");
    achievementPop.classList.add("fade-in");
    achievementPop.classList.add("shake");

    pingAudio.volume = 0.3;
    pingAudio.play();

    setTimeout(notiRemove, 2000);
  }
}

function notiRemove() {
  achievementPop.classList.add("fade-out");

  achievementPop.classList.remove("shake");

  setTimeout(() => {
    achievementPop.classList.add("hidden");
  }, 3200);
}



const projectsCarousel = document.getElementById("projects-carousel");

const projectsPrevBtn = document.getElementById("projects-prev");

const projectsNextBtn = document.getElementById("projects-next");


// GET PROJECT CARD SCROLL DISTANCE

function getProjectScrollAmount() {
  const projectCard = projectsCarousel.querySelector(".project-card");

  const carouselStyles = getComputedStyle(projectsCarousel);

  const gap = parseFloat(carouselStyles.gap);

  return projectCard.offsetWidth + gap;
}


// CAROUSEL  SCROLL 

function scrollProjectsLeft() {
  projectsCarousel.scrollBy({
    left: -getProjectScrollAmount(),

    behavior: "smooth",
  });
}



function scrollProjectsRight() {
  projectsCarousel.scrollBy({
    left: getProjectScrollAmount(),

    behavior: "smooth",
  });
}


// UPDATE CAROUSEL BUTTONS

function updateCarouselButtons() {
  const atStart = projectsCarousel.scrollLeft <= 5;

  const atEnd =
    projectsCarousel.scrollLeft + projectsCarousel.clientWidth >=
    projectsCarousel.scrollWidth - 5;

  projectsPrevBtn.disabled = atStart;

  projectsNextBtn.disabled = atEnd;
}


// CAROUSEL EVENT LISTENERS

projectsPrevBtn.addEventListener(
  "click",
  scrollProjectsLeft
);

projectsNextBtn.addEventListener(
  "click",
  scrollProjectsRight
);

projectsCarousel.addEventListener(
  "scroll",
  updateCarouselButtons
);

window.addEventListener(
  "resize",
  updateCarouselButtons
);



updateCarouselButtons();


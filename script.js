let clickCount = 0;
let hideTimer;

const chaosBtn = document.getElementById("chaos-btn");
const achievementPop = document.getElementById("achievement");
const pingAudio = document.getElementById("ping");

chaosBtn.addEventListener("click", clickChaos);

function clickChaos() {
  clickCount++;

  if (clickCount < 3) return;

  clearTimeout(hideTimer);

  achievementPop.classList.remove("hidden", "fade-in", "fade-out", "shake");
  void achievementPop.offsetWidth;
  achievementPop.classList.add("fade-in", "shake");

  pingAudio.currentTime = 0;
  pingAudio.volume = 0.3;
  pingAudio.play().catch(() => {});

  hideTimer = setTimeout(notiRemove, 2000);
}

function notiRemove() {
  achievementPop.classList.remove("fade-in", "shake");
  achievementPop.classList.add("fade-out");

  achievementPop.addEventListener(
    "animationend",
    () => achievementPop.classList.add("hidden"),
    { once: true }
  );
}

const projectsCarousel = document.getElementById("projects-carousel");
const projectsPrevBtn = document.getElementById("projects-prev");
const projectsNextBtn = document.getElementById("projects-next");

function getProjectScrollAmount() {
  const projectCard = projectsCarousel.querySelector(".project-card");
  const gap = parseFloat(getComputedStyle(projectsCarousel).gap);

  return projectCard.offsetWidth + gap;
}

function scrollProjects(direction) {
  projectsCarousel.scrollBy({
    left: direction * getProjectScrollAmount(),
    behavior: "smooth",
  });
}

function updateCarouselButtons() {
  const atStart = projectsCarousel.scrollLeft <= 5;
  const atEnd =
    projectsCarousel.scrollLeft + projectsCarousel.clientWidth >=
    projectsCarousel.scrollWidth - 5;

  projectsPrevBtn.disabled = atStart;
  projectsNextBtn.disabled = atEnd;
}

projectsPrevBtn.addEventListener("click", () => scrollProjects(-1));
projectsNextBtn.addEventListener("click", () => scrollProjects(1));
projectsCarousel.addEventListener("scroll", updateCarouselButtons);
window.addEventListener("resize", updateCarouselButtons);

updateCarouselButtons();
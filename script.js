const audio = document.getElementById("galaMusic");
const audioBtn = document.getElementById("audioBtn");
const audioBtnMobile = document.getElementById("audioBtnMobile");
const audioBtnCard = document.getElementById("audioBtnCard");
const audioIcon = document.getElementById("audioIcon");
const audioIconCard = document.getElementById("audioIconCard");
const audioLabel = document.getElementById("audioLabel");
const waveform = document.getElementById("waveform");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initScrollReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (!revealItems.length) return;

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -5% 0px",
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 320)}ms`;
    revealObserver.observe(item);
  });
}

function initParallax() {
  const parallaxItems = document.querySelectorAll(".js-parallax");
  if (!parallaxItems.length || prefersReducedMotion) return;

  let rafId = null;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  const updateParallax = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const nx = (pointerX - centerX) / centerX;
    const ny = (pointerY - centerY) / centerY;

    parallaxItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 8);
      const tx = nx * depth;
      const ty = ny * depth;
      item.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });

    rafId = null;
  };

  const onPointerMove = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (rafId === null) rafId = requestAnimationFrame(updateParallax);
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
}

function setPlayingState(playing) {
  document.body.classList.toggle("music-playing", playing);

  if (playing) {
    if (audioIcon) audioIcon.textContent = "volume_up";
    if (audioLabel) audioLabel.textContent = "Playing";
    if (audioBtnMobile) audioBtnMobile.textContent = "volume_up";
    if (audioIconCard) audioIconCard.textContent = "pause";
    if (audioBtn) {
      audioBtn.classList.add("bg-primary", "text-black");
      audioBtn.classList.remove("bg-primary/10", "text-[#705900]");
    }
    if (waveform) waveform.classList.add("playing");
  } else {
    if (audioIcon) audioIcon.textContent = "volume_off";
    if (audioLabel) audioLabel.textContent = "Music";
    if (audioBtnMobile) audioBtnMobile.textContent = "volume_off";
    if (audioIconCard) audioIconCard.textContent = "play_arrow";
    if (audioBtn) {
      audioBtn.classList.remove("bg-primary", "text-black");
      audioBtn.classList.add("bg-primary/10", "text-[#705900]");
    }
    if (waveform) waveform.classList.remove("playing");
  }
}

function toggleAudio() {
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    setPlayingState(true);
  } else {
    audio.pause();
    setPlayingState(false);
  }
}

const audioRestartBtn = document.getElementById("audioRestartBtn");
const progressBar = document.getElementById("progressBar");
const progressTrack = document.getElementById("progressTrack");
const audioCurrentTime = document.getElementById("audioCurrentTime");
const audioDuration = document.getElementById("audioDuration");

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ":" + String(sec).padStart(2, "0");
}

if (audio) {
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    if (progressBar) progressBar.style.width = pct + "%";
    if (audioCurrentTime) audioCurrentTime.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("loadedmetadata", () => {
    if (audioDuration) audioDuration.textContent = formatTime(audio.duration);
  });
}

if (progressTrack && audio) {
  progressTrack.addEventListener("click", (e) => {
    if (!audio.duration) return;
    const rect = progressTrack.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  });
}

if (audioRestartBtn && audio) {
  audioRestartBtn.addEventListener("click", () => {
    audio.currentTime = 0;
    if (audio.paused) {
      audio.play();
      setPlayingState(true);
    }
  });
}

if (audioBtn) audioBtn.addEventListener("click", toggleAudio);
if (audioBtnMobile) audioBtnMobile.addEventListener("click", toggleAudio);
if (audioBtnCard) audioBtnCard.addEventListener("click", toggleAudio);
initScrollReveal();
initParallax();

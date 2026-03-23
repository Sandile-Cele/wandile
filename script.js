const audio = document.getElementById("galaMusic");
const audioBtn = document.getElementById("audioBtn");
const audioBtnMobile = document.getElementById("audioBtnMobile");
const audioIconMobile = document.getElementById("audioIconMobile");
const audioBtnCard = document.getElementById("audioBtnCard");
const audioIcon = document.getElementById("audioIcon");
const audioIconCard = document.getElementById("audioIconCard");
const audioLabel = document.getElementById("audioLabel");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenuIcon = document.getElementById("mobileMenuIcon");
const mobileMenuPanel = document.getElementById("mobileMenuPanel");
const mobileMenuLinks = document.querySelectorAll("[data-mobile-menu-link]");
const waveform = document.getElementById("waveform");
const firstVenueCard = document.querySelector("[data-first-venue-card]");
const firstVenueDirections = document.querySelector("[data-first-venue-directions]");
const firstVenueModal = document.getElementById("firstVenueModal");
const firstVenueModalClose = document.getElementById("firstVenueModalClose");
const firstVenueModalBackdrop = document.getElementById("firstVenueModalBackdrop");
const secondVenueCard = document.querySelector("[data-second-venue-card]");
const secondVenueDirections = document.querySelector("[data-second-venue-directions]");
const secondVenueModal = document.getElementById("secondVenueModal");
const secondVenueModalClose = document.getElementById("secondVenueModalClose");
const secondVenueModalBackdrop = document.getElementById("secondVenueModalBackdrop");
const rsvpCard = document.querySelector("[data-rsvp-card]");
const rsvpModal = document.getElementById("rsvpModal");
const rsvpModalClose = document.getElementById("rsvpModalClose");
const floatingRsvpBtn = document.getElementById("floatingRsvpBtn");
const reserveGiftCard = document.querySelector("[data-reserve-gift-card]");
const reserveGiftModal = document.getElementById("reserveGiftModal");
const reserveGiftModalClose = document.getElementById("reserveGiftModalClose");

function refreshIframesOnLoad() {
  const refreshableIframes = document.querySelectorAll('[data-refresh-on-load="true"]');
  if (!refreshableIframes.length) return;

  const cacheBust = Date.now().toString();

  refreshableIframes.forEach((iframe) => {
    const src = iframe.getAttribute("src");
    if (!src) return;

    try {
      const url = new URL(src, window.location.href);
      url.searchParams.set("_cb", cacheBust);
      iframe.src = url.toString();
    } catch {
      const separator = src.includes("?") ? "&" : "?";
      iframe.src = `${src}${separator}_cb=${cacheBust}`;
    }
  });
}

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

function syncBodyScrollLock() {
  const hasOpenModal = [
    firstVenueModal,
    secondVenueModal,
    rsvpModal,
    reserveGiftModal,
  ].some(
    (modal) => modal && !modal.classList.contains("hidden")
  );
  document.body.classList.toggle("overflow-hidden", hasOpenModal);
}

function closeMobileMenu() {
  if (!mobileMenuPanel || !mobileMenuBtn) return;
  mobileMenuPanel.classList.remove("flex");
  mobileMenuPanel.classList.add("hidden");
  mobileMenuBtn.setAttribute("aria-expanded", "false");
  if (mobileMenuIcon) mobileMenuIcon.textContent = "menu";
}

function openMobileMenu() {
  if (!mobileMenuPanel || !mobileMenuBtn) return;
  mobileMenuPanel.classList.remove("hidden");
  mobileMenuPanel.classList.add("flex");
  mobileMenuBtn.setAttribute("aria-expanded", "true");
  if (mobileMenuIcon) mobileMenuIcon.textContent = "close";
}

function toggleMobileMenu() {
  if (!mobileMenuPanel) return;
  if (mobileMenuPanel.classList.contains("hidden")) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}

function openFirstVenueModal() {
  if (!firstVenueModal) return;
  closeSecondVenueModal();
  closeRsvpModal();
  closeReserveGiftModal();
  firstVenueModal.classList.remove("hidden");
  firstVenueModal.classList.add("flex");
  firstVenueModal.setAttribute("aria-hidden", "false");
  syncBodyScrollLock();
}

function closeFirstVenueModal() {
  if (!firstVenueModal) return;
  firstVenueModal.classList.remove("flex");
  firstVenueModal.classList.add("hidden");
  firstVenueModal.setAttribute("aria-hidden", "true");
  syncBodyScrollLock();
}

function openSecondVenueModal() {
  if (!secondVenueModal) return;
  closeFirstVenueModal();
  closeRsvpModal();
  closeReserveGiftModal();
  secondVenueModal.classList.remove("hidden");
  secondVenueModal.classList.add("flex");
  secondVenueModal.setAttribute("aria-hidden", "false");
  syncBodyScrollLock();
}

function closeSecondVenueModal() {
  if (!secondVenueModal) return;
  secondVenueModal.classList.remove("flex");
  secondVenueModal.classList.add("hidden");
  secondVenueModal.setAttribute("aria-hidden", "true");
  syncBodyScrollLock();
}

function openRsvpModal() {
  if (!rsvpModal) return;
  closeFirstVenueModal();
  closeSecondVenueModal();
  closeReserveGiftModal();
  rsvpModal.classList.remove("hidden");
  rsvpModal.classList.add("block");
  rsvpModal.setAttribute("aria-hidden", "false");
  syncBodyScrollLock();
}

function closeRsvpModal() {
  if (!rsvpModal) return;
  rsvpModal.classList.remove("block");
  rsvpModal.classList.add("hidden");
  rsvpModal.setAttribute("aria-hidden", "true");
  syncBodyScrollLock();
}

function openReserveGiftModal() {
  if (!reserveGiftModal) return;
  closeFirstVenueModal();
  closeSecondVenueModal();
  closeRsvpModal();
  reserveGiftModal.classList.remove("hidden");
  reserveGiftModal.classList.add("block");
  reserveGiftModal.setAttribute("aria-hidden", "false");
  syncBodyScrollLock();
}

function closeReserveGiftModal() {
  if (!reserveGiftModal) return;
  reserveGiftModal.classList.remove("block");
  reserveGiftModal.classList.add("hidden");
  reserveGiftModal.setAttribute("aria-hidden", "true");
  syncBodyScrollLock();
}

function setPlayingState(playing) {
  document.body.classList.toggle("music-playing", playing);

  if (playing) {
    if (audioIcon) audioIcon.textContent = "volume_up";
    if (audioLabel) audioLabel.textContent = "Playing";
    if (audioIconMobile) audioIconMobile.textContent = "volume_up";
    else if (audioBtnMobile) audioBtnMobile.textContent = "volume_up";
    if (audioIconCard) audioIconCard.textContent = "pause";
    if (audioBtn) {
      audioBtn.classList.add("bg-primary", "text-black");
      audioBtn.classList.remove("bg-primary/10", "text-[#705900]");
    }
    if (waveform) waveform.classList.add("playing");
  } else {
    if (audioIcon) audioIcon.textContent = "volume_off";
    if (audioLabel) audioLabel.textContent = "Music";
    if (audioIconMobile) audioIconMobile.textContent = "volume_off";
    else if (audioBtnMobile) audioBtnMobile.textContent = "volume_off";
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

if (mobileMenuBtn && mobileMenuPanel) {
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
}

if (mobileMenuLinks.length) {
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMobileMenu();
});

if (firstVenueCard && firstVenueModal) {
  firstVenueCard.addEventListener("click", (event) => {
    // Keep native behavior for nested controls like links.
    if (event.target.closest("a, button")) return;
    openFirstVenueModal();
  });

  firstVenueCard.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openFirstVenueModal();
  });
}

if (secondVenueCard && secondVenueModal) {
  secondVenueCard.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    openSecondVenueModal();
  });

  secondVenueCard.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openSecondVenueModal();
  });
}

if (rsvpCard && rsvpModal) {
  rsvpCard.addEventListener("click", () => {
    openRsvpModal();
  });

  rsvpCard.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openRsvpModal();
  });
}

if (floatingRsvpBtn && rsvpModal) {
  floatingRsvpBtn.addEventListener("click", () => {
    openRsvpModal();
  });
}

if (reserveGiftCard && reserveGiftModal) {
  reserveGiftCard.addEventListener("click", () => {
    openReserveGiftModal();
  });

  reserveGiftCard.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openReserveGiftModal();
  });
}

if (firstVenueModalClose) {
  firstVenueModalClose.addEventListener("click", closeFirstVenueModal);
}

if (firstVenueModalBackdrop) {
  firstVenueModalBackdrop.addEventListener("click", closeFirstVenueModal);
}

if (secondVenueModalClose) {
  secondVenueModalClose.addEventListener("click", closeSecondVenueModal);
}

if (secondVenueModalBackdrop) {
  secondVenueModalBackdrop.addEventListener("click", closeSecondVenueModal);
}

if (rsvpModalClose) {
  rsvpModalClose.addEventListener("click", closeRsvpModal);
}

if (reserveGiftModalClose) {
  reserveGiftModalClose.addEventListener("click", closeReserveGiftModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMobileMenu();
  closeFirstVenueModal();
  closeSecondVenueModal();
  closeRsvpModal();
  closeReserveGiftModal();
});

refreshIframesOnLoad();

window.addEventListener("pageshow", (event) => {
  if (event.persisted) refreshIframesOnLoad();
});

if (firstVenueDirections) {
  firstVenueDirections.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

if (secondVenueDirections) {
  secondVenueDirections.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

initScrollReveal();
initParallax();

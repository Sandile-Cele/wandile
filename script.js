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
const reserveGiftForm = document.getElementById("reserveGiftForm");
const reserveGiftNameInput = document.getElementById("reserveGiftName");
const reserveGiftNoSelect = document.getElementById("reserveGiftNo");
const reserveGiftSubmit = document.getElementById("reserveGiftSubmit");
const reserveGiftFormMessage = document.getElementById("reserveGiftFormMessage");
const reserveGiftTableBody = document.getElementById("reserveGiftTableBody");
const reserveGiftRefreshBtn = document.getElementById("reserveGiftRefreshBtn");
const reserveGiftLastUpdated = document.getElementById("reserveGiftLastUpdated");
const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");
const countdownStatus = document.getElementById("countdownStatus");
const scrollProgressFill = document.getElementById("scrollProgressFill");
const goodVibesButton = document.querySelector("[data-good-vibes-btn]");
const cakeImage = document.querySelector("[data-cake-image]");

const eventDate = new Date(2026, 5, 14, 0, 0, 0);

const reserveGiftApiUrl = "https://script.google.com/macros/s/AKfycbyTECRMZDarBKfQOQU4yoBBEklGoI6z_aIS2UiUFtyUfpZMVAmTg-1FjvYS9VybPbS2/exec";

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
      
      // Force a reload of the original source if cached bypass hasn't triggered
      // by temporarily resetting it
      const newUrl = url.toString();
      iframe.removeAttribute('src');
      setTimeout(() => {
        iframe.setAttribute('src', newUrl);
      }, 50);
    } catch {
      const separator = src.includes("?") ? "&" : "?";
      iframe.src = `${src}${separator}_cb=${cacheBust}`;
    }
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initBackgroundEffects() {
  const effectsRoot = document.getElementById("bgEffects");
  if (!effectsRoot || prefersReducedMotion) return;

  const maxStars = 3;
  let activeStars = 0;
  let timerId = null;

  function spawnShootingStar() {
    if (!effectsRoot.isConnected || document.hidden) return;
    if (activeStars >= maxStars) return;

    const star = document.createElement("span");
    star.className = "shooting-star";

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const travelX = 110 + Math.random() * 210;
    const travelY = 36 + Math.random() * 110;
    const duration = 900 + Math.random() * 1450;
    const length = 40 + Math.random() * 95;
    const thickness = 1.4 + Math.random() * 2.2;
    const angle = -22 + Math.random() * 9;

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.setProperty("--travel-x", `${travelX}px`);
    star.style.setProperty("--travel-y", `${travelY}px`);
    star.style.setProperty("--star-duration", `${Math.round(duration)}ms`);
    star.style.setProperty("--star-length", `${Math.round(length)}px`);
    star.style.setProperty("--star-thickness", `${thickness.toFixed(2)}px`);
    star.style.setProperty("--star-angle", `${angle.toFixed(2)}deg`);

    activeStars += 1;
    star.addEventListener("animationend", () => {
      activeStars = Math.max(0, activeStars - 1);
      star.remove();
    });

    effectsRoot.appendChild(star);
  }

  function queueNextSpawn() {
    if (timerId) window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      spawnShootingStar();
      queueNextSpawn();
    }, 480 + Math.random() * 2080);
  }

  queueNextSpawn();
  window.addEventListener("beforeunload", () => {
    if (timerId) window.clearTimeout(timerId);
  });

  // Start with a few immediate stars so the background feels alive on load.
  window.setTimeout(spawnShootingStar, 120);
  window.setTimeout(spawnShootingStar, 460);
}

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

function initScrollEffects() {
  if (prefersReducedMotion) return;

  let rafId = null;

  const updateScrollEffects = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollMax = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = Math.min(1, scrollTop / scrollMax);

    doc.style.setProperty("--scroll-progress", progress.toFixed(4));
    doc.style.setProperty("--scroll-glow-y", `${(22 + progress * 48).toFixed(2)}%`);
    doc.style.setProperty("--scroll-glow-opacity", (0.2 + progress * 0.28).toFixed(3));

    if (scrollProgressFill) {
      scrollProgressFill.style.opacity = `${(0.65 + progress * 0.35).toFixed(3)}`;
    }

    rafId = null;
  };

  const queueUpdate = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(updateScrollEffects);
  };

  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  updateScrollEffects();
}

function spawnGoodVibesConfetti() {
  if (prefersReducedMotion || !goodVibesButton) return;

  const burstRoot = document.getElementById("bgEffects") || document.body;
  const rect = goodVibesButton.getBoundingClientRect();
  const originX = rect.left + rect.width * 0.5;
  const originY = rect.top + rect.height * 0.35;
  const particles = 20;

  for (let i = 0; i < particles; i += 1) {
    const particle = document.createElement("span");
    particle.className = "mini-confetti";

    const angle = (Math.PI * 2 * i) / particles + (Math.random() * 0.52 - 0.26);
    const distance = 38 + Math.random() * 88;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - (28 + Math.random() * 36);
    const rotation = -240 + Math.random() * 480;
    const hue = 36 + Math.random() * 26;
    const size = 5 + Math.random() * 8;
    const duration = 620 + Math.random() * 560;

    particle.style.left = `${originX.toFixed(1)}px`;
    particle.style.top = `${originY.toFixed(1)}px`;
    particle.style.setProperty("--confetti-x", `${x.toFixed(1)}px`);
    particle.style.setProperty("--confetti-y", `${y.toFixed(1)}px`);
    particle.style.setProperty("--confetti-rot", `${rotation.toFixed(1)}deg`);
    particle.style.setProperty("--confetti-hue", `${hue.toFixed(1)}`);
    particle.style.setProperty("--confetti-size", `${size.toFixed(1)}px`);
    particle.style.setProperty("--confetti-duration", `${Math.round(duration)}ms`);

    particle.addEventListener("animationend", () => {
      particle.remove();
    });

    burstRoot.appendChild(particle);
  }
}

function spawnCakeSnackBurst() {
  if (!cakeImage) return;

  const burstRoot = document.getElementById("bgEffects") || document.body;
  const rect = cakeImage.getBoundingClientRect();
  const originX = rect.left + rect.width * 0.7;
  const originY = rect.top + rect.height * 0.28;

  // Retrigger chomp animation on repeated clicks.
  cakeImage.classList.remove("is-cake-chomp");
  // eslint-disable-next-line no-unused-expressions
  cakeImage.offsetWidth;
  cakeImage.classList.add("is-cake-chomp");

  if (prefersReducedMotion) return;

  const crumbCount = 16;
  for (let i = 0; i < crumbCount; i += 1) {
    const crumb = document.createElement("span");
    crumb.className = "cake-crumb";

    const angle = (Math.PI * 1.22 * i) / crumbCount + (Math.random() * 0.5 - 0.25);
    const distance = 24 + Math.random() * 76;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - (12 + Math.random() * 44);
    const size = 5 + Math.random() * 7;
    const duration = 520 + Math.random() * 520;

    crumb.style.left = `${originX.toFixed(1)}px`;
    crumb.style.top = `${originY.toFixed(1)}px`;
    crumb.style.setProperty("--crumb-x", `${x.toFixed(1)}px`);
    crumb.style.setProperty("--crumb-y", `${y.toFixed(1)}px`);
    crumb.style.setProperty("--crumb-size", `${size.toFixed(1)}px`);
    crumb.style.setProperty("--crumb-duration", `${Math.round(duration)}ms`);

    crumb.addEventListener("animationend", () => {
      crumb.remove();
    });

    burstRoot.appendChild(crumb);
  }

  const nomCount = 4;
  for (let i = 0; i < nomCount; i += 1) {
    const nom = document.createElement("span");
    nom.className = "cake-nom";
    nom.textContent = "NOM";

    const x = -34 + Math.random() * 78;
    const y = -44 - Math.random() * 66;
    const rot = -20 + Math.random() * 40;
    const duration = 620 + Math.random() * 520;

    nom.style.left = `${(originX - 10 + Math.random() * 20).toFixed(1)}px`;
    nom.style.top = `${(originY - 8 + Math.random() * 18).toFixed(1)}px`;
    nom.style.setProperty("--nom-x", `${x.toFixed(1)}px`);
    nom.style.setProperty("--nom-y", `${y.toFixed(1)}px`);
    nom.style.setProperty("--nom-rot", `${rot.toFixed(1)}deg`);
    nom.style.setProperty("--nom-duration", `${Math.round(duration)}ms`);

    nom.addEventListener("animationend", () => {
      nom.remove();
    });

    burstRoot.appendChild(nom);
  }
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

function padCountdownValue(value, width = 2) {
  return String(Math.max(0, value)).padStart(width, "0");
}

function updateCountdown() {
  if (!countdownDays || !countdownHours || !countdownMinutes || !countdownSeconds) {
    return;
  }

  const now = new Date();
  const delta = eventDate.getTime() - now.getTime();

  if (delta <= 0) {
    countdownDays.textContent = "000";
    countdownHours.textContent = "00";
    countdownMinutes.textContent = "00";
    countdownSeconds.textContent = "00";
    if (countdownStatus) countdownStatus.textContent = "It is celebration day";
    return;
  }

  const totalSeconds = Math.floor(delta / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownDays.textContent = padCountdownValue(days, 3);
  countdownHours.textContent = padCountdownValue(hours);
  countdownMinutes.textContent = padCountdownValue(minutes);
  countdownSeconds.textContent = padCountdownValue(seconds);
  if (countdownStatus) countdownStatus.textContent = "Counting down";
}

function setReserveGiftMessage(message, tone = "muted") {
  if (!reserveGiftFormMessage) return;

  reserveGiftFormMessage.textContent = message;
  reserveGiftFormMessage.classList.remove("text-zinc-400", "text-green-400", "text-red-400", "text-primary");

  if (tone === "success") {
    reserveGiftFormMessage.classList.add("text-green-400");
    return;
  }

  if (tone === "error") {
    reserveGiftFormMessage.classList.add("text-red-400");
    return;
  }

  if (tone === "info") {
    reserveGiftFormMessage.classList.add("text-primary");
    return;
  }

  reserveGiftFormMessage.classList.add("text-zinc-400");
}

function setReserveGiftFormPending(isPending) {
  if (reserveGiftSubmit) reserveGiftSubmit.disabled = isPending;
  if (reserveGiftNoSelect) reserveGiftNoSelect.disabled = isPending;
  if (reserveGiftRefreshBtn) reserveGiftRefreshBtn.disabled = isPending;
}

function normalizeGiftStatus(status) {
  const raw = String(status || "").trim();
  const lower = raw.toLowerCase();
  if (lower.startsWith("available")) return "Available";
  if (lower.startsWith("reserved")) return "Reserved";
  if (!raw) return "Available";
  return raw;
}

function isAvailableGift(item) {
  return normalizeGiftStatus(item?.status).toLowerCase() === "available";
}

function maskName(name) {
  const cleaned = String(name || "").trim();
  if (!cleaned) return "-";
  if (cleaned.length === 1) return `${cleaned.charAt(0)}*`;
  if (cleaned.length === 2) return `${cleaned.charAt(0)}${cleaned.charAt(1)}`;
  return `${cleaned.charAt(0)}${"*".repeat(cleaned.length - 2)}${cleaned.charAt(cleaned.length - 1)}`;
}

function renderGiftTable(items) {
  if (!reserveGiftTableBody) return;

  reserveGiftTableBody.innerHTML = "";

  if (!items.length) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML =
      '<td colspan="4" class="px-4 py-6 text-center text-zinc-500">No gifts found right now.</td>';
    reserveGiftTableBody.appendChild(emptyRow);
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-zinc-900/50 transition-colors";

    const no = String(item.no ?? "-");
    const status = normalizeGiftStatus(item.status);
    const giftName = String(item.giftName ?? "-");
    const maskedReservedBy = maskName(item.reservedBy || "");
    const isReserved = status.toLowerCase() === "reserved";
    const statusClasses = isReserved
      ? "border-red-400/40 bg-red-500/15 text-red-300"
      : "border-primary/30 bg-primary/10 text-primary";
    const statusLabel = isReserved ? "N/A" : "A";

    row.innerHTML = `
      <td class="px-4 py-3 font-black text-primary">${no}</td>
      <td class="px-4 py-3">
        <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-widest font-black ${statusClasses}">${statusLabel}</span>
      </td>
      <td class="px-4 py-3 text-zinc-200">${giftName}</td>
      <td class="px-4 py-3 text-zinc-300 font-medium">${maskedReservedBy}</td>
    `;

    reserveGiftTableBody.appendChild(row);
  });
}

function renderGiftOptions(items) {
  if (!reserveGiftNoSelect) return;

  const previousValue = reserveGiftNoSelect.value;
  reserveGiftNoSelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = items.length ? "Select an available gift" : "No gifts available right now";
  reserveGiftNoSelect.appendChild(placeholderOption);

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = String(item.no ?? "");
      option.dataset.giftName = String(item.giftName ?? "");
    option.textContent = `${item.no}. ${item.giftName}`;
    reserveGiftNoSelect.appendChild(option);
  });

  if (previousValue && items.some((item) => String(item.no) === previousValue)) {
    reserveGiftNoSelect.value = previousValue;
  } else {
    reserveGiftNoSelect.value = "";
  }

  reserveGiftNoSelect.disabled = !items.length;
}

async function fetchGiftItems() {
  const actions = ["listAll", "list"];

  for (const action of actions) {
    const url = new URL(reserveGiftApiUrl);
    url.searchParams.set("action", action);
    url.searchParams.set("t", Date.now().toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Gift list request failed (${response.status})`);
    }

    const data = await response.json();
    if (data.ok && Array.isArray(data.items)) {
      return data.items;
    }
  }

  throw new Error("Could not read gift list");
}

async function loadAvailableGifts() {
  if (!reserveGiftNoSelect && !reserveGiftTableBody) return;

  setReserveGiftMessage("Loading available gifts...", "muted");
  if (reserveGiftLastUpdated) reserveGiftLastUpdated.textContent = "Updating...";

  try {
    const items = await fetchGiftItems();
    const availableItems = items.filter(isAvailableGift);

    renderGiftOptions(availableItems);
    renderGiftTable(items);
    if (availableItems.length) {
      setReserveGiftMessage("Choose a gift and submit to reserve it.", "info");
    } else {
      setReserveGiftMessage("All listed gifts are currently reserved.", "muted");
    }

    if (reserveGiftLastUpdated) {
      reserveGiftLastUpdated.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  } catch (error) {
    renderGiftOptions([]);
    renderGiftTable([]);
    setReserveGiftMessage(error.message || "Unable to load gifts right now.", "error");
    if (reserveGiftLastUpdated) reserveGiftLastUpdated.textContent = "Update failed";
  }
}

async function submitReserveGift(reservedBy, no, giftName) {
  setReserveGiftFormPending(true);
  setReserveGiftMessage("Submitting reservation...", "muted");

  try {
    const payload = new URLSearchParams();
    payload.set("action", "reserve");
    payload.set("no", no);
    if (giftName) payload.set("giftName", giftName);
    payload.set("reservedBy", reservedBy);

    const response = await fetch(reserveGiftApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      throw new Error(`Reservation request failed (${response.status})`);
    }

    const data = await response.json();
    if (data.ok) {
      setReserveGiftMessage("Gift reserved successfully. Thank you!", "success");
      reserveGiftNameInput.value = "";
    } else {
      setReserveGiftMessage(data.message || "This gift is no longer available.", "error");
    }
  } catch (error) {
    setReserveGiftMessage(error.message || "Could not submit reservation.", "error");
  } finally {
    setReserveGiftFormPending(false);
    await loadAvailableGifts();
  }
}

function showReserveGiftConfirm(reservedBy, giftLabel) {
  const dialog = document.getElementById("reserveGiftConfirmDialog");
  const nameEl = document.getElementById("reserveGiftConfirmName");
  const giftEl = document.getElementById("reserveGiftConfirmGiftName");
  const okBtn = document.getElementById("reserveGiftConfirmOk");
  const cancelBtn = document.getElementById("reserveGiftConfirmCancel");
  const backdrop = document.getElementById("reserveGiftConfirmBackdrop");
  if (!dialog || !okBtn || !cancelBtn) return Promise.resolve(true);

  if (nameEl) nameEl.textContent = reservedBy;
  if (giftEl) giftEl.textContent = giftLabel;

  dialog.classList.remove("hidden");
  dialog.classList.add("flex");
  dialog.setAttribute("aria-hidden", "false");

  return new Promise((resolve) => {
    function cleanup() {
      okBtn.removeEventListener("click", onConfirm);
      cancelBtn.removeEventListener("click", onCancel);
      document.removeEventListener("keydown", onKeydown);
      if (backdrop) backdrop.removeEventListener("click", onCancel);
    }

    function closeDialog(confirmed) {
      cleanup();
      dialog.classList.remove("flex");
      dialog.classList.add("hidden");
      dialog.setAttribute("aria-hidden", "true");
      resolve(confirmed);
    }

    function onConfirm() {
      closeDialog(true);
    }

    function onCancel() {
      closeDialog(false);
    }

    function onKeydown(event) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    okBtn.addEventListener("click", onConfirm);
    cancelBtn.addEventListener("click", onCancel);
    document.addEventListener("keydown", onKeydown);
    if (backdrop) backdrop.addEventListener("click", onCancel);
  });
}

async function handleReserveGiftSubmit(event) {
  event.preventDefault();
  if (!reserveGiftNameInput || !reserveGiftNoSelect) return;

  const reservedBy = reserveGiftNameInput.value.trim();
  const no = reserveGiftNoSelect.value;

  if (!reservedBy || !no) {
    setReserveGiftMessage("Enter your name and select a gift.", "error");
    return;
  }

  const selectedOption = reserveGiftNoSelect.options[reserveGiftNoSelect.selectedIndex];
  const giftLabel = selectedOption ? selectedOption.textContent : `Gift #${no}`;
  const giftName = selectedOption?.dataset.giftName?.trim()
    || (selectedOption ? selectedOption.textContent.replace(/^\s*\d+\.\s*/, "").trim() : "");
  const confirmed = await showReserveGiftConfirm(reservedBy, giftLabel);

  if (!confirmed) {
    setReserveGiftMessage("Reservation cancelled.", "muted");
    return;
  }

  await submitReserveGift(reservedBy, no, giftName);
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

if (reserveGiftForm) {
  reserveGiftForm.addEventListener("submit", handleReserveGiftSubmit);
}

if (reserveGiftRefreshBtn) {
  reserveGiftRefreshBtn.addEventListener("click", () => {
    loadAvailableGifts();
  });
}

if (goodVibesButton) {
  goodVibesButton.addEventListener("click", () => {
    spawnGoodVibesConfetti();
  });

  goodVibesButton.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    spawnGoodVibesConfetti();
  });
}

if (cakeImage) {
  cakeImage.addEventListener("click", () => {
    spawnCakeSnackBurst();
  });

  cakeImage.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    spawnCakeSnackBurst();
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
initScrollEffects();
initBackgroundEffects();
updateCountdown();
setInterval(updateCountdown, 1000);
loadAvailableGifts();

function showDelayWarningEmoji() {
  const emoji = document.createElement("div");
  emoji.textContent = "😭";
  emoji.style.position = "fixed";
  emoji.style.top = "50%";
  emoji.style.left = "50%";
  emoji.style.transform = "translate(-50%, -50%) scale(0.1)";
  emoji.style.fontSize = "15rem";
  emoji.style.zIndex = "9999";
  emoji.style.pointerEvents = "none";
  emoji.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  emoji.style.opacity = "0";

  document.body.appendChild(emoji);

  // Trigger layout
  void emoji.offsetWidth;

  // Animate in
  emoji.style.transform = "translate(-50%, -50%) scale(1)";
  emoji.style.opacity = "1";

  // Remove out
  setTimeout(() => {
    emoji.style.transform = "translate(-50%, -50%) scale(1.5)";
    emoji.style.opacity = "0";
    setTimeout(() => emoji.remove(), 500);
  }, 1300);
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-delay-warning-trigger]");
  if (!trigger) return;
  showDelayWarningEmoji();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const trigger = event.target.closest("[data-delay-warning-trigger]");
  if (!trigger) return;

  event.preventDefault();
  showDelayWarningEmoji();
});

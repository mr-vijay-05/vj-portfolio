/* ════════════════════════════════════════════════════
   VIJAY VIGNESH — PORTFOLIO JS
════════════════════════════════════════════════════ */

/* ── TYPED TEXT EFFECT ───────────────────────────── */
const phrases = [
  "Software Developer",
  "Python & Django Dev",
  "Full Stack Builder",
  "Problem Solver",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typedText");

function typeEffect() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(typeEffect, delay);
}

// Start after fonts load
window.addEventListener("load", () => {
  setTimeout(typeEffect, 600);
});

/* ── NAVBAR — SCROLL & ACTIVE ────────────────────── */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function onScroll() {
  // Scrolled class
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active link highlight
  let currentId = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) currentId = sec.id;
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();


/* ── HAMBURGER MENU ──────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinksWrap = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksWrap.classList.toggle("open");
  navLinksWrap.classList.toggle("active");
  document.body.style.overflow = navLinksWrap.classList.contains("open") ? "hidden" : "";
});

// Close on link click
navLinksWrap.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksWrap.classList.remove("open");
    navLinksWrap.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && navLinksWrap.classList.contains("open")) {
    hamburger.classList.remove("open");
    navLinksWrap.classList.remove("open");
    navLinksWrap.classList.remove("active");
    document.body.style.overflow = "";
  }
});


/* ── SCROLL REVEAL ───────────────────────────────── */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));


/* ── CONTACT FORM ────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const success = document.getElementById("formSuccess");

  btn.disabled = true;
  btnText.textContent = "Sending...";

  // Simulate async send
  setTimeout(() => {
    btn.style.display = "none";
    success.style.display = "block";
    document.getElementById("contactForm").reset();

    // Reset after 5s
    setTimeout(() => {
      btn.style.display = "";
      btn.disabled = false;
      btnText.textContent = "Send Message →";
      success.style.display = "none";
    }, 5000);
  }, 1200);
}


/* ── DOWNLOAD RESUME ─────────────────────────────── */
function handleDownload(e) {
  e.preventDefault();
  // Replace 'resume.pdf' with your actual resume file when deployed
  const link = document.createElement("a");
  link.href = "resume.pdf";
  link.download = "Vijay_Vignesh_Resume.pdf";
  link.click();
}


/* ── PROJECT CARD TILT ───────────────────────────── */
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform 0.4s ease";
    setTimeout(() => { card.style.transition = ""; }, 400);
  });
  card.style.transformStyle = "preserve-3d";
  card.style.willChange = "transform";
});


/* ── SMOOTH SCROLL ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});


/* ── CURSOR GLOW (desktop only) ──────────────────── */
if (window.innerWidth > 768) {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(34,193,160,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.left = mouseX + "px";
    glow.style.top = mouseY + "px";
  });

  document.addEventListener("mouseleave", () => { glow.style.opacity = "0"; });
  document.addEventListener("mouseenter", () => { glow.style.opacity = "1"; });
}


/* ── SKILL BAR ANIMATION (number counter) ────────── */
function animateCount(el, target, duration = 800) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Animate stat numbers when hero is visible
const statNums = document.querySelectorAll(".stat-num");
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      statNums.forEach((el) => {
        const val = parseInt(el.textContent);
        if (!isNaN(val)) animateCount(el, val);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector(".hero-stats");
if (heroStats) statsObserver.observe(heroStats);


/* ── INIT ─────────────────────────────────────────── */
console.log(
  `%c
  ╔══════════════════════════════╗
  ║   Vijay Vignesh — Portfolio  ║
  ║   Software Developer         ║
  ║   vijayvignesh.vish@gmail.com║
  ╚══════════════════════════════╝
  `,
  "color: #63b3ed; font-family: monospace; font-size: 12px;"
);

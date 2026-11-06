/* ============================================================
   Surabaya Private — Interaksi utama
   ============================================================ */

const WA_NUMBER = "6287767681430"; // 0877-6768-1430

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initActiveLinkOnScroll();
  initRevealOnScroll();
  initCounters();
  initLevelTabs();
  initFaq();
  initBookingForm();
});

/* ---------- Navbar shadow saat scroll ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Hamburger menu (mobile) ---------- */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("mobile-open");
  });

  // Tutup menu saat link diklik
  navLinks.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("mobile-open");
    })
  );
}

/* ---------- Highlight link aktif sesuai posisi scroll ---------- */
function initActiveLinkOnScroll() {
  const sections = document.querySelectorAll("section[id], footer[id]");
  const links = document.querySelectorAll(".nav-link");
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ---------- Animasi reveal on scroll ---------- */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 90}ms`;
    observer.observe(el);
  });
}

/* ---------- Counter angka pada hero stats ---------- */
function initCounters() {
  const nums = document.querySelectorAll(".stat-num[data-count]");
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((n) => observer.observe(n));
}

/* ---------- Tab jenjang SD/SMP/SMA ---------- */
function initLevelTabs() {
  const tabs = document.querySelectorAll(".level-tab");
  const panels = document.querySelectorAll(".level-panel");
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById(`panel-${tab.dataset.level}`);
      if (panel) panel.classList.add("active");
    })
  );
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // tutup yang lain
      document.querySelectorAll(".faq-item.open").forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
}

/* ---------- Form booking -> WhatsApp ---------- */
function initBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validasi sederhana
    let valid = true;
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((f) => {
      if (!f.value.trim()) {
        f.classList.add("invalid");
        valid = false;
      } else {
        f.classList.remove("invalid");
      }
    });

    const subjects = [...form.querySelectorAll(".chip-select input:checked")].map(
      (c) => c.value
    );
    if (!subjects.length) {
      valid = false;
      form
        .querySelector(".chip-select")
        .classList.add("chip-invalid");
    } else {
      form.querySelector(".chip-select").classList.remove("chip-invalid");
    }

    if (!valid) {
      form.reportValidity?.();
      return;
    }

    const nama = form.nama.value.trim();
    const wa = form.wa.value.trim();
    const jenjang = form.jenjang.value;
    const lokasi = form.lokasi.value.trim();
    const waktu = form.preference.value || "-";
    const frek = form.frekuensi.value || "-";
    const catatan = form.pesan.value.trim() || "-";

    const msg =
      `Halo Surabaya Private 👋%0A%0A` +
      `Saya ingin memesan guru privat ke rumah:%0A%0A` +
      `👤 *Nama:* ${encodeURIComponent(nama)}%0A` +
      `📱 *No. WhatsApp:* ${encodeURIComponent(wa)}%0A` +
      `🎓 *Jenjang:* ${encodeURIComponent(jenjang)}%0A` +
      `📍 *Area:* ${encodeURIComponent(lokasi)}%0A` +
      `📚 *Mata Pelajaran:* ${encodeURIComponent(subjects.join(", "))}%0A` +
      `🕒 *Waktu:* ${encodeURIComponent(waktu)}%0A` +
      `📅 *Frekuensi:* ${encodeURIComponent(frek)}%0A` +
      `📝 *Catatan:* ${encodeURIComponent(catatan)}%0A%0A` +
      `Mohon info ketersediaan guru dan biayanya. Terima kasih!`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  });

  // Bersihkan state invalid saat mengetik
  form.querySelectorAll("[required]").forEach((f) =>
    f.addEventListener("input", () => f.classList.remove("invalid"))
  );
}

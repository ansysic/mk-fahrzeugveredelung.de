const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  nav.classList.toggle("open", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);
nav.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }
});
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: .08 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
document.querySelectorAll("dialog").forEach((d) => {
  d.querySelector(".dialog-close").addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left || e.clientX > r.right || e.clientY < r.top ||
        e.clientY > r.bottom
      ) d.close();
    }
  });
});
document.querySelector("#imprint-open").addEventListener(
  "click",
  () => document.querySelector("#imprint").showModal(),
);
const lightbox = document.querySelector("#lightbox");
document.querySelectorAll(".gallery-set:not([aria-hidden]) .gallery-item")
  .forEach((b) =>
    b.addEventListener("click", () => {
      lightbox.querySelector("img").src = b.dataset.image;
      lightbox.showModal();
    })
  );
document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const body = `Name: ${data.get("name")}\nKontakt: ${
    data.get("contact")
  }\nWunschtermin: ${data.get("date") || "Nach Vereinbarung"}\n\n${
    data.get("message")
  }`;
  location.href = "mailto:info@mk-fahrzeugveredelung.de?subject=" +
    encodeURIComponent("Anfrage Fahrzeugveredelung – " + data.get("name")) +
    "&body=" + encodeURIComponent(body);
  document.querySelector("#form-status").textContent =
    "Bitte senden Sie die vorbereitete Nachricht in Ihrem E-Mail-Programm. Falls sich kein Programm öffnet, schreiben Sie direkt an info@mk-fahrzeugveredelung.de.";
});
const header = document.querySelector("header");
const onScroll = () => header.classList.toggle("scrolled", scrollY > 10);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

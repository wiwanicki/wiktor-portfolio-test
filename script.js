// 1. Menu mobilne
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Otwórz menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Zamknij menu" : "Otwórz menu"
  );
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// 2. Pasek pokazujący postęp przewijania
const scrollProgress = document.querySelector("#scrollProgress");

function updateScrollProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollableHeight > 0
    ? (window.scrollY / scrollableHeight) * 100
    : 0;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
  passive: true
});

updateScrollProgress();

// 3. Animacje pojawiające się podczas przewijania
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// 4. Aktualny rok w stopce
document.querySelector("#year").textContent =
  new Date().getFullYear();

// 5. Formularz kontaktowy — tryb demonstracyjny
const contactForm = document.querySelector("#contactForm");
const formFeedback = document.querySelector("#formFeedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const name = document.querySelector("#name").value.trim();

  formFeedback.textContent =
    `Dzięki, ${name}! Formularz działa demonstracyjnie. ` +
    "Wiadomość nie została wysłana.";

  contactForm.reset();
});

// 6. Okno demonstracyjnej rezerwacji
const bookingButton = document.querySelector("#bookingButton");
const bookingDialog = document.querySelector("#bookingDialog");
const closeDialog = document.querySelector("#closeDialog");
const confirmBooking = document.querySelector("#confirmBooking");
const bookingDate = document.querySelector("#bookingDate");
const bookingTime = document.querySelector("#bookingTime");
const bookingFeedback = document.querySelector("#bookingFeedback");

bookingButton.addEventListener("click", () => {
  bookingFeedback.textContent = "";
  bookingDialog.showModal();
});

closeDialog.addEventListener("click", () => {
  bookingDialog.close();
});

bookingDialog.addEventListener("click", (event) => {
  if (event.target === bookingDialog) {
    bookingDialog.close();
  }
});

confirmBooking.addEventListener("click", () => {
  const selectedDate = bookingDate.value;
  const selectedTime = bookingTime.value;

  if (!selectedDate) {
    bookingFeedback.textContent = "Najpierw wybierz datę.";
    bookingDate.focus();
    return;
  }

  const selectedDateTime = new Date(
    `${selectedDate}T${selectedTime}:00`
  );

  if (selectedDateTime <= new Date()) {
    bookingFeedback.textContent =
      "Wybierz przyszłą datę i godzinę.";
    return;
  }

  bookingFeedback.textContent =
    `Podgląd: ${selectedDate}, godz. ${selectedTime}. ` +
    "To nie jest prawdziwa rezerwacja.";
});

// 7. Delikatny komunikat po kliknięciu linku „Odkryj moje projekty”
const toast = document.querySelector("#toast");
let toastTimeout;

document.querySelectorAll('a[href="#projects"]').forEach((link) => {
  link.addEventListener("click", () => {
    toast.textContent = "Przejdźmy do projektów ↓";
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  });
});
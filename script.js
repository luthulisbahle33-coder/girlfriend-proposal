(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Graceful photo replacement: absent files keep their illustrated, labeled placeholders.
  document.querySelectorAll(".photo-window img").forEach((image) => {
    const windowElement = image.closest(".photo-window");
    const showPhoto = () => windowElement.classList.add("photo-loaded");
    const showPlaceholder = () => windowElement.classList.remove("photo-loaded");
    image.addEventListener("load", showPhoto);
    image.addEventListener("error", showPlaceholder);
    if (image.complete && image.naturalWidth > 0) showPhoto();
  });

  const finalPhoto = document.getElementById("finalCouplePhoto");
  const finalFallback = document.getElementById("finalPhotoFallback");
  if (finalPhoto && finalFallback) {
    const showFinalPhoto = () => {
      finalFallback.setAttribute("display", "none");
      finalPhoto.setAttribute("display", "inline");
    };
    const showFinalFallback = () => {
      finalPhoto.setAttribute("display", "none");
      finalFallback.removeAttribute("display");
    };
    finalPhoto.addEventListener("load", showFinalPhoto);
    finalPhoto.addEventListener("error", showFinalFallback);
  }

  // Reveal scrapbook pieces as they enter view; keep all content visible without IntersectionObserver.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Load the official Apple Music player only when the visitor opens it.
  const playButton = document.getElementById("playLetterHome");
  const appleMusicSlot = document.getElementById("appleMusicEmbed");
  const appleMusicFrame = appleMusicSlot?.querySelector("iframe");
  const playLabel = document.getElementById("playLabel");
  playButton?.addEventListener("click", () => {
    if (!appleMusicSlot) return;
    const opening = appleMusicSlot.hidden;
    appleMusicSlot.hidden = !opening;
    playButton.setAttribute("aria-expanded", String(opening));
    if (playLabel) playLabel.textContent = opening ? "APPLE MUSIC PLAYER OPEN" : "OPEN APPLE MUSIC";
    if (
      opening &&
      appleMusicFrame &&
      appleMusicFrame.dataset.embedUrl &&
      appleMusicFrame.getAttribute("src") !== appleMusicFrame.dataset.embedUrl
    ) {
      appleMusicFrame.src = appleMusicFrame.dataset.embedUrl;
    }
    if (opening) {
      window.setTimeout(() => appleMusicSlot.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" }), 80);
    }
  });

  // The NO button gets two silly little dodges, then becomes an honest, easy-to-dismiss joke.
  const noButton = document.getElementById("noButton");
  const noStage = document.getElementById("noStage");
  const noMessage = document.getElementById("noMessage");
  const noHint = document.getElementById("noHint");
  let noAttempts = 0;
  const dodgeMessages = ["Nice try ♡", "you nearly had me"];

  function playfulNo() {
    if (!noButton || !noStage) return;
    if (noAttempts < 2) {
      const positions = [
        { x: 25, y: -12 },
        { x: -17, y: 8 }
      ];
      const position = positions[noAttempts];
      noButton.style.transform = `translate(${position.x}px, ${position.y}px)`;
      noButton.textContent = dodgeMessages[noAttempts];
      noButton.setAttribute("aria-label", `${dodgeMessages[noAttempts]}. Just a joke, try again.`);
      noAttempts += 1;
      return;
    }
    noButton.style.transform = "none";
    noButton.textContent = "Just teasing — no pressure";
    noButton.setAttribute("aria-label", "Just teasing, no pressure");
    noButton.disabled = true;
    noStage.classList.add("no-settled");
    if (noMessage) noMessage.hidden = false;
    if (noHint) noHint.hidden = true;
  }

  noButton?.addEventListener("click", playfulNo);
  noButton?.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && noAttempts < 2) playfulNo();
  });

  // A yes is celebrated locally; no submissions, tracking, or network calls are made.
  const yesButton = document.getElementById("yesButton");
  const celebration = document.getElementById("celebration");
  const confetti = document.getElementById("confetti");
  const replayButton = document.getElementById("replayButton");

  function makeConfetti() {
    if (!confetti || reducedMotion) return;
    confetti.replaceChildren();
    const marks = ["♡", "✳", "✦", "♥", "✿"];
    const colors = ["#ffe5e4", "#f7bdc9", "#ffdfad", "#ef91a7", "#f6eee1"];
    for (let index = 0; index < 52; index += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.textContent = marks[index % marks.length];
      piece.style.setProperty("--x", `${(index * 37) % 100}%`);
      piece.style.setProperty("--c", colors[index % colors.length]);
      piece.style.setProperty("--s", `${12 + (index % 4) * 5}px`);
      piece.style.setProperty("--d", `${5 + (index % 7) * 0.7}s`);
      piece.style.setProperty("--delay", `${-((index * 13) % 65) / 10}s`);
      confetti.appendChild(piece);
    }
  }

  yesButton?.addEventListener("click", () => {
    if (!celebration) return;
    celebration.hidden = false;
    makeConfetti();
    celebration.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    document.getElementById("celebration-title")?.focus?.({ preventScroll: true });
  });

  replayButton?.addEventListener("click", () => {
    celebration.hidden = true;
    document.getElementById("opening-title")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    yesButton?.focus({ preventScroll: true });
  });
})();
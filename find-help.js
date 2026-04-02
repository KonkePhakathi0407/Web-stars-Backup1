// MindCare Hub – Find Help JavaScript
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("crisisCallBtn")?.addEventListener("click", () => {
    if (confirm("You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?")) {
      window.location.href = "tel:0800567567";
    }
  });

  const cards = document.querySelectorAll(".provider-card");

  function filterCards() {
    const search = document.getElementById("providerSearch").value.toLowerCase();
    const type = document.getElementById("typeFilter").value;
    const activeChip = document.querySelector(".chip.active")?.dataset.filter || "all";
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const cardType = card.dataset.type || "";
      const isFree = card.dataset.free === "true";
      const isOpen = card.dataset.open === "true";
      let show = true;
      if (search && !text.includes(search)) show = false;
      if (type && cardType !== type) show = false;
      if (activeChip === "campus" && cardType !== "campus") show = false;
      if (activeChip === "online" && cardType !== "online") show = false;
      if (activeChip === "free" && !isFree) show = false;
      if (activeChip === "open" && !isOpen) show = false;
      card.style.display = show ? "" : "none";
    });
  }

  document.getElementById("providerSearch")?.addEventListener("input", filterCards);
  document.getElementById("typeFilter")?.addEventListener("change", filterCards);

  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", function() {
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      this.classList.add("active");
      filterCards();
    });
  });

  cards.forEach((card, i) => {
    card.style.opacity = "0"; card.style.transform = "translateY(14px)";
    setTimeout(() => { card.style.transition = "opacity 0.4s ease,transform 0.4s ease"; card.style.opacity = "1"; card.style.transform = ""; }, 60 + i * 80);
  });
});
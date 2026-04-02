// MindCare Hub – AI Insights JavaScript
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("crisisCallBtn")?.addEventListener("click", () => {
    if (confirm("You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?")) {
      window.location.href = "tel:0800567567";
    }
  });
  document.querySelectorAll(".insight-act-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const label = this.textContent;
      this.textContent = "✓ Added to plan";
      this.style.background = "#16a34a";
      setTimeout(() => { this.textContent = label; this.style.background = ""; }, 2000);
    });
  });
  // Animate score ring
  const circle = document.querySelector(".ring-svg circle:last-child");
  if (circle) {
    circle.style.strokeDashoffset = "251";
    setTimeout(() => { circle.style.transition = "stroke-dashoffset 1.2s ease"; circle.style.strokeDashoffset = "63"; }, 300);
  }
  document.querySelectorAll(".insight-block,.reco-item").forEach((el,i) => {
    el.style.opacity="0"; el.style.transform="translateY(16px)";
    setTimeout(()=>{ el.style.transition="opacity 0.4s ease,transform 0.4s ease"; el.style.opacity="1"; el.style.transform=""; }, 100 + i*80);
  });
});
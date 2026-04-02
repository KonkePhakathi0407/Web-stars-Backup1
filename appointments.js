// MindCare Hub – Appointments JavaScript
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("crisisCallBtn")?.addEventListener("click", () => {
    if (confirm("You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?")) {
      window.location.href = "tel:0800567567";
    }
  });

  // Set min date on date picker to today
  const dateInput = document.getElementById("apptDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Show/hide book form
  document.getElementById("newApptBtn")?.addEventListener("click", () => {
    const form = document.getElementById("bookForm");
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("cancelFormBtn")?.addEventListener("click", () => {
    document.getElementById("bookForm").style.display = "none";
  });

  // Confirm booking
  document.getElementById("confirmApptBtn")?.addEventListener("click", () => {
    const provider = document.getElementById("apptProvider").value;
    const type = document.getElementById("apptType").value;
    const date = document.getElementById("apptDate").value;
    const time = document.getElementById("apptTime").value;
    if (!provider || !date) { alert("Please select a provider and date."); return; }
    document.getElementById("confirmMsg").textContent = `${provider} · ${type} on ${date} at ${time}`;
    document.getElementById("confirmModal").classList.add("open");
    document.getElementById("bookForm").style.display = "none";
    // Add to past list as new upcoming
    addUpcoming(provider, date, time, type);
  });

  document.getElementById("modalOkBtn")?.addEventListener("click", () => {
    document.getElementById("confirmModal").classList.remove("open");
  });

  function addUpcoming(provider, date, time, type) {
    const d = new Date(date);
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const card = document.createElement("div");
    card.className = "appt-card upcoming-card";
    card.style.opacity = "0";
    const shortName = provider.split("–")[0].trim();
    card.innerHTML = `<div class="appt-date-block purple-date"><div class="appt-month">${months[d.getMonth()]}</div><div class="appt-day">${d.getDate()}</div></div><div class="appt-info-block"><h3 class="appt-name">${shortName}</h3><p class="appt-role">${type}</p><p class="appt-time-line">🕑 ${time}</p></div><div class="appt-actions"><button class="join-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>Join</button></div>`;
    document.querySelector(".appt-section").appendChild(card);
    requestAnimationFrame(() => { card.style.transition = "opacity 0.4s ease"; card.style.opacity = "1"; });
  }

  // Join button
  document.getElementById("joinBtn")?.addEventListener("click", () => {
    alert("🎥 Launching video session…\n\nThis would open your video call with Dr. Sarah Jenkins.");
  });

  // Cancel appointment
  document.getElementById("cancelApptBtn")?.addEventListener("click", () => {
    if (confirm("Cancel your appointment with Dr. Sarah Jenkins on Oct 26?\nThis action cannot be undone.")) {
      const card = document.querySelector(".upcoming-card");
      if (card) { card.style.transition = "opacity 0.3s ease,transform 0.3s ease"; card.style.opacity = "0"; card.style.transform = "translateX(-20px)"; setTimeout(() => card.remove(), 350); }
    }
  });

  document.querySelectorAll(".past-item,.appt-card").forEach((el,i) => {
    el.style.opacity="0"; el.style.transform="translateY(10px)";
    setTimeout(() => { el.style.transition="opacity 0.4s ease,transform 0.4s ease"; el.style.opacity="1"; el.style.transform=""; }, 80+i*80);
  });
});
// MindCare Hub – Journal JavaScript
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("crisisCallBtn")?.addEventListener("click", () => {
    if (confirm("You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?")) {
      window.location.href = "tel:0800567567";
    }
  });

  const entries = [
    { id: 1, date: "Yesterday · 10:45 PM", title: "Feeling the weight of midterms", mood: "neutral", moodScore: "6/10", body: "<p>Today was a struggle with focus. I spent four hours in the library and only finished half of the reading. My anxiety is peaking around the physics lab report due Friday.</p><p>I kept getting distracted by everything around me — people talking, my phone, my own thoughts.</p><p>Tomorrow I'll try the library's silent study room. Maybe I should also speak to my academic advisor about the workload.</p>", tags: ["Anxiety", "Academic"] },
    { id: 2, date: "Oct 22 · 08:15 AM", title: "Morning reflections on the park walk", mood: "good", moodScore: "8/10", body: "<p>The air was crisp and the walk helped clear my head. The morning light through the trees was exactly what I needed after a tough week.</p><p>Note to self: do this more often when the sun is out. Movement really does help shift my mood.</p>", tags: ["Calm", "Mindfulness"] },
    { id: 3, date: "Oct 20 · 11:30 PM", title: "Struggling with imposter syndrome again", mood: "low", moodScore: "4/10", body: "<p>Everyone around me seems so confident. Why can't I feel that way? I keep comparing myself to my classmates and it's exhausting.</p><p>I need to remind myself that everyone is just doing their best, and so am I. Progress, not perfection.</p>", tags: ["Self-doubt", "Growth"] },
    { id: 4, date: "Oct 18 · 07:00 PM", title: "Study group actually helped today", mood: "good", moodScore: "8/10", body: "<p>We worked through three chapters together and it finally clicked. There's something about explaining concepts to others that really solidifies my understanding.</p><p>Going to make this a weekly thing.</p>", tags: ["Progress", "Social"] },
    { id: 5, date: "Oct 15 · 09:20 PM", title: "Thinking about calling home more often", mood: "neutral", moodScore: "6/10", body: "<p>Talked to mom today for the first time in two weeks. Felt good but also made me realize how much I miss home.</p><p>University is exciting but lonely sometimes. I should reach out to friends more this week.</p>", tags: ["Family", "Loneliness"] },
  ];

  let currentId = 1;
  let writeTags = [];

  function loadEntry(id) {
    const e = entries.find(x => x.id === id);
    if (!e) return;
    currentId = id;
    document.getElementById("viewDate").textContent = e.date;
    document.getElementById("viewTitle").textContent = e.title;
    document.getElementById("viewBody").innerHTML = e.body;
    const dot = document.querySelector(".mood-dot-lg");
    dot.className = `mood-dot-lg mood-${e.mood}`;
    document.querySelector(".mood-label-text").textContent = `Mood: ${e.mood.charAt(0).toUpperCase() + e.mood.slice(1)} (${e.moodScore})`;
    const tagsEl = document.querySelector("#viewMode .entry-tags");
    tagsEl.innerHTML = e.tags.map(t => `<span class="tag">${t}</span>`).join("");
    document.querySelectorAll(".entry-item").forEach(el => {
      el.classList.toggle("active", parseInt(el.dataset.id) === id);
    });
    document.getElementById("viewMode").style.display = "";
    document.getElementById("writeMode").style.display = "none";
  }

  document.querySelectorAll(".entry-item").forEach(item => {
    item.addEventListener("click", function() { loadEntry(parseInt(this.dataset.id)); });
  });

  // New entry
  document.getElementById("newEntryBtn").addEventListener("click", openWriteMode);
  function openWriteMode() {
    document.getElementById("viewMode").style.display = "none";
    document.getElementById("writeMode").style.display = "";
    document.getElementById("writeTitle").value = "";
    document.getElementById("writeBody").value = "";
    document.getElementById("writeMood").value = "";
    writeTags = [];
    renderWriteTags();
  }

  document.getElementById("editBtn")?.addEventListener("click", () => {
    const e = entries.find(x => x.id === currentId);
    if (!e) return;
    document.getElementById("writeTitle").value = e.title;
    document.getElementById("writeBody").value = e.body.replace(/<[^>]+>/g,"").replace(/\n+/g,"\n").trim();
    writeTags = [...e.tags];
    renderWriteTags();
    document.getElementById("viewMode").style.display = "none";
    document.getElementById("writeMode").style.display = "";
  });

  document.getElementById("deleteBtn")?.addEventListener("click", () => {
    if (confirm("Delete this entry? This cannot be undone.")) {
      const idx = entries.findIndex(x => x.id === currentId);
      if (idx > -1) entries.splice(idx, 1);
      if (entries.length) loadEntry(entries[0].id);
      else { document.getElementById("viewMode").style.display = ""; document.getElementById("viewTitle").textContent = "No entries yet"; document.getElementById("viewBody").innerHTML = "<p>Click <strong>New Entry</strong> to start your first reflection.</p>"; }
    }
  });

  document.getElementById("cancelWriteBtn")?.addEventListener("click", () => {
    document.getElementById("writeMode").style.display = "none";
    document.getElementById("viewMode").style.display = "";
  });

  document.getElementById("saveEntryBtn")?.addEventListener("click", () => {
    const title = document.getElementById("writeTitle").value.trim();
    const body = document.getElementById("writeBody").value.trim();
    const mood = document.getElementById("writeMood").value || "neutral";
    if (!title || !body) { alert("Please add a title and some content."); return; }
    const newEntry = {
      id: Date.now(), date: "Just now",
      title, mood, moodScore: "?/10",
      body: body.split("\n").filter(Boolean).map(p => `<p>${p}</p>`).join(""),
      tags: [...writeTags]
    };
    entries.unshift(newEntry);
    const list = document.getElementById("entriesList");
    const item = document.createElement("div");
    item.className = "entry-item"; item.dataset.id = newEntry.id;
    item.innerHTML = `<div class="entry-item-top"><span class="entry-mood-dot mood-${mood}"></span><span class="entry-date">Just now</span></div><h3 class="entry-item-title">${title}</h3><p class="entry-item-preview">${body.slice(0,60)}…</p><div class="entry-tags">${writeTags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>`;
    item.addEventListener("click", function(){ loadEntry(parseInt(this.dataset.id)); });
    list.prepend(item);
    loadEntry(newEntry.id);
  });

  // Tag input
  document.getElementById("tagInput")?.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && this.value.trim()) {
      writeTags.push(this.value.trim()); this.value = ""; renderWriteTags();
    }
  });

  function renderWriteTags() {
    const el = document.getElementById("currentTags");
    el.innerHTML = writeTags.map((t,i) => `<span class="tag" style="cursor:pointer" data-i="${i}">${t} ×</span>`).join("");
    el.querySelectorAll(".tag").forEach(span => {
      span.addEventListener("click", function() { writeTags.splice(parseInt(this.dataset.i),1); renderWriteTags(); });
    });
  }

  // Prompt chips
  document.querySelectorAll(".prompt-chip").forEach(chip => {
    chip.addEventListener("click", function() {
      const ta = document.getElementById("writeBody");
      ta.value += (ta.value ? "\n\n" : "") + this.dataset.prompt + "\n";
      ta.focus();
    });
  });

  // Search
  document.getElementById("searchEntries")?.addEventListener("input", function() {
    const q = this.value.toLowerCase();
    document.querySelectorAll(".entry-item").forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = !q || text.includes(q) ? "" : "none";
    });
  });

  // Entrance animations
  document.querySelectorAll(".streak-card,.entry-item").forEach((el,i) => {
    el.style.opacity="0"; el.style.transform="translateY(12px)";
    setTimeout(() => { el.style.transition="opacity 0.4s ease,transform 0.4s ease"; el.style.opacity="1"; el.style.transform=""; }, 60 + i*50);
  });
});
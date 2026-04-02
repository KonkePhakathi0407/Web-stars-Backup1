// MindCare Hub – Resources JavaScript
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("crisisCallBtn")?.addEventListener("click", () => {
    if (confirm("You are about to call the crisis line: 0800 567 567\n\nThis is free and available 24/7.\n\nProceed?")) {
      window.location.href = "tel:0800567567";
    }
  });

  const resourceContent = {
    "exam-anxiety": { icon: "📖", title: "The Student's Complete Guide to Managing Exam Anxiety", body: "Exam anxiety affects up to 40% of students. This guide covers:\n\n• Breathing techniques: Use box breathing (4-4-4-4) before entering the exam room.\n\n• Preparation strategies: Spaced repetition reduces anxiety by increasing confidence. Study in 25-minute Pomodoro sessions.\n\n• Sleep hygiene: Your brain consolidates memory during sleep. Prioritise 7-8 hours during exam period.\n\n• On the day: Eat a protein-rich breakfast. Arrive early. Read all questions before answering.\n\n• When to get help: If anxiety is impacting your daily life for more than two weeks, speak to a professional." },
    "social-anxiety": { icon: "😰", title: "Understanding Social Anxiety in University", body: "Social anxiety is characterised by intense fear of social situations and judgment. In university this can manifest as:\n\n• Fear of speaking in seminars or tutorials\n• Avoiding group projects or study groups\n• Difficulty making friends in a new environment\n\nEvidence-based strategies include Cognitive Behavioural Therapy (CBT), gradual exposure therapy, and mindfulness practice. You are not alone — speak to the campus counsellor or book through the Appointments page." },
    "box-breathing": { icon: "🧘", title: "Box Breathing for Instant Stress Relief", body: "Box breathing (also called square breathing) activates your parasympathetic nervous system:\n\n1. Inhale slowly for 4 counts\n2. Hold your breath for 4 counts\n3. Exhale slowly for 4 counts\n4. Hold empty for 4 counts\n\nRepeat 4 times. This technique is used by Navy SEALs, surgeons, and therapists to manage acute stress. Practice it before exams, presentations, or any stressful situation." },
    "sleep": { icon: "🌙", title: "Sleep Hygiene for Academic Performance", body: "Sleep is not passive — your brain is actively consolidating memories during REM sleep. Studies show that students who sleep 7-9 hours perform 20% better on memory-based assessments.\n\nTips for better sleep:\n• Consistent bedtimes (even weekends)\n• No screens 60 minutes before bed\n• Keep your room cool and dark\n• Avoid caffeine after 2 PM\n• Use your bed only for sleep\n\nIf you're struggling with insomnia, speak to a healthcare professional." },
    "imposter": { icon: "📚", title: "Overcoming Imposter Syndrome", body: "Imposter syndrome affects 70% of people at some point, and is especially common among high-achieving students.\n\nSigns you may be experiencing it:\n• Attributing success to luck rather than skill\n• Fear of being 'found out' as incompetent\n• Discounting positive feedback\n\nStrategies:\n• Keep a 'win journal' — document your achievements\n• Talk to peers — you'll discover they feel the same\n• Separate feelings from facts\n• Seek mentorship from those you admire\n• Consider therapy if it significantly impacts your wellbeing" },
    "meditation": { icon: "✨", title: "5-Minute Morning Mindfulness Meditation", body: "Start every morning with 5 minutes of mindfulness to set a grounded, focused tone:\n\n1. Sit comfortably, spine straight\n2. Close your eyes and take 3 deep breaths\n3. Notice the sensation of breathing — don't control it\n4. When thoughts arise, notice them without judgment and return to breath\n5. After 5 minutes, open your eyes slowly\n\nConsistency matters more than duration. Even 5 minutes daily reshapes neural pathways over 8 weeks according to Harvard research." },
    "time-mgmt": { icon: "🎯", title: "Time Management Without Burnout", body: "Sustainable productivity is about working with your energy, not against it.\n\n• Pomodoro Technique: 25 min work + 5 min break\n• Time blocking: Schedule deep work in morning, admin in afternoon\n• The 2-minute rule: If a task takes less than 2 minutes, do it now\n• Weekly review: Every Sunday, plan your week in advance\n• Rest is productive: Regular breaks improve focus and creativity\n\nBurnout prevention: Schedule non-negotiable rest, protect social time, and seek support early when overwhelmed." },
    "cbt": { icon: "💙", title: "CBT Thought Journal Template", body: "Cognitive Behavioural Therapy helps you identify and challenge unhelpful thought patterns.\n\nUsing this template:\n1. Situation: What happened? (Just facts)\n2. Automatic thought: What did you think immediately?\n3. Emotion: What did you feel? (Rate 0-100%)\n4. Evidence FOR the thought\n5. Evidence AGAINST the thought\n6. Balanced thought: A more realistic perspective\n7. Outcome: How do you feel now? (Rate 0-100%)\n\nPractice this daily for 21 days to build new neural pathways." },
    "support-network": { icon: "🏆", title: "Building a Support Network at University", body: "Research shows that social connection is the strongest predictor of academic success and mental wellbeing.\n\nHow to build your network:\n• Join one club or society related to your interests\n• Attend at least one departmental event per semester\n• Form a study group (2-4 people is ideal)\n• Talk to your lecturers during office hours\n• Use the Forum on MindCare Hub to connect with peers\n\nRemember: vulnerability builds connection. You don't have to have it all together to make friends." },
    "gratitude": { icon: "🌿", title: "The Power of Gratitude Journaling", body: "A 2003 study by Emmons and McCullough found that weekly gratitude journaling increased wellbeing by 25% compared to control groups.\n\nHow to practice:\n• Write 3 specific things you're grateful for each morning\n• Be specific: not 'my friends' but 'the way Lerato laughed at my joke today'\n• Include small moments — not just big events\n• On hard days, write anyway — even one thing counts\n\nCombine with your MindCare Journal for maximum effect." }
  };

  window.openResource = function(key) {
    const content = resourceContent[key];
    if (!content) return;
    document.getElementById("resModalIcon").textContent = content.icon;
    document.getElementById("resModalTitle").textContent = content.title;
    document.getElementById("resModalBody").innerHTML = content.body.split("\n").map(line => line.trim() ? `<p style="margin-bottom:10px">${line}</p>` : "").join("");
    document.getElementById("resModal").classList.add("open");
  };

  document.getElementById("resModalClose")?.addEventListener("click", () => document.getElementById("resModal").classList.remove("open"));
  document.getElementById("resModalBack")?.addEventListener("click", () => document.getElementById("resModal").classList.remove("open"));
  document.getElementById("resModal")?.addEventListener("click", function(e) { if (e.target === this) this.classList.remove("open"); });

  // Category filter
  document.querySelectorAll(".res-chip").forEach(chip => {
    chip.addEventListener("click", function() {
      document.querySelectorAll(".res-chip").forEach(c => c.classList.remove("active"));
      this.classList.add("active");
      const cat = this.dataset.cat;
      document.querySelectorAll(".res-card").forEach(card => {
        card.style.display = cat === "all" || card.dataset.cat === cat ? "" : "none";
      });
    });
  });

  // Search
  document.getElementById("resSearch")?.addEventListener("input", function() {
    const q = this.value.toLowerCase();
    document.querySelectorAll(".res-card").forEach(card => {
      card.style.display = !q || card.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  document.querySelectorAll(".res-card").forEach((card,i) => {
    card.style.opacity="0"; card.style.transform="translateY(14px)";
    setTimeout(() => { card.style.transition="opacity 0.4s ease,transform 0.4s ease"; card.style.opacity="1"; card.style.transform=""; }, 60+i*60);
  });
});
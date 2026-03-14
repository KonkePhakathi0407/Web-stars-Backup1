  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });

  function openMobile() { document.getElementById('mobileMenu').classList.add('open'); }
  function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

  const phrases = [
    "You are stronger than you think. 💪",
    "Every day is a new beginning. 🌅",
    "It's okay to ask for help. 🤝",
    "Your feelings are valid. 💜",
    "Small steps lead to big changes. 🌱",
  ];
  let pi = 0, ci = 0, deleting = false;
  function typePhrase() {
    const el = document.getElementById('typingText');
    const current = phrases[pi];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(typePhrase, 2000); return; }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typePhrase, deleting ? 50 : 80);
  }
  typePhrase();

  const quotes = [
    { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, or just plain bad.", author: "— Lori Deschene" },
    { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "— Noam Shpancer" },
    { text: "There is hope, even when your brain tells you there isn't.", author: "— John Green" },
    { text: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "— Eleanor Brownn" },
    { text: "It's okay to not be okay — as long as you are not giving up.", author: "— Karen Salmansohn" },
  ];
  let qi = 0;
  function renderQuote() {
    document.getElementById('quoteText').textContent = quotes[qi].text;
    document.getElementById('quoteAuthor').textContent = quotes[qi].author;
    const dots = document.getElementById('quoteDots');
    dots.innerHTML = '';
    quotes.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'quote-dot' + (i === qi ? ' active' : '');
      d.onclick = () => { qi = i; renderQuote(); };
      dots.appendChild(d);
    });
  }
  renderQuote();
  setInterval(() => { qi = (qi + 1) % quotes.length; renderQuote(); }, 5000);

  const moodData = {
    amazing: { title: '🌟 You\'re Radiating!', tip: 'Wonderful! Capture this feeling in your journal. Consider reaching out to a friend who might need a boost — your energy is contagious!' },
    good: { title: '😊 Keep It Up!', tip: 'Great to hear! Maintain your momentum with a short walk or some light stretching. Gratitude journaling can help sustain positive feelings.' },
    okay: { title: '😐 That\'s Valid Too', tip: 'Feeling neutral is completely normal. Try a 5-minute breathing exercise: breathe in for 4 counts, hold for 4, out for 6. Small acts of self-care can shift your energy.' },
    sad: { title: '💜 We See You', tip: 'It\'s okay to feel sad. Try reaching out to someone you trust, or use our journaling feature. Remember: this feeling will pass. You are loved.' },
    anxious: { title: '🤗 You\'re Safe Here', tip: 'Take slow, deep breaths. Ground yourself: name 5 things you can see, 4 you can touch, 3 you can hear. Consider calling the SADAG helpline: 0800 567 567.' },
    overwhelmed: { title: '🌊 Let\'s Slow Down', tip: 'Put everything down for 10 minutes. Breathe. You don\'t have to do everything today. Please reach out to campus counselling or call 0800 567 567 if you need immediate support.' },
  };
  function selectMood(btn, mood) {
    document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const data = moodData[mood];
    document.getElementById('moodTitle').textContent = data.title;
    document.getElementById('moodTip').textContent = data.tip;
    const r = document.getElementById('moodResponse');
    r.classList.remove('show');
    setTimeout(() => r.classList.add('show'), 50);
  }

  function updateStress(val) {
    document.getElementById('stressVal').textContent = val;
    const result = document.getElementById('surveyResult');
    let title, tips;
    if (val <= 3) {
      title = '🌿 You\'re Doing Well!';
      tips = [['🧘','Keep meditating'],['🌞','Enjoy the day'],['📔','Journal it']];
    } else if (val <= 6) {
      title = '⚡ Moderate Stress — Let\'s Manage It';
      tips = [['🫁','Deep breathing'],['🚶','Short walk outside'],['📵','Limit screen time'],['😴','Prioritise sleep']];
    } else if (val <= 8) {
      title = '🔥 High Stress — You Need Support';
      tips = [['📞','Call a friend'],['🏥','Visit campus wellness'],['📔','Journal your feelings'],['🎵','Listen to calm music']];
    } else {
      title = '🆘 Crisis Level — Please Reach Out Now';
      tips = [['📞','SADAG: 0800 567 567'],['💬','Chat with our support bot'],['🏥','Go to emergency services'],['👤','Tell someone you trust']];
    }
    document.getElementById('surveyTitle').textContent = title;
    document.getElementById('tipCards').innerHTML = tips.map(t => `<div class="tip-card"><div class="icon">${t[0]}</div><p>${t[1]}</p></div>`).join('');
    result.classList.remove('show');
    setTimeout(() => result.classList.add('show'), 50);
  }
  updateStress(5);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  function animateCounters() {
    document.querySelectorAll('[data-target]').forEach(el => {
      const target = +el.dataset.target;
      let current = 0;
      const step = target / 80;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); return; }
        el.textContent = Math.floor(current).toLocaleString();
      }, 20);
    });
  }
  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsObs.disconnect(); } });
  }, { threshold: 0.3 });
  document.querySelector('.stats-section') && statsObs.observe(document.querySelector('.stats-section'));
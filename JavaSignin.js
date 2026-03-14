let isAnon = false;

  function toggleAnon() {
    isAnon = !isAnon;
    const toggle = document.getElementById('anonToggle');
    const nameRow = document.getElementById('nameRow');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    toggle.classList.toggle('active', isAnon);
    if (isAnon) {
      nameRow.style.opacity = '0.5'; nameRow.style.pointerEvents = 'none';
      nameInput.value = 'Anonymous' + Math.floor(Math.random() * 9999);
      surnameInput.value = '';
      nameInput.disabled = true; surnameInput.disabled = true;
    } else {
      nameRow.style.opacity = '1'; nameRow.style.pointerEvents = 'auto';
      nameInput.value = ''; surnameInput.value = '';
      nameInput.disabled = false; surnameInput.disabled = false;
    }
    updateProgress();
  }

  function togglePw(id, eyeId) {
    const input = document.getElementById(id);
    const eye = document.getElementById(eyeId);
    if (input.type === 'password') { input.type = 'text'; eye.classList.replace('fa-eye','fa-eye-slash'); }
    else { input.type = 'password'; eye.classList.replace('fa-eye-slash','fa-eye'); }
  }

  function checkStrength() {
    const pw = document.getElementById('password').value;
    const fill = document.getElementById('strengthFill');
    const label = document.getElementById('strengthLabel');
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const configs = [
      { w: '0%', c: '#e5e7eb', t: '' },
      { w: '25%', c: '#ef4444', t: 'Weak' },
      { w: '50%', c: '#f59e0b', t: 'Fair' },
      { w: '75%', c: '#06b6d4', t: 'Good' },
      { w: '100%', c: '#10b981', t: 'Strong 💪' },
    ];
    const cfg = configs[score];
    fill.style.width = cfg.w; fill.style.background = cfg.c;
    label.textContent = cfg.t; label.style.color = cfg.c;
    updateProgress();
  }

  function validateField(id) {
    const el = document.getElementById(id);
    const err = document.getElementById(id + 'Err');
    let valid = true;
    if (id === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
    else if (id === 'confirmPassword') valid = el.value === document.getElementById('password').value && el.value !== '';
    else valid = el.value.trim() !== '';
    el.classList.toggle('valid', valid);
    el.classList.toggle('invalid', !valid && el.value !== '');
    if (err) err.classList.toggle('show', !valid && el.value !== '');
    updateProgress();
    return valid;
  }

  function updateProgress() {
    const fields = ['email', 'password', 'confirmPassword', 'university'];
    if (!isAnon) { fields.push('name'); fields.push('surname'); }
    let filled = fields.filter(id => {
      const el = document.getElementById(id);
      return el && el.value.trim() !== '';
    }).length;
    const pct = Math.min((filled / fields.length) * 100, 100);
    document.getElementById('progressFill').style.width = pct + '%';
  }

  document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const university = document.getElementById('university').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    if (!email || !password || !confirmPassword || !university) { alert('Please fill all required fields!'); return; }
    if (!isAnon && (!name || !surname)) { alert('Please enter your name and surname, or enable anonymous mode.'); return; }
    if (password !== confirmPassword) { alert('Passwords do not match!'); return; }
    if (password.length < 8) { alert('Password must be at least 8 characters!'); return; }
    document.getElementById('successOverlay').classList.add('show');
  });
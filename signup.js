// MindCare Hub – Signup Page JavaScript

let anonMode = false;

// Anon toggle
document.getElementById('anonToggle').addEventListener('click', function () {
  anonMode = !anonMode;
  this.classList.toggle('active', anonMode);
  document.getElementById('nameRow').style.display = anonMode ? 'none' : 'grid';
  updateProgress();
});

// Password visibility
document.getElementById('pwEye').addEventListener('click', () => togglePw('password', 'pwEye'));
document.getElementById('cpwEye').addEventListener('click', () => togglePw('confirmPassword', 'cpwEye'));

function togglePw(inputId, eyeId) {
  const input = document.getElementById(inputId);
  const eye = document.getElementById(eyeId);
  if (input.type === 'password') {
    input.type = 'text';
    eye.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    eye.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Password strength
document.getElementById('password').addEventListener('input', checkStrength);
function checkStrength() {
  const val = document.getElementById('password').value;
  const fill = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const levels = [
    { w: '25%', color: '#ef4444', text: 'Weak' },
    { w: '50%', color: '#f97316', text: 'Fair' },
    { w: '75%', color: '#eab308', text: 'Good' },
    { w: '100%', color: '#22c55e', text: 'Strong' },
  ];
  const lvl = levels[Math.max(0, score - 1)] || levels[0];
  fill.style.width = val ? lvl.w : '0';
  fill.style.background = lvl.color;
  label.textContent = val ? lvl.text : '';
  label.style.color = lvl.color;
  updateProgress();
}

// Field validation
['name', 'surname', 'email', 'confirmPassword', 'university'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => { validateField(id); updateProgress(); });
});

function validateField(id) {
  const el = document.getElementById(id);
  const err = document.getElementById(id + 'Err');
  if (!el) return true;
  let valid = true;
  if (id === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
  else if (id === 'confirmPassword') valid = el.value === document.getElementById('password').value;
  else if (id === 'university') valid = el.value !== '';
  else valid = el.value.trim().length > 0;
  el.classList.toggle('valid', valid && el.value !== '');
  el.classList.toggle('invalid', !valid && el.value !== '');
  if (err) err.classList.toggle('show', !valid && el.value !== '');
  return valid;
}

// Progress bar
function updateProgress() {
  const fields = anonMode
    ? ['email', 'university']
    : ['name', 'surname', 'email', 'university'];
  const pw = document.getElementById('password').value;
  let filled = fields.filter(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== '' && el.value !== '';
  }).length;
  if (pw) filled++;
  const total = fields.length + 1;
  document.getElementById('progressFill').style.width = (filled / total * 100) + '%';
}

// Form submission
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const fields = anonMode ? ['email', 'university'] : ['name', 'surname', 'email', 'university'];
  const allValid = fields.every(id => validateField(id));
  const pw = document.getElementById('password').value;
  const cpw = document.getElementById('confirmPassword').value;
  if (!allValid || !pw || pw !== cpw) {
    if (pw !== cpw) document.getElementById('confirmPasswordErr').classList.add('show');
    return;
  }
  const btn = this.querySelector('.submit-btn');
  btn.querySelector('.btn-text').textContent = 'Creating account...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('progressFill').style.width = '100%';
    // Show success overlay — redirect to login
    document.getElementById('successOverlay').classList.add('show');
  }, 1500);
});
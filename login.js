// MindCare Hub – Login Page JavaScript

// Password visibility toggle
document.getElementById('pwEye').addEventListener('click', function () {
  const input = document.getElementById('password');
  if (input.type === 'password') {
    input.type = 'text';
    this.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    this.classList.replace('fa-eye-slash', 'fa-eye');
  }
});

// Social login buttons → go to dashboard
document.getElementById('googleBtn').addEventListener('click', function () {
  this.textContent = 'Connecting...';
  this.disabled = true;
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
});

document.getElementById('microsoftBtn').addEventListener('click', function () {
  this.textContent = 'Connecting...';
  this.disabled = true;
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
});

// Login form submission → goes to dashboard
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMsg');
  const btn = document.getElementById('loginBtn');
  const spinner = document.getElementById('spinner');

  // Basic validation
  if (!email || !password) {
    document.getElementById('errorText').textContent = 'Please enter your email and password.';
    errorMsg.classList.add('show');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('errorText').textContent = 'Please enter a valid email address.';
    errorMsg.classList.add('show');
    return;
  }

  errorMsg.classList.remove('show');
  btn.querySelector('span').textContent = 'Signing in...';
  spinner.style.display = 'block';
  btn.disabled = true;

  setTimeout(() => {
    spinner.style.display = 'none';
    btn.querySelector('span').textContent = '✅ Signed In!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    // ✅ Redirect to dashboard after login
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
  }, 1800);
});
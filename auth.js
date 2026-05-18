/* ============================================================
   AUTHENTICATION SYSTEM (No Database - LocalStorage)
============================================================ */

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('pchaven_theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('pchaven_theme', target);
  updateThemeIcon(target);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'light') {
    icon.className = 'bi bi-sun-fill';
  } else {
    icon.className = 'bi bi-moon-stars-fill';
  }
}

// Tab switching
function switchTab(tab) {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  
  tabs.forEach(t => t.classList.remove('active'));
  forms.forEach(f => f.classList.remove('active'));
  
  if (tab === 'login') {
    tabs[0].classList.add('active');
    document.getElementById('loginForm').classList.add('active');
  } else {
    tabs[1].classList.add('active');
    document.getElementById('registerForm').classList.add('active');
  }
  
  hideAlert();
}

// Alert system
function showAlert(message, type = 'error') {
  const alertBox = document.getElementById('alertMessage');
  alertBox.textContent = message;
  alertBox.className = `alert-message alert-${type} show`;
  
  setTimeout(() => {
    hideAlert();
  }, 5000);
}

function hideAlert() {
  const alertBox = document.getElementById('alertMessage');
  alertBox.classList.remove('show');
}

// Password strength checker
const registerPassword = document.getElementById('registerPassword');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

registerPassword.addEventListener('input', (e) => {
  const password = e.target.value;
  const strength = checkPasswordStrength(password);
  
  strengthFill.className = 'strength-fill';
  
  if (password.length === 0) {
    strengthFill.style.width = '0%';
    strengthText.textContent = 'Password strength';
    strengthText.className = 'text-muted';
  } else if (strength.score === 1) {
    strengthFill.classList.add('strength-weak');
    strengthText.textContent = 'Weak password';
    strengthText.className = 'text-danger';
  } else if (strength.score === 2) {
    strengthFill.classList.add('strength-medium');
    strengthText.textContent = 'Medium password';
    strengthText.className = 'text-warning';
  } else {
    strengthFill.classList.add('strength-strong');
    strengthText.textContent = 'Strong password';
    strengthText.className = 'text-success';
  }
});

function checkPasswordStrength(password) {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;
  
  return {
    score: Math.min(Math.floor(score / 2), 3)
  };
}

// Get all registered users
function getUsers() {
  const users = localStorage.getItem('pchaven_users');
  return users ? JSON.parse(users) : [];
}

// Save users
function saveUsers(users) {
  localStorage.setItem('pchaven_users', JSON.stringify(users));
}

// Check if email exists
function emailExists(email) {
  const users = getUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Register form handler
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  // Validation
  if (name.length < 2) {
    showAlert('Please enter a valid name (at least 2 characters)', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showAlert('Please enter a valid email address', 'error');
    return;
  }
  
  if (password.length < 6) {
    showAlert('Password must be at least 6 characters long', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showAlert('Passwords do not match', 'error');
    return;
  }
  
  // Check if email already exists
  if (emailExists(email)) {
    showAlert('An account with this email already exists', 'error');
    return;
  }
  
  // Create new user
  const users = getUsers();
  const newUser = {
    id: Date.now().toString(),
    name: name,
    email: email,
    password: btoa(password), // Simple encoding (not secure, but no database)
    createdAt: new Date().toISOString(),
    builds: [],
    orders: []
  };
  
  users.push(newUser);
  saveUsers(users);
  
  showAlert('Account created successfully! Please login.', 'success');
  
  // Clear form
  document.getElementById('registerForm').reset();
  strengthFill.style.width = '0%';
  strengthText.textContent = 'Password strength';
  strengthText.className = 'text-muted';
  
  // Switch to login tab after 2 seconds
  setTimeout(() => {
    switchTab('login');
    document.getElementById('loginEmail').value = email;
  }, 2000);
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  // Validation
  if (!isValidEmail(email)) {
    showAlert('Please enter a valid email address', 'error');
    return;
  }
  
  if (password.length === 0) {
    showAlert('Please enter your password', 'error');
    return;
  }
  
  // Find user
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    showAlert('No account found with this email. Please register first.', 'error');
    return;
  }
  
  // Check password
  if (atob(user.password) !== password) {
    showAlert('Incorrect password. Please try again.', 'error');
    return;
  }
  
  // Login successful
  const session = {
    userId: user.id,
    name: user.name,
    email: user.email,
    loggedIn: true,
    loginTime: new Date().toISOString()
  };
  
  localStorage.setItem('pchaven_session', JSON.stringify(session));
  
  if (rememberMe) {
    localStorage.setItem('pchaven_remember', 'true');
  }
  
  showAlert(`Welcome back, ${user.name}!`, 'success');
  
  // Redirect to main page after 1 second
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 1000);
});

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
  const session = localStorage.getItem('pchaven_session');
  if (session) {
    const user = JSON.parse(session);
    if (user.loggedIn) {
      // User is already logged in, redirect to main page
      window.location.href = 'home.html';
    }
  }
});

// Password visibility toggle
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(inputId + '-icon');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'bi bi-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'bi bi-eye';
  }
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // ডেমো ইউজার: admin / 1234
  if (username === 'admin' && password === '1234') {
    document.querySelector('.login-form').classList.add('hidden');
    document.querySelector('.dashboard').classList.remove('hidden');
  } else {
    alert('ভুল ইউজারনেম বা পাসওয়ার্ড!');
  }
}
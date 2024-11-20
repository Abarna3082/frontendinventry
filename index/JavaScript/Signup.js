
document.getElementById('signupForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  const encodedPassword = btoa(password);
  try {
    const response = await fetch('http://localhost:8080/inventry/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: encodedPassword })
    });

    if (response.ok) {
      alert('Signup successful!');
      window.location.href = '../Html/Login.html';
    } else {
      const error = await response.text();
      alert(`Signup failed: ${error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during signup.');
  }
});


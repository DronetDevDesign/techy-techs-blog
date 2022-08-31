function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then( res => {
      return res.json()
    })
    .then( data => {
      if (data.id) {
        window.location.replace('/')
      } else {
        alert('Inavlid login, please try again');
      }
    })
    .catch(error => {
      alert(error.message);
    })
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
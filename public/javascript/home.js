const toggle = () => {
  document.getElementById('post-form').style.display = 'block';
}

document.querySelector('#new-post').addEventListener('click', toggle);
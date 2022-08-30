const updateDelete= document.querySelector('#update-delete');

updateDelete.addEventListener('click', function(){
  const postId = updateDelete.getAttribute('post_id')
  fetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  }).then(res => {
    window.location = '/dashboard'
  }).catch(err => {
    console.error(err);
  })
})
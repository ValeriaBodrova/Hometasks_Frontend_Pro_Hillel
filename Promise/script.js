function fetchPostById(postId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Post not found');
          }
          return response.json();
        })  
  }

  function fetchCommentsByPostId(postId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Comments not found');
          }
          return response.json();
        })
  }

  function searchPost() {
    const postId = document.getElementById('postId').value;
    if (postId >= 1 && postId <= 100) {
      fetchPostById(postId)
        .then(post => {
          const postContainer = document.getElementById('postContainer');
          postContainer.innerHTML = `
            <h2>Post ID: ${post.id}</h2>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
          `;
        })
        .catch(error => alert(error.message));
    } else {
      alert('Invalid Post ID. Please enter a number between 1 and 100.');
    }
  }

  function getComments() {
    const postId = document.getElementById('postId').value;
    if (postId >= 1 && postId <= 100) {
      fetchCommentsByPostId(postId)
        .then(comments => {
          const postContainer = document.getElementById('postContainer');
          const commentsList = comments.map(comment => `<li>${comment.body}</li>`).join('');
          postContainer.innerHTML += `
            <h3>Comments:</h3>
            <ul>${commentsList}</ul>
          `;
        })
        .catch(error => alert(error.message));
    } else {
      alert('Invalid Post ID. Please enter a number between 1 and 100.');
    }
  }
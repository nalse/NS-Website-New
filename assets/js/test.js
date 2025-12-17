const postsContainer = document.querySelector('.posts');

fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((posts) => {
        const firstPosts = posts.slice(0, 10);

        postsContainer.innerHTML = '';

        firstPosts.forEach((post) => {
            const postEl = document.createElement('div');
            postEl.classList.add('post');

            postEl.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <p class="post-body">${post.body}</p>
      `;
            postsContainer.appendChild(postEl);
        });
    })
    .catch((err) => {
        console.error('Postları çəkərkən xəta oldu:', err);
        postsContainer.innerHTML = '<p>Data yüklənmədi...</p>';
    });

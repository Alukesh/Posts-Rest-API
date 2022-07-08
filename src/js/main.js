const postsList = document.querySelector('.postList');
const postsOnPage = 4;
const pagination = document.querySelector('#pagination');
let posts ;
let authors;


const getPosts = async () =>{
   await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
        return res.json()
    }).then(data => posts = data);
    await fetch('https://jsonplaceholder.typicode.com/users').then(res => {
        return res.json()
    }).then(data => authors = data);


     for (let i = 1; i <= posts.length / postsOnPage; i++){
         pagination.innerHTML += `
          <li class="pagination-btn">${i}</li>
         `;

         const paginationBtn = document.querySelectorAll('li');
         paginationBtn.forEach(item => item.addEventListener('click' , (e) =>{
             paginationBtn.forEach(el => {
                 el.classList.remove('active')
             });
         item.classList.add('active');

         const pageNum = e.target.innerHTML;
         let start = (pageNum - 1) * postsOnPage;
         let end = start + postsOnPage;
         const postPage = posts.slice(start, end);
         postsList.innerHTML = '';

         postPage.map(post =>{
             const a = document.createElement('a');
             a.addEventListener( 'click', () => {
                 localStorage.setItem('authorId', post.userId);
                 localStorage.setItem('postId', post.id)
             });
             a.setAttribute('href', './post.html');
             a.classList.add('postBlock');
             a.innerHTML = `
            <h2>${post.title}</h2>
            <h3>${authors.filter(user => user.id === post.userId)[0].name}</h3>
            `;

             postsList.append(a)
         });
        } ))




    }


     posts.slice(0, postsOnPage).map(post =>{
        let a = document.createElement('a');
        a.innerHTML = `
        <h2>${post.title}</h2>
        <h3>${authors.filter(user => user.id === post.userId)[0].name}</h3>
        `;
        a.addEventListener( 'click', () => {
            localStorage.setItem('authorId', post.userId);
            localStorage.setItem('postId', post.id)
        });
        a.setAttribute('href', './post.html');
        a.classList.add('postBlock');
        postsList.append(a)

      // const title = document.createElement('h2');
      // title.textContent = post.title;
      // const author = document.createElement('h3');
      // author.textContent = authors.filter(user => user.id === post.userId)[0].name;
      // a.append(title, author);
      // postsList.append(a)

        // console.log(authors.filter(user =>{ return   user.id === post.userId}))
  });

};
getPosts();





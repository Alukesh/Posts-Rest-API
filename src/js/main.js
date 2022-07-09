const postsList = document.querySelector('.postList');
const postsOnPage = 4;
const pagination = document.querySelector('#pagination');
const form = document.querySelector('.header-under__form');
let posts = [];
let searchPosts = [];

let authors;
let showPosts = (arr) =>{
    arr.slice(0, postsOnPage).map(post =>{
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
};


const getPosts = async () =>{
   await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
        return res.json()
    }).then(data => posts = data);
    await fetch('https://jsonplaceholder.typicode.com/users').then(res => {
        return res.json()
    }).then(data => authors = data);



    let showPagination = (arr) =>{
        pagination.innerHTML = '';
        for (let i = 1; i <= Math.ceil(arr.length / postsOnPage);  i++){
            pagination.innerHTML += `
          <li class="pagination-btn">${i}</li>
         `;
            const paginationBtn = document.querySelectorAll('.pagination-btn');
            paginationBtn.forEach(item => item.addEventListener('click' , (e) =>{
                paginationBtn.forEach(el => el.classList.remove('active'));
                item.classList.add('active');

                postsList.innerHTML = '';
                const pageNum = e.target.innerHTML;
                let start = (pageNum - 1) * postsOnPage;
                let end = start + postsOnPage;
                const postPage = arr.slice(start, end);

                showPosts(postPage);
            } ))

        }
    };
    showPagination(posts);


    console.log(form[0])
    form[0].addEventListener('keyup' , (e) =>{
        e.preventDefault();
        let search = e.target.value.toLowerCase().trim();
        console.log(search);
        // console.log(authors.filter(user => user.name.toLowerCase().startsWith(search)));
        console.log(authors.filter(user => console.log(user.name.toLowerCase().split(' ').filter(part =>
            part.startsWith(search)
        ))));
        // console.log(authors.filter(user => user.name.toLowerCase().split(' ').filter(part =>{
        //     part.startsWith(search)
        // }).join()));
    // || authors.filter(user => user.name === search)[0].id === item.userId
         searchPosts = posts.filter(item => item.title.startsWith(search) || item.body.startsWith(search) || authors.filter(user => user.name.toLowerCase().split(' ').filter(part =>
             part.startsWith(search)
         ).join().startsWith(search))[0]?.id === item.userId);


         if (!searchPosts.length){
             return  postsList.innerHTML = `
             <h1>There is no such post</h1>
             `;
         }
        // console.log(searchPosts);
        postsList.innerHTML = '';
        showPosts(searchPosts);
        showPagination(searchPosts)
    });



     showPosts(posts)
      // const title = document.createElement('h2');
      // title.textContent = post.title;
      // const author = document.createElement('h3');
      // author.textContent = authors.filter(user => user.id === post.userId)[0].name;
      // a.append(title, author);
      // postsList.append(a)

        // console.log(authors.filter(user =>{ return   user.id === post.userId}))

};
getPosts();





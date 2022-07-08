const postsList = document.querySelector('.postList');
const postsOnPage = 4;
const pagination = document.querySelectorAll('#pagination li');
let posts ;
let authors;


const getPosts = async () =>{
   await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
        return res.json()
    }).then(data => posts = data);
    await fetch('https://jsonplaceholder.typicode.com/users').then(res => {
        return res.json()
    }).then(data => authors = data);

    await pagination.forEach(item => item.addEventListener('click', (e) =>{
        const pageNum = e.target.innerHTML;

        let start = pageNum * postsOnPage - pageNum;
        let end = start + postsOnPage;
        const postPage = posts.slice(start, end);
        postsList.innerHTML = '';


         postPage.map(post =>{
            const div = document.createElement('div');
            const title = document.createElement('h2');
            title.textContent = post.title;
            const author = document.createElement('h3');
            author.textContent = authors.filter(user => user.id === post.userId)[0].name;
            div.append(title, author);
            postsList.append(div)
        });
    }) );

    await posts.slice(0, 4).map(post =>{
      const div = document.createElement('div');
      const title = document.createElement('h2');
      title.textContent = post.title;
      const author = document.createElement('h3');
      author.textContent = authors.filter(user => user.id === post.userId)[0].name;
      div.append(title, author);
      postsList.append(div)
        // console.log(authors.filter(user =>{ return   user.id === post.userId}))
  });

};
getPosts();





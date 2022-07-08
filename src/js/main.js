const postsList = document.querySelector('.postList');

let posts ;
let authors;
const getPosts = async () =>{
   await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
        return res.json()
    }).then(data => posts = data);
    await fetch('https://jsonplaceholder.typicode.com/users').then(res => {
        return res.json()
    }).then(data => authors = data);


const listParent = document.createElement('div');
  await posts.map(post =>{
      const div = document.createElement('div');
      const title = document.createElement('h2');
      title.textContent = post.title;
      const author = document.createElement('h3');
      author.textContent = authors.filter(user => user.id === post.userId)[0].name;
      div.append(title, author);
      listParent.append(div);
      // console.log(authors.filter(user =>{ return   user.id === post.userId}))
  });
  postsList.append(listParent);




};
getPosts();



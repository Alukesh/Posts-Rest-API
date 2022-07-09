const authorId = localStorage.getItem('authorId');
const postId = localStorage.getItem('postId');
const postPage = document.querySelector('.postPage');
// console.log(authorId)
// console.log(postId)
let post ;
let author ;


const getPost = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res =>  res.json()
    ).then(data => post = data);
    await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`).then(res =>  res.json()
    ).then(data => author = data);
    console.log(author);
    console.log(post);


    postPage.innerHTML = `
        <h3>
            ${author.name}
            <span>company:${author.company.name}</span>
        </h3>
        <p>${author.company.bs}</p>
        <h2>title:${post.title}</h2>
        <h3>body:${post.body}</h3>
        <p>${author.website}</p>
        <p>${author.phone}</p>
    `



};
getPost();
const authorId = localStorage.getItem('authorId');
const postId = localStorage.getItem('postId');
const postPage = document.querySelector('.postPage');
const form = document.querySelector('.header-under__form');
const postsList = document.querySelector('.postList');
let posts = [];
let searchPosts = [];
const redact = document.querySelector('.top-pen');//redact click func at the very bottom
const deleteBtn = document.querySelector('.top-del');
let post ;
let author ;

const showPosts = (arr) =>{
    postsList.innerHTML = '';
  arr.forEach(post => {
      const div = document.createElement('div');
      div.classList.add('postBlock');
      div.addEventListener( 'click', () => {
          localStorage.setItem('authorId', post.userId);
          localStorage.setItem('postId', post.id)
      });
      const pen = document.createElement('img');
      pen.classList.add('postBlock-pen');
      pen.setAttribute('src', "https://img.icons8.com/fluency/48/000000/pen.png");
      pen.addEventListener('click' , () => alert('ho'));
      const delBtn = document.createElement('div');
      delBtn.innerText = 'delete';
      delBtn.addEventListener('click', () =>{})
      div.innerHTML = `
            <a class="postBlock-link" href="./post.html">
                <h2>${post.title}</h2>
                <h3>${authors.filter(user => user.id === post.userId)[0].name}</h3>
            </a>
            `;
      div.append(pen);
      div.append(delBtn);
      postsList.append(div)

  })
};



const searchForm = async () =>{
    await fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
        return res.json()
    }).then(data => posts = data).catch(err => console.log(err));
    await fetch('https://jsonplaceholder.typicode.com/users').then(res => {
        return res.json()
    }).then(data => authors = data).catch(err => console.log(err));


    form.addEventListener('submit', (e) => e.preventDefault() );
    form[0].addEventListener('keyup' , (e) =>{
        let search = e.target.value.toLowerCase().trim();
        searchPosts = posts.filter(item => item.title.startsWith(search) || item.body.startsWith(search) || authors.filter(user => user.name.toLowerCase().split(' ').filter(part =>
            part.startsWith(search)
        ).join().startsWith(search))[0]?.id === item.userId);
        postsList.innerHTML = '';
        search.length ?
        showPosts(searchPosts) : ''
    });
};
searchForm();



const savePost = () =>{
    const title = document.querySelector('#input-title');
    const body = document.querySelector('#input-body');
    console.log(title)
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
            title: title.value,
            body: body.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => alert('change status' + response.status))
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(err => console.log(err));
    // alert('kl');
    getPost('default');
};
const deletePost = (id) =>{
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    }).then(res => alert(`post${id} delete status :${res.status}`)).catch(err => console.log(err));
};




const getPost = async (mode) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res =>  res.json()
    ).then(data => post = data);
    await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`).then(res =>  res.json()
    ).then(data => author = data);
    console.log(post);

    if (mode === 'redact'){
        const save = document.createElement('button');
        save.textContent = 'Save';
        save.classList.add('postPage-save');
        save.addEventListener('click', () =>savePost());
        postPage.innerHTML = `
        <div class="postPage-left">
         <textarea id="input-title" class="postPage-left__textarea" cols="30" rows="10">${post.title}</textarea>
                <h2 class="postPage-title postPage-left-title">${post.title}</h2>
                <textarea id="input-body" class="postPage-left__textarea" cols="30" rows="10">${post.body}</textarea>
                <h3 class="postPage-left-text">${post.body}</h3>
        </div>
        <div class="postPage-right">
            <h3 class="">author</h3>
            <h3 class="postPage-right-title">
                ${author.name}
                 <span>company:${author.company.name}</span>
            </h3>
            <p class="postPage-right-job">${author.company.bs}</p>
            <p class="postPage-right-site">${author.website}</p>
            <p class="postPage-right-phone">${author.phone}</p>
        </div>
    `;
        postPage.append(save)
    } else {
        postPage.innerHTML = `
        <div class="postPage-left">
                <h2 class="postPage-title postPage-left-title">${post.title}</h2>
                <h3 class="postPage-left-text">${post.body}</h3>
        </div>
        <div class="postPage-right">
            <h3 class="">author</h3>
            <h3 class="postPage-right-title">
                 ${author.name}
                 <span>company:${author.company.name}</span>
            </h3>
            <p class="postPage-right-job">${author.company.bs}</p>
            <p class="postPage-right-site">${author.website}</p>
            <p class="postPage-right-phone">${author.phone}</p>
        </div>
    `
    }




};
getPost('default');
redact.addEventListener('click' , () => getPost('redact'));
deleteBtn.addEventListener('click', () => deletePost(post.id))

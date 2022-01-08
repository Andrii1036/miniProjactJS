let prevPage = document.getElementById('prevPage');
let prevUrl = localStorage.getItem('backUrl');
let postInfo = JSON.parse(new URL(location.href).searchParams.get('data'));
let post = document.getElementsByClassName('post')[0];
let postTitle = document.getElementsByClassName('post_title')[0];
let postIdRow = document.getElementsByClassName('post_ids')[0];
let userId = document.getElementsByClassName('id')[0];
let postId = document.getElementsByClassName('id')[1];
let postBody = document.getElementsByClassName('post_body')[0];
let commentsEndpoint = `https://jsonplaceholder.typicode.com/posts/${postInfo.id}/comments`;
let commentsContainer = document.getElementsByClassName('comments_container')[0];
let brToremove = postBody.getElementsByTagName('br');

prevPage.href = prevUrl;

postTitle.innerText = `${postInfo.title.toUpperCase()}`;
userId.innerText = `user : #${postInfo.userId}`;
postId.innerText = `post : #${postInfo.id}`;
postBody.innerText = postInfo.body;

while (brToremove.length) {
    for (let item of brToremove) {
        item.remove()
    }
};

let createCommentCard = (comments) => {
    for (let comment of comments) {
        let card = document.createElement('div');
        card.className = 'comments_item'
        let id = document.createElement('p');
        id.className = 'item_id';
        let name = document.createElement('h3');
        let email = document.createElement('p');
        let emailLink = document.createElement('a');
        let body = document.createElement('p');
        body.className = 'item_body';

        emailLink.href = `mailto:${comment.email}`;

        id.innerText = `#: ${comment.id}`;
        name.innerText = comment.name.toUpperCase();
        emailLink.innerText = `\u{1F582} ${comment.email}`;
        body.innerText = comment.body;

        email.appendChild(emailLink);
        card.append(id, name, email, body);
        commentsContainer.appendChild(card);

        let brToremove = body.getElementsByTagName('br');
        while (brToremove.length) {
            for (let item of brToremove) {
                item.remove()
            }
        };
    }
}

fetch(commentsEndpoint)
    .then((response) => response.json())
    .then((data) => {
        createCommentCard(data)
    });
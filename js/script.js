let usersEndpoint = 'https://jsonplaceholder.typicode.com/users';
let counter = document.getElementById('counter');
let usersContainer = document.getElementById('users');
let mainDiv = document.getElementById('users');
let movedPictuer = document.getElementById('moveBackground');

mainDiv.addEventListener('mousemove', e => {
    let deg = e.x;
    movedPictuer.style.cssText = ` transform: rotateZ(${(360/deg)*10}deg);`
});

fetch(usersEndpoint)
    .then((response) => response.json())
    .then((data) => {
        counter.innerText = `${data.length} users`
        for (let item of data) {
            createUserCard(item)
        };
    })
    .catch(() => {
        counter.innerText = '0 users';
        usersContainer.innerText = 'Щось пішло не так'
    });

function createUserCard(user) {
    let userCard = document.createElement('div');
    let userPhoto = document.createElement('div');
    let userName = document.createElement('p');
    let userId = document.createElement('p');
    let userinfoContainer = document.createElement('div');
    let detailsLink = document.createElement('a');
    let linkTxt = document.createElement('p');

    userCard.className = 'user';
    userPhoto.className = 'user_photo';
    userName.className = 'user_title';
    userId.className = 'user_subTitle';
    linkTxt.className = 'user_details';

    detailsLink.href = `user-details.html?data${JSON.stringify(user)}`

    userName.innerText = `${user.name}`;
    userId.innerText = `ID : ${user.id}`;
    linkTxt.innerText = 'My profile';

    userinfoContainer.append(userPhoto, userName, userId);
    detailsLink.appendChild(linkTxt);
    userCard.append(userinfoContainer, detailsLink)
    usersContainer.appendChild(userCard)
};
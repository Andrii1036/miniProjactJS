let userInfo = JSON.parse(new URL(location.href).searchParams.get('data'));
let userURL = location.href;
localStorage.setItem('backUrl', userURL);
let userId = userInfo.id;
let postsEndpoint = `https://jsonplaceholder.typicode.com/users/${userId}/posts`
let userPhoto = document.getElementById('photo');
let userPhotoHeigth = document.getElementsByClassName('user_photo')[0].clientWidth;
let title = document.getElementsByClassName('user_title')[0];
let infoAboutUser = document.getElementsByClassName('user_info')[0];
let userContacts = document.getElementsByClassName('user_contacts')[0];
let userEmail = document.getElementsByClassName('user_contacts-email')[0];
let userPhone = document.getElementsByClassName('user_contacts-phone')[0];
let userName = document.getElementsByClassName('user_contacts-userName')[0];
let userWeb = document.getElementsByClassName('user_contacts-web')[0];
let userPhoneNumber = userInfo.phone.replaceAll(/[^\d]/g, '');
let userButton = document.getElementsByClassName('user_button')[0];
let postsContainer = document.getElementsByClassName('posts')[0];

userPhoto.style.height = `${userPhotoHeigth}px`;

userEmail.href = `mailto:${userInfo.email}`;
userPhone.href = `tel:+${userPhoneNumber}`;
userWeb.href = `#`;

title.innerText = `${userInfo.name} #${userInfo.id}`;
userName.innerText = `"${userInfo.username}"`;
userEmail.innerText = `email : ${userInfo.email}`;
userPhone.innerText = `phone : ${userInfo.phone}`;
userWeb.innerText = `website : ${userInfo.website}`;

let findKeyAndValue = (data, key) => {
    let row = document.createElement('div');
    row.className = 'user_info-row'
    let keyContainer = document.createElement('div');
    keyContainer.className = 'row_key';
    let valueContainer = document.createElement('div');
    keyContainer.innerText = `${key} : `;

    if (typeof data === 'object') {
        for (let key in data) {
            valueContainer.append(findKeyAndValue(data[key], key));
        }
    } else {
        valueContainer.innerText = data;
    };

    row.append(keyContainer, valueContainer);
    infoAboutUser.appendChild(row);

    return row;
};

for (let key in userInfo) {
    if (key === 'id' || key === 'name' || key === 'username' || key === 'email' || key === 'phone' || key === 'website') {
        continue;
    } else {
        findKeyAndValue(userInfo[key], key)
    };
};

let showPosts = (data) => {
    for (let post of data) {
        let postTitle = document.createElement('p');
        let postButton = document.createElement('p');
        let postLink = document.createElement('a');

        postLink.href = `post-details.html?data=${JSON.stringify(post)}`

        postButton.className = 'posts_item-button';
        postTitle.className = 'posts_item';

        postLink.innerText = 'more information';
        postTitle.innerText = post.title;

        postButton.appendChild(postLink);
        postTitle.appendChild(postButton);
        postsContainer.appendChild(postTitle);
    }
}

let findAllPosts = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((value) => {
            showPosts(value)
        })
};

userButton.addEventListener('click', function() {
    postsContainer.innerText = '';
    findAllPosts(postsEndpoint);
});
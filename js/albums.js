const updateList = () => {
    ajaxRequest('GET', urls.albums)
        .then((response) => {
            section.innerHTML = '';
            const albums = JSON.parse(response);
            albums.map(album => {
                if (select.value === "albums" || select.value.toString() === album.userId.toString()) {
                    addNewElement(album);
                }
            });
        })
};

const addNewElement = (album) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add("card");
    console.log(JSON.stringify(album));

    let ourThumbnailUrl = null;
    const cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.setAttribute("alt", album.title);
    ajaxRequest("GET", urls.albums + album.id + "/photos")
        .then((response) => {
            const photos = JSON.parse(response);
            ourThumbnailUrl = photos[0].thumbnailUrl;
            cardImg.setAttribute("src", ourThumbnailUrl);
        });

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    ajaxRequest("GET", urls.users + album.userId)
        .then((response) => {
            const user = JSON.parse(response);
            cardText.innerHTML = "by " + user.name;
            let i = 0;
            let selectFilter = document.querySelector("select");
            while (i < selectFilter.length) {
                if ((selectFilter.options[i].value === user.id.toString())) {
                    break;
                }
                i++;
            }
            if (i === selectFilter.length) {
                const opt = document.createElement("option");
                opt.value = user.id.toString();
                opt.label = user.id + " - " + user.name;
                selectFilter.appendChild(opt);
                selectFilter.ordered;
            }
        });

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("d-flex");
    cardBody.classList.add("flex-column");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = album.title;
    const cardExternalLink = document.createElement("a");
    cardExternalLink.classList.add("btn");
    cardExternalLink.classList.add("btn-primary");
    cardExternalLink.classList.add("mt-auto");
    cardExternalLink.innerHTML = "Check it out!";
    cardExternalLink.href = "#";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardExternalLink);
    cardItem.appendChild(cardImg);
    cardItem.appendChild(cardBody);

    if (album.title === '') {
        alert('Incorrect data - Title cannot be empty!');
    } else {
        document.getElementById('albumList').appendChild(cardItem);
    }

    const hideSpan = document.createElement('span');
    hideSpan.innerHTML = "X";
    hideSpan.className = 'hide';
    cardItem.lastElementChild.appendChild(hideSpan);

    for (let i = 0; i < hide.length; i++) {
        hide[i].onclick = function () {
            this.parentElement.parentElement.remove();
        }
    }
};

updateList();

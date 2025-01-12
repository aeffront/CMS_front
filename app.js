import { getData } from './firebase.js';

const items = document.getElementById('items');
const projectsButton = document.getElementById('section-nav-items');
const aboutButton = document.getElementById('section-nav-about');
const sections = document.getElementsByClassName('section');

let currentSection = 'items';
let objects = [];
let selection;

document.querySelector('h1').addEventListener('click', () => {
    selection = null;
    update();
});

class Member {
    constructor(id, member_name, member_position) {
        this.id = id;
        this.member_name = member_name;
        this.member_position = member_position;
    }

    build() {
        const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id', this.id);

        const title = document.createElement('h2');
        title.innerHTML = this.member_name;
        title.classList.add('item-title');

        const description = document.createElement('p');
        description.innerHTML = this.member_position;
        description.classList.add('item-description');

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('item-delete');
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this item?')) {
                deleteData(currentSection, this.id);
                setTimeout(update, 2000);
            }
        });

        item.appendChild(title);
        item.appendChild(description);
        item.appendChild(deleteButton);
        members.appendChild(item);
    }
}

class Item {
    constructor(id, project_name, project_description, links, colors) {
        this.id = id;
        this.project_name = project_name;
        this.project_description = project_description;
        this.links = links;
        this.colors = colors;
    }

    build() {
        const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id', this.id);

        const title = document.createElement('h2');
        title.innerHTML = this.project_name;
        title.classList.add('item-title');

        const description = document.createElement('p');
        description.innerHTML = this.project_description;
        description.classList.add('item-description');

        const images = document.createElement('div');
        images.classList.add('item-images');

        this.links.forEach((link) => {
            const type = link.type;
            const linkStr = link.url;

            if (type.includes("image")) {
                const image = document.createElement('img');
                image.src = linkStr;
                image.classList.add('item-image');
                images.appendChild(image);
                
            } else if (type.includes("video")) {
                const video = document.createElement('video');
                video.src = linkStr;
                video.classList.add('item-image');
                video.controls = false;
                video.setAttribute('autoplay', 'autoplay');
                video.setAttribute('loop', 'loop');
                video.muted = true;
                images.appendChild(video);
            }
        });

       

        title.addEventListener('click', () => {
            document.querySelectorAll('.item').forEach(item => {
                if (item !== title.parentElement) {
                    item.classList.add('closed');
                }
            });
            item.classList.toggle('closed');
        });

        this.container = document.createElement('div');
        this.container.classList.add('content');

        this.container.appendChild(images);
        this.container.appendChild(description);

        item.appendChild(title);
        item.appendChild(this.container);
        items.appendChild(item);

        images.addEventListener('click', () => {
            // Open a new tab with a URL containing the project's ID
            const projectUrl = `project.html?id=${this.id}`;

            
           window.open(projectUrl, '_blank');
            


        });

        if (this.colors) {
            const colorsDiv = document.createElement('div');
            colorsDiv.classList.add('item-colors');
            this.colors.forEach((color, i) => {
                if (color === 1) {
                    const avc = ["85C44F", "DA8600", "9B87CB", "A4A4A4"];
                    const colorDiv = document.createElement('div');
                    colorDiv.style.backgroundColor = avc[i];
                    colorDiv.setAttribute("id", i.toString());
                    colorDiv.classList.add('pastille');
                    colorsDiv.appendChild(colorDiv);
                    colorDiv.addEventListener('click', () => {
                        let pre = selection;
                        selection = i;
                        if (selection === pre) {
                            selection = null;
                        }
                        update();
                    });
                }
            });
            item.appendChild(colorsDiv);
        }

        item.classList.add('closed');
    }
}

function createItem(element) {
    if (selection && element.colors[selection] === 1) {
        const item = new Item(element.id, element.project_name, element.project_description, element.links, element.colors);
        item.build();
    } else if (!selection) {
        const item = new Item(element.id, element.project_name, element.project_description, element.links, element.colors);
        item.build();
    }
}

function createMember(element) {
    const member = new Member(element.id, element.member_name, element.member_position);
    member.build();
}

function clearItems(section) {
    document.getElementById(section).innerHTML = '';
}

function showItems(section) {
    if (section === 'members') {
        objects.forEach(createMember);
    } else if (section === 'items') {
        objects.forEach(createItem);
    }
}

function update() {
    objects = [];
    getData("items").then(data => {
        objects = data;
        objects.sort((b, a) => a.timestamp - b.timestamp);
        clearItems("items");
        showItems("items");
    });
}

window.onload = () => {
    update();
};

projectsButton.addEventListener('click', () => {
    Array.from(sections).forEach(section => section.style.display = 'none');
    document.getElementById('items-section').style.display = 'flex';
    currentSection = 'items';
});



aboutButton.addEventListener('click', () => {
    Array.from(sections).forEach(section => section.style.display = 'none');
    document.getElementById('about-section').style.display = 'flex';
});


export{Item};
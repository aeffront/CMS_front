import { getData } from './firebase.js';




// Parse the URL to extract query parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const projectId = urlParams.get('id');

const font = document.createElement('link');
font.setAttribute("rel", "stylesheet");
font.setAttribute("href", "https://fonts.googleapis.com/css2?family=Gabarito&display=swap");

document.head.appendChild(font);

const style = document.createElement('link');
style.setAttribute("rel", "stylesheet");
style.setAttribute("href", "CSS/project.css");
document.head.appendChild(style);

// Log or use the extracted ID
if (projectId) {
    console.log(`Project ID: ${projectId}`);
    // You can now use projectId to fetch data or perform other actions
} else {
    console.error("No project ID found in the URL");
}


if (projectId) {
    let project;
    getData(`items`).then(data => {
        project = data.find(item => item.id === projectId);
        if (project) {
            console.log('Project found:', project);
            buildPage(project)
        } else {
            console.error('Project not found');
        }
    });
} else {
    console.error("Cannot fetch data without a project ID");
}

function buildPage(project){
    const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id', project.id);

        const title = document.createElement('h2');
        title.innerHTML = project.project_name;
        title.classList.add('item-title');

        const description = document.createElement('p');
        description.innerHTML = project.project_description;
        description.classList.add('item-description');

        const images = document.createElement('div');
        images.classList.add('item-images');

        project.links.forEach((link) => {
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

        project.container = document.createElement('div');
        project.container.classList.add('content');

        project.container.appendChild(images);
        project.container.appendChild(description);

        item.appendChild(title);
        item.appendChild(project.container);
        document.body.appendChild(item);

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
import { getData } from './firebase.js';
import { Item } from './components/Item.js';

class App {
    constructor() {
        this.items = document.getElementById('items');
        this.projectsButton = document.getElementById('section-nav-items');
        this.aboutButton = document.getElementById('section-nav-about');
        this.sections = document.getElementsByClassName('section');
        this.currentSection = 'items';
        this.objects = [];
        this.selection = null;

        this.initializeEventListeners();
        this.update();
    }

    initializeEventListeners() {
        document.querySelector('h1').addEventListener('click', () => {
            this.selection = null;
            this.update();
        });

        this.projectsButton.addEventListener('click', () => this.showSection('items'));
        this.aboutButton.addEventListener('click', () => this.showSection('about'));
    }

    showSection(sectionName) {
        Array.from(this.sections).forEach(section => 
            section.style.display = section.id === `${sectionName}-section` ? 'flex' : 'none'
        );
        this.currentSection = sectionName;
    }

    async update() {
        try {
            const data = await getData("items");
            this.objects = data.sort((b, a) => a.timestamp - b.timestamp);
            this.clearItems();
            this.showItems();
        } catch (error) {
            console.error('Error updating items:', error);
        }
    }

    clearItems() {
        this.items.innerHTML = '';
    }

    showItems() {
        this.objects.forEach(element => {
            if (!this.selection || (this.selection && element.colors[this.selection] === 1)) {
                new Item(element, this.selection, () => this.update()).build();
            }
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => new App()); 
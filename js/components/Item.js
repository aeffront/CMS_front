export class Item {
    constructor(data, selection, updateCallback) {
        this.data = data;
        this.selection = selection;
        this.updateCallback = updateCallback;
    }

    build() {
        const item = this.createItemElement();
        this.appendContent(item);
        return item;
    }

    createItemElement() {
        const item = document.createElement('div');
        item.classList.add('item', 'closed');
        item.id = this.data.id;
        return item;
    }

    // ... rest of the Item class methods
} 
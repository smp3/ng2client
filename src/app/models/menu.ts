export class Menu {
    name: string;
    items: Array<MenuItem> = [];

    constructor(name) {
        this.name  = name;
    }

    addItem(item: MenuItem) {
        this.items.push(item);
        return this;
    }
}

export class MenuItem {
    title: string;
    action: string;
    actionType: string;
    
    constructor(title, action, actionType='url') {
        this.title = title;
        this.action = action;
        this.actionType = actionType;
    }
}
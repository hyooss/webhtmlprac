export class Subject
{

    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        if(!observer || typeof observer.update !== 'function') {
            throw new Error("Observer must implement an update method");
        }
        // Check if the observer is already added
        if (this.observers.includes(observer)) {
            return; // Observer already exists, no need to add again
        }
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(data) {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }

    clearObservers() {
        this.observers = [];
    }

    getObservers() {
        return this.observers;
    }
}


export class Observer {
    constructor(element) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error("Observer must be initialized with a valid HTML element");
        }
        this.element = element;

    }
}



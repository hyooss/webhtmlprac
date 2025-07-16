// 옵저버 패턴 기본
export class Subject {
    constructor() { this.observers = []; }
    addObserver(observer) {
        if (!observer || typeof observer.update !== 'function') {
            throw new Error("Observer must implement update(state)");
        }
        this.observers.push(observer);
        // 등록 즉시 초기 상태를 렌더링
        if (this.getState) observer.update(this.getState());
    }
    notifyObservers(data) {
        this.observers.forEach(obs => obs.update(data));
    }

    getIterator()
    {
        return new Iterator(this.observers);
    }
}
export class Observer {
    constructor(element) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error("Observer needs an HTMLElement");
        }
        this.element = element;
    }
}

export class Iterator {
    constructor(subject) {
        if (!(subject instanceof Subject)) {
            throw new Error("Iterator needs a Subject instance");
        }
        this.subject = subject;
        this.index = 0;
    }
    prev(){
        if (this.index > 0) {
            return { value: this.subject.observers[--this.index], done: false };
        } else {
            return { done: true };
        }
    }

    next() {
        if (this.index < this.subject.observers.length) {
            return { value: this.subject.observers[this.index++], done: false };
        } else {
            return { done: true };
        }
    }

    to(idx) {
        if (idx < 0 || idx >= this.subject.observers.length) {
            throw new Error("Index out of bounds");
        }
        this.index = idx;
        return { value: this.subject.observers[this.index], done: false };
    }

    reset() {
        this.index = 0;
    }

}

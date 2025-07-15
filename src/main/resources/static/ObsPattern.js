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
}
export class Observer {
    constructor(element) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error("Observer needs an HTMLElement");
        }
        this.element = element;
    }
}

export interface ComponentCreator {
    createAndMountComponent(component: any) : HTMLElement;
}

export class Library {
    private componentFactory: ComponentCreator;

    constructor(componentFactory: ComponentCreator) {
        this.componentFactory = componentFactory;
    }

    removeComponent(component:any): void {
    }

    displayComponent(component:any): void {
        const htmlElement = this.componentFactory.createAndMountComponent(component);
        document.body.appendChild(htmlElement)
    }
}

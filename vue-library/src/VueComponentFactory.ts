import {createApp, defineComponent} from 'vue';
import {AgGridVue} from './AgGridVue';
import {ComponentCreator} from "js-library";

export class VueComponentFactory implements ComponentCreator {
    private parent: AgGridVue;
    private plugins: any[];

    constructor(parent: AgGridVue, plugins: any[]) {
        this.parent = parent;
        this.plugins = plugins;
    }

    private getComponentDefinition(component: any) {
        let componentDefinition = (this as any).parent.$parent.$options.components[component];
        return {extends: defineComponent(componentDefinition)};
    }

    public createAndMountComponent(component: any): HTMLElement {
        const componentDefinition = this.getComponentDefinition(component);

        const container = document.createElement('div');
        const mountedComponent = createApp(componentDefinition)

        // try add plugins...
        this.plugins.forEach(plugin => mountedComponent.use(plugin));

        // warnings will be thrown here...
        /*
        [Vue warn]: Invalid VNode type: Symbol(Text) (symbol)
            at <RouterLink to="/about" >
            at <App>
        */
        mountedComponent.mount(container);

        // if mounting worked we'd return something useful here
        return null as any;
    }
}

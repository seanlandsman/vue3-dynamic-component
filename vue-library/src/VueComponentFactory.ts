import {createApp, h, render, defineComponent, getCurrentInstance} from 'vue';
import {Vue} from 'vue-class-component';
import {AgGridVue} from './AgGridVue';
import {ComponentCreator} from "js-library";

export class VueComponentFactory implements ComponentCreator {
    private parent: AgGridVue;

    constructor(parent: AgGridVue) {
        this.parent = parent;
    }

    private tryC(componentDefinition: any) {
        try {
            let componentInstance: any = null;
            const extendedComponentDefinition = defineComponent({
                ...componentDefinition,
                created() { // note: function - don't use arrow functions here (for the correct "this" to be used)
                    componentInstance = (this as any).$root;
                    if (componentDefinition.created) {
                        componentDefinition.created.bind(this)();
                    }
                }
            });

            const container = document.createElement('div');
            const mountedComponent = createApp(extendedComponentDefinition)
            mountedComponent.mount(container);

            console.log(componentInstance);
            console.log(componentInstance.$el);

        } catch (e) {
            console.log(e);
        }
    }

    private getComponentDefinition(component: any,) {
        let componentDefinition: any;

        // when referencing components by name - ie: cellRendererFramework: 'MyComponent'
        if (typeof component === 'string') {
            // look up the definition in Vue
            componentDefinition = this.searchForComponentInstance(component);

            // it's probably an SFC, but if it has template attribute it's probably
            // an inline/non-sfc component (ie an object a template property)
            if (componentDefinition.template) {
                // inline / non sfc component
                componentDefinition = {...defineComponent(componentDefinition)};
            } else {
                // SFC
                componentDefinition = {extends: defineComponent({...componentDefinition})}

                // ORIGINAL!!!
                // componentDefinition = {extends: defineComponent(componentDefinition)};
            }
        } else {
            componentDefinition = {extends: defineComponent({...component})}
        }
        if (!componentDefinition) {
            console.error(`Could not find component with name of ${component}. Is it in Vue.components?`);
        }

        if (componentDefinition.extends && componentDefinition.extends.setup) {
            componentDefinition.setup = componentDefinition.extends.setup;
        }

        return componentDefinition;
    }


    public createAndMountComponent(component: any) : HTMLElement{
        const componentDefinition = this.getComponentDefinition(component);
        if (!componentDefinition) {
            return null as any;
        }

        // the inner defineComponent allows us to re-declare the component, with the outer one allowing us to
        // provide the grid's params and capture the resulting component instance
        let componentInstance: any = null;
        const extendedComponentDefinition = defineComponent({
            ...componentDefinition,
            created() { // note: function - don't use arrow functions here (for the correct "this" to be used)
                componentInstance = (this as any).$root;
                if (componentDefinition.created) {
                    componentDefinition.created.bind(this)();
                }
            }
        });

        // const container = document.createElement('div');
        // const childTree  = h(extendedComponentDefinition, {})
        // console.log((window as any)._context);
        // childTree.appContext = (window as any)._context;
        // childTree.appContext = (parent as any).currentInstance.appContext;
        // render(childTree, container)

        // with vue 3 we need to provide a container to mount into (not necessary in vue 2), so create a wrapper div here
        const container = document.createElement('div');
        const mountedComponent = createApp(extendedComponentDefinition)
        mountedComponent.mount(container);

        // note that the component creation is synchronous so that componentInstance is set by this point
        // return {mountedComponent, componentInstance};
        // return {mountedComponent, componentInstance}
        return componentInstance.$el;
    }

    private searchForComponentInstance(component: any, maxDepth = 10) {
        let componentInstance: any = null;

        let currentParent: Vue<any> = this.parent.$parent;
        let depth = 0;
        while (!componentInstance &&
        currentParent &&
        currentParent.$options &&
        (++depth < maxDepth)) {
            componentInstance = (currentParent as any).$options.components![component as any];
            currentParent = currentParent.$parent;
        }

        if (!componentInstance) {
            console.error(`Could not find component with name of ${component}. Is it in Vue.components?`);
            return null;
        }
        return componentInstance;
    }
}

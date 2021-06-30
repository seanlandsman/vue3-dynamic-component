import {h} from 'vue'
import {Options, Vue} from 'vue-class-component';
import {VueComponentFactory} from "./VueComponentFactory";
import {Library} from "js-library";

@Options({
    props: {
        component: undefined
    },
    watch: {
        component(currentValue: any, previousValue: any) {
            this.library.removeComponent(previousValue);
            this.library.displayComponent(currentValue);
        }
    },
    model: {},
})
export class AgGridVue extends Vue {
    private library!: Library;

    public render() {
        return h('div');
    }

    public mounted() {
        this.library = new Library(new VueComponentFactory(this));

        this.library.displayComponent((this as any).component)
    }

    public destroyed() {
    }
}

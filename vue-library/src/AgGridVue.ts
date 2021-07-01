import {h} from 'vue'
import {Options, Vue} from 'vue-class-component';
import {VueComponentFactory} from "./VueComponentFactory";

@Options({
    props: {
        component: undefined,
        plugins: undefined
    }
})
export class AgGridVue extends Vue {
    public render() {
        return h('div');
    }

    public mounted() {
        new VueComponentFactory(this, (this as any).plugins)
            .createAndMountComponent((this as any).component);
    }
}

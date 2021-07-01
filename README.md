### Install dependencies

```
cd vue-library
npm i
npx tsc

cd ../client-app
npm i
npm run serve
```

The following warning will be thrown when dynamically creating the component:

>[Vue warn]: Invalid VNode type: Symbol(Text) (symbol)
at <RouterLink to="/about" >
at <App>

 
The "client" app will use vue-library/AgGridVue.ts to dynamically create a Vue component. This works fine for regular components, but as soon
as you have a component that depends on a plugin (ie uses app.use(...plugin...)) then the component won't be created.

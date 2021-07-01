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

> [Vue warn]: Invalid VNode type: Symbol(Text) (symbol)
> at <RouterLink to="/about" >
> at <App>

  

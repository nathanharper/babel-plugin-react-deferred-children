# babel-plugin-react-deferred-children
Defer the evaluation of children for specific React components without function syntax.

## In your Babel config:

```
plugins: [
    ["react-deferred-children", {
        "elements": [ "Loader", "If" ]
    }]
]
```

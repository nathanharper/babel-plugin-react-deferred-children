# babel-plugin-react-deferred-children
Defer the evaluation of children for specific React components without function syntax.

## Installation
In your babel config:
```
plugins: [
    ["react-deferred-children", {
        "elements": [ "Loader", "If" ]
    }]
]
```

## What it do
In:
```
<If condition={false}>
    <ComponentThatWillBreakUnderCertainConditions />
</If>
```

Out:
```
<If condition={false}>
    {() => <ComponentThatWillBreakUnderCertainConditions />}
</If>
```

var childTypes = [
  'JSXText',
  'JSXExpressionContainer',
  'JSXSpreadChild',
  'JSXElement',
  'JSXFragment',
];

module.exports = function reactDeferredChildrenPlugin(babel) {
  var t = babel.types;

  return {
    visitor: {
      JSXElement: function(path, state) {
        var elements = state.opts.elements;
        var openingElement = path.node.openingElement;

        if (!elements.includes(openingElement.name.name)) {
          return;
        }

        var children = t.react.buildChildren(path.node);

        if (
          !children ||
          typeof children === 'function' ||
          children.length === 0
        ) {
          return;
        }

        var expression =
          children.length === 1
            ? children[0]
            : t.jSXFragment(
                t.jSXOpeningFragment(),
                t.jSXClosingFragment(),
                children.map(function(child) {
                  if (childTypes.includes(child.type)) {
                    return child;
                  }
                  return t.jSXExpressionContainer(child);
                }),
              );

        path.node.children = [
          t.jSXExpressionContainer(t.arrowFunctionExpression([], expression)),
        ];
      },
    },
  };
};

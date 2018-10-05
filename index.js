module.exports = function reactDeferredChildrenPlugin(babel) {
  return {
    inherits: require('@babel/plugin-syntax-jsx'),
    visitor: {
      JSXElement: function(path, state) {
        var elements = state.opts.elements;

        if (!elements || !Array.isArray(elements) || elements.length === 0) {
          throw Error(
            'react-deferred-children requires an array for the "elements" option.',
          );
        }

        var nodeName = path.node.openingElement.name.name;

        if (!elements.includes(nodeName)) {
          return;
        }

        var children = babel.types.react.buildChildren(path.node);

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
            : babel.types.jSXFragment(
                babel.types.jSXOpeningFragment(),
                babel.types.jSXClosingFragment(),
                children,
              );

        path.replaceWith(babel.types.arrowFunctionExpression([], expression));
      },
    },
  };
};

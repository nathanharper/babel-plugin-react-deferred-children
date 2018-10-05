module.exports = function reactDeferredChildrenPlugin(babel) {
  var t = babel.types;

  return {
    visitor: {
      JSXElement: function(path, state) {
        var elements = state.opts.elements;

        if (!elements || !Array.isArray(elements) || elements.length === 0) {
          throw Error(
            'babel-plugin-react-deferred-children requires an array for the "elements" option.',
          );
        }

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
                children,
              );

        path.node.children = [
          t.jSXExpressionContainer(t.arrowFunctionExpression([], expression)),
        ];
      },
    },
  };
};

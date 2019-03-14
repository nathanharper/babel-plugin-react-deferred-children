const path = require('path');
const pluginTester = require('babel-plugin-tester');
const PluginReactDeferredChildren = require('../index.js');

pluginTester({
    plugin: PluginReactDeferredChildren,
    pluginName: 'PluginReactDeferredChildren',
    babelOptions: {
        presets: [
            '@babel/env',
            '@babel/react',
        ],
    },
    pluginOptions: {
        elements: ["If"],
    },
    tests: [
        {
            code: `
            const React = require('react');

            function test() {
                return (
                    <If condition={false}>
                        <ComponentThatWillBreakUnderCertainConditions />
                    </If>
                );
            }
`,
            output: `
            "use strict";

            var React = require('react');

            function test() {
              return React.createElement(If, {
                condition: false
              }, function () {
                return React.createElement(ComponentThatWillBreakUnderCertainConditions, null);
              });
            }
`,
        },
        {
            code: `
            const React = require('react');

            function test() {
                return (
                    <Loader condition={false}>
                        <ComponentThatWillBreakUnderCertainConditions />
                    </Loader>
                );
            }
`,
            output: `
            "use strict";

            var React = require('react');

            function test() {
              return React.createElement(Loader, {
                condition: false
              }, React.createElement(ComponentThatWillBreakUnderCertainConditions, null));
            }
`,
        },
    ],
});

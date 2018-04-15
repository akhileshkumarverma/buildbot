// Register new state
class State extends Config {
    constructor($stateProvider, glMenuServiceProvider) {

        // Name of the state
        {
          super();
          let thisFn = (() => { return this; }).toString();
          let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
        }
        const name = 'waterfall';

        // Configuration
        glMenuServiceProvider.addGroup({
            name,
            caption: 'Waterfall View',
            icon: 'bar-chart-o',
            order: 5
        });
        const cfg = {
            group: name,
            caption: 'Waterfall View'
        };

        // Register new state
        const state = {
            controller: `${name}Controller`,
            controllerAs: "w",
            templateUrl: `waterfall_view/views/${name}.html`,
            name,
            url: `/${name}`,
            data: cfg
        };

        $stateProvider.state(state);
    }
}

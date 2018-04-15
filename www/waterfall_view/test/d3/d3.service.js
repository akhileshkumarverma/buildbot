/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// fake d3service for tests.
// d3Service is supposed to be provided by the main www/base app
// and is loading d3 asynchronously on demand
class D3 extends Service('bbData') {
    constructor($q) {
        {
          // Hack: trick Babel/TypeScript into allowing this before super.
          if (false) { super(); }
          let thisFn = (() => { return this; }).toString();
          let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
          eval(`${thisName} = this;`);
        }
        const d = $q.defer();

        // Resolve function
        d.resolve(window.d3);

        return {get() { return d.promise; }};
    }
}

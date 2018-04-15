/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class ScaleService extends Factory {
    constructor() {
        let Service;
        {
          // Hack: trick Babel/TypeScript into allowing this before super.
          if (false) { super(); }
          let thisFn = (() => { return this; }).toString();
          let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
          eval(`${thisName} = this;`);
        }
        return (Service = class Service {
            constructor(d3) {
                this.d3 = d3;
            }

            // Returns x scale
            getX(builders, width) {
                builders.map(builder => builder.builderid);
                return this.d3.scale.ordinal()
                    .domain(builders.map(builder => builder.builderid))
                    .rangeRoundBands([0, width], 0.05);  // 5% padding
            }

            // Returns y scale
            getY(groups, gap, height) {
                let Y;
                const H = height;
                const I = H - ((groups.length - 1) * gap);
                let T = 0;
                for (var group of Array.from(groups)) { T += (group.max - group.min); }

                return (Y = class Y {

                    // date to coordinate
                    constructor(date) {
                        const periods = [];
                        for (let id = 0; id < groups.length; id++) {
                            group = groups[id];
                            if (group.min <= date && date <= group.max) {
                                periods.push(date - group.min);
                                let sum = 0;
                                for (let period of Array.from(periods)) { sum += period; }
                                return H - ((I / T) * sum) - (id * gap);
                            } else { periods.push(group.max - group.min); }
                        }
                        return undefined;
                    }

                    // coordinate to date
                    static invert(coordinate) {
                        const periods = [];
                        for (let id = 0; id < groups.length; id++) {
                            group = groups[id];
                            let sum = 0;
                            for (let period of Array.from(periods)) { sum += period; }
                            const date = (((H - coordinate - (id * gap)) * (T / I)) - sum) + group.min;
                            if (group.min <= date && date <= group.max) {
                                return date;
                            }
                            periods.push(group.max - group.min);
                        }
                        return undefined;
                    }
                });
            }

            // Returns an id to name scale
            getBuilderName(builders) {
                return this.d3.scale.ordinal()
                    .domain(builders.map(builder => builder.builderid))
                    .range(builders.map(builder => builder.name)
                                   .sort((name1, name2) => name1.localeCompare(name2)));
            }
        });
    }
}

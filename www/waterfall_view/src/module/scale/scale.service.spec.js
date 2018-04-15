/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Scale service', function() {

    let builders, scale;
    const groups = [{
                        // Y.M.D - h:m:s
        min: 1325376000, // 2012.01.01 - 0:0:0
        max: 1325548800
    } // 2012.01.03 - 0:0:0
    , {
        min: 1395104461, // 2014.03.18 - 1:1:1
        max: 1396450952
    } // 2014.04.02 - 15:2:32
    ];

    let scaleService = (scale = (builders = null));

    const injected = function($injector) {
        const $rootScope = $injector.get('$rootScope');
        scaleService = $injector.get('scaleService');

        scale = new scaleService(window.d3);

        builders = [{
            builderid: 1,
            name: 'builder1'
        }
        , {
            builderid: 2,
            name: 'builder2'
        }
        , {
            builderid: 3,
            name: 'builder3'
        }
        , {
            builderid: 4,
            name: 'builder4'
        }
        ];
        return $rootScope.$digest();
    };


    beforeEach(inject(injected));

    it('should be defined', function() {
        expect(scaleService).toBeDefined();
        expect(scale).toBeDefined();
        // getX is a function
        expect(scale.getX).toBeDefined();
        expect(typeof scale.getX).toBe('function');
        // getY is a function
        expect(scale.getY).toBeDefined();
        expect(typeof scale.getY).toBe('function');
        // getBuilderName is a function
        expect(scale.getBuilderName).toBeDefined();
        return expect(typeof scale.getBuilderName).toBe('function');
    });

    it('should return a builderid to X scale', function() {
        // Get new scale, range: 100
        const idToX = scale.getX(builders, 100);
        // A build with smaller builderid should come first
        for (let i = 0; i < builders.length; i += 2) {
            const builder = builders[i];
            const a = idToX(builders[i].builderid);
            const b = idToX(builders[i+1].builderid) || 100;
            expect(a).toBeLessThan(b);
        }
        // Out of domain
        return expect(idToX(8)).toBeUndefined();
    });

    it('should return a build length to height scale', function() {
        // gap: 5, range: 100
        const idToY = scale.getY(groups, 5, 100);
        // Check gap size
        expect(idToY(groups[0].max) - idToY(groups[1].min)).toBe(5);
        // All dates are in domain
        const dates = [
            1325376000, // 2012.01.01 - 0:0:0
            1325386000, // 2012.01.01 - 2:46:40
            1396328527 // 2014.04.01 - 5:2:7
        ];
        for (var date of Array.from(dates)) {
            // date -> coordinate -> date, the starting and the ending date should be equal
            expect(idToY.invert(idToY(date))).toEqual(date);
        }
        // Later times have greater Y coordinate
        expect(idToY(date)).toBeGreaterThan(idToY(date + 10000));
        // Out of domain
        expect(idToY(1359731101)).toBeUndefined();
        return expect(idToY.invert(120)).toBeUndefined();
    });

    return it('should return a builderid to name scale', function() {
        // Get new scale
        const idToName = scale.getBuilderName(builders);
        // The return value should be the name of the builder
        return Array.from(builders).map((builder) =>
            expect(idToName(builder.builderid)).toEqual(builder.name));
    });
});

const assert = require('assert');
const index = require('../routes/index.js');

describe('format price', () => {
    describe('direction up', () => {
        it('should return up because 200 - 100 = 100', () => {
            const price = index.formatPrice(200, 100);
            assert.strictEqual(price.direction, 'up');
        });
    });

    describe('direction same', () => {
        it('should return same because 100 - 100 = 0', () => {
            const price = index.formatPrice(100, 100);
            assert.strictEqual(price.direction, 'same');
        })
    });

    describe('undefined values', () => {
        const price = index.formatPrice();
        it('should return 0 for price', () => {
            assert.strictEqual(price.price, 0);
        })

        it('should return 0 for change', () => {
            assert.strictEqual(price.change, 0);
        })
    })

});

describe('format date', () => {
    describe('undefined dateTime', () => {
        const formatedDate = index.formatDate();
        const dateNow = new Date();
        it(`should return current year ${dateNow.getFullYear()}`, () => {
            assert.strictEqual(formatedDate.year, dateNow.getFullYear());
        })

        it('should return current numerical day', () => {
            assert.strictEqual(formatedDate.date, ('0' + dateNow.getDate()).slice(-2));
        })

        it('should return the current month', () => {
            assert.strictEqual(formatedDate.month, ('0' + (dateNow.getMonth() + 1)).slice(-2));
        })
    })

    describe('Check date for 2020-01-09 Thursday', () => {
        const dateTime = new Date(1578571200000);
        const formatedDate = index.formatDate(dateTime);
        it('should have a day of Thursday', () => {
            assert.strictEqual(formatedDate.day, 'Thursday');
        })

        it('should return the year 2020', () => {
            assert.strictEqual(formatedDate.year, 2020);
        })
    })
})
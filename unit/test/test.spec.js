const test = require('./test');
const {
    expect
} = require('chai');
describe('测试下test', () => {
    it('add方法', () => {
        expect(test(1, 1)).to.equal(2);
    })
})
const chai = require('chai');
const expect = chai.expect;

describe('Hello World', () => {
    it('should return hello"', () => {
        const result = "hello"

        expect(result).to.equal('hello');
    });
});

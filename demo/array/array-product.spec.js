const chai = require('chai');
const computeProduct = require('./array-product');
const expect = chai.expect;

describe('computeProduct', () => {

  it('computeProduct should be 21000', () => {
    const unsortedArray = [-10, 7, 29, 30, 5, -10, -70];
    expect(computeProduct(unsortedArray)).to.be.equal(21000);
  });

});
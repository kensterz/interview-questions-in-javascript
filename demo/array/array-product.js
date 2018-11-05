const sortIntegers = (a, b) => a - b;

// Greatest product is either (min1 * min2 * max1 || max1 * max2 * max3)
const computeProduct = (unsorted) => {
  const sortedArray = unsorted.sort(sortIntegers);
  let product1 = 1;
  let product2 = 1;
  const array_n_element = sortedArray.length - 1;

  // Get the product of three largest integers in sorted array
  for (let x = array_n_element; x > array_n_element - 3; x--) {
      product1 = product1 * sortedArray[x];
  }

  product2 = sortedArray[0] * sortedArray[1] * sortedArray[array_n_element];

  return product1 > product2 ? product1 : product2;
}

module.exports = computeProduct;
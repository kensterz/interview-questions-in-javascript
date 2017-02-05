# Interview Algorithm Questions in Javascript() {...}
*A mostly reasonable collection of technical software development interview questions solved in Javascript in ES5 and ES6*

## Table of Contents
1. [Array](#array)
1. [Strings](#strings)
1. [Stacks and Queues](#stacks-and-queues)
1. [Recursion](#recursion)
1. [Numbers](#javascript)
1. [Javascript Specific](#javascript)
1. To Be Continued

## Array
<a name="array--product"></a><a name="1.1"></a>
- **[1.1](#array--product) Given an array of integers, find the largest product yielded from three of the integers**
  ```javascript
  var unsorted_array = [-10, 7, 29, 30, 5, -10, -70];

  computeProduct(unsorted_array); // 21000

  function sortIntegers(a, b) {
    return a - b;
  }

  // greatest product is either (min1 * min2 * max1 || max1 * max2 * max3)
  function computeProduct(unsorted) {
    var sorted_array = unsorted.sort(sortIntegers),
      product1 = 1,
      product2 = 1,
      array_n_element = sorted_array.length - 1;

    // Get the product of three largest integers in sorted array
    for (var x = array_n_element; x > array_n_element - 3; x--) {
        product1 = product1 * sorted_array[x];
    }
    product2 = sorted_array[0] * sorted_array[1] * sorted_array[array_n_element];

    if (product1 > product2) return product1;

    return product2
  };
  ```
<a name="array--consecutive--sum"></a><a name="1.2"></a>
- **[1.2](#array--consecutive--sum) Being told that an unsorted array contains (n - 1) of n consecutive numbers (where the bounds are defined), find the missing number in `O(n)` time**
  ```javascript

  // The output of the function should be 8
  var array_of_integers = [2, 5, 1, 4, 9, 6, 3, 7];
  var upper_bound = 9;
  var lower_bound = 1;

  findMissingNumber(array_of_integers, upper_bound, lower_bound); //8

  function findMissingNumber(array_of_integers, upper_bound, lower_bound) {

    // Iterate through array to find the sum of the numbers
    var sum_of_integers = 0;
    for (var i = 0; i < array_of_integers.length; i++) {
      sum_of_integers += array_of_integers[i];
    }

    // Find theoretical sum of the consecutive numbers using a variation of Gauss Sum.
    // Formula: [(N * (N + 1)) / 2] - [(M * (M - 1)) / 2];
    // N is the upper bound and M is the lower bound

    upper_limit_sum = (upper_bound * (upper_bound + 1)) / 2;
    lower_limit_sum = (lower_bound * (lower_bound - 1)) / 2;

    theoretical_sum = upper_limit_sum - lower_limit_sum;

    //
    return (theoretical_sum - sum_of_integers)
  }
  ```
<a name="array--unique"></a><a name="1.3"></a>
- **[1.3](#array--unique) Removing duplicates of an array and returning an array of only unique elements**
  ```javascript

  // ES6 Implementation
  var array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

  Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]


  // ES5 Implementation
  var array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

  uniqueArray(array); // [1, 2, 3, 5, 9, 8]

  function uniqueArray(array) {
    var hashmap = {};
    var unique = [];
    for(var i = 0; i < array.length; i++) {
      // If key returns null (unique), it is evaluated as false.
      if(!hashmap.hasOwnProperty([array[i]])) {
        hashmap[array[i]] = 1;
        unique.push(array[i]);
      }
    }
    return unique;
  }
  ```
<a name="array--largest-difference"></a><a name="1.4"></a>
- **[1.4](#array--largest-difference) Given an array of integers, find the largest difference between two elements such that the element of lesser value must come before the greater element**
  ```javascript

  var array = [7, 8, 4, 9, 9, 15, 3, 1, 10];
  // [7, 8, 4, 9, 9, 15, 3, 1, 10] would return `11` based on the difference between `4` and `15`
  // Notice: It is not `14` from the difference between `15` and `1` because 15 comes before 1.

  findLargestDifference(array);

  function findLargestDifference(array) {

    // If there is only one element, there is no difference

    if (array.length <= 1) return -1;

    // current_min will keep track of the current lowest

    var current_min = array[0];
    var current_max_difference = 0;

    // We will iterate through the array and keep track of the current max difference
    // If we find a greater max difference, we will set the current max difference to that variable
    // Keep track of the current min as we iterate through the array, since we know the greatest
    // difference is yield from `largest value in future` - `smallest value before it`

    for (var i = 1; i < array.length; i++) {
      if (array[i] > current_min && (array[i] - current_min > current_max_difference)) {
        current_max_difference = array[i] - current_min;
      } else if (array[i] <= current_min) {
        current_min = array[i];
      }
    }

    // If negative or 0, there is no largest difference
    if (current_max_difference <= 0) return -1;

    return current_max_difference;
  }

  ```
<a name="array--product-other-than-itself"></a><a name="1.5"></a>
- **[1.5](#array--product-other-than-itself) Given an array of integers, return an output array such that output[i] is equal to the product of all the elements in the array other than itself. (Solve this in O(n) without division)**
  ```javascript

  var firstArray = [2, 2, 4, 1];
  var secondArray = [0, 0, 0, 2];
  var thirdArray = [-2, -2, -3, 2];

  productExceptSelf(firstArray); // [8, 8, 4, 16]
  productExceptSelf(secondArray); // [0, 0, 0, 0]
  productExceptSelf(thirdArray); // [12, 12, 8, -12]

  function productExceptSelf(numArray) {
  	var product = 1;
  	var size = numArray.length;
  	var output = [];

    // From first array: [1, 2, 4, 16]
    // The last number in this case is already in the right spot (allows for us)
    // to just multiply by 1 in the next step.
    // This step essentially gets the product to the left of the index at index + 1
  	for (var x = 0; x < size; x++) {
  		output.push(product);
  		product = product * numArray[x];
  	}

    // From the back, we multiply the current output element (which represents the product
    // on the left of the index, and multiplies it by the product on the right of the element)
  	var product = 1;
  	for (var i = size - 1; i > -1; i--) {
  		output[i] = output[i] * product;
  		product = product * numArray[i];
  	}

    return output;
  }

  ```

**[⬆ back to top](#table-of-contents)**

## Strings
<a name="string--reverse"></a><a name="2.1"></a>
- **[2.1](#string--reverse) Given a string, reverse each word in the sentence**
  `"Welcome to this Javascript Guide!"` should be become `"emocleW ot siht tpircsavaJ !ediuG"`
  ```javascript

  var string = "Welcome to this Javascript Guide!";

  // Output becomes !ediuG tpircsavaJ siht ot emocleW
  var reverse_entire_sentence = reverseBySeparator(string, "");

  // Output becomes emocleW ot siht tpircsavaJ !ediuG
  var reverse_each_word = reverseBySeparator(reverse_entire_sentence, " ");

  function reverseBySeparator(string, separator) {
    return string.split(separator).reverse().join(separator);
  }
  ```
<a name="string--anagram"></a><a name="2.2"></a>
- **[2.2](#string--anagram) Given two strings, return true if they are anagrams of one another**
  `"Mary" is an anagram of "Army"`
  ``` javascript

  var first_word = "Mary";
  var second_word = "Army";

  isAnagram(first_word, second_word); //true

  function isAnagram (first, second) {

    // For case insensitivity, change both words to lowercase.
    var a = first.toLowerCase();
    var b = second.toLowerCase();

    // Sort the strings, and join the resulting array to a string. Compare the results
    a = a.split("").sort().join("");
    b = b.split("").sort().join("");

    return (a === b);
  }
  ```
<a name="string--palindrome"></a><a name="2.3"></a>
- **[2.3](#string--palindrome) Check if a given string is a palindrome**
  `"racecar" is a palindrome. "race car" should also be considered a palindrome. Case sensitivity should be taken into account`
  ```javascript

  isPalindrome("racecar"); // true
  isPalindrome("race Car"); // true

  function isPalindrome(word) {
    // Replace all non-letter chars with "" and change to lowercase
    var letters_only = word.toLowerCase().replace(/\s/g, "");

    // Compare the string with the reversed version of the string
    return (letters_only === letters_only.split("").reverse().join(""));
  }
  ```
**[⬆ back to top](#table-of-contents)**

## Stacks and Queues

<a name="stack-queue--stack-as-queue"></a><a name="3.1"></a>
- **[3.1](#stack-queue--stack-as-queue) Implement enqueue and dequeue using only one stack**
  ```javascript

  var stack = []; 

  // For enqueue, just push the item into the stack
  function enqueue(stack, item) {
    return stack.push(input);
  }

  function dequeue(stack) {
    return stack.shift();
  }
  ```
<a name="stack-queue--parentheses-balancing"></a><a name="3.2"></a>
- **[3.2](#stack-queue--parentheses-balancing) Create a function that will evaluate if a given expression has balanced parentheses -- Using stacks**
  In this example, we will only consider "{}" as valid parentheses
  `{}{}` would be considered balancing. `{{{}}` is not balanced
  ```javascript

  var expression = "{{}}{}{}"
  var expression_false = "{}{{}";

  isBalanced(expression); // true
  isBalanced(expression_false); //false
  isBalanced(""); // true

  function isBalanced(expression) {
    var check_string = expression;
    var stack = [];

    // If empty, parentheses are technically balanced
    if (check_string.length <= 0) return true

    for (var i = 0; i < check_string.length; i++) {
      if(check_string[i] === '{') {
        stack.push(check_string[i]);
      } else if (check_string[i] === '}') {
        // pop on an empty array is undefined
        if (stack.length > 0) {
          stack.pop();
        } else {
          return false;
        }
      }
    }

    // If the array is not empty, it is not balanced
    if (stack.pop()) return false;
    return true;
  }
  ```
**[⬆ back to top](#table-of-contents)**

## Recursion
<a name="recursion--decimal-to-binary"></a><a name="4.1"></a>
- **[4.1](#recursion--decimal-to-binary) Write a recursive function that returns the binary string of a given decimal number**
  Given `4` as the decimal input, the function should return `100`

  ``` javascript

  decimalToBinary(3) // 11
  decimalToBinary(8) //1000
  decimalToBinary(1000) //1111101000

  function decimalToBinary(digit) {
    if(digit >= 1) {

      // if digit is not divisible by 2 then recursively return proceeding
      // binary of the digit minus 1, 1 is added for the leftover 1 digit
      if (digit % 2) {
        return decimalToBinary((digit - 1) / 2) + 1;
      } else {
        // recursively return proceeding binary digits
        return decimalToBinary(digit / 2) + 0;
      }
    } else {
      // exit condition
      return '';
    }
  }
  ```

<a name="recursion--binary-search"></a><a name="4.2"></a>
- **[4.2](#recursion--binary-search) Write a recursive function that performs a binary search**

  ``` javascript

  function recursiveBinarySearch(array, value, leftposition, rightposition) {

    // Value DNE
    if (left > right) return -1;

    var middle_pivot = Math.floor((leftposition + rightposition) / 2);
    if (array[middle_pivot] === value) {
      return middle_pivot;
    } else if (array[middle_pivot] > key) {
      return recursiveBinarySearch(array, value, leftposition, middle_pivot - 1);
    } else {
      return recursiveBinarySearch(array, value, middle_pivot + 1, rightposition);
    }
  }

  ```
**[⬆ back to top](#table-of-contents)**

## Numbers
<a name="numbers--power-of-two"></a><a name="5.1"></a>
- **[5.1](#numbers--power-of-two) Given an integer, determine if it is a power of 2. If so,
  return that number, else return -1. (0 is not a power of two)**
  ``` javascript

  isPowerOfTwo(4); // true
  isPowerOfTwo(64); // true
  isPowerOfTwo(1); // true
  isPowerOfTwo(0); // false
  isPowerOfTwo(-1); // false

  // For the non-zero case:
  function isPowerOfTwo(number) {
    // `&` uses the bitwise n.
    // In the case of number = 4; the expression would be identical to:
    // `return (4 & 3 === 0)`
    // In bitwise, 4 is 100, and 3 is 011. Using &, if two values at the same
    // spot is 1, then result is 1, else 0. In this case, it would return 000,
    // and thus, 4 satisfies are expression.
    // In turn, if the expression is `return (5 & 4 === 0)`, it would be false
    // since it returns 101 & 100 = 100 (NOT === 0) 
    return (number & (number - 1) === 0)
  };

  // For zero-case:
  function isPowerOfTwoZeroCase(number) {
    return (x != 0) && ((x & (x - 1)) === 0);
  };


  ```
**[⬆ back to top](#table-of-contents)**

## Javascript
<a name="javascript--hoisting"></a><a name="6.1"></a>
- **[6.1](#javascript--hosting) Explain what is hoisting in Javascript**
  ```
  Hoisting is the concept in which Javascript, by default, moves all declarations to the top
  of the current scope. As such, a variable can be used before it has been declared. Note that
  Javascript only hoists declarations and not initializations

  ```

<a name="javascript--use-strict"></a><a name="6.2"></a>
- **[6.2](#javascript--use-strict) Describe the functionality of the `use strict;` directive**
  ```
  the `use strict` directive defines that the Javascript should be executed in `strict mode`.
  One major benefit that strict mode provides is that it prevents developers from using
  undeclared variables. Older versions of javascript would ignore this directive declaration
  ```

  ``` javascript
  // example of strict mode
  "use strict";

  catchThemAll();
  function catchThemAll() {
    x = 3.14; // error will be thrown
    return x * x;
  }
  ```
<a name="javascript--event-bubbling"></a><a name="6.3"></a>
- **[6.3](#javascript--event-bubbling) Explain `event bubbling` and how one may prevent it**
  ```
  Event bubbling is the concept in which an event triggers at the deepest possible element,
  and triggers on parent elements in nesting order. As a result, when clicking on a child element
  one may exhibit the handler of the parent activating.

  One way to prevent event bubbling is using `event.stopPropagation()` or `event.cancelBubble`
  on IE < 9
  ```

<a name="javascript--strict-operators"></a><a name="6.4"></a>
- **[6.4](#javascript--strict-operators) What is the difference between `==` and `===` in JS?**
  ```
  `===` is known as a strict operator. The key difference between `==` and `===` is that the
  strict operator matches for both value and type, as opposed to just the value.
  ```

  ```javascript
  // example of comparators
  0 == false; // true
  0 === false; // false

  2 == '2' // true
  2 === '2' // false
  ```

<a name="javascript--null-undefined"></a><a name="6.5"></a>
- **[6.5](#javascript--null-undefined) What is the difference between `null` and `undefined`**
  ```

  In Javascript, null is an assignment value, and can be assigned to a variable representing that
  it has no value. Undefined, on the other hand, represents that a variable has been declared but
  there is no value associated with it
  ```

<a name="javascript--difference-inheritance"></a><a name="6.6"></a>
- **[6.6](#javascript--difference-inheritance) How does `prototypal inheritance` differ from `classical inheritance`**
  ```

  In classical inheritance, classes are immutable, may or may not support multiple
  inheritance, and may contain interfaces, final classes, and abstract classes. In contrast,
  prototypes are much more flexible in the sense that they may be mutable or immutable. The object
  may inherit from multiple prototypes, and only contains objects.
  ```

**[⬆ back to top](#table-of-contents)**

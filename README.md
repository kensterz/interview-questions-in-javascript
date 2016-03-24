# Interview Algorithm Questions in Javascript() {...}
*A mostly reasonable collection of technical software development interview questions solved in Javascript in ES5 and ES6*

## Table of Contents
1. [Array](#array)
1. [Strings](#strings)
1. [Stacks and Queues](#stacks-and-queues)
1. [Recursion](#recursion)
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
- **[1.2](#array--consecutive--sum) Being told that a unsorted array contains (n - 1) of n consecutive numbers (where the bounds are defined), find the missing number in `O(n)` time**  
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
  // [7, 8, 4, 9, 9, 15, 3, 1, 10] would return `9` based on the difference between `1` and `10`
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

**[⬆ back to top](#table-of-contents)**

## Strings
<a name="string--reverse"></a><a name="2.1"></a>
- **[2.1](#string--reverse) Given an string, reverse each word in the sentence**  
  `"Welcome to this Javascript Guide!"` should be become `"emocleW ot siht tpircsavaJ !ediuG"`
  ```javascript
  
  var string = "Welcome to this Javascript Guide!";
  
  // Output becomes !ediuG tpircsavaJ siht ot emocleW 
  var reverse_entire_sentence = reverseBySeperator(string, "");
  
  // Output becomes emocleW ot siht tpircsavaJ !ediuG
  var reverse_each_word = reverseBySeperator(reverse_entire_sentence, " ");
  
  function reverseBySeperator(string, seperator) {
    return string.split(seperator).reverse().join(seperator);
  }
  ```
<a name="string--anagram"></a><a name="2.2"></a>
- **[2.2](#string--anagram) Given a two string, return true if they are anagrams of one another**
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
- **[3.1](#stack-queue--stack-as-queue) Implement enqueue and dequeue using only two stacks**
  ```javascript
  
  var input_stack = []; // first stack
  var output_stack = []; // second stack
  
  // For enqueue, just push the item into the first stack
  function enqueue(stack_input, item) {
    return stack_input.push(input);
  }
  
  function dequeue(stack_input, stack_output) {
    // Reverse the stack such that the first element of the output stack is the
    // last element of the input stack. After that, pop the top of the output to 
    // get the first element that was ever pushed into the input stack
    if (stack_output.length <= 0) {
      while(stack_input.length > 0) {
        var element_to_output = stack_input.pop();
        stack_output.push(element_to_output);
      }
      return stack_output.pop();
    }
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
- **[4.1](#recursion--decimal-to-binary) Write a recursive function that return the binary string of a given decimal number**  
  Given `4` as the decimal input, the function should return `100`

  ``` javascript
  
  decimalToBinary(8) //1000
  
  function decimalToBinary(digit) {
    if (n >= 1) {
      // recursively return proceeding binary digits
      return decimalToBinary(digit / 2) + (digit % 2).toString();
    } else {
      // exit condition
      return "";
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

## Javascript
<a name="javascript--hoisting"></a><a name="5.1"></a>
- **[5.1](#javascript--hosting) Explain what is `hoisting` in Javascript**
  ```
  Hoisting is the concept in which Javascript, by default, moves all declarations to the top  
  of the current scope. As such, a variable can be used before it has been declared. Note that  
  Javascript only hoists declarations and not initializations.
  ```

<a name="javascript--use-strict"></a><a name="5.2"></a>
- **[5.2](#javascript--use-strict) Explain the functionality of the `use strict;` directive**
  ```
  the `use strict` directive defines that the Javascript should be executed in `strict mode`.  
  One major benefit that strict mode provides is that it prevents developers from using  
  undeclared variables. Older versions of javascript would ignore this directive declaration
  ```
  ```javascript
  // example of strict mode
  
  "use strict";
  catchThemAll();

  function catchThemAll() {
    x = 3.14; // error will be thrown
    return x * x;
  }
  ```

**[⬆ back to top](#table-of-contents)**


# Interview Algorithm Questions in Javascript() {...}
*A mostly reasonable collection of technical software development interview questions solved in Javascript in ES5 and ES6*

## Table of Contents
1. [Array](#array)
1. [Strings](#strings)
1. [Stacks and Queues](#stacks-and-queues)
1. [Logic Riddles](#logic-riddles)
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
  
  var array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

  uniqueArray(array); // [1, 2, 3, 5, 9, 8]

  function uniqueArray(array) {
    array.reduce(function(prev, curr) {
      if (prev.indexOf(curr) === -1) {
        prev.push(curr)
      }
      return prev
    }, [])
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
    var letters_only = word.replace(/[^a-z]+/g,"");
    letters_only = letters_only.toLowerCase();
    
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

**[⬆ back to top](#table-of-contents)**

## Logic Riddles

// Import Vector for storing collections
import {Vector} from "js-sdsl"

// Function to reverse a number
const reverseNum = (num) => {
    let is_negative = false;
    
    // Store if number is negative and make it positive
    if (num < 0) {
        is_negative = true;
        num = Math.abs(num);
    }
    
    let reverse = 0;
    while (num > 0) {
        // Get last digit using modulo
        let lastDigit = num % 10;
        // Add last digit to reverse (multiply by 10 to shift digits left)
        reverse = (reverse * 10) + lastDigit;
        // Remove last digit from number
        num = Math.floor(num / 10);
        
        // Check if result exceeds 32-bit integer range
        if (reverse > Math.pow(2, 31) || reverse < -Math.pow(2, 31)) {
            console.log("Reverse not possible");
            return;
        }
    }
    
    // Return negative number if original was negative
    return is_negative ? -reverse : reverse;
}

// Function to check if number is palindrome
const checkPalindrom = (num) => {
    const duplicate = num;
    let is_negative = false;
    
    // Handle negative numbers same as reverse
    if (num < 0) {
        is_negative = true;
        num = Math.abs(num);
    }
    
    let reverse = 0;
    // Same logic as reverseNum to get reverse
    while (num > 0) {
        let lastDigit = num % 10;
        reverse = (reverse * 10) + lastDigit;
        num = Math.floor(num / 10);
        
        if (reverse > Math.pow(2, 31) || reverse < -Math.pow(2, 31)) {
            console.log("Reverse not possible");
            return false;
        }
    }
    
    if (is_negative) {
        reverse = -reverse;
    }
    
    // Number is palindrome if it equals its reverse
    return reverse === duplicate;
}

// Function to check Armstrong number (sum of each digit raised to power of total digits)
const checkArmstrong = (num) => {
    const duplicate = num;
    if (num < 0) return false;
    
    // Calculate number of digits using log10
    const count = parseInt(Math.log10(num)) + 1;
    let armstrongNum = 0;
    
    while (num > 0) {
        // Get each digit
        let lastDigit = num % 10;
        // Add digit raised to power of total digits
        armstrongNum += Math.pow(lastDigit, count);
        num = Math.floor(num / 10);
    }
    
    // Check if sum equals original number
    return duplicate === armstrongNum;
}

// Function to find all divisors (basic method)
function printDivisors(num) {
    const divisors = new Vector();
    // Check all numbers from 1 to num
    for (let i = 1; i <= num; i++) {
        // If i divides num evenly, it's a divisor
        if (num % i === 0) {
            divisors.pushBack(i);
        }  
    }
    return divisors;
}

// Function to find all divisors (optimized using square root)
function divisorOptimal(num) {
    const divisors = new Vector();
    // Only check up to square root of number
    for(let i = 1; i * i <= num; i++) {
        if(num % i === 0) {
            // Add the divisor
            divisors.pushBack(i);
            // If i*i != num, add the pair divisor (num/i)
            if(Math.floor(num/i) !== i) {
                divisors.pushBack(num/i);
            }
        }
    }
    return divisors;
}

// Function to check if number is prime (basic method)
function isPrime(num) {
    if(num <= 1) return false;
    
    // Count divisors from 2 to num
    let divisorCount = 0;
    for (let i = 2; i <= num; i++) {
        if(num % i === 0) {
            divisorCount++;
        }
    }
    // Prime number has exactly one divisor (itself)
    return divisorCount === 1;
}

// Function to check if number is prime (optimized method)
function isPrimeOptimal(num) {
    // Handle base cases
    if(num <= 1) return false;
    if(num === 2) return true;
    if(num % 2 === 0) return false;
    
    // Check only odd numbers up to square root
    for(let i = 3; i <= parseInt(Math.sqrt(num)); i += 2) {
        if(num % i === 0) return false;
    }
    return true;
}

// Function to find HCF/GCD (basic method)
function findHCF(n1, n2) {
    let gcd = 1;
    // Check all numbers from min(n1,n2) down to 1
    for(let i = Math.min(n1, n2); i >= 1; i--) {
        // If i divides both numbers, it's a common factor
        if(n1 % i === 0 && n2 % i === 0) {
            gcd = i;
            break;  // First one found is the highest
        }
    }
    return gcd;
}

// Function to find HCF/GCD using Euclidean algorithm
function eculidianTheorem(n1, n2) {
    // Keep dividing larger number by smaller and take remainder
    while(n1 > 0 && n2 > 0) {
        if(n1 > n2) n1 = n1 % n2;
        else n2 = n2 % n1;
    }
    // When one number becomes 0, other is HCF
    return n1 === 0 ? n2 : n1;
}

// Test all functions
function main() {
    // Test reverse number
    const result = reverseNum(7732);
    console.log("Reversed number:", result);

    // Test palindrome
    const num = 171;
    console.log("Is palindrome:", checkPalindrom(num));

    // Test Armstrong number
    const arm = 153;
    console.log("Is Armstrong number:", checkArmstrong(arm));

    // Test divisors (basic method)
    console.log("\nDivisors (basic method):");
    const divisors = printDivisors(36);
    divisors.forEach(div => console.log(div));

    // Test divisors (optimal method)
    console.log("\nDivisors (optimal method):");
    const optimalDivisors = divisorOptimal(36);
    optimalDivisors.sort((a, b) => a - b);
    optimalDivisors.forEach(div => console.log(div));

    // Test prime numbers
    console.log("\nIs 7 prime (basic):", isPrime(7));
    console.log("Is 7 prime (optimal):", isPrimeOptimal(7));

    // Test HCF/GCD
    console.log("\nHCF of 31 and 21 (basic):", findHCF(31, 21));
    console.log("HCF of 31 and 21 (Euclidean):", eculidianTheorem(31, 21));
}

// Run tests
main();
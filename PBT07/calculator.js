function calculate(num1, operator, num2) {

    // Kiểm tra input có phải số không
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return "Lỗi: Input không phải số";
    }

    // Kiểm tra chia cho 0
    if ((operator === "/" || operator === "%") && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    // Thực hiện phép tính
    switch (operator) {

        case "+":
            return num1 + num2;

        case "-":
            return num1 - num2;

        case "*":
            return num1 * num2;

        case "/":
            return num1 / num2;

        case "%":
            return num1 % num2;

        case "**":
            return num1 ** num2;

        default:
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// ================================
// TEST
// ================================

console.log(calculate(10, "+", 5));     
// → 15

console.log(calculate(10, "/", 0));     
// → "Lỗi: Không thể chia cho 0"

console.log(calculate(10, "^", 5));     
// → "Lỗi: Operator '^' không hợp lệ"

console.log(calculate("abc", "+", 5));  
// → "Lỗi: Input không phải số"

console.log(calculate(2, "**", 10));    
// → 1024

console.log(calculate(20, "-", 8));     
// → 12

console.log(calculate(7, "%", 3));      
// → 1
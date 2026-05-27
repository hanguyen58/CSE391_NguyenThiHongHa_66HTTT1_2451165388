//  Version 1: Classic
function classicFizzBuzz() {
    console.log("--- RUNNING CLASSIC FIZZBUZZ (1 - 100) ---");
    
    for (let i = 1; i <= 100; i++) {
        // Kiểm tra chia hết cho cả 3 và 5 trước
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// Version 2: Custom
/**
 * Hàm FizzBuzz mở rộng dựa trên một bộ quy tắc linh hoạt
 * @param {number} n - Số giới hạn chạy từ 1 đến n
 * @param {Array} rules - Mảng các đối tượng chứa quy tắc [{ divisor, word }]
 */
function customFizzBuzz(n, rules) {
    console.log(`\n--- RUNNING CUSTOM FIZZBUZZ (1 - ${n}) ---`);
    
    for (let i = 1; i <= n; i++) {
        let resultStr = "";
        
        // Duyệt qua từng quy tắc cấu hình trong mảng rules
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                resultStr += rules[j].word; // Ghép từ nếu chia hết
            }
        }
        
        // Nếu chuỗi kết quả trống (không chia hết cho số nào trong rules)
        if (resultStr === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${resultStr}"`);
        }
    }
}

// Test
// 1. Chạy thử bản cổ điển
// classicFizzBuzz(); // Bỏ comment nếu muốn xem output từ 1 đến 100

// 2. Chạy thử bản nâng cao theo đúng test case của đề bài
const myRules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

customFizzBuzz(35, myRules);
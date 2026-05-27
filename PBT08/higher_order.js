// 1. pipe() — Nối chuỗi các hàm đồng bộ tuần tự từ trái qua phải
const pipe = (...fns) => (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);

// Test pipe
const processValue = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log(processValue(5)); // → "Kết quả: 20"


// 2. memoize() — Tối ưu lưu trữ cache kết quả của hàm dựa trên đối số truyền vào
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Test memoize
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // Hiện "Đang tính..."
console.log(expensiveCalc(1000000)); // Lấy trực tiếp từ cache


// 3. debounce() — Trì hoãn thực thi hàm cho đến khi kết thúc thời gian chờ của hành động cuối cùng
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}


// 4. retry() — Thử lại một hàm bất đồng bộ tối đa N lần nếu gặp lỗi trước khi reject vĩnh viễn
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) throw error;
            console.warn(`Thử lại lần ${attempt} thất bại. Đang thử lại...`);
        }
    }
}
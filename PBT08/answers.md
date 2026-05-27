# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

### 1. Định nghĩa hàm `tinhThueBaoHiem(luong)` theo 3 cách
**Function Declaration**

```
function tinhThueBaoHiemDeclaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue }; // Đề bài yêu cầu trả về {thuong, thuc_nhan}
}
```

**Function Expression**

```
const tinhThueBaoHiemExpression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};
```

**Arrow Function**

```
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};
```

### 2. Khác biệt về Hoisting
Có sự khác biệt rất lớn về cơ chế Hoisting giữa 3 cách này:

- Function Declaration: Có hoisting hoàn toàn. Cả định nghĩa của hàm lẫn tên hàm đều được đưa lên đầu scope trước khi chạy code, nghĩa là bạn có thể gọi hàm trước khi khai báo.

- Function Expression & Arrow Function: Phụ thuộc vào từ khóa khai báo biến (`const`/`let`). Biến lưu hàm có hoisting nhưng nằm trong vùng chết tạm thời (Temporal Dead Zone - TDZ), nghĩa là nếu bạn gọi hàm trước khi khai báo, JavaScript sẽ ném lỗi ReferenceError.

- Ví dụ:

```
// --- THỦ NGHIỆM FUNCTION DECLARATION ---
console.log(testDeclaration(15000000)); // Chạy bình thường -> { thuong: 0, thuc_nhan: 13500000 }

function testDeclaration(luong) {
    return { thuong: 0, thuc_nhan: luong - (luong > 11000000 ? luong * 0.1 : 0) };
}

// --- THỦ NGHIỆM FUNCTION EXPRESSION & ARROW ---
console.log(testArrow(15000000)); // LỖI NGAY: ReferenceError: Cannot access 'testArrow' before initialization

const testArrow = (luong) => {
    return { thuong: 0, thuc_nhan: luong - (luong > 11000000 ? luong * 0.1 : 0) };
};
```

## Câu A2 (5đ) — Scope & Closure
**1. Dự đoán output**

- Đoạn 1: 

```
console.log(c.increment());  // Output: 1
console.log(c.increment());  // Output: 2
console.log(c.increment());  // Output: 3
console.log(c.decrement());  // Output: 2
console.log(c.getCount());   // Output: 2
```

- Đoạn 2:

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**2. Giải thích chi tiết sự khác biệt giữa `var` và `let`

- Với vòng lặp `var`: Từ khóa `var` có Function Scope hoặc Global Scope (không có Block Scope). Do đó, chỉ có duy nhất một biến `i` được tạo ra và dùng chung cho cả 3 lượt lặp. Khi các hàm callback trong `setTimeout` được đẩy vào hàng đợi và thực thi (sau ít nhất 100ms), vòng lặp chạy xong từ lâu và giá trị của biến `i` lúc này đã tăng lên `3`. Do dùng chung vùng nhớ, cả 3 callback đều in ra giá trị hiện tại là `3`.

- Với vòng lặp `let`: Từ khóa let có Block Scope. Ở mỗi lượt lặp, JavaScript tạo ra một vùng đóng scope mới hoàn toàn và một biến `j` mới sao chép giá trị tại thời điểm đó. Khi các callback chạy, chúng tham chiếu đến 3 biến `j` riêng biệt ở 3 block scope khác nhau, giúp giữ nguyên giá trị `0`, `1`, `2`.

## Câu A3 (5đ) — Array Methods

```
// 1. Lấy các số chẵn
const evens = nums.filter(x => x % 2 === 0);

// 2. Nhân mỗi số với 3
const tripled = nums.map(x => x * 3);

// 3. Tính tổng tất cả
const sum = nums.reduce((acc, x) => acc + x, 0);

// 4. Tìm số đầu tiên > 7
const firstGreaterThan7 = nums.find(x => x > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasGreaterThan10 = nums.some(x => x > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allPositive = nums.every(x => x > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const parityStrings = nums.map(x => `Số ${x} là ${x % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = nums.slice().reverse(); // Hoặc: [...nums].reverse() hoặc nums.toReversed() ở ES2023+
```

## Câu A4 (5đ) — Object Destructuring & Spread
### 1. Dự đoán Output

```
// Destructuring
console.log(name, price, ram, color);  // Output: iPhone 16 25990000 8 Titan
console.log(specs);                    // Output: LỖI ReferenceError: specs is not defined

// Spread
console.log(updated.price);            // Output: 23990000
console.log(updated.sale);             // Output: true
console.log(product.price);            // Output: 25990000 (Mảng gốc không đổi)

// Spread gotcha
console.log(product.specs.ram);        // Output: 16
```

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Refactor Code

```
const processOrders = (orders) => 
    orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => {
            const discount = total * 0.1;
            return { id, customer, total, discount, finalTotal: total - discount };
        })
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

## Câu C2 (10đ) — Thiết kế API (`miniArray`)

```
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let hasInitial = initialValue !== undefined;
        let accumulator = hasInitial ? initialValue : arr[0];
        let startIndex = hasInitial ? 0 : 1;

        if (arr.length === 0 && !hasInitial) {
            throw new TypeError("Reduce of empty array with no initial value");
        }

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// --- KIỂM TRA ĐẦU RA ---
console.log(miniArray.map([1, 2, 3], x => x * 2));          // → [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    // → [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10
```
# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — var / let / const

- Đoạn 1:

```
// Đoạn 1
console.log(x);
var x = 5;
```

+ Dự đoán: `undefined`
+ Vì: Do cơ chế Hoisting. Biến `var x` được đưa lên đầu phạm vi (scope) nhưng chưa được gán giá trị, khởi tạo mặc định là `undefined`.

- Đoạn 2:

```
// Đoạn 2
console.log(y);
let y = 10;
```

+ Dự đoán: `ReferenceError: Cannot access 'y' before initialization`.
+ Vì: Biến `let` cũng được hoist nhưng nằm trong vùng Temporal Dead Zone (TDZ) (Vùng chết tạm thời). Ta không thể truy cập biến `let/const` trước dòng khai báo của nó.

- Đoạn 3:

```
// Đoạn 3
const z = 15;
z = 20;
console.log(z);
```

+ Dự đoán: `TypeError: Assignment to constant variable`.
+ Vì: Biến `const` bảo vệ liên kết (binding). Bạn không thể gán lại (re-assign) một giá trị hoàn toàn mới cho biến `const`.

- Đoạn 4:

```
// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

+ Dự đoán: `[1, 2, 3, 4]`
+ Vì: Thay đổi (mutation) phần tử bên trong mảng/object thì hợp lệ, vì địa chỉ vùng nhớ (reference) của mảng `arr` không hề bị thay đổi, chỉ có nội dung bên trong thay đổi.

- Đoạn 5: 

```
// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

+ Dự đoán: `Trong block: 2`, `Ngoài block: 1`
+ Vì: `let` có Block Scope (phạm vi trong cặp {}). Biến `a = 2` bên trong chỉ sống trong block đó và che khuất (shadowing) biến `a = 1` ở ngoài. Khi ra ngoài block, biến `a = 1` vẫn giữ nguyên giá trị.

## Câu A2 (5đ) — Data Types & Coercion
1. Dự đoán kết quả

```
console.log(typeof null);              // "object" (Đây là một bug kinh điển của JS từ bản đầu tiên)
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "number" (Not a Number nhưng kiểu dữ liệu vẫn là số)
console.log("5" + 3);                 // "53"
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2
console.log([] + []);                // "" (Chuỗi rỗng)
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object]" (Hoặc 0 tùy thuộc môi trường console chạy trực tiếp)
```

2. Giải thích tại sao `"5" + 3` và `"5" - 3` khác nhau
- Phép toán `+`: Có tính năng quá tải toán tử (operator overloading). Nếu một trong hai vế là Chuỗi (`String`), JS sẽ ưu tiên ép kiểu vế còn lại sang chuỗi và thực hiện nối chuỗi (`"5" + "3" = "53"`).
- Phép toán `-`: Chỉ có một ý nghĩa duy nhất là phép toán số học. Do đó JS bắt buộc phải ép kiểu (coercion) cả 2 vế về dạng Số (`Number`). `"5"` chuyển thành `5`, `5 - 3 = 2`.

## Câu A3 (5đ) — So sánh == vs ===
1. Dự đoán kết quả

```
console.log(5 == "5");                // true  (Ép kiểu về cùng số rồi so sánh)
console.log(5 === "5");               // false (Khác kiểu dữ liệu: number vs string)
console.log(null == undefined);       // true  (Quy tắc đặc biệt trong JS)
console.log(null === undefined);      // false (Khác kiểu dữ liệu)
console.log(NaN == NaN);             // false (NaN không bằng bất kỳ cái gì, kể cả chính nó)
console.log(0 == false);             // true  (Cả hai đều ép về số là 0)
console.log(0 === false);            // false (Khác kiểu)
console.log("" == false);            // true  (Chuỗi rỗng ép về số là 0, false ép về 0)
```

2. Quy tắc áp dụng
Từ bây giờ trở đi, luôn luôn dùng `===` vì: `===` so sánh cả Giá trị và Kiểu dữ liệu mà không tự động ép kiểu ngầm định. Sử dụng `===` giúp code tường minh, tránh được các lỗi logic "quái dị" do cơ chế tự động ép kiểu của `==` gây ra.

## Câu A4 (5đ) — Truthy & Falsy
- Tất cả giá trị Falsy

```
false
0
-0
0n
""
null
undefined
NaN
```

- Dự đoán kết quả

```
if ("0") console.log("A");           // In A
if ("") console.log("B");            // In B
if ([]) console.log("C");            // In C
if ({}) console.log("D");            // In D
if (null) console.log("E");          // Không in
if (0) console.log("F");             // Không in
if (-1) console.log("G");            // In G
if (" ") console.log("H");           // In H 
```

## Câu A5 (5đ) — Template Literals
- Cách 1:

```
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

- Cách 2:

```
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

- Cách 3:

```
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1 (5đ) — DOM Tree
**1. Sơ đồ cây DOM Tree**


                document
                    │
                 <html>
                    │
                 <body>
                    │
              <div id="app">
               /          \
        <header>          <main>
        /      \          /    \
     <h1>    <nav>   <form>    <ul id="todoList">
      │      / | \    #todoForm     /         \
   "Todo"   <a><a><a>   /   \     <li>        <li>
           "All" "Active" <input> <button> "Learn HTML" "Learn CSS"

**2. Viết querySelector cho mỗi yêu cầu**
Chọn thẻ `<h1>`: `document.querySelector('h1')` hoặc `document.querySelector('#app header h1')`

Chọn input trong form: `document.querySelector('#todoForm input')` hoặc `document.querySelector('#todoInput')`

- Chọn tất cả `.todo-item `: `document.querySelectorAll('.todo-item')`

- Chọn link đang active: `document.querySelector('nav a.active')`

- Chọn `<li>` đầu tiên trong `#todoList: document.querySelector('#todoList li:first-child')`

- Chọn tất cả `<a>` bên trong `<nav>`: `document.querySelectorAll('nav a')`

## Câu A2 (5đ) — innerHTML vs textContent
**1. Sự khác nhau:**
- `textContent`: Lấy hoặc ghi chuỗi văn bản thô (raw text) của phần tử và tất cả các phần tử con bên trong nó. Nó tự động escape/mã hóa HTML, biến các thẻ tag thành text bình thường. Được dùng: Khi muốn thay đổi nội dung văn bản thuần túy (như tên, số lượng, nội dung tin nhắn thô).

- `innerHTML`: Lấy hoặc ghi mã HTML bên trong phần tử đó. Trình duyệt sẽ phân tích cú pháp (parse) chuỗi truyền vào thành các thẻ DOM thực thụ. Được dùng: Khi cần render một cấu trúc template HTML phức tạp đã được kiểm soát an toàn từ phía hệ thống (hardcoded).

**2. Lỗ hổng XSS**
`innerHTML` gây lỗ hổng XSS vì nó chấp nhận thực thi các thẻ script độc hại hoặc các thẻ HTML chứa attribute lắng nghe sự kiện (như `onerror`, `onload`). Khi kẻ tấn công chèn mã độc vào input, nếu ta dùng `innerHTML`, mã độc đó sẽ được thực thi ngay trên trình duyệt của nạn nhân.

**Cách sửa mã nguồn an toàn:**

```
// Thay vì dùng innerHTML, hãy dùng textContent để trình duyệt coi chuỗi đó là text thô, không thực thi mã độc.
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

## Câu A3 — Event Bubbling
### Trường hợp 1: Khi chưa bỏ comment `e.stopPropagation()`
Thứ tự in ra console do cơ chế nổi bọt (Bubbling) từ element con lên các element cha bao bọc nó:

```
BUTTON
INNER
OUTER
```

**2. Trường hợp 2: Khi uncomment `e.stopPropagation()`**
Sự kiện bị chặn ngay tại phần tử `#btn` và không nổi bọt lên các tầng cha nữa. Output lúc này:

```
BUTTON
```

# PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)
## Câu C1 (8đ) — Debug DOM Code

**Các lỗi và cách sửa**
**1. Sai event "onclick"**
- Sai:

```
addEventListener("onclick", ...)
```

- Đúng:

```
addEventListener("click", ...)
```

**2. Không thể gán cho const**
- Sai:

```
countDisplay = count;
```

- Đúng:

```
countDisplay.textContent = count;
```

**3. historyList.innerHTML = null**
- Nên:

```
historyList.innerHTML = "";
```

**4. item.remove thiếu ()**
- Sai:

```
item.remove;
```

- Đúng:

```
item.remove();
```

**5. localStorage trả về string**
- Sai:

```
count = localStorage.getItem("count");
```

- Đúng:

```
count = Number(localStorage.getItem("count")) || 0;
```

**6. Không load history từ localStorage**
- Thiếu:

```
historyList.innerHTML =
    localStorage.getItem("history") || "";
```

**7. Event của history mất sau reload**
- Vì dùng `innerHTML`.
Cần re-bind events hoặc dùng Event Delegation:

```
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});
```

**8. Dùng innerHTML cho số đếm không cần thiết**
- Nên dùng:

```
countDisplay.textContent = count;
Code sửa hoàn chỉnh
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn")
.addEventListener("click", function () {

    count++;

    countDisplay.textContent = count;

    const li = document.createElement("li");

    li.textContent = "Count changed to " + count;

    historyList.appendChild(li);
});

document.querySelector("#decrementBtn")
.addEventListener("click", function () {

    count--;

    countDisplay.textContent = count;
});

document.querySelector("#resetBtn")
.addEventListener("click", () => {

    count = 0;

    countDisplay.textContent = count;

    historyList.innerHTML = "";
});

historyList.addEventListener("click", (e) => {

    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});

document.querySelector("#clearHistory")
.addEventListener("click", () => {

    const items = historyList.querySelectorAll("li");

    items.forEach(item => item.remove());
});

window.addEventListener("beforeunload", () => {

    localStorage.setItem("count", count);

    localStorage.setItem(
        "history",
        historyList.innerHTML
    );
});

window.addEventListener("load", () => {

    count = Number(
        localStorage.getItem("count")
    ) || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history") || "";
});
```

## Câu C2 (7đ) — Performance
**1. Tại sao gắn 1000 event riêng lẻ là BAD PRACTICE? Event Delegation giải quyết thế nào?**
- Vấn đề của việc gắn 1000 Event Listeners:

+ Tốn bộ nhớ (Memory Consumption): Mỗi hàm listener là một đối tượng trong bộ nhớ. Gắn 1000 sự kiện riêng lẻ tương đương với việc ép trình duyệt cấp phát 1000 vùng nhớ riêng biệt, dễ dẫn đến hiện tượng giật lag, rò rỉ bộ nhớ (Memory Leak).

+ Khó quản lý phần tử động: Nếu bạn xóa một phần tử cũ hoặc thêm mới một phần tử vào danh sách, bạn lại phải mất công hủy hoặc đăng ký sự kiện mới cho phần tử đó.

- Cách Event Delegation giải quyết:

+ Cơ chế này tận dụng tính chất Event Bubbling (Nổi bọt sự kiện). Thay vì gắn sự kiện cho 1000 thẻ con, ta chỉ gắn duy nhất 1 sự kiện lên thẻ cha bao bọc chúng.

+ Khi bất kỳ thẻ con nào được tương tác, sự kiện sẽ tự động "nổi bọt" lên tầng cha. Thẻ cha sẽ đứng ra thu nhận và sử dụng thuộc tính e.target để xác định chính xác thẻ con nào vừa bị click rồi xử lý tập trung tại một nơi.

**2. Tối ưu hóa vòng lặp với `DocumentFragment`**
- Đoạn code gốc (1000 lần Reflow — Gây chậm UI):

```JavaScript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← Trình duyệt phải tính toán lại Layout 1000 lần!
}
```

- Đoạn code sau khi Refactor bằng DocumentFragment:

```JavaScript
// Bước 1: Tạo một DOM ảo tạm thời nằm trong bộ nhớ RAM
const fragment = document.createDocumentFragment(); 

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Gắn div vào DOM ảo (Không kích hoạt cơ chế hiển thị trên màn hình)
}

// Bước 2: Bơm toàn bộ 1000 phần tử vào cây DOM thật một lần duy nhất
document.body.appendChild(fragment); 
```

- Giải thích lý do chạy nhanh hơn:
Khi ta can thiệp trực tiếp vào DOM thật thông qua `document.body.appendChild`, trình duyệt bắt buộc phải chạy hai quy trình tốn kém phần cứng là Reflow (tính toán lại vị trí, kích thước cấu trúc hình học) và Repaint (vẽ màu sắc đồ họa lên màn hình). Việc dùng `DocumentFragment` đóng vai trò như một "kho chứa tạm thời" trong RAM. Trình duyệt thực hiện 1000 thao tác chuẩn bị hoàn toàn trong bóng tối, và chỉ kích hoạt duy nhất 1 lần Reflow/Repaint khi đẩy Fragment đó ra giao diện thật, giúp cải thiện tốc độ render lên gấp nhiều lần.
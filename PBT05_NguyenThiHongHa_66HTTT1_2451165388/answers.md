# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (5đ) — Viewport & Mobile-First

**1. Thẻ `<meta viewport>` chuẩn**

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `name="viewport"`: Định nghĩa vùng hiển thị của trình duyệt trên thiết bị.
- `width=device-width`: Đặt chiều rộng của trang web bằng với chiều rộng màn hình của thiết bị thực tế (thay vì kích thước màn hình ảo mặc định).
- `initial-scale=1.0`: Thiết lập mức độ zoom (phóng to) ban đầu là 100% khi trang được tải lần đầu tiên.

**2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web**
Nếu thiếu thẻ này, iPhone (và đa số trình duyệt mobile khác) sẽ giả định trang web được thiết kế cho màn hình desktop lớn (thường là 980px). Trình duyệt sẽ tự động thu nhỏ (zoom out) toàn bộ trang web lại để vừa vặn với màn hình điện thoại.

**3. Mobile-First và Desktop-First khác nhau**
- Mobile-First
    + CSS mặc định cho mobile
    + Dùng `min-width`
    + Mở rộng dần cho màn hình lớn hơn
    + Ví dụ:

 ```
 .container {
    width: 100%;
}
@media (min-width: 768px) {
    .container {
        width: 750px;
    }
} 
```

- Desktop-First
    + CSS mặc định cho desktop
    + Dùng `max-width`
    + Thu nhỏ dần cho mobile

```
.container {
    width: 1200px;
}

@media (max-width: 768px) {
    .container {
        width: 100%;
    }
}
```

- Mobile-First được khuyên dùng vì:
    + Hiệu năng (Performance): Thiết bị di động có phần cứng yếu hơn và mạng (3G/4G) chậm hơn desktop. Tải CSS gọn nhẹ trước giúp tăng tốc độ render.
    + Tập trung vào cốt lõi: Ép nhà phát triển phải chắt lọc nội dung quan trọng nhất hiển thị trên không gian hẹp của mobile.
    + Xu hướng traffic: Lượng người dùng mobile ngày nay chiếm hơn 50-60% tổng lưu lượng web toàn cầu.

## Câu A2 — Breakpoints 

| Breakpoint | Kích thước Pixel | Thiết bị đại diện | Số cột lưới sản phẩm đề xuất |
| :---: | :---: | :--- | :---: |
| **xs** | `< 576px` | Điện thoại dọc (iPhone SE, Portrait Mobile) | 1 cột (Tránh text và nút bấm bị ép nhỏ) |
| **sm** | `≥ 576px` | Điện thoại nằm ngang (Landscape Mobile) | 2 cột |
| **md** | `≥ 768px` | Máy tính bảng dọc (iPad Portrait) | 2 cột hoặc 3 cột (tùy thuộc diện tích sidebar) |
| **lg** | `≥ 992px` | Máy tính bảng ngang, Laptop nhỏ (iPad Pro, Macbook 12") | 3 cột |
| **xl** | `≥ 1200px` | Màn hình PC, Laptop phổ thông (14" - 15.6") | 4 cột |
| **xxl** | `≥ 1400px` | Màn hình Desktop lớn, PC đồ họa, iMac | 4 cột hoặc 5 cột |

---

## Câu A3 — Phân Tích Độ Rộng `.container` Qua Media Queries

| Chiều rộng màn hình | `.container` width | Giải thích chi tiết cơ chế áp dụng |
| :--- | :--- | :--- |
| **375px** (iPhone SE) | 100% | Không thỏa mãn bất kỳ điều kiện `min-width` nào trong Media Queries $\rightarrow$ Trình duyệt áp dụng CSS mặc định ban đầu. |
| **600px** | 540px | Thỏa mãn duy nhất điều kiện `min-width: 576px`. |
| **800px** | 720px | Thỏa mãn cả `min-width: 576px` và `min-width: 768px`. Do luật `min-width: 768px` được viết sau nên nó ghi đè và giành chiến thắng. |
| **1000px** | 960px | Thỏa mãn các điều kiện cho đến mức `min-width: 992px` và lấy giá trị tại đây. |
| **1400px** | 1140px | Thỏa mãn tất cả các điều kiện, quy tắc ở mức cao nhất được khai báo cuối cùng (`min-width: 1200px`) sẽ áp đặt giá trị cuối. |

> ## Câu A4 — SCSS Basics & Compiling

### 1. Giải thích 4 tính năng chính của SCSS và ví dụ

#### Variables (`$primary-color`)
- Lưu trữ các giá trị được sử dụng lặp đi lặp lại nhiều lần (như mã màu thương hiệu, font chữ, kích thước khoảng cách) vào một sơ đồ tên gọn để dễ dàng quản lý và thay đổi đồng loạt sau này.
- Ví dụ:

```
$primary-color: #3498db;
$spacing-base: 15px;

.btn-primary {
  background-color: $primary-color;
  padding: $spacing-base;
}
```

#### 2. Nesting (viết CSS lồng nhau)
- Cho phép viết các bộ chọn (selectors) lồng vào nhau mô phỏng theo đúng cấu trúc phân cấp hình cây của HTML. Tính năng này giúp mã nguồn gọn gàng, dễ quản lý và tránh việc lặp lại selector cha.
- Ví dụ:

```
.navbar {
  background-color: #2c3e50;
  padding: 10px;

  .nav-item {
    display: inline-block;
    (.nav-item)
    &:hover {
      color: $primary-color;
    }
  }
}
```

#### 3. Mixins (`@mixin`, `@include`)
- Tạo ra một tập hợp các thuộc tính CSS có thể chèn vào bất kỳ selector nào thông qua từ khóa `@include`. Mixin cực kỳ mạnh mẽ nhờ hỗ trợ truyền tham số (arguments) và đặt giá trị mặc định giống như hàm trong lập trình.
- Ví dụ:

```
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}
.box-horizontal { @include flex-center; }
.box-vertical   { @include flex-center(column); }
```

#### 4. `@extend` / Inheritance
- Cho phép một selector chia sẻ và sử dụng lại toàn bộ các thuộc tính đã được định nghĩa của một selector khác. Giúp tối ưu hóa mã nguồn theo nguyên lý DRY (Don't Repeat Yourself), gom nhóm các selector có chung thuộc tính trong file CSS đầu ra.
- Ví dụ:

```
// Khối thiết kế nền tảng
.alert-base {
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
}

.alert-danger {
  @extend .alert-base;
  background-color: #f8d7da;
  color: #721c24;
}
```

### 2.Trình duyệt KHÔNG đọc được file `.scss` vì:
- SCSS không phải CSS chuẩn. Trình duyệt chỉ hiểu khi CSS thuần(.css), SCSS cần được biên dịch sang CSS trước.

### 3. Các bước để chuyển SCSS -> CSS
- Thực hiện bước Biên dịch (Compiling) thông qua một công cụ gọi là Sass Compiler để chuyển đổi cấu trúc mã nguồn phức tạp thành tệp tin `.css` phẳng truyền thống.
-------------------------------------------

# PHẦN B — THỰC HÀNH CODE (60 điểm)
## Bài B3 (20đ) — SCSS Refactor

- Compile SCSS → CSS
- Cấu trúc thư mục

```
scss/
├── _variables.scss
├── _mixins.scss
├── _components.scss
└── style.scss
```

- Lệnh compile SCSS sang CSS
- Compile một lần

```
sass scss/style.scss css/style.css
```
---------------------------

# PHẦN C — PHÂN TÍCH (20 điểm)
## Câu C1 (10đ) — Phân tích trang web thực
1. 
- Mobile — 375px
    + Navigation: Menu sidebar bị ẩn Xuất hiện icon hamburger ☰. Thanh tìm kiếm thu nhỏ, chỉ giữ các icon quan trọng:
        + Home
        + Shorts
        + Subscriptions
        + Library
    + Video hiển thị 1 cột. Thumbnail chiếm gần toàn bộ chiều rộng
    + Thành phần bị ẩn: Sidebar bên trái, một số menu category, nút text dài
    + Font Size: Font nhỏ hơn desktop, khoảng cách padding giảm
- Tablet — 768px
    + Navigation: Sidebar mini xuất hiện, search bar dài hơn, có thêm icon chức năng
    + Content Grid: Grid video khoảng 2–3 cột
    + Layout: Khoảng cách rộng hơn mobile, thumbnail nhỏ lại để chứa nhiều video hơn
- Desktop — 1440px
    + Navigation: Sidebar đầy đủ, search bar lớn, menu account đầy đủ
    + Content Grid: Grid khoảng 4–6 cột video
    + Thành phần hiển thị thêm: Sidebar category,  history, playlist, subscriptions đầy đủ
    + Font Size: Font lớn hơn, khoảng trắng nhiều hơn
-------------------------------------------

# PHẦN C — PHÂN TÍCH

## Câu C2 (10đ) — Responsive Strategy


### 1. Mobile Layout (<768px)

**Wireframe**

```
┌────────────────────┐
│ LOGO + ☰ MENU      │
├────────────────────┤
│ HERO IMAGE         │
├────────────────────┤
│ FORM ĐẶT BÀN       │
├────────────────────┤
│ GRID MÓN ĂN        │
│ 1 CỘT              │
├────────────────────┤
│ GOOGLE MAP         │
├────────────────────┤
│ FOOTER             │
└────────────────────┘
```

- Thành phần bị ẩn
    + Menu ngang desktop
    + Một số ảnh phụ
    + Thông tin phụ trong footer
- Form nằm ở
    + Hiển thị full width
    + Đặt ngay dưới hero image

### 2. Tablet Layout (768px – 1023px)
**Wireframe**

```
┌──────────────────────────────┐
│ LOGO + MENU                  │
├──────────────────────────────┤
│ HERO IMAGE                   │
├──────────────────────────────┤
│ GRID MÓN ĂN (2 CỘT)          │
├──────────────────────────────┤
│ FORM ĐẶT BÀN                 │
├──────────────────────────────┤
│ GOOGLE MAP                   │
├──────────────────────────────┤
│ FOOTER                       │
└──────────────────────────────┘
```

- Grid món ăn
    + Hiển thị 2 cột
- Google Maps
    + Nằm dưới form
    + Chiếm toàn bộ chiều rộng
- Navigation
    + Menu ngang đơn giản
    + Có thể giữ hamburger nếu cần

### 3. Desktop Layout (≥1024px)
**Wireframe**

```
┌──────────────────────────────────────────┐
│ LOGO + MENU + PHONE                     │
├──────────────────────────────────────────┤
│ HERO IMAGE FULL WIDTH                   │
├──────────────────────────────────────────┤
│ GRID MÓN ĂN (3 CỘT)                     │
├─────────────────────┬────────────────────┤
│ FORM ĐẶT BÀN       │ GOOGLE MAP         │
├─────────────────────┴────────────────────┤
│ FOOTER                                 │
└──────────────────────────────────────────┘
```
- Layout
    + Form và Google Maps chia 2 cột
    + Hero image full width
    + Grid món ăn hiển thị 3 cột
- Sidebar
    + Không cần sidebar
    + Giao diện tập trung vào đặt bàn và hình ảnh món ăn

### 4. CSS Skeleton — Mobile First

```
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

/* MOBILE */

.container{
    width:100%;
    padding:16px;
}

.food-grid{
    display:grid;
    grid-template-columns:1fr;
    gap:16px;
}

.booking-layout{
    display:block;
}

/* TABLET */

@media (min-width:768px){

    .food-grid{
        grid-template-columns:repeat(2, 1fr);
    }
}

/* DESKTOP */

@media (min-width:1024px){

    .food-grid{
        grid-template-columns:repeat(3, 1fr);
    }

    .booking-layout{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:24px;
    }
}
```
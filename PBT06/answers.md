# 🅱️ TRACK A — BOOTSTRAP 5

## PHẦN A — ĐỌC HIỂU

---

### Câu A1 (10đ) — Grid System


| Kích thước | `< 768px`       | `768px - 991px` | `≥ 992px`    |
| ---------- | --------------- | --------------- | ------------ |
| Số cột     | 1 cột           | 2 cột           | 4 cột        |
| Box layout | Các box xếp dọc | 2 box / hàng    | 4 box / hàng |


**Câu hỏi thêm:** 
- col-md-6 nghĩa là:
+ md → áp dụng từ breakpoint Medium (≥ 768px)
+ 6 → chiếm 6/12 cột
==> Element chiếm 50% chiều rộng hàng.
- Không cần `col-sm-12` vì: Bootstrap sử dụng Mobile First,`col-12` đã áp dụng cho toàn bộ màn hình nhỏ.

### Câu A2 (10đ) — Utilities & Components

#### 1. Giải thích `d-none d-md-block`
 
- `d-none` → `display: none` — **ẩn element ở mọi kích thước** (từ xs trở lên)
- `d-md-block` → `display: block` khi **≥ 768px (md trở lên)**
**Kết quả:**
- **< 768px:** Element bị ẩn hoàn toàn
- **≥ 768px:** Element hiển thị dạng block
Cách dùng phổ biến: ẩn menu desktop trên mobile, hiển thị banner quảng cáo chỉ trên tablet/desktop.
 
 #### 2. 5 Spacing Utilities
 
| Class | CSS tương đương | Giải thích |
|---|---|---|
| `mt-3` | `margin-top: 1rem (16px)` | Margin trên, cấp độ 3 (thang 0–5) |
| `mb-4` | `margin-bottom: 1.5rem (24px)` | Margin dưới, cấp độ 4 |
| `px-4` | `padding-left: 1.5rem; padding-right: 1.5rem` | Padding trái + phải (trục X), cấp 4 |
| `py-2` | `padding-top: 0.5rem; padding-bottom: 0.5rem` | Padding trên + dưới (trục Y), cấp 2 |
| `mb-auto` | `margin-bottom: auto` | Margin dưới tự động — đẩy element lên trên khi dùng flexbox; thường dùng để "đẩy footer xuống đáy" |
 
**Quy tắc đặt tên:** `{property}{side}-{size}`  
- Property: `m` = margin, `p` = padding  
- Side: `t` top, `b` bottom, `s` start(left), `e` end(right), `x` trục ngang, `y` trục dọc, bỏ trống = tất cả  
- Size: 0 → 5 (0, 0.25rem, 0.5rem, 1rem, 1.5rem, 3rem) + `auto`
---
 
#### 3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`
 
| Class | Hành vi | Khi nào dùng |
|---|---|---|
| `.container` | Có **max-width cố định** tại mỗi breakpoint (540/720/960/1140/1320px), căn giữa, có margin hai bên | Layout nội dung chính, giới hạn độ rộng tối đa |
| `.container-fluid` | Luôn **100% chiều rộng viewport**, không có max-width | Full-width sections: hero, banner, navbar nền màu |
| `.container-md` | **100% width** khi < 768px, chuyển sang **container cố định** khi ≥ 768px | Muốn full-width trên mobile, có padding trên desktop |
 
 -------------------------------
## PHẦN C — PHÂN TÍCH
 
### Câu C1 (10đ) — Utility Classes
 
#### 1. Quy trình đổi màu `$primary` sang `#E63946`
 
**Cần chuẩn bị:**
- Node.js + npm
- Sass compiler (`npm install sass`)
- Source Bootstrap (tải qua npm: `npm install bootstrap`)
**Các bước:**
 
```scss
// custom.scss — file tùy biến của bạn
 
// Bước 1: Override variable TRƯỚC khi import Bootstrap
$primary: #E63946;
 
// Bước 2: Import Bootstrap source
@import "../node_modules/bootstrap/scss/bootstrap";
```
 
```
# Bước 3: Compile
sass custom.scss custom.css
```
 
```html
<!-- Bước 4: Dùng file compiled thay vì CDN -->
<link rel="stylesheet" href="custom.css">
```
 
**Kết quả:** Tất cả components dùng `$primary` (`.btn-primary`, `.bg-primary`, `.text-primary`, `.border-primary`…) đều tự động dùng màu `#E63946`.
 
 
#### 2. Tại sao KHÔNG override `.btn-primary { background: red; }` trực tiếp
 
**Vì 4 lý do:**
 
1. **Không đồng bộ:** `.btn-primary` không chỉ có `background` — nó còn có `border-color`, `hover state`, `focus ring`, `active state`, `disabled state`. Override thủ công bỏ sót → màu hover/focus vẫn là xanh gốc Bootstrap, gây ra sự không nhất quán.
2. **Không cascade:** `$primary` được dùng ở hàng chục components (badge, alert, link, progress bar…). Override một class chỉ sửa một chỗ, phải lặp lại cho tất cả components khác.
3. **Specificity wars:** Thêm CSS override có thể gây conflict với CSS khác, phải dùng `!important` → code bẩn, khó maintain.
4. **Tăng file size:** SASS variables compile ra CSS tối ưu. Thêm override thủ công = thêm CSS thừa không cần thiết.
**Nguyên tắc:** Bootstrap được thiết kế để tùy biến qua SASS variables. Đó là **đúng cách** của framework này.
 
### Câu C2 (10đ) — So sánh
 
#### CSS thuần cho Navbar + Product Card
 
```css
/* CSS thuần — khoảng 80–100 dòng */
nav { display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 2rem; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,.1); }
.nav-logo { font-size: 1.5rem; font-weight: bold; }
.nav-links { display: flex; gap: 1.5rem; list-style: none; }
.nav-links a { text-decoration: none; color: #333; }
.hamburger { display: none; cursor: pointer; }
@media (max-width: 768px) {
  .nav-links { display: none; flex-direction: column; }
  .nav-links.open { display: flex; }
  .hamburger { display: block; }
}
.card { border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.1);
        transition: box-shadow .2s; }
.card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.2); }
.card img { width: 100%; height: 200px; object-fit: cover; }
.card-body { padding: 1rem; }
.card-title { font-size: 1.1rem; font-weight: 600; margin-bottom: .5rem; }
.card-price { color: #e63946; font-weight: bold; font-size: 1.2rem; }
.btn { padding: .5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
.btn-primary { background: #0d6efd; color: #fff; }
.btn-primary:hover { background: #0b5ed7; }
```
 
#### Bảng so sánh
 
| Tiêu chí | CSS thuần | Bootstrap |
|---|---|---|
| **Số dòng CSS** | ~80–100 dòng | 0 dòng (dùng utility classes) |
| **Thời gian phát triển** | 30–60 phút | 5–10 phút |
| **Tùy biến** | Tuyệt đối, không giới hạn | Giới hạn trong hệ thống Bootstrap; cần SASS để custom sâu |
| **Nhất quán** | Phụ thuộc developer | Tự động nhất quán theo design system |
| **File size** | CSS nhỏ (chỉ có gì cần) | Bootstrap CSS ~30KB (minified+gzip) dù chỉ dùng 10% |
| **Learning curve** | Cần hiểu sâu CSS | Học class names là dùng được |
| **Responsive** | Tự viết media queries | Có sẵn breakpoint system |
 
#### Khi NÊN dùng Bootstrap:
- Dự án nội bộ, admin panel, prototype nhanh
- Team lớn cần design system nhất quán
- Deadline gấp, MVP
- Developer không mạnh về design
#### Khi KHÔNG NÊN dùng Bootstrap:
- Cần thiết kế độc đáo, khác biệt hoàn toàn (fighting the framework)
- Website marketing/branding — cần pixel-perfect theo brand guideline
- Performance critical — tải thêm 30KB CSS cho landing page nhỏ là lãng phí
- Đã có design system riêng của công ty/dự án
 
---------------------------------

# 🌊 TRACK B — TAILWINDCSS
## PHẦN A — ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — Utility Classes

Giải thích từng class trong đoạn HTML:

```
Wrapper div:
- flex               → display: flex
- items-center       → align-items: center
- justify-between    → justify-content: space-between
- p-4                → padding: 1rem (16px) — tất cả 4 phía
- bg-white           → background-color: #ffffff
- shadow-md          → box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
- rounded-lg         → border-radius: 0.5rem (8px)
- hover:shadow-xl    → khi hover: box-shadow lớn hơn (xl)
- transition-shadow  → transition: box-shadow 150ms cubic-bezier(0.4,0,0.2,1)
- duration-300       → transition-duration: 300ms

img:
- w-16               → width: 4rem (64px)
- h-16               → height: 4rem (64px)
- rounded-full       → border-radius: 9999px (hình tròn)
- object-cover       → object-fit: cover

div (text container):
- ml-4               → margin-left: 1rem (16px)
- flex-1             → flex: 1 1 0% (chiếm hết không gian còn lại)

h3:
- text-lg            → font-size: 1.125rem (18px); line-height: 1.75rem
- font-semibold      → font-weight: 600
- text-gray-800      → color: #1f2937
- truncate           → overflow: hidden; text-overflow: ellipsis; white-space: nowrap

p:
- text-sm            → font-size: 0.875rem (14px); line-height: 1.25rem
- text-gray-500      → color: #6b7280

button:
- px-4               → padding-left: 1rem; padding-right: 1rem
- py-2               → padding-top: 0.5rem; padding-bottom: 0.5rem
- bg-blue-500        → background-color: #3b82f6
- text-white         → color: #ffffff
- rounded-md         → border-radius: 0.375rem (6px)
- hover:bg-blue-600  → khi hover: background-color: #2563eb (xanh đậm hơn)
- focus:ring-2       → khi focus: outline ring 2px
- focus:ring-blue-300→ khi focus: ring màu #93c5fd
```

---

### Câu A2 (10đ) — Responsive & States

#### 1. Prefix responsive: `md:`, `lg:`, `xl:`

Tailwind dùng **mobile-first**. Class không có prefix = áp dụng tất cả kích thước. Prefix chỉ áp dụng từ breakpoint đó **trở lên**.

| Prefix | Breakpoint | Min-width |
|---|---|---|
| *(none)* | Tất cả (xs) | 0px |
| `sm:` | Small | 640px |
| `md:` | Medium | 768px |
| `lg:` | Large | 1024px |
| `xl:` | Extra large | 1280px |
| `2xl:` | 2x Extra large | 1536px |

**`md:grid-cols-2 lg:grid-cols-4` nghĩa là:**
- `0 → 767px`: grid mặc định (1 cột nếu dùng `grid-cols-1`)
- `768px → 1023px`: 2 cột (`grid-cols-2`)
- `≥ 1024px`: 4 cột (`grid-cols-4`)

---

#### 2. State Modifiers

| Modifier | Khi nào kích hoạt | Ví dụ |
|---|---|---|
| `hover:` | Mouse di vào element | `hover:bg-blue-600` |
| `focus:` | Element được focus (tab/click vào input) | `focus:ring-2` |
| `active:` | Đang click (mousedown) | `active:scale-95` |
| `group-hover:` | Khi **parent** có class `group` được hover | `group-hover:text-white` |

**`group-hover:` ví dụ:**
```html
<div class="group hover:bg-blue-500">
  <p class="text-gray-700 group-hover:text-white">Đổi màu khi hover vào parent</p>
</div>
```

---

#### 3. Ẩn trên mobile, hiện dạng flex trên tablet trở lên

```html
<!-- Tương đương d-none d-md-flex của Bootstrap -->
<div class="hidden md:flex">
  Nội dung chỉ hiện từ 768px trở lên, dạng flex
</div>
```

- `hidden` → `display: none` (tất cả kích thước)
- `md:flex` → `display: flex` khi ≥ 768px (override `hidden`)

---

## PHẦN C — PHÂN TÍCH

### Câu C1 (10đ) — Tailwind vs CSS thuần

#### So sánh Component: Product Card

**Phiên bản CSS thuần:**
```html
<!-- HTML -->
<div class="card">
  <img src="..." class="card-img">
  <div class="card-body">
    <h3 class="card-title">Tên sản phẩm</h3>
    <p class="card-price">299.000đ</p>
    <button class="btn-buy">Mua ngay</button>
  </div>
</div>

<!-- CSS riêng — ~25 dòng -->
```

**Phiên bản Tailwind:**
```html
<!-- HTML (không cần CSS riêng) -->
<div class="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
  <img src="..." class="w-full h-48 object-cover">
  <div class="p-4">
    <h3 class="text-base font-semibold text-gray-800 mb-1">Tên sản phẩm</h3>
    <p class="text-red-500 font-bold text-lg mb-3">299.000đ</p>
    <button class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
      Mua ngay
    </button>
  </div>
</div>
```

#### Bảng so sánh

| Tiêu chí | CSS thuần | Tailwind |
|---|---|---|
| **HTML file size** | Nhỏ (class ngắn) | Lớn hơn (nhiều utility classes) |
| **CSS file size** | ~25 dòng per component | 0 dòng CSS riêng |
| **Maintainability** | Dễ đọc HTML, nhưng phải tra CSS để hiểu style | Style ngay trong HTML, không cần context-switch |
| **Reusability** | Dùng lại class tên ngữ nghĩa | Dùng `@apply` để tạo component class tái sử dụng |

**Tái sử dụng với `@apply`:**
```css
/* Tạo component class từ Tailwind utilities */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
}
.card {
  @apply rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white;
}
```

---

### Câu C2 (10đ) — Performance

#### 1. Tại sao Tailwind CSS cuối cùng NHỎ HƠN Bootstrap?

**Bootstrap:** Ship toàn bộ ~160KB CSS (minified) — kể cả components bạn **không dùng** (carousel, accordion, tooltip, offcanvas…). Dùng 20 components nhưng tải 100 components.

**Tailwind:** Chỉ generate CSS cho các utility classes **thực sự xuất hiện trong HTML/JS**. Nếu bạn không dùng `rotate-45` hay `skew-y-6`, chúng không xuất hiện trong file CSS output.

Kết quả thực tế: Tailwind production build thường chỉ **5–15KB**, so với Bootstrap ~30KB (gzipped).

---

#### 2. Tailwind JIT (Just-In-Time) / PurgeCSS

**PurgeCSS (cũ — Tailwind v2):** Scan HTML/JS sau khi build, xóa bỏ CSS classes không xuất hiện. Nhược điểm: dev build chứa toàn bộ ~3MB CSS.

**JIT Mode (Tailwind v3+, mặc định):** Thay vì generate trước rồi xóa, JIT **sinh ra CSS on-demand** — chỉ tạo CSS cho class được dùng, ngay lập tức khi bạn gõ. 

JIT loại bỏ:
- Mọi utility class không được reference trong source files
- Biến thể (variants) không dùng đến (e.g., `focus-visible:`, `2xl:` nếu không dùng)
- Arbitrary values không dùng (`w-[347px]`)

Cấu hình `content` trong `tailwind.config.js` để Tailwind biết scan file nào:
```js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
}
```

---

#### 3. Khi KHÔNG nên dùng TailwindCSS

**Tình huống 1 — Dự án không có build step (static HTML đơn giản):**  
Tailwind JIT yêu cầu build process (Node.js, npm). Nếu bạn chỉ cần một file `index.html` đơn giản không có pipeline, dùng CDN Tailwind sẽ tải toàn bộ ~3MB CSS runtime, rất chậm. Bootstrap CDN (~30KB) hợp lý hơn nhiều.

**Tình huống 2 — Team không đồng thuận / code review khó khăn:**  
Tailwind HTML có thể trở nên rất dài và khó đọc với class string phức tạp như `"flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all duration-200"`. Trong team không quen Tailwind hoặc code review chặt, điều này gây tranh cãi và làm chậm quá trình review.

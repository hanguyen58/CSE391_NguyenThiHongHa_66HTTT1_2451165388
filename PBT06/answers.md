# 🅱️ TRACK A — BOOTSTRAP 5

## PHẦN A — ĐỌC HIỂU

---

### Câu A1 (10đ) — Grid System

```
| Kích thước | `< 768px`       | `768px - 991px` | `≥ 992px`    |
| ---------- | --------------- | --------------- | ------------ |
| Số cột     | 1 cột           | 2 cột           | 4 cột        |
| Box layout | Các box xếp dọc | 2 box / hàng    | 4 box / hàng |
```

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
 
# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

## Câu A1 (5đ) — Input Types (answers.md - Phần A)

Liệt kê 10 input types khác nhau trong HTML5, cho mỗi type:

1. `type="email"` → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
2. `type="password"` → Ô nhập bị ẩn ký tự → Nhập mật khẩu
3. `type="number"` → Ô nhập số có mũi tên tăng/giảm → Nhập số lượng sản phẩm
4. `type="tel"` → Ô nhập số điện thoại → Form đặt hàng
5. `type="date"` → Bộ chọn ngày → Chọn ngày sinh, ngày giao hàng
6. `type="checkbox"` → Ô tick chọn nhiều → Đồng ý điều khoản, chọn sản phẩm
7. `type="radio"` → Chọn 1 trong nhiều → Chọn giới tính, phương thức thanh toán
8. `type="file"` → Chọn file từ máy → Upload ảnh sản phẩm
9. `type="range"` → Thanh trượt → Chọn mức giá, số ngày giao
10. `type="search"` → Ô tìm kiếm → Tìm sản phẩm

## Câu A2 (5đ) — Validation Attributes (answers.md - Phần A)

**- Trường hợp 1:
    `required`, để trống → Không submit, Vì required bắt buộc nhập
**- Trường hợp 2:**
    `type="email"`, với "abc" → Không submit, Vì không đúng format email
**- Trường hợp 3:**
    `min=1 max=10`, nhập 15 → Không submit, Vì vượt max
**- Trường hợp 4:**
    `pattern="[0-9]{10}"`, nhập "abc123" → Không submit, Vì không đủ 10 chữ số
**- Trường hợp 5:**
    `minlength="8"`, nhập "123" → Không submit, Vì độ dài < 8

    
Kết quả validation:

-> kết quả giống với dự đoán

## Câu A3 (5đ) — Accessibility (answers.md - Phần A)

**1. `<label for="email">` quan trọng cho người dùng screen reader vì:**
    + Screen reader đọc label trước input
    + Giúp người khiếm thị hiểu input là gì
    + Click vào label → focus vào input
**2. `<fieldset> + <legend>` dùng khi:**
    + Nhóm các input liên quan
    + Ví dụ:
```
<fieldset>
  <legend>Thông tin cá nhân</legend>
  <input type="text">
</fieldset>
```
**3. `aria-label`**
    + `aria-label` dùng khi Không có `<label>` hiển thị
    + Không nên dùng `aria-label` khi đã có `<label>` vì sẽ trùng thông tin gây rối cho người đọc

## Câu A4 (5đ) — Media (answers.md - Phần A)

**1. `loading="lazy"`**
    + Dùng thuộc tính này trên thẻ `<img>` làm cho ảnh chỉ được load khi gần cuộn tới, giúp tăng tốc độ load và giảm băng thông
    + Không nên dùng khi nó là ảnh quan trọng (ví dụ: Banner đầu trang)
**2.**
    + Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì nó đảm bảo tính tương thích trình duyệt
    + Format video web phổ biến: MP4, WebM,Ogg
**3.**
    + Thuộc tính alt trên `<img>` dùng để: mô tả ảnh cho screen reader, hiển thị khi ảnh lỗi
    + `alt` tốt cho
        Ảnh sản phẩm iPhone 16: `alt="Điện thoại iPhone 16 màu titan"`
        Ảnh trang trí (decorative): `alt=""`
Ảnh biểu đồ doanh thu Q1/2026: `alt="Biểu đồ cột thể hiện doanh thu Quý 1 năm 2026 đạt 500 tỷ đồng, tăng 15% so với cùng kỳ năm trước"`

## Câu A5 (5đ) — So sánh `<figure>` vs `<img>` (answers.md - Phần A)

    - Cách 1 (<img>): Dùng khi ảnh đơn giản, ví dụ: Icon sản phẩm, logo nhỏ
    - Cách 2 (<figure>): Dùng khi có mô tả, ví dụ: Ảnh sản phẩm có giá, ảnh blog có chú thích

------
# PHẦN B — THỰC HÀNH CODE (55 điểm)

## Bài B1 (20đ) — Form Đăng ký Tài khoản (answers.md - Phần B)

    HTML không thể validate confirm password vì HTML không thể so sánh 2 input,nên muốn kiểm tra password trùng thì phải dùng JavaScript

-------
# PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)

## Câu C1 (10đ) — Debug Form (answers.md - Phần C)

+ Lỗi 1: Không có `<label for>` cho ô Tên, vi phạm accessibility
    Sửa:
```
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>
```
+ Lỗi 2: Email không có `label` và không `required`, User có thể bỏ trống
    Sửa:
```
<label for="email">Email:</label>
<input type="email" id="email" name="email" required placeholder="Email của bạn">
```
+ Lỗi 3: Password không có validation, Không có `minlength`
    Sửa:
```
<label for="pass">Mật khẩu:</label>
<input type="password" id="pass" name="pass" required minlength="8">
```
+ Lỗi 4: Confirm password không có `label`,`name`,  `id`, không dùng được dữ liệu
    Sửa:
```
<label for="confirm">Nhập lại mật khẩu:</label>
<input type="password" id="confirm" name="confirm" required>
```
+ Lỗi 5: Phone dùng `type="text"`, không có validation
    Sửa:
```
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="0901234567">
```
+ Lỗi 6: `<select>` không có label, Người dùng không hiểu
    Sửa;
```
<label for="city">Thành phố:</label>
<select id="city" name="city">
```
+ Lỗi 7: Checkbox thiếu input, không thể tick
    Sửa:
```
<label>
    <input type="checkbox" name="agree" required>
    Tôi đồng ý điều khoản
</label>
```
+ Lỗi 8: Lỗi 8: Submit dùng `<input>`, dùng `<button>`
    Sửa:
```
<button type="submit">Gửi</button>
```

## Câu C2 (10đ) — Thiết kế chiến lược Validation (answers.md - Phần C)

**1.** Viết pattern regex cho CMND/CCCD và Số tài khoản
- CMND/CCCD
```  
^[0-9]{12}$
```

- Số tài khoản
```
^[0-9]{10,15}$
```

**2.** HTML5 validation chưa đủ an toàn cho ứng dụng ngân hàng. Vì có thể bị bypass, không xử lý logic nghiệp vụ, Không kiểm tra phía server, luôn phải validate lại ở backend.

**3.** 3 loại validation mà HTML5 không thể làm được là:
    + So sánh giữa nhiều field
    + Kiểm tra dữ liệu trong database
    + Validation logic phức tạp

**4.** 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend là:
    + Injection (tấn công dữ liệu)
    + Dữ liệu sai vẫn được lưu 


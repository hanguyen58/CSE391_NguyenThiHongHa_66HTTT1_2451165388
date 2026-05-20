# Câu A1 (5đ) — HTTP & Browser (answers.md - Phần A)

## 1. Khi bạn gõ https://shopee.vn vào trình duyệt và nhấn Enter, hãy liệt kê đúng thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render).

- DNS Lookup
- TCP Connection
- TLS Handshake
- Gửi HTTP Request
- Server xử lý và trả HTTP Response
- Browser parse HTML
- Tải tài nguyên phụ
- Render

## 2. 
### 2.1. Trong DevTools của Chrome, tab Network cho thấy thông tin gì?
Cho thấy thông tin:
- Danh sách các request
- Status
- Time
- Size
- Waterfall

### 2.2.
- Status Code của request đầu tiên
  
![Kết quả Network câu A1 ý 1](cau_a1_y1.jpg)

- Tổng thời gian load trang

![Kết quả Network câu A1 ý 1](cau_a1_y2.jpg)

- Một request trả về file CSS

![Kết quả Network câu A1 ý 1](cau_a1_y3.jpg)

# Câu A2 (5đ) — Semantic HTML (answers.md - Phần A)

- Lỗi:
+ Dùng `<div>` thay vì semantic tags
+ Không có `<header>`, `<nav>`, `<main>`
+ Không dùng `<h1>` cho tiêu đề chính
+ Không dùng `<article>` cho sản phẩm
+ Không có `alt` cho ảnh
- Sửa lại:
```
<header>
    <h1>ShopTLU</h1>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <article>
        <h2>iPhone 16 Pro</h2>
        <p>25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </figure>
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

# Câu A3 (5đ) — Block vs Inline (answers.md - Phần A)

![Câu A3](cau_a3.jpg)
Giải thích:
- `<div>` : Là 1 block chiếm 1 dòng riêng
- `<span>`,`<strong>` : Là inline nằm cùng dòng

# Câu A4 (5đ) — Table (answers.md - Phần A)
- Sự khác nhau:
+ `<thead>` : là phần header, chứa tiêu đề
+ `<tbody>` : là phần giữa, chứa dữ liệu
+ `<tfoot>` : là phần dưới, để tổng kết
- KHÔNG NÊN dùng table để tạo layout trang web vì
+ Khả năng truy cập kém
+ Tốc độ tải trang chậm
+ Khó bảo trì và nâng cấp
+ Code rối
-----

# Bài B4 (15đ) — Phân tích trang web thật (answers.md - Phần B)

## 1

- 3 thẻ semantic HTML5 mà trang đó sử dụng

![3 thẻ semantic HTML5 mà trang đó sử dụng](screenshots%20B%C3%A0i%20B4/B4.1.jpg)

+ Thẻ `<noscript>`: Thẻ này dùng để hiển thị nội dung thay thế nếu trình duyệt không hỗ trợ hoặc bị tắt JavaScript
+ Thẻ `<script>`: Đây là thẻ để nhúng mã thực thi
+ Thẻ `<div>` : Chứa nội dung chính của trang web

## 2

![Thẻ table](screenshots%20B%C3%A0i%20B4/B4.2.jpg)

- Table hiển thị hướng dẫn chọn size quần
- Có dùng `<thead>`,`<tbody>`

## 3
![Thẻ form](screenshots%20B%C3%A0i%20B4/B4.3.jpg)
- `action`: `/search`
- `method`: `get`
- `input types`: `type="button"`

-------
# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Thiết kế cấu trúc (answers.md - Phần C)

-Header + Navigation
```
    <!-- HEADER: chứa logo + menu chính -->
    <header>
        <div class="logo">Logo</div> <!-- div vì chỉ là container -->
        <nav>  <!-- nav: dùng cho điều hướng chính -->
            <ul> <!-- ul vì menu không cần thứ tự -->
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Danh mục</a></li>
                <li><a href="#">Liên hệ</a></li>
            </ul>
        </nav>
    </header>
```

- Breadcrumb (Trang chủ > Điện thoại > iPhone 16)
```
    <nav aria-label="breadcrumb"> <!-- nav vì là điều hướng -->
        <ol> <!-- ol vì có thứ tự cấp bậc -->
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Điện thoại</a></li>
            <li aria-current="page">iPhone 16</li> <!-- trang hiện tại -->
        </ol>
    </nav>
    
    <main> <!-- main: nội dung chính của trang -->

        <!-- section: khu vực chi tiết sản phẩm -->
        <section class="product-detail">

            <!-- article: 1 sản phẩm là 1 nội dung độc lập -->
            <article>
```

- Khu vực ảnh sản phẩm (5 ảnh)
```
          <section class="product-images">
                   <!-- figure dùng cho ảnh minh họa -->
                    <figure>
                        <img src="img1.jpg" alt="Ảnh sản phẩm 1">
                    </figure>
                    <figure>
                        <img src="img2.jpg" alt="Ảnh sản phẩm 2">
                    </figure>
                    <figure>
                        <img src="img3.jpg" alt="Ảnh sản phẩm 3">
                    </figure>
                    <figure>
                        <img src="img4.jpg" alt="Ảnh sản phẩm 4">
                    </figure>
                    <figure>
                        <img src="img5.jpg" alt="Ảnh sản phẩm 5">
                    </figure>
                </section>
```

- Thông tin sản phẩm (tên, giá, đánh giá sao, mô tả)
```
          <section class="product-info">
                    
                    <h1>Tên sản phẩm</h1> <!-- h1 vì tiêu đề chính -->

                    <p class="price">Giá sản phẩm</p> <!-- p vì chỉ là text -->

                    <!-- Đánh giá -->
                    <div class="rating"> <!-- div vì chỉ là container -->
                        <span>★★★★★</span> <!-- span vì inline -->
                        <span>(100 đánh giá)</span>
                    </div>

                    <!-- Mô tả -->
                    <p>Mô tả sản phẩm...</p>
                </section>
```

- Bảng thông số kỹ thuật
```
          <section class="specs">
                <h2>Thông số kỹ thuật</h2>

                <!-- table dùng cho dữ liệu dạng bảng -->
                <table>
                    <thead>
                        <tr>
                            <th>Thuộc tính</th>
                            <th>Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Màn hình</td>
                            <td>6.1 inch</td>
                        </tr>
                        <tr>
                            <td>Pin</td>
                            <td>4000mAh</td>
                        </tr>
                    </tbody>
                </table>
            </section>
```

- Khu vực đánh giá/bình luận
```
      <section class="reviews">
                <h2>Đánh giá & Bình luận</h2>

                <!-- Mỗi comment là 1 article -->
                <article class="review">
                    <h3>Người dùng A</h3>
                    <p>Rất tốt!</p>
                </article>

                <article class="review">
                    <h3>Người dùng B</h3>
                    <p>Ổn trong tầm giá</p>
                </article>
            </section>

        </section>
```

- Sidebar: Sản phẩm tương tự
```
      <aside> <!-- aside vì nội dung phụ -->
            <h2>Sản phẩm tương tự</h2>

            <ul> <!-- danh sách sản phẩm -->
                <li><a href="#">Sản phẩm 1</a></li>
                <li><a href="#">Sản phẩm 2</a></li>
                <li><a href="#">Sản phẩm 3</a></li>
            </ul>
        </aside>
```

- Footer
```
    <footer>
        <p>© 2026 - Bản quyền</p>
    </footer>

```


## Câu C2 (10đ) — So sánh & Tranh luận (answers.md - Phần C)
```
    Theo tôi không nên dùng <div> cho mọi thứ. Tuy SEO có các thẻ như <header>, <main>, <article>, <h1> giúp công cụ tìm kiếm hiểu được cấu trúc trang và xác định đâu là nội dung quan trọng. Nhưng nếu toàn <div>, trang web sẽ khó được index hiệu quả vì thiếu ngữ nghĩa. Về Accessibility: các công cụ hỗ trợ như screen reader dựa vào semantic để giúp người khiếm thị điều hướng nhanh hơn.
Ví dụ, họ có thể nhảy trực tiếp đến <nav> hoặc <main> thay vì phải đọc toàn bộ nội dung như khi dùng <div>. Thực tế như xây dựng một trang web nếu mỗi bài viết được bọc trong <article> và tiêu đề dùng <h2>, thì cả công cụ tìm kiếm lẫn screen reader đều nhận diện rõ đây là các nội dung độc lập. Điều này giúp cải thiện trải nghiệm người dùng và khả năng hiển thị trên Google. Semantic HTML không tốn thời gian, mà giúp code rõ ràng, dễ hiểu và chuyên nghiệp hơn.
```



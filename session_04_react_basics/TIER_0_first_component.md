# Bài 0.1 — Chạy React đầu tiên (5 phút)
**1.. File `.jsx` khác gì file `.js`?**
- .js (JavaScript): Chỉ chứa mã JavaScript tiêu chuẩn. Nếu bạn viết thẻ HTML (như `<h1>`) trực tiếp vào file `.js`, trình duyệt hoặc trình biên dịch sẽ báo lỗi cú pháp ngay lập tức.

- .jsx (JavaScript XML): Là một phần mở rộng cú pháp của JavaScript. Nó cho phép bạn viết trực tiếp mã giống như HTML ngay trong lòng JavaScript. Công cụ build (như Vite) sẽ tự động dịch đoạn JSX này thành mã JavaScript mà trình duyệt có thể hiểu được.

**2. Tại sao phải `export default App`?**
- Trong React, mỗi file thường là một module độc lập. Để các file khác (ví dụ: file `main.jsx` - nơi kích hoạt toàn bộ dự án) có thể "nhìn thấy" và sử dụng component `App`, bạn buộc phải xuất nó ra bằng lệnh `export`.

- Từ khóa `default` nghĩa là đây là thành phần chính, thành phần mặc định của file này. Khi file khác import, họ có thể đặt tên tùy ý mà không cần dùng dấu ngoặc nhọn `{}`.

**3. Thử xóa export default → Chuyện gì xảy ra?**
- Kết quả: Dự án của bạn sẽ bị lỗi ngay lập tức (thường là lỗi ở file `main.jsx` với thông báo kiểu: "The requested module does not provide an export named 'default'").

- Lý do: File `main.jsx` đang cố tìm cổng chính (default) của file `App.jsx` để lấy linh kiện ra dùng, nhưng bạn đã đóng cái cổng đó lại rồi.

# Bài 0.2 — JSX là HTML "xịn hơn" (10 phút)

## Bài 1:

```
function UserProfile() {
    return (
        <div className="profile"> {/* class -> className */}
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" /> {/* Thêm dấu / để đóng thẻ */}
            <table>
                <tbody> {/* Thêm tbody để code HTML chuẩn và đẹp hơn trong React */}
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;
```

## Bài 2:

```
function ProductInfo() {
    return (
        <div className="product"> {/* class -> className */}
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p> {/* class -> className */}
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button>Mua ngay</button>
        </div>
    );
}

export default ProductInfo;
```

# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Theo flow mặc định | Có | Layout bình thường |
| `relative` | Có | So với vị trí ban đầu của chính nó | Có | Dịch chuyển nhẹ phần tử, làm mốc cho `absolute` |
| `absolute` | Không | So với parent gần nhất có position khác `static` | Có | Badge, tooltip, popup nhỏ |
| `fixed` | không | So với viewport (màn hình) | Không | Header cố định, nút scroll top |
| `sticky` | Có | Theo parent/container khi scroll | Vừa có vừa không | Sidebar sticky, menu sticky |

**Câu hỏi thêm:**
- `absolute` tham chiếu `body` khi: tất cả các phần tử cha tổ tiên bao bọc nó đều có thuộc tính `position: static` (mặc định), hoặc không khai báo position. Lúc này nó tìm không thấy điểm tựa nào nên sẽ bám vào block chứa ban đầu (thường là thẻ `<html>` hoặc `<body>`).
- Khái niệm "nearest positioned ancestor": Có nghĩa là "Phần tử tổ tiên gần nhất có định vị". Khi một element nhận `position: absolute`, trình duyệt sẽ đi ngược lên trên cây DOM để tìm phần tử cha, ông, cố... nào gần nó nhất có `position` là `relative`, `absolute`, `fixed`, hoặc `sticky`. Nó sẽ lấy biên của phần tử đó làm gốc tọa độ `(0,0)` để tính toán các khoảng cách `top`, `right`, `bottom`, `left`.

## Câu A2 (10đ) — Flexbox vs Grid
- Trường hợp 1: Flexbox mặc định
    + Dự đoán: 4 items sẽ xếp thành 1 hàng ngang. Vì có flex: 1, cả 4 items sẽ chia đều 100% chiều rộng của container (mỗi item chiếm 25%).
    + Sơ đồ:
```
┌────────────────┬────────────────┬────────────────┬────────────────┐
│ Item 1 (25%)   │ Item 2 (25%)   │ Item 3 (25%)   │ Item 4 (25%)   │
└────────────────┴────────────────┴────────────────┴────────────────┘
```
- Trường hợp 2: Flexbox wrap có kích thước phần trăm
    + Dự đoán: Có 6 items. Mỗi item rộng 45%. Tổng cộng layout sẽ có 3 hàng, mỗi hàng 2 cột.
    + Sơ đồ:
```
┌───────┬───────┐
│   1   │   2   │
├───────┼───────┤
│   3   │   4   │
├───────┼───────┤
│   5   │   6   │
└───────┴───────┘
```
- Trường hợp 3: Điều hướng căn đều và căn giữa trục dọc
    + Dự đoán: 3 items nằm trên 1 hàng ngang. Item 1 dính sát lề trái, Item 3 dính sát lề phải, Item 2 nằm chính giữa container. Cả 3 item đều được căn giữa hoàn hảo theo chiều dọc (chiều cao).
    + Sơ đồ:
```
| Item1          Item2          Item3 |
```
- Trường hợp 4: Fixed-Fluid-Fixed Grid Layout
    + 3 items xếp thành 1 hàng ngang gồm 3 cột. Cột trái rộng cố định 200px, cột phải rộng cố định 200px.Khoảng cách giữa các cột là 20px.
    + Sơ đồ:
```
┌──────┬──────────────┬──────┐
│ 200  │     auto     │ 200  │
└──────┴──────────────┴──────┘
```
- Trường hợp 5: Grid lấp đầy cột tự động xuống hàng
    + Grid chia thành 3 cột đều nhau. Tổng cộng có 7 items. Hàng 1 chứa Item 1, 2, 3. Hàng 2 chứa Item 4, 5, 6. Hàng 3 chỉ có duy nhất Item 7 nằm ở cột đầu tiên bên trái, 2 ô còn lại bên phải bỏ trống.
    + Sơ đồ:
```
┌────┬────┬────┐
│ 1  │ 2  │ 3  │
├────┼────┼────┤
│ 4  │ 5  │ 6  │
├────┼────┼────┤
│ 7  │    │    │
└────┴────┴────┘
```

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

**1. Navigation bar ngang (logo + menu + buttons)**
- Giải pháp: Dùng Flexbox.
- Giải thích: Thanh điều hướng (Navbar) là bố cục 1 chiều (1D) theo trục ngang. Các phần tử bên trong có kích thước nội dung không giống nhau (Logo dạng khối/ảnh, Menu chứa text dài ngắn khác nhau, cụm Button đăng nhập). Flexbox xử lý cực tốt việc phân bổ không gian linh hoạt này bằng thuộc tính justify-content: space-between để đẩy các cụm về các góc và dùng align-items: center để căn giữa dọc hoàn hảo.

**2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)**
- Giải pháp: Dùng Grid.
- Giải thích: Đây là bố cục 2 chiều (2D) dạng lưới ma trận chặt chẽ. Yêu cầu tiên quyết là các ô ảnh phải thẳng hàng tăm tắp theo cả hàng ngang lẫn cột dọc và chia đều chính xác không gian (grid-template-columns: repeat(3, 1fr)). Khi số lượng ảnh tăng lên vô hạn, Grid sẽ tự động quản lý việc tạo hàng mới và xếp ảnh vào đúng luồng mà không lo bị lệch kích thước.

**3. Layout blog: main content + sidebar**
- Giải pháp: Dùng Grid.
- Giải thích: Đây là khung xương lớn (Macro Layout) phân chia cấu trúc trang tổng thể. Grid giúp chúng ta thiết lập các vùng cố định một cách tường minh và an toàn (ví dụ: grid-template-columns: 1fr 300px; gap: 20px;). Việc dùng Grid ở đây giúp kiểm soát độ cao của Sidebar luôn bằng độ cao của Main content một cách tự động, đồng thời quản lý khoảng cách (gap) giữa chúng mà không bị rủi ro vỡ dòng như Flexbox khi nội dung thay đổi.

**4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)**
- Giải pháp: Dùng Grid (hoặc kết hợp cả hai).
- Giải thích: Dù nhìn qua giống bố cục 1 chiều, nhưng Footer thường yêu cầu 4 cột này phải có chiều rộng tuyệt đối bằng nhau để tạo cảm giác cân xứng, bất kể chữ bên trong dài hay ngắn. Sử dụng CSS Grid với tỉ lệ grid-template-columns: repeat(4, 1fr) là giải pháp nhanh, sạch và chuẩn nhất để ép các cột bằng chằn chặn. (Nếu lên mobile cần chuyển thành 2 hàng - 2 cột hoặc 4 hàng - 1 cột thì Grid cũng đổi cấu trúc mượt mà hơn).

**5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)**
- Giải pháp: Dùng Flexbox hướng dọc (flex-direction: column).
- Giải thích: Các thành phần bên trong một Card sản phẩm được sắp xếp theo 1 chiều dọc (từ trên xuống dưới). Cái khó ở đây là độ dài tên sản phẩm/mô tả sẽ không đều nhau, khiến nút bấm bị trồi sụt. Khi kích hoạt Flexbox dạng cột cho Card, ta có thể áp dụng "vũ khí bí mật" margin-top: auto cho phần tử nút bấm. Thuộc tính này sẽ tự động tính toán và húp trọn toàn bộ khoảng trống thừa phía trên, ép nút "Mua" luôn dính chặt vào đáy Card một cách hoàn hảo.

## Câu C2 (10đ) — Debug Flexbox
**Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống**
- Nguyên nhân gây lỗi:
    + Các thẻ `.card` có chiều cao bằng nhau nhờ cơ chế kéo giãn tự động của Flexbox cha (`align-items: stretch` mặc định). Tuy nhiên, luồng hiển thị bên trong mỗi `.card` vẫn tuân theo dạng block tự nhiên (từ trên xuống).
    + Do tiêu đề h3 hoặc đoạn văn mô tả của mỗi sản phẩm có độ dài ngắn khác nhau, phần nội dung này sẽ chiếm diện tích khác nhau. Nút bấm .btn xếp ngay sau text nên bị đẩy trồi sụt theo độ dài của text, không thể thẳng hàng ở đáy card.
- Code CSS sửa lỗi:
```
.card-container { 
    display: flex; 
    flex-wrap: wrap; 
}
.card { 
    width: 30%; 
    margin: 1.5%; 
    display: flex;
    flex-direction: column;
}
.card img { 
    width: 100%; 
}
.card h3 { 
    font-size: 18px; 
}
.card .btn { 
    padding: 10px; 
    margin-top: auto; 
}
```
**Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên**
- Nguyên nhân gây lỗi:
    + Thuộc tính `display: flex`; mới chỉ kích hoạt môi trường Flexbox cho `.hero`, giúp các phần tử con bên trong sẵn sàng để căn chỉnh.
    + Nếu không khai báo thêm các thuộc tính điều hướng không gian, trình duyệt sẽ mặc định xếp các phần tử con sát về góc trái trên (`justify-content: flex-start` và `align-items: flex-start`). Do đó, `.hero-content` không thể tự chạy ra giữa màn hình.
- Code CSS sửa lỗi:
```
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;  
    align-items: center;    
} 
.hero-content {
    text-align: center;
}
```
**Lỗi 3: Sidebar bị co lại khi content quá dài**
- Nguyên nhân gây lỗi:
    + Trong cơ chế mặc định của Flexbox, thuộc tính `flex-shrink` (hệ số co lại) của các phần tử con luôn bằng `1`.
    + Khi phần nội dung `.content` quá dài và phình to ra, Flexbox sẽ ưu tiên nhường không gian cho nội dung lớn và bắt các phần tử anh em (ở đây là `.sidebar`) phải tự co nhỏ (shrink) lại dưới mức `250px` ban đầu để tránh làm tràn container cha.
- Code CSS sửa lỗi:
```
.layout { 
    display: flex; 
}
.sidebar { 
    width: 250px; 
    flex-shrink: 0; 
}
.content { 
    flex: 1; 
}
```

# Bài 1.1 — Component render lần đầu (8 phút)
## 1. Tại sao component chỉ render 1 lần?

Vì dữ liệu bên trong component (LifecycleDemo) hoàn toàn là dữ liệu tĩnh, tĩnh lặng như tờ giấy. Trình duyệt chỉ cần đọc qua một lần, dịch sang HTML rồi dán lên màn hình là xong nhiệm vụ (gọi là quá trình Mount). Không có bất kỳ tác nhân nào bắt nó phải đọc lại file này cả.

## 2. Khi nào nó sẽ render lại?

Nó chỉ render lại (Re-render) khi có sự thay đổi từ bên ngoài tràn vào (gọi là Props) hoặc khi dữ liệu "nội tại" được quản lý bởi React (gọi là State) thay đổi.
(Lưu ý nhỏ: Trong môi trường phát triển `StrictMode` của Vite, bạn có thể thấy log chạy 2 lần khi vừa reload trang. Đây là tính năng của React nhằm giúp kiểm tra lỗi, khi deploy thực tế nó sẽ chỉ chạy đúng 1 lần).

# Bài 1.2 — Biến "bình thường" vs useState (12 phút)

- Thử nghiệm 1 (BadCounter): Khi nhấn nút, số trên Console tăng dần (1, 2, 3...) nhưng con số hiển thị trên màn hình vẫn đứng yên ở số 0. Vì React không hề biết biến `count` tồn tại hay thay đổi. Nó giống như việc bạn tự tẩy xóa ghi chú trong sổ tay của mình, nhưng không báo cho thư ký biết để in lại bản thảo mới.

- Thử nghiệm 2 (GoodCounter): Khi nhấn nút, con số trên màn hình nhảy lập tức (1, 2, 3...). Hàm `setCount` đóng vai trò như một chiếc chuông báo động. Mỗi khi gọi `setCount`, chiếc chuông này reo lên báo cho React: "Dữ liệu thay đổi rồi, chạy lại hàm GoodCounter() và vẽ lại giao diện mới ngay đi!"

- Thử nghiệm 3 (Console log): Mỗi lần bạn nhấn nút ở `GoodCounter`, dòng chữ `"Component render!"` (nếu đặt ở đầu hàm) sẽ xuất hiện thêm một lần. Số lần click nút chính là số lần Re-render!


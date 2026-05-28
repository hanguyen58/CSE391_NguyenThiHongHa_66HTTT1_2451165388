#  Bài 2.1 — Hiển thị biến đơn giản (8 phút)

```
function ChallengeVariables() {
    // 1. Thông tin cá nhân
    const user = {
        name: "Trần Anh Tuấn",
        age: 22,
        hometown: "Hà Nội"
    };

    // 2. Xử lý lời chào theo giờ hiện tại
    const currentHour = new Date().getHours();
    let greeting = "Chào buổi tối 🌙";
    if (currentHour < 12) {
        greeting = "Chào buổi sáng ☀️";
    } else if (currentHour < 18) {
        greeting = "Chào buổi chiều 🌤️";
    }

    // 3. Tính toán chỉ số BMI
    const weight = 65; // kg
    const height = 1.70; // m
    const bmi = (weight / (height * height)).toFixed(1); // Làm tròn 1 chữ số thập phân

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>{greeting}</h2>
            
            <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
                <h3>Thông tin cá nhân</h3>
                <p>Họ và tên: <strong>{user.name}</strong></p>
                <p>Tuổi: {user.age}</p>
                <p>Quê quán: {user.hometown}</p>
            </div>

            <div style={{ marginTop: "15px", padding: "15px", background: "#e8f4fd", borderRadius: "8px" }}>
                <h3>Sức khỏe</h3>
                <p>Cân nặng: {weight}kg | Chiều cao: {height}m</p>
                <p>Chỉ số BMI của bạn: <strong>{bmi}</strong></p>
            </div>
        </div>
    );
}

export default ChallengeVariables;
```

# Bài 2.2 — Conditional Rendering (Hiển thị có điều kiện) (10 phút)

```
function ChallengeCondition() {
    const isOnline = true;
    const isLoggedIn = false;
    const stock = 0;

    return (
        <div style={{ padding: "20px" }}>
            {/* 1. Trạng thái Online/Offline */}
            <p>Trạng thái hệ thống: {isOnline ? "🟢 Đang hoạt động" : "🔴 Mất kết nối"}</p>

            {/* 2. Hiện/Ẩn menu dựa vào isLoggedIn */}
            <nav style={{ background: "#eee", padding: "10px", margin: "10px 0" }}>
                <span>Trang chủ | </span>
                <span>Sản phẩm | </span>
                {isLoggedIn && <span style={{ color: "blue", fontWeight: "bold" }}>Trang Quản Trị | </span>}
                {isLoggedIn ? <button>Đăng xuất</button> : <button>Đăng nhập</button>}
            </nav>

            {/* 3. Hiển thị tình trạng kho hàng */}
            <div>
                <h4>Sản phẩm A</h4>
                {stock === 0 ? (
                    <span style={{ color: "red", fontWeight: "bold" }}>❌ Hết hàng</span>
                ) : (
                    <span style={{ color: "green" }}>Còn lại: {stock} sản phẩm</span>
                )}
            </div>
        </div>
    );
}

export default ChallengeCondition;
```

# Bài 2.3 — Render danh sách (List Rendering) (10 phút)

```
function ChallengeList() {
    const products = [
        { id: 101, name: "Chuột Gaming Logitech", price: 850000 },
        { id: 102, name: "Bàn phím cơ AKKO", price: 1550000 },
        { id: 103, name: "Tai nghe Sony WH", price: 4200000 },
        { id: 104, name: "Lót chuột Razer", price: 350000 },
        { id: 105, name: "Đèn LED màn hình", price: 1200000 }
    ];

    // Tính tổng giá bằng hàm reduce của JS
    const totalCartValue = products.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Giỏ hàng của bạn</h2>
            <ul>
                {products.map((product) => {
                    // Kiểm tra xem giá có lớn hơn 1 triệu không
                    const isHighPrice = product.price > 1000000;

                    return (
                        <li key={product.id} style={{ margin: "8px 0" }}>
                            <span>{product.name} - </span>
                            <span style={{ color: isHighPrice ? "red" : "black", fontWeight: isHighPrice ? "bold" : "normal" }}>
                                {product.price.toLocaleString("vi-VN")} đ
                            </span>
                            {isHighPrice && <span> 🔥 (Sản phẩm cao cấp)</span>}
                        </li>
                    );
                })}
            </ul>

            <hr />
            <h3>Tổng tiền thanh toán: 
                <span style={{ color: "blue" }}> {totalCartValue.toLocaleString("vi-VN")} đ</span>
            </h3>
        </div>
    );
}

export default ChallengeList;
```
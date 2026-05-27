function inHoaDonNhaHang(danhSachMon, coTip = false, giaTriTip = 0) {
    let tongTienGoc = 0;
    let chuoiDanhSachMon = "";

    // 1. Duyệt qua mảng để tính tổng tiền gốc và dựng khung danh sách món
    for (let i = 0; i < danhSachMon.length; i++) {
        const mon = danhSachMon[i];
        const thanhTien = mon.price * mon.quantity;
        tongTienGoc += thanhTien;

        // Định dạng text hiển thị giá rút gọn (ví dụ: 65k)
        const giaRutGon = `${mon.price / 1000}k`;
        const thanhTienRutGon = `${thanhTien / 1000}k`;

        // Tạo dòng text món ăn và dùng padEnd để căn lề thẳng hàng cột bên phải
        const STT = `${i + 1}. `;
        const thongTinMon = `${STT}${mon.name.padEnd(10)} x${mon.quantity.toString().padEnd(3)} @${giaRutGon.padEnd(4)}`;
        const dongMonAn = `║ ${thongTinMon.padEnd(25)} = ${thanhTienRutGon.padEnd(6)} ║\n`;
        
        chuoiDanhSachMon += dongMonAn;
    }

    // 2. Tính phần trăm giảm giá theo quy tắc cấu trúc phân tầng
    let phanTramGiam = 0;
    if (tongTienGoc > 1000000) {
        phanTramGiam = 15;
    } else if (tongTienGoc > 500000) {
        phanTramGiam = 10;
    }

    // Quy tắc: Ngày thứ 3 (Wednesday) giảm thêm 5%
    // Lưu ý: Trong JS, hệ thống Date quy ước Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3
    const ngayHienTai = new Date();
    if (ngayHienTai.getDay() === 3) {
        phanTramGiam += 5;
    }

    const tienGiamGia = tongTienGoc * phanTramGiam / 100;
    const tongSauGiam = tongTienGoc - tienGiamGia;

    // 3. Tính thuế VAT 8% dựa trên số tiền SAU KHI đã chiết khấu giảm giá
    const tienVAT = tongSauGiam * 0.08;

    // 4. Tính toán tiền Tip (Optional)
    let tienTip = 0;
    if (coTip) {
        // Nếu người dùng truyền vào số tiền tip cụ thể thì lấy số đó, ngược lại mặc định là 5%
        tienTip = giaTriTip > 0 ? giaTriTip : (tongSauGiam * 0.05);
    }

    // 5. Tổng số tiền khách phải thanh toán cuối cùng
    const tongThanhToan = tongSauGiam + tienVAT + tienTip;

    // Hàm phụ trợ định dạng hiển thị tiền Việt Nam kèm chữ "đ"
    const formatVND = (num) => num.toLocaleString('vi-VN') + "đ";

    // 6. Kết xuất (Render) giao diện Đồ họa Hóa đơn ra Console
    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
    console.log("╠══════════════════════════════════════╣");
    process.stdout.write(chuoiDanhSachMon); // In chuỗi món ăn không xuống dòng thừa
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ Tổng cộng:${formatVND(tongTienGoc).padStart(25)} ║`);
    console.log(`║ Giảm giá (${phanTramGiam}%):${formatVND(tienGiamGia).padStart(20)} ║`);
    console.log(`║ VAT (8%):${formatVND(tienVAT).padStart(26)} ║`);
    console.log(`║ Tip:${formatVND(tienTip).padStart(31)} ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:${formatVND(tongThanhToan).padStart(24)} ║`);
    console.log("╚══════════════════════════════════════╝");
}

const hoaDonMau = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

inHoaDonNhaHang(hoaDonMau, true, 10000);
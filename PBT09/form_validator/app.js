document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("regForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    const phoneInput = document.getElementById("phone");
    const submitBtn = document.getElementById("submitBtn");
    const strengthBar = document.getElementById("strengthBar");

    // Quản lý trạng thái hợp lệ của từng trường dữ liệu
    const validators = {
        name: false,
        email: false,
        password: false,
        confirm: false,
        phone: false
    };

    // Kiểm tra tổng thể để bật/tắt nút Submit
    function checkFormValidity() {
        const isAllValid = Object.values(validators).every(val => val === true);
        submitBtn.disabled = !isAllValid;
    }

    // Hàm cập nhật UI thông báo lỗi hoặc thành công cho từng input
    function setStatus(input, isValid, errorMsg = "") {
        const messageDiv = input.parentElement.querySelector(".error-msg");
        if (isValid) {
            input.classList.remove("invalid");
            input.classList.add("valid");
            if (messageDiv) messageDiv.textContent = "✅ Hợp lệ";
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            if (messageDiv) messageDiv.textContent = "❌ " + errorMsg;
        }
    }

    // 1. Validate Họ và Tên (2-50 ký tự)
    nameInput.addEventListener("input", () => {
        const value = nameInput.value.trim();
        validators.name = value.length >= 2 && value.length <= 50;
        setStatus(nameInput, validators.name, "Tên phải từ 2 đến 50 ký tự");
        checkFormValidity();
    });

    // 2. Validate Email (Regex)
    emailInput.addEventListener("input", () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validators.email = emailRegex.test(value);
        setStatus(emailInput, validators.email, "Định dạng Email không chính xác");
        checkFormValidity();
    });

    // 3. Password Strength Meter
    passwordInput.addEventListener("input", () => {
        const val = passwordInput.value;
        let strengthPoints = 0;

        // Tính toán các tiêu chí độ mạnh mật khẩu
        if (val.length >= 8) strengthPoints++; // Tiêu chí chiều dài
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) strengthPoints++; // Có chữ Hoa và Thường
        if (/[0-9]/.test(val)) strengthPoints++; // Có chữ số
        if (/[^A-Za-z0-9]/.test(val)) strengthPoints++; // Có ký tự đặc biệt

        // Xóa class cũ của thanh đo
        strengthBar.className = "strength-bar";

        if (val.length === 0) {
            strengthBar.style.width = "0%";
            validators.password = false;
            setStatus(passwordInput, false, "Mật khẩu không được để trống");
        } else if (val.length < 8) {
            strengthBar.classList.add("weak");
            strengthBar.style.width = "33%";
            validators.password = false;
            setStatus(passwordInput, false, "Mật khẩu quá ngắn (Yêu cầu ít nhất 8 ký tự)");
        } else if (strengthPoints >= 2 && strengthPoints < 4) {
            strengthBar.classList.add("medium");
            strengthBar.style.width = "66%";
            validators.password = true;
            setStatus(passwordInput, true);
        } else if (strengthPoints === 4) {
            strengthBar.classList.add("strong");
            strengthBar.style.width = "100%";
            validators.password = true;
            setStatus(passwordInput, true);
        }

        // Kích hoạt kiểm tra lại trường Nhập lại mật khẩu nếu nó đã có dữ liệu
        if (confirmInput.value) {
            confirmInput.dispatchEvent(new Event('input'));
        }
        checkFormValidity();
    });

    // 4. Confirm Password (Khớp với mật khẩu trên)
    confirmInput.addEventListener("input", () => {
        const value = confirmInput.value;
        validators.confirm = (value === passwordInput.value && value.length > 0);
        setStatus(confirmInput, validators.confirm, "Mật khẩu xác nhận không trùng khớp");
        checkFormValidity();
    });

    // 5. Validate Số Điện Thoại & Tự động thêm dấu gạch gõ dạng: 0901-234-567
    phoneInput.addEventListener("input", (e) => {
        let num = e.target.value.replace(/\D/g, ""); // Loại bỏ tất cả ký tự không phải số
        if (num.length > 10) num = num.substring(0, 10); // Cắt chuỗi nếu vượt quá 10 số

        let formatted = "";
        if (num.length > 7) {
            formatted = `${num.substring(0, 4)}-${num.substring(4, 7)}-${num.substring(7)}`;
        } else if (num.length > 4) {
            formatted = `${num.substring(0, 4)}-${num.substring(4)}`;
        } else {
            formatted = num;
        }
        
        e.target.value = formatted; // Cập nhật lại giá trị hiển thị trên ô input

        validators.phone = (num.length === 10);
        setStatus(phoneInput, validators.phone, "Số điện thoại phải gồm đầy đủ 10 số");
        checkFormValidity();
    });

    // Xử lý sự kiện gửi Form thành công
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Ngăn chặn hành vi tải lại trang mặc định của Form
        alert(`🎉 Đăng ký thành công!\n\nChào mừng: ${nameInput.value}\nEmail: ${emailInput.value}\nSĐT: ${phoneInput.value}`);
        form.reset();
        strengthBar.style.width = "0%";
        document.querySelectorAll('input').forEach(input => input.classList.remove('valid', 'invalid'));
        submitBtn.disabled = true;
    });
});
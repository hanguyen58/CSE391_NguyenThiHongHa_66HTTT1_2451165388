function playGame() {
    // 1. Máy tự động sinh số ngẫu nhiên từ 1 đến 100
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    
    let attempts = 0;
    let guessedNumbers = []; // Mảng lưu lại lịch sử các số đã đoán

    alert("Trò chơi bắt đầu! Hãy suy nghĩ thật kỹ trước khi đưa ra con số.");

    // Vòng lặp quản lý lượt chơi (tối đa 7 lần)
    while (attempts < maxAttempts) {
        let input = prompt(`[Lượt đoán ${attempts + 1}/${maxAttempts}]\nMời bạn nhập một số từ 1 đến 100:`);

        // Trường hợp người chơi bấm "Cancel" (Hủy) bỏ cuộc giữa chừng
        if (input === null) {
            alert("Bạn đã chọn thoát trò chơi. Hẹn gặp lại lần sau!");
            return;
        }

        // Chuẩn hóa dữ liệu đầu vào
        input = input.trim();
        let guess = parseInt(input, 10);

        // --- BƯỚC VALIDATE INPUT ---
        // Kiểm tra xem có phải là số nguyên hợp lệ từ 1-100 hay không
        if (input === "" || isNaN(guess) || guess < 1 || guess > 100) {
            alert("❌ Lỗi: Vui lòng chỉ nhập một số nguyên hợp lệ nằm trong khoảng từ 1 đến 100!");
            continue; // Không tính lượt này, yêu cầu nhập lại
        }

        // --- KIỂM TRA TRÙNG SỐ ---
        let isDuplicate = false;
        for (let i = 0; i < guessedNumbers.length; i++) {
            if (guessedNumbers[i] === guess) {
                isDuplicate = true;
                break;
            }
        }
        
        if (isDuplicate) {
            alert(`⚠️ Bạn đã đoán số ${guess} này rồi! Hãy chọn một số khác.`);
            continue; // Không tính lượt này
        }

        // Ghi nhận số hợp lệ vào lịch sử và tăng số lần đoán
        guessedNumbers.push(guess);
        attempts++;

        // --- KIỂM TRA ĐÁP ÁN ---
        if (guess === targetNumber) {
            alert(`🎉 Xuất sắc! Bạn đoán đúng số ${targetNumber} sau ${attempts} lần đoán!`);
            return; // Kết thúc game thắng cuộc
        } else if (guess > targetNumber) {
            alert("📉 Thấp hơn! (Số bạn đoán lớn hơn đáp án của máy)");
        } else {
            alert("📈 Cao hơn! (Số bạn đoán nhỏ hơn đáp án của máy)");
        }
    }

    // Nếu thoát khỏi vòng lặp mà chưa đoán đúng -> Hết lượt (Thua)
    alert(`💥 Hết lượt rồi! Bạn đã thua cuộc.\nĐáp án chính xác của máy là: ${targetNumber}`);
}
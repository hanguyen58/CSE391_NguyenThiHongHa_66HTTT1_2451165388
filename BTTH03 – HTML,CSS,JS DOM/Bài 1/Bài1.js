// --- KHỞI TẠO BIẾN TOÀN CỤC & DỮ LIỆU MẪU ---
let students = JSON.parse(localStorage.getItem('students')) || [
    { id: "SV001", name: "Nguyễn Văn A", dob: "2005-02-15", class: "K66-CNTT", gpa: 8.5, email: "vana@gmail.com" },
    { id: "SV002", name: "Trần Thị B", dob: "2005-08-22", class: "K66-KT", gpa: 7.2, email: "thib@gmail.com" }
];

// --- TRUY XUẤT CÁC PHẦN TỬ DOM THƯỜNG DÙNG ---
const studentTableBody = document.getElementById('student-table-body');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelForm = document.getElementById('btn-cancel-form');
const studentModal = document.getElementById('student-modal');
const studentForm = document.getElementById('student-form');
const modalTitle = document.getElementById('modal-title');
const formMode = document.getElementById('form-mode');

// Form inputs
const inputId = document.getElementById('student-id');
const inputName = document.getElementById('student-name');
const inputDob = document.getElementById('student-dob');
const inputClass = document.getElementById('student-class');
const inputGpa = document.getElementById('student-gpa');
const inputEmail = document.getElementById('student-email');

// --- HÀM 1: HIỂN THỊ DANH SÁCH (RENDER) ---
function renderStudents() {
    studentTableBody.innerHTML = '';

    if (students.length === 0) {
        studentTableBody.innerHTML = `<tr><td colspan="7" class="empty-row">Danh sách trống. Vui lòng thêm sinh viên mới!</td></tr>`;
        updateStatistics();
        return;
    }

    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><b>${student.id}</b></td>
            <td>${student.name}</td>
            <td>${formatDate(student.dob)}</td>
            <td>${student.class}</td>
            <td><span class="badge">${student.gpa}</span></td>
            <td>${student.email}</td>
            <td>
                <button class="btn btn-primary btn-sm btn-edit" data-id="${student.id}">Sửa</button>
                <button class="btn btn-danger btn-sm btn-delete" data-id="${student.id}">Xóa</button>
            </td>
        `;
        studentTableBody.appendChild(tr);
    });

    updateStatistics();
}

// --- HÀM 2: LƯU LOCALSTORAGE ---
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// --- HÀM 3: THỐNG KÊ SỐ LIỆU ---
function updateStatistics() {
    document.getElementById('total-students').innerText = students.length;
    
    if (students.length === 0) {
        document.getElementById('average-gpa').innerText = '0.0';
        return;
    }

    const totalGpa = students.reduce((sum, s) => sum + parseFloat(s.gpa), 0);
    const avgGpa = totalGpa / students.length;
    document.getElementById('average-gpa').innerText = avgGpa.toFixed(2);
}

// --- HÀM 4: HIỂN THỊ THÔNG BÁO (TOAST) ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast-notification');
    toast.innerText = message;
    toast.className = `toast ${type}`; // reset class và gắn type mới
    
    setTimeout(() => { toast.classList.add('hidden'); }, 3000);
}

// --- HÀM 5: ĐỊNH DẠNG NGÀY HIỂN THỊ (DD/MM/YYYY) ---
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// --- HÀM 6: RESET FORM & XÓA LỖI ---
function resetForm() {
    studentForm.reset();
    formMode.value = 'create';
    inputId.disabled = false;
    modalTitle.innerText = "Thêm Sinh Viên Mới";
    
    // Xóa toàn bộ class lỗi css cũ
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        group.querySelector('.error-msg').innerText = '';
    });
}

// ---Hàm 7: - FORM VALIDATION ---
function validateForm() {
    let isValid = true;

    function setError(input, message) {
        const group = input.parentElement;
        group.classList.add('error');
        group.querySelector('.error-msg').innerText = message;
        isValid = false;
    }

    function setSuccess(input) {
        const group = input.parentElement;
        group.classList.remove('error');
        group.querySelector('.error-msg').innerText = '';
    }

    // 1. Kiểm tra Mã Sinh Viên
    const idVal = inputId.value.trim();
    if (!idVal) {
        setError(inputId, 'Mã sinh viên không được để trống.');
    } else if (!/^SV\d{3,5}$/i.test(idVal)) {
        setError(inputId, 'Mã SV phải bắt đầu bằng chữ "SV" và theo sau bởi 3-5 chữ số.');
    } else if (formMode.value === 'create' && students.some(s => s.id.toLowerCase() === idVal.toLowerCase())) {
        setError(inputId, 'Mã sinh viên này đã tồn tại trên hệ thống.');
    } else {
        setSuccess(inputId);
    }

    // 2. Kiểm tra Họ và Tên
    if (!inputName.value.trim()) {
        setError(inputName, 'Họ và tên không được để trống.');
    } else if (inputName.value.trim().length < 3) {
        setError(inputName, 'Họ tên phải dài tối thiểu 3 ký tự.');
    } else {
        setSuccess(inputName);
    }

    // 3. Kiểm tra Ngày Sinh
    if (!inputDob.value) {
        setError(inputDob, 'Vui lòng chọn ngày sinh.');
    } else {
        setSuccess(inputDob);
    }

    // 4. Kiểm tra Lớp Học
    if (!inputClass.value.trim()) {
        setError(inputClass, 'Lớp học không được để trống.');
    } else {
        setSuccess(inputClass);
    }

    // 5. Kiểm tra Điểm Trung Bình
    const gpaVal = inputGpa.value;
    if (gpaVal === '') {
        setError(inputGpa, 'Điểm TB không được để trống.');
    } else if (isNaN(gpaVal) || gpaVal < 0 || gpaVal > 10) {
        setError(inputGpa, 'Điểm TB phải là số hợp lệ từ 0 đến 10.');
    } else {
        setSuccess(inputGpa);
    }

    // 6. Kiểm tra Email
    const emailVal = inputEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
        setError(inputEmail, 'Email không được để trống.');
    } else if (!emailRegex.test(emailVal)) {
        setError(inputEmail, 'Định dạng Email không hợp lệ (Ví dụ: abc@domain.com).');
    } else {
        setSuccess(inputEmail);
    }

    return isValid;
}

// --- XỬ LÝ SỰ KIỆN (EVENT LISTENERS) ---

// 1. Click mở modal form
btnOpenModal.addEventListener('click', () => {
    resetForm();
    studentModal.classList.remove('hidden');
});

// 2. Click đóng modal form
btnCloseModal.addEventListener('click', () => studentModal.classList.add('hidden'));
btnCancelForm.addEventListener('click', () => studentModal.classList.add('hidden'));

// 3. Sự kiện submit form (Xử lý cả Thêm và Cập nhật)
studentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload trang

    if (!validateForm()) return; // Nếu validation lỗi thì dừng lại

    const studentData = {
        id: inputId.value.trim().toUpperCase(),
        name: inputName.value.trim(),
        dob: inputDob.value,
        class: inputClass.value.trim(),
        gpa: parseFloat(inputGpa.value).toFixed(1),
        email: inputEmail.value.trim()
    };

    if (formMode.value === 'create') {
        // Chế độ: THÊM MỚI
        students.push(studentData);
        showToast('Thêm mới sinh viên thành công!');
    } else {
        // Chế độ: CẬP NHẬT (SỬA)
        const index = students.findIndex(s => s.id === studentData.id);
        if (index !== -1) {
            students[index] = studentData;
            showToast('Cập nhật dữ liệu thành công!');
        }
    }

    saveStudents();
    renderStudents();
    studentModal.classList.add('hidden');
});

// 4. Áp dụng Kỹ thuật Event Delegation (Xử lý sự kiện click cho nút sửa/xóa động)
studentTableBody.addEventListener('click', (e) => {
    // Trường hợp bấm nút SỬA
    if (e.target.classList.contains('btn-edit')) {
        const idToEdit = e.target.getAttribute('data-id');
        const student = students.find(s => s.id === idToEdit);
        
        if (student) {
            resetForm();
            modalTitle.innerText = "Cập Nhật Thông Tin Sinh Viên";
            formMode.value = 'edit';
            
            // Đổ ngược dữ liệu vào form inputs
            inputId.value = student.id;
            inputId.disabled = true; // Không cho sửa Khóa chính (Mã SV)
            inputName.value = student.name;
            inputDob.value = student.dob;
            inputClass.value = student.class;
            inputGpa.value = student.gpa;
            inputEmail.value = student.email;

            studentModal.classList.remove('hidden');
        }
    }

    // Trường hợp bấm nút XÓA
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = e.target.getAttribute('data-id');
        
        // Hiện hộp thoại confirm gốc của trình duyệt
        const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa sinh viên mang mã số ${idToDelete}?`);
        
        if (confirmDelete) {
            students = students.filter(s => s.id !== idToDelete);
            saveStudents();
            renderStudents();
            showToast('Đã xóa sinh viên khỏi hệ thống.', 'danger');
        }
    }
});

window.addEventListener('DOMContentLoaded', renderStudents);
// --- 1. KHỞI TẠO DỮ LIỆU ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// --- 2. TRUY XUẤT CÁC PHẦN TỬ DOM ---
const taskListContainer = document.getElementById('task-list');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelForm = document.getElementById('btn-cancel-form');
const taskModal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const modalTitle = document.getElementById('modal-title');
const formMode = document.getElementById('form-mode');

const inputId = document.getElementById('task-id');
const inputTitle = document.getElementById('task-title');
const inputDesc = document.getElementById('task-desc');
const inputDeadline = document.getElementById('task-deadline');
const inputPriority = document.getElementById('task-priority');

// --- 3. ĐIỀU KHIỂN ĐÓNG/MỞ POPUP MODAL ---
function showModal() {
    clearErrors(); // Xóa sạch các dòng tin nhắn lỗi cũ trước khi hiển thị form
    taskModal.style.display = "flex";
}

function hideModal() {
    taskModal.style.display = "none";
}

// --- HÀM VALIDATION (KIỂM TRA DỮ LIỆU LỖI) ---
function validateForm() {
    let isValid = true;
    clearErrors(); // Đặt lại trạng thái ban đầu

    // 1. Kiểm tra Tiêu đề trống
    if (inputTitle.value.trim() === "") {
        document.getElementById('error-title').innerHTML = "Tiêu đề công việc không được để trống!";
        isValid = false;
    }

    // 2. Kiểm tra Mô tả trống
    if (inputDesc.value.trim() === "") {
        document.getElementById('error-desc').innerHTML = "Mô tả công việc không được để trống!";
        isValid = false;
    }

    // 3. Kiểm tra Hạn hoàn thành trống
    if (inputDeadline.value === "") {
        document.getElementById('error-deadline').innerHTML = "Vui lòng chọn hạn hoàn thành!";
        isValid = false;
    }

    return isValid;
}

// Hàm dọn dẹp các thông báo lỗi cũ
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-msg');
    errorElements.forEach(element => {
        element.innerHTML = "";
    });
}

// --- 4. RENDER DANH SÁCH RA CARD GIAO DIỆN ---
function renderTasks() {
    taskListContainer.innerHTML = '';

    if (tasks.length === 0) {
        taskListContainer.innerHTML = `<div class="empty-state">Hiện tại không có công việc nào cần xử lý. Hãy thêm mới ngay!</div>`;
        updateStatistics();
        return;
    }

    tasks.forEach(task => {
        const card = document.createElement('div');
        const priorityClass = task.priority === 'Trung bình' ? 'Trung-binh' : (task.priority === 'Thấp' ? 'Thap' : 'Cao');
        
        card.className = `task-card priority-${priorityClass} ${task.completed ? 'completed' : ''}`;

        card.innerHTML = `
            <div class="task-header">
                <input type="checkbox" class="checkbox-status" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                <span class="task-title-text">${task.title}</span>
            </div>
            <div class="task-desc-text">${task.desc}</div>
            <div class="task-meta">
                <span>📅 Hạn: ${formatDate(task.deadline)}</span>
                <span class="badge badge-${priorityClass}">Ưu tiên: ${task.priority}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-secondary btn-sm btn-edit" data-id="${task.id}">Sửa</button>
                <button class="btn btn-danger btn-sm btn-delete" data-id="${task.id}">Xóa</button>
            </div>
        `;
        taskListContainer.appendChild(card);
    });

    updateStatistics();
}

// --- 5. CẬP NHẬT THỐNG KÊ ---
function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('total-tasks').innerHTML = total;
    document.getElementById('completed-tasks').innerHTML = completed;
    document.getElementById('pending-tasks').innerHTML = pending;
}

// --- 6. HÀM PHỤ TRỢ ---
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast-notification');
    toast.innerHTML = message;
    toast.style.display = "block";
    toast.className = `toast ${type}`;
    setTimeout(() => { toast.style.display = "none"; }, 2500);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function resetForm() {
    taskForm.reset();
    formMode.value = 'create';
    inputId.value = '';
    modalTitle.innerHTML = "Thêm Công Việc Mới";
}

// --- 7. LẮNG NGHE SỰ KIỆN DOM ---

// Mở form popup
btnOpenModal.addEventListener('click', function() {
    resetForm();
    showModal();
});

// Đóng form popup
btnCloseModal.addEventListener('click', hideModal);
btnCancelForm.addEventListener('click', hideModal);

// Sự kiện Submit lưu Form (Có kiểm tra dữ liệu bằng hàm Validation)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Gọi hàm Validation, nếu trả về false thì dừng thực thi (không thêm mới dữ liệu)
    if (!validateForm()) {
        return; 
    }

    const taskData = {
        title: inputTitle.value.trim(),
        desc: inputDesc.value.trim(),
        deadline: inputDeadline.value,
        priority: inputPriority.value,
    };

    if (formMode.value === 'create') {
        taskData.id = Date.now().toString();
        taskData.completed = false;

        tasks.push(taskData);
        showToast('Đã thêm mới một công việc thành công!');
    } else {
        const idToUpdate = inputId.value;
        const index = tasks.findIndex(t => t.id === idToUpdate);
        
        if (index !== -1) {
            taskData.id = idToUpdate;
            taskData.completed = tasks[index].completed;
            tasks[index] = taskData;
            showToast('Đã cập nhật thay đổi nội dung công việc!');
        }
    }

    saveTasks();
    renderTasks();
    hideModal();
});

// Ủy quyền sự kiện quản lý: Sửa, Xóa
taskListContainer.addEventListener('click', function(e) {
    const targetEl = e.target;

    // Sửa công việc
    if (targetEl.classList.contains('btn-edit')) {
        const taskId = targetEl.getAttribute('data-id');
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            resetForm();
            modalTitle.innerHTML = "Cập Nhật Nội Dung Công Việc";
            formMode.value = 'edit';
            
            inputId.value = task.id;
            inputTitle.value = task.title;
            inputDesc.value = task.desc;
            inputDeadline.value = task.deadline;
            inputPriority.value = task.priority;

            showModal();
        }
    }

    // Xóa công việc
    if (targetEl.classList.contains('btn-delete')) {
        const taskId = targetEl.getAttribute('data-id');
        const confirmDelete = confirm('Bạn có chắc chắn muốn xóa vĩnh viễn công việc này?');
        
        if (confirmDelete) {
            tasks = tasks.filter(t => t.id !== taskId);
            saveTasks();
            renderTasks();
            showToast('Đã xóa bỏ công việc thành công.', 'danger');
        }
    }
});

// Đổi trạng thái hoàn thành khi click Checkbox
taskListContainer.addEventListener('change', function(e) {
    const targetEl = e.target;
    
    if (targetEl.classList.contains('checkbox-status')) {
        const taskId = targetEl.getAttribute('data-id');
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            task.completed = targetEl.checked;
            saveTasks();
            renderTasks();
            
            if (task.completed) {
                showToast('Chúc mừng bạn đã hoàn thành công việc! 🎉');
            }
        }
    }
});

// Tải dữ liệu lần đầu
document.addEventListener('DOMContentLoaded', renderTasks);
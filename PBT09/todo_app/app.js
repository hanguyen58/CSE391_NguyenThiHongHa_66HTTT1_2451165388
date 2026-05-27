// ===== STATE =====
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// ===== DOM REFS =====
const form       = document.querySelector("#todoForm");
const input      = document.querySelector("#todoInput");
const list       = document.querySelector("#todoList");
const itemCount  = document.querySelector("#itemCount");
const clearBtn   = document.querySelector("#clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

// ===== SAVE TO LOCALSTORAGE =====
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ===== RENDER =====
function render() {
  list.innerHTML = "";

  const filtered = todos.filter(todo => {
    if (currentFilter === "active")    return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  if (filtered.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "Không có việc nào 🎉";
    list.appendChild(empty);
  } else {
    // Dùng DocumentFragment để tránh nhiều lần reflow
    const fragment = document.createDocumentFragment();
    filtered.forEach(todo => fragment.appendChild(createTodoElement(todo)));
    list.appendChild(fragment);
  }

  updateCount();
}

// ===== TẠO ELEMENT CHO 1 TODO (dùng createElement, không dùng innerHTML) =====
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item" + (todo.completed ? " completed" : "");
  li.dataset.id = todo.id;

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = todo.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "❌";
  deleteBtn.setAttribute("aria-label", "Xóa todo");

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

// ===== CẬP NHẬT ĐẾM =====
function updateCount() {
  const active = todos.filter(t => !t.completed).length;
  itemCount.textContent = `${active} việc chưa xong`;
}

// ===== THÊM TODO =====
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, completed: false });
  save();
  render();
  input.value = "";
  input.focus();
});

// ===== EVENT DELEGATION trên #todoList =====
list.addEventListener("click", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;
  const id = Number(li.dataset.id);

  // Xóa
  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter(t => t.id !== id);
    save();
    render();
    return;
  }

  // Toggle completed khi click vào text
  if (e.target.classList.contains("todo-text")) {
    const todo = todos.find(t => t.id === id);
    if (todo) { todo.completed = !todo.completed; save(); render(); }
    return;
  }
});

// ===== DOUBLE-CLICK ĐỂ EDIT =====
list.addEventListener("dblclick", (e) => {
  if (!e.target.classList.contains("todo-text")) return;
  const li = e.target.closest(".todo-item");
  const id = Number(li.dataset.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = todo.text;

  li.replaceChild(editInput, e.target);
  editInput.focus();

  function saveEdit() {
    const newText = editInput.value.trim();
    if (newText) todo.text = newText;
    save();
    render();
  }

  editInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter")  saveEdit();
    if (ev.key === "Escape") render();
  });
  editInput.addEventListener("blur", saveEdit);
});

// ===== FILTER =====
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

// ===== CLEAR COMPLETED =====
clearBtn.addEventListener("click", () => {
  todos = todos.filter(t => !t.completed);
  save();
  render();
});

// ===== KHỞI ĐỘNG =====
render();
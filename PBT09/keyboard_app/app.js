document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modal = document.getElementById("galleryModal");
    const modalImg = document.getElementById("modalImg");
    const closeModalBtn = document.querySelector(".close-modal");

    const palette = document.getElementById("commandPalette");
    const paletteInput = document.getElementById("paletteInput");
    const commandItems = document.querySelectorAll(".command-item");

    let currentIndex = 0;
    let isSlideshowPlaying = false;
    let slideshowInterval = null;
    let selectedCommandIndex = -1;

    function openImage(index) {
        if (index < 0 || index >= galleryItems.length) return;
        currentIndex = index;
        const imgUrl = galleryItems[currentIndex].querySelector("img").src;
        modalImg.src = imgUrl;
        modal.classList.add("active");
        modalImg.focus(); // Di chuyển Focus vào ảnh để đọc thiết bị đọc màn hình nhận diện
    }

    function closeImage() {
        modal.classList.remove("active");
        if (slideshowInterval) clearInterval(slideshowInterval);
        isSlideshowPlaying = false;
        galleryItems[currentIndex].focus(); // Trả lại Focus về vị trí cũ trên lưới ảnh
    }

    function toggleSlideshow() {
        if (isSlideshowPlaying) {
            clearInterval(slideshowInterval);
            isSlideshowPlaying = false;
        } else {
            isSlideshowPlaying = true;
            slideshowInterval = setInterval(() => {
                openImage((currentIndex + 1) % galleryItems.length);
            }, 2000); // 2 giây tự động đổi ảnh một lần
        }
    }

    // Sự kiện click chuột hoặc bấm Enter/Space khi đang Focus vào Grid ảnh công cộng
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => openImage(index));
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openImage(index);
            }
        });
    });

    closeModalBtn.addEventListener("click", closeImage);

    function closePalette() {
        palette.classList.remove("active");
        paletteInput.value = "";
        selectedCommandIndex = -1;
        commandItems.forEach(item => item.classList.remove("selected"));
    }

    function runAction(action) {
        if (action === "toggle-dark") {
            document.body.classList.toggle("dark-mode");
        } else if (action === "open-first") {
            openImage(0);
        } else if (action === "alert-info") {
            alert("Keyboard Shortcuts App v1.0.0 - Bài thực hành DOM Manipulation");
        } else if (action === "clear-console") {
            console.clear();
            console.log("Đã xóa sạch console!");
        }
        closePalette();
    }

    // Bộ lọc cơ bản thời gian thực (Real-time filter) trên Command Palette
    paletteInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();
        commandItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(value)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    window.addEventListener("keydown", (e) => {
        
        // 1. Phím tắt Ctrl + K (Hoặc Cmd + K trên Mac) để bật/tắt bảng lệnh
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            if (palette.classList.contains("active")) {
                closePalette();
            } else {
                palette.classList.add("active");
                paletteInput.focus();
            }
            return;
        }

        // 2. Phím tắt Escape để tắt nhanh bất kỳ Popup/Modal nào đang mở
        if (e.key === "Escape") {
            if (palette.classList.contains("active")) closePalette();
            if (modal.classList.contains("active")) closeImage();
            return;
        }

        // 3. Xử lý logic phím mũi tên khi Command Palette đang mở
        if (palette.classList.contains("active")) {
            // Lấy danh sách các lệnh đang hiển thị (không bị filter ẩn)
            const visibleItems = Array.from(commandItems).filter(item => item.style.display !== "none");
            
            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedCommandIndex = (selectedCommandIndex + 1) % visibleItems.length;
                commandItems.forEach(item => item.classList.remove("selected"));
                visibleItems[selectedCommandIndex].classList.add("selected");
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedCommandIndex = (selectedCommandIndex - 1 + visibleItems.length) % visibleItems.length;
                commandItems.forEach(item => item.classList.remove("selected"));
                visibleItems[selectedCommandIndex].classList.add("selected");
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (selectedCommandIndex >= 0 && visibleItems[selectedCommandIndex]) {
                    const action = visibleItems[selectedCommandIndex].dataset.action;
                    runAction(action);
                }
            }
            return;
        }

        // 4. Xử lý logic các nút khi xem ảnh lớn phóng to (Modal Image Lightbox)
        if (modal.classList.contains("active")) {
            if (e.key === "ArrowRight") {
                openImage((currentIndex + 1) % galleryItems.length);
            } else if (e.key === "ArrowLeft") {
                openImage((currentIndex - 1 + galleryItems.length) % galleryItems.length);
            } else if (e.key === " ") { // Nút Spacebar để Play/Pause
                e.preventDefault();
                toggleSlideshow();
            }
            return;
        }

        // 5. Phím số nhanh từ 1 - 4 để mở ảnh đích khi màn hình đang ở trạng thái thường
        if (!palette.classList.contains("active") && e.key >= "1" && e.key <= "4") {
            const index = Number(e.key) - 1;
            openImage(index);
        }
    });

    // Cho phép click chọn trực tiếp các Item trên Command Palette
    commandItems.forEach(item => {
        item.addEventListener("click", () => {
            runAction(item.dataset.action);
        });
    });
});
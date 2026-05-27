function createCart() {
    // Dữ liệu Private nằm trong closure scope
    let items = [];
    let discountCode = null;

    // Định nghĩa các mã giảm giá hợp lệ
    const discounts = {
        "SALE10": (total) => total * 0.1,
        "SALE20": (total) => total * 0.2,
        "FREESHIP": () => 30000
    };

    const calculateSubTotal = () => items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
        addItem(product, quantity = 1) {
            const foundIdx = items.findIndex(item => item.id === product.id);
            if (foundIdx > -1) {
                items[foundIdx].quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) item.quantity = newQuantity;
        },

        getTotal() {
            const subTotal = calculateSubTotal();
            if (!discountCode || !discounts[discountCode]) return subTotal;
            
            const discountValue = discounts[discountCode](subTotal);
            return Math.max(0, subTotal - discountValue);
        },

        applyDiscount(code) {
            if (discounts.hasOwnProperty(code)) {
                discountCode = code;
            } else {
                console.log(`Mã giảm giá [${code}] không hợp lệ.`);
            }
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            discountCode = null;
        },

        printCart() {
            console.log("┌" + "─".repeat(60) + "┐");
            console.log(`│ # │ ${"Sản phẩm".padEnd(20)} │ ${"SL".padEnd(3)} │ ${"Đơn giá".padEnd(12)} │ ${"Tổng".padEnd(12)} │`);
            
            items.forEach((item, index) => {
                const totalStr = (item.price * item.quantity).toLocaleString("vi-VN");
                const priceStr = item.price.toLocaleString("vi-VN");
                console.log(`│ ${index + 1} │ ${item.name.padEnd(20)} │ ${item.quantity.toString().padEnd(3)} │ ${priceStr.padEnd(12)} │ ${totalStr.padEnd(12)} │`);
            });

            console.log("├" + "─".repeat(60) + "┤");
            if (discountCode) {
                console.log(`│ Mã giảm giá đã áp dụng: ${discountCode.padEnd(37)} │`);
            }
            const finalTotalStr = this.getTotal().toLocaleString("vi-VN") + "đ";
            console.log(`│ Tổng cộng: ${finalTotalStr.padStart(47)} │`);
            console.log("└" + "─".repeat(60) + "┘");
        }
    };
}

// === RUN TEST ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); 
cart.removeItem(3);
console.log("Sau xóa AirPods (id 3) - Số SP còn:", cart.getItemCount());
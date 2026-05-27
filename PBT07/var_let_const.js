console.log("===== ĐOẠN 1: var =====");

try {
    console.log(x);
    var x = 5;
} catch (error) {
    console.log("Lỗi:", error.message);
}

console.log("\n===== ĐOẠN 2: let =====");

try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.log("Lỗi:", error.message);
}

console.log("\n===== ĐOẠN 3: const =====");

try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (error) {
    console.log("Lỗi:", error.message);
}

console.log("\n===== ĐOẠN 4: const với array =====");

try {
    const arr = [1, 2, 3];

    arr.push(4);

    console.log(arr);

} catch (error) {
    console.log("Lỗi:", error.message);
}

console.log("\n===== ĐOẠN 5: Block Scope =====");

try {

    let a = 1;

    {
        let a = 2;
        console.log("Trong block:", a);
    }

    console.log("Ngoài block:", a);

} catch (error) {
    console.log("Lỗi:", error.message);
}

console.log("\n===== GIẢI THÍCH =====");

console.log("1. var được hoisting nên in ra undefined.");
console.log("2. let có TDZ nên gây ReferenceError.");
console.log("3. const không cho phép gán lại.");
console.log("4. const array vẫn thay đổi được nội dung.");
console.log("5. let có block scope.");
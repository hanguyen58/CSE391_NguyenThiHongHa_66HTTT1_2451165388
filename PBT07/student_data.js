// 1. Khởi tạo mảng dữ liệu gốc
const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 2. Khởi tạo các biến phục vụ thống kê
let countGioi = 0;
let countKha = 0;
let countTB = 0;
let countYeu = 0;

let maxStudent = students[0];
let minStudent = students[0];

let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

let totalMaleGPA = 0;
let countMale = 0;
let totalFemaleGPA = 0;
let countFemale = 0;

const processedStudents = [];

// 3. Vòng lặp chính xử lý dữ liệu 
for (let i = 0; i < students.length; i++) {
    const sv = students[i];
    
    // Yêu cầu 1: Tính điểm trung bình (math×0.4 + physics×0.3 + cs×0.3)
    let gpa = (sv.math * 0.4) + (sv.physics * 0.3) + (sv.cs * 0.3);
    // Làm tròn lấy 1 chữ số thập phân bằng toán học thuần túy
    gpa = Math.round(gpa * 10) / 10;
    
    // Yêu cầu 2: Xếp loại học lực
    let rank = "";
    if (gpa >= 8.0) {
        rank = "Giỏi";
        countGioi++; // Yêu cầu 4
    } else if (gpa >= 6.5) {
        rank = "Khá";
        countKha++;  // Yêu cầu 4
    } else if (gpa >= 5.0) {
        rank = "Trung bình";
        countTB++;   // Yêu cầu 4
    } else {
        rank = "Yếu";
        countYeu++;  // Yêu cầu 4
    }
    
    // Đẩy dữ liệu đã xử lý vào mảng mới phục vụ việc in ấn
    processedStudents.push({
        name: sv.name,
        gpa: gpa,
        rank: rank
    });
    
    // Yêu cầu 5: Tìm SV có điểm TB cao nhất và thấp nhất
    const maxCurrentGPA = (maxStudent.math * 0.4) + (maxStudent.physics * 0.3) + (maxStudent.cs * 0.3);
    const minCurrentGPA = (minStudent.math * 0.4) + (minStudent.physics * 0.3) + (minStudent.cs * 0.3);
    
    if (gpa > maxCurrentGPA) {
        maxStudent = sv;
    }
    if (gpa < minCurrentGPA) {
        minStudent = sv;
    }
    
    // Yêu cầu 6: Tích lũy điểm từng môn để tính điểm TB toàn lớp
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;
    
    // Yêu cầu 7 (Bonus): Tích lũy điểm theo giới tính
    if (sv.gender === "M") {
        totalMaleGPA += gpa;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleGPA += gpa;
        countFemale++;
    }
}

// Yêu cầu 3: In bảng kết quả định dạng chuẩn bằng String padding
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < processedStudents.length; i++) {
    const s = processedStudents[i];
    // Căn lề khoảng cách cho chuỗi đẹp mắt, ngay ngắn
    const stt = (i + 1).toString().padEnd(3);
    const name = s.name.padEnd(6);
    const gpa = s.gpa.toFixed(1).padEnd(4);
    const rank = s.rank.padEnd(11);
    
    console.log(`| ${stt} | ${name} | ${gpa} | ${rank} |`);
}

console.log("\n" + "=".repeat(41) + "\n");

// Yêu cầu 4: In số lượng SV mỗi xếp loại
console.log("THỐNG KÊ XẾP LOẠI:");
console.log(`- Giỏi:       ${countGioi} SV`);
console.log(`- Khá:        ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu:        ${countYeu} SV\n`);

// Yêu cầu 5: Tính lại và in điểm TB cao nhất/thấp nhất
const highestGPA = ((maxStudent.math * 0.4) + (maxStudent.physics * 0.3) + (maxStudent.cs * 0.3)).toFixed(1);
const lowestGPA = ((minStudent.math * 0.4) + (minStudent.physics * 0.3) + (minStudent.cs * 0.3)).toFixed(1);
console.log("DANH HIỆU:");
console.log(`- SV có ĐTB cao nhất:  ${maxStudent.name} (${highestGPA})`);
console.log(`- SV có ĐTB thấp nhất: ${minStudent.name} (${lowestGPA})\n`);

// Yêu cầu 6: Tính và in điểm TB toàn lớp cho từng môn
const classSize = students.length;
console.log("ĐIỂM TRUNG BÌNH MÔN TOÀN LỚP:");
console.log(`- Môn Toán (Math):      ${(totalMath / classSize).toFixed(2)}`);
console.log(`- Môn Vật lý (Physics): ${(totalPhysics / classSize).toFixed(2)}`);
console.log(`- Môn Tin học (CS):     ${(totalCS / classSize).toFixed(2)}\n`);

// Yêu cầu 7: Tính điểm TB theo giới tính
console.log("THỐNG KÊ THEO GIỚI TÍNH:");
console.log(`- Điểm TB của sinh viên Nam: ${(totalMaleGPA / countMale).toFixed(2)}`);
console.log(`- Điểm TB của sinh viên Nữ:  ${(totalFemaleGPA / countFemale).toFixed(2)}`);
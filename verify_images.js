const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'assets', 'img', 'products');

const expectedFiles = [
  "hk-28188-large-clear-tiramisu-box-4000ml.png",
  "hk-21157-clear-tiramisu-container-1800ml.png",
  "e1300-clear-pet-dessert-box-1300ml.png",
  "ssm-016-clear-round-dessert-container-600ml.png",
  "ssm-004-clear-square-box-450ml.png",
  "hk-034-large-clear-tiramisu-box-4500ml.png",
  "sm-040-clear-tiramisu-box-1250ml.png",
  "ssm-045-clear-dessert-container-600ml.png",
  "ssm-002-clear-rectangular-box-300ml.png",
  "ssm-012-clear-rectangular-box-400ml.png",
  "ssm-205-clear-square-box-380ml.png",
  "ssm-028-clear-rectangular-box-500ml.png",
  "ssm-024-clear-square-box.png",
  "ssm-018-clear-square-box-500ml.png",
  "hk-37106-clear-tiramisu-box-1300ml.png",
  "clear-ps-tray-box-30-11-7.png",
  "clear-ps-box-40-11-7.png"
];

let allOk = true;
expectedFiles.forEach((file) => {
  const filePath = path.join(targetDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing file: ${file}`);
    allOk = false;
  } else {
    const stats = fs.statSync(filePath);
    console.log(`✅ File: ${file} | Size: ${stats.size} bytes`);
    if (stats.size < 100) {
      console.log(`⚠️ Warning: ${file} is very small!`);
    }
  }
});

if (allOk) {
  console.log("🎉 All 17 files exist!");
} else {
  console.log("❌ Some files are missing.");
}

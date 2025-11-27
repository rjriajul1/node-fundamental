const os = require("os");
const { uptime } = require("process");

console.log("System info \n");
console.log("-".repeat(50));


console.log("platform Details: ");
console.log("Plaform: ", os.platform());
console.log("Architecture: ", os.arch());
console.log("OS type: ", os.type());
console.log("OS release: ", os.release());
console.log("Hostname: ", os.hostname());

console.log("System info \n");

console.log("\nCPU info: ");
const cpus = os.cpus()
console.log("CPU modle: ", cpus[0].model);
console.log("Number of cores: ", cpus.length);
console.log("CPU Speed: ", cpus[0].speed);

console.log("System info \n");

const totalMemory = os.totalmem();
const freeMem = os.freemem()
console.log("Free Memory: ", (freeMem/1024/1024/1024).toFixed(2),"GB");
console.log("Total Memory: ", (totalMemory/1024/1024/1024).toFixed(2),"GB");


console.log("System info \n");

const upTime = os.uptime();
console.log(`${upTime}`);
const days = Math.floor(upTime / 86400);
const hours = Math.floor((upTime % 86400)/3600);
const minutes = Math.floor((upTime % 3600) / 60);

console.log(`${days} days ${hours} hours  ${minutes} minutes` );
const crypto = require("crypto");

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt (text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(text, "utf-8", 'hex');
    encrypted += cipher.final('hex')


    return {
        iv: iv.toString("hex"),
        encryptedData: encrypted
    };
}



function decrypt (encryptedData, ivHex) {
    const deciper = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, "hex"))
    let decrypted = deciper.update(encryptedData, 'hex', 'utf-8')
    decrypted += deciper.final('utf-8')
    return decrypted
}



console.log("Encryption Data: ");
const sensitiveData = "My credit card: 4242 4242 4242 4242";
console.log("Original Data: ", sensitiveData);
const encrypted = encrypt(sensitiveData)
console.log("Encrypted", encrypted);


console.log("Decrypted Data: ");

const decrypted = decrypt(encrypted.encryptedData, encrypted.iv)
console.log("Decrypted: ", decrypted);
console.log("Match: ", sensitiveData === decrypted);
import argon2 from 'argon2';

const password = '12345678'; // Your chosen password
const hash = await argon2.hash(password);
console.log("--------------------------------------------------");
console.log(hash);
console.log("--------------------------------------------------");
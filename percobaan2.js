
// 1. panggil dulu filenya
// 2. file yang di panggil, sudah mengekpor variable
// 3. panggil file variable nya

// cara penulisan ke-1
const data_pribadi = require('./data_pribadi')
console.log(data_pribadi.nama_lengkap)
console.log(data_pribadi.alamat)

// cara penulisan ke-2
console.log(require('./data_pribadi').nama_lengkap)
const mysql2 = require('mysql2')
const { hostname } = require('os')

// Menyambungkan ke sql 
mysql2.createConnection ({
    host : 'localhost',
    root : 'root',
    password : ''
    database : 'db_jdf_sep24'
})

// Buka koneksi Database

database.connect ( (error) => {
    if (error) {
        throw error
    } else {
        console.log('Berhasil terkoneksi' + database.host)
    }

})

database.query('', function(errorSql, hasil) {
    if (errorSQL) {
        console.log(errorSQL)
    } else {
        console.log(hasil)
    }
})
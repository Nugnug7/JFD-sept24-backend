const mysql = require('mysql2')
// Menyambungkan ke sql 
const db = mysql.createConnection ({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'db_jdf_sep24'
})


module.exports = 
{
    getAll_jabatan : function() {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `SELECT * FROM jabatan`
        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

}


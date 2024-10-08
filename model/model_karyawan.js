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

    getAll_karyawan : function () {
        return new Promise ( (resolve, rejects) => {
            let sqlSyntax =
            `SELECT 
                kry.*, jbt.nama as jabatan_nama, 
                jbt.singkatan as jabatan_singkatan, 
                agm.nama as agama_nama 
            FROM karyawan as kry 
            LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
            LEFT JOIN agama as agm ON agm.id = kry.agama`
            
            db.query(sqlSyntax, function(errorSql, hasil) {
                if (errorSql) {
                    rejects(errorSql)
                } else {
                    resolve(hasil)
                }
        })
    
        })
    },
    
    getOne_karyawan : function (idkry){
        return new Promise ( (resolve, rejects) => {
            let sqlSyntax =
            `SELECT 
                kry.*, jbt.nama as jabatan_nama, 
                jbt.singkatan as jabatan_singkatan, 
                agm.nama as agama_nama 
            FROM karyawan as kry 
            LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
            LEFT JOIN agama as agm ON agm.id = kry.agama
            where kry.id = ?`
            
            db.query(sqlSyntax, [idkry], function(errorSql, hasil) {
                if (errorSql) {
                    rejects(errorSql)
                } else {
                    resolve(hasil)
                }
        })
    
        })
    
    },

    insert_karyawan : function  (req) {
        return new Promise ( (resolve, rejects) => {
            let sqlSyntax = 
            `
            INSERT INTO karyawan set ?
            `
            let sqlData = {
                nama          : req.body.form_nama,
                Nik           : req.body.form_nik,
                Tanggal_Lahir : req.body.form_tanggal_lahir,
                Alamat        : req.body.form_alamat,
                Jabatan       : req.body.form_jabatan,
                Agama         : req.body.form_agama,
            }
    
            // let sqlSyntax =
            // `insert INTO karyawan
            // (nama,nik,tanggal_lahir,alamat,jabatan,agama)
            // Values
            // (?,?,?,?,?,?)
            // `
            // let sqlData = [
                // req.body.form_nama,
                // req.body.form_nik,
                // req.body.form_tanggal_lahir,
                // req.body.form_alamat,
                // req.body.form_jabatan,
                // req.body.form_agama,
            // ]
            
            db.query(sqlSyntax, sqlData, function(errorSql, hasil) {
                if (errorSql) {
                    rejects(errorSql)
                } else {
                    resolve(hasil)
                }
        })
        })
    
    },

    // Membuat tombol hapus pada page karyawan
    hapuskaryawan : function (idkry){
    return new Promise ( (resolve, rejects) => {
        let sqlSyntax =
        `DELETE From karyawan where id = ?`
        
        db.query(sqlSyntax, [idkry], function(errorSql, hasil) {
            if (errorSql) {
                rejects(errorSql)
            } else {
                resolve(hasil)
            }
    })

    })
    },

    update_karyawan : function (req) {
        return new Promise( (resolve, reject) => {
            let sqlSyntax =
            `UPDATE karyawan SET ? WHERE id = ?`
            let sqlData = {
                nama            : req.body.form_nama,
                nik             : req.body.form_nik,
                tanggal_lahir   : req.body.form_tanggal_lahir,
                alamat          : req.body.form_alamat,
                jabatan         : req.body.form_jabatan,
                agama           : req.body.form_agama,
            }
            db.query(sqlSyntax, [sqlData, req.params.id_karyawan], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    }
    
}

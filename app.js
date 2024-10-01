const express = require('express')
const app = express()


app.set('view engine', 'ejs')       // setting penggunaan template engine express
app.set('views', './view-ejs')      // setting penggunaan untuk menyimpan file ejs


//  '/', '/pendidikan', '/karyawan' = artinya rute / url
// function render ('nama-file') 
// nama file nya wajib ber extensi .ejs
// otomatis mengambil file .ejs yang ada di folder view-ejs

app.get('/', function(req,res) {
    res.render('beranda') 
})


app.get('/pendidikan', function(req,res) {
    let profil = {
        nama : 'Prabowo Subianto',
        S1   : 'UI',
        SMK  : 'SMEA',
    }

    res.render ('page-pendidikan', profil)
})


app.get('/karyawan', function(req,res) {
    res.render ('page-karyawan')
})


app.listen(3000, function() {
    console.log('Server sudah nyala, http://localhost:3000')
})
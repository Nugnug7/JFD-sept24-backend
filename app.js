const express = require('express')
const app = express()


//  '/', '/pendidikan', '/karyawan' = artinya rute / url
app.get('/', function(req,res) {
    res.send ('Hellow world')
})

app.get('/pendidikan', function(req,res) {
    res.send ('Riwayat pendidikan')
})

app.get('/karyawan', function(req,res) {
    res.send ('List Karyawan')
})



app.listen(3000, function() {
    console.log('Server sudah nyala, http://localhost:3000')
})
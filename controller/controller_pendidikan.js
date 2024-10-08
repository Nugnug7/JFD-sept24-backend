module.exports = {
    halaman_pendidikan : function(req,res) {
        let profil = {
            nama : 'Prabowo Subianto',
            S1   : 'UI',
            SMK  : 'SMEA',
        }
        res.render ('page-pendidikan', profil)
    }
}

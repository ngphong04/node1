const mysql = require('mysql');

const ketnoi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'ban_hang'
});

ketnoi.connect(function (err) { 
    if (err) {
        console.log(err);
        console.log('Kết nối CSDL ko thành công, kiểm tra lại CSDL')
    }else{
        console.log('Kết nối thành công CSDL,vui lòng ấn vào đường link trên!')
    }
});

module.exports = ketnoi;

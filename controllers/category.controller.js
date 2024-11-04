const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);
const Category = require('../models/category.model');
exports.index =  function (req, res) {
    
    ketnoi.query('SELECT * FROM category', function (err, results) { 
        if (err) {
            console.log(err.sqlMessage);
            res.status(500).send('Lỗi khi lấy danh mục.');
        } else {
            res.render('category', {
                categores: results, // Kết quả truy vấn
                totalPage: 1, // Nếu không có phân trang, bạn có thể đặt giá trị mặc định
                page: 1 // Trang hiện tại, cũng có thể đặt giá trị mặc định
            });
        }
    });
}

exports.add = function (req, res) {
    res.render('category-add');
}
exports.store = (req, res) => {
    Category.store(req, function(err, data) {
        if(err) {
            res.render('error', {
                message: err.message,
                code: err.errno
            });
        } else {
            res.redirect('/category');
        }
    })
}

exports.edit = function (req, res) {
    let id = req.params.id;
    Category.getOne(id, function (err, data) {
        if (err) {
            res.render('error', {
                message: 'Không tìm thấy dữ liệu',
                code: 404
            });
        } else {
            res.render('category-edit', {
                cat: data
            });
        }
        
    })
   
}

exports.update = (req, res) => {

    Category.update(req, function(err, data) {
        if(err) {
            res.render('error', {
                message: err.message,
                code: err.errno
            });
        } else {
            res.redirect('/category');
        }
    })
}

exports.delete = function (req, res) {
    let id = req.params.id;
    let sql_delete = "DELETE FROM category WHERE id = ?";
    Category.delete(id, function (err, data) {
        if (err) {
            res.render('error', {
                message: err.message,
                code: err.errno
            });
        } else {
            res.redirect('/category');
        }
    })
}
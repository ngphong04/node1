const Product = require('../models/product.model');
const Category = require('../models/category.model');
exports.index =  function (req, res) {
    Product.getAll(req, function (err, result) { 
        if (err) {
            res.render('error', {
                message: err.message,
                code: err.errno
            });
        } else {
            res.render('product', {
                proucts: result.data,
                totalPage: result.totalPage,
                page: result.page
            });
        }
    });
}

exports.add = function (req, res) {
    Category.DataSelectBox(function(err, data) {
        res.render('product-add', {
            cats: data
        });
    });
    
}
exports.store = (req, res) => {
    req.body.image = req.file.filename;
    Product.store(req, function(err, data) {
        if(err) {
            res.render('error', {
                message: err.message,
                code: err.errno
            });
        } else {
            res.redirect('/product');
        }
    })
}

exports.edit = function (req, res) {
    let id = req.params.id;
    Product.getOne(id, function (err, data) {
        if (err) {
            res.render('error', {
                message: 'Không tìm thấy dữ liueej',
                code: 404
            });
        } else {
            res.render('product-edit', {
                cat: data
            });
        }
        
    })
   
}

exports.update = (req, res) => {

    Product.update(req, function(err, data) {
        if(err) {
            res.render('error', {
                message: err.message,
                code: err.errno
            });
        } else {
            res.redirect('/product');
        }
    })
}

exports.delete = function (req, res) {
    let id = req.params.id;
    let sql_delete = "DELETE FROM product WHERE id = ?";
    Product.delete(id, function (err, data) {
        if (err) {
            res.render('error', {
                message: err.message,
                code: err.errno
            });
        } else {
            res.redirect('/product');
        }
    })
}
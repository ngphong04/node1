const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Product = function() {}

Product.getAll = async function(req, myFun) {

    let _name = req.query.name;
    let page = req.query.page ? req.query.page : 1;

    let _limit = 15;
    let _start = (page - 1) * _limit

    // tính tổng sô trang như sau
    let sql_count = "SELECT COUNT(*) as total FROM product";
    let totalRow = 0;
    let data = await query(sql_count);
    totalRow = data[0].total;
    let totalPage = Math.ceil(totalRow / _limit);

    let sql = "SELECT p.*, c.name as cat_name FROM product p JOIN category c ON p.category_id = c.id"
    if (_name) {
        sql += " WHERE name LIKE '%" + _name + "%'"
    }

    sql += " ORDER BY id DESC LIMIT " + _start + ", " + _limit;

    ketnoi.query(sql, function (err, data) {
        if (err) {
            myFun(err, null);
        } else {
            myFun(null, {data, totalPage, page});
        }
    });
}

Product.store = function(req, myFun) {
    // console.log("Ok");
    let sql = "INSERT INTO product SET ?";
    ketnoi.query(sql, req.body, (err, data) => {
        if (err) {
            let message = '';
            if (err.errno == 1062) {
                message = 'Tên sản phẩm đã tồn tại, hãy chọn tên khác nhé!';
            } else {
                message = 'Có lỗi rồi, hãy thử lại';
            }
            myFun({message,errno: err.errno}, null);
        } else {
            myFun(null, data);
            
        }
    })
}

Product.getOne = function(id, myFun) {
    let sql = "Select * FROM product WHERE id = ?";
    ketnoi.query(sql, [id], (err, data) => {
        if (err) {
            myFun(err, null)
        }
        else if (data.length > 0) {
            myFun(null, data[0])
        } else {
            myFun('Khong tim thay du lieu', null)
        }
        
    })
}

Product.update = function(req, myFun) {
    let id = req.params.id;
    let sql = "UPDATE product SET ? WHERE id = ?";
    ketnoi.query(sql, [req.body, id], (err, data) => {
        if (err) {
            let message = '';
            if (err.errno == 1062) {
                message = 'Tên sản phẩm đã tồn tại, hãy chọn tên khác nhé!';
            } else {
                message = 'Có lỗi rồi, hãy thử lại';
            }
            myFun({message,errno: err.errno}, null);
        } else {
            myFun(null, data);
        }
    })
}

Product.delete = function (id, myFun) {
    let sql_delete = "DELETE FROM product WHERE id = ?";
    ketnoi.query(sql_delete, [id], function (err, data) {
        if (err) {
            let message = '';
            if (err.errno == 1451) {
                message = 'Không thể xóa sản phẩm đang có sản phẩm';
            } else {
                message = 'Có lỗi rồi, hãy thử lại';
            }
            myFun({message,errno: err.errno}, null);
        } else {
            myFun(null, data);
        }
    });
}

module.exports = Product;
const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Category = function() {}

Category.getAll = async function(req, myFun) {

    let _name = req.query.name;
    let page = req.query.page ? req.query.page : 1;

    let _limit = 20;
    let _start = (page - 1) * _limit

    // tính tổng sô trang như sau
    let sql_count = "SELECT COUNT(*) as total FROM category";
    let totalRow = 0;
    let data = await query(sql_count);
    totalRow = data[0].total;
    let totalPage = Math.ceil(totalRow / _limit);

    let sql = "SELECT c.*, COUNT(p.id) as total_product FROM category c JOIN product p ON p.category_id = c.id"
    if (_name) {
        sql += " WHERE name LIKE '%" + _name + "%'"
    }

    sql += " GROUP BY c.id ORDER BY id DESC LIMIT " + _start + ", " + _limit;


    ketnoi.query(sql, function (err, data) {
        if (err) {
            myFun(err, null);
        } else {
            myFun(null, {data, totalPage, page});
        }
    });
}
Category.DataSelectBox = function(myFun) {
    let sql = "SELECT id, name FROM category Order By name ASC";
    ketnoi.query(sql, function(err, data) {
        myFun(err, data);
    });
}
Category.store = function(req, myFun) {
    // console.log("Ok");
    let sql = "INSERT INTO category SET ?";
    ketnoi.query(sql, req.body, (err, data) => {
        if (err) {
            let message = '';
            if (err.errno == 1062) {
                message = 'Tên danh mục đã tồn tại, hãy chọn tên khác nhé!';
            } else {
                message = 'Có lỗi rồi, hãy thử lại';
            }
            myFun({message,errno: err.errno}, null);
        } else {
            myFun(null, data);
            
        }
    })
}

Category.getOne = function(id, myFun) {
    let sql = "Select * FROM category WHERE id = ?";
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

Category.update = function(req, myFun) {
    let id = req.params.id;
    let sql = "UPDATE category SET ? WHERE id = ?";
    ketnoi.query(sql, [req.body, id], (err, data) => {
        if (err) {
            let message = '';
            if (err.errno == 1062) {
                message = 'Tên danh mục đã tồn tại, hãy chọn tên khác nhé!';
            } else {
                message = 'Có lỗi rồi, hãy thử lại';
            }
            myFun({message,errno: err.errno}, null);
        } else {
            myFun(null, data);
        }
    })
}

Category.delete = function (id, myFun) {
    let sql_delete = "DELETE FROM category WHERE id = ?";
    ketnoi.query(sql_delete, [id], function (err, data) {
        if (err) {
            let message = '';
            if (err.errno == 1451) {
                message = 'Không thể xóa danh mục đang có sản phẩm';
            } else {
                message = 'Có lỗi rồi, hãy thử lại';
            }
            myFun({message,errno: err.errno}, null);
        } else {
            myFun(null, data);
        }
    });
}
module.exports = Category;
const categoryCtrl = require('../controllers/category.controller');

module.exports = function (app) {
    // http://localhost:3000/category?nam=%C3%A1o
    app.get('/category', categoryCtrl.index);
    app.get('/category-delete/:id', categoryCtrl.delete);
    app.get('/category/add', categoryCtrl.add);
    app.post('/category/add', categoryCtrl.store)
    app.get('/category/edit/:id', categoryCtrl.edit);
    app.post('/category/edit/:id', categoryCtrl.update);
}
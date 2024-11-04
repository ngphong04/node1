const productCtrl = require('../controllers/product.controller');
const upload = require('../upload');

module.exports = function (app) {
    // http://localhost:3000/product?nam=%C3%A1o
    app.get('/product', productCtrl.index);
    app.get('/product-delete/:id', productCtrl.delete);
    app.get('/product/add', productCtrl.add);
    app.post('/product/add', upload.single('image'), productCtrl.store)
    app.get('/product/edit/:id', productCtrl.edit);
    app.post('/product/edit/:id', upload.single('image'), productCtrl.update);
}
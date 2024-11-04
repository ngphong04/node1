const homeCtrl = require ('../controllers/home.controller');
module.exports = (app) => {
    app.get('', homeCtrl.home);
    app.get('/about', homeCtrl.about);
    app.get('/contact',homeCtrl.contact );
}
const multer = require('multer');

const MyStorage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: MyStorage});

module.exports = upload;
var express = require('express');

const multer = require('multer');
const path = require('path');
const request = require('../public/javascripts/requestp');
var router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
     //By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null,"image" + '-' + Date.now().toString() + path.extname(file.originalname));
    }
});
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter:imageFilter })
/* GET home page. */
router.get('/', async function (req, res) {
    var listarproductos = await request.listrequestp();
    console.log(listarproductos);
    res.render('index', { productos: listarproductos });
});
router.get('/searchp/(:id)', async function (req, res) {
    var sproduct = await request.searchrequestp(req.params.id);
    console.log(sproduct);
    res.render('seeproduct', { product: sproduct});
});
router.post('/upload', upload.single('file'), async (req, res) => {
    const requestpost = await request.addrequestp(req.file.filename);
    res.redirect(req.get('referer'));
});
router.post('/updateproduct/(:id)', upload.single('file'), async (req, res) => {
    if (req.file)
    { 
        const requestpost = await request.updaterequestp(req.params.id, req.file.filename);
    }
    res.redirect("/");
});
router.get('/delete/(:id)', async (req, res) => {
    const requestpost = await request.deleterequestp(req.params.id);
    res.redirect("/");
});
//ul.list - unstyled
//li.media
//img.mr - 3(src = image, width = '500', height = "500")
//    .media - body
//input.btn.btn - success(type = 'submit', value = 'Add Product')
//button.btn.btn - secondary(type = 'button' data - dismiss='modal') Close
//.card(style = 'width:500px')
//img.card - img - top(src = image alt = 'Card image' style = 'width:100%')
//    .card - body
//button.btn.btn - primary(type = 'button') Primary
//button.btn.btn - secondary(type = 'button') Secondary
//#verproductModal.modal.fade
//    .modal - dialog
//        .modal - content
//        .modal - header
//h4.modal - title Product Detail
//    .modal - body
//    -var img = p.getImgProducto()
//img.mr - 3(src = imagen, width = '400', height = "400")
//    | #{ p.getIdProducto() }
//            .modal - footer
//button.btn.btn - primary(type = 'button') Update Product
//button.btn.btn - danger(type = 'button') Delete Product
//button.btn.btn - secondary(type = 'button' data - dismiss='modal') Close
////.container
////    -var id = product.getIdProducto();
////-var image = product.getImgProducto();
////ul.list - unstyled
////li.media
////img.mr - 3(src = imagen)
////    .media - body
////h5.mt - 0.mb - 1 #{ id }



//form(method = 'post', action = "/upload", enctype = 'multipart/form-data')
//div
//input#image_uploads(type = 'file', name = 'file', accept = '.jpg, .jpeg, .png')
//p
//div
//input.btn.btn - primary(type = 'submit', value = 'Agregar imagen')
//"main": "main.js",
//"start": "electron ."
//router.post('/upload', upload.single('file'),async (req, res) => {
//        if(!req.file) {
//    res.status(500);
//    return next(err);
//  }
//    var producto = new managep.Producto(0, req.file.filename);
//    var ip = await managep.insertProducto(producto);
//    res.json("Se guardo la imagen con exito");

//});

//router.post('/upload', upload.single('img') ,async (req, res) => {
//    // 'profile_pic' is the name of our file input field in the HTML form
//    if (req.file) {
//        var producto = new listp.Producto(3, req.file.filename);
//        var ip = await listp.updateProducto(producto);
//    }

//    //var ip = await listp.insertProducto(producto);

//});
  // Display uploaded image for user validation
        //res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    //});
    //upload(req, res,async function (err) {
    //    // req.file contains information of uploaded file
    //    // req.body contains information of text fields, if there were any

    //    if (req.fileValidationError) {
    //        return res.send(req.fileValidationError);
    //    }
    //    else if (!req.file) {
    //        return res.send('Please select an image to upload');
    //    }
    //    else if (err instanceof multer.MulterError) {
    //        return res.send(err);
    //    }
    //    else if (err) {
    //        return res.send(err);
    //    }

module.exports = router;

import express from "express";
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
import apiController from '../controller/apiController';
// var appRoot = require('app-root-path');
let router = express.Router();


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, appRoot + "/src/public/image/");
//     },

   
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const imageFilter = function (req, file, cb) {

//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };

// let upload = multer({ storage: storage, fileFilter: imageFilter });

// let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

// const initWebRoute = (app) => {
//     router.get('/', homeController.getHomepage);
//     router.get('/detail/user/:id', homeController.getDetailPage);
//     router.post('/create-new-user', homeController.createNewUser);

//     router.post('/delete-user', homeController.deleteUser);
//     router.get('/edit-user/:id', homeController.getEditPage);
//     router.post('/update-user', homeController.postUpdateUser);

//     router.get('/upload', homeController.getUploadFilePage);
//     router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)

//     router.post('/upload-multiple-images', (req, res, next) => {
//         uploadMultipleFiles(req, res, (err) => {
//             if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
          
//                 res.send('LIMIT_UNEXPECTED_FILE')
//             } else if (err) {
//                 res.send(err)
//             }

//             else {
               
//                 next();
//             }
//         })
//     }, homeController.handleUploadMultipleFiles)



//     router.get('/about', (req, res) => {
//         res.send(`I'm Eric!`)
//     })

//     return app.use('/', router)
// }

const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWord)
    router.get('/user', homeController.handleUserPage)
    router.post('/user/create-user', homeController.handleCreateNewUser)
    router.post('/user/delete-user/:id', homeController.handleDeleteUser)
    router.get('/user/update-user/:id', homeController.getUpdateUserPage)
    router.post('/user/fixupdate-user', homeController.handleUpdateUser)


    router.get('/api/test-api', apiController.testApi)

    return app.use('/', router)
}

export default initWebRoutes;

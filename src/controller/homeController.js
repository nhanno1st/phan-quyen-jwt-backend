import pool from '../config/connectDB';
import multer from 'multer';
import userService from '../service/userService';

const handleHelloWord = (req, res) =>{
    const name = "nhan"
    return res.render("home.ejs",{name})
}
const handleUserPage = async(req, res) =>{
    console.log('Cookies: ', req.cookie);
    let userList = await userService.getUserList();
    // console.log(userList)
    
    return res.render("user.ejs", {userList})
}
const handleCreateNewUser = (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
userService.createNewUser(email,password,username);

    return res.redirect("/user")
}
 const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect("/user")
 }
 const getUpdateUserPage = async(req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    // console.log(user)
    let userData = {}
    userData = user
    return res.render('user-update.ejs',{userData})
 }
 const handleUpdateUser = async(req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfo(email, username, id);
    return res.redirect("/user")
 } 
// let getHomepage = async (req, res) => {
//     const [rows, fields] = await pool.execute('SELECT * FROM users');

//     return res.render('index.ejs', { dataUser: rows, test: 'abc string test' })
// }

// let getDetailPage = async (req, res) => {
//     let userId = req.params.id;
//     let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
//     return res.send(JSON.stringify(user))
// }

// let createNewUser = async (req, res) => {
//     let { firstName, lastName, email, address } = req.body;

//     await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
//         [firstName, lastName, email, address]);

//     return res.redirect('/')
// }

// let deleteUser = async (req, res) => {
//     let userId = req.body.userId;
//     await pool.execute('delete from users where id = ?', [userId])
//     return res.redirect('/');
// }

// let getEditPage = async (req, res) => {
//     let id = req.params.id;
//     let [user] = await pool.execute('Select * from users where id = ?', [id]);
//     return res.render('update.ejs', { dataUser: user[0] }); // x <- y
// }

// let postUpdateUser = async (req, res) => {
//     let { firstName, lastName, email, address, id } = req.body;

//     await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
//         [firstName, lastName, email, address, id]);

//     return res.redirect('/');
// }

// let getUploadFilePage = async (req, res) => {
//     return res.render('uploadFile.ejs')
// }


// let handleUploadFile = async (req, res) => {

//     if (req.fileValidationError) {

//         return res.send(req.fileValidationError);
//     }
//     else if (!req.file) {
//         return res.send('Please select an image to upload');
//     }

//     // Display uploaded image for user validation
//     res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
//     // });
// }


// let handleUploadMultipleFiles = async (req, res) => {

//     if (req.fileValidationError) {
//         return res.send(req.fileValidationError);
//     }
//     else if (!req.files) {
//         return res.send('Please select an image to upload');
//     }

//     let result = "You have uploaded these images: <hr />";
//     const files = req.files;
//     let index, len;

//     // Loop through all the uploaded images and display them on frontend
//     for (index = 0, len = files.length; index < len; ++index) {
//         result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
//     }
//     result += '<hr/><a href="/upload">Upload more images</a>';
//     res.send(result);

// }

// module.exports = {
//     getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser,
//     getUploadFilePage, handleUploadFile, handleUploadMultipleFiles
// }
module.exports = {
    handleHelloWord, handleUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUserPage, handleUpdateUser
}
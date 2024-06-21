import groupService from '../service/groupService';

const readFunc = async (req, res) => {
try {
   let data = await groupService.getGroups();
   return res.status(200).json({
     EM: data.EM, //error message
     EC: data.EC, //error code
     DT: data.DT, //date
   });
} catch (error) {
   console.log(error)
   return res.status(200).json({
      EM: 'error form service',
      EC: '1',
      DT: ''
    });
}
}
 module.exports = {
    readFunc
 }
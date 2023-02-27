const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/',userController.view);
router.post('/',userController.find);
router.get('/users',userController.viewusers);
router.get('/login',userController.login);
router.post('/login',userController.loginInfo);
router.get('/dashboard/:username',userController.viewall);
router.get('/additional/:username',userController.additional);
router.post('/additional/:username',userController.additionalform);
router.get('/tenders/:username',userController.viewtenders);
router.get('/addtenders/:username',userController.addtenders);
router.post('/addtenders/:username',userController.addtenderssuccess);
router.get('/edittenders/:username/:tender',userController.edittenders);
router.post('/edittenders/:username/:tender',userController.edittenderssuccess);
router.get('/tenders/:username/:tender',userController.deletetenders);
router.get('/tender/:tender',userController.particulartender);
router.get('/tenders',userController.tenders);
router.get('/projects',userController.allprojects);
router.get('/addprojects/:tender',userController.addprojects);
router.post('/addprojects/:tender',userController.addprojectssuccess);
router.get('/addprojects',userController.selectprojects);
router.get('/projects/:username',userController.viewprojects);
router.get('/editprojects/:username/:project',userController.editprojects);
router.post('/editprojects/:username/:project',userController.editprojectssuccess);
router.get('/projects/:username/:project',userController.deleteproject);
router.get('/supplies/:project',userController.viewsupplies);
router.get('/addsupplies',userController.addsupplies);
router.post('/addsupplies',userController.addsuppliessuccess);
router.get('/editsupplies/:item',userController.editsupplies);
router.post('/editsupplies/:item',userController.editsuppliessuccess);
router.get('/deletesupplies/:project/:item',userController.deletesupplies);
router.get('/labour/:project',userController.viewlabour);
router.get('/addlabour',userController.addlabour);
router.post('/addlabour',userController.addlaboursuccess);
router.get('/adduser',userController.form);
router.post('/adduser',userController.create);
router.get('/edituser/:username',userController.edit);
router.post('/edituser/:username',userController.update);
router.get('/:username',userController.delete);


module.exports = router;
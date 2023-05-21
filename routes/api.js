var express = require('express');
var router = express.Router();
var apiU = require('../controller/api/api-user');
var apiPro = require('../controller/api/api-product');
var apiCat = require('../controller/api/api-category');
var apiBill = require('../controller/api/api-bill');
var apiDetailed_bill = require('../controller/api/api-detailed_bill');
var apiFeedback = require('../controller/api/api-feedback');
// dinh nghia cac router cho file api theo bang excel

// GET: /api/users
router.get('/users', apiU.listUser); //lay danh sach

router.post('/users/add', apiU.addUser); // them moi

router.put('/users/update/:idu', apiU.updateUser); // sua

router.delete('/users/delete/:idu', apiU.deleteUser); // xoa


// GET: /api/categories
router.get('/categories', apiCat.listCat); //lay danh sach

router.post('/categories/add', apiCat.addCat); // them moi

router.put('/categories/update/:idcat', apiCat.updateCat); // sua

router.delete('/categories/delete/:idcat', apiCat.deleteCat); // xoa


// GET: /api/products
router.get('/products', apiPro.listPro); //lay danh sach

router.post('/products/add', apiPro.addPro); // them moi

router.put('/products/update/:idpro', apiPro.updatePro); // sua

router.delete('/products/delete/:idpro', apiPro.deletePro); // xoa


// GET: /api/bill
router.get('/bill', apiBill.listBill); //lay danh sach

router.post('/bill/add', apiBill.addBill); // them moi

router.put('/bill/update/:idbill', apiBill.updateBill); // sua

router.delete('/bill/delete/:idbill', apiBill.deleteBill); // xoa

// GET: /api/detailed_bill
router.get('/detailed_bill', apiDetailed_bill.listDetailed_bill); //lay danh sach

router.post('/detailed_bill/add', apiDetailed_bill.addDetailed_billl); // them moi

router.put('/detailed_bill/update/:idbill', apiDetailed_bill.updateDetailed_bill); // sua

router.delete('/detailed_bill/delete/:idbill', apiDetailed_bill.deleteDetailed_bill); // xoa

// GET: /api/feedback
router.get('/feedback', apiFeedback.listFeedback); //lay danh sach

router.post('/feedback/add', apiFeedback.addFeedback); // them moi

router.put('/feedback/update/:idfeedback', apiFeedback.updateFeedback); // sua

router.delete('/feedback/delete/:idfeedback', apiFeedback.deleteFeedback); // xoa

module.exports = router;

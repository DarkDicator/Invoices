const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const invoiceController = require('../controller/invoiceController.js')

router.route('/invoice').get(invoiceController.getInvoices)
router.post("/invoice", upload.single('fileName'), invoiceController.postInvoices)
router.put("/invoice", upload.single('fileName'), invoiceController.updateInvoices)
router.route("/invoice").delete(invoiceController.deleteInvoices)

module.exports = router
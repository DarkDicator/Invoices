const yup = require('yup')

const productSchema = yup.object({
    'Invoice_no': yup.string().min(1).required(),
    'date': yup.date().required(),
    'customer_name': yup.string().min(1).required(),
    'salesperson_name': yup.string().min(0).required(),
    'payment_type': yup.mixed().oneOf(['CASH', 'CREDIT']).required(),    
    notes: yup.string()
})

module.exports = productSchema
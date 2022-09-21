const yup = require('yup')

const productSchema = yup.object({
    'Invoice_no': yup.string().min(1).required(),
    'item_name': yup.string().min(5).required(),
    'quantity': yup.number().min(1).required(),
    'total_cog': yup.number().min(0).required("total cogs is a required field"),
    'total_price_sold': yup.number().min(0).required(),    
})

module.exports = productSchema
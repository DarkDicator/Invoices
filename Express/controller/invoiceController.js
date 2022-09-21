const Invoice = require('../models/Invoice.js')
const Product = require('../models/products_sold.js')
const productSchema = require('./validation/validateProduct.js')
const invoiceSchema = require('./validation/validateInvoice.js')
const sequelize = require('sequelize')
const Op = sequelize.Op
const XLSX = require('xlsx')

Invoice.hasMany(Product, {foreignKey: 'Invoice_no'})
Product.belongsTo(Invoice, {as:'list-of_products_sold', foreignKey: 'Invoice_no'})

module.exports = class invoiceController{    


    static async getInvoices(req, res){        
        try{      
            const itemPerPage = req.query.size ? parseInt(req.query.size) : 10
            const page = req.query.page ? parseInt(req.query.page) : 0
            const date = new Date(req.query.date)
            let totalPriceSold = 0
            let totalCOG = 0
            console.log(date)
            const invoiceList = await Invoice.findAndCountAll({
                limit: itemPerPage,
                offset: page * itemPerPage,
                where: {[Op.and]: [{
                    date: {
                        [Op.between]: [date, date]
                    }
                }]},
                include: Product
                })
            //console.log(invoiceList.rows[0].dataValues.Products[0].dataValues.total_price_sold)   
            for(let invoice = 0; invoice < invoiceList.rows.length; invoice++){                
                for(let i = 0; i < invoiceList.rows[invoice].Products.length; i++){                                        
                    totalPriceSold += invoiceList.rows[invoice].dataValues.Products[i].dataValues.total_price_sold                    
                    totalCOG += invoiceList.rows[invoice].dataValues.Products[i].dataValues.total_cog             
                }
            }
            
            const response = {
            Results: invoiceList.rows,
            Profit: totalPriceSold - totalCOG
            }
            
            res.json(response)
        }
        
        catch(e){
            res.status(500).json({message: e.message})
        }
        
    }
    static async postInvoices(req, res){           
        //console.log(req)      
        const workbook = XLSX.readFile(req.file.path)        
        const sheet_list = workbook.SheetNames
        const invoiceSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_list[0]])
        const productSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_list[1]])
        const outputMessage = []        
        for(let currentInvoice of invoiceSheet){                        
            const invoiceDate = new Date(Math.round((currentInvoice['date'] - 25569) * 86400 * 1000))                
            console.log(invoiceDate.toString())  
            try{                                
                const newInvoice = {
                    Invoice_no: currentInvoice['invoice no'],
                    date: invoiceDate.toISOString().split('T')[0],
                    customer_name: currentInvoice['customer'],
                    salesperson_name: currentInvoice['salesperson'],
                    payment_type: currentInvoice['payment type'],                    
                    notes: currentInvoice['notes']
                }
                await invoiceSchema.validate(newInvoice)
                const addInvoice = await Invoice.create(newInvoice)    
                outputMessage.push(`Invoice saved with no ${currentInvoice['invoice no']}`)       
                // productSheet.forEach(async product => {if(product['Invoice no'] == currentInvoice['invoice no']){     
                    
                // }})                
                         
            }catch(e){
                outputMessage.push(e.message)
            }
        }
        for(let product of productSheet){
            try{
                const getInvoice = await Invoice.findOne({where: {Invoice_no: product['Invoice no']}})                
                if(getInvoice){
                    const newProduct = await Product.create({
                        Invoice_no: product['Invoice no'],
                        item_name: product['item'],
                        quantity: product['quantity'],
                        total_cog: product['total cogs'],
                        total_price_sold: product['total price']                    
                    })                        
                    await productSchema.validate(newProduct)
                    outputMessage.push(`Product saved with no ${product['Invoice no']}`)
                }
                else{
                    outputMessage.push(`Couldn't find Invoice with ${product['Invoice no']}`)
                }
                                                              
            }catch(e){
                outputMessage.push(e.message)
            }
            
        }
        const Invoices = await Invoice.findAll()
        const Products = await Product.findAll()

        const invoiceList = []
        Invoices.forEach(invoice => {
            invoiceList.push(invoice.dataValues)
        })
        const productList = []
        Products.forEach(product => {
            productList.push(product.dataValues)
        })

        //Create new xlsx file for update request
        const invoicesSheet = XLSX.utils.json_to_sheet(invoiceList)
        const productsSheet = XLSX.utils.json_to_sheet(productList)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, invoicesSheet, 'invoice')
        XLSX.utils.book_append_sheet(workBook, productsSheet, 'product sold')

        XLSX.write(workBook, {bookType: 'xlsx', type:'buffer'})
        XLSX.write(workBook, {bookType: 'xlsx', type:'binary'})
        XLSX.writeFile(workBook, 'invoiceUpdate.xlsx')
        
        res.json({results: outputMessage})
                    
    }
    static async updateInvoices(req, res){
        const outputMessage = []
        try{
            const workbook = XLSX.readFile(req.file.path)        
            const sheet_list = workbook.SheetNames
            const invoiceSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_list[0]])
            const productSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_list[1]])            
            for(let currentInvoice of invoiceSheet){                
                const invoiceDate = new Date(Math.round((currentInvoice.date - 25569) * 86400 * 1000))                
                currentInvoice.date = invoiceDate                                
                let getInvoice = await Invoice.findOne({where: {Invoice_no: currentInvoice.Invoice_no}})
                if(getInvoice){
                    getInvoice = {
                        Invoice_no: currentInvoice.Invoice_no,
                        date: invoiceDate.toISOString().split('T')[0],
                        customer_name: currentInvoice.customer_name,
                        salesperson_name: currentInvoice.salesperson_name,
                        payment_type: currentInvoice.payment_type,                    
                        notes: currentInvoice.notes
                    }
                    await invoiceSchema.validate(getInvoice)                                   
                    const updateinvoice = Invoice.update(getInvoice, {where: {Invoice_no: currentInvoice.Invoice_no}})
                    outputMessage.push(`Updated Invoice with no ${currentInvoice.Invoice_no}`)
                }else{
                    outputMessage.push(`Couldn't find Invoice with no ${currentInvoice.Invoice_no}`)
                }
            }
            for(let product of productSheet){
                let getProduct = await Product.findOne({where: {id: product.id}})
                console.log(product)
                if(getProduct){
                    getProduct = {
                        Invoice_no: product.Invoice_no,
                        item_name: product.item_name,
                        quantity: product.quantity,
                        total_cog: product.total_cog,
                        total_price_sold: product.total_price_sold
                    }                    
                    await productSchema.validate(getProduct)
                    const updateProduct = await Product.update(getProduct, {where:{id: product.id}})
                    outputMessage.push(`Updated Product with id ${product.id}`)
                }else{
                    outputMessage.push(`Couldn't find product with id ${product.id}`)
                }
            }
            
            
            
            
        }catch(e){
            console.log(e.message)
            outputMessage.push(e.message)
        }
        res.json({results: outputMessage})
    }
    static async deleteInvoices(req, res){
        try{
            const invoiceId = req.query.id
            if (invoiceId){
                const deleteInvoice = await Invoice.destroy({where: {Invoice_no: invoiceId}})
                const deleteProduct = await Product.destroy({where: {Invoice_no: invoiceId}})
                res.json({message:"Success"})    
            }else{
                res.status(400).json({message:"Please provide Invoice no"})
            }
            
            
        }catch(e){
            res.status(500).json({message:e.message})
        }
    }

    
}


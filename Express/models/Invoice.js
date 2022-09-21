const Sequelize = require('sequelize')


module.exports = sequelize.define("Invoices", {
    Invoice_no: {type: Sequelize.STRING(), allowNull: false, primaryKey: true},
    date: {type: Sequelize.DATE, allowNull: false},
    customer_name: {type: Sequelize.STRING(), allowNull: false},
    salesperson_name: {type: Sequelize.STRING(), allowNull: false},
    payment_type: {type: Sequelize.ENUM('CASH', 'CREDIT'), allowNull: false},
    notes: Sequelize.STRING()    
})
const Sequelize = require('sequelize')


module.exports = sequelize.define("Products", {
    id: {type: Sequelize.INTEGER(), primaryKey: true, allowNull: false, autoIncrement: true},
    Invoice_no: {type: Sequelize.STRING(), allowNull: false},
    item_name: {type:Sequelize.STRING(), allowNull: false},
    quantity: {type: Sequelize.INTEGER(), allowNull: false},
    total_cog: {type: Sequelize.INTEGER(), allowNull: false},
    total_price_sold: {type: Sequelize.INTEGER(), allowNull: false}
})
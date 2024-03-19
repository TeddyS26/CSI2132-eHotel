const dotenv = require('dotenv').config();
const db = pgp(process.env.DB_CONN);

const CustomerController = {
    getCustomerById: async (req, res) => {
        const customerId = req.params.id;
        try {
            const customer = await db.one('SELECT * FROM customers WHERE id = $1', customerId);
            res.json(customer);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error occured while getting customer' });
        }
    },

    
}
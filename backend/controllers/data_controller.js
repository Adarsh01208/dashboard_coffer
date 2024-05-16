const Data = require('../models/data');
exports.getData = async (req, res) => {
    try {
        const data = await Data.find({}).limit(30);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

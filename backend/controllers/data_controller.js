module.exports.getData = async (req, res) => {
    const data = await Data.find();
    return res.status(200).json({
        data: data
    });
}




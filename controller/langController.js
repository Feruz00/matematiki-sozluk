const Language = require('../models/Languages')

const all = async (req,res)=>{
    try {
        const data = await Language.find({});
        return res.json(data)
    } catch (error) {
        return res.status(500).json({
            message: "Something wrong went!"
        })
    }
}

const add = async (req,res) => {
    try {
        await Language.create(req.body)
        res.json({success: true})
    } catch (error) {
        res.status(400).json({
            message: "Invalid data"
        })
    }
}

const removeLang = async (req,res)=>{
    console.log(req.body);
    try {
        await Language.deleteMany( { $or: req.body.selectedRowKeys.map(i=> ({_id: i})) })
        res.json()
    } catch (error) {
        console.log(error);
        return res.status(500).json()
    }
}

module.exports = {add,all,removeLang}
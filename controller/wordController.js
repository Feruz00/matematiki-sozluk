
const Words = require('../models/Words')

const add = async (req,res)=>{
    try {
        // console.log(req.body.word)
        await Words.create({word: req.body.word});
        res.json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}
const search = async (req,res)=>{
    // console.log("search:", req.query);
    const {text, short} = req.query
    const sozler = text.split(' ').filter( i=>i.length > 0 )
    // console.log(sozler);
    const ask = short.length === 0 ? { } : {
        $or: sozler.map( i=> ({ [`word.${short||'TM'}`]: { $regex: `${i}`, $options: 'i' }  }) )
    }
        
    try {
        const data = await Words.find(ask).sort(`word.${short?short:'TM'}`)
        return res.json(data)
    } catch (error) {
        return res.status(500).json()
    }
}
const byText = async (req,res)=>{
    // console.log("bytext:", req.query);
    const {text} = req.query
    const sozler = text.split(' ').filter( i=>i.length > 0 )
    // console.log(sozler);
        
    try {
        const data = await Words.find({
            $or: sozler.map( i=> ({ 
                
                // ['word.TM']: { $text: {$search: i } }  }
                ['word.EN']: { $regex: `${i}`, $options: 'i' }  }
            ) )
        }).sort(`word.TM`)
        console.log(data);
        return res.json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json()
    }
}
const getOne = async (req,res)=>{
    try {
        const data = await Words.findOne({_id: req.query.key});
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}
const remove = async(req,res)=>{
    try {
        await Words.findOneAndDelete({_id: req.body.key});
        res.json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}
const update = async(req,res)=>{
    try {
        // console.log(req.body.word)
        await Words.findOneAndUpdate({_id: req.body.key}, {word: req.body.word});
        res.json()
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}

module.exports = {add,search, remove, update, getOne,byText}
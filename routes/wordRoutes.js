const { Router } = require("express");
const {add,search, remove, update, getOne, byText} = require('../controller/wordController')
const router = Router()

router.post('/add', add)
router.get('/', search)
router.post('/delete', remove)
router.put('/update', update)
router.get('/getOne',getOne)
router.get('/byText',byText)

module.exports = router
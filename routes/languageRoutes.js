const { Router } = require("express");
const {add,all,removeLang} = require('../controller/langController')
const router = Router()

router.get('/all', all)
router.post('/add', add)
router.post('/', removeLang)

module.exports = router
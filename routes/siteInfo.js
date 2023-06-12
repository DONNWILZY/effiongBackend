// auth.js
const router = require('express').Router();
const siteSteeings = require('../controllers/settings/siteInfo');
const { verifyToken } = require('../utility/verifyToken');


router.post('/', (req, res)=>{
    res.send(" site info")
});
router.post('/create', siteSteeings.register);
router.post('/update', siteSteeings.login);

module.exports = router;

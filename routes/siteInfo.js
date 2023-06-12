// auth.js
const router = require('express').Router();
const siteSteeings = require('../controllers/settings/siteInfo');
const { verifyToken, verifyAdmin } = require('../utility/verifytoken');


router.post('/', (req, res)=>{
    res.send(" site info")
});
router.post('/create', verifyAdmin, siteSteeings.createSiteInfo);
router.post('/update', verifyAdmin, siteSteeings.updateSiteInfo);
router.post('/update', verifyAdmin,  siteSteeings.AllSiteInfo);

module.exports = router;

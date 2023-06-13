// auth.js
const router = require('express').Router();
const siteSteeings = require('../../controllers/settings/siteInfo.js');
const { verifyToken, verifyAdmin } = require('../../utility/verifytoken.js');
const createError = require('../../utility/createError')


router.post('/', (req, res)=>{
    res.send(" site info")
});
router.post('/create', siteSteeings.createSiteInfo);
router.post('/update', verifyAdmin, siteSteeings.updateSiteInfo);
router.post('/view', verifyAdmin,  siteSteeings.AllSiteInfo);

module.exports = router;

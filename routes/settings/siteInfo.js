// auth.js
const router = require('express').Router();
const siteSteeings = require('../../controllers/settings/siteInfo.js');
const { verifyToken, verifyAdmin } = require('../../utility/verifytoken.js');
const createError = require('../../utility/createError')


router.post('/', (req, res)=>{
    res.send(" site info")
});

router.post('/create', siteSteeings.createSiteInfo);

router.put('/update', verifyAdmin, siteSteeings.updateSiteInfo);

router.delete('/delete', verifyAdmin, siteSteeings.deleteSiteInfo);

router.get('/view', verifyAdmin,  siteSteeings.viewSiteInfo);

module.exports = router;

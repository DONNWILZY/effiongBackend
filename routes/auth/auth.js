// auth.js
const router = require('express').Router();
const authController = require('../../controllers/user/authControllers');
const { verifyToken, verifyAdmin, verifyUser, verifyVendor } = require('../../utility/verifyToken');


router.post('/', (req, res)=>{
    res.send(" auth us working")
});
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

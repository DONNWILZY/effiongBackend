// auth.js
const router = require('express').Router();
const authController = require('../../controllers/user/authControllers.js');
const { verifyToken, verifyAdmin, verifyUser, verifyVendor } = require('../../utility/verifyToken.js');
const { verifyEmail } = require('../../controllers/user/authControllers');
const User = require('../../models/user/User.js')
const VerificationToken = require('../../models/user/VerificationToken.js')


router.post('/', (req, res)=>{
    res.send(" auth us working")
});
router.post('/register', authController.register.register);
router.post('/login', authController.login);
router.get('/verifyEmail/:userId/:verificationString', authController.verifyEmail);
// route for verification page

router.get('/verified', (req, res)=>{
    res.sendFile(path.join(__dirname, './../views/verified.html'));
  })

  router.get("/token", VerificationToken)

module.exports = router;

const SiteInfo = require("../../models/settings/SitInfo.js");
//const createError = require('../../utility/createError');

/////CREATE SITE INFO
const createSiteInfo = async (req, res, next) =>{
    const Newinfo = new SiteInfo(req.body)

    try{
        const savedSiteinfo = await Newinfo.save();
        res.json({
            status: 200,
            message: "successfully Created SITE INFO",
            data: savedSiteinfo
        });

    }catch(err){
        next(err);
    }
}

////// UPDATE SITE INFO
const updateSiteInfo = async (req, res, next) =>{
    try{
        const updatedSiteInfo = await SiteInfo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
          );
          res.json({
            status: 200,
            message: `Your site information  ${req.params.id} updated`,
            data: updatedSiteInfo,
          });
        //catch blog for update
    }catch(err){
        next(err);
    }
}

// GET ALL 
const AllSiteInfo = async (req, res, next)=>{
    try{
        const info = await SiteInfo.find()
        res.json({
            status: "Successful",
            message: info
        })
    }catch(err){
        res.json({
            status: "FAILED",
            message: "FAILED TO FTECH USER CART"
        })
    }
}


module.exports = {
    createSiteInfo,
    updateSiteInfo,
    AllSiteInfo,
  };
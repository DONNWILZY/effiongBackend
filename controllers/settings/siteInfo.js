const SiteInfo = require("../../models/settings/SitInfo.js");
//const createError = require('../../utility/createError');


// Create or update the app information
const createSiteInfo = async (req, res) => {
  const { siteName, description, logo, image, waterark } = req.body;

  try {
    const existingSiteInfo = await SiteInfo.findOne({});
    if (existingSiteInfo) {
      return res.status(400).json({ error: 'Creating new AppInfo document is not allowed' });
    }

    const newSiteInfo = new SiteInfo({ siteName, description, logo, image, waterark});
    const savedSiteInfo = await newSiteInfo.save();

    res.status(200).json(savedSiteInfo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the app information' });
  }
};

// Update the app information
const updateSiteInfo = async (req, res) => {
  const { siteName, logo, description } = req.body;

  try {
    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({}, { siteName, description, logo, image, waterark}, { new: true });

    if (!updatedSiteInfo) {
      return res.status(404).json({ error: 'AppInfo document not found' });
    }

    res.status(200).json(updatedSiteInfo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the app information' });
  }
};

// View the app information
const viewSiteInfo = async (req, res) => {
  try {
    const siteInfo = await SiteInfo.findOne({});

    if (!siteInfo) {
      return res.status(404).json({ error: 'AppInfo document not found' });
    }

    res.status(200).json(siteInfo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the app information' });
  }
};

// Delete the app information
const deleteSiteInfo = async (req, res) => {
  try {
    const deletedInfo = await SiteInfo.findOneAndDelete({});

    if (!deletedInfo) {
      return res.status(404).json({ error: 'AppInfo document not found' });
    }

    res.status(200).json({ message: 'AppInfo document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the app information' });
  }
};

module.exports = {
createSiteInfo,
updateSiteInfo,
viewSiteInfo,
deleteSiteInfo
};





































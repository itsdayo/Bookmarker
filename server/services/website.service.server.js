module.exports = function (app) {
  const websiteModel = require("../models/website/website.model.server.js");
  const pageModel = require("../models/page/page.model.server.js");
  const widgetModel = require("../models/widget/widget.model.server.js");

  app.post("/api/user/:uid/website", createWebsite);
  app.get("/api/user/:uid/website", findAllWebsitesForUser);
  app.get("/api/website/:wid", findWebsiteById);
  app.put("/api/website/:wid", updateWebsite);
  app.delete("/api/website/:wid", deleteWebsite);

  function createWebsite(req, res) {
    // userId = req.params['uid'];
    var website = req.body;
    // website.id = Math.floor(Math.random()*Math.floor(10000)).toString();
    //    website.developerId = userId;
    //    websites.push(website);

    websiteModel.createWebsite(website).then((data) => {
      res.json(data);
    });
  }

  function findAllWebsitesForUser(req, res) {
    var uid = req.params["uid"];
    // var result = [];
    // for (var x = 0; x < websites.length; x++) {
    //   if (websites[x].developerId === userId) {
    //     result.push(websites[x])

    //     }
    // }

    websiteModel.findAllWebsitesForUser(uid).then((websites) => {
      res.json(websites);
    });
  }

  function findWebsiteById(req, res) {
    var wid = req.params["wid"];
    websiteModel.findWebsiteById(wid).then((website) => {
      res.json(website);
    });
  }

  function updateWebsite(req, res) {
    var wid = req.params["wid"];
    var website = req.body;
    websiteModel.updateWebsite(wid, website).then((data) => {
      res.json(data);
    });
  }

  function deleteWebsite(req, res) {
    const wid = req.params["wid"];

    // First find all pages for this website
    pageModel
      .findAllPagesForWebsite(wid)
      .then(async (pages) => {
        const widgetDeletions = pages.map((page) =>
          widgetModel.deleteWidgetsByPageId(page.id)
        );

        await Promise.all(widgetDeletions);
        pageModel.deletePageByWebsiteId(wid);
        websiteModel.deleteWebsite(wid);
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error deleting website and its widgets:", error);
        res.status(500).json({ error: "Failed to delete website" });
      });
  }
};

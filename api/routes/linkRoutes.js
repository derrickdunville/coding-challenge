'use strict';
module.exports = function(app) {

    let linkController  = require('../controllers/linkController')

    // Link Routes
    app.route('/links')
        /**
         * @api {get} /links List All Links
         * @apiGroup Link
         * @apiSuccess {JSON} List of all links
         * @apiError
         */
        .get(linkController.listLinks)

        /**
         * @api {post} /links Create New Links
         * @apiGroup Links
         * @apiParam {JSON} link json object
         * @apiSuccess {JSON} Linkss object
         * @apiError Unauthorized user is unauthorized
         */
        .post(linkController.createLink)

    app.route('/links/:title')
        /**
         * @api {get} /links/:linkId Read Links
         * @apiGroup Links
         * @apiParam {Integer} linkId Id of the desired link
         * @apiSuccess {JSON} Links Object
         * @apiError Unauthorized user is unauthorized
         */
        .get(linkController.readLink)
        /**
         * @api {put} /links/:linkId Update Links
         * @apiGroup Links
         * @apiParam {Integer} linkId Id of the desired link
         * @apiSuccess {JSON} Links Object
         * @apiError Unauthorized user is unauthorized
         */
        .put(linkController.updateLink)
        /**
         * @api {delete} /links/:linkId Delete Links
         * @apiGroup Links
         * @apiParam {Integer} linkId Id of the desired link
         * @apiSuccess {JSON} Links Object
         * @apiError Unauthorized user is unauthorized
         */
        .delete(linkController.deleteLink);

};

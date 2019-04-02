'use strict';
module.exports = function(app) {

    let linkController  = require('../controllers/linkController')

    // Link Routes
    app.route('/links')
        /**
         * @api {get} /links List
         * @apiVersion 1.0.0
         * @apiGroup Links
         * @apiDescription Returns a list of all link objects.
         * @apiSuccess (200) {Object} JSON object containing list of all links
         * @apiError (500) {Object} InternalServerError an error object from mongo
         */
        .get(linkController.listLinks)

        /**
         * @api {post} /links Create
         * @apiVersion 1.0.0
         * @apiGroup Links
         * @apiDescription Creates a new link object. The parameters for this endpoint should be sent as a json object within the request body.
         * @apiParam {String} title  the title of the desired link
         * @apiParamExample {json} Request-Body:
         *  {
         *    title: "example"
         *  }
         * @apiSuccess (201) {String} _id ObjectID of the link
         * @apiSuccess (201) {String} title title of the link
         * @apiSuccess (201) {Number} clicks number of times the link has been clicked
         * @apiSuccessExample {json} Success-Response-Body:
         *  {
         *    _id: "5a6a572368cb6852a68a83d3",
         *    title: "example",
         *    clicks: 10
         *  }
         * @apiError (400) {Object} ValidationError an object describing the error
         * @apiErrorExample {json} Error-Response-Body:
         * {
         *   err: {
         *     type: "ValidationError"
         *     message: "link already exists"
         *   }
         * }
         * @apiErrorExample {json} Error-Response-Body:
         * {
         *   err: {
         *     type: "ValidationError"
         *     message: "link title is required"
         *   }
         * }
         * @apiErrorExample {json} Error-Response-Body:
         * {
         *   err: {
         *     type: "ValidationError"
         *     message: "link title can only contain alphanumeric characters and underscores"
         *   }
         * }
         */
        .post(linkController.createLink)

    app.route('/links/:title')
        /**
         * @api {get} /links/:title Read
         * @apiVersion 1.0.0
         * @apiGroup Links
         * @apiDescription Returns the link object with the matching title. The title parameter should be sent as a query parameter.
         * @apiParam {String} title  the title of the target link
         * @apiSuccess (200) {String} _id ObjectID of the link
         * @apiSuccess (200) {String} title title of the link
         * @apiSuccess (200) {Number} clicks number of times the link has been clicked
         * @apiSuccessExample {json} Success-Response-Body:
         *  {
         *    _id: "5a6a572368cb6852a68a83d3",
         *    title: "example",
         *    clicks: 10
         *  }
         * @apiError (404) {Object} NotFound an object with a message about the error
         * @apiErrorExample {json} Error-Response-Body:
         * {
         *   err: {
         *     type: "ValidationError"
         *     message: "target link not found"
         *   }
         * }
         */
        .get(linkController.readLink)
        /**
         * @api {put} /links/:title Update
         * @apiVersion 1.0.0
         * @apiGroup Links
         * @apiDescription Updates the link object with the matching title. The title parameter should be sent as a query parameter. The updated title should be sent a within a json object in the request body.
         * @apiParam {String} title  the title of the target link
         * @apiParamExample {json} Request-Body:
         *  {
         *    title: "updated"
         *  }
         * @apiSuccess (200) {String} _id ObjectID of the link
         * @apiSuccess (200) {String} title title of the link
         * @apiSuccess (200) {Number} clicks number of times the link has been clicked
         * @apiSuccessExample {json} Success-Response-Body:
         *  {
         *    _id: "5a6a572368cb6852a68a83d3",
         *    title: "updated",
         *    clicks: 10
         *  }
         * @apiError (404) {Object} NotFound an object with a message about the error
         * @apiErrorExample {json} Error-Response-Body:
         * {
         *   err: {
         *     type: "ValidationError"
         *     message: "target link not found"
         *   }
         * }
         */
        .put(linkController.updateLink)
         /**
          * @api {delete} /links/:title Delete
          * @apiVersion 1.0.0
          * @apiGroup Links
          * @apiDescription Deletes a link object. The title parameter should be sent as a query parameter.
          * @apiParam {String} title  the title of the target link
          * @apiSuccess (200) {String} message a message acknowledging a successful delete
          * @apiSuccess (200) {String} title the title of the deleted link
          * @apiSuccessExample {json} Success-Response-Body:
          *  {
          *    title: "example",
          *    message: "link successfully deleted"
          *  }
          * @apiError (404) {Object} NotFound an object with a message about the error
          * @apiErrorExample {json} Error-Response-Body:
          * {
          *   err: {
          *     type: "ValidationError"
          *     message: "target link not found"
          *   }
          * }
          */
        .delete(linkController.deleteLink);

};

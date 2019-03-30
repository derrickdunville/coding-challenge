'use strict';
module.exports = function(app) {

    let clickController  = require('../controllers/clickController')

    // Click Routes
    app.route('/click/:title')
        /**
         * @api {post} /click/:title Create
         * @apiVersion 1.0.0
         * @apiGroup Click
         * @apiDescription Increments the # of clicks for the link with the target title. The title parameter should be sent as a query parameter.
         * @apiParam {String} title the title of a link
         * @apiSuccess (200) {String} message link clicks successfully updated
         * @apiError (404) {Object} NotFound {message: "link not found"}
         * @apiError (500) {Object} InternalServerError an error object from mongo
         */
        .post(clickController.createClick)
}

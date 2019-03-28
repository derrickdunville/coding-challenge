'use strict';
module.exports = function(app) {

    let clickController  = require('../controllers/clickController')

    // Click Routes
    app.route('/click/:title')
        /**
         * @api {post} /click/:title Create New Click
         * @apiGroup Click
         * @apiParam Link title
         * @apiSuccess Status 200
         * @apiError Status 404
         */
        .post(clickController.createClick)
}

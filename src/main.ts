import * as should from "should";

should.exist(process.env.DB_URI, "Database URI (DB_URI) environment variable should be provided.");
should.exist(process.env.DB_NAME, "Database Name (DB_NAME) environment variable should be provided.");
should.exist(process.env.DB_USER, "Database User (DB_USER) environment variable should be provided.");
should.exist(process.env.DB_PASS, "Database Password (DB_PASS) environment variable should be provided.");

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

const msg: string = "Hello, World!";
console.log(msg);
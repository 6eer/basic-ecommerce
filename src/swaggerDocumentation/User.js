/**
 * @swagger
 * components:
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           description: The auto-generated and auto-incremented ID of the User. This property is a primary key.
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *           readOnly: true
 *           description: The date the user was added.
 *         updatedAt:
 *           type: string
 *           format: date
 *           readOnly: true
 *           description: The date the user was modificated.
 *
 *       example:
 *         id: 1
 *         name: "Sample User"
 *         email: "sampleemail@gmail.com"
 *         password: "samplepassword"
 *         role: "user"
 *         createdAt: "2023-09-25 19:47:02.346-03"
 *         updatedAt: "2023-09-25 20:47:02.346-03"
 *
 *   responses:
 *     InternalServerError:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "An unexpected server error has occurred"
 *     NotFoundError--:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "User not found"
 *     TokenNotFoundError:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Auth Failed, Token not found"
 *     UserTokenNotFoundError:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Auth Failed, no user found"
 *     ValidateRequestErrorMissing:
 *         description: Bad Request.
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     instancePath:
 *                       type: string
 *                     schemaPath:
 *                       type: string
 *                     keyword:
 *                       type: string
 *                     params:
 *                       type: object
 *                       properties:
 *                         missingProperty:
 *                           type: string
 *                     message:
 *                       type: string
 *             example:
 *               errors:
 *                 - instancePath: ""
 *                   schemaPath: "#/required"
 *                   keyword: "required"
 *                   params:
 *                     missingProperty: "name"
 *                   message: "must have required property 'name'"
 *
 *     ValidateRequestErrorType:
 *         description: Bad Request.
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     instancePath:
 *                       type: string
 *                     schemaPath:
 *                       type: string
 *                     keyword:
 *                       type: string
 *                     params:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                     message:
 *                       type: string
 *             example:
 *               errors:
 *                 - instancePath: "/id"
 *                   schemaPath: "#/properties/id/type"
 *                   keyword: "type"
 *                   params:
 *                     type: "integer"
 *                   message: "must be integer"
 *     RoleEnumError:
 *         description: Bad Request.
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     instancePath:
 *                       type: string
 *                     schemaPath:
 *                       type: string
 *                     keyword:
 *                       type: string
 *                     params:
 *                       type: object
 *                       properties:
 *                         allowedValues:
 *                           type: array
 *                           items:
 *                             type: string
 *                     message:
 *                       type: string
 *             example:
 *               errors:
 *                 - instancePath: "/role"
 *                   schemaPath: "#/properties/role/enum"
 *                   keyword: "enum"
 *                   params:
 *                     allowedValues:
 *                       - "admin"
 *                       - "user"
 *                       - "seller"
 *                   message: "must be equal to one of the allowed values (admin, user, seller)"
 *     AditionalPropertiesError:
 *         description: Bad Request.
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     instancePath:
 *                       type: string
 *                     schemaPath:
 *                       type: string
 *                     keyword:
 *                       type: string
 *                     params:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                     message:
 *                       type: string
 *             example:
 *               errors:
 *                 - instancePath: ""
 *                   schemaPath: "#/additionalProperties"
 *                   keyword: "additionalProperties"
 *                   params:
 *                     additionalProperty: "exampleAditionalProperty"
 *                   message: "must NOT have additional properties"
 *     NameNotAvailableError:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Name is not available"
 *     EmailNotAvailableError:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Email is not available"
 *     RoleError:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Forbidden: insufficient permissions"
 *     UnableError:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Unable to login"
 *     ExpiredTokenError:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Auth Failed, Token expired"
 *     InvalidTokenError:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Auth Failed, Token invalid"
 *
 *
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *           description: Unauthorized.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/InvalidTokenError'
 *                   - $ref: '#/components/responses/ExpiredTokenError'
 *                   - $ref: '#/components/responses/TokenNotFoundError'
 *                   - $ref: '#/components/responses/UserTokenNotFoundError'
 *               examples:
 *                 ExpiredToken:
 *                   value:
 *                       message: "Auth Failed, Token expired"
 *                 InvalidToken:
 *                   value:
 *                       message: "Auth Failed, Token invalid"
 *                 NotFound:
 *                   value:
 *                       message: "Auth Failed, Token not found"
 *                 NotFoundUser:
 *                   value:
 *                       message: "Auth Failed, user not found"
 *       403:
 *        $ref: '#/components/responses/RoleError'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *   post:
 *     summary: Sign Up User
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: "NameExample"
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "emailexample@hotmail.com"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "passwordExample"
 *               role:
 *                 type: string
 *                 description: The role of the user.
 *                 example: "user"
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Created.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *           description: Bad Request.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/ValidateRequestErrorMissing'
 *                   - $ref: '#/components/responses/ValidateRequestErrorType'
 *                   - $ref: '#/components/responses/NameNotAvailableError'
 *                   - $ref: '#/components/responses/EmailNotAvailableError'
 *                   - $ref: '#/components/responses/RoleEnumError'
 *                   - $ref: '#/components/responses/AditionalPropertiesError'
 *               examples:
 *                 missingProperty:
 *                   value:
 *                     errors:
 *                       - instancePath: ""
 *                         schemaPath: "#/required"
 *                         keyword: "required"
 *                         params:
 *                           missingProperty: "name"
 *                         message: "must have required property 'name'"
 *                 wrongType:
 *                   value:
 *                     errors:
 *                       - instancePath: "/password"
 *                         schemaPath: "#/properties/password/type"
 *                         keyword: "type"
 *                         params:
 *                           type: "string"
 *                         message: "must be string"
 *                 nameNotAvailable:
 *                   value:
 *                       message: "Name is not available"
 *                 emailNotAvailable:
 *                   value:
 *                       message: "Email is not available"
 *                 Wrong Rol:
 *                   value:
 *                     errors:
 *                       - instancePath: "/role"
 *                         schemaPath: "#/properties/role/enum"
 *                         keyword: "enum"
 *                         params:
 *                           allowedValues:
 *                             - "admin"
 *                             - "user"
 *                             - "seller"
 *                         message: "must be equal to one of the allowed values (admin, user, seller)"
 *                 Aditional properties:
 *                   value:
 *                     errors:
 *                       - instancePath: "/"
 *                         schemaPath: "#/additionalProperties"
 *                         keyword: "additionalProperties"
 *                         params:
 *                           additionalProperties: "exampleAditionalProperty"
 *                         message: "must NOT have additional properties"
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *
 * /users/login:
 *   post:
 *     summary: Log in user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "emailexample@hotmail.com"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "passwordExample"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "The login was succesfull"
 *       400:
 *           description: Bad Request.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/ValidateRequestErrorMissing'
 *                   - $ref: '#/components/responses/ValidateRequestErrorType'
 *                   - $ref: '#/components/responses/UnableError'
 *                   - $ref: '#/components/responses/AditionalPropertiesError'
 *               examples:
 *                 missingProperty:
 *                   value:
 *                     errors:
 *                       - instancePath: ""
 *                         schemaPath: "#/required"
 *                         keyword: "required"
 *                         params:
 *                           missingProperty: "email"
 *                         message: "must have required property 'email'"
 *                 wrongType:
 *                   value:
 *                     errors:
 *                       - instancePath: "/password"
 *                         schemaPath: "#/properties/password/type"
 *                         keyword: "type"
 *                         params:
 *                           type: "string"
 *                         message: "must be string"
 *                 Unable:
 *                   value:
 *                       message: "Unable to login"
 *                 Aditional properties:
 *                   value:
 *                     errors:
 *                       - instancePath: "/"
 *                         schemaPath: "#/additionalProperties"
 *                         keyword: "additionalProperties"
 *                         params:
 *                           additionalProperties: "exampleAditionalProperty"
 *                         message: "must NOT have additional properties"
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 * /users/logout:
 *   post:
 *     summary: Log out user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "The logout was succesfull"
 *       401:
 *           description: Unauthorized.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/InvalidTokenError'
 *                   - $ref: '#/components/responses/ExpiredTokenError'
 *                   - $ref: '#/components/responses/TokenNotFoundError'
 *                   - $ref: '#/components/responses/UserTokenNotFoundError'
 *               examples:
 *                 ExpiredToken:
 *                   value:
 *                       message: "Auth Failed, Token expired"
 *                 InvalidToken:
 *                   value:
 *                       message: "Auth Failed, Token invalid"
 *                 NotFound:
 *                   value:
 *                       message: "Auth Failed, Token not found"
 *                 NotFoundUser:
 *                   value:
 *                       message: "Auth Failed, user not found"
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 * /users/me:
 *   get:
 *     summary: Get user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *       401:
 *           description: Unauthorized.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/InvalidTokenError'
 *                   - $ref: '#/components/responses/ExpiredTokenError'
 *                   - $ref: '#/components/responses/TokenNotFoundError'
 *                   - $ref: '#/components/responses/UserTokenNotFoundError'
 *               examples:
 *                 ExpiredToken:
 *                   value:
 *                       message: "Auth Failed, Token expired"
 *                 InvalidToken:
 *                   value:
 *                       message: "Auth Failed, Token invalid"
 *                 NotFound:
 *                   value:
 *                       message: "Auth Failed, Token not found"
 *                 NotFoundUser:
 *                   value:
 *                       message: "Auth Failed, user not found"
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *   put:
 *     summary: Update user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: "Name changed"
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "emailchanged@hotmail.com"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "password changed"
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Name changed"
 *       400:
 *           description: Bad Request.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/ValidateRequestErrorType'
 *                   - $ref: '#/components/responses/NameNotAvailableError'
 *                   - $ref: '#/components/responses/EmailNotAvailableError'
 *               examples:
 *                 wrongType:
 *                   value:
 *                     errors:
 *                       - instancePath: "/password"
 *                         schemaPath: "#/properties/password/type"
 *                         keyword: "type"
 *                         params:
 *                           type: "string"
 *                         message: "must be string"
 *                 nameNotAvailable:
 *                   value:
 *                       message: "Name is not available"
 *                 emailNotAvailable:
 *                   value:
 *                       message: "Email is not available"
 *       401:
 *           description: Unauthorized.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/InvalidTokenError'
 *                   - $ref: '#/components/responses/ExpiredTokenError'
 *                   - $ref: '#/components/responses/TokenNotFoundError'
 *                   - $ref: '#/components/responses/UserTokenNotFoundError'
 *               examples:
 *                 ExpiredToken:
 *                   value:
 *                       message: "Auth Failed, Token expired"
 *                 InvalidToken:
 *                   value:
 *                       message: "Auth Failed, Token invalid"
 *                 NotFound:
 *                   value:
 *                       message: "Auth Failed, Token not found"
 *                 NotFoundUser:
 *                   value:
 *                       message: "Auth Failed, user not found"
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     summary: Delete user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "The user was successfully removed"
 *       401:
 *           description: Unauthorized.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/InvalidTokenError'
 *                   - $ref: '#/components/responses/ExpiredTokenError'
 *                   - $ref: '#/components/responses/TokenNotFoundError'
 *                   - $ref: '#/components/responses/UserTokenNotFoundError'
 *               examples:
 *                 ExpiredToken:
 *                   value:
 *                       message: "Auth Failed, Token expired"
 *                 InvalidToken:
 *                   value:
 *                       message: "Auth Failed, Token invalid"
 *                 NotFound:
 *                   value:
 *                       message: "Auth Failed, Token not found"
 *                 NotFoundUser:
 *                   value:
 *                       message: "Auth Failed, user not found"
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 * /users/{userId}:
 *   get:
 *     summary: Get a user's profile by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/User'
 *                 - type: object
 *       400:
 *        $ref: '#/components/responses/ValidateRequestErrorType'
 *       401:
 *           description: Unauthorized.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/InvalidTokenError'
 *                   - $ref: '#/components/responses/ExpiredTokenError'
 *                   - $ref: '#/components/responses/TokenNotFoundError'
 *                   - $ref: '#/components/responses/UserTokenNotFoundError'
 *               examples:
 *                 ExpiredToken:
 *                   value:
 *                       message: "Auth Failed, Token expired"
 *                 InvalidToken:
 *                   value:
 *                       message: "Auth Failed, Token invalid"
 *                 NotFound:
 *                   value:
 *                       message: "Auth Failed, Token not found"
 *                 NotFoundUser:
 *                   value:
 *                       message: "Auth Failed, user not found"
 *       403:
 *        $ref: '#/components/responses/RoleError'
 *       404:
 *        $ref: '#/components/responses/NotFoundError--'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     summary: Delete a user's profile by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "The user was successfully removed"
 *       400:
 *        $ref: '#/components/responses/ValidateRequestErrorType'
 *       401:
 *           description: Unauthorized.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/InvalidTokenError'
 *                   - $ref: '#/components/responses/ExpiredTokenError'
 *                   - $ref: '#/components/responses/TokenNotFoundError'
 *                   - $ref: '#/components/responses/UserTokenNotFoundError'
 *               examples:
 *                 ExpiredToken:
 *                   value:
 *                       message: "Auth Failed, Token expired"
 *                 InvalidToken:
 *                   value:
 *                       message: "Auth Failed, Token invalid"
 *                 NotFound:
 *                   value:
 *                       message: "Auth Failed, Token not found"
 *                 NotFoundUser:
 *                   value:
 *                       message: "Auth Failed, user not found"
 *       403:
 *        $ref: '#/components/responses/RoleError'
 *       404:
 *        $ref: '#/components/responses/NotFoundError--'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 */

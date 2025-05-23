const express = require('express');
const route = express.Router();

// Importing controllers for user 
const signUpController = require('../controllers/signup');
const getAllUsers = require('../controllers/getAllUsers');
const updateUsers = require('../controllers/updateUsers');
const deleteUser = require('../controllers/deleteUser');

// Importing controllers for login
const loginController = require('../controllers/login');

// Importing controllers for found items
const createFoundItem = require('../controllers/foundItem');
const getFoundItem = require('../controllers/getFoundItem');
const updateFoundItem = require('../controllers/updateFoundItem');
const deleteFoundItem = require('../controllers/deleteFoundItem');

// Importing controllers for lost items
const createLostItem = require('../controllers/lostItem');
const getLostItem = require('../controllers/getLostItem');
const updateLostItem = require('../controllers/updateLostItem');
const deleteLostItem = require('../controllers/deleteLostItem');

// Importing controllers for contact us
const createContact = require('../controllers/contact');
const getContact = require('../controllers/getContacts');
const deleteContact = require('../controllers/deleteContact');

// User routes and swagger
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               location:
 *                 type: string
 *               gender:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or user already exists
 *       500:
 *         description: Internal server error
 */
route.post('/signup', signUpController.signUp);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the system
 *     description: Authenticate the user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
route.post('/login', loginController.login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetch a list of all users in the system
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   location:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
route.get('/users', getAllUsers.getUsers);

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Update user information
 *     description: Update the details of a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input or user not found
 *       500:
 *         description: Internal server error
 * */
route.put('/updateUser', updateUsers.update);

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete a user
 *     description: Remove a user from the system
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
route.delete('/deleteUser', deleteUser.delete);



// Found item routes
/**
 * @swagger
 * /foundIt:
 *   post:
 *     summary: Create a new found item
 *     description: Report a found item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foundName:
 *                 type: string
 *               foundEmail:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               itemName:
 *                 type: string
 *               itemImage:
 *                 type: string
 *               itemSerialNumber:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               dateFound:
 *                 type: string
 *                 format: date
 */
route.post('/foundIt', createFoundItem.foundIt);

/**
 * @swagger
 * /foundItems:
 *   get:
 *     summary: Get all found items
 *     description: Fetch a list of all found items in the system
 *     responses:
 *       200:
 *         description: A list of found items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   foundName:
 *                     type: string
 *                   foundEmail:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   itemName:
 *                     type: string
 *                   itemImage:
 *                     type: string
 *                   itemSerialNumber:
 *                     type: string
 *                   location:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dateFound:
 *                     type: string
 *                     format: date
 */
route.get('/foundItems', getFoundItem.getFoundItems);

/**
 * @swagger
 * /updateFoundItem:
 *   put:
 *     summary: Update a found item
 *     description: Update the details of a found item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foundName:
 *                 type: string
 *               foundEmail:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               itemName:
 *                 type: string
 *               itemImage:
 *                 type: string
 *               itemSerialNumber:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               dateFound:
 *                 type: string
 *                 format: date
 */
route.put('/updateFoundItem', updateFoundItem.update);

/**
 * @swagger
 * /deleteFoundItem:
 *   delete:
 *     summary: Delete a found item
 *     description: Remove a found item from the system
 *     parameters:
 *       - in: query
 *         name: itemId
 *         required: true
 *         description: ID of the found item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Found item deleted successfully
 *       400:
 *         description: Invalid item ID
 *       500:
 *         description: Internal server error
 */
route.delete('/deleteFoundItem', deleteFoundItem.delete);

// Lost item routes
/**
 * @swagger
 * /lostIt:
 *   post:
 *     summary: Create a new lost item
 *     description: Report a lost item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lostName:
 *                 type: string
 *               lostEmail:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               itemName:
 *                 type: string
 *               itemImage:
 *                 type: string
 *               itemSerialNumber:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               dateLost:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Lost item reported successfully
 *       400:
 *         description: Invalid input or item already exists
 *       500:
 *         description: Internal server error
 */
route.post('/lostIt', createLostItem.lostIt);

/**
 * @swagger
 * /lostItem:
 *   get:
 *     summary: Get all lost items
 *     description: Fetch a list of all lost items in the system
 *     responses:
 *       200:
 *         description: A list of lost items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   lostName:
 *                     type: string
 *                   lostEmail:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   itemName:
 *                     type: string
 *                   itemImage:
 *                     type: string
 *                   itemSerialNumber:
 *                     type: string
 *                   location:
 *                     type: string
 *                   description:
 *                     type: string
 *                   dateLost:
 *                     type: string
 *                     format: date
 */
route.get('/lostItem', getLostItem.getLostItems);

/**
 * @swagger
 * /updateLostItem:
 *   put:
 *     summary: Update a lost item
 *     description: Update the details of a lost item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lostName:
 *                 type: string
 *               lostEmail:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               itemName:
 *                 type: string
 *               itemImage:
 *                 type: string
 *               itemSerialNumber:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               dateLost:
 *                 type: string
 *                 format: date
 */
route.put('/updateLostItem', updateLostItem.update);

/**
 * @swagger
 * /deleteLostItem:
 *   delete:
 *     summary: Delete a lost item
 *     description: Remove a lost item from the system
 *     parameters:
 *       - in: query
 *         name: itemId
 *         required: true
 *         description: ID of the lost item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lost item deleted successfully
 *       400:
 *         description: Invalid item ID
 *       500:
 *         description: Internal server error
 */
route.delete('/deleteLostItem', deleteLostItem.delete);

// Contact us route
/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Contact us
 *     description: Send a message to the support team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
route.post('/contact', createContact.contactUs);

/**
 * @swagger
 * /getContact:
 *   get:
 *     summary: Get all contact messages
 *     description: Fetch a list of all contact messages
 *     responses:
 *       200:
 *         description: A list of contact messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   message:
 *                     type: string
 */
route.get('/getContact', getContact.getContacts);

/**
 * @swagger
 * /deleteContact:
 *   delete:
 *     summary: Delete a contact message
 *     description: Remove a contact message from the system
 *     parameters:
 *       - in: query
 *         name: messageId
 *         required: true
 *         description: ID of the contact message to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact message deleted successfully
 *       400:
 *         description: Invalid message ID
 *       500:
 *         description: Internal server error
 */
route.delete('/deleteContact', deleteContact.delete);



module.exports = route;
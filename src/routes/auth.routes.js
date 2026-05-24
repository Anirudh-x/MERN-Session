const express = require('express');
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/index');
const validationErrorHandler = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// POST register
router.post(
  '/register',
  authValidator.validateRegister,
  validationErrorHandler,
  authController.register
);

// POST login
router.post(
  '/login',
  authValidator.validateLogin,
  validationErrorHandler,
  authController.login
);

// POST logout
router.post('/logout', authController.logout);

// GET current user (protected route)
router.get(
  '/me',
  authMiddleware,
  authController.getCurrentUser
);

module.exports = router;

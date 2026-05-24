const express = require('express');
const courseController = require('../controllers/course.controller');
const courseValidator = require('../validators/index');
const validationErrorHandler = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const { param } = require('express-validator');

const router = express.Router();

// GET all courses (public)
router.get('/', courseController.getAllCourses);

// GET single course by ID (public)
router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid course ID format'),
  validationErrorHandler,
  courseController.getCourseById
);

// POST create course (protected)
router.post(
  '/',
  authMiddleware,
  courseValidator.validateCreateCourse,
  validationErrorHandler,
  courseController.createCourse
);

// PUT update course (protected)
router.put(
  '/:id',
  authMiddleware,
  param('id').isMongoId().withMessage('Invalid course ID format'),
  courseValidator.validateUpdateCourse,
  validationErrorHandler,
  courseController.updateCourse
);

// DELETE course (protected)
router.delete(
  '/:id',
  authMiddleware,
  param('id').isMongoId().withMessage('Invalid course ID format'),
  validationErrorHandler,
  courseController.deleteCourse
);

module.exports = router;

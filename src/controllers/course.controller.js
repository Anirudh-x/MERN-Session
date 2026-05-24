const mongoose = require('mongoose');
const Course = require('../models/course.model');

// GET all courses
getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json({
      success: true,
      data: courses,
      total: courses.length,
    });
  } catch (error) {
    next(error);
  }
};

// GET single course by ID
getCourseById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid course ID',
      });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found',
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

// POST create course
createCourse = async (req, res, next) => {
  try {
    const { title, description, instructor, category, level, price } = req.body;

    const course = new Course({
      title,
      description,
      instructor,
      category,
      level,
      price,
    });

    await course.save();
    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// PUT update course
updateCourse = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid course ID',
      });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found',
      });
    }

    res.json({
      success: true,
      data: course,
      message: 'Course updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// DELETE course
deleteCourse = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid course ID',
      });
    }

    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found',
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse
}
const Portfolio = require("../models/portfolio.model");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

// @descr   Get all portfolio
// @Route   GET /api/v1/portfolio
// @Access  Public
exports.getAllPortfolio = asyncHandler(async (req, res, next) => {
  const allPortfolio = await Portfolio.find();

  res.status(200).json({
    success: true,
    count: allPortfolio.length,
    data: allPortfolio.reverse(),
  });
});

// @descr   Get planet ById
// @Route   GET /api/v1/portfolio/:id
// @Access  Public
exports.getPortfolioById = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: portfolio,
  });
});

// @descr   Create portfolio
// @Route   GET /api/v1/portfolio
// @Access  Private
exports.createPortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.create({
    username: req.body.username,
    password: req.body.password,
    image: "uploads/" + req.file.filename,
  });

  res.status(201).json({
    success: "true",
    message: "Create Portfolio Successfully",
    data: portfolio,
  });
});

// @descr   Update portfolio
// @Route   PUT /api/v1/portfolio/:id
// @Access  Private
exports.updatePortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) {
    return next(new ErrorResponse("Post not found", 404));
  }
  fs.unlink(path.join(__dirname, "..", "public", portfolio.image), (err) => {
    if (err) {
      console.error("Error while deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
  const updatePortfolio = await Portfolio.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username || portfolio.username,
      password: req.body.password || portfolio.password,
      image: req.file ? "uploads/" + req.file.filename : portfolio.image,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: "true",
    message: "Update Portfolio Successfully",
    data: updatePortfolio,
  });
});

// @descr   Delete portfolio
// @Route   Delete /api/v1/portfolio/:id
// @Access  Private
exports.deletePortfolio = asyncHandler(async (req, res, next) => {
  const delData = await Portfolio.findByIdAndRemove(req.params.id);
  // const delData = await Portfolio.findById(req.params.id);
  if (!delData) {
    return next(new ErrorResponse("Post not found", 404));
  }
  fs.unlink(path.join(__dirname, "..", "public", delData.image), (err) => {
    if (err) {
      console.error("Error while deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });

  res.status(201).json({
    success: "true",
    message: "Delete Portfolio Successfully",
  });
});

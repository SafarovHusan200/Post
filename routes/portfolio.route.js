const { Router } = require("express");
const {
  getAllPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolio.controller");

const upload = require("../utils/fileUpload");

const router = Router();

router.get("/", getAllPortfolio);
router.post("/", upload.single("image"), createPortfolio);
router.get("/:id", getPortfolioById);
router.put("/:id", upload.single("image"), updatePortfolio);
router.delete("/:id", deletePortfolio);

module.exports = router;

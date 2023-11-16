import { Router } from "express"

import {
  getAllProducts,
  getProduct,
} from "../controllers/productsController.js"
import { productIdValidation } from "../validators/productValidator.js"
import { runValidation } from "../validators/runValidations.js"

const router = Router()

router.get("/", getAllProducts)

router.get("/:id", productIdValidation, runValidation, getProduct)

export default router

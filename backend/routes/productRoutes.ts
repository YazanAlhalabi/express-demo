import { Router } from "express"

import {
  getAllProducts,
  getProduct,
} from "../controllers/productsController.js"
import { productIdValidation } from "../schema/productValidator.js"
import { runValidation } from "../middlewares/newProductValidation.js"

const router = Router()

router.get("/", getAllProducts)

router.get("/:id", productIdValidation, runValidation, getProduct)

export default router

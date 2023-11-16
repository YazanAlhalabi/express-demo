import { check } from "express-validator"

export const productIdValidation = [
  check("id").isNumeric().withMessage("product id must be number"),
]

import { NextFunction, Request, Response } from "express"

const products = [
  { id: "1", title: "apple", price: 1234 },
  { id: "2", title: "apple II", price: 123 },
  { id: "2", title: "apple III", price: 123 },
  { id: "2", title: "Apple iPhone", price: 123 },
]

export const getAllProducts = (req: Request, res: Response) => {
  res.json({
    message: "All the products returned",
    payload: products,
  })
}

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
    const product = products.find((products) => products.id === id)
    if (!product) {
      const error = new Error("product is not found with this id...")
      //@ts-expect-error
      error.status = 404
      throw error
    }
    res.status(200).json({
      message: "single product found",
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}

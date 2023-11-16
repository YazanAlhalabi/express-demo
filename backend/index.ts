import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express"
import cors from "cors"
import morgan from "morgan"

import { dev } from "./config/environment.js"

//Routers
import productRoutes from "./routes/productRoutes.js"
const app = express()
const port = dev.app.port

app.use(cors())
app.use(morgan("dev"))

const books = [
  { id: 1, title: "intro to JS" },
  { id: 2, title: "intro to Node.js" },
  { id: 3, title: "How to build a robust system" },
]
// LOOKING FOR A MATCH ---> STARTS FROM HERE
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, from ExpressJS",
  })
})

app.get(
  "/books",
  (req, res, next) => {
    console.log("👀 HERE IS THE MIDDLEWARE NUMBER 1")
    next()
  },
  (req, res, next) => {
    console.log("👀 HERE IS THE MIDDLEWARE NUMBER 2")
    next()
  },
  (req, res, next) => {
    console.log("👀 HERE IS THE MIDDLEWARE NUMBER 3")
    next()
  },
  (req, res) => {
    console.log("👀 HERE IS THE CONTROLLER")
    // Some magic happens here
    // go to the database to get the data
    // send the response back

    res.status(200).json({ books })
  }
)

app.get("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId
  const book = books.find((book) => book.id === Number(bookId))

  if (!book) {
    res.status(404).json({ message: "Book not found", book: null })
    return
  }

  res.status(200).json({ message: "Book found", book })
})

app.use("/products", productRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: "This page was not found.  Would you like a cookie?",
  })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  })
})

app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port)
})

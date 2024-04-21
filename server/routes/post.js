import express from "express";
import { getOrders,addToCart, createPost, deletePost, getFromCart, getPost, getPosts, 
  order, removeFromCart, updatePost, getStore, getPostsByCategorie, getBySearch, addReview, updateReview, deleteReview } from "../controllers/post.js";
import { tokenChecker } from "../middlewares/tokenChecker.js";
import uploadFile from "../middlewares/uploadConf.js";
import { captureOrder, createOrder } from "../controllers/PaimentPaypal.js";

// __ router

const router = express.Router()

router.get('/page/:page', getPosts)
router.get('/page/:page/categorie/:categorie', getPostsByCategorie)
router.get('/page/:page/title/:title/categorie/:categorie/minPrice/:minPrice/maxPrice/:maxPrice', getBySearch)
// router.get('/page/:page/categorie/:categorie/title/:title/minPrice/:minPrice/maxPrice/:maxPrice', getPosts)
router.get('/store/:username',   getStore)
router.get('/get_from_cart',tokenChecker, getFromCart)
router.get('/get_orders',tokenChecker, getOrders)
// router.post('/order/:id',tokenChecker, order)
router.post('/add_to_cart/:id',tokenChecker, addToCart)
router.delete('/cart/:id', tokenChecker, removeFromCart);
router.post('/', tokenChecker, uploadFile, createPost);  // Change the order of middlewares
router.route("/:id")
.get(getPost)
.put(tokenChecker, uploadFile, updatePost)
.delete(tokenChecker, deletePost)
router.post('/review/add/:PostId',tokenChecker, addReview)
router.post('/review/update/:PostId',tokenChecker, updateReview)
router.post('/review/delete/:PostId',tokenChecker, deleteReview)

// Paypal payment

router.post("/api/orders", tokenChecker, async (req, res) => {
    try {
      // use the cart information passed from the front-end to calculate the order amount details
      const { cart } = req.body;
      const { jsonResponse, httpStatusCode } = await createOrder(cart);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
});

router.post("/api/orders/:orderID/capture", tokenChecker, async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      console.log("Paiment successfull for id: ",orderID);
      
      order( req.body.productId,
        req.body.firstName,
        req.body.lastName,
        req.body.phoneNumber,
        req.body.email,
        req.user.username)
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
});


export default router

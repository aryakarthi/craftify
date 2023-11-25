const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const { v4: uuidv4 } = require("uuid");

db.settings({ ignoreUndefinedProperties: true });

router.get("/", (req, res) => {
  return res.send("Product router");
});

router.post("/create", async (req, res) => {
  try {
    const dateObj = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const dateStr = dateObj.toLocaleString("en-US", options);
    const ms = Date.now();
    const data = {
      product_id: req.body.product_id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      product_description: req.body.product_description,
      imageURLs: req.body.imageURLs,
      reviews: req.body.reviews,
      added_by: req.body.added_by,
      added_at: dateStr,
    };

    const response = await db
      .collection("products")
      .doc(`/${req.body.product_id}/`)
      .set(data);
    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// getall the products
router.get("/all", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("products");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
});

// delete a product
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

router.post("/addUserReview/:product_id", async (req, res) => {
  const product_id = req.params.product_id;
  // console.log(product_id);
  const { userReview } = req.body;
  // console.log(userReview);
  if (!userReview) {
    return res
      .status(400)
      .send({ success: false, msg: "Missing reviews data" });
  }
  try {
    const productRef = db.collection("products").doc(product_id);
    const productDoc = await productRef.get();
    const existingReviews = productDoc.data().reviews || [];

    const updatedItem = await db
      .collection("products")
      .doc(`/${product_id}/`)
      .update({
        reviews: [...existingReviews, userReview],
      });
    // console.log(updatedItem);
    return res.status(200).send({ success: true, data: updatedItem });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, msg: `Error : ${error}` });
  }
});

// create a cart
router.post("/addToCart/:user_id/:size", async (req, res) => {
  const userId = req.params.user_id;
  const size = req.params.size;
  const productId = req.body.product_id;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}-${size}/`)
      .get();

    if (doc.data()?.size === size) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}-${size}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItem });
    } else {
      const data = {
        productId: productId,
        size: size,
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURLs: req.body.imageURLs,
        quantity: 1,
      };

      const addItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}-${size}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// get all the cartitems for that user
router.get("/getCartItems/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  (async () => {
    try {
      let query = db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");
      let response = [];

      await query.get().then((querysnap) => {
        let docs = querysnap.docs;

        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (er) {
      return res.send({ success: false, msg: `Error :,${er}` });
    }
  })();
});

// update cart to increase and decrease the quantity
router.post("/updateCart/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.query.productId;
  const type = req.query.type;
  const size = req.query.size;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}-${size}/`)
      .get();

    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}-${size}/`)
          .update({ quantity });
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        if (doc.data().quantity === 1) {
          await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}-${size}/`)
            .delete()
            .then((result) => {
              return res.status(200).send({ success: true, data: result });
            });
        } else {
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}-${size}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        }
      }
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// add to favourites
router.post("/addToFav/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.body.product_id;

  console.log(userId);
  console.log("addbody", req.body);

  try {
    const doc = await db
      .collection("favItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (!doc.data()) {
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURLs: req.body.imageURLs,
      };
      const addItems = await db
        .collection("favItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// get all the favitems for that user
router.get("/getFavItems/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  (async () => {
    try {
      let query = db
        .collection("favItems")
        .doc(`/${userId}/`)
        .collection("items");
      let response = [];

      await query.get().then((querysnap) => {
        let docs = querysnap.docs;

        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (er) {
      return res.send({ success: false, msg: `Error :,${er}` });
    }
  })();
});

// remove from favourites
router.delete("/removeFromFav/:user_id/:product_id", async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.params.product_id;
  console.log(userId);
  console.log(productId);

  try {
    const doc = await db
      .collection("favItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    console.log(doc);

    if (doc.exists) {
      await db
        .collection("favItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .delete();

      return res
        .status(200)
        .send({ success: true, msg: "Record deleted successfully" });
    } else {
      return res.status(404).send({ success: false, msg: "Record not found" });
    }
  } catch (err) {
    return res.status(500).send({ success: false, msg: `Error: ${err}` });
  }
});

// create new order
router.post("/neworder", async (req, res) => {
  try {
    const order_id = uuidv4();
    const data = {
      order_id: order_id,
      created_at: req.body.created_at,
      customer: req.body.customer,
      items: req.body.items,
      subTotal: req.body.subTotal,
      shipCharge: req.body.shipCharge,
      grandTotal: req.body.grandTotal,
      paymentMode: req.body.paymentMode,
      paymentStatus: req.body.paymentStatus,
      shippingDetails: req.body.shippingDetails,
      status: req.body.status,
    };

    const response = await db
      .collection("orders")
      .doc(`/${order_id}/`)
      .set(data);

    deleteCart(req.body.customer.user_id, req.body.items);

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

const deleteCart = async (userId, items) => {
  items.map(async (data) => {
    await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${data.productId}-${data.size}/`)
      .delete();
  });
};

// getall the orders
router.get("/allorders", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("orders");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
});

// update the order status
router.post("/updateOrderStatus/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  const status = req.query.status;

  try {
    const updatedItem = await db
      .collection("orders")
      .doc(`/${order_id}/`)
      .update({ status });
    return res.status(200).send({ success: true, data: updatedItem });
  } catch (error) {
    return res.send({ success: false, msg: `Error : ${error}` });
  }
});

// update the order payment status
router.post("/updatePayStatus/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  const paymentStatus = req.query.paymentStatus;

  try {
    const updatedItem = await db
      .collection("orders")
      .doc(`/${order_id}/`)
      .update({ paymentStatus });
    return res.status(200).send({ success: true, data: updatedItem });
  } catch (error) {
    return res.send({ success: false, msg: `Error : ${error}` });
  }
});

module.exports = router;

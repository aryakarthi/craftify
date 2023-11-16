const router = require("express").Router();
const admin = require("firebase-admin");
// let data = [];

router.get("/", (req, res) => {
  return res.send("User router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Token not found!" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // return res.status(200).send({ token });
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, message: "Unauthorized access!" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      message: `Error in extracting token : ${err}`,
    });
  }
});

const listAllUsers = async (nextPageToken) => {
  const data = []; // Declare the data array within the function scope

  try {
    const listUserResult = await admin.auth().listUsers(1000, nextPageToken);

    listUserResult.users.forEach((userRecord) => {
      data.push(userRecord.toJSON());
    });

    if (listUserResult.pageToken) {
      await listAllUsers(listUserResult.pageToken); // Await the recursive call
    }
  } catch (err) {
    console.error('Error listing users:', err);
  }

  return data; // Return the populated data array
};

// Usage example:
router.get('/all', async (req, res) => {
  try {
    const allUsersData = await listAllUsers();
    return res.status(200).send({ success: true, data: allUsersData, dataCount: allUsersData.length });
  } catch (err) {
    return res.status(500).send({ success: false, msg: `Error in listing users: ${err.message}` });
  }
});

module.exports = router;

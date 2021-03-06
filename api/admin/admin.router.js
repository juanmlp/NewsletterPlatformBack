var router = require("express").Router();
const jwt = require("jsonwebtoken");

var userController = require("./admin.controller");

function validAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send("No tienes autorización");
  }
  const token = req.headers.authorization;
  jwt.verify(token, process.env.TOKEN_PASSWORD, (err, data) => {
    if (err) {
      return res.status(403).send("Token invalido");
    } else {
      console.log(data);
      req.currentUser = data;
      next();
    }
  });
}

router.get("/", validAuth, userController.getAllAdmins);

router.get("/:id", validAuth, userController.getById);

router.patch("/:id", validAuth, userController.editPatch);

router.patch("/editself/:id", validAuth, userController.editSelf);

router.delete("/deleteSelf/:id", validAuth, userController.deleteSelfAdmin);

module.exports = router;

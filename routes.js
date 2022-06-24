const express = require("express");
const router = new express.Router();
const itemsList = require('./fakeDb');
const ExpressError = require("./expressError");

router.get("/", (req, res) => {
    return res.json(itemsList);
});

router.post("/", (req, res) => {
    const newItem = {
        name: req.body.name,
        price: req.body.price
    }
    itemsList.push(newItem);

    return res.json({"added": newItem});
});

router.get("/:name", (req, res) => {
    const foundItem = itemsList.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        else{
            return res.json(foundItem);
        }
});

router.patch("/:name", (req, res) => {
    const foundItem = itemsList.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
    
    foundItem.price = req.body.price
    res.json({"updated": foundItem})
});

router.delete("/:name", (req, res) => {
    const foundItem = itemsList.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError("Item not found", 404)
      }
      itemsList.splice(foundItem, 1);
      res.json({ message: "Deleted" })
});

module.exports = router;

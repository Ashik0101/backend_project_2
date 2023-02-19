const express = require("express");
const { BlogModel } = require("../Models/Blog.model");
const blogRouter = express.Router();
blogRouter.use(express.json());

//getting (get method)
blogRouter.get("/", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (err) {
    res.send("Some Error In Getting the Data!!1");
    console.log("some error occurred in fetching:", err);
  }
});

//creating (post method)
blogRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const data = new BlogModel(payload);
    await data.save();
    res.send({ msg: "blogs created and saved to db!!!" });
  } catch (err) {
    res.send("Some error in creating the blogs!!");
    console.log("some error in creating the blogs!!!", err);
  }
});

//updating with params(id)
blogRouter.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  try {
    const data = await BlogModel.find({ _id: id });
    if (data[0].userID != req.body.userID) {
      res.send({ msg: "You are not authorized to update this data!!!" });
    } else {
      await BlogModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: `Document having id ${id}, updated!!` });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong while updating.." });
    console.log("something wrong while deleting:", err);
  }
});

//deleting with params(delete)
blogRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const data = await BlogModel.find({ _id: id });
    if (data[0].userID != req.body.userID) {
      res.send({ msg: "You are not authorized to delete this data!!" });
    } else {
      await BlogModel.findByIdAndDelete({ _id: id });
      res.send({ msg: `Document having id ${id} got deleted!!!` });
    }
  } catch (err) {
    res.send({ msg: "something went wrong while deleting!!" });
    console.log("something went wrong while deleting :", err);
  }
});
module.exports = { blogRouter };

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open");

const url = cloudinary.url("pineapple", {
  transformation: [
    {
      variables: [
        ["$w", "800"],
        ["$ftile", "$w / 3"],
        ["$tile", "$ftile to i"],
      ],
    },
    {
      width: "$tile * 3",
      height: "$tile * 2",
      crop: "fill",
      quality: "auto",
    },
    
    {
      overlay: "banana",
      width: "$tile",
      crop: "fill",
      gravity: "auto",
      height: "$tile",
    },
    {
      flags: "layer_apply",
      gravity: "north_west",
      x: 0,
      y: 0,
    },
    {
      overlay: "oranges",
      width: "$tile",
      crop: "fill",
      gravity: "auto",
      height: "$tile",
    },
    {
      flags: "layer_apply",
      gravity: "north_west",
      x: "$tile",
      y: "0",
    },
    {
      overlay: "pineapple",
      width: "$tile",
      crop: "fill",
      gravity: "auto",
      height: "$tile",
    },
    {
      flags: "layer_apply",
      gravity: "north_west",
      x: "$tile * 2",
      y: "0",
    },


    {
      overlay: "apple",
      width: "$tile",
      crop: "fill",
      gravity: "auto",
      height: "$tile",
    },
    {
      flags: "layer_apply",
      gravity: "north_west",
      x: 0,
      y: "$tile",
    },
    {
      overlay: "blackberry",
      width: "$tile",
      crop: "fill",
      gravity: "auto",
      height: "$tile",
    },
    {
      flags: "layer_apply",
      gravity: "north_west",
      x: "$tile",
      y: "$tile",
    },
    {
      overlay: "pom",
      width: "$tile",
      crop: "fill",
      gravity: "auto",
      height: "$tile",
    },
    {
      flags: "layer_apply",
      gravity: "north_west",
      x: "$tile * 2",
      y: "$tile",
    },
  ],
});
open(url);


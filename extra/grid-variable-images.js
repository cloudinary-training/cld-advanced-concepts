require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open");

const url = cloudinary.url("1px", {
  transformation: [
    {
      variables: [
        ["$w", "800"],
        ["$ftile", "$w / 3"],
        ["$tile", "$ftile to i"],
        ["$img1", "!pineapple!"],
        ["$img2", "!apple!"],
        ["$img3", "!banana!"],
        ["$img4", "!oranges!"],
        ["$img5", "!blackberry!"],
        ["$img6", "!pom!"],
      ],
    },
    {
      width: "$tile * 3",
      height: "$tile * 2",
      crop: "fill",
      quality: "auto",
    },
    
    {
      overlay: "$img1",
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
      overlay: "$img2",
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
      overlay: "$img3",
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
      overlay: "$img4",
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
      overlay: "$img5",
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
      overlay: "$img6",
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


const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');
const fs = require('fs');

function base64ToPdf(base64String, outputFilePath) {
  const data = Buffer.from(base64String, 'base64');

  fs.writeFileSync(outputFilePath, data);
}




router.get('/TEST', async (req, res) => {
  // console.log(mssql.qurey())
  res.json("TEST");
})


router.post('/TESTpdf', async (req, res) => {
  //-------------------------------------
  console.log("--TESTpdf--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  if (input[`pdf`] != undefined && input[`order`] != undefined) {
    base64ToPdf(input[`pdf`], `${input[`order`]}.pdf`);
  }
  //-------------------------------------
  res.json(input);
});



module.exports = router;

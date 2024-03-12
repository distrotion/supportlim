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

router.post('/autosaveSAR', async (req, res) => {
  //-------------------------------------
  console.log("--TESTpdf--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = `NOK`
  if (input[`ReqNo`] != undefined) {
    
    let resp = await axios.post('http://172.23.10.51:3002/KACReportData_LoadReport', {
      "ReqNo":`${input[`ReqNo`]}`,
    });
    // return resp.data;
    // console.log(resp.data);
    if (resp.status == 200) {

      if(`${resp.data}` !=`{}`){
        base64ToPdf(resp.data, `C:\\Users\\Administrator\\Desktop\\SARAUTOSAVE\\${input[`ReqNo`]}.pdf`);
        output = 'OK'
      }

    
    }
  }
  //-------------------------------------
  res.json(output);
});



module.exports = router;

const express = require("express"),
  router = express.Router();
const { exec } = require("child_process");

let subjects = [];

const log4js = require("../../src/log4js");

//init log
const logger = log4js.init("console"); //console/file

router.post("/bot", async function (req, res) {
  logger.debug("Processing bot");
  const data = req.body;
  //logger.debug(data);
  if (data.category ==''){
    res.json({ "result":"no-data" });
  }
  else {
    subjects.push(data)
  }
  // console.log(subjects)
  res.json({ "result":"ok" });
});

router.post("/bot2", async function (req, res) {
  logger.debug("Processing bot2");
  columnsObj = {}
  columns = []
  data = []
  //results=results[0]
  
  //identify all the keys
  for (i = 0; i < subjects.length; i++) {
    for (const key in subjects[i]){ 
      columnsObj[key] = true
    }
  }

  columns = Object.keys(columnsObj);
  
  obj={}
  for (i = 0; i < subjects.length; i++) {
    obj={}
    for (k = 0; k < columns.length; k++) {
        columnName = columns[k]
        value = subjects[i][columnName]
        obj[columnName] = value ==undefined ? '' : value
    }
    data.push(obj)
  }

  console.log(data)
  
  const converter = require('json-2-csv');
  const fs = require('fs');

  converter.json2csv(data, (err, csv) => {
      if (err) {
          throw err;
      }

      // print CSV string
      // console.log(csv);

      // write CSV to a file
      fs.writeFileSync('TLV_summary.csv', csv);
      
  });

  res.json({ "result":"ok" });
});

module.exports = router;

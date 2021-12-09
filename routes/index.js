const express = require('express');
const router = express.Router();
const Controller = require("../controller/index")
const connection = require('../connection/db_connection')
router.get('/', function(req, res, next) {
  res.render('index')
});
/* GET home page. */
router.get('/getData', (req, res )=> {
  const  result= Controller.getAllPost();
  result.then(data => res.json({data : data}))
      .catch(err => console.log(err));
})
//router -> controller -> service -> db || api
module.exports = router;


var express = require('express');
var router = express.Router();
var db=require('../db')

router.get('/', function(req, res, next) {

  var query = 'select * from USERS';
  db.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    /*If you are creating api then get response in json format*/
    //res.json(rows);

    /*If you want response as json then comment below line*/
    res.render('products', { title: 'CRUD', products: rows});
  })
});

router.get('/create-form', function(req, res, next) {
  res.render('createform', {title: 'Create Product'});
});

router.post('/create', function(req, res, next) {
  var ID= req.body.ID;
  var INAME= req.body.INAME;
  var EMAIL= req.body.EMAIL;
  var PRICE= req.body.PRICE;

  var sql = `INSERT INTO USERS (ID, INAME, EMAIL,PRICE) VALUES ("${ID}", "${INAME}", "${EMAIL}","${PRICE}")`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('/products');
  });
});


router.get('/edit-form/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM USERS WHERE id=${id}`;
  db.query(sql, function(err, rows, fields) {
      res.render('editform', {title: 'Edit Product', product: rows[0]});
  });
});

router.post('/edit/:id', function(req, res, next) {
  var INAME= req.body.INAME;
  var EMAIL= req.body.EMAIL;
  var PRICE= req.body.PRICE;
  var id = req.params.id;
  var sql = `UPDATE USERS SET INAME="${INAME}", EMAIL="${EMAIL}", PRICE="${PRICE}" WHERE id=${id}`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record updated!');
    res.redirect('/products');
  });
});

/*delete product*/
router.get('/delete/:ID', function(req, res){
  var ID = req.params.ID;
  console.log(ID);
  var sql = `DELETE FROM USERS WHERE ID=${ID}`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record deleted!');
    res.redirect('/products');
  });
});

module.exports = router;


const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')

// Do work here
router.get('/', storeController.myMiddleware, storeController.homePage);

// bodyparser test
router.post('/', (req, res) => {
  // res.send('Hey! It works!');
  // res.query is get params
  res.json(req.body);
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/getData', function(req, res) {
	res.json({});
});


router.post('/setData', function(req, res) {
	res.json({});
});

module.exports = router;
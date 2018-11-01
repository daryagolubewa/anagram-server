var express = require('express');
var router = express.Router();
let wordArr = require('./../models/index');
let word = '';
let anagramsList = [];


router.get('/', function(req, res) {
    res.render('index', {list: anagramsList});
    console.log(anagramsList);
});

router.post('/', async function(req, res) {
    word = await req.param('put_a_word');
    let wordList = await wordArr.words.create({});
    let anagrams =  await wordList.findAnagrams(word);
    anagrams.map(x => anagramsList.push(x.value));
    res.redirect('/');

});


module.exports = router;


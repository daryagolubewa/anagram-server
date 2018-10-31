'use strict';

module.exports = (sequelize, DataTypes) => {
    const Op = sequelize.Op;
  const Word = sequelize.define('words', {
    value: DataTypes.STRING
  }, {});

  Word.associate = function(models) {
    // associations can be defined here
  };

  Word.prototype.findAnagrams = async (word) => {
      let wrdLength =  '';
      let anagramsList = [];
      for (let i = 0; i < word.length; i++) {
          wrdLength += '_';
      }

    let wordsArr = await Word.findAll({
        where: {
            value: {
                [Op.like]: wrdLength
            }
        }
    });

    for (let i = 0; i < wordsArr.length; i++) {
        if(wordsArr[i].value.toLowerCase().split('').sort().join('') === word.toLowerCase().split('').sort().join('')) {
            anagramsList.push(wordsArr[i]);
        };
    }

    return anagramsList;


  };



  return Word;
};
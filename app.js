'use strict';
// ali's first ever node code
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const c = Number(a) + Number(b);
  res.send(`The sum of ${Number(a)} and ${Number(b)} is ${c}`);
});

// andre's first node code
app.get('/cipher', (req, res) => {
  const text = req.query.text.toUpperCase();
  const textArr = text.split('');
  const shift = req.query.shift;

  for(let i = 0; i < textArr.length; i++) {
    let charCode = textArr[i].charCodeAt(0);
    textArr[i] = String.fromCharCode(((charCode + Number(shift) - 65) % 26) + 65);
  }

  let newText = textArr.join('');
  res.send(newText);
});

app.get('/lotto', (req, res) => {
  const { arr } = req.query;
  const lotto = [0, 0, 0, 0, 0, 0]
    .map(i => Math.floor(Math.random() * 20) + 1);
  let matches = 0;
  arr.forEach(i => lotto.includes(Number(i)) ? matches++ : console.log('Not a match'));
  let lottoMessage = (matches < 4) ? 'Sorry, you lose' : ((matches === 4) ? 'Congratulations, you win a free ticket' :  ((matches ===5) ? 'Congratulations! You win $100!' : 'Wow! Unbelievable! You could have won the mega millions!'))
  res.send(lottoMessage);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

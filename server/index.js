import _ from 'lodash';
import { Router } from 'express';
import Seedrandom from 'seedrandom';

import Users from './users/index.js';
import Util from './util/index.js';

const CURRENCIES = ['BTC', 'GBP', 'EUR', 'JPY', 'USD'];
const DRINKS = ['coffee', 'orange juice', 'soda', 'tea', 'water'];
const FOODS = ['hamburgers', 'hot dogs', 'pasta', 'pizza', 'salad'];

// Build a basic express app
const router = Router();

// Keep a list of payment ids that have been used
const paymentIds = {};


// Endpoint to get randomly generated payments
router.get('/payments', (req, res) => {
  // Seed a PRNG to use to generate all of the random data. Seed it from the seconds
  // since the epoch, so that if multiple requests are made within the same clock second,
  // they'll get the same data.  After this PRNG is generated, it's very important that all random
  // data be generated from it.  Then regenerate the date object to be based on seconds
  // so that it stays consistent amongst requests within the same second.
  const nowMS = new Date();
  const epochSeconds = Math.round(nowMS.getTime() / 1000);
  const prng = new Seedrandom(epochSeconds);
  const now = new Date(epochSeconds * 1000);

  // Build random data
  const users = Users.pickUsers(prng);
  const food = Util.seededSample(prng, FOODS);
  const drink = Util.seededSample(prng, DRINKS);

  res.json({
    data: {
      id: Math.round(prng.quick() * 1e16).toString(),
      date: now.toISOString(),
      sender: users[0],
      receiver: users[1],
      amount: Util.seededRange(prng, 0, 1e4, 2).toString(),
      currency: Util.seededSample(prng, CURRENCIES),
      memo: `${food} and ${drink}`,
    },
  });
});

// Endpoint to create a new payment
router.post('/payments', (req, res) => {
  // No need to store this payment, just check if it's correctly formatted, and then randomly choose
  // whether to return success or failure.  Its not necessary to keep the same behavior within the same second; it's
  // all random.

  // Make sure it's correctly formatted, just do simple type validation.
  const payment = req.body;
  if (!_.isString(payment.id)) {
    return res.status(400).json({ error: 'Incorrectly formatted id' });
  }

  if (paymentIds[payment.id]) {
    console.log(`You retried the same payment id '${payment.id}'`);
    return res.status(409).send({ error: 'That payment id has already been used!' });
  }

  if (!Date.parse(payment.date)) {
    return res.status(400).send({ error: 'Incorrectly formatted date' });
  }

  if (!Users.isValidUser(payment.sender)) {
    return res.status(400).send({ error: 'Incorrectly formatted sender' });
  }

  if (!Users.isValidUser(payment.receiver)) {
    return res.status(400).send({ error: 'Incorrectly formatted receiver' });
  }

  if (payment.sender.id === payment.receiver.id) {
    return res.status(400).send({ error: 'The sender and receiver must be different' });
  }

  if (!_.isString(payment.amount) || !_.isNumber(parseFloat(payment.amount))) {
    return res.status(400).send({ error: 'Incorrectly formatted amount' });
  }

  if (!CURRENCIES.includes(payment.currency)) {
    return res.status(400).send({ error: 'Incorrect formatted currency' });
  }

  // No validation on the memo
  console.log('in post payment')
  // Randomly decide if the payment succeeds or fails.
  if (Math.random() < 0.5) {
    console.log(`Payment with id '${payment.id}' failed!  Please try again later.`);
    return res.status(503).send();
  } else {
    // Record that the payment id has been used.
    paymentIds[payment.id] = true;
    console.log(`Payment succeeded: ${JSON.stringify(payment)}`);
    return res.status(201).send();
  }
});

// Endpoint to return a list of all users
router.get('/users', (req, res) => {
  res.json({
    data: Users.getAllUsers(),
  });
});

export default router
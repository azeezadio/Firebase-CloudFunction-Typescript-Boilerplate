import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import AppError from './../utils/error/app.error';
import { SuccessResponse } from '../utils/response.util';
import * as firebaseAccountCredentials from '../credentials/boilerplate-c5b53-firebase-adminsdk-en39o-3320e7aa81.json';
import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
const app = express();
app.use(cors({ origin: true }));
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/store/transaction', async (req, res) => {
  console.log('request body==>', req.body);
  try {
    const db = admin.firestore();
    const { transaction } = req.body;

    db.collection('Transactions').add(transaction);

    return res.send(
      SuccessResponse('Transaction stored Sucessfully', transaction)
    );
  } catch (error) {
    console.log(error);

    if (error instanceof AppError) throw error;
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'We are unable to process your request'
    );
  }
});

exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection('messages')
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.eriplatform = functions.https.onRequest(app);

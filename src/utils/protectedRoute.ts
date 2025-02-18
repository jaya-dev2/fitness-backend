import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  })
})

export const validateFirebaseIdToken = async (req: Request, res: Response, next: NextFunction) => {
  functions.logger.log('Check if request is authorized with Firebase ID token');
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    functions.logger.log('Found "Authorization" header');
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    functions.logger.log('Found "__session" cookie');
    idToken = req.cookies.__session;
  } else {
    res.status(403).send('Unauthorized');
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    functions.logger.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    functions.logger.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
    return;
  }
};

export const sendNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, body, token } = req.body;
  try {
    const message: admin.messaging.Message = {
      notification: {
        title,
        body: body,
      },
      data: {
        id: '1',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
      token: token,
    };

    await admin.messaging().send(message);

    console.log('Notification sent successfully!');
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Error sending notification');
  }
};

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}


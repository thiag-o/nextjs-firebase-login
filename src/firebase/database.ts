import { getFirestore } from 'firebase/firestore';
import { app } from './app';

export const database = getFirestore(app);

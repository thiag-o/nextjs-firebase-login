import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, AuthError } from 'firebase/auth';

import { UserInterface } from '@/types/user.interface';
import { auth } from '@/firebase/authenticate';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { database } from '@/firebase/database';
import { setCookie, deleteCookie } from 'cookies-next';

export async function createUser(user: UserInterface): Promise<UserInterface> {
  try {
    const createData = await createUserWithEmailAndPassword(auth, user.email, user.password!);

    const uid = createData.user.uid;

    await setDoc(doc(database, 'users', uid), {
      email: user.email,
      name: user.name,
    });

    return await signIn(user.email, user.password!);
  } catch (e) {
    const error = e as AuthError;
    console.log(error);
    throw e;
  }
}

export async function signIn(email: string, password: string): Promise<UserInterface> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setCookie('auth-token', result.user.refreshToken);
    setCookie('user-id', result.user.uid);
    const userData = await getUserData(result.user.uid);
    if (!userData) throw new Error();
    return {
      id: result.user.uid,
      email: userData.email,
      name: userData.name,
    } as UserInterface;
  } catch (e) {
    throw e;
  }
}

export async function getUserData(uid: string): Promise<UserInterface> {
  try {
    const docUser = await getDoc(doc(database, 'users', uid));
    if (!docUser.exists()) throw new Error();
    return docUser.data() as UserInterface;
  } catch (e) {
    throw e;
  }
}
export async function signOut(): Promise<void> {
  try {
    deleteCookie('auth-token');
    deleteCookie('user-id');
    await firebaseSignOut(auth);
  } catch (e) {
    throw e;
  }
}

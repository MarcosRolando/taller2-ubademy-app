import { getApps, initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp, push, getDatabase, ref as dbRef, off, onChildAdded } from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
import { getStorage, getDownloadURL, ref as stoRef, uploadBytes } from "firebase/storage";


export class Fire {
  app: any;

  constructor() {
    this.init();
  }

  init = () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyArPPUfADD66LcZiH6_xFMltsJ7qB4BvGw",
      authDomain: "ubademy-ee2aa.firebaseapp.com",
      databaseURL: "https://ubademy-ee2aa-default-rtdb.firebaseio.com",
      projectId: "ubademy-ee2aa",
      storageBucket: "ubademy-ee2aa.appspot.com",
      messagingSenderId: "252066049243",
      appId: "1:252066049243:web:e49b3b02fc3f5d5b6670fe",
      measurementId: "G-YKTHQBDKSD"
    };
    // Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
    if (!getApps().length) {
      this.app = initializeApp(firebaseConfig);
    } else {
      this.app = getApps()[0];
    }
  }

  login = (email: string, password: string) => {
    return signInWithEmailAndPassword(getAuth(this.app), email, password);
  }

  register = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(getAuth(this.app), email, password);
  }

  send = (messages: any, path: string) => {
    messages.forEach((message: any) => {
      const db_message = {
        text: message.text,
        timestamp: serverTimestamp(),
        user: message.user
      };
      push(this.getDbRef(`chats/${path}`), db_message);
    })
  }

  parseMessage = (message: any) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user
    }
  }

  parseChat = (chat: any) => {
    const { chat_id, other_user_email, other_user_avatar } = chat.val();
    const { key: id } = chat;

    return {
      id,
      chat_id,
      other_user_email,
      other_user_avatar
    }
  }

  getUserChats = (callback: any) => {
    onChildAdded(this.getDbRef(`users/${this.uid}`), snapshot => callback(this.parseChat(snapshot)));
  }

  getMessages = (callback: any, path: string) => {
    onChildAdded(this.getDbRef(`chats/${path}`), snapshot => callback(this.parseMessage(snapshot)));
  }

  off(path: string) {
    off(this.getDbRef(`chats/${path}`));
  }

  getDbRef(path: string) {
    return dbRef(getDatabase(this.app), path);
  }

  get uid() {
    return getAuth(this.app).currentUser?.uid;
  }

  uploadMedia = async (uri: string, path: string) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = stoRef(getStorage(this.app), `${path}/${uri.replace(/^.*[\\\/]/, '')}`);
    
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    // @ts-ignore
    blob.close();

    return await getDownloadURL(fileRef);
  }

}

export default new Fire();

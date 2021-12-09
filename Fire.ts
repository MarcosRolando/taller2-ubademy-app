import { getApps, initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, signInWithCustomToken,
GoogleAuthProvider } from "firebase/auth";
import { serverTimestamp, push, getDatabase, ref as dbRef, off, onChildAdded, get, child } from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
import { getStorage, getDownloadURL, ref as stoRef, uploadBytes } from "firebase/storage";
import { getUserProfilePicture } from './src/userProfile';

const googleProvider = new GoogleAuthProvider();

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

  sendMessages = (messages: Array<any>, path: string) => {
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
      chatId: chat_id,
      otherUserEmail: other_user_email,
      otherUserAvatar: other_user_avatar
    }
  }

  getUserChats = (callback: any) => {
    onChildAdded(this.getDbRef(`users/${this.serializedEmail}`), snapshot => callback(this.parseChat(snapshot)));
  }

  getMessages = (callback: any, chatId: string) => {
    onChildAdded(this.getDbRef(`chats/${chatId}`), snapshot => callback(this.parseMessage(snapshot)));
  }

  getOrCreateChat = async (otherUserEmail: string, otherUserAvatar: string) => {
    const snapshot = await get(child(this.getDbRef('users'), this.serializedEmail)); // TODO try catch por si hay un error
    const user_chats = snapshot.val();
    let chatId = undefined;
    for (const chat in user_chats) {
      if (user_chats[chat].other_user_email === otherUserEmail) {
        chatId = user_chats[chat].chat_id;
        break;
      }
    }
    // If there was not a previous chat then create it
    if (chatId === undefined) {
      const otherUserEmailSerialized = this.serializeEmail(String(otherUserEmail));
      chatId = push(this.getDbRef('chats/')).key;
      const userChat = {
        chat_id: chatId,
        other_user_email: otherUserEmail,
        other_user_avatar: otherUserAvatar
      };
      push(this.getDbRef(`users/${this.serializedEmail}`), userChat);
      const otherUserChat = {
        chat_id: chatId,
        other_user_email: getAuth(this.app).currentUser?.email,
        other_user_avatar: getUserProfilePicture()
      }
      push(this.getDbRef(`users/${otherUserEmailSerialized}`), otherUserChat);
    }
    return chatId;
  }

  chatOff(chatId: string) {
    off(this.getDbRef(`chats/${chatId}`));
  }

  chatsOff() {
    off(this.getDbRef(`users/${this.serializedEmail}`));
  }

  getDbRef(path: string) {
    return dbRef(getDatabase(this.app), path);
  }

  get serializedEmail() {
    const email = String(getAuth(this.app).currentUser?.email);
    return this.serializeEmail(email);
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

  // Removes the dots from an email, replacing them with an underscore
  private serializeEmail = (email: String) => {
    return email.replace(/\./g, '?');
  }
}

export default new Fire();

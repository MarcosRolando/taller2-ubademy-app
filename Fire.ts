import { getApps, initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { signInAnonymously, onAuthStateChanged, getAuth } from "firebase/auth";
import { serverTimestamp, push, getDatabase, ref as dbRef, off, onChildAdded } from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
import { getStorage, getDownloadURL, ref as stoRef, uploadBytes } from "firebase/storage";


export class Fire {
  app: any;

  constructor() {
    this.init();
    //this.checkAuth();
    this.login();
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

  login = () => {

  }

  checkAuth = () => {
    onAuthStateChanged(getAuth(this.app), user => {
      if (!user) {
        signInAnonymously(this.app);
      }
    });
  }

  send = (messages: any) => {
    messages.forEach((item: any) => {
      const message = {
        text: item.text,
        timestamp: serverTimestamp(),
        user: item.user
      }
      push(this.db, message);
    })
  }

  parse = (message: any) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp)

    return {
      _id,
      createdAt,
      text,
      user
    }
  }

  get = (callback: any) => {
    onChildAdded(this.db, snapshot => callback(this.parse(snapshot)))
  }

  off() {
    off(this.db);
  }

  get db() {
    return dbRef(getDatabase(this.app), "messages");
  }

  get uid() {
    return (getAuth(this.app).currentUser || {}).uid; 
  }

  async uploadMedia(uri: string, path: string) {
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

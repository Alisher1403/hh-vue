import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHokgquxmItfmbwbqpuBBcFXeo6-yNCNw",
  authDomain: "constant-5eaa7.firebaseapp.com",
  projectId: "constant-5eaa7",
  storageBucket: "constant-5eaa7.appspot.com",
  messagingSenderId: "999286602625",
  appId: "1:999286602625:web:802751fcd3e2ac81e28680",
  measurementId: "G-HKNWWNGYP3",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export class useFetch {
  public async get(collectionName: string, id?: string): Promise<Array<any> | any> {
    if (id) {
      const docRef = doc(db, id);
      getDoc(docRef).then((data) => {
        console.log(data);
      });
    } else {
      const colRef = collection(db, collectionName);
      return getDocs(colRef).then((snapshot: any) => {
        const arr: any[] = [];
        snapshot.docs.forEach((item: any) => {
          arr.push({ id: item.id, ...item.data() });
        });
        return arr;
      });
    }
  }
}

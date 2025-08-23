//sharks\src\app\utils\firebaseConfig.js

// Importa funções do Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Adicione esta linha

// Configuração gerada no console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzyXMcdFpZaIMXK-C-N3iQAIQIwGLUro0",
  authDomain: "sharks-technology.firebaseapp.com",
  projectId: "sharks-technology",
  storageBucket: "sharks-technology.appspot.com",
  messagingSenderId: "677974278421",
  appId: "1:677974278421:web:d1c20d92151ae1089fa91c",
  measurementId: "G-JQ70HGQ79G"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app); // Adicione esta linha

// Analytics só funciona no navegador, não no servidor
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Exporte também o db
export { app, analytics, db };
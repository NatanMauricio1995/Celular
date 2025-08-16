// Importa funções do Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Configuração gerada no console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzyXMcdFpZaIMXK-C-N3iQAIQIwGLUro0",
  authDomain: "sharks-technology.firebaseapp.com",
  projectId: "sharks-technology",
  storageBucket: "sharks-technology.appspot.com", // corrigido
  messagingSenderId: "677974278421",
  appId: "1:677974278421:web:d1c20d92151ae1089fa91c",
  measurementId: "G-JQ70HGQ79G"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Analytics só funciona no navegador, não no servidor
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };

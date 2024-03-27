import  firebase from "firebase/compat/app";
import  "firebase/compat/auth";
import firebaseKey from "../../config/firebaseKey.json";

firebase.initializeApp(firebaseKey);
export const auth = firebase.auth(); // firebase의 auth 모듈을 사용하기 위해 auth 변수에 할당

export const signInGoogle= () => {
  const provider = new firebase.auth.GoogleAuthProvider(); // 구글 로그인을 위한 provider 설정
  return auth.signInWithPopup(provider); // 팝업창 띄워서 로그인
}

export const signOut = () => {
  console.log("signOut"); // console에 signOut 출력
  return auth.signOut();
}

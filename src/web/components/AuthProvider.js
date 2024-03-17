import React, { useEffect, useState } from "react";
import { auth } from "../routes/firebaseAuth";
import RegisterForm from "./RegisterForm";
import { defaultHeaders } from "../../config/clientConfig";

export const UserContext = React.createContext( null ); // UserContext 생성
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user 상태를 관리하기 위해 useState를 사용하여 user 변수와 setUser 함수를 생성
  const [registerFormOpen, setRegisterFormOpen] = useState(false); // registerFormOpen 상태를 관리하기 위해 useState를 사용하여 registerFormOpen 변수와 setRegisterFormOpen 함수를 생성

  useEffect(() => { // useEffect를 사용하여 user의 상태 변화를 감지
    auth.onAuthStateChanged(async (firebaseUser) => { 
      if(firebaseUser) { // firebaseUser가 존재하면
        const token = await firebaseUser.getIdToken(); // firebaseUser의 토큰을 가져와서 token 변수에 할당
        defaultHeaders.Authorization = `Bearer ${token}`; // defaultHeaders의 Authorization에 token을 넣어줌
        const res = await fetch("/api/v1/member/info", {
          method: "GET",
          headers: defaultHeaders,
        });
        if(res.status === 200) {
          const user = await res.json(); // res의 json을 user 변수에 할당
          setUser(user); // setUser 함수를 사용하여 user 상태를 user로 변경
        } else if (res.status === 401) {
          const data = await res.json();
          if(data.code === "USER_NOT_FOUND") {
            setRegisterFormOpen(true); // setRegisterFormOpen 함수를 사용하여 registerFormOpen 상태를 true로 변경
          } 
        } 
      } else {
        delete defaultHeaders.Authorizations; // defaultHeaders의 Authorization을 삭제
        setUser(null);
      } 
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}> // UserContext.Provider를 사용하여 user와 setUser를 value로 넘겨줌
      {(registerFormOpen) ? // registerFormOpen이 true이면 RegisterForm을, 아니면 children을 렌더링
        (<RegisterForm setRegisterFormOpen={setRegisterFormOpen} />) :
        (children)
      }
    </UserContext.Provider>
  );
};
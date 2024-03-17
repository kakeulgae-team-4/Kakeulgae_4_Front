import { useContext } from "react";
import { UserContext } from "./AuthProvider";
import { defaultHeaders } from "../../config/clientConfig";

const RegisterForm =  ({ setRegisterFormOpen }) => { 
  const { setUser } = useContext(UserContext); // UserContext에서 setUser를 가져옴
  
  const handleSubmit = async (event) => { // form을 submit할 때 실행되는 함수
    event.preventDefault(); // 기본 이벤트를 막음
    console.log(`nickname :${event.target.nickname.value}`);
    const res =  await fetch("/api/v1/auth/register/google", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({
        idToken: event.target.idToken.value,
        nickname: event.target.nickname.value,

      }),
    });
    const user = await res.json();
    console.log(`post /users ${JSON.stringify(user)}`);
    setRegisterFormOpen(false);
    setUser(user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className='nickname'>
             Enter your nickname
        </label>
        <input className='nickname' type="text" name="nickname" />
        
        <input className='signup' type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default RegisterForm;
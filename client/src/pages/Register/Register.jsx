import { useRef } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const userNameValue = userNameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !userNameValue ||
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("please provide all req...");
    }

    try {
      await axios.post("/users/register", {
        userName: userNameValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("register succ...");
      navigate("/login");
    } catch (error) {
      alert("catch error...");

      console.log(error.response);
    }
  }

  return (
    <section className="register">
      <h4 className="join">Join the Network</h4>
      <p className="already">
        Already have an account?<a href="/login">Sign in</a>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input ref={userNameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <input ref={firstNameDom} type="text" placeholder="First Name" />
        </div>
        <br />
        <div>
          <input ref={lastNameDom} type="text" placeholder="Last Name" />
        </div>
        <br />
        <div>
          <input ref={emailDom} type="email" placeholder="Email" />
        </div>
        <br />
        <div>
          <input ref={passwordDom} type="password" placeholder="Password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;

import React, { useState } from "react";
import "./styles.css";
import Input from "../input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  

  async function createDoc(user) {
    // make sure doc with uid doesn't exist
    // create a doc
    setLoading(true);

    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("user document created successfully");
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.info("user document already exists");
      setLoading(false);
    }
  }

  function signupWithEmail() {
    setLoading(true);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        console.log("Signing up with email and password");
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // signed in
            toast.success("Signed up successfully");
            const user = userCredential.user;
            console.log(user);

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setLoading(false);

            // create a document for user with generated id
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            toast.error(error.message);
            setLoading(false);
          });
      } else {
        toast.error("Passwords do not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  }

function signupWithGoogle(){
  setLoading(true);
  try{
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    createDoc(user);
    setLoading(false);
    navigate("/dashboard");
    toast.success("Logged in successfully");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    toast.error(errorMessage);
    setLoading(false);
    // ...
  });
  }
  catch(error){
    toast.error(error.message);
    setLoading(false);}

}

function loginWithEmail(e) {
  setLoading(true);     // <-- ADD THIS

  if (email != "" && password != "") {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("User Logged in successfully");
        setLoading(false);   // <-- ADD THIS
        navigate("/dashboard"); // optional
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);   // <-- ADD THIS
      });
  } else {
    toast.error("All fields are required");
    setLoading(false);       // <-- ADD THIS
  }
}



  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            {" "}
            Login on{" "}
            <span style={{ color: "var(--theme)" }}>FinTrack</span>{" "}
          </h2>
          <form>
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"@example.com"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              type="password"
              placeholder={"***************"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={signupWithGoogle}
              text={loading ? "Loading..." : "Login with Google"}
              blue={true}
            />
            <p
              className="p-login p-cursorClass"
              onClick={() => setLoginForm(!loginForm)}
            >
              Don't have an account? Click here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            {" "}
            Sign Up on{" "}
            <span style={{ color: "var(--theme)" }}>FinTrack</span>{" "}
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Your Name"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"@example.com"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              type="password"
              placeholder={"***************"}
            />
            <Input
              label={"Confirm Password"}
              state={confirmPassword}
              type="password"
              setState={setConfirmPassword}
              placeholder={"***************"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Sign up using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={signupWithGoogle}
              text={loading ? "Loading..." : "Sign up with Google"}
              blue={true}
            />
            <p
              className="p-login p-cursorClass"
              onClick={() => setLoginForm(!loginForm)}
            >
              Already Have an account? Click here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSignin;

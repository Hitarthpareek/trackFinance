import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userIcon from "../../assets/user.svg"

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const Navigate = useNavigate();

  useEffect(() => {
    if (user) {
      Navigate("/dashboard");
    }

    return () => {};
  }, [user, loading]);

  function logoutFnc() {
    try {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logout successful");
          Navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error("Logout failed");
        });
    } catch (e) {
      toast.error("Logout failed");
    }
  }
  return (
    <div className="navbar">
      <p className="logo">FinTrack.</p>
     {user &&
      <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
        <img src={user.photoURL?user.photoURL:userIcon} alt="" style={{borderRadius:"50%", height:"2rem", width:"2rem"}}/>
        <p className="logo link" onClick={logoutFnc}>
        Logout
      </p>
      
      </div>     
}
    </div>
  );
};

export default Header;

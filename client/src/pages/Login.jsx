import React, { useEffect, useState } from "react";
import { loginBg, logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { btnClick } from "../animations";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebaseConfig";
import { validateUserJWTToken } from "../api";

import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../app/slices/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();
  const user = useSelector((data) => data.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPwd = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      toast.error("Required fields shouldn't be empty!");
    } else {
      if (password === confirmPassword) {
        setUserEmail("");
        setPassword("");
        setConfirmPassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        toast.error("Pasword doesn't match!");
      }
    }
  };

  const signInWithEmailPwd = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      toast.error("Pasword doesn't match!");
    }
  };

  const gotoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        src={loginBg}
        alt=""
        className="w-full h-full absolute object-cover top-0 left-0"
      />
      <div className="flex flex-col items-center bg-lightOverlay w-full md:w-460 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-4">
        <div
          className="flex items-center justify-center gap-4 w-full hover:cursor-pointer"
          onClick={gotoHome}
        >
          <img src={logo} alt="" className="w-16 rounded-full" />

          <h3 className="text-red-500 font-semibold text-2xl relative mb-2">
            SARAH
            <span className="after:content-['CREATIONS'] after:absolute after:-bottom-4 after:left-0 text-[15px] text-black font-semibold"></span>
          </h3>
        </div>
        <p className="text-2xl font-semibold text-headingColor">
          {isSignUp ? "Join with us!" : "Welcome back!"}
        </p>

        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputFunction={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeHolder={"Password"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputFunction={setPassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm Password"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={confirmPassword}
              inputFunction={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn't have an account?{" "}
              <motion.button
                {...btnClick}
                className="text-red-500 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Sign-up
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <motion.button
                {...btnClick}
                className="text-red-500 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign-in
              </motion.button>
            </p>
          )}

          {isSignUp ? (
            <motion.button
              {...btnClick}
              className="w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-150"
              onClick={signUpWithEmailPwd}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...btnClick}
              className="w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-150"
              onClick={signInWithEmailPwd}
            >
              Sign In
            </motion.button>
          )}
        </div>

        {!isSignUp && (
          <>
            <div className="flex items-center justify-between gap-6 md:gap-10">
              <span className="w-24 h-[1px] rounded-md bg-white"></span>
              <span className="text-white">or</span>
              <span className="w-24 h-[1px] rounded-md bg-white"></span>
            </div>

            <motion.div
              {...btnClick}
              className="flex items-center justify-center px-10 md:px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
              onClick={loginWithGoogle}
            >
              <FcGoogle className="text-3xl" />
              <p className="capitalizentext-base text-headingColor">
                Sign-in with Google
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

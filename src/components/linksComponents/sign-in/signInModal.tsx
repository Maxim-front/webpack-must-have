import { FaTimes } from "react-icons/fa";
import Input from "@/elements/inputs/inputText/input";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/components/store/reducers/userReducer";
import { API_SIGN_IN } from "../../../constants/api";

import styles from "./signInModal.module.scss";
import Modal from "../../../modal/modal";
import "react-toastify/dist/ReactToastify.css";
import { getApiResourse } from "../../../utils/network";
import "./toast.css";

interface MyState {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const SignInModal = ({ isOpen, onClose, url }: MyState): JSX.Element | null => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const updateLogin = (value: string) => {
    setLogin(value);
  };
  const updatePassword = (value: string) => {
    setUserPassword(value);
  };

  const notify = () => {
    toast("something error", {
      className: "custom_toast",
      draggable: true,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const pushUrlToHistory = () => {
    history.push(url);
  };

  const submitUser = async () => {
    try {
      const res = await getApiResourse(API_SIGN_IN, {
        email: login,
        password: userPassword,
      });
      dispatch(
        setUser({
          userName: res.user.userName,
          email: login,
          id: res.user.id,
          isLogged: true,
          description: res.user.description,
          password: userPassword,
          image: res.user.image,
        })
      );
      pushUrlToHistory();
    } catch (error) {
      notify();
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal onClose={onClose} isOpen={isOpen}>
        <form action="submit" className={styles.submitForm}>
          <div className={styles.header_modal}>
            <span>Authorization</span>
            <button type="button" onClick={onClose} className={styles.close_icon}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.inputBlock}>
            <Input
              message="Login"
              inputType="text"
              value={login}
              inputPlaceHolder="enter login"
              onChange={updateLogin}
            />
          </div>
          <div className={styles.inputBlock}>
            <Input
              message="Password"
              inputType="text"
              value={userPassword}
              inputPlaceHolder="enter password"
              onChange={updatePassword}
            />
          </div>
          <div className={styles.button_block}>
            <button type="button" className={styles.buttonSubmit} onClick={() => submitUser()}>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SignInModal;

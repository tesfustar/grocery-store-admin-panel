import { useState, useRef, Dispatch, SetStateAction } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { GiGamepadCross } from "react-icons/gi";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useValidPhone from "../hooks/useValidphone";
import PinInput from "react-pin-input";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [hasPhone, setHasPhone] = useState<boolean>(false);
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [phone, setPhone] = useValidPhone();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasPhone) return forgotMutationSubmitHandler();
    if (hasPhone && !isVerified) return verifyOtpSubmitHandler();
    if (hasPhone && isVerified) {
      if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
        toast.error("password don't match!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        return;
      }
    }
    setNewSubmitHandler();
  };

  //POST REQUEST
  const forgotMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        !hasPhone
          ? `${process.env.REACT_APP_BACKEND_URL}auth/forgot-password`
          : !isVerified
          ? `${process.env.REACT_APP_BACKEND_URL}auth/forgot-password/verify-otp`
          : `${process.env.REACT_APP_BACKEND_URL}auth/forgot-password/set-password`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const forgotMutationSubmitHandler = async () => {
    try {
      forgotMutation.mutate(
        {
          phone: "251".concat(phone as string),
        },
        {
          onSuccess: (responseData: any) => {
            setHasPhone(true);
          },
          onError: (err: any) => {
            setError("Incorrect phone or Password");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  //verify-otp
  const verifyOtpSubmitHandler = async () => {
    try {
      forgotMutation.mutate(
        { phone: "251".concat(phone as string) },
        {
          onSuccess: (responseData: any) => {
            setIsVerified(true);
          },
          onError: (err: any) => {
            setError("Incorrect phone or Password");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  //set new password
  const setNewSubmitHandler = async () => {
    console.log("first");
    try {
      forgotMutation.mutate(
        { phone: "251".concat(phone as string) },
        {
          onSuccess: (responseData: any) => {
            setIsVerified(true);
          },
          onError: (err: any) => {
            setError("Incorrect phone or Password");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const HandleSendPhone = () => {
    return (
      <div className="w-full mt-2 flex flex-col items-center space-y-2">
        <h3 className="text-center font-semibold text-dark-gray">
          Enter your Phone and we'll send you instructions to reset your
          password
        </h3>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center space-y-1"
        >
          <div className="flex items-center w-full border border-gray-300 rounded-sm">
            <span className="border-r-2 border-gray-300 font-medium text-gray-700 px-2">
              +251
            </span>
            <input
              type="tel"
              value={phone as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                (setPhone as Dispatch<SetStateAction<string>>)(e.target.value)
              }
              placeholder="Phone"
              className="w-full p-2  font-medium text-gray-500 focus:outline-none ring-0"
              required
            />
          </div>

          <button
            disabled={forgotMutation.isLoading}
            type="submit"
            className=" rounded-sm  bg-main-bg p-3 text-[15px] text-white font-medium
               hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-full flex items-center justify-center"
          >
            {forgotMutation.isLoading ? <PulseLoader color="#fff" /> : "Send"}
          </button>
        </form>
        <p
            onClick={() => navigate("/login")}
            className="font-medium text-center text-sm w-full cursor-pointer hover:text-main-color"
          >
            Back to Login
          </p>
      </div>
    );
  };
  const HandleVerifyOtp = () => {
    return (
      <div className="w-full mt-2 flex flex-col items-center space-y-2">
        <h3 className="text-center font-semibold text-dark-gray capitalize">
          Enter the otp code we send to your phone
        </h3>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center space-y-1"
        >
          <PinInput
            length={4}
            initialValue=""
            secret={false}
            secretDelay={10000}
            onChange={(value, index) => {}}
            type="numeric"
            inputMode="number"
            style={{ padding: "1px" }}
            inputStyle={{
              borderColor: "#1f2937",
              borderRadius: 5,
              borderWidth: 1.5,
            }}
            inputFocusStyle={{ borderColor: "#374151" }}
            onComplete={(value, index) => {}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />

          <button
            disabled={forgotMutation.isLoading}
            type="submit"
            className=" rounded-sm  bg-main-bg p-3 text-[15px] text-white font-medium
           hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-full flex items-center justify-center"
          >
            {forgotMutation.isLoading ? <PulseLoader color="#fff" /> : "Verify"}
          </button>
        </form>
      </div>
    );
  };
  const SetPassword = () => {
    return (
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center space-y-1"
      >
        <h3 className="text-center font-semibold text-dark-gray capitalize">
          set your new password
        </h3>
        <div className="flex items-center w-full border border-gray-300 rounded-sm ">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            name=""
            id=""
            placeholder="Password"
            className="w-full p-2 focus:outline-none ring-0 font-medium text-gray-500"
            required
          />
        </div>
        {/* confirm password */}
        <div className="flex items-center w-full border border-gray-300 rounded-sm ">
          <input
            ref={confirmPasswordRef}
            type={showPassword ? "text" : "password"}
            name=""
            id=""
            placeholder="Confirm Password"
            className="w-full p-2 focus:outline-none ring-0 font-medium text-gray-500"
            required
          />
          <div
            className="px-2 h-fit cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={22} color="#aeaeae" />
            ) : (
              <AiFillEye size={22} color="#aeaeae" />
            )}
          </div>
        </div>
        <button
          disabled={forgotMutation.isLoading}
          type="submit"
          className=" rounded-sm  bg-main-bg p-3 text-[15px] text-white font-medium
             hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-full flex items-center justify-center"
        >
          {forgotMutation.isLoading ? (
            <PulseLoader color="#fff" />
          ) : (
            "set password"
          )}
        </button>
      </form>
    );
  };
  return (
    <div className="p-3 flex flex-col items-center justify-center min-h-screen w-full max-w-sm mx-auto">
      {!hasPhone
        ? HandleSendPhone()
        : !isVerified
        ? HandleVerifyOtp()
        : SetPassword()}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </div>
  );
};

export default ForgotPassword;

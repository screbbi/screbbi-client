import { useState } from "react";
import OnboardInput from "../../components/OnboardInput";
import { Link } from "react-router-dom";
import OnboardButton from "../../components/OnboardButton";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { loginValidationSchema } from "../../yup/validation";
import { useFormik } from "formik";
import { postRequest, BASE_URL } from "../../utils/request";
import { toast } from "react-hot-toast";
import AuthLayout from "../../layout/AuthLayout";
import googleImage from "../../assets/img/google.svg";
import logo from "../../assets/img/logo-black.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUpFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      window.location.replace("/generate");
      return;
      setLoading(true);
      postRequest("/auth/login", values)
        .then(({ data }) => {
          setLoading(false);
          localStorage.setItem("token", data.token);
          window.location.replace("/");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    },
  });

  const signInWithGoogle = () => {
    window.location.href = `${BASE_URL}auth/google`;
  };

  return (
    <AuthLayout>
      <div className="onboard-form max-w-md w-11/12">
        <form className="top-onboard-form" onSubmit={signUpFormik.handleSubmit}>
          <img src={logo} alt="" className="mx-auto mb-6" />
          <div className="onboard-title">Log into your account</div>

          <div className="onboard-subtitle">
            Enjoy a seemingly writing assistant
          </div>

          <button
            className="border border-black w-full rounded-lg py-2 flex items-center gap-2 justify-center text-sm font-semibold"
            type="button"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <img src={googleImage} alt="" />
            Continue With Google
          </button>

          <div className="bg-[#D9D9D9] w-full h-[2px] my-8"></div>

          <div className="main-form">
            <OnboardInput
              name="email"
              value={signUpFormik.values.email}
              change={signUpFormik.handleChange}
              error={signUpFormik.errors.email}
              label="Email"
              placeholder="user@gmail.com"
            />
            <label htmlFor="" className="-mb-4">
              Password
            </label>
            <div className="grid pass-grid border border-black rounded-md mt-1">
              <OnboardInput
                name="password"
                value={signUpFormik.values.password}
                change={signUpFormik.handleChange}
                placeholder="Password"
                showBor={true}
                type={showPassword ? "text" : "password"}
              />
              <div
                className="flex justify-center items-center text-grey"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {signUpFormik.errors.password && (
              <div className="text-red-400 text-sm">
                {signUpFormik.errors.password}
              </div>
            )}

            <div className="mt-8">
              <OnboardButton text="Continue" type="submit" loading={loading} />
            </div>

            <div className="text-center text-onboardSubtitle reader mt-6">
              Already have an account?{" "}
              <Link to={"/auth/register"} className="text-teal-500">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;

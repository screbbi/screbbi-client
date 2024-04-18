import { useState } from "react";
import OnboardInput from "../../components/OnboardInput";
import { Link } from "react-router-dom";
import OnboardButton from "../../components/OnboardButton";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { signUpValidationSchema } from "../../yup/validation";
import { useFormik } from "formik";
import { postRequest, BASE_URL } from "../../utils/request";
import { toast } from "react-hot-toast";
import AuthLayout from "../../layout/AuthLayout";
import googleImage from "../../assets/img/google.svg";
import logo from "../../assets/img/logo-black.svg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUpFormik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      postRequest("/auth/register", values)
        .then(({ data }) => {
          toast.success("Registration successful");
          setLoading(false);
          localStorage.setItem("token", data.token);

          window.location.replace("/generate");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    },
  });

  const signUpWithGoogle = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  return (
    <AuthLayout>
      <div className="onboard-form max-w-md py-8">
        <form className="top-onboard-form" onSubmit={signUpFormik.handleSubmit}>
          <img src={logo} alt="" className="mx-auto mb-6" />
          <div className="onboard-title">Create your free account</div>

          <div className="onboard-subtitle">
            Enjoy a seemingly writing assistant
          </div>

          <button
            className="border border-black w-full rounded-lg py-2 flex items-center gap-2 justify-center text-sm font-semibold"
            type="button"
            onClick={signUpWithGoogle}
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
              placeholder="user@gmail.com"
              label="Email"
            />

            <div className="grid grid-cols-2 gap-4">
              <OnboardInput
                name="first_name"
                value={signUpFormik.values.first_name}
                change={signUpFormik.handleChange}
                error={signUpFormik.errors.first_name}
                placeholder="John"
                label="First name"
              />
              <OnboardInput
                name="last_name"
                value={signUpFormik.values.last_name}
                change={signUpFormik.handleChange}
                error={signUpFormik.errors.last_name}
                label="Last name"
                placeholder="Doe"
              />
            </div>

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

            <OnboardButton
              text="Continue with Email"
              type="submit"
              loading={loading}
            />

            <div className="text-onboardSubtitle reader p-0 text-center my-6 max-w-80 mx-auto">
              By continuing, you agree to the{" "}
              <Link to={"/privacy-policies"}>Privacy policy</Link> and{" "}
              <Link to={"/terms-of-services"}>Terms of service</Link>
            </div>

            <div className="text-center text-onboardSubtitle reader mt-6">
              Already have an account?{" "}
              <Link to={"/auth/login"} className="text-teal-500">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;

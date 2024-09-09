import { useState } from "react";
import OnboardInput from "../../components/OnboardInput";
import { Link, useSearchParams } from "react-router-dom";
import OnboardButton from "../../components/OnboardButton";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { resetPasswordSchema } from "../../yup/validation";
import { useFormik } from "formik";
import { postRequest } from "../../utils/request";
import { toast } from "react-hot-toast";
import AuthLayout from "../../layout/AuthLayout";
import Logo from "../../components/Logo";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const signUpFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      resetCode: searchParams.get("resetCode")
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      setLoading(true);
      postRequest("/password/reset", values)
        .then(({ data }) => {
          setLoading(false);
          toast("Continue to login");
          setTimeout(() => window.location.replace("/auth/login"), 2000)
        })
        .catch((err) => {
          setLoading(false);
          toast(err.response.data.message);
        });
    },
  });

  return (
    <AuthLayout>
      <div className="onboard-form max-w-md w-11/12">
        <form className="top-onboard-form" onSubmit={signUpFormik.handleSubmit}>
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <div className="onboard-title">ResetPassword</div>

          
          <div className="main-form">
            <OnboardInput
              name="password"
              value={signUpFormik.values.password}
              change={signUpFormik.handleChange}
              error={signUpFormik.errors.password}
              label="New Password"
              placeholder="****"
              type={showPassword ? "text" : "password"}
            />
            <label htmlFor="" className="-mb-4">
              Confirm Password
            </label>
            <div className="grid pass-grid border border-black rounded-md mt-1">
              <OnboardInput
                name="confirmPassword"
                value={signUpFormik.values.confirmPassword}
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
            {signUpFormik.errors.confirmPassword && (
              <div className="text-red-400 text-sm">
                {signUpFormik.errors.confirmPassword}
              </div>
            )}

            <div className="mt-8">
              <OnboardButton text="Reset" type="submit" loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;

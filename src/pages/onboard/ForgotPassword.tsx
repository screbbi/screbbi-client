import { useState } from "react";
import OnboardInput from "../../components/OnboardInput";
import { Link } from "react-router-dom";
import OnboardButton from "../../components/OnboardButton";
import { forgetPasswordSchema } from "../../yup/validation";
import { useFormik } from "formik";
import { postRequest } from "../../utils/request";
import { toast } from "react-hot-toast";
import AuthLayout from "../../layout/AuthLayout";
import Logo from "../../components/Logo";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      setLoading(true);
      postRequest("/password/forgot", values)
        .then(({ data }) => {
          setLoading(false);
          toast("Check Email To Continue");
          setTimeout(() => window.location.replace("/auth/login"), 3000)
        })
        .catch((err) => {
          setLoading(false);
          console.log(err)
          toast(err?.response?.data?.message || "Connection Error");
        });
    },
  });


  return (
    <AuthLayout>
      <div className="onboard-form max-w-md w-11/12">
        <form className="top-onboard-form" onSubmit={forgotPasswordFormik.handleSubmit}>
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <div className="onboard-title">Reset Password</div>

          <div className="bg-[#D9D9D9] w-full h-[2px] my-8"></div>

          <div className="main-form">
            <OnboardInput
              name="email"
              value={forgotPasswordFormik.values.email}
              change={forgotPasswordFormik.handleChange}
              error={forgotPasswordFormik.errors.email}
              label="Email"
              placeholder="user@gmail.com"
            />

            <div className="mt-8">
              <OnboardButton text="Forgot" type="submit" loading={loading} />
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

export default ForgotPassword;

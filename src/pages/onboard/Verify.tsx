import { useState } from "react";
import OnboardInput from "../../components/OnboardInput";
import OnboardButton from "../../components/OnboardButton";
import { signUpValidationSchema } from "../../yup/validation";
import { useFormik } from "formik";
import { postRequest } from "../../utils/request";
import { toast } from "react-hot-toast";
import AuthLayout from "../../layout/AuthLayout";

const Verify = () => {
  const [loading, setLoading] = useState(false);

  const signUpFormik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      return;
      setLoading(true);
      postRequest("/auth/register", values)
        .then(({ data }) => {
          toast.success("Registration successful");

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

  return (
    <AuthLayout>
      <div className="onboard-form max-w-md w-11/12">
        <form className="top-onboard-form" onSubmit={signUpFormik.handleSubmit}>
          <div className="onboard-title">Create your email</div>

          <div className="onboard-subtitle">
            Confirm your email address by entering the six-digit code sent to
            user@emaple.com
          </div>

          {/* <button
            className="border border-black w-full rounded-lg py-2 flex items-center gap-2 justify-center text-sm font-semibold"
            type="button"
            onClick={signUpWithGoogle}
            disabled={loading}
          >
            <img src={googleImage} alt="" />
            Continue With Google
          </button> */}

          <div className="bg-[#D9D9D9] w-full h-[2px] my-8"></div>

          <div className="main-form">
            <div className="mb-8">
              <OnboardInput
                name="code"
                value={signUpFormik.values.code}
                change={signUpFormik.handleChange}
                error={signUpFormik.errors.code}
                placeholder="Enter code"
                label="Code"
              />
            </div>

            <OnboardButton
              text="Continue with Email"
              type="submit"
              loading={loading}
            />

            <div className="text-center text-onboardSubtitle reader mt-6">
              Didn't get a code? <div className="text-teal-500">Resend</div>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Verify;

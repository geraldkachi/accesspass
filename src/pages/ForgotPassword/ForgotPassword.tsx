import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import LoginLayout from "../../components/Authentication/LoginLayout";
import AuthSubmitButton from "../../components/Button/AuthSubmitButton";
import withGenericMessage, { genericMessagePropTypes} from "../../components/HOC/withGenericMessage";
import { useAuth } from "../../context/authContext";
import SuccessModal from "../../modules/Dashboard/SuccessModal";
import { GenericFormError } from "../../utils/form/FormError";
import { authUrls } from "../../utils/urls";

const EMAIL = "email";

const ForgotPasswordPage = ({ errorMessage, setErrorMessage }) => {
  const [successModal, setSuccessModal] = useState(false);
//   const auth = useAuth();

  const toggleSuccessModal = () => setSuccessModal(!successModal);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) =>
     
  });
  return (
    <LoginLayout>
      <h1 className="text-darkpurple text-lg font-medium py-4 dark:text-white">
        Reset your password
      </h1>
      <p className="text-sm text-lightnavyblue pb-2 dark:text-gray-300">
        Enter the email address associated with your Payfixy! account and we will
        send you a link to reset your password.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="w-full px-5 py-3 text-gray-700 rounded border border-gray-200 mt-3 dark:bg-gray-900 dark:border-gray-900"
          id={EMAIL}
          name={EMAIL}
          type={EMAIL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[EMAIL]}
          required
          placeholder="Email Address"
          aria-label={EMAIL}
        />
        <AuthSubmitButton
          testId="forgot-password-btn"
          isSubmitting={formik.isSubmitting}
        >
          Reset Password
        </AuthSubmitButton>
        <GenericFormError errorMessage={errorMessage} />
      </form>
      
      <div className="flex justify-between items-center">
        <Link
          to={authUrls.login()}
          className="block text-darkpurple font-medium text-sm mt-4 dark:text-gray-400"
        >
          Return to Sign in
        </Link>
        <Link
          to={'/'}
          className="block font-medium text-sm mt-4 capitalize dark:text-gray-400"
        >
          Create account
        </Link>
      </div>
      {successModal && (
        <SuccessModal
          setShowSuccessModal={toggleSuccessModal}
          modalHeader="Successful"
          modalBody="The reset password link will arrive in your email shortly"
        />
      )}
    </LoginLayout>
  );
};

ForgotPasswordPage.propTypes = genericMessagePropTypes;

export default withGenericMessage(ForgotPasswordPage);

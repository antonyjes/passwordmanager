"use client";

import { verifyEmail } from "@/actions/verify-email";
import { CardWrapper } from "@/components/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const VerifyEmail = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onVerify = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong!");
      });
  }, [success, error, token]);

  useEffect(() => {
    onVerify();
  }, [onVerify]);

  return (
    <CardWrapper
      headerLabel="Verify your email"
      backButtonLabel="Home"
      backButtonHref="/home"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message="Your email has been verified successfully!" />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default VerifyEmail;

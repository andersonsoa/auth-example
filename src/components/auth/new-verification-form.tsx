"use client";

import { newVerification } from "@/actions/new-verification";
import { AuthCard } from "@/components/auth/auth-card";
import { ErrorMessage } from "@/components/error-message";
import { SuccessMessage } from "@/components/success-message";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const NewVerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const searchParam = useSearchParams();

  const token = searchParam.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    setSuccess("");
    setError("");
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => setError("Something went wrong."));
  }, [token, success, error]);

  useEffect(onSubmit, [onSubmit]);

  return (
    <div>
      <AuthCard
        title="Auth"
        subtitle="Do your verification!"
        footerHref="/auth/login"
        footerText="Back to login."
      >
        <div className="w-full">
          <div className="flex justify-center">
          {!error && !success ? (
              <BeatLoader />
          ) : (
            <>
              <SuccessMessage message={success} />
              {!success ? <ErrorMessage message={error} /> : null}
            </>
          )}
            </div>
        </div>
      </AuthCard>
    </div>
  );
};

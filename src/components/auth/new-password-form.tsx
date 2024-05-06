"use client";

import { newPassword } from "@/actions/new-password";
import { AuthCard } from "@/components/auth/auth-card";
import { ErrorMessage } from "@/components/error-message";
import { SuccessMessage } from "@/components/success-message";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((res) => {
        if (res?.success) {
          setSuccess(res.success);
        }
        if (res?.error) {
          setError(res.error);
        }
      });
    });
  };

  return (
    <section className="flex justify-center pt-20">

      <AuthCard
        title="Enter a new Password"
        footerHref="/auth/login"
        footerText="Back to login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Change password
            </Button>
          </form>
        </Form>
      </AuthCard>
    </section>
  );
};

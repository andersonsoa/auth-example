"use client";

import { reset } from "@/actions/reset";
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
import { resetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((res) => {
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
        title="Forgot your password?"
        footerHref="/auth/login"
        footerText="Back to login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
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
              Send reset E-mail
            </Button>
          </form>
        </Form>
      </AuthCard>
    </section>
  );
};

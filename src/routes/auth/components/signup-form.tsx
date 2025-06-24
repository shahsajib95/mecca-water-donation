import { FormInput } from "@/components/form/form-input";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Password } from "@/components/ui/password";
import { useSignupMutation } from "@/features/auth/authQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpFromSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Enter your name" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name should not contain numbers" }),
  email: z
    .string()
    .min(1, { message: "Enter your email" })
    .email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export type SignUpFormType = z.infer<typeof signUpFromSchema>;

export function SignUpForm() {
  const [signUp, { error: signUpErr, isError, isLoading: signUpLoad }] =
    useSignupMutation();
  const navigate = useNavigate();
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFromSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: SignUpFormType) => {
    if (!values) return;

    const { data }: any = await signUp({
      email: values.email,
      name: values.name,
      password: values.password,
    });
    console.log("data", data);

    if (data) {
      navigate("/auth/login");
      toast.success("Account created successfully!");
    }

    if (signUpErr) {
      toast.error("Unable to create account, please try again!");
      return;
    }
  };
  console.log("isError", isError, signUpErr);

  return (
    <Card className="p-5">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl ">Sign up</CardTitle>
        <CardDescription className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login">
            {" "}
            <span className="cursor-pointer font-bold text-[#000] hover:underline  dark:text-white">
              Login
            </span>
          </Link>
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="p-5">
          <div className="mb-4">
            <FormInput
              form={form}
              placeholder="Type your name"
              label="Name"
              name="name"
              type="text"
              isAuth
            />
            <FormInput
              form={form}
              placeholder="john@gmail.com"
              label="Email"
              name="email"
              type="email"
              isAuth
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-base font-medium text-[#71717a]  dark:text-white">
                      Password
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Password placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!signUpLoad ? (
            <Button
              type="submit"
              className="w-full px-[22px]"
              disabled={!form.formState.isDirty}
            >
              Sign up
            </Button>
          ) : (
            <Button disabled className="w-full">
              <Icons.buttonLoader className="mr-1 h-5  animate-spin stroke-card " />
              Loading...
            </Button>
          )}
          {isError && (
            <p className="mt-5 flex items-center justify-center text-sm text-red-600">
              {(signUpErr as any)?.message}
            </p>
          )}
        </form>
      </Form>
    </Card>
  );
}

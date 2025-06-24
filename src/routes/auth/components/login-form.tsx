import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginMutation, useSignupMutation } from "@/features/auth/authQuery";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignUpPayload } from "@/types/auth";

type LoginPayload = {
  email: string;
  password: string;
};

export function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [signUp, { data, isLoading: isLoadingSignUp }] = useSignupMutation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();

  const [isSignUp, setIsSignUp] = useState(
    searchParams.get("signup") === "true"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);
  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setErrorMessage("");
  };

  const validateFields = () => {
    if (!email) {
      toast.error("Email is required.");
      return false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      toast.error("Invalid email format.");
      return false;
    } else if (/^[0-9]+@[0-9]+\.[0-9]+$/.test(email)) {
      toast.error("Email cannot consist only of numeric characters.");
      return false;
    }
    if (!password) {
      toast.error("Password is required.");
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }
    // else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
    //   toast.error("Password must contain at least one symbol.");
    //   return false;
    // }

    if (isSignUp) {
      if (!name) {
        toast.error("Name is required.");
        return false;
      } else if (!/^[A-Za-z\s]+$/.test(name)) {
        toast.error("Name should only contain letters and spaces.");
        return false;
      }

      if (!confirmPassword) {
        toast.error("Confirm Password is required.");
        return false;
      } else if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (data?.success) {
    }
  }, [data]);

  const handleLogin = async () => {
    try {
      const loginPayload: LoginPayload = { email, password };
      await login(loginPayload).unwrap();
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    try {
      const signUpPayload: SignUpPayload = { email, password, name };
      await signUp(signUpPayload).unwrap();
      toast.success("Signup successful! Please log in.");
      toggleForm();
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || "Signup failed";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;
    isSignUp ? handleSignUp() : handleLogin();
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              {isSignUp ? "Sign Up" : "Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="username">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {isSignUp && (
                  <div className="relative">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 mt-3 -translate-y-1/2 transform text-gray-600"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Forgot Password Link - Only show on Login form */}
              {!isSignUp && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/auth/forget-password")}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full">
                {isLoadingSignUp || isLoadingLogin
                  ? "Processing..."
                  : isSignUp
                    ? "Sign Up"
                    : "Login"}
              </Button>
            </form>

            <div className="mt-5 flex items-center justify-center gap-3 text-sm">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="cursor-pointer text-blue-600 hover:underline"
                    onClick={toggleForm}
                  >
                    Login!
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    className="cursor-pointer text-blue-600 hover:underline"
                    onClick={toggleForm}
                  >
                    Sign Up!
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

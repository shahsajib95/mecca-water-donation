import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, CheckCircle, Shield, Lock, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useGenerateResetTokenMutation } from "@/features/auth/authQuery";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [generateResetToken, { isLoading }] = useGenerateResetTokenMutation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Email is required.");
      return;
    }
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await generateResetToken({ email }).unwrap();
      
      if (response.success) {
        setIsEmailSent(true);
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(response.message || "Failed to send reset link.");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Failed to send reset link. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg border-2 rounded-xl p-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Check your email</h1>
            <p className="text-muted-foreground">
              We've sent a password reset link to your email address
            </p>
          </div>

          {/* Main Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {/* Email confirmation box */}
              <div className="rounded-lg border bg-muted/30 p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">Email sent successfully</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Click the link in your email to reset your password.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Didn't receive it? Check your spam folder or try again.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEmailSent(false)}
                  className="w-full"
                >
                  Send another email
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <Link to="/auth/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg border-2 rounded-xl">
        {/* Header */}
        <div className="text-center mb-2 p-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Forgot your password?</h1>
          <p className="text-muted-foreground mt-4">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send reset instructions"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Back to Login */}
            <Link to="/auth/login">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to login
              </Button>
            </Link>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
}
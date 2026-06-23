import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { buildApiUrl } from "@/lib/api";
import { isNativeCapacitorApp, setMobileAccessToken } from "@/lib/native";
import { useLocation, Link } from "wouter";
import { Plane, User, Lock, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

async function waitForAuthenticatedUser(maxAttempts = 8, delayMs = 250) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetch(buildApiUrl("/api/auth/user"), {
      credentials: "include",
      cache: "no-store",
    });

    console.log("Post-login auth probe:", {
      attempt,
      status: response.status,
      url: response.url,
    });

    if (response.ok) {
      return response.json();
    }

    if (attempt < maxAttempts) {
      await new Promise((resolve) => window.setTimeout(resolve, delayMs));
    }
  }

  return null;
}

export default function Login() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const returnToParam = searchParams.get("returnTo");
  const safeReturnTo =
    returnToParam &&
    returnToParam.startsWith("/") &&
    !returnToParam.startsWith("/login") &&
    !returnToParam.startsWith("/register")
      ? returnToParam
      : null;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: async (data: Record<string, unknown>) => {
      const mobileAccessToken =
        typeof data.mobileAccessToken === "string" ? data.mobileAccessToken : null;
      if (isNativeCapacitorApp()) {
        setMobileAccessToken(mobileAccessToken);
      }

      // Keep optimistic state immediately, then verify cookie-backed auth.
      queryClient.setQueryData(["/api/auth/user"], data);
      const verifiedUser = await waitForAuthenticatedUser();
      if (!verifiedUser) {
        toast({
          title: "Sign-in session not ready",
          description: "Please try signing in again. If this persists, refresh the app.",
          variant: "destructive",
        });
        return;
      }

      queryClient.setQueryData(["/api/auth/user"], verifiedUser);
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      const destination = safeReturnTo ?? "/";
      if (typeof window !== "undefined") {
        window.location.replace(destination);
        return;
      }
      setLocation(destination);
    },
    onError: (error) => {
      let errorMessage = "Invalid username/email or password.";
      const message = error instanceof Error ? error.message : "";

      if (message.includes("not found")) {
        errorMessage =
          "Account not found. Please check your credentials or create a new account.";
      } else if (message.includes("password")) {
        errorMessage = "Incorrect password. Please try again.";
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F0FDFA] via-[#E6FAF7] to-[#F0FDFA] px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(13,148,136,0.25)] bg-[rgba(13,148,136,0.10)] shadow-[0_10px_30px_-12px_rgba(13,148,136,0.20)]">
              <Plane className="h-6 w-6 text-[#0D9488]" />
            </div>
          </div>
          <CardTitle className="text-3xl font-semibold text-[#0D3D39]">Welcome back</CardTitle>
          <CardDescription className="text-[#0D3D39]/60">
            Sign in to your Float account to continue planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="usernameOrEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0D3D39]">Username or Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 h-4 w-4 text-[#0D9488]" />
                        <Input
                          type="text"
                          inputMode="email"
                          autoCapitalize="none"
                          autoComplete="username"
                          autoCorrect="off"
                          spellCheck={false}
                          placeholder="john@example.com or johndoe"
                          className="pl-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0D3D39]">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-4 top-3.5 h-4 w-4 text-[#0D9488]" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="••••••••"
                          className="pl-11 pr-11"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1.5 top-1.5 h-7 w-7 rounded-full text-[#0D3D39]/50 hover:bg-[rgba(13,148,136,0.08)]"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#0D3D39]/60">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#0D9488] hover:text-[#0B7C73]"
              >
                Create one here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-[#0D3D39]/50 hover:text-[#0D3D39]"
            >
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

//import React, { useState } from "react";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
  onSubmit: (
    formData: FormData
  ) => Promise<{ ok: boolean; userId?: string } | void>;
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const title = isSignUp ? "Create an Account" : "Sign In";
  const buttonText = isSignUp ? "Sign Up" : "Sign In";

  // State for potential loading/error feedback could be added here
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [signedUp, setSignedUp] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setError(null);
    // setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData.entries()));

    try {
      await onSubmit(formData);
      // Success handling (e.g., redirect) would happen in the parent component via the prop
    } catch (e) {
      // setError("An unexpected error occurred.");
      console.error(e);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          {title}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Field (Sign-Up Only) */}
          {isSignUp && (
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required={isSignUp}
                autoComplete="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition duration-150 ease-in-out"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete={isSignUp ? "email" : "username"}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition duration-150 ease-in-out"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password" // Changed to type="password" for security
              name="password"
              id="password"
              required
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 transition duration-150 ease-in-out"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
              // disabled={isLoading}
            >
              {/* {isLoading ? 'Loading...' : buttonText} */}
              {buttonText}
            </button>
          </div>

          {/* Error Message placeholder */}
          {/* {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )} */}
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <a
            href={isSignUp ? "/sign-in" : "/sign-up"} // Replace with actual routing logic
            className="font-medium text-indigo-400 hover:text-indigo-300 ml-1 transition duration-150 ease-in-out"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </a>
        </p>
      </div>
    </div>
  );
}

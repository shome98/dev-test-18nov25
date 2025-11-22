import AuthForm from "./components/AuthForm";
import { signIn, signOut, signUp } from "./lib/auth-actions";

function App() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-center gap-8 p-8 min-h-screen bg-gray-900">
        <AuthForm mode="sign-up" onSubmit={signUp} />
        <AuthForm mode="sign-in" onSubmit={signIn} />
      </div>

      <button
        onClick={signOut}
        className="w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
      >
        Sign Out
      </button>
    </>
  );
}

export default App;

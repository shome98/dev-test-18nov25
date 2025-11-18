import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const api_url = import.meta.env.VITE_API_URL;
  if (!api_url) {
    return <h1 className="bg-red-600 text-black">😖😖😖😖😖api url missing</h1>;
  }
  const onButtonClick = async () => {
    await fetch(api_url, { credentials: "include" })
      .then((res) => res.text())
      .then((res) => setMessage(res))
      .catch((error) => setError(error));
  };

  return (
    <>
      <h1 className="text-3xl">welcome to cookie client</h1>
      <button
        className="bg-amber-500 p-4 rounded"
        onClick={() => onButtonClick()}
      >
        receive response
      </button>
      {message !== "" && (
        <h1 className="bg-green-400 text-black">message is{message}</h1>
      )}
      {error !== "" && (
        <h1 className="bg-red-400 text-black">error is{error}</h1>
      )}
    </>
  );
}

export default App;

import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster position="top-right" duration={3000} />
    </>
  );
}

export default App;

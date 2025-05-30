import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const UserProfile = lazy(() => import("./components/UserProfile"));
const Messages = lazy(() => import("./components/Messages"));
const BookDetail = lazy(() => import("./components/BookDetail"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<UserProfile isOwnProfile={true} />}
          />
          <Route
            path="/profile/:userId"
            element={<UserProfile isOwnProfile={false} />}
          />
          <Route path="/messages" element={<Messages />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;

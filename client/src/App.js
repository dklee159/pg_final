import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, ProtectedRoute, Administer, Landing, Denied, ProtectedQuizRoute, Submitted, SubmitPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllTeams, SharedLayout, Stats } from "./pages/dashboard";
import Quiz from "./pages/quiz/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-teams" element={<AllTeams />} />
        </Route>
        <Route path="admin" element={<Administer />} />
        <Route path="landing/:quizNum" element={<Landing />} />
        <Route
          path="/quizNum/:quizNum"
          element={
            <ProtectedQuizRoute>
              <Quiz />
            </ProtectedQuizRoute>
          }
        ></Route>
        <Route path="submitpage" element={<SubmitPage />} />
        <Route path="submitted" element={<Submitted />} />
        <Route path="denied" element={<Denied />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;

import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import Research from "./components/Research";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Router>
          <Suspense fallback={null}>
            <Routes>
              <Route
                path="/"
                element={
                  <MainContainer>
                    <Suspense fallback={null}>
                      <CharacterModel />
                    </Suspense>
                  </MainContainer>
                }
              />
              <Route path="/research" element={<Research />} />
            </Routes>
          </Suspense>
        </Router>
      </LoadingProvider>
    </>
  );
};

export default App;

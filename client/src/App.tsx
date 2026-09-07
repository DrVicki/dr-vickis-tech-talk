import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import ArticlePage from "./pages/ArticlePage";

function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const scrollToAnchor = () => {
      document.querySelector(hash)?.scrollIntoView({ block: "start" });
    };
    const frame = window.requestAnimationFrame(scrollToAnchor);
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollManager />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/post/:slug" component={ArticlePage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const routerBase = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={routerBase}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

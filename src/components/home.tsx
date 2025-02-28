import React from "react";
import DynamicPage from "./DynamicPage";
import MainNavigation from "./navigation/MainNavigation";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNavigation />
        </div>
      </header>
      <main>
        <DynamicPage pageId="home" />
      </main>
    </div>
  );
};

export default Home;

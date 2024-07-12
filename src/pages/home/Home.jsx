import React from "react";
import HomeVideo from "./HomeVideo";
import MobileApp from "./MobileApp";
import BooksView from "./BooksView";

export default function Home() {
  return (
    <div>
      <HomeVideo />
      <BooksView/>
      <MobileApp />
    </div>
  );
}

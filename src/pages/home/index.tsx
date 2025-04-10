import React from "react";

const Home = () => {
  const goToWatch = () => {
    window.location.href = "/todos";
  };
  return (
    <div>
      <button onClick={goToWatch} >click me</button>
      Home
    </div>
  );
};

export default Home;

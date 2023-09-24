import Link from "next/link";
import React from "react";

const Denied = () => {
  return (
    <div>
      <h1>You must be logged in as an admin or a manager to see this page.</h1>
      <Link href={"/"}>Return to home page.</Link>
    </div>
  );
};

export default Denied;

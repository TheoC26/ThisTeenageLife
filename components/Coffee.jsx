import Image from "next/image";
import Link from "next/link";
import React from "react";

const Coffee = () => {
  return (
    <Link href={"https://buymeacoffee.com/thisteenagelife"} className="coffee">
      <Image
        src={"/decoratives/coffee.png"}
        alt="Coffee"
        width={100}
        height={100}
      />
      <h3>Support our work</h3>
      <h3>Buy us a coffee!</h3>
    </Link>
  );
};

export default Coffee;

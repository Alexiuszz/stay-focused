import Link from "next/link";

function Footer() {
  return (
    <div className="w-screen h-12 flex items-end justify-center font-cursive">
      <Link href={"https://www.alexiusnwala.com/"} target="_blank">
        <p className="text-lg ">Alexius &copy;</p>
      </Link>
    </div>
  );
}

export default Footer;

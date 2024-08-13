import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen mb-0 pb-0 gap-2">
      made with ❤️ by {" "}
      <Link href="https://linktr.ee/ImadSelka">
      Imad
      </Link>
    </div>
  )
};

export default Footer;

import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <div className="flex justify-between m-5">
      <div>
        {/* <Image src="/logo.png" alt="Logo" width={100} height={100} /> */}
        <h1 className="ml-10">FileConverter</h1>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;

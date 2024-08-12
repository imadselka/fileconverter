import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <div className="flex justify-around m-5">
      <div>
        {/* <Image src="/logo.png" alt="Logo" width={100} height={100} /> */}
        <h1>FileConverter</h1>
      </div>
      <div>
        <ModeToggle />
      </div>
      <h1>test</h1>
    </div>
  );
};

export default NavBar;

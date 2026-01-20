import DocumentTitle from "./DocumentTitle";
import HeaderActions from "./HeaderActions";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex justify-between items-center px-4 h-11 w-screen ">
      <Logo />
      <DocumentTitle />
      <HeaderActions />
    </div>
  );
}

export default Header;

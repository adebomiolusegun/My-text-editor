import DocumentTitle from "@UI/headerComponents/DocumentTitle";
import HeaderActions from "@UI/headerComponents/HeaderActions";
import Logo from "@UI/headerComponents/Logo";
// import Profile from "@UI/headerComponents/Profile";

function Header() {
  return (
    <div className="w-full border-b border-gray-300">
      <div className="flex justify-between items-center  h-11 w-screen  px-4">
        <Logo />
        <DocumentTitle />
        <HeaderActions />
      </div>
    </div>
  );
}

export default Header;

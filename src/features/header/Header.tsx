import DocumentTitle from "@components/headerComponents/DocumentTitle";
import HeaderActions from "@components/headerComponents/HeaderActions";
import Logo from "@components/headerComponents/Logo";

function Header() {
  return (
    <div className="flex justify-between items-center  h-11 w-auto border-b-2 border-gray-300">
      <Logo />
      <DocumentTitle />
      <HeaderActions />
    </div>
  );
}

export default Header;

import BulletList from "@components/toolBarComponent/BulletList";
import TextFormat from "@components/toolBarComponent/TextFormat";

function ToolsBar() {
  return (
    <div className="flex gap-4 h-11 w-auto border-b-2 border-gray-300  items-center">
      <TextFormat />
      <BulletList />
    </div>
  );
}

export default ToolsBar;

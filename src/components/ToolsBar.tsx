import BlockQuote from "@UI/toolsBarComponents/textFormatting/BlockQuote";
import BulletList from "@UI/toolsBarComponents/paragraphFormatting/BulletList";
import CodeBlock from "@UI/toolsBarComponents/textFormatting/CodeBlock";
import TextFormat from "@UI/toolsBarComponents/textFormatting/TextFormat";
import Redo from "@UI/toolsBarComponents/textFormatting/Redo";
import TextAlignment from "@UI/toolsBarComponents/paragraphFormatting/TextAlignment";
import Link from "@UI/toolsBarComponents/insertOptions/Link";
import Image from "@UI/toolsBarComponents/insertOptions/Image";

function ToolsBar() {
  return (
    <div className="w-full border-b border-gray-300">
      <div className="flex gap-4 h-11 px-4 sm:px-4 w-full sm:w-4/5  md:w-3/4 lg:w-1/2 lg:px-0 mx-auto items-center">
        <div className=" flex gap-4 border-r pr-3 border-gray-300">
          <TextFormat id="textFormat" />
          <BulletList id="bulletList" />
          <BlockQuote />
          <CodeBlock />
        </div>
        <div className=" border-r pr-3 border-gray-300">
          <TextAlignment />
        </div>
        <div className="  flex gap-4 border-r pr-3 border-gray-300">
          <Link />
          <Image />
        </div>
        <div className=" ml-auto">
          <Redo />
        </div>
      </div>
    </div>
  );
}

export default ToolsBar;

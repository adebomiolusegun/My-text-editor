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
    <div className="border-b borderBottom  ">
      <div className="toolsbarSecDivContainer  border-2 border-red-400">
        <div className=" flex gap-4  border-r pr-3 borderRight">
          <TextFormat id="textFormat" />
          <BulletList id="bulletList" />
          <BlockQuote />
          <CodeBlock />
        </div>

        <div className="  border-r pr-3 borderRight">
          <TextAlignment />
        </div>
        <div className="  flex gap-4 borderRight">
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

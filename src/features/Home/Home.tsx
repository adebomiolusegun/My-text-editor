import Header from "@features/header/Header";
import ToolsBar from "@features/toolsBar/ToolsBar";

function Home() {
  return (
    <div className="   h-screen w-1/2 mx-auto  flex flex-col boeder-b-2 border-gray-300">
      <Header />
      <ToolsBar />
    </div>
  );
}

export default Home;

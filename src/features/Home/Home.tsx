import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import Editor from "@UI/BlockComponent";
import ToolsBar from "@components/ToolsBar/ToolsBar";

function Home() {
  return (
    <div className="h-screen w-screen flex flex-col ">
      <Header />
      <ToolsBar />
      <Editor />
      <Footer />
    </div>
  );
}

export default Home;

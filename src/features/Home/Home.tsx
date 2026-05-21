import Footer from "@components/Footer";
import Header from "@components/Header";
import Editor from "@hooks/BlockComponent";
import ToolsBar from "@components/ToolsBar";

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

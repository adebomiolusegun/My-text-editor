import Footer from "@components/Footer";
import Header from "@components/Header";
import TextArea from "@components/TextArea";
import ToolsBar from "@components/ToolsBar";

function Home() {
  return (
    <div className="h-screen w-screen flex flex-col ">
      <Header />
      <ToolsBar />
      <TextArea />
      <Footer />
    </div>
  );
}

export default Home;

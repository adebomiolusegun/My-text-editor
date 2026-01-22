function TextArea() {
  return (
    <div className="flex flex-col justify-center items-center">
      <textarea
        name=""
        id="message"
        placeholder="Write your text here..."
        className="mt-2 w-full h-screen sm:w-4/5 md:w-3/4 lg:w-1/2 block p-2.5 s text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
      ></textarea>
    </div>
  );
}

export default TextArea;

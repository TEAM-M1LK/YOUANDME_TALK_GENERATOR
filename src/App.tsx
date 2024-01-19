import classNames from "classnames";
import React, { FormEvent, useEffect, useRef, useState } from "react";

const Chat = ({ author, content }: { author: string; content: string }) => {
  return (
    <div
      className={classNames(
        "w-fit py-3 px-5 max-w-[70%] text-white font-normal round-me ",
        author === "나"
          ? "bg-[#FF61BF] round-me ml-auto"
          : "bg-[#6E33F4] round-you mr-auto"
      )}
    >
      {content}
    </div>
  );
};

const App = () => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("나");
  const [chatting, setChatting] = useState<any>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setChatting((prev: any) => [
      ...prev,
      { author, content, date: new Date() },
    ]);
    setContent("");
    setAuthor((prev) => (prev === "나" ? "상대방" : "나"));
  };

  const handleGenerate = () => {
    console.log(chatting);
    let element = document.createElement("a");
    let text = JSON.stringify(chatting);
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", "talk.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setChatting([]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatting]);

  return (
    <div className="w-full h-[100vh] flex flex-col px-8 py-6 gap-4">
      <header className="flex gap-1 items-center">
        <img
          className="w-8 transition-all duration-300 ease-in-out group-hover:scale-110 mr-1"
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pink%20Heart.png"
          alt="Pink Heart"
        />
        <h1 className="text-3xl font-extrabold">너랑나랑</h1>
        <span className="text-xl font-semibold mt-auto mb-1">대화 만들기!</span>
        <button
          onClick={handleGenerate}
          className=" w-fit px-3 ml-auto h-[26px] flex items-center justify-center text-white text-sm font-semibold bg-[#FF61BF] rounded-[4px]"
        >
          생성
        </button>
      </header>
      <div className="border-solid border-[1px] border-[#f2f3f7] w-full" />
      <div
        ref={scrollRef}
        className="w-full h-full flex flex-col gap-2 overflow-scroll"
      >
        {chatting.map((chat: any, i: number) => (
          <Chat key={i} author={chat.author} content={chat.content} />
        ))}
        <Chat
          author={author}
          content={!content.length ? "입력 중..." : content}
        />
      </div>
      <div className="mt-[50px]" />
      <form
        onSubmit={handleSubmitMessage}
        className="bg-white fixed bottom-0 left-0  w-full h-[50px] flex items-center justify-center shadow-chatting px-4"
      >
        <input
          onChange={({ target: { value } }) => setContent(value)}
          value={content}
          className="w-full outline-none font-medium"
        />
        <button className=" w-[60px] h-[26px] flex items-center justify-center text-white text-sm font-semibold bg-[#FF61BF] rounded-[4px]">
          전송
        </button>
      </form>
    </div>
  );
};

export default App;

import { useEffect, useRef, useState } from "react";
import TwoButtonBox from "./ButtonGroup";
import { useTheme } from "../provider/themeProvider";
import { saveCodeToEditor } from "../utils/util";
import Confetti from "react-confetti";

export interface Content {
  code: string;
  language: string;
  name: string;
}

const Editor = () => {
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const [content, setContent] = useState<Content>({
    code: "",
    language: "",
    name: "",
  });

  useEffect(() => {
    const savedCode = localStorage.getItem("editorCode");
    const savedLanguage = localStorage.getItem("editorLanguage");
    const fileName = localStorage.getItem("editorFileName");

    if (savedCode && savedLanguage) {
      setTimeout(() => {
        saveCodeToEditor({
          editorRef,
          language: savedLanguage,
          code: savedCode,
          name: fileName!,
        });
      }, 2500);
    }
  }, []);

  useEffect(() => {
    const handleMessage = (e: any) => {
      if (e.data && e.data.language) {
        setContent({
          code: e.data.files[0].content,
          language: e.data.language,
          name: e.data.files[0].name,
        });
        if (e.data.result.success && e.data.action === "runComplete") {
          triggerConfetti();
        }
        localStorage.setItem("editorCode", e.data.files[0].content);
        localStorage.setItem("editorLanguage", e.data.language);
        localStorage.setItem("editorFileName", e.data.files[0].name);
      }
    };
    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const triggerConfetti = () => {
    setIsConfettiActive(true);

    setTimeout(() => {
      setIsConfettiActive(false);
    }, 5000);
  };
  return (
    <div>
      {isConfettiActive && (
        <Confetti
          width={window.innerWidth - 200}
          height={window.innerHeight - 200}
          numberOfPieces={200}
        />
      )}
      <iframe
        ref={editorRef}
        frameBorder="0"
        height="450px"
        src={`https://onecompiler.com/embed/javascript?codeChangeEvent=true&hideLanguageSelection=true&listenToEvents=true&hideRun=true&theme=${theme}`}
        width="100%"
      ></iframe>
      <TwoButtonBox
        editorRef={editorRef}
        content={content}
      
      />
    </div>
  );
};

export default Editor;

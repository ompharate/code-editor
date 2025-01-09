import { Box, Button } from "@mui/material";
import { saveCodeToEditor } from "../utils/util";
import { useTheme } from "../provider/themeProvider";
import beautify from "js-beautify";
import { Content } from "./Editor";
type Theme = "dark" | "light";

const TwoButtonBox = ({
  editorRef,
  content,
  setContent,
}: {
  editorRef: React.RefObject<HTMLIFrameElement> | null;
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
}) => {
  const { toggleTheme, theme } = useTheme();

  const runCode = () => {
    if (editorRef?.current) {
      const iframeDocument = editorRef.current.contentWindow;

      if (iframeDocument) {
        iframeDocument.postMessage(
          {
            eventType: "triggerRun",
          },
          "*"
        );
      }
    }
  };

  const formatCode = async () => {
    let formattedCode = content.code;

    if (content.language === "javascript" || content.language === "js") {
      formattedCode = beautify(content.code, {
        indent_size: 2,
        space_in_empty_paren: true,
      });
      saveCodeToEditor({
        editorRef,
        language: content.language,
        code: formattedCode,
        name: content.name,
      });
    }
    localStorage.setItem("editorCode", formattedCode);
    localStorage.setItem("editorLanguage", content.language);
    localStorage.setItem("editorFileName", content.name);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        width: "500px",
        margin: "0 auto",
      }}
    >
      <Button onClick={runCode} variant="contained" color="primary">
        Run
      </Button>
      <Button onClick={formatCode} variant="outlined" color="secondary">
        Format Code
      </Button>
      <Button
        onClick={toggleTheme}
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        {theme}
      </Button>
    </Box>
  );
};

export default TwoButtonBox;

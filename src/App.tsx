import { Box } from "@mui/material";
import Editor from "./components/Editor";

const App = () => {
  return (
    <Box
      className="min-h-screen"
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <Editor />
    </Box>
  );
};

export default App;

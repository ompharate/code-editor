export function saveCodeToEditor({
  editorRef,
  language,
  code,
  name,
}: {
  editorRef: React.RefObject<HTMLIFrameElement> | null;
  language: string;
  code: string;
  name: string;
}) {
  if (editorRef?.current) {
    const iframeDocument = editorRef.current.contentWindow;

    if (iframeDocument) {
      iframeDocument.postMessage(
        {
          eventType: "populateCode",
          language: language,
          files: [
            {
              name,
              content: code,
            },
          ],
        },
        "*"
      );
    }
  }
}

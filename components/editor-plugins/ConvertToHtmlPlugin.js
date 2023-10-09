import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

export function ConvertToHtmlPlugin({setHtml}) {
  const [editor] = useLexicalComposerContext();

  //   const debouncedSaveContent = debounce(saveContent, 500);

  useEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        // Don't update if nothing changed
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

        editorState.read(() => {
          const tmp = $generateHtmlFromNodes(editor);
            setHtml(tmp);
        });
      }
    );
  }, [editor]);

  return null;
}

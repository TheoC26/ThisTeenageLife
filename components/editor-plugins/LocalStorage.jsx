import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

import { debounce } from "./debounce";

export function LocalStoragePlugin({ namespace }) {
  const [editor] = useLexicalComposerContext();

  const saveContent = useCallback(
    (content) => {
      localStorage.setItem(namespace, content);
    },
    [namespace]
  );

  const debouncedSaveContent = debounce(saveContent, 500);

  useEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        // Don't update if nothing changed
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;


        // Generate HTML from the editor state
        const serializedState = JSON.stringify(editorState);
        saveContent(serializedState);
        // debouncedSaveContent(serializedState);
      }
    );
  }, [debouncedSaveContent, editor]);

  return null;
}

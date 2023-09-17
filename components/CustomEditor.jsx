import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";

import { isValidUrl } from "./editor-plugins/url";
import { LocalStoragePlugin } from "./editor-plugins/LocalStorage";
import { FloatingMenuPlugin } from "./editor-plugins/FloatingMenuPlugin";


const EDITOR_NAMESPACE = "lexical-editor";

const EDITOR_NODES = [
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

export function LexicalEditor(props) {
  return (
    <LexicalComposer initialConfig={props.config}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
      <LinkPlugin validateUrl={isValidUrl} />
      <LocalStoragePlugin namespace={EDITOR_NAMESPACE} />
      <FloatingMenuPlugin />
    </LexicalComposer>
  );
}

const Placeholder = () => {
  return (
    <div className="editor-placeholder">
      Start writing...
    </div>
  );
};


export function Editor() {
  const content = localStorage.getItem(EDITOR_NAMESPACE);
  return (
    <div id="editor-wrapper" className={"editor-wrapper"}>
      <LexicalEditor
        config={{
          namespace: EDITOR_NAMESPACE,
          nodes: EDITOR_NODES,
          editorState: content,
          theme: {
            root: "editor-root",
            link: "cursor-pointer",
            text: {
              bold: "font-semibold",
              underline: "underline",
              italic: "italic",
              strikethrough: "line-through",
              underlineStrikethrough: "underlined-line-through",
            },
          },
          onError: (error) => {
            console.log(error);
          },
        }}
      />
    </div>
  );
}

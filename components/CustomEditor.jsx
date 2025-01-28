import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./editor-plugins/TreeViewPlugin";
import ToolbarPlugin from "./editor-plugins/ToolbarPlugin";
import { ConvertToHtmlPlugin } from "./editor-plugins/ConvertToHtmlPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LocalStoragePlugin } from "./editor-plugins/LocalStorage";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

import ListMaxIndentLevelPlugin from "./editor-plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./editor-plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./editor-plugins/AutoLinkPlugin";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const exampleTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
};

const EDITOR_NAMESPACE = "lexical-editor";

function Placeholder() {
  return <div className="editor-placeholder">Start Writting Here...</div>;
}

const editorConfig = {
  // The editor theme
  theme: exampleTheme,
  namespace: EDITOR_NAMESPACE,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default function Editor({ setContent }) {
  const [XScroll, setXScroll] = useState(0);
  const toolbarRef = useRef(null);
  const rightArrowRef = useRef(null);
  const leftArrowRef = useRef(null);

  useEffect(() => {
    toolbarRef.current.addEventListener("scroll", (e) => {
      setXScroll(e.target.scrollLeft);
      console.log(e.target.scrollLeft);
    });
    if (rightArrowRef.current != null) {
      rightArrowRef.current.addEventListener("click", () => {
        toolbarRef.current.scrollLeft = 110;
      });
    }
    if (leftArrowRef.current != null) {
      leftArrowRef.current.addEventListener("click", () => {
        toolbarRef.current.scrollLeft = 0;
      });
    }
  }, [toolbarRef, leftArrowRef.current, rightArrowRef.current]);

  return (
    <LexicalComposer
      initialConfig={{
        // The editor theme
        theme: exampleTheme,
        namespace: EDITOR_NAMESPACE,
        // Handling of errors during update
        onError(error) {
          throw error;
        },
        // Any custom nodes go here
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          CodeNode,
          CodeHighlightNode,
          TableNode,
          TableCellNode,
          TableRowNode,
          AutoLinkNode,
          LinkNode,
        ],
      }}
    >
      <div className="editor-container">
        <ToolbarPlugin toolbarRef={toolbarRef} />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ConvertToHtmlPlugin setHtml={setContent} />
          {/* <LocalStoragePlugin namespace={EDITOR_NAMESPACE} /> */}
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
        {XScroll < 30 ? (
          <div className="floating-gradient right" ref={rightArrowRef}>
            <Image
              src={"/icons/arrow.svg"}
              width={30}
              height={30}
              alt="arrow"
            />
          </div>
        ) : (
          XScroll > 70 && (
            <div className="floating-gradient left" ref={leftArrowRef}>
              <Image
                src={"/icons/arrow.svg"}
                width={30}
                height={30}
                alt="arrow"
              />
            </div>
          )
        )}
      </div>
    </LexicalComposer>
  );
}

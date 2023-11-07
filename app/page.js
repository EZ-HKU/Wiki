"use client";

import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';


export default function Home() {

  // load markdown from public/README.md
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch("/UniScript.md")
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);
  return (
    <div>
      <div className="nav-container">
        <MarkNav
          className="article-menu"
          source={markdown}
          headingTopOffset={0}
          ordered={false}
        />
      </div>
      <div className="article-container rounded-3xl">
        <Markdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  showLineNumbers={true}
                  style={prism}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                // else return inline code
                className = "font-mono bg-gray-300 rounded-md p-0.5",
                <a className={className} {...props}>
                  {children}
                </a>
              );
            }
          }}
          // component for link
    
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
}

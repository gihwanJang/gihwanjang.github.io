import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

const Post: React.FC = () => {
  const { "*": filePath } = useParams<{ "*": string }>();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (filePath) {
        const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
      fetch(`/${encodedPath}`)
        .then((res) => res.text())
        .then(setContent)
        .catch(console.error);
    }
  }, [filePath]);

  if (!filePath) {
    return <h1>File not found</h1>;
  }

  const components = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      if (!src) return <img alt={alt} />;
      const basePath = filePath.substring(0, filePath.lastIndexOf('/'));
      const resolvedSrc = `/${basePath}/${src}`.replace(/\/+/g, '/').replace(/\/\.\//g, '/');
      return <img src={resolvedSrc} alt={alt} />;
    },
  };

  return (
    <div className="post-content">
        {/* <GoogleAdvertise
        adClient="ca-pub-9500744719024251"
        adSlot="6355071382"
        style={{'display': 'block'}}
        adLayoutKey="-6t+ed+2i-1n-4w"
        adFormat='fluid'
        fullWidthResponsive='true'
      /> */}

      {content ? (
        <MarkdownPreview 
            source={content} 
            components={components} 
            />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Post;
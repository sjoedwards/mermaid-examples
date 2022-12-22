import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
const loadMermaid = (themeCSS) => {
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
  });
  mermaid.contentLoaded();
};

const renderMermaid = async (chart, ref) => {
  // Example of using the API var
  const element = ref.current;
  const insertSvg = function (svgCode) {
    element.innerHTML = svgCode;
  };
  await mermaid.render("graphDiv", chart, insertSvg);
};

const Mermaid = ({ chart }) => {
  const mermaidRenderTarget = useRef(null);

  useEffect(() => {
    loadMermaid();
  }, []);

  useEffect(() => {
    loadMermaid();
    renderMermaid(chart, mermaidRenderTarget);
  }, [chart]);

  return (
    <div ref={mermaidRenderTarget} className="mermaid">
      {chart}
    </div>
  );
};

export default Mermaid;

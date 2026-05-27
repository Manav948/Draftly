import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";
import { ImageNodeView } from "./ImageNodeView";

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        parseHTML: (element) =>
          element.style.width || element.getAttribute("width") || "100%",
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
            style: `width: ${attributes.width}; max-width: 100%;`,
          };
        },
      },
      height: {
        default: "auto",
        parseHTML: (element) =>
          element.style.height || element.getAttribute("height") || "auto",
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
            style: `height: ${attributes.height};`,
          };
        },
      },
      alignment: {
        default: "center",
        parseHTML: (element) => {
          const alignment = element.getAttribute("data-alignment");
          if (alignment) return alignment;

          // Fallback parsing from styles
          const marginLeft = element.style.marginLeft;
          const marginRight = element.style.marginRight;
          if (marginLeft === "0px" || marginLeft === "0") return "left";
          if (marginRight === "0px" || marginRight === "0") return "right";
          return "center";
        },
        renderHTML: (attributes) => {
          return {
            "data-alignment": attributes.alignment,
          };
        },
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const { width, height, alignment } = node.attrs;

    let marginStyle = "margin-left: auto; margin-right: auto;";
    if (alignment === "left") {
      marginStyle = "margin-left: 0; margin-right: auto;";
    } else if (alignment === "right") {
      marginStyle = "margin-left: auto; margin-right: 0;";
    }

    const style = `width: ${width}; height: ${height}; max-width: 100%; display: block; ${marginStyle}`;

    return [
      "img",
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        {
          style,
          "data-alignment": alignment,
        }
      ),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

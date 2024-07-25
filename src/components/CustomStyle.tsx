import { Node, mergeAttributes } from "@tiptap/core";

const CustomParagraph = Node.create({
  name: "paragraph",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "p",
        getAttrs: (node) => {
          if (typeof node === "string") {
            return {};
          }
          const dom = node as HTMLElement;
          return { class: dom.getAttribute("class") };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["p", mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      class: {
        default: null,
      },
    };
  },
});

export default CustomParagraph;

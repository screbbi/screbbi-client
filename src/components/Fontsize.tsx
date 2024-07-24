import { Mark, markInputRule, markPasteRule } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Mark.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ""),
        renderHTML: (attributes) => {
          if (!attributes.size) {
            return {};
          }

          return {
            style: `font-size: ${attributes.size}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[style*=font-size]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ chain }) => {
          return chain().setMark(this.name, { size }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().unsetMark(this.name).run();
        },
    };
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: /<span style="font-size:([^"]+)">(.+?)<\/span>/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            size: match[1],
          };
        },
      }),
    ];
  },

  addInputRules() {
    return [
      markInputRule({
        find: /<span style="font-size:([^"]+)">(.+?)<\/span>/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            size: match[1],
          };
        },
      }),
    ];
  },
});

export default FontSize;

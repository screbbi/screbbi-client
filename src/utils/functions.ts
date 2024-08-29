export function copyToClipboard(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document?.execCommand("copy");
  document.body.removeChild(textarea);
}

export const formatDate = (date: any) => {
  const newDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat("en-US", options).format(newDate);
};

export const numberFormat = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

export const openTourVideo = () => {
  window.open("https://www.youtube.com/watch?v=GRM3IkkrsZQ", "_blank");
};

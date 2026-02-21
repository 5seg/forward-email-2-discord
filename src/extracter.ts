const extractLinks = (markdown: string) => {
  const regex = /\[(.*?)\]\((.*?)\s?(?:"(.*?)")?\)/g;
  const links = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    if (match[1].length <= 0) continue;
    if (match[1].startsWith("![")) continue;
    links.push([match[1], match[2]]);
  }
  return links;
};

export const extractDiscordVerifyLink = (markdown: string) => {
  const result = extractLinks(markdown).find((x) => x[0] === "ログインを認証");
  return result ? result[1] : null;
};

const extractLinks = (str: string) => {
  const regex = /([^\r\n]+)\r?\n\[(https?:\/\/[^\]\r\n]+)\]/g;
  const links = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    // for inspect
    // console.log(match[1], "\n", match[2]);
    if (match[1].length <= 0) continue;
    if (match[1].startsWith("![")) continue;
    links.push([match[1], match[2]]);
  }
  return links;
};

export const extractDiscordVerifyLink = (str: string) => {
  const result = extractLinks(str).filter((arr) => {
    if (arr[0] === "ログインを認証") return true;
    if (arr[0] === "Verify Email") return true;
    return false;
  });
  return result ? result[1] : null;
};

export const parseXLoginAlert = (text: string) => {
  const lines = text.split("\n").filter((x) => x.length > 0);
  const account = (() => {
    const ja = lines.find((x) => x.startsWith("ご利用のアカウント"))?.slice(10);
    const en = lines.find((x) => x.startsWith("We noticed a login"))?.slice(35);
    return ja ?? en ?? "不明";
  })();
  const location = (() => {
    const ja = lines.find((x) => x.startsWith("場所*"))?.slice(4);
    const en = lines.find((x) => x.startsWith("Location*"))?.slice(10);
    return ja ?? en ?? "不明";
  })();
  return {
    account,
    location,
  };
};

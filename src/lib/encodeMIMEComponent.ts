function escapeQuoteOrSolidus(str: string) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    result += char === '"' || char === "\\" ? `\\${char}` : char;
  }
  return result;
}

function encodeMIMEComponent(value: string) {
  if (value.length === 0) return '""';
  const needsEncoding = /[^!#$%&'*+\-.^_`|~A-Za-z0-9]/g.test(value);
  if (!needsEncoding) return value;
  const escaped = escapeQuoteOrSolidus(value);
  return `"${escaped}"`;
}

export = encodeMIMEComponent;

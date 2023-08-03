import encodeMIMEComponent from "./lib/encodeMIMEComponent.js";

export = class MIMEParams {
  #data = new Map<string, string>();

  has(name: string) {
    return this.#data.has(name);
  }

  get(name: string): string | null {
    return this.#data.get(name) ?? null;
  }

  set(name: string, value: string) {
    let match: RegExpExecArray | null;
    if ((match = /[^!#$%&'*+\-.^_`|~A-Za-z0-9]/g.exec(name))) {
      throw new DOMException(
        `Invalid character in MIME parameter name: ${match[0]}`,
        "SyntaxError",
      );
    }
    if ((match = /[^\t\u0020-~\u0080-\u00FF]/g.exec(value))) {
      throw new DOMException(
        `Invalid character in MIME parameter value: ${match[0]}`,
        "SyntaxError",
      );
    }
    this.#data.set(name, value);
  }

  delete(name: string) {
    this.#data.delete(name);
  }

  entries() {
    return this.#data.entries();
  }

  [Symbol.iterator]() {
    return this.#data[Symbol.iterator]();
  }

  keys() {
    return this.#data.keys();
  }

  values() {
    return this.#data.values();
  }

  toString() {
    return [...this.#data]
      .map(([key, value]) => `${key}=${encodeMIMEComponent(value)}`)
      .join(";");
  }

  toJSON() {
    return this.toString();
  }
};

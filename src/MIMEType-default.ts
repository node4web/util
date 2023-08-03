import MIMEParams from "./MIMEParams-default.js";

export = class MIMEType {
  #type: string;
  #subtype: string;
  #params = new MIMEParams();
  constructor(x: string) {
    const [, type, subtype, params] =
      /^\s*([!#$%&'*+\-.^_`|~A-Za-z0-9]+)\/([!#$%&'*+\-.^_`|~A-Za-z0-9]+)(?:;(.*?))?\s*$/g.exec(
        x,
      ) || [];
    if (!type || !subtype) {
      throw new DOMException(`${x} is not a valid MIME type`, "SytaxError");
    }
    this.#type = type.toLowerCase();
    this.#subtype = subtype.toLowerCase();
    if (params) {
      const pairs = params.split(";");
      for (const pair of pairs) {
        let [key, value] = pair.split("=");
        if (key && value) {
          value = value.replace(/^"(.*)"$/, "$1");
          this.#params.set(key.trim(), value.trim());
        }
      }
    }
  }

  get type() {
    return this.#type;
  }
  set type(type: string) {
    if (/[^!#$%&'*+\-.^_`|~A-Za-z0-9]/g.test(type)) {
      throw new DOMException(`${type} is not a valid MIME type`, "SyntaxError");
    }
    this.#type = type.toLowerCase();
  }

  get subtype() {
    return this.#subtype;
  }
  set subtype(subtype: string) {
    if (/[^!#$%&'*+\-.^_`|~A-Za-z0-9]/g.test(subtype)) {
      throw new DOMException(
        `${subtype} is not a valid MIME subtype`,
        "SyntaxError",
      );
    }
    this.#subtype = subtype.toLowerCase();
  }

  get essence() {
    return `${this.#type}/${this.#subtype}`;
  }

  get params() {
    return this.#params;
  }

  toString() {
    const paramsString = this.#params.toString();
    if (paramsString) {
      return `${this.essence};${paramsString}`;
    } else {
      return this.essence;
    }
  }

  toJSON() {
    return this.toString();
  }
};

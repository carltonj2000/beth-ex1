// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __reExport = (target, mod, secondTarget) => {
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(target, key) && key !== "default")
      __defProp(target, key, {
        get: () => mod[key],
        enumerable: true
      });
  if (secondTarget) {
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(secondTarget, key) && key !== "default")
        __defProp(secondTarget, key, {
          get: () => mod[key],
          enumerable: true
        });
    return secondTarget;
  }
};
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = (id) => {
  return import.meta.require(id);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/@kitajs/html/index.js
var require_html = __commonJS((exports, module) => {
  var isUpper = function(input, index) {
    const code = input.charCodeAt(index);
    return code >= 65 && code <= 90;
  };
  var toKebabCase = function(camel) {
    if (!CAMEL_REGEX.test(camel)) {
      return camel;
    }
    const length = camel.length;
    let start = 0;
    let end = 0;
    let kebab = "";
    let prev = true;
    let curr = isUpper(camel, 0);
    let next;
    for (;end < length; end++) {
      next = isUpper(camel, end + 1);
      if (!prev && curr && !next) {
        kebab += camel.slice(start, end) + "-" + camel[end].toLowerCase();
        start = end + 1;
      }
      prev = curr;
      curr = next;
    }
    kebab += camel.slice(start, end);
    return kebab;
  };
  var isVoidElement = function(tag) {
    return tag === "meta" || tag === "link" || tag === "img" || tag === "br" || tag === "input" || tag === "hr" || tag === "area" || tag === "base" || tag === "col" || tag === "command" || tag === "embed" || tag === "keygen" || tag === "param" || tag === "source" || tag === "track" || tag === "wbr";
  };
  var styleToString = function(style) {
    if (typeof style === "string") {
      let end2 = style.indexOf('"');
      if (end2 === -1) {
        return style;
      }
      const length2 = style.length;
      let escaped = "";
      let start2 = 0;
      for (;end2 < length2; end2++) {
        if (style[end2] === '"') {
          escaped += style.slice(start2, end2) + "&#34;";
          start2 = end2 + 1;
        }
      }
      escaped += style.slice(start2, end2);
      return escaped;
    }
    const keys = Object.keys(style);
    const length = keys.length;
    let key, value, end, start;
    let index = 0;
    let result = "";
    for (;index < length; index++) {
      key = keys[index];
      value = style[key];
      if (value === null || value === undefined) {
        continue;
      }
      result += toKebabCase(key) + ":";
      if (typeof value !== "string") {
        result += value.toString() + ";";
        continue;
      }
      end = value.indexOf('"');
      if (end === -1) {
        result += value + ";";
        continue;
      }
      const length2 = value.length;
      start = 0;
      for (;end < length2; end++) {
        if (value[end] === '"') {
          result += value.slice(start, end) + "&#34;";
          start = end + 1;
        }
      }
      result += value.slice(start, end) + ";";
    }
    return result;
  };
  var attributesToString = function(attributes) {
    const keys = Object.keys(attributes);
    const length = keys.length;
    let key, value, type, end, start, classItems, valueLength;
    let result = "";
    let index = 0;
    for (;index < length; index++) {
      key = keys[index];
      if (key === "children" || key === "safe") {
        continue;
      }
      value = attributes[key];
      if (key === "className") {
        if (attributes.class !== undefined) {
          continue;
        }
        key = "class";
      } else if (key === "class" && Array.isArray(value)) {
        classItems = value;
        valueLength = value.length;
        value = "";
        for (let i8 = 0;i8 < valueLength; i8++) {
          if (classItems[i8] && classItems[i8].length > 0) {
            if (value) {
              value += " " + classItems[i8].trim();
            } else {
              value += classItems[i8].trim();
            }
          }
        }
        if (value.length === 0) {
          continue;
        }
      } else if (key === "style") {
        result += ' style="' + styleToString(value) + '"';
        continue;
      }
      type = typeof value;
      if (type === "boolean") {
        if (value) {
          result += " " + key;
        }
        continue;
      }
      if (value === null || value === undefined) {
        continue;
      }
      result += " " + key;
      if (type !== "string") {
        if (type !== "object") {
          result += '="' + value.toString() + '"';
          continue;
        }
        if (value instanceof Date) {
          result += '="' + value.toISOString() + '"';
          continue;
        }
        value = value.toString();
      }
      end = value.indexOf('"');
      if (end === -1) {
        result += '="' + value + '"';
        continue;
      }
      result += '="';
      valueLength = value.length;
      start = 0;
      for (;end < valueLength; end++) {
        if (value[end] === '"') {
          result += value.slice(start, end) + "&#34;";
          start = end + 1;
        }
      }
      result += value.slice(start, end) + '"';
    }
    return result;
  };
  var contentsToString = function(contents, escape) {
    let length = contents.length;
    let result = "";
    let content;
    let index = 0;
    for (;index < length; index++) {
      content = contents[index];
      if (typeof content !== "string") {
        if (!content && content !== 0) {
          continue;
        }
        if (content.then) {
          return Promise.all(contents.slice(index)).then(function resolveAsyncContent(resolved) {
            resolved.unshift(result);
            return contentsToString(resolved, escape);
          });
        }
        if (Array.isArray(content)) {
          contents.splice(index--, 1, ...content);
          length += content.length - 1;
          continue;
        }
      }
      result += content;
    }
    if (escape === true) {
      return escapeHtml(result);
    }
    return result;
  };
  var createElement = function(name, attrs, ...children) {
    const hasAttrs = attrs !== null;
    if (typeof name === "function") {
      if (!hasAttrs) {
        attrs = { children: children.length > 1 ? children : children[0] };
      } else if (attrs.children === undefined) {
        attrs.children = children.length > 1 ? children : children[0];
      }
      return name(attrs);
    }
    if (hasAttrs && name === "tag") {
      name = String(attrs.of);
      delete attrs.of;
    }
    const attributes = hasAttrs ? attributesToString(attrs) : "";
    if (children.length === 0 && isVoidElement(name)) {
      return "<" + name + attributes + "/>";
    }
    const contents = contentsToString(children, hasAttrs && attrs.safe);
    if (typeof contents === "string") {
      return "<" + name + attributes + ">" + contents + "</" + name + ">";
    }
    return contents.then(function asyncChildren(child) {
      return "<" + name + attributes + ">" + child + "</" + name + ">";
    });
  };
  var Fragment = function(props) {
    return Html.contentsToString([props.children]);
  };
  var compile = function(htmlFn, strict = true, separator = "/*\0*/") {
    if (typeof htmlFn !== "function") {
      throw new Error("The first argument must be a function.");
    }
    const properties = new Set;
    const html = htmlFn(new Proxy({}, {
      get(_, name) {
        properties.add(name);
        const isChildren = name === "children";
        let access = `args[${separator}\`${name.toString()}\`${separator}]`;
        if (isChildren) {
          access = `Array.isArray(${access}) ? ${access}.join(${separator}\`\`${separator}) : ${access}`;
        }
        return `\`${separator} + (${access} || ${strict && !isChildren ? `throwPropertyNotFound(${separator}\`${name.toString()}\`${separator})` : `${separator}\`\`${separator}`}) + ${separator}\``;
      }
    }));
    if (typeof html !== "string") {
      throw new Error("You cannot use compile() with async components.");
    }
    const sepLength = separator.length;
    const length = html.length;
    let body = "";
    let nextStart = 0;
    let index = 0;
    for (;index < length; index++) {
      if (html[index] === "`" && html.slice(index - sepLength, index) !== separator && html.slice(index + 1, index + sepLength + 1) !== separator) {
        body += html.slice(nextStart, index) + "\\`";
        nextStart = index + 1;
        continue;
      }
    }
    body += html.slice(nextStart);
    if (strict) {
      return Function("args", 'if (args === undefined) { throw new Error("The arguments object was not provided.") };\nfunction throwPropertyNotFound(name) { throw new Error("Property " + name + " was not provided.") };\n' + `return \`${body}\``);
    }
    return Function("args", "if (args === undefined) { args = Object.create(null) };\n" + `return \`${body}\``);
  };
  var ESCAPED_REGEX = /[<"'&]/;
  var CAMEL_REGEX = /[a-z][A-Z]/;
  var escapeHtml = function(value) {
    if (typeof value !== "string") {
      value = value.toString();
    }
    if (!ESCAPED_REGEX.test(value)) {
      return value;
    }
    const length = value.length;
    let escaped = "";
    let start = 0;
    let end = 0;
    for (;end < length; end++) {
      switch (value[end]) {
        case "&":
          escaped += value.slice(start, end) + "&amp;";
          start = end + 1;
          continue;
        case "<":
          escaped += value.slice(start, end) + "&lt;";
          start = end + 1;
          continue;
        case '"':
          escaped += value.slice(start, end) + "&#34;";
          start = end + 1;
          continue;
        case "'":
          escaped += value.slice(start, end) + "&#39;";
          start = end + 1;
          continue;
      }
    }
    escaped += value.slice(start, end);
    return escaped;
  };
  if (typeof Bun !== "undefined")
    escapeHtml = Bun.escapeHTML;
  var Html = {
    escapeHtml,
    isVoidElement,
    attributesToString,
    toKebabCase,
    isUpper,
    styleToString,
    createElement,
    h: createElement,
    contentsToString,
    compile,
    Fragment
  };
  module.exports = Html;
  module.exports.Html = Html;
  module.exports.default = Html;
});

// node_modules/@kitajs/html/register.js
var require_register = __commonJS(() => {
  var root;
  try {
    root = Function("return this")();
  } catch (_) {
    root = window;
  }
  if (!root.Html) {
    root.Html = require_html();
  }
  if (root.Html.default) {
    root.Html = root.Html.default;
  }
});

// node_modules/typed-html/dist/src/elements.js
var require_elements = __commonJS((exports) => {
  var createElement = function(name, attributes = {}, ...contents) {
    const children = attributes && attributes.children || contents;
    if (typeof name === "function") {
      return name(children ? { children, ...attributes } : attributes, contents);
    } else {
      const tagName = toKebabCase(name);
      if (isVoidElement(tagName) && !contents.length) {
        return `<${tagName}${attributesToString(attributes)}>`;
      } else {
        return `<${tagName}${attributesToString(attributes)}>${contentsToString3(contents)}</${tagName}>`;
      }
    }
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createElement = undefined;
  var capitalACharCode = "A".charCodeAt(0);
  var capitalZCharCode = "Z".charCodeAt(0);
  var isUpper = (input, index) => {
    const charCode = input.charCodeAt(index);
    return capitalACharCode <= charCode && capitalZCharCode >= charCode;
  };
  var toKebabCase = (camelCased) => {
    let kebabCased = "";
    for (let i8 = 0;i8 < camelCased.length; i8++) {
      const prevUpperCased = i8 > 0 ? isUpper(camelCased, i8 - 1) : true;
      const currentUpperCased = isUpper(camelCased, i8);
      const nextUpperCased = i8 < camelCased.length - 1 ? isUpper(camelCased, i8 + 1) : true;
      if (!prevUpperCased && currentUpperCased || currentUpperCased && !nextUpperCased) {
        kebabCased += "-";
        kebabCased += camelCased[i8].toLowerCase();
      } else {
        kebabCased += camelCased[i8];
      }
    }
    return kebabCased;
  };
  var escapeAttrNodeValue = (value) => {
    return value.replace(/(&)|(")|(\u00A0)/g, function(_, amp, quote) {
      if (amp)
        return "&amp;";
      if (quote)
        return "&quot;";
      return "&nbsp;";
    });
  };
  var attributeToString = (attributes) => (name) => {
    const value = attributes[name];
    const formattedName = toKebabCase(name);
    const makeAttribute = (value2) => `${formattedName}="${value2}"`;
    if (value instanceof Date) {
      return makeAttribute(value.toISOString());
    } else
      switch (typeof value) {
        case "boolean":
          if (value) {
            return formattedName;
          } else {
            return "";
          }
        default:
          return makeAttribute(escapeAttrNodeValue(value.toString()));
      }
  };
  var attributesToString = (attributes) => {
    if (attributes) {
      return " " + Object.keys(attributes).filter((attribute) => attribute !== "children").map(attributeToString(attributes)).filter((attribute) => attribute.length).join(" ");
    } else {
      return "";
    }
  };
  var contentsToString3 = (contents) => {
    if (contents) {
      return contents.map((elements) => Array.isArray(elements) ? elements.join("\n") : elements).join("\n");
    } else {
      return "";
    }
  };
  var isVoidElement = (tagName) => {
    return [
      "area",
      "base",
      "br",
      "col",
      "command",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr"
    ].indexOf(tagName) > -1;
  };
  exports.createElement = createElement;
});

// node_modules/@neon-rs/load/dist/index.js
var require_dist = __commonJS((exports) => {
  var currentTarget = function() {
    let os = null;
    switch (process.platform) {
      case "android":
        switch (process.arch) {
          case "arm":
            return "android-arm-eabi";
          case "arm64":
            return "android-arm64";
        }
        os = "Android";
        break;
      case "win32":
        switch (process.arch) {
          case "x64":
            return "win32-x64-msvc";
          case "arm64":
            return "win32-arm64-msvc";
          case "ia32":
            return "win32-ia32-msvc";
        }
        os = "Windows";
        break;
      case "darwin":
        switch (process.arch) {
          case "x64":
            return "darwin-x64";
          case "arm64":
            return "darwin-arm64";
        }
        os = "macOS";
        break;
      case "linux":
        switch (process.arch) {
          case "x64":
          case "arm64":
            return isGlibc() ? `linux-${process.arch}-gnu` : `linux-${process.arch}-musl`;
          case "arm":
            return "linux-arm-gnueabihf";
        }
        os = "Linux";
        break;
      case "freebsd":
        if (process.arch === "x64") {
          return "freebsd-x64";
        }
        os = "FreeBSD";
        break;
    }
    if (os) {
      throw new Error(`Neon: unsupported ${os} architecture: ${process.arch}`);
    }
    throw new Error(`Neon: unsupported system: ${process.platform}`);
  };
  var isGlibc = function() {
    const report = process.report?.getReport();
    if (typeof report !== "object" || !report || !("header" in report)) {
      return false;
    }
    const header = report.header;
    return typeof header === "object" && !!header && "glibcVersionRuntime" in header;
  };
  var load = function(dirname) {
    const m8 = path.join(dirname, "index.node");
    return fs.existsSync(m8) ? import.meta.require(m8) : null;
  };
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o10, m8, k10, k22) {
    if (k22 === undefined)
      k22 = k10;
    var desc2 = Object.getOwnPropertyDescriptor(m8, k10);
    if (!desc2 || ("get" in desc2 ? !m8.__esModule : desc2.writable || desc2.configurable)) {
      desc2 = { enumerable: true, get: function() {
        return m8[k10];
      } };
    }
    Object.defineProperty(o10, k22, desc2);
  } : function(o10, m8, k10, k22) {
    if (k22 === undefined)
      k22 = k10;
    o10[k22] = m8[k10];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o10, v) {
    Object.defineProperty(o10, "default", { enumerable: true, value: v });
  } : function(o10, v) {
    o10["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k10 in mod)
        if (k10 !== "default" && Object.prototype.hasOwnProperty.call(mod, k10))
          __createBinding(result, mod, k10);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.load = exports.currentTarget = undefined;
  var path = __importStar(import.meta.require("path"));
  var fs = __importStar(import.meta.require("fs"));
  exports.currentTarget = currentTarget;
  exports.load = load;
});

// node_modules/libsql/sqlite-error.js
var require_sqlite_error = __commonJS((exports, module) => {
  var SqliteError = function(message, code, rawCode) {
    if (new.target !== SqliteError) {
      return new SqliteError(message, code);
    }
    if (typeof code !== "string") {
      throw new TypeError("Expected second argument to be a string");
    }
    Error.call(this, message);
    descriptor.value = "" + message;
    Object.defineProperty(this, "message", descriptor);
    Error.captureStackTrace(this, SqliteError);
    this.code = code;
    this.rawCode = rawCode;
  };
  var descriptor = { value: "SqliteError", writable: true, enumerable: false, configurable: true };
  Object.setPrototypeOf(SqliteError, Error);
  Object.setPrototypeOf(SqliteError.prototype, Error.prototype);
  Object.defineProperty(SqliteError.prototype, "name", descriptor);
  module.exports = SqliteError;
});

// node_modules/libsql/index.js
var require_libsql = __commonJS((exports, module) => {
  var __dirname = "/renderws/carltonData/cj2024/code/beth/beth-ex1/node_modules/libsql";
  var { load, currentTarget } = require_dist();
  var { familySync, GLIBC } = import.meta.require("detect-libc");
  if (0) {
  }
  var target = currentTarget();
  if (familySync() == GLIBC) {
    switch (target) {
      case "linux-x64-musl":
        target = "linux-x64-gnu";
        break;
      case "linux-arm64-musl":
        target = "linux-arm64-gnu";
        break;
    }
  }
  var {
    databaseOpen,
    databaseOpenWithRpcSync,
    databaseInTransaction,
    databaseClose,
    databaseSyncSync,
    databaseExecSync,
    databasePrepareSync,
    databaseDefaultSafeIntegers,
    statementRaw,
    statementGet,
    statementRun,
    statementRowsSync,
    statementColumns,
    statementSafeIntegers,
    rowsNext
  } = load(__dirname) || import.meta.require(`@libsql/${target}`);
  var SqliteError = require_sqlite_error();

  class Database {
    constructor(path, opts) {
      if (opts && opts.syncUrl) {
        var authToken = "";
        if (opts.syncAuth) {
          console.warn("Warning: The `syncAuth` option is deprecated, please use `authToken` option instead.");
          authToken = opts.syncAuth;
        } else if (opts.authToken) {
          authToken = opts.authToken;
        }
        this.db = databaseOpenWithRpcSync(path, opts.syncUrl, authToken);
      } else {
        const authToken2 = opts?.authToken ?? "";
        this.db = databaseOpen(path, authToken2);
      }
      this.memory = path === ":memory:";
      this.readonly = false;
      this.name = "";
      this.open = true;
      const db = this.db;
      Object.defineProperties(this, {
        inTransaction: {
          get() {
            return databaseInTransaction(db);
          }
        }
      });
    }
    sync() {
      databaseSyncSync.call(this.db);
    }
    prepare(sql7) {
      try {
        const stmt = databasePrepareSync.call(this.db, sql7);
        return new Statement(stmt);
      } catch (err) {
        throw new SqliteError(err.message, err.code, err.rawCode);
      }
    }
    transaction(fn) {
      if (typeof fn !== "function")
        throw new TypeError("Expected first argument to be a function");
      return (...bindParameters) => {
        this.exec("BEGIN");
        try {
          const result = fn(...bindParameters);
          this.exec("COMMIT");
          return result;
        } catch (err) {
          this.exec("ROLLBACK");
          throw err;
        }
      };
    }
    pragma(source, options2) {
      throw new Error("not implemented");
    }
    backup(filename, options2) {
      throw new Error("not implemented");
    }
    serialize(options2) {
      throw new Error("not implemented");
    }
    function(name, options2, fn) {
      if (options2 == null)
        options2 = {};
      if (typeof options2 === "function") {
        fn = options2;
        options2 = {};
      }
      if (typeof name !== "string")
        throw new TypeError("Expected first argument to be a string");
      if (typeof fn !== "function")
        throw new TypeError("Expected last argument to be a function");
      if (typeof options2 !== "object")
        throw new TypeError("Expected second argument to be an options object");
      if (!name)
        throw new TypeError("User-defined function name cannot be an empty string");
      throw new Error("not implemented");
    }
    aggregate(name, options2) {
      if (typeof name !== "string")
        throw new TypeError("Expected first argument to be a string");
      if (typeof options2 !== "object" || options2 === null)
        throw new TypeError("Expected second argument to be an options object");
      if (!name)
        throw new TypeError("User-defined function name cannot be an empty string");
      throw new Error("not implemented");
    }
    table(name, factory) {
      if (typeof name !== "string")
        throw new TypeError("Expected first argument to be a string");
      if (!name)
        throw new TypeError("Virtual table module name cannot be an empty string");
      throw new Error("not implemented");
    }
    loadExtension(...args) {
      throw new Error("not implemented");
    }
    exec(sql7) {
      try {
        databaseExecSync.call(this.db, sql7);
      } catch (err) {
        throw new SqliteError(err.message, err.code, err.rawCode);
      }
    }
    close() {
      databaseClose.call(this.db);
      this.open = false;
    }
    defaultSafeIntegers(toggle) {
      databaseDefaultSafeIntegers.call(this.db, toggle ?? true);
      return this;
    }
    unsafeMode(...args) {
      throw new Error("not implemented");
    }
  }

  class Statement {
    constructor(stmt) {
      this.stmt = stmt;
    }
    raw(raw) {
      statementRaw.call(this.stmt, raw ?? true);
      return this;
    }
    run(...bindParameters) {
      try {
        if (bindParameters.length == 1 && typeof bindParameters[0] === "object") {
          return statementRun.call(this.stmt, bindParameters[0]);
        } else {
          return statementRun.call(this.stmt, bindParameters.flat());
        }
      } catch (err) {
        throw new SqliteError(err.message, err.code, err.rawCode);
      }
    }
    get(...bindParameters) {
      if (bindParameters.length == 1 && typeof bindParameters[0] === "object") {
        return statementGet.call(this.stmt, bindParameters[0]);
      } else {
        return statementGet.call(this.stmt, bindParameters.flat());
      }
    }
    iterate(...bindParameters) {
      var rows = undefined;
      if (bindParameters.length == 1 && typeof bindParameters[0] === "object") {
        rows = statementRowsSync.call(this.stmt, bindParameters[0]);
      } else {
        rows = statementRowsSync.call(this.stmt, bindParameters.flat());
      }
      const iter = {
        next() {
          const row = rowsNext.call(rows);
          if (!row) {
            return { done: true };
          }
          return { value: row, done: false };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
      return iter;
    }
    all(...bindParameters) {
      const result = [];
      for (const row of this.iterate(...bindParameters)) {
        result.push(row);
      }
      return result;
    }
    columns() {
      return statementColumns.call(this.stmt);
    }
    safeIntegers(toggle) {
      statementSafeIntegers.call(this.stmt, toggle ?? true);
      return this;
    }
  }
  module.exports = Database;
  module.exports.SqliteError = SqliteError;
});

// node_modules/@elysiajs/html/dist/index.js
var exports_dist = {};
__export(exports_dist, {
  isTagHtml: () => {
    {
      return isTagHtml;
    }
  },
  isHtml: () => {
    {
      return isHtml;
    }
  },
  html: () => {
    {
      return html;
    }
  },
  Suspense: () => {
    {
      return $Suspense;
    }
  },
  Html: () => {
    {
      return import_html.Html;
    }
  },
  ErrorBoundary: () => {
    {
      return $ErrorBoundary;
    }
  }
});

// node_modules/@elysiajs/html/dist/html.js
var exports_html = {};
__export(exports_html, {
  html: () => {
    {
      return html;
    }
  }
});

// node_modules/elysia/dist/bun/index.js
var y$ = function($) {
  return x0($) && Symbol.asyncIterator in $;
};
var d$ = function($) {
  return x0($) && Symbol.iterator in $;
};
var M1 = function($) {
  return ArrayBuffer.isView($);
};
var v$ = function($) {
  return $ instanceof Promise;
};
var K8 = function($) {
  return $ instanceof Uint8Array;
};
var a0 = function($) {
  return $ instanceof Date && Number.isFinite($.getTime());
};
var h = function($, X) {
  return X in $;
};
var Y0 = function($) {
  return x0($) && o8($.constructor) && $.constructor.name === "Object";
};
var x0 = function($) {
  return $ !== null && typeof $ === "object";
};
var f = function($) {
  return Array.isArray($) && !ArrayBuffer.isView($);
};
var z0 = function($) {
  return $ === undefined;
};
var d1 = function($) {
  return $ === null;
};
var E1 = function($) {
  return typeof $ === "boolean";
};
var k = function($) {
  return typeof $ === "number";
};
var p$ = function($) {
  return k($) && Number.isInteger($);
};
var k0 = function($) {
  return typeof $ === "bigint";
};
var p = function($) {
  return typeof $ === "string";
};
var o8 = function($) {
  return typeof $ === "function";
};
var l0 = function($) {
  return typeof $ === "symbol";
};
var e0 = function($) {
  return k0($) || E1($) || d1($) || k($) || p($) || l0($) || z0($);
};
var N4 = function() {
  return new Map(n8);
};
var O4 = function() {
  return n8.clear();
};
var S4 = function($) {
  return n8.delete($);
};
var _4 = function($) {
  return n8.has($);
};
var P4 = function($, X) {
  n8.set($, X);
};
var L4 = function($) {
  return n8.get($);
};
var C4 = function() {
  return new Map(l8);
};
var F4 = function() {
  return l8.clear();
};
var b4 = function($) {
  return l8.delete($);
};
var R4 = function($) {
  return l8.has($);
};
var j4 = function($, X) {
  l8.set($, X);
};
var K4 = function($) {
  return l8.get($);
};
var t8 = function($ = {}) {
  return { ...$, [H]: $[H] ?? "Unsafe" };
};
var m = function($) {
  return { [H]: "MappedResult", properties: $ };
};
var bX = function($) {
  return F0($) && !X1($) && !E8($) && Symbol.asyncIterator in $;
};
var X1 = function($) {
  return Array.isArray($);
};
var h$ = function($) {
  return typeof $ === "bigint";
};
var V8 = function($) {
  return typeof $ === "boolean";
};
var m$ = function($) {
  return $ instanceof globalThis.Date;
};
var RX = function($) {
  return typeof $ === "function";
};
var jX = function($) {
  return F0($) && !X1($) && !E8($) && Symbol.iterator in $;
};
var KX = function($) {
  return $ === null;
};
var p1 = function($) {
  return typeof $ === "number";
};
var F0 = function($) {
  return typeof $ === "object" && $ !== null;
};
var VX = function($) {
  return $ instanceof globalThis.RegExp;
};
var M0 = function($) {
  return typeof $ === "string";
};
var EX = function($) {
  return typeof $ === "symbol";
};
var E8 = function($) {
  return $ instanceof globalThis.Uint8Array;
};
var G0 = function($) {
  return $ === undefined;
};
var JY = function($) {
  return S6($);
};
var _0 = function($) {
  return $.map((X) => C(X));
};
var C = function($, X = {}) {
  return { ...JY($), ...X };
};
var A0 = function($, X) {
  return X.reduce((J, Y) => T4(J, Y), $);
};
var s8 = function($, X = {}) {
  return { ...X, [H]: "Array", type: "array", items: C($) };
};
var r8 = function($, X = {}) {
  return { ...X, [H]: "AsyncIterator", type: "AsyncIterator", items: C($) };
};
var a8 = function($, X, J) {
  return { ...J, [H]: "Constructor", type: "Constructor", parameters: _0($), returns: C(X) };
};
var h1 = function($, X, J) {
  return { ...J, [H]: "Function", type: "Function", parameters: _0($), returns: C(X) };
};
var e = function($ = {}) {
  return { ...$, [H]: "Never", not: {} };
};
var kX = function($) {
  return F0($) && $[D8] === "Readonly";
};
var I1 = function($) {
  return F0($) && $[$1] === "Optional";
};
var zY = function($) {
  return i($, "Any") && X0($.$id);
};
var m1 = function($) {
  return i($, "Array") && $.type === "array" && X0($.$id) && g($.items) && q0($.minItems) && q0($.maxItems) && xX($.uniqueItems) && QY($.contains) && q0($.minContains) && q0($.maxContains);
};
var e8 = function($) {
  return i($, "AsyncIterator") && $.type === "AsyncIterator" && X0($.$id) && g($.items);
};
var P6 = function($) {
  return i($, "BigInt") && $.type === "bigint" && X0($.$id) && i$($.exclusiveMaximum) && i$($.exclusiveMinimum) && i$($.maximum) && i$($.minimum) && i$($.multipleOf);
};
var L6 = function($) {
  return i($, "Boolean") && $.type === "boolean" && X0($.$id);
};
var $$ = function($) {
  return i($, "Constructor") && $.type === "Constructor" && X0($.$id) && X1($.parameters) && $.parameters.every((X) => g(X)) && g($.returns);
};
var qY = function($) {
  return i($, "Date") && $.type === "Date" && X0($.$id) && q0($.exclusiveMaximumTimestamp) && q0($.exclusiveMinimumTimestamp) && q0($.maximumTimestamp) && q0($.minimumTimestamp) && q0($.multipleOfTimestamp);
};
var X$ = function($) {
  return i($, "Function") && $.type === "Function" && X0($.$id) && X1($.parameters) && $.parameters.every((X) => g(X)) && g($.returns);
};
var A8 = function($) {
  return i($, "Integer") && $.type === "integer" && X0($.$id) && q0($.exclusiveMaximum) && q0($.exclusiveMinimum) && q0($.maximum) && q0($.minimum) && q0($.multipleOf);
};
var gX = function($) {
  return F0($) && Object.entries($).every(([X, J]) => IX(X) && g(J));
};
var N0 = function($) {
  return i($, "Intersect") && (M0($.type) && $.type !== "object" ? false : true) && X1($.allOf) && $.allOf.every((X) => g(X) && !r(X)) && X0($.type) && (xX($.unevaluatedProperties) || QY($.unevaluatedProperties)) && X0($.$id);
};
var J$ = function($) {
  return i($, "Iterator") && $.type === "Iterator" && X0($.$id) && g($.items);
};
var i = function($, X) {
  return F0($) && H in $ && $[H] === X;
};
var BY = function($) {
  return U1($) && M0($.const);
};
var MY = function($) {
  return U1($) && p1($.const);
};
var v4 = function($) {
  return U1($) && V8($.const);
};
var U1 = function($) {
  return i($, "Literal") && X0($.$id) && UY($.const);
};
var UY = function($) {
  return V8($) || p1($) || M0($);
};
var Y1 = function($) {
  return i($, "MappedKey") && X1($.keys) && $.keys.every((X) => p1(X) || M0(X));
};
var Z0 = function($) {
  return i($, "MappedResult") && gX($.properties);
};
var C6 = function($) {
  return i($, "Never") && F0($.not) && Object.getOwnPropertyNames($.not).length === 0;
};
var wY = function($) {
  return i($, "Not") && g($.not);
};
var GY = function($) {
  return i($, "Null") && $.type === "null" && X0($.$id);
};
var N8 = function($) {
  return i($, "Number") && $.type === "number" && X0($.$id) && q0($.exclusiveMaximum) && q0($.exclusiveMinimum) && q0($.maximum) && q0($.minimum) && q0($.multipleOf);
};
var O0 = function($) {
  return i($, "Object") && $.type === "object" && X0($.$id) && gX($.properties) && WY($.additionalProperties) && q0($.minProperties) && q0($.maxProperties);
};
var O8 = function($) {
  return i($, "Promise") && $.type === "Promise" && X0($.$id) && g($.item);
};
var F6 = function($) {
  return i($, "Record") && $.type === "object" && X0($.$id) && WY($.additionalProperties) && F0($.patternProperties) && ((X) => {
    const J = Object.getOwnPropertyNames(X.patternProperties);
    return J.length === 1 && ZY(J[0]) && F0(X.patternProperties) && g(X.patternProperties[J[0]]);
  })($);
};
var p4 = function($) {
  return F0($) && S1 in $ && $[S1] === "Recursive";
};
var b6 = function($) {
  return i($, "Ref") && X0($.$id) && M0($.$ref);
};
var R6 = function($) {
  return i($, "RegExp") && X0($.$id) && M0($.source) && M0($.flags);
};
var Y$ = function($) {
  return i($, "String") && $.type === "string" && X0($.$id) && q0($.minLength) && q0($.maxLength) && y4($.pattern) && d4($.format);
};
var HY = function($) {
  return i($, "Symbol") && $.type === "symbol" && X0($.$id);
};
var i0 = function($) {
  return i($, "TemplateLiteral") && $.type === "string" && M0($.pattern) && $.pattern[0] === "^" && $.pattern[$.pattern.length - 1] === "$";
};
var DY = function($) {
  return i($, "This") && X0($.$id) && M0($.$ref);
};
var r = function($) {
  return F0($) && C0 in $;
};
var _1 = function($) {
  return i($, "Tuple") && $.type === "array" && X0($.$id) && p1($.minItems) && p1($.maxItems) && $.minItems === $.maxItems && (G0($.items) && G0($.additionalItems) && $.minItems === 0 || X1($.items) && $.items.every((X) => g(X)));
};
var AY = function($) {
  return i($, "Undefined") && $.type === "undefined" && X0($.$id);
};
var h4 = function($) {
  return u($) && $.anyOf.every((X) => BY(X) || MY(X));
};
var u = function($) {
  return i($, "Union") && X0($.$id) && F0($) && X1($.anyOf) && $.anyOf.every((X) => g(X));
};
var NY = function($) {
  return i($, "Uint8Array") && $.type === "Uint8Array" && X0($.$id) && q0($.minByteLength) && q0($.maxByteLength);
};
var OY = function($) {
  return i($, "Unknown") && X0($.$id);
};
var SY = function($) {
  return i($, "Unsafe");
};
var _Y = function($) {
  return i($, "Void") && $.type === "void" && X0($.$id);
};
var PY = function($) {
  return F0($) && H in $ && M0($[H]) && !f4.includes($[H]);
};
var g = function($) {
  return F0($) && (zY($) || m1($) || L6($) || P6($) || e8($) || $$($) || qY($) || X$($) || A8($) || N0($) || J$($) || U1($) || Y1($) || Z0($) || C6($) || wY($) || GY($) || N8($) || O0($) || O8($) || F6($) || b6($) || R6($) || Y$($) || HY($) || i0($) || DY($) || _1($) || AY($) || u($) || NY($) || OY($) || SY($) || _Y($) || PY($));
};
var u0 = function($, X) {
  const J = X ?? true;
  return Z0($) ? TX($, J) : u4($, J);
};
var TX = function($, X) {
  const J = o4($, X);
  return m(J);
};
var u$ = function($, X) {
  const J = $.every((Z) => O0(Z)), Y = g(X.unevaluatedProperties) ? { unevaluatedProperties: C(X.unevaluatedProperties) } : {};
  return X.unevaluatedProperties === false || g(X.unevaluatedProperties) || J ? { ...X, ...Y, [H]: "Intersect", type: "object", allOf: _0($) } : { ...X, ...Y, [H]: "Intersect", allOf: _0($) };
};
var fX = function($, X = {}) {
  if ($.length === 0)
    return e(X);
  if ($.length === 1)
    return C($[0], X);
  if ($.some((J) => r(J)))
    throw new Error("Cannot intersect transform types");
  return t4($, X);
};
var T0 = function($, X = {}) {
  if ($.length === 0)
    return e(X);
  if ($.length === 1)
    return C($[0], X);
  if ($.some((J) => r(J)))
    throw new Error("Cannot intersect transform types");
  return u$($, X);
};
var c$ = function($, X) {
  return { ...X, [H]: "Union", anyOf: _0($) };
};
var J8 = function($, X = {}) {
  return $.length === 0 ? e(X) : $.length === 1 ? C($[0], X) : a4($, X);
};
var l = function($, X = {}) {
  return $.length === 0 ? e(X) : $.length === 1 ? C($[0], X) : c$($, X);
};
var I8 = function($) {
  return e4($) ? I8($W($)) : XW($) ? YW($) : JW($) ? ZW($) : { type: "const", const: $ };
};
var x8 = function($) {
  return I8($.slice(1, $.length - 1));
};
var S8 = function($) {
  return WW($) || zW($) ? false : QW($) ? true : $.type === "and" ? $.expr.every((X) => S8(X)) : $.type === "or" ? $.expr.every((X) => S8(X)) : $.type === "const" ? true : (() => {
    throw new bY("Unknown expression type");
  })();
};
var n$ = function($) {
  const X = x8($.pattern);
  return S8(X);
};
function* jY($) {
  if ($.length === 1)
    return yield* $[0];
  for (let X of $[0])
    for (let J of jY($.slice(1)))
      yield `${X}${J}`;
}
function* qW($) {
  return yield* jY($.expr.map((X) => [...Z$(X)]));
}
function* BW($) {
  for (let X of $.expr)
    yield* Z$(X);
}
function* MW($) {
  return yield $.const;
}
function* Z$($) {
  return $.type === "and" ? yield* qW($) : $.type === "or" ? yield* BW($) : $.type === "const" ? yield* MW($) : (() => {
    throw new RY("Unknown expression");
  })();
}
var k8 = function($) {
  const X = x8($.pattern);
  return S8(X) ? [...Z$(X)] : [];
};
var n = function($, X = {}) {
  return { ...X, [H]: "Literal", const: $, type: typeof $ };
};
var W$ = function($ = {}) {
  return { ...$, [H]: "Boolean", type: "boolean" };
};
var _8 = function($ = {}) {
  return { ...$, [H]: "BigInt", type: "bigint" };
};
var P1 = function($ = {}) {
  return { ...$, [H]: "Number", type: "number" };
};
var Z1 = function($ = {}) {
  return { ...$, [H]: "String", type: "string" };
};
function* UW($) {
  const X = $.trim().replace(/"|'/g, "");
  return X === "boolean" ? yield W$() : X === "number" ? yield P1() : X === "bigint" ? yield _8() : X === "string" ? yield Z1() : yield (() => {
    const J = X.split("|").map((Y) => n(Y.trim()));
    return J.length === 0 ? e() : J.length === 1 ? J[0] : J8(J);
  })();
}
function* wW($) {
  if ($[1] !== "{") {
    const X = n("$"), J = vX($.slice(1));
    return yield* [X, ...J];
  }
  for (let X = 2;X < $.length; X++)
    if ($[X] === "}") {
      const J = UW($.slice(2, X)), Y = vX($.slice(X + 1));
      return yield* [...J, ...Y];
    }
  yield n($);
}
function* vX($) {
  for (let X = 0;X < $.length; X++)
    if ($[X] === "$") {
      const J = n($.slice(0, X)), Y = wW($.slice(X));
      return yield* [J, ...Y];
    }
  yield n($);
}
var KY = function($) {
  return [...vX($)];
};
var mX = function($) {
  return `^${$.map((X) => EY(X, "")).join("")}\$`;
};
var W8 = function($) {
  const J = k8($).map((Y) => n(Y));
  return l(J);
};
var Q$ = function($, X = {}) {
  const J = M0($) ? mX(KY($)) : mX($);
  return { ...X, [H]: "TemplateLiteral", type: "string", pattern: J };
};
var t0 = function($) {
  return [...new Set(i0($) ? HW($) : u($) ? DW($.anyOf) : U1($) ? AW($.const) : N8($) ? ["[number]"] : A8($) ? ["[number]"] : [])];
};
var iX = function($, X, J) {
  const Y = OW($, X, J);
  return m(Y);
};
var W1 = function($, X, J = {}) {
  return Z0(X) ? C(iX($, X, J)) : Y1(X) ? C(uX($, X, J)) : g(X) ? C(IY($, t0(X)), J) : C(IY($, X), J);
};
var uX = function($, X, J) {
  const Y = VW($, X, J);
  return m(Y);
};
var z$ = function($, X = {}) {
  return { ...X, [H]: "Iterator", type: "Iterator", items: C($) };
};
var EW = function($, X = {}) {
  const J = globalThis.Object.getOwnPropertyNames($), Y = J.filter((z) => I1($[z])), Z = J.filter((z) => !Y.includes(z)), W = g(X.additionalProperties) ? { additionalProperties: C(X.additionalProperties) } : {}, Q = J.reduce((z, q) => ({ ...z, [q]: C($[q]) }), {});
  return Z.length > 0 ? { ...X, ...W, [H]: "Object", type: "object", properties: Q, required: Z } : { ...X, ...W, [H]: "Object", type: "object", properties: Q };
};
var q$ = function($, X = {}) {
  return { ...X, [H]: "Promise", type: "Promise", item: C($) };
};
var Q1 = function($, X) {
  const J = X ?? true;
  return Z0($) ? cX($, J) : kW($, J);
};
var cX = function($, X) {
  const J = TW($, X);
  return m(J);
};
var L1 = function($, X = {}) {
  const [J, Y, Z] = [false, $.length, $.length];
  return $.length > 0 ? { ...X, [H]: "Tuple", type: "array", items: _0($), additionalItems: J, minItems: Y, maxItems: Z } : { ...X, [H]: "Tuple", type: "array", minItems: Y, maxItems: Z };
};
var gY = function($, X) {
  return $.includes(X);
};
var fW = function($, X) {
  return $.filter((J) => X.includes(J));
};
var TY = function($) {
  return $.length === 1 ? $[0] : $.reduce((X, J) => [...fW(X, J)], []);
};
var fY = function($) {
  return $.reduce((X, J) => [...X, ...J], []);
};
var j6 = function($, X, J = {}) {
  const Y = g($) ? t0($) : $, Z = X({ [H]: "MappedKey", keys: Y }), W = mW(Y, Z);
  return C($0(W), J);
};
var s0 = function($) {
  return N0($) ? iW($.allOf) : u($) ? uW($.anyOf) : _1($) ? cW($.items ?? []) : m1($) ? oW($.items) : O0($) ? nW($.properties) : F6($) ? lW($.patternProperties) : [];
};
var u1 = function($) {
  oX = true;
  const X = s0($);
  return oX = false, `^(${X.map((Y) => `(${Y})`).join("|")})$`;
};
var B$ = function($, X = {}) {
  if (Z0($))
    return vY($, X);
  else {
    const J = s0($), Y = tW(J), Z = J8(Y);
    return C(Z, X);
  }
};
var vY = function($, X) {
  const J = rW($, X);
  return m(J);
};
var c1 = function($) {
  return $[H] === "Intersect" ? aW($) : $[H] === "Union" ? eW($) : $[H] === "Not" ? $Q($) : $[H] === "Undefined" ? true : false;
};
var pY = function($) {
  switch ($.errorType) {
    case G.ArrayContains:
      return "Expected array to contain at least one matching value";
    case G.ArrayMaxContains:
      return `Expected array to contain no more than ${$.schema.maxContains} matching values`;
    case G.ArrayMinContains:
      return `Expected array to contain at least ${$.schema.minContains} matching values`;
    case G.ArrayMaxItems:
      return `Expected array length to be less or equal to ${$.schema.maxItems}`;
    case G.ArrayMinItems:
      return `Expected array length to be greater or equal to ${$.schema.minItems}`;
    case G.ArrayUniqueItems:
      return "Expected array elements to be unique";
    case G.Array:
      return "Expected array";
    case G.AsyncIterator:
      return "Expected AsyncIterator";
    case G.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${$.schema.exclusiveMaximum}`;
    case G.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${$.schema.exclusiveMinimum}`;
    case G.BigIntMaximum:
      return `Expected bigint to be less or equal to ${$.schema.maximum}`;
    case G.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${$.schema.minimum}`;
    case G.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${$.schema.multipleOf}`;
    case G.BigInt:
      return "Expected bigint";
    case G.Boolean:
      return "Expected boolean";
    case G.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${$.schema.exclusiveMinimumTimestamp}`;
    case G.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${$.schema.exclusiveMaximumTimestamp}`;
    case G.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${$.schema.minimumTimestamp}`;
    case G.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${$.schema.maximumTimestamp}`;
    case G.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${$.schema.multipleOfTimestamp}`;
    case G.Date:
      return "Expected Date";
    case G.Function:
      return "Expected function";
    case G.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${$.schema.exclusiveMaximum}`;
    case G.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${$.schema.exclusiveMinimum}`;
    case G.IntegerMaximum:
      return `Expected integer to be less or equal to ${$.schema.maximum}`;
    case G.IntegerMinimum:
      return `Expected integer to be greater or equal to ${$.schema.minimum}`;
    case G.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${$.schema.multipleOf}`;
    case G.Integer:
      return "Expected integer";
    case G.IntersectUnevaluatedProperties:
      return "Unexpected property";
    case G.Intersect:
      return "Expected all values to match";
    case G.Iterator:
      return "Expected Iterator";
    case G.Literal:
      return `Expected ${typeof $.schema.const === "string" ? `'${$.schema.const}'` : $.schema.const}`;
    case G.Never:
      return "Never";
    case G.Not:
      return "Value should not match";
    case G.Null:
      return "Expected null";
    case G.NumberExclusiveMaximum:
      return `Expected number to be less than ${$.schema.exclusiveMaximum}`;
    case G.NumberExclusiveMinimum:
      return `Expected number to be greater than ${$.schema.exclusiveMinimum}`;
    case G.NumberMaximum:
      return `Expected number to be less or equal to ${$.schema.maximum}`;
    case G.NumberMinimum:
      return `Expected number to be greater or equal to ${$.schema.minimum}`;
    case G.NumberMultipleOf:
      return `Expected number to be a multiple of ${$.schema.multipleOf}`;
    case G.Number:
      return "Expected number";
    case G.Object:
      return "Expected object";
    case G.ObjectAdditionalProperties:
      return "Unexpected property";
    case G.ObjectMaxProperties:
      return `Expected object to have no more than ${$.schema.maxProperties} properties`;
    case G.ObjectMinProperties:
      return `Expected object to have at least ${$.schema.minProperties} properties`;
    case G.ObjectRequiredProperty:
      return "Required property";
    case G.Promise:
      return "Expected Promise";
    case G.RegExp:
      return "Expected string to match regular expression";
    case G.StringFormatUnknown:
      return `Unknown format '${$.schema.format}'`;
    case G.StringFormat:
      return `Expected string to match '${$.schema.format}' format`;
    case G.StringMaxLength:
      return `Expected string length less or equal to ${$.schema.maxLength}`;
    case G.StringMinLength:
      return `Expected string length greater or equal to ${$.schema.minLength}`;
    case G.StringPattern:
      return `Expected string to match '${$.schema.pattern}'`;
    case G.String:
      return "Expected string";
    case G.Symbol:
      return "Expected symbol";
    case G.TupleLength:
      return `Expected tuple to have ${$.schema.maxItems || 0} elements`;
    case G.Tuple:
      return "Expected tuple";
    case G.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${$.schema.maxByteLength}`;
    case G.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${$.schema.minByteLength}`;
    case G.Uint8Array:
      return "Expected Uint8Array";
    case G.Undefined:
      return "Expected undefined";
    case G.Union:
      return "Expected union value";
    case G.Void:
      return "Expected void";
    case G.Kind:
      return `Expected kind '${$.schema[H]}'`;
    default:
      return "Unknown error type";
  }
};
var nX = function() {
  return XQ;
};
var a = function($, X) {
  const J = X.findIndex((Y) => Y.$id === $.$ref);
  if (J === -1)
    throw new hY($);
  return X[J];
};
function* WQ($) {
  const X = $ === 0 ? 1 : Math.ceil(Math.floor(Math.log2($) + 1) / 8);
  for (let J = 0;J < X; J++)
    yield $ >> 8 * (X - 1 - J) & 255;
}
var Q8 = function($) {
  return M$ = BigInt("14695981039346656037"), U$($), M$;
};
function* NQ($, X, J, Y) {
}
function* OQ($, X, J, Y) {
  if (!f(Y))
    return yield R(G.Array, $, J, Y);
  if (c($.minItems) && !(Y.length >= $.minItems))
    yield R(G.ArrayMinItems, $, J, Y);
  if (c($.maxItems) && !(Y.length <= $.maxItems))
    yield R(G.ArrayMaxItems, $, J, Y);
  for (let Q = 0;Q < Y.length; Q++)
    yield* v0($.items, X, `${J}/${Q}`, Y[Q]);
  if ($.uniqueItems === true && !function() {
    const Q = new Set;
    for (let z of Y) {
      const q = Q8(z);
      if (Q.has(q))
        return false;
      else
        Q.add(q);
    }
    return true;
  }())
    yield R(G.ArrayUniqueItems, $, J, Y);
  if (!(c($.contains) || c($.minContains) || c($.maxContains)))
    return;
  const Z = c($.contains) ? $.contains : e(), W = Y.reduce((Q, z, q) => v0(Z, X, `${J}${q}`, z).next().done === true ? Q + 1 : Q, 0);
  if (W === 0)
    yield R(G.ArrayContains, $, J, Y);
  if (k($.minContains) && W < $.minContains)
    yield R(G.ArrayMinContains, $, J, Y);
  if (k($.maxContains) && W > $.maxContains)
    yield R(G.ArrayMaxContains, $, J, Y);
}
function* SQ($, X, J, Y) {
  if (!y$(Y))
    yield R(G.AsyncIterator, $, J, Y);
}
function* _Q($, X, J, Y) {
  if (!k0(Y))
    return yield R(G.BigInt, $, J, Y);
  if (c($.exclusiveMaximum) && !(Y < $.exclusiveMaximum))
    yield R(G.BigIntExclusiveMaximum, $, J, Y);
  if (c($.exclusiveMinimum) && !(Y > $.exclusiveMinimum))
    yield R(G.BigIntExclusiveMinimum, $, J, Y);
  if (c($.maximum) && !(Y <= $.maximum))
    yield R(G.BigIntMaximum, $, J, Y);
  if (c($.minimum) && !(Y >= $.minimum))
    yield R(G.BigIntMinimum, $, J, Y);
  if (c($.multipleOf) && Y % $.multipleOf !== BigInt(0))
    yield R(G.BigIntMultipleOf, $, J, Y);
}
function* PQ($, X, J, Y) {
  if (!E1(Y))
    yield R(G.Boolean, $, J, Y);
}
function* LQ($, X, J, Y) {
  yield* v0($.returns, X, J, Y.prototype);
}
function* CQ($, X, J, Y) {
  if (!a0(Y))
    return yield R(G.Date, $, J, Y);
  if (c($.exclusiveMaximumTimestamp) && !(Y.getTime() < $.exclusiveMaximumTimestamp))
    yield R(G.DateExclusiveMaximumTimestamp, $, J, Y);
  if (c($.exclusiveMinimumTimestamp) && !(Y.getTime() > $.exclusiveMinimumTimestamp))
    yield R(G.DateExclusiveMinimumTimestamp, $, J, Y);
  if (c($.maximumTimestamp) && !(Y.getTime() <= $.maximumTimestamp))
    yield R(G.DateMaximumTimestamp, $, J, Y);
  if (c($.minimumTimestamp) && !(Y.getTime() >= $.minimumTimestamp))
    yield R(G.DateMinimumTimestamp, $, J, Y);
  if (c($.multipleOfTimestamp) && Y.getTime() % $.multipleOfTimestamp !== 0)
    yield R(G.DateMultipleOfTimestamp, $, J, Y);
}
function* FQ($, X, J, Y) {
  if (!o8(Y))
    yield R(G.Function, $, J, Y);
}
function* bQ($, X, J, Y) {
  if (!p$(Y))
    return yield R(G.Integer, $, J, Y);
  if (c($.exclusiveMaximum) && !(Y < $.exclusiveMaximum))
    yield R(G.IntegerExclusiveMaximum, $, J, Y);
  if (c($.exclusiveMinimum) && !(Y > $.exclusiveMinimum))
    yield R(G.IntegerExclusiveMinimum, $, J, Y);
  if (c($.maximum) && !(Y <= $.maximum))
    yield R(G.IntegerMaximum, $, J, Y);
  if (c($.minimum) && !(Y >= $.minimum))
    yield R(G.IntegerMinimum, $, J, Y);
  if (c($.multipleOf) && Y % $.multipleOf !== 0)
    yield R(G.IntegerMultipleOf, $, J, Y);
}
function* RQ($, X, J, Y) {
  for (let Z of $.allOf) {
    const W = v0(Z, X, J, Y).next();
    if (!W.done)
      yield R(G.Intersect, $, J, Y), yield W.value;
  }
  if ($.unevaluatedProperties === false) {
    const Z = new RegExp(u1($));
    for (let W of Object.getOwnPropertyNames(Y))
      if (!Z.test(W))
        yield R(G.IntersectUnevaluatedProperties, $, `${J}/${W}`, Y);
  }
  if (typeof $.unevaluatedProperties === "object") {
    const Z = new RegExp(u1($));
    for (let W of Object.getOwnPropertyNames(Y))
      if (!Z.test(W)) {
        const Q = v0($.unevaluatedProperties, X, `${J}/${W}`, Y[W]).next();
        if (!Q.done)
          yield Q.value;
      }
  }
}
function* jQ($, X, J, Y) {
  if (!d$(Y))
    yield R(G.Iterator, $, J, Y);
}
function* KQ($, X, J, Y) {
  if (Y !== $.const)
    yield R(G.Literal, $, J, Y);
}
function* VQ($, X, J, Y) {
  yield R(G.Never, $, J, Y);
}
function* EQ($, X, J, Y) {
  if (v0($.not, X, J, Y).next().done === true)
    yield R(G.Not, $, J, Y);
}
function* IQ($, X, J, Y) {
  if (!d1(Y))
    yield R(G.Null, $, J, Y);
}
function* xQ($, X, J, Y) {
  if (!S0.IsNumberLike(Y))
    return yield R(G.Number, $, J, Y);
  if (c($.exclusiveMaximum) && !(Y < $.exclusiveMaximum))
    yield R(G.NumberExclusiveMaximum, $, J, Y);
  if (c($.exclusiveMinimum) && !(Y > $.exclusiveMinimum))
    yield R(G.NumberExclusiveMinimum, $, J, Y);
  if (c($.maximum) && !(Y <= $.maximum))
    yield R(G.NumberMaximum, $, J, Y);
  if (c($.minimum) && !(Y >= $.minimum))
    yield R(G.NumberMinimum, $, J, Y);
  if (c($.multipleOf) && Y % $.multipleOf !== 0)
    yield R(G.NumberMultipleOf, $, J, Y);
}
function* kQ($, X, J, Y) {
  if (!S0.IsObjectLike(Y))
    return yield R(G.Object, $, J, Y);
  if (c($.minProperties) && !(Object.getOwnPropertyNames(Y).length >= $.minProperties))
    yield R(G.ObjectMinProperties, $, J, Y);
  if (c($.maxProperties) && !(Object.getOwnPropertyNames(Y).length <= $.maxProperties))
    yield R(G.ObjectMaxProperties, $, J, Y);
  const Z = Array.isArray($.required) ? $.required : [], W = Object.getOwnPropertyNames($.properties), Q = Object.getOwnPropertyNames(Y);
  for (let z of Z) {
    if (Q.includes(z))
      continue;
    yield R(G.ObjectRequiredProperty, $.properties[z], `${J}/${z8(z)}`, undefined);
  }
  if ($.additionalProperties === false) {
    for (let z of Q)
      if (!W.includes(z))
        yield R(G.ObjectAdditionalProperties, $, `${J}/${z8(z)}`, Y[z]);
  }
  if (typeof $.additionalProperties === "object")
    for (let z of Q) {
      if (W.includes(z))
        continue;
      yield* v0($.additionalProperties, X, `${J}/${z8(z)}`, Y[z]);
    }
  for (let z of W) {
    const q = $.properties[z];
    if ($.required && $.required.includes(z)) {
      if (yield* v0(q, X, `${J}/${z8(z)}`, Y[z]), c1($) && !(z in Y))
        yield R(G.ObjectRequiredProperty, q, `${J}/${z8(z)}`, undefined);
    } else if (S0.IsExactOptionalProperty(Y, z))
      yield* v0(q, X, `${J}/${z8(z)}`, Y[z]);
  }
}
function* gQ($, X, J, Y) {
  if (!v$(Y))
    yield R(G.Promise, $, J, Y);
}
function* TQ($, X, J, Y) {
  if (!S0.IsRecordLike(Y))
    return yield R(G.Object, $, J, Y);
  if (c($.minProperties) && !(Object.getOwnPropertyNames(Y).length >= $.minProperties))
    yield R(G.ObjectMinProperties, $, J, Y);
  if (c($.maxProperties) && !(Object.getOwnPropertyNames(Y).length <= $.maxProperties))
    yield R(G.ObjectMaxProperties, $, J, Y);
  const [Z, W] = Object.entries($.patternProperties)[0], Q = new RegExp(Z);
  for (let [z, q] of Object.entries(Y))
    if (Q.test(z))
      yield* v0(W, X, `${J}/${z8(z)}`, q);
  if (typeof $.additionalProperties === "object") {
    for (let [z, q] of Object.entries(Y))
      if (!Q.test(z))
        yield* v0($.additionalProperties, X, `${J}/${z8(z)}`, q);
  }
  if ($.additionalProperties === false)
    for (let [z, q] of Object.entries(Y)) {
      if (Q.test(z))
        continue;
      return yield R(G.ObjectAdditionalProperties, $, `${J}/${z8(z)}`, q);
    }
}
function* fQ($, X, J, Y) {
  yield* v0(a($, X), X, J, Y);
}
function* yQ($, X, J, Y) {
  if (!new RegExp($.source, $.flags).test(Y))
    return yield R(G.RegExp, $, J, Y);
}
function* dQ($, X, J, Y) {
  if (!p(Y))
    return yield R(G.String, $, J, Y);
  if (c($.minLength) && !(Y.length >= $.minLength))
    yield R(G.StringMinLength, $, J, Y);
  if (c($.maxLength) && !(Y.length <= $.maxLength))
    yield R(G.StringMaxLength, $, J, Y);
  if (p($.pattern)) {
    if (!new RegExp($.pattern).test(Y))
      yield R(G.StringPattern, $, J, Y);
  }
  if (p($.format)) {
    if (!g0.Has($.format))
      yield R(G.StringFormatUnknown, $, J, Y);
    else if (!g0.Get($.format)(Y))
      yield R(G.StringFormat, $, J, Y);
  }
}
function* vQ($, X, J, Y) {
  if (!l0(Y))
    yield R(G.Symbol, $, J, Y);
}
function* pQ($, X, J, Y) {
  if (!p(Y))
    return yield R(G.String, $, J, Y);
  if (!new RegExp($.pattern).test(Y))
    yield R(G.StringPattern, $, J, Y);
}
function* hQ($, X, J, Y) {
  yield* v0(a($, X), X, J, Y);
}
function* mQ($, X, J, Y) {
  if (!f(Y))
    return yield R(G.Tuple, $, J, Y);
  if ($.items === undefined && Y.length !== 0)
    return yield R(G.TupleLength, $, J, Y);
  if (Y.length !== $.maxItems)
    return yield R(G.TupleLength, $, J, Y);
  if (!$.items)
    return;
  for (let Z = 0;Z < $.items.length; Z++)
    yield* v0($.items[Z], X, `${J}/${Z}`, Y[Z]);
}
function* iQ($, X, J, Y) {
  if (!z0(Y))
    yield R(G.Undefined, $, J, Y);
}
function* uQ($, X, J, Y) {
  let Z = 0;
  for (let W of $.anyOf) {
    const Q = [...v0(W, X, J, Y)];
    if (Q.length === 0)
      return;
    Z += Q.length;
  }
  if (Z > 0)
    yield R(G.Union, $, J, Y);
}
function* cQ($, X, J, Y) {
  if (!K8(Y))
    return yield R(G.Uint8Array, $, J, Y);
  if (c($.maxByteLength) && !(Y.length <= $.maxByteLength))
    yield R(G.Uint8ArrayMaxByteLength, $, J, Y);
  if (c($.minByteLength) && !(Y.length >= $.minByteLength))
    yield R(G.Uint8ArrayMinByteLength, $, J, Y);
}
function* oQ($, X, J, Y) {
}
function* nQ($, X, J, Y) {
  if (!S0.IsVoidLike(Y))
    yield R(G.Void, $, J, Y);
}
function* lQ($, X, J, Y) {
  if (!V0.Get($[H])($, Y))
    yield R(G.Kind, $, J, Y);
}
function* v0($, X, J, Y) {
  const Z = c($.$id) ? [...X, $] : X, W = $;
  switch (W[H]) {
    case "Any":
      return yield* NQ(W, Z, J, Y);
    case "Array":
      return yield* OQ(W, Z, J, Y);
    case "AsyncIterator":
      return yield* SQ(W, Z, J, Y);
    case "BigInt":
      return yield* _Q(W, Z, J, Y);
    case "Boolean":
      return yield* PQ(W, Z, J, Y);
    case "Constructor":
      return yield* LQ(W, Z, J, Y);
    case "Date":
      return yield* CQ(W, Z, J, Y);
    case "Function":
      return yield* FQ(W, Z, J, Y);
    case "Integer":
      return yield* bQ(W, Z, J, Y);
    case "Intersect":
      return yield* RQ(W, Z, J, Y);
    case "Iterator":
      return yield* jQ(W, Z, J, Y);
    case "Literal":
      return yield* KQ(W, Z, J, Y);
    case "Never":
      return yield* VQ(W, Z, J, Y);
    case "Not":
      return yield* EQ(W, Z, J, Y);
    case "Null":
      return yield* IQ(W, Z, J, Y);
    case "Number":
      return yield* xQ(W, Z, J, Y);
    case "Object":
      return yield* kQ(W, Z, J, Y);
    case "Promise":
      return yield* gQ(W, Z, J, Y);
    case "Record":
      return yield* TQ(W, Z, J, Y);
    case "Ref":
      return yield* fQ(W, Z, J, Y);
    case "RegExp":
      return yield* yQ(W, Z, J, Y);
    case "String":
      return yield* dQ(W, Z, J, Y);
    case "Symbol":
      return yield* vQ(W, Z, J, Y);
    case "TemplateLiteral":
      return yield* pQ(W, Z, J, Y);
    case "This":
      return yield* hQ(W, Z, J, Y);
    case "Tuple":
      return yield* mQ(W, Z, J, Y);
    case "Undefined":
      return yield* iQ(W, Z, J, Y);
    case "Union":
      return yield* uQ(W, Z, J, Y);
    case "Uint8Array":
      return yield* cQ(W, Z, J, Y);
    case "Unknown":
      return yield* oQ(W, Z, J, Y);
    case "Void":
      return yield* nQ(W, Z, J, Y);
    default:
      if (!V0.Has(W[H]))
        throw new tX($);
      return yield* lQ(W, Z, J, Y);
  }
}
var w$ = function(...$) {
  const X = $.length === 3 ? v0($[0], $[1], "", $[2]) : v0($[0], [], "", $[1]);
  return new s$(X);
};
var o1 = function($ = {}) {
  return { ...$, [H]: "Any" };
};
var x1 = function($ = {}) {
  return { ...$, [H]: "Unknown" };
};
var q8 = function($, X) {
  return J0($, X);
};
var YZ = function($, X, J, Y, Z) {
  const W = T7($, X, J, Y, Z);
  return m(W);
};
var P8 = function($, X, J, Y, Z = {}) {
  return Z0($) ? YZ($, X, J, Y, Z) : Y1($) ? C(ZZ($, X, J, Y, Z)) : C(f7($, X, J, Y), Z);
};
var ZZ = function($, X, J, Y, Z) {
  const W = v7($, X, J, Y, Z);
  return m(W);
};
var t = function(...$) {
  return $.length === 3 ? p0($[0], $[1], $[2]) : p0($[0], [], $[1]);
};
var q1 = function(...$) {
  return QZ = 0, $.length === 2 ? H1($[0], $[1]) : H1($[0], []);
};
var U0 = function($) {
  if (f($))
    return e5($);
  if (a0($))
    return X9($);
  if (Y0($))
    return a5($);
  if (M1($))
    return $9($);
  if (e0($))
    return J9($);
  throw new Error("ValueClone: Unable to clone value");
};
var r$ = function(...$) {
  return $.length === 3 ? n1($[0], $[1], $[2]) : n1($[0], [], $[1]);
};
var I6 = function(...$) {
  return $.length === 3 ? D1($[0], $[1], $[2]) : D1($[0], [], $[1]);
};
var H$ = function($, X) {
  return C(j9($), X);
};
var k6 = function(...$) {
  return $.length === 3 ? k1($[0], $[1], $[2]) : k1($[0], [], $[1]);
};
var T6 = function(...$) {
  return $.length === 3 ? R1($[0], $[1], $[2]) : R1($[0], [], $[1]);
};
function* $6($) {
  if ($ === "")
    return;
  let [X, J] = [0, 0];
  for (let Y = 0;Y < $.length; Y++)
    if ($.charAt(Y) === "/")
      if (Y === 0)
        X = Y + 1;
      else
        J = Y, yield MZ($.slice(X, J)), X = Y + 1;
    else
      J = Y;
  yield MZ($.slice(X));
}
var Nz = function($, X, J) {
  if (X === "")
    throw new XJ($, X, J);
  let [Y, Z, W] = [null, $, ""];
  for (let Q of $6(X)) {
    if (Z[Q] === undefined)
      Z[Q] = {};
    Y = Z, Z = Z[Q], W = Q;
  }
  Y[W] = J;
};
var Oz = function($, X) {
  if (X === "")
    throw new JJ($, X);
  let [J, Y, Z] = [null, $, ""];
  for (let W of $6(X)) {
    if (Y[W] === undefined || Y[W] === null)
      return;
    J = Y, Y = Y[W], Z = W;
  }
  if (Array.isArray(J)) {
    const W = parseInt(Z);
    J.splice(W, 1);
  } else
    delete J[Z];
};
var Sz = function($, X) {
  if (X === "")
    return true;
  let [J, Y, Z] = [null, $, ""];
  for (let W of $6(X)) {
    if (Y[W] === undefined)
      return false;
    J = Y, Y = Y[W], Z = W;
  }
  return Object.getOwnPropertyNames(J).includes(Z);
};
var _z = function($, X) {
  if (X === "")
    return $;
  let J = $;
  for (let Y of $6(X)) {
    if (J[Y] === undefined)
      return;
    J = J[Y];
  }
  return J;
};
function* Lz($, X, J) {
  if (!Y0(J))
    return yield J6($, J);
  const Y = [...globalThis.Object.keys(X), ...globalThis.Object.getOwnPropertySymbols(X)], Z = [...globalThis.Object.keys(J), ...globalThis.Object.getOwnPropertySymbols(J)];
  for (let W of Y) {
    if (l0(W))
      throw new X6(W);
    if (z0(J[W]) && Z.includes(W))
      yield J6(`${$}/${globalThis.String(W)}`, undefined);
  }
  for (let W of Z) {
    if (z0(X[W]) || z0(J[W]))
      continue;
    if (l0(W))
      throw new X6(W);
    yield* y6(`${$}/${globalThis.String(W)}`, X[W], J[W]);
  }
  for (let W of Z) {
    if (l0(W))
      throw new X6(W);
    if (z0(X[W]))
      yield HZ(`${$}/${globalThis.String(W)}`, J[W]);
  }
  for (let W of Y.reverse()) {
    if (l0(W))
      throw new X6(W);
    if (z0(J[W]) && !Z.includes(W))
      yield DZ(`${$}/${globalThis.String(W)}`);
  }
}
function* Cz($, X, J) {
  if (!f(J))
    return yield J6($, J);
  for (let Y = 0;Y < Math.min(X.length, J.length); Y++)
    yield* y6(`${$}/${Y}`, X[Y], J[Y]);
  for (let Y = 0;Y < J.length; Y++) {
    if (Y < X.length)
      continue;
    yield HZ(`${$}/${Y}`, J[Y]);
  }
  for (let Y = X.length - 1;Y >= 0; Y--) {
    if (Y < J.length)
      continue;
    yield DZ(`${$}/${Y}`);
  }
}
function* Fz($, X, J) {
  if (!M1(J) || X.length !== J.length || globalThis.Object.getPrototypeOf(X).constructor.name !== globalThis.Object.getPrototypeOf(J).constructor.name)
    return yield J6($, J);
  for (let Y = 0;Y < Math.min(X.length, J.length); Y++)
    yield* y6(`${$}/${Y}`, X[Y], J[Y]);
}
function* bz($, X, J) {
  if (X === J)
    return;
  yield J6($, J);
}
function* y6($, X, J) {
  if (Y0(X))
    return yield* Lz($, X, J);
  if (f(X))
    return yield* Cz($, X, J);
  if (M1(X))
    return yield* Fz($, X, J);
  if (e0(X))
    return yield* bz($, X, J);
  throw new f6(X, "Unable to create diff edits for unknown value");
}
var YJ = function($, X) {
  return [...y6("", $, X)];
};
var ZJ = function($, X) {
  if (Rz(X))
    return U0(X[0].value);
  if (jz(X))
    return U0($);
  const J = U0($);
  for (let Y of X)
    switch (Y.type) {
      case "insert": {
        j1.Set(J, Y.path, Y.value);
        break;
      }
      case "update": {
        j1.Set(J, Y.path, Y.value);
        break;
      }
      case "delete": {
        j1.Delete(J, Y.path);
        break;
      }
    }
  return J;
};
var D$ = function($, X) {
  if (Y0($))
    return Kz($, X);
  if (a0($))
    return Vz($, X);
  if (M1($))
    return Iz($, X);
  if (f($))
    return Ez($, X);
  if (e0($))
    return xz($, X);
  throw new Error("ValueEquals: Unable to compare value");
};
var QJ = function($, X) {
  if (AZ($) || AZ(X))
    throw new d6("Only object and array types can be mutated at the root level");
  if (yz($, X))
    throw new d6("Cannot assign due type mismatch of assignable values");
  WJ($, "", $, X);
};
var Y6 = function($, X, J) {
  return l1($, X, J);
};
var Z6 = function($, X, J) {
  return t1($, X, J);
};
var MJ = function($, X) {
  return BJ.clear(), y0($, X);
};
var A2 = function(...$) {
  return r$.apply(r$, $);
};
var N2 = function(...$) {
  return q1.apply(q1, $);
};
var UJ = function(...$) {
  return t.apply(t, $);
};
var O2 = function(...$) {
  return I6.apply(I6, $);
};
var S2 = function(...$) {
  return k6.apply(k6, $);
};
var _2 = function($) {
  return U0($);
};
var P2 = function(...$) {
  const [X, J, Y] = $.length === 3 ? [$[0], $[1], $[2]] : [$[0], [], $[1]];
  if (!UJ(X, J, Y))
    throw new A$(X, Y, wJ(X, J, Y).First());
  return Y6(X, J, Y);
};
var L2 = function(...$) {
  return T6.apply(T6, $);
};
var C2 = function(...$) {
  const [X, J, Y] = $.length === 3 ? [$[0], $[1], $[2]] : [$[0], [], $[1]], Z = Z6(X, J, Y);
  if (!UJ(X, J, Z))
    throw new N$(X, Y, wJ(X, J, Y).First());
  return Z;
};
var wJ = function(...$) {
  return w$.apply(w$, $);
};
var F2 = function($, X) {
  return D$($, X);
};
var b2 = function($, X) {
  return YJ($, X);
};
var R2 = function($) {
  return Q8($);
};
var j2 = function($, X) {
  return ZJ($, X);
};
var K2 = function($, X) {
  QJ($, X);
};
var v6 = function($, X = {}) {
  return C(GJ($), X);
};
var O$ = function($ = {}) {
  return { ...$, [H]: "Date", type: "Date" };
};
var S$ = function($ = {}) {
  return { ...$, [H]: "Null", type: "null" };
};
var _$ = function($) {
  return { ...$, [H]: "Symbol", type: "symbol" };
};
var P$ = function($ = {}) {
  return { ...$, [H]: "Undefined", type: "undefined" };
};
var L$ = function($ = {}) {
  return { ...$, [H]: "Uint8Array", type: "Uint8Array" };
};
var h6 = function($, X = {}) {
  return _6.CloneType(HJ($, true), X);
};
var m6 = function($, X = {}) {
  return L1(_0($.parameters), { ...X });
};
var o2 = function($, X) {
  return $$($) ? T2($, X) : X$($) ? f2($, X) : N0($) ? y2($, X) : u($) ? d2($, X) : _1($) ? v2($, X) : m1($) ? p2($, X) : O0($) ? h2($, X) : O8($) ? m2($, X) : e8($) ? i2($, X) : J$($) ? u2($, X) : b6($) ? c2($, X) : $;
};
var A1 = function($, X) {
  return o2(C($), _0(X));
};
var i6 = function($, X = {}) {
  if (G0($))
    throw new Error("Enum undefined or empty");
  const J = globalThis.Object.getOwnPropertyNames($).filter((W) => isNaN(W)).map((W) => $[W]), Z = [...new Set(J)].map((W) => n(W));
  return l(Z, { ...X, [S1]: "Enum" });
};
var C$ = function($, X, J = {}) {
  if (Z0($))
    return OZ($, X, J);
  else {
    const Y = DJ($, X);
    return C(Y, J);
  }
};
var OZ = function($, X, J) {
  const Y = l2($, X, J);
  return m(Y);
};
var F$ = function($, X, J = {}) {
  if (Z0($))
    return SZ($, X, J);
  else {
    const Y = AJ($, X);
    return C(Y, J);
  }
};
var SZ = function($, X, J) {
  const Y = s2($, X, J);
  return m(Y);
};
var u6 = function($, X = {}) {
  return C($.returns, X);
};
var c6 = function($ = {}) {
  return { ...$, [H]: "Integer", type: "integer" };
};
var NJ = function($, X, J) {
  const Y = e2($, X, J);
  return m(Y);
};
var K1 = function($, X, J = {}) {
  return Y1($) ? NJ($, X, J) : i0($) ? Z3($, X, $) : u($) ? l(PZ($.anyOf, X), J) : U1($) ? n(_Z($.const, X), J) : $;
};
var o6 = function($, X = {}) {
  return K1($, "Capitalize", X);
};
var n6 = function($, X = {}) {
  return K1($, "Lowercase", X);
};
var l6 = function($, X = {}) {
  return K1($, "Uncapitalize", X);
};
var t6 = function($, X = {}) {
  return K1($, "Uppercase", X);
};
var s6 = function($, X) {
  return { ...X, [H]: "Not", not: C($) };
};
var LZ = function($, X, J) {
  const Y = Q3($, X, J);
  return m(Y);
};
var OJ = function($, X) {
  return N0($) ? T0(z3($.allOf, X)) : u($) ? l(q3($.anyOf, X)) : O0($) ? $0(M3($.properties, X)) : $0({});
};
var C8 = function($, X, J = {}) {
  if (Y1(X))
    return CZ($, X, J);
  if (Z0($))
    return LZ($, X, J);
  const Y = g(X) ? t0(X) : X, Z = A0($, [C0, "$id", "required"]), W = C(OJ($, Y), J);
  return { ...Z, ...W };
};
var CZ = function($, X, J) {
  const Y = G3($, X, J);
  return m(Y);
};
var r6 = function($, X = {}) {
  return L1(_0($.parameters), { ...X });
};
var b$ = function($, X = {}) {
  if (Z0($))
    return SJ($, X);
  const J = A0($, [C0, "$id", "required"]), Y = C(bZ($), X);
  return { ...J, ...Y };
};
var SJ = function($, X) {
  const J = A3($, X);
  return m(J);
};
var RZ = function($, X, J) {
  const Y = O3($, X, J);
  return m(Y);
};
var _J = function($, X) {
  return N0($) ? T0(S3($.allOf, X)) : u($) ? l(_3($.anyOf, X)) : O0($) ? $0(P3($.properties, X)) : $0({});
};
var F8 = function($, X, J = {}) {
  if (Y1(X))
    return jZ($, X, J);
  if (Z0($))
    return RZ($, X, J);
  const Y = g(X) ? t0(X) : X, Z = A0($, [C0, "$id", "required"]), W = C(_J($, Y), J);
  return { ...Z, ...W };
};
var jZ = function($, X, J) {
  const Y = F3($, X, J);
  return m(Y);
};
var a6 = function($) {
  return Q1(u0($));
};
var e6 = function($, X, J = {}) {
  return u($) ? R3($.anyOf, X, J) : i0($) ? b3($, X, J) : U1($) ? j3($.const, X, J) : A8($) ? E3($, X, J) : N8($) ? I3($, X, J) : R6($) ? K3($, X, J) : Y$($) ? V3($, X, J) : e(J);
};
var $X = function($, X = {}) {
  if (G0(X.$id))
    X.$id = `T${x3++}`;
  const J = $({ [H]: "This", $ref: `${X.$id}` });
  return J.$id = X.$id, C({ ...X, [S1]: "Recursive", ...J });
};
var XX = function($, X = {}) {
  if (M0($))
    return { ...X, [H]: "Ref", $ref: $ };
  if (G0($.$id))
    throw new Error("Reference target type must specify an $id");
  return { ...X, [H]: "Ref", $ref: $.$id };
};
var JX = function($, X = {}) {
  const J = M0($) ? new globalThis.RegExp($) : $;
  return { ...X, [H]: "RegExp", type: "RegExp", source: J.source, flags: J.flags };
};
var R$ = function($, X = {}) {
  if (Z0($))
    return EZ($, X);
  else {
    const J = A0($, [C0, "$id", "required"]), Y = C(VZ($), X);
    return { ...J, ...Y };
  }
};
var EZ = function($, X) {
  const J = T3($, X);
  return m(J);
};
var YX = function($) {
  return _0(f3($));
};
var ZX = function($, X = {}) {
  return C($.returns, X);
};
var WX = function($) {
  return JSON.parse(JSON.stringify($));
};
var QX = function($) {
  return new LJ($);
};
var zX = function($ = {}) {
  return { ...$, [H]: "Void", type: "void" };
};
import {randomInt as t3} from "crypto";
var U4 = Object.create;
var { defineProperty: _X, getPrototypeOf: w4, getOwnPropertyNames: G4 } = Object;
var H4 = Object.prototype.hasOwnProperty;
var A6 = ($, X, J) => {
  J = $ != null ? U4(w4($)) : {};
  const Y = X || !$ || !$.__esModule ? _X(J, "default", { value: $, enumerable: true }) : J;
  for (let Z of G4($))
    if (!H4.call(Y, Z))
      _X(Y, Z, { get: () => $[Z], enumerable: true });
  return Y;
};
var u8 = ($, X) => () => (X || $((X = { exports: {} }).exports, X), X.exports);
var G8 = ($, X) => {
  for (var J in X)
    _X($, J, { get: X[J], enumerable: true, configurable: true, set: (Y) => X[J] = () => Y });
};
var aJ = u8((Uq, LX) => {
  var f$ = function() {
  }, A4 = function($, X, J) {
    this.fn = $, this.context = X, this.once = J || false;
  }, rJ = function($, X, J, Y, Z) {
    if (typeof J !== "function")
      throw new TypeError("The listener must be a function");
    var W = new A4(J, Y || $, Z), Q = n0 ? n0 + X : X;
    if (!$._events[Q])
      $._events[Q] = W, $._eventsCount++;
    else if (!$._events[Q].fn)
      $._events[Q].push(W);
    else
      $._events[Q] = [$._events[Q], W];
    return $;
  }, N6 = function($, X) {
    if (--$._eventsCount === 0)
      $._events = new f$;
    else
      delete $._events[X];
  }, m0 = function() {
    this._events = new f$, this._eventsCount = 0;
  }, D4 = Object.prototype.hasOwnProperty, n0 = "~";
  if (Object.create) {
    if (f$.prototype = Object.create(null), !new f$().__proto__)
      n0 = false;
  }
  m0.prototype.eventNames = function $() {
    var X = [], J, Y;
    if (this._eventsCount === 0)
      return X;
    for (Y in J = this._events)
      if (D4.call(J, Y))
        X.push(n0 ? Y.slice(1) : Y);
    if (Object.getOwnPropertySymbols)
      return X.concat(Object.getOwnPropertySymbols(J));
    return X;
  };
  m0.prototype.listeners = function $(X) {
    var J = n0 ? n0 + X : X, Y = this._events[J];
    if (!Y)
      return [];
    if (Y.fn)
      return [Y.fn];
    for (var Z = 0, W = Y.length, Q = new Array(W);Z < W; Z++)
      Q[Z] = Y[Z].fn;
    return Q;
  };
  m0.prototype.listenerCount = function $(X) {
    var J = n0 ? n0 + X : X, Y = this._events[J];
    if (!Y)
      return 0;
    if (Y.fn)
      return 1;
    return Y.length;
  };
  m0.prototype.emit = function $(X, J, Y, Z, W, Q) {
    var z = n0 ? n0 + X : X;
    if (!this._events[z])
      return false;
    var q = this._events[z], U = arguments.length, A, O;
    if (q.fn) {
      if (q.once)
        this.removeListener(X, q.fn, undefined, true);
      switch (U) {
        case 1:
          return q.fn.call(q.context), true;
        case 2:
          return q.fn.call(q.context, J), true;
        case 3:
          return q.fn.call(q.context, J, Y), true;
        case 4:
          return q.fn.call(q.context, J, Y, Z), true;
        case 5:
          return q.fn.call(q.context, J, Y, Z, W), true;
        case 6:
          return q.fn.call(q.context, J, Y, Z, W, Q), true;
      }
      for (O = 1, A = new Array(U - 1);O < U; O++)
        A[O - 1] = arguments[O];
      q.fn.apply(q.context, A);
    } else {
      var T = q.length, E;
      for (O = 0;O < T; O++) {
        if (q[O].once)
          this.removeListener(X, q[O].fn, undefined, true);
        switch (U) {
          case 1:
            q[O].fn.call(q[O].context);
            break;
          case 2:
            q[O].fn.call(q[O].context, J);
            break;
          case 3:
            q[O].fn.call(q[O].context, J, Y);
            break;
          case 4:
            q[O].fn.call(q[O].context, J, Y, Z);
            break;
          default:
            if (!A)
              for (E = 1, A = new Array(U - 1);E < U; E++)
                A[E - 1] = arguments[E];
            q[O].fn.apply(q[O].context, A);
        }
      }
    }
    return true;
  };
  m0.prototype.on = function $(X, J, Y) {
    return rJ(this, X, J, Y, false);
  };
  m0.prototype.once = function $(X, J, Y) {
    return rJ(this, X, J, Y, true);
  };
  m0.prototype.removeListener = function $(X, J, Y, Z) {
    var W = n0 ? n0 + X : X;
    if (!this._events[W])
      return this;
    if (!J)
      return N6(this, W), this;
    var Q = this._events[W];
    if (Q.fn) {
      if (Q.fn === J && (!Z || Q.once) && (!Y || Q.context === Y))
        N6(this, W);
    } else {
      for (var z = 0, q = [], U = Q.length;z < U; z++)
        if (Q[z].fn !== J || Z && !Q[z].once || Y && Q[z].context !== Y)
          q.push(Q[z]);
      if (q.length)
        this._events[W] = q.length === 1 ? q[0] : q;
      else
        N6(this, W);
    }
    return this;
  };
  m0.prototype.removeAllListeners = function $(X) {
    var J;
    if (X) {
      if (J = n0 ? n0 + X : X, this._events[J])
        N6(this, J);
    } else
      this._events = new f$, this._eventsCount = 0;
    return this;
  };
  m0.prototype.off = m0.prototype.removeListener;
  m0.prototype.addListener = m0.prototype.on;
  m0.prefixed = n0;
  m0.EventEmitter = m0;
  if (typeof LX !== "undefined")
    LX.exports = m0;
});
var vJ = u8((tR, hZ) => {
  var r3 = function($) {
    var X = $.indexOf("%");
    if (X === -1)
      return $;
    var J = $.length, Y = "", Z = 0, W = 0, Q = X, z = vZ;
    while (X > -1 && X < J) {
      var q = pZ($[X + 1], 4), U = pZ($[X + 2], 0), A = q | U, O = dJ[A];
      if (z = dJ[256 + z + O], W = W << 6 | A & dJ[364 + O], z === vZ)
        Y += $.slice(Z, Q), Y += W <= 65535 ? String.fromCharCode(W) : String.fromCharCode(55232 + (W >> 10), 56320 + (W & 1023)), W = 0, Z = X + 3, X = Q = $.indexOf("%", Z);
      else if (z === s3)
        return null;
      else {
        if (X += 3, X < J && $.charCodeAt(X) === 37)
          continue;
        return null;
      }
    }
    return Y + $.slice(Z);
  }, pZ = function($, X) {
    var J = a3[$];
    return J === undefined ? 255 : J << X;
  }, vZ = 12, s3 = 0, dJ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7], a3 = { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
  hZ.exports = r3;
});
var oZ = u8((sR, cZ) => {
  var e3 = function($) {
    const X = new uZ;
    if (typeof $ !== "string")
      return X;
    let J = $.length, Y = "", Z = "", W = -1, Q = -1, z = false, q = false, U = false, A = false, O = false, T = 0;
    for (let E = 0;E < J + 1; E++)
      if (T = E !== J ? $.charCodeAt(E) : 38, T === 38) {
        if (O = Q > W, !O)
          Q = E;
        if (Y = $.slice(W + 1, Q), O || Y.length > 0) {
          if (U)
            Y = Y.replace(iZ, " ");
          if (z)
            Y = mZ(Y) || Y;
          if (O) {
            if (Z = $.slice(Q + 1, E), A)
              Z = Z.replace(iZ, " ");
            if (q)
              Z = mZ(Z) || Z;
          }
          const _ = X[Y];
          if (_ === undefined)
            X[Y] = Z;
          else if (_.pop)
            _.push(Z);
          else
            X[Y] = [_, Z];
        }
        Z = "", W = E, Q = E, z = false, q = false, U = false, A = false;
      } else if (T === 61)
        if (Q <= W)
          Q = E;
        else
          q = true;
      else if (T === 43)
        if (Q > W)
          A = true;
        else
          U = true;
      else if (T === 37)
        if (Q > W)
          q = true;
        else
          z = true;
    return X;
  }, mZ = vJ(), iZ = /\+/g, uZ = function() {
  };
  uZ.prototype = Object.create(null);
  cZ.exports = e3;
});
var lZ = u8((rR, nZ) => {
  var Xq = function($) {
    const X = $.length;
    if (X === 0)
      return "";
    let J = "", Y = 0, Z = 0;
    $:
      for (;Z < X; Z++) {
        let W = $.charCodeAt(Z);
        while (W < 128) {
          if ($q[W] !== 1) {
            if (Y < Z)
              J += $.slice(Y, Z);
            Y = Z + 1, J += $8[W];
          }
          if (++Z === X)
            break $;
          W = $.charCodeAt(Z);
        }
        if (Y < Z)
          J += $.slice(Y, Z);
        if (W < 2048) {
          Y = Z + 1, J += $8[192 | W >> 6] + $8[128 | W & 63];
          continue;
        }
        if (W < 55296 || W >= 57344) {
          Y = Z + 1, J += $8[224 | W >> 12] + $8[128 | W >> 6 & 63] + $8[128 | W & 63];
          continue;
        }
        if (++Z, Z >= X)
          throw new Error("URI malformed");
        const Q = $.charCodeAt(Z) & 1023;
        Y = Z + 1, W = 65536 + ((W & 1023) << 10 | Q), J += $8[240 | W >> 18] + $8[128 | W >> 12 & 63] + $8[128 | W >> 6 & 63] + $8[128 | W & 63];
      }
    if (Y === 0)
      return $;
    if (Y < X)
      return J + $.slice(Y);
    return J;
  }, $8 = Array.from({ length: 256 }, ($, X) => "%" + ((X < 16 ? "0" : "") + X.toString(16)).toUpperCase()), $q = new Int8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0]);
  nZ.exports = { encodeString: Xq };
});
var rZ = u8((aR, sZ) => {
  var tZ = function($) {
    const X = typeof $;
    if (X === "string")
      return pJ($);
    else if (X === "bigint")
      return $.toString();
    else if (X === "boolean")
      return $ ? "true" : "false";
    else if (X === "number" && Number.isFinite($))
      return $ < 1000000000000000000000 ? "" + $ : pJ("" + $);
    return "";
  }, Jq = function($) {
    let X = "";
    if ($ === null || typeof $ !== "object")
      return X;
    const J = "&", Y = Object.keys($), Z = Y.length;
    let W = 0;
    for (let Q = 0;Q < Z; Q++) {
      const z = Y[Q], q = $[z], U = pJ(z) + "=";
      if (Q)
        X += J;
      if (Array.isArray(q)) {
        W = q.length;
        for (let A = 0;A < W; A++) {
          if (A)
            X += J;
          X += U, X += tZ(q[A]);
        }
      } else
        X += U, X += tZ(q);
    }
    return X;
  }, { encodeString: pJ } = lZ();
  sZ.exports = Jq;
});
var hJ = u8((eR, w6) => {
  var aZ = oZ(), eZ = rZ(), $4 = { parse: aZ, stringify: eZ };
  w6.exports = $4;
  w6.exports.default = $4;
  w6.exports.parse = aZ;
  w6.exports.stringify = eZ;
});
var c8 = ($, X) => ({ part: $, store: null, inert: X !== undefined ? new Map(X.map((J) => [J.part.charCodeAt(0), J])) : null, params: null, wildcardStore: null });
var tJ = ($, X) => ({ ...$, part: X });
var sJ = ($) => ({ paramName: $, store: null, inert: null });

class j8 {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g };
  add($, X, J) {
    let Y;
    if (typeof X != "string")
      throw TypeError("Route path must be a string");
    X === "" ? X = "/" : X[0] !== "/" && (X = `/${X}`), this.history.push([$, X, J]);
    let Z = X[X.length - 1] === "*";
    Z && (X = X.slice(0, -1));
    let W = X.split(j8.regex.static), Q = X.match(j8.regex.params) || [];
    W[W.length - 1] === "" && W.pop(), Y = this.root[$] ? this.root[$] : this.root[$] = c8("/");
    let z = 0;
    for (let q = 0;q < W.length; ++q) {
      let U = W[q];
      if (q > 0) {
        let A = Q[z++].slice(1);
        if (Y.params === null)
          Y.params = sJ(A);
        else if (Y.params.paramName !== A)
          throw Error(`Cannot create route "${X}" with parameter "${A}" because a route already exists with a different parameter name ("${Y.params.paramName}") in the same location`);
        let O = Y.params;
        if (O.inert === null) {
          Y = O.inert = c8(U);
          continue;
        }
        Y = O.inert;
      }
      for (let A = 0;; ) {
        if (A === U.length) {
          if (A < Y.part.length) {
            let O = tJ(Y, Y.part.slice(A));
            Object.assign(Y, c8(U, [O]));
          }
          break;
        }
        if (A === Y.part.length) {
          if (Y.inert === null)
            Y.inert = new Map;
          else if (Y.inert.has(U.charCodeAt(A))) {
            Y = Y.inert.get(U.charCodeAt(A)), U = U.slice(A), A = 0;
            continue;
          }
          let O = c8(U.slice(A));
          Y.inert.set(U.charCodeAt(A), O), Y = O;
          break;
        }
        if (U[A] !== Y.part[A]) {
          let O = tJ(Y, Y.part.slice(A)), T = c8(U.slice(A));
          Object.assign(Y, c8(Y.part.slice(0, A), [O, T])), Y = T;
          break;
        }
        ++A;
      }
    }
    if (z < Q.length) {
      let q = Q[z], U = q.slice(1);
      if (Y.params === null)
        Y.params = sJ(U);
      else if (Y.params.paramName !== U)
        throw Error(`Cannot create route "${X}" with parameter "${U}" because a route already exists with a different parameter name ("${Y.params.paramName}") in the same location`);
      return Y.params.store === null && (Y.params.store = J), Y.params.store;
    }
    return Z ? (Y.wildcardStore === null && (Y.wildcardStore = J), Y.wildcardStore) : (Y.store === null && (Y.store = J), Y.store);
  }
  find($, X) {
    let J = this.root[$];
    return J ? PX(X, X.length, J, 0) : null;
  }
}
var PX = ($, X, J, Y) => {
  let Z = J?.part, W = Y + Z.length;
  if (Z.length > 1) {
    if (W > X)
      return null;
    if (Z.length < 15) {
      for (let Q = 1, z = Y + 1;Q < Z.length; ++Q, ++z)
        if (Z.charCodeAt(Q) !== $.charCodeAt(z))
          return null;
    } else if ($.substring(Y, W) !== Z)
      return null;
  }
  if (W === X)
    return J.store !== null ? { store: J.store, params: {} } : J.wildcardStore !== null ? { store: J.wildcardStore, params: { "*": "" } } : null;
  if (J.inert !== null) {
    let Q = J.inert.get($.charCodeAt(W));
    if (Q !== undefined) {
      let z = PX($, X, Q, W);
      if (z !== null)
        return z;
    }
  }
  if (J.params !== null) {
    let Q = J.params, z = $.indexOf("/", W);
    if (z !== W) {
      if (z === -1 || z >= X) {
        if (Q.store !== null) {
          let q = {};
          return q[Q.paramName] = $.substring(W, X), { store: Q.store, params: q };
        }
      } else if (Q.inert !== null) {
        let q = PX($, X, Q.inert, z);
        if (q !== null)
          return q.params[Q.paramName] = $.substring(W, z), q;
      }
    }
  }
  return J.wildcardStore !== null ? { store: J.wildcardStore, params: { "*": $.substring(W, X) } } : null;
};
var eJ = A6(aJ(), 1);
var $Y = eJ.default;
var O6 = () => {
  let $;
  return [new Promise((J) => {
    $ = J;
  }), $];
};
var H8 = () => {
  const [$, X] = O6(), [J, Y] = O6(), Z = [], W = [];
  return { signal: $, consume: (Q) => {
    switch (Q.type) {
      case "begin":
        if (Q.unit && Z.length === 0)
          for (let z = 0;z < Q.unit; z++) {
            const [q, U] = O6(), [A, O] = O6();
            Z.push(q), W.push([(T) => {
              U({ children: [], end: A, name: T.name ?? "", skip: false, time: T.time });
            }, (T) => {
              O(T);
            }]);
          }
        X({ children: Z, end: J, name: Q.name ?? "", skip: false, time: Q.time });
        break;
      case "end":
        Y(Q.time);
        break;
    }
  }, consumeChild(Q) {
    switch (Q.type) {
      case "begin":
        if (!W[0])
          return;
        const [z] = W[0];
        z({ children: [], end: J, name: Q.name ?? "", skip: false, time: Q.time });
        break;
      case "end":
        const q = W.shift();
        if (!q)
          return;
        q[1](Q.time);
    }
  }, resolve() {
    X({ children: [], end: new Promise((Q) => Q(0)), name: "", skip: true, time: 0 });
    for (let [Q, z] of W)
      Q({ children: [], end: new Promise((q) => q(0)), name: "", skip: true, time: 0 }), z(0);
    Y(0);
  } };
};
var XY = ($, X, J) => {
  return async function Y(Y) {
    if (Y.event !== "request" || Y.type !== "begin")
      return;
    const Z = Y.id, W = $(), Q = H8(), z = H8(), q = H8(), U = H8(), A = H8(), O = H8(), T = H8(), E = H8();
    Q.consume(Y);
    const _ = (x) => {
      if (x.id === Z)
        switch (x.event) {
          case "request":
            Q.consume(x);
            break;
          case "request.unit":
            Q.consumeChild(x);
            break;
          case "parse":
            z.consume(x);
            break;
          case "parse.unit":
            z.consumeChild(x);
            break;
          case "transform":
            q.consume(x);
            break;
          case "transform.unit":
            q.consumeChild(x);
            break;
          case "beforeHandle":
            U.consume(x);
            break;
          case "beforeHandle.unit":
            U.consumeChild(x);
            break;
          case "handle":
            A.consume(x);
            break;
          case "afterHandle":
            O.consume(x);
            break;
          case "afterHandle.unit":
            O.consumeChild(x);
            break;
          case "error":
            T.consume(x);
            break;
          case "error.unit":
            T.consumeChild(x);
            break;
          case "response":
            if (x.type === "begin")
              Q.resolve(), z.resolve(), q.resolve(), U.resolve(), A.resolve(), O.resolve(), T.resolve();
            else
              W.off("event", _);
            E.consume(x);
            break;
          case "response.unit":
            E.consumeChild(x);
            break;
          case "exit":
            Q.resolve(), z.resolve(), q.resolve(), U.resolve(), A.resolve(), O.resolve(), T.resolve();
            break;
        }
    };
    W.on("event", _), await J({ id: Z, context: Y.ctx, set: Y.ctx?.set, store: Y.ctx?.store, time: Y.time, request: Q.signal, parse: z.signal, transform: q.signal, beforeHandle: U.signal, handle: A.signal, afterHandle: O.signal, error: T.signal, response: E.signal }), W.emit(`res${Z}.${X}`, undefined);
  };
};
var S0;
(function($) {
  $.ExactOptionalPropertyTypes = false, $.AllowArrayObject = false, $.AllowNaN = false, $.AllowNullVoid = false;
  function X(Q, z) {
    return $.ExactOptionalPropertyTypes ? z in Q : Q[z] !== undefined;
  }
  $.IsExactOptionalProperty = X;
  function J(Q) {
    const z = x0(Q);
    return $.AllowArrayObject ? z : z && !f(Q);
  }
  $.IsObjectLike = J;
  function Y(Q) {
    return J(Q) && !(Q instanceof Date) && !(Q instanceof Uint8Array);
  }
  $.IsRecordLike = Y;
  function Z(Q) {
    const z = k(Q);
    return $.AllowNaN ? z : z && Number.isFinite(Q);
  }
  $.IsNumberLike = Z;
  function W(Q) {
    const z = z0(Q);
    return $.AllowNullVoid ? z || Q === null : z;
  }
  $.IsVoidLike = W;
})(S0 || (S0 = {}));
var g0 = {};
G8(g0, { Set: () => {
  {
    return P4;
  }
}, Has: () => {
  {
    return _4;
  }
}, Get: () => {
  {
    return L4;
  }
}, Entries: () => {
  {
    return N4;
  }
}, Delete: () => {
  {
    return S4;
  }
}, Clear: () => {
  {
    return O4;
  }
} });
var n8 = new Map;
var V0 = {};
G8(V0, { Set: () => {
  {
    return j4;
  }
}, Has: () => {
  {
    return R4;
  }
}, Get: () => {
  {
    return K4;
  }
}, Entries: () => {
  {
    return C4;
  }
}, Delete: () => {
  {
    return b4;
  }
}, Clear: () => {
  {
    return F4;
  }
} });
var l8 = new Map;
var C0 = Symbol.for("TypeBox.Transform");
var D8 = Symbol.for("TypeBox.Readonly");
var $1 = Symbol.for("TypeBox.Optional");
var S1 = Symbol.for("TypeBox.Hint");
var H = Symbol.for("TypeBox.Kind");

class d extends Error {
  constructor($) {
    super($);
  }
}

class CX extends d {
  constructor($) {
    super(`Duplicate type kind '${$}' detected`);
  }
}

class FX extends d {
  constructor($) {
    super(`Duplicate string format '${$}' detected`);
  }
}
var v1;
(function($) {
  function X(Y, Z) {
    if (V0.Has(Y))
      throw new CX(Y);
    return V0.Set(Y, Z), (W = {}) => t8({ ...W, [H]: Y });
  }
  $.Type = X;
  function J(Y, Z) {
    if (g0.Has(Y))
      throw new FX(Y);
    return g0.Set(Y, Z), Y;
  }
  $.Format = J;
})(v1 || (v1 = {}));
var _6 = {};
G8(_6, { CloneType: () => {
  {
    return C;
  }
}, CloneRest: () => {
  {
    return _0;
  }
} });
var J1 = {};
G8(J1, { IsUndefined: () => {
  {
    return G0;
  }
}, IsUint8Array: () => {
  {
    return E8;
  }
}, IsSymbol: () => {
  {
    return EX;
  }
}, IsString: () => {
  {
    return M0;
  }
}, IsRegExp: () => {
  {
    return VX;
  }
}, IsObject: () => {
  {
    return F0;
  }
}, IsNumber: () => {
  {
    return p1;
  }
}, IsNull: () => {
  {
    return KX;
  }
}, IsIterator: () => {
  {
    return jX;
  }
}, IsFunction: () => {
  {
    return RX;
  }
}, IsDate: () => {
  {
    return m$;
  }
}, IsBoolean: () => {
  {
    return V8;
  }
}, IsBigInt: () => {
  {
    return h$;
  }
}, IsAsyncIterator: () => {
  {
    return bX;
  }
}, IsArray: () => {
  {
    return X1;
  }
} });
var V4 = function($) {
  return $.map((X) => S6(X));
};
var E4 = function($) {
  return new Date($.getTime());
};
var I4 = function($) {
  return new Uint8Array($);
};
var x4 = function($) {
  return new RegExp($.source, $.flags);
};
var k4 = function($) {
  const X = Object.getOwnPropertyNames($).reduce((Y, Z) => ({ ...Y, [Z]: S6($[Z]) }), {}), J = Object.getOwnPropertySymbols($).reduce((Y, Z) => ({ ...Y, [Z]: S6($[Z]) }), {});
  return { ...X, ...J };
};
var S6 = function($) {
  return X1($) ? V4($) : m$($) ? E4($) : E8($) ? I4($) : VX($) ? x4($) : F0($) ? k4($) : $;
};
var T4 = function($, X) {
  const { [X]: J, ...Y } = $;
  return Y;
};
var B = {};
G8(B, { TypeGuardUnknownTypeError: () => {
  {
    return YY;
  }
}, IsVoid: () => {
  {
    return _Y;
  }
}, IsUnsafe: () => {
  {
    return SY;
  }
}, IsUnknown: () => {
  {
    return OY;
  }
}, IsUnionLiteral: () => {
  {
    return h4;
  }
}, IsUnion: () => {
  {
    return u;
  }
}, IsUndefined: () => {
  {
    return AY;
  }
}, IsUint8Array: () => {
  {
    return NY;
  }
}, IsTuple: () => {
  {
    return _1;
  }
}, IsTransform: () => {
  {
    return r;
  }
}, IsThis: () => {
  {
    return DY;
  }
}, IsTemplateLiteral: () => {
  {
    return i0;
  }
}, IsSymbol: () => {
  {
    return HY;
  }
}, IsString: () => {
  {
    return Y$;
  }
}, IsSchema: () => {
  {
    return g;
  }
}, IsRegExp: () => {
  {
    return R6;
  }
}, IsRef: () => {
  {
    return b6;
  }
}, IsRecursive: () => {
  {
    return p4;
  }
}, IsRecord: () => {
  {
    return F6;
  }
}, IsReadonly: () => {
  {
    return kX;
  }
}, IsProperties: () => {
  {
    return gX;
  }
}, IsPromise: () => {
  {
    return O8;
  }
}, IsOptional: () => {
  {
    return I1;
  }
}, IsObject: () => {
  {
    return O0;
  }
}, IsNumber: () => {
  {
    return N8;
  }
}, IsNull: () => {
  {
    return GY;
  }
}, IsNot: () => {
  {
    return wY;
  }
}, IsNever: () => {
  {
    return C6;
  }
}, IsMappedResult: () => {
  {
    return Z0;
  }
}, IsMappedKey: () => {
  {
    return Y1;
  }
}, IsLiteralValue: () => {
  {
    return UY;
  }
}, IsLiteralString: () => {
  {
    return BY;
  }
}, IsLiteralNumber: () => {
  {
    return MY;
  }
}, IsLiteralBoolean: () => {
  {
    return v4;
  }
}, IsLiteral: () => {
  {
    return U1;
  }
}, IsKindOf: () => {
  {
    return i;
  }
}, IsKind: () => {
  {
    return PY;
  }
}, IsIterator: () => {
  {
    return J$;
  }
}, IsIntersect: () => {
  {
    return N0;
  }
}, IsInteger: () => {
  {
    return A8;
  }
}, IsFunction: () => {
  {
    return X$;
  }
}, IsDate: () => {
  {
    return qY;
  }
}, IsConstructor: () => {
  {
    return $$;
  }
}, IsBoolean: () => {
  {
    return L6;
  }
}, IsBigInt: () => {
  {
    return P6;
  }
}, IsAsyncIterator: () => {
  {
    return e8;
  }
}, IsArray: () => {
  {
    return m1;
  }
}, IsAny: () => {
  {
    return zY;
  }
} });
var ZY = function($) {
  try {
    return new RegExp($), true;
  } catch {
    return false;
  }
};
var IX = function($) {
  if (!M0($))
    return false;
  for (let X = 0;X < $.length; X++) {
    const J = $.charCodeAt(X);
    if (J >= 7 && J <= 13 || J === 27 || J === 127)
      return false;
  }
  return true;
};
var WY = function($) {
  return xX($) || g($);
};
var i$ = function($) {
  return G0($) || h$($);
};
var q0 = function($) {
  return G0($) || p1($);
};
var xX = function($) {
  return G0($) || V8($);
};
var X0 = function($) {
  return G0($) || M0($);
};
var y4 = function($) {
  return G0($) || M0($) && IX($) && ZY($);
};
var d4 = function($) {
  return G0($) || M0($) && IX($);
};
var QY = function($) {
  return G0($) || g($);
};

class YY extends d {
}
var f4 = ["Any", "Array", "AsyncIterator", "BigInt", "Boolean", "Constructor", "Date", "Enum", "Function", "Integer", "Intersect", "Iterator", "Literal", "MappedKey", "MappedResult", "Not", "Null", "Number", "Object", "Promise", "Record", "Ref", "RegExp", "String", "Symbol", "TemplateLiteral", "This", "Tuple", "Undefined", "Union", "Uint8Array", "Unknown", "Void"];
var m4 = function($) {
  return A0(C($), [$1]);
};
var i4 = function($) {
  return { ...C($), [$1]: "Optional" };
};
var u4 = function($, X) {
  return X === false ? m4($) : i4($);
};
var c4 = function($, X) {
  return globalThis.Object.getOwnPropertyNames($).reduce((J, Y) => {
    return { ...J, [Y]: u0($[Y], X) };
  }, {});
};
var o4 = function($, X) {
  return c4($.properties, X);
};
var n4 = function($) {
  return $.every((X) => I1(X));
};
var l4 = function($) {
  return A0($, [$1]);
};
var LY = function($) {
  return $.map((X) => I1(X) ? l4(X) : X);
};
var t4 = function($, X) {
  return n4($) ? u0(u$(LY($), X)) : u$(LY($), X);
};
var s4 = function($) {
  return $.some((X) => I1(X));
};
var CY = function($) {
  return $.map((X) => I1(X) ? r4(X) : X);
};
var r4 = function($) {
  return A0($, [$1]);
};
var a4 = function($, X) {
  return s4($) ? u0(c$(CY($), X)) : c$(CY($), X);
};
var dX = function($, X, J) {
  return $[X] === J && $.charCodeAt(X - 1) !== 92;
};
var Y8 = function($, X) {
  return dX($, X, "(");
};
var o$ = function($, X) {
  return dX($, X, ")");
};
var FY = function($, X) {
  return dX($, X, "|");
};
var e4 = function($) {
  if (!(Y8($, 0) && o$($, $.length - 1)))
    return false;
  let X = 0;
  for (let J = 0;J < $.length; J++) {
    if (Y8($, J))
      X += 1;
    if (o$($, J))
      X -= 1;
    if (X === 0 && J !== $.length - 1)
      return false;
  }
  return true;
};
var $W = function($) {
  return $.slice(1, $.length - 1);
};
var XW = function($) {
  let X = 0;
  for (let J = 0;J < $.length; J++) {
    if (Y8($, J))
      X += 1;
    if (o$($, J))
      X -= 1;
    if (FY($, J) && X === 0)
      return true;
  }
  return false;
};
var JW = function($) {
  for (let X = 0;X < $.length; X++)
    if (Y8($, X))
      return true;
  return false;
};
var YW = function($) {
  let [X, J] = [0, 0];
  const Y = [];
  for (let W = 0;W < $.length; W++) {
    if (Y8($, W))
      X += 1;
    if (o$($, W))
      X -= 1;
    if (FY($, W) && X === 0) {
      const Q = $.slice(J, W);
      if (Q.length > 0)
        Y.push(I8(Q));
      J = W + 1;
    }
  }
  const Z = $.slice(J);
  if (Z.length > 0)
    Y.push(I8(Z));
  if (Y.length === 0)
    return { type: "const", const: "" };
  if (Y.length === 1)
    return Y[0];
  return { type: "or", expr: Y };
};
var ZW = function($) {
  function X(Z, W) {
    if (!Y8(Z, W))
      throw new yX("TemplateLiteralParser: Index must point to open parens");
    let Q = 0;
    for (let z = W;z < Z.length; z++) {
      if (Y8(Z, z))
        Q += 1;
      if (o$(Z, z))
        Q -= 1;
      if (Q === 0)
        return [W, z];
    }
    throw new yX("TemplateLiteralParser: Unclosed group parens in expression");
  }
  function J(Z, W) {
    for (let Q = W;Q < Z.length; Q++)
      if (Y8(Z, Q))
        return [W, Q];
    return [W, Z.length];
  }
  const Y = [];
  for (let Z = 0;Z < $.length; Z++)
    if (Y8($, Z)) {
      const [W, Q] = X($, Z), z = $.slice(W, Q + 1);
      Y.push(I8(z)), Z = Q;
    } else {
      const [W, Q] = J($, Z), z = $.slice(W, Q);
      if (z.length > 0)
        Y.push(I8(z));
      Z = Q - 1;
    }
  return Y.length === 0 ? { type: "const", const: "" } : Y.length === 1 ? Y[0] : { type: "and", expr: Y };
};

class yX extends d {
}
var WW = function($) {
  return $.type === "or" && $.expr.length === 2 && $.expr[0].type === "const" && $.expr[0].const === "0" && $.expr[1].type === "const" && $.expr[1].const === "[1-9][0-9]*";
};
var QW = function($) {
  return $.type === "or" && $.expr.length === 2 && $.expr[0].type === "const" && $.expr[0].const === "true" && $.expr[1].type === "const" && $.expr[1].const === "false";
};
var zW = function($) {
  return $.type === "const" && $.const === ".*";
};

class bY extends d {
}

class RY extends d {
}
var pX = "(true|false)";
var l$ = "(0|[1-9][0-9]*)";
var hX = "(.*)";
var i1 = "^(0|[1-9][0-9]*)$";
var Z8 = "^(.*)$";
var GW = function($) {
  return $.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var EY = function($, X) {
  return i0($) ? $.pattern.slice(1, $.pattern.length - 1) : u($) ? `(${$.anyOf.map((J) => EY(J, X)).join("|")})` : N8($) ? `${X}${l$}` : A8($) ? `${X}${l$}` : P6($) ? `${X}${l$}` : Y$($) ? `${X}${hX}` : U1($) ? `${X}${GW($.const.toString())}` : L6($) ? `${X}${pX}` : (() => {
    throw new VY(`Unexpected Kind '${$[H]}'`);
  })();
};

class VY extends d {
}
var HW = function($) {
  return k8($).map((J) => J.toString());
};
var DW = function($) {
  return $.reduce((X, J) => {
    return [...X, ...t0(J)];
  }, []);
};
var AW = function($) {
  return [$.toString()];
};
var NW = function($, X, J) {
  return globalThis.Object.getOwnPropertyNames(X).reduce((Y, Z) => {
    return { ...Y, [Z]: W1($, t0(X[Z]), J) };
  }, {});
};
var OW = function($, X, J) {
  return NW($, X.properties, J);
};
var xY = function($, X) {
  return $.map((J) => kY(J, X));
};
var SW = function($) {
  return $.filter((X) => !C6(X));
};
var _W = function($, X) {
  return fX(SW(xY($, X)));
};
var PW = function($) {
  return $;
};
var LW = function($, X) {
  return J8(PW(xY($, X)));
};
var CW = function($, X) {
  return X in $ ? $[X] : X === "[number]" ? J8($) : e();
};
var FW = function($, X) {
  return X === "[number]" ? $ : e();
};
var bW = function($, X) {
  return X in $ ? $[X] : e();
};
var kY = function($, X) {
  return N0($) ? _W($.allOf, X) : u($) ? LW($.anyOf, X) : _1($) ? CW($.items ?? [], X) : m1($) ? FW($.items, X) : O0($) ? bW($.properties, X) : e();
};
var RW = function($, X) {
  return X.map((J) => kY($, J));
};
var IY = function($, X) {
  return J8(RW($, X));
};
var jW = function($, X, J) {
  return { [X]: W1($, [X], J) };
};
var KW = function($, X, J) {
  return X.reduce((Y, Z) => {
    return { ...Y, ...jW($, Z, J) };
  }, {});
};
var VW = function($, X, J) {
  return KW($, X.keys, J);
};
var $0 = EW;
var IW = function($) {
  return A0(C($), [D8]);
};
var xW = function($) {
  return { ...C($), [D8]: "Readonly" };
};
var kW = function($, X) {
  return X === false ? IW($) : xW($);
};
var gW = function($, X) {
  return globalThis.Object.getOwnPropertyNames($).reduce((J, Y) => {
    return { ...J, [Y]: Q1($[Y], X) };
  }, {});
};
var TW = function($, X) {
  return gW($.properties, X);
};
var yY = function($, X) {
  return $ in X ? C1($, X[$]) : m(X);
};
var yW = function($) {
  return { [$]: n($) };
};
var dW = function($) {
  return $.reduce((X, J) => {
    return { ...X, [J]: n(J) };
  }, {});
};
var vW = function($, X) {
  return gY(X, $) ? yW($) : dW(X);
};
var pW = function($, X) {
  const J = vW($, X);
  return yY($, J);
};
var t$ = function($, X) {
  return X.map((J) => C1($, J));
};
var hW = function($, X) {
  return globalThis.Object.getOwnPropertyNames(X).reduce((J, Y) => {
    return { ...J, [Y]: C1($, X[Y]) };
  }, {});
};
var C1 = function($, X) {
  return I1(X) ? u0(C1($, A0(X, [$1]))) : kX(X) ? Q1(C1($, A0(X, [D8]))) : Z0(X) ? yY($, X.properties) : Y1(X) ? pW($, X.keys) : $$(X) ? a8(t$($, X.parameters), C1($, X.returns)) : X$(X) ? h1(t$($, X.parameters), C1($, X.returns)) : e8(X) ? r8(C1($, X.items)) : J$(X) ? z$(C1($, X.items)) : N0(X) ? T0(t$($, X.allOf)) : u(X) ? l(t$($, X.anyOf)) : _1(X) ? L1(t$($, X.items ?? [])) : O0(X) ? $0(hW($, X.properties)) : m1(X) ? s8(C1($, X.items)) : O8(X) ? q$(C1($, X.item)) : X;
};
var mW = function($, X, J = {}) {
  return $.reduce((Y, Z) => {
    return { ...Y, [Z]: C1(Z, X) };
  }, {});
};
var dY = function($) {
  return $.reduce((X, J) => {
    return [...X, s0(J)];
  }, []);
};
var iW = function($) {
  const X = dY($);
  return fY(X);
};
var uW = function($) {
  const X = dY($);
  return TY(X);
};
var cW = function($) {
  return $.map((X, J) => J.toString());
};
var oW = function($) {
  return ["[number]"];
};
var nW = function($) {
  return globalThis.Object.getOwnPropertyNames($);
};
var lW = function($) {
  if (!oX)
    return [];
  return globalThis.Object.getOwnPropertyNames($).map((J) => {
    return J[0] === "^" && J[J.length - 1] === "$" ? J.slice(1, J.length - 1) : J;
  });
};
var oX = false;
var tW = function($) {
  return $.map((X) => X === "[number]" ? P1() : n(X));
};
var sW = function($, X) {
  return globalThis.Object.getOwnPropertyNames($).reduce((J, Y) => {
    return { ...J, [Y]: B$($[Y], X) };
  }, {});
};
var rW = function($, X) {
  return sW($.properties, X);
};
var aW = function($) {
  return $.allOf.every((X) => c1(X));
};
var eW = function($) {
  return $.anyOf.some((X) => c1(X));
};
var $Q = function($) {
  return !c1($.not);
};
var XQ = pY;

class hY extends d {
  schema;
  constructor($) {
    super(`Unable to dereference schema with $id '${$.$id}'`);
    this.schema = $;
  }
}
var QQ = function($) {
  c0(w1.Array);
  for (let X of $)
    U$(X);
};
var zQ = function($) {
  c0(w1.Boolean), c0($ ? 1 : 0);
};
var qQ = function($) {
  c0(w1.BigInt), iY.setBigInt64(0, $);
  for (let X of uY)
    c0(X);
};
var BQ = function($) {
  c0(w1.Date), U$($.getTime());
};
var MQ = function($) {
  c0(w1.Null);
};
var UQ = function($) {
  c0(w1.Number), iY.setFloat64(0, $);
  for (let X of uY)
    c0(X);
};
var wQ = function($) {
  c0(w1.Object);
  for (let X of globalThis.Object.keys($).sort())
    U$(X), U$($[X]);
};
var GQ = function($) {
  c0(w1.String);
  for (let X = 0;X < $.length; X++)
    for (let J of WQ($.charCodeAt(X)))
      c0(J);
};
var HQ = function($) {
  c0(w1.Symbol), U$($.description);
};
var DQ = function($) {
  c0(w1.Uint8Array);
  for (let X = 0;X < $.length; X++)
    c0($[X]);
};
var AQ = function($) {
  return c0(w1.Undefined);
};
var U$ = function($) {
  if (f($))
    return QQ($);
  if (E1($))
    return zQ($);
  if (k0($))
    return qQ($);
  if (a0($))
    return BQ($);
  if (d1($))
    return MQ($);
  if (k($))
    return UQ($);
  if (Y0($))
    return wQ($);
  if (p($))
    return GQ($);
  if (l0($))
    return HQ($);
  if (K8($))
    return DQ($);
  if (z0($))
    return AQ($);
  throw new lX($);
};
var c0 = function($) {
  M$ = M$ ^ ZQ[$], M$ = M$ * JQ % YQ;
};

class lX extends d {
  value;
  constructor($) {
    super("Unable to hash value");
    this.value = $;
  }
}
var w1;
(function($) {
  $[$.Undefined = 0] = "Undefined", $[$.Null = 1] = "Null", $[$.Boolean = 2] = "Boolean", $[$.Number = 3] = "Number", $[$.String = 4] = "String", $[$.Object = 5] = "Object", $[$.Array = 6] = "Array", $[$.Date = 7] = "Date", $[$.Uint8Array = 8] = "Uint8Array", $[$.Symbol = 9] = "Symbol", $[$.BigInt = 10] = "BigInt";
})(w1 || (w1 = {}));
var M$ = BigInt("14695981039346656037");
var [JQ, YQ] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
var ZQ = Array.from({ length: 256 }).map(($, X) => BigInt(X));
var mY = new Float64Array(1);
var iY = new DataView(mY.buffer);
var uY = new Uint8Array(mY.buffer);
var z8 = function($) {
  return $.replace(/~/g, "~0").replace(/\//g, "~1");
};
var c = function($) {
  return $ !== undefined;
};
var R = function($, X, J, Y) {
  return { type: $, schema: X, path: J, value: Y, message: nX()({ errorType: $, path: J, schema: X, value: Y }) };
};
var G;
(function($) {
  $[$.ArrayContains = 0] = "ArrayContains", $[$.ArrayMaxContains = 1] = "ArrayMaxContains", $[$.ArrayMaxItems = 2] = "ArrayMaxItems", $[$.ArrayMinContains = 3] = "ArrayMinContains", $[$.ArrayMinItems = 4] = "ArrayMinItems", $[$.ArrayUniqueItems = 5] = "ArrayUniqueItems", $[$.Array = 6] = "Array", $[$.AsyncIterator = 7] = "AsyncIterator", $[$.BigIntExclusiveMaximum = 8] = "BigIntExclusiveMaximum", $[$.BigIntExclusiveMinimum = 9] = "BigIntExclusiveMinimum", $[$.BigIntMaximum = 10] = "BigIntMaximum", $[$.BigIntMinimum = 11] = "BigIntMinimum", $[$.BigIntMultipleOf = 12] = "BigIntMultipleOf", $[$.BigInt = 13] = "BigInt", $[$.Boolean = 14] = "Boolean", $[$.DateExclusiveMaximumTimestamp = 15] = "DateExclusiveMaximumTimestamp", $[$.DateExclusiveMinimumTimestamp = 16] = "DateExclusiveMinimumTimestamp", $[$.DateMaximumTimestamp = 17] = "DateMaximumTimestamp", $[$.DateMinimumTimestamp = 18] = "DateMinimumTimestamp", $[$.DateMultipleOfTimestamp = 19] = "DateMultipleOfTimestamp", $[$.Date = 20] = "Date", $[$.Function = 21] = "Function", $[$.IntegerExclusiveMaximum = 22] = "IntegerExclusiveMaximum", $[$.IntegerExclusiveMinimum = 23] = "IntegerExclusiveMinimum", $[$.IntegerMaximum = 24] = "IntegerMaximum", $[$.IntegerMinimum = 25] = "IntegerMinimum", $[$.IntegerMultipleOf = 26] = "IntegerMultipleOf", $[$.Integer = 27] = "Integer", $[$.IntersectUnevaluatedProperties = 28] = "IntersectUnevaluatedProperties", $[$.Intersect = 29] = "Intersect", $[$.Iterator = 30] = "Iterator", $[$.Kind = 31] = "Kind", $[$.Literal = 32] = "Literal", $[$.Never = 33] = "Never", $[$.Not = 34] = "Not", $[$.Null = 35] = "Null", $[$.NumberExclusiveMaximum = 36] = "NumberExclusiveMaximum", $[$.NumberExclusiveMinimum = 37] = "NumberExclusiveMinimum", $[$.NumberMaximum = 38] = "NumberMaximum", $[$.NumberMinimum = 39] = "NumberMinimum", $[$.NumberMultipleOf = 40] = "NumberMultipleOf", $[$.Number = 41] = "Number", $[$.ObjectAdditionalProperties = 42] = "ObjectAdditionalProperties", $[$.ObjectMaxProperties = 43] = "ObjectMaxProperties", $[$.ObjectMinProperties = 44] = "ObjectMinProperties", $[$.ObjectRequiredProperty = 45] = "ObjectRequiredProperty", $[$.Object = 46] = "Object", $[$.Promise = 47] = "Promise", $[$.RegExp = 48] = "RegExp", $[$.StringFormatUnknown = 49] = "StringFormatUnknown", $[$.StringFormat = 50] = "StringFormat", $[$.StringMaxLength = 51] = "StringMaxLength", $[$.StringMinLength = 52] = "StringMinLength", $[$.StringPattern = 53] = "StringPattern", $[$.String = 54] = "String", $[$.Symbol = 55] = "Symbol", $[$.TupleLength = 56] = "TupleLength", $[$.Tuple = 57] = "Tuple", $[$.Uint8ArrayMaxByteLength = 58] = "Uint8ArrayMaxByteLength", $[$.Uint8ArrayMinByteLength = 59] = "Uint8ArrayMinByteLength", $[$.Uint8Array = 60] = "Uint8Array", $[$.Undefined = 61] = "Undefined", $[$.Union = 62] = "Union", $[$.Void = 63] = "Void";
})(G || (G = {}));

class tX extends d {
  schema;
  constructor($) {
    super("Unknown type");
    this.schema = $;
  }
}

class s$ {
  iterator;
  constructor($) {
    this.iterator = $;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  First() {
    const $ = this.iterator.next();
    return $.done ? undefined : $.value;
  }
}
var F1 = function($) {
  return $ === N.False ? $ : N.True;
};
var G$ = function($) {
  throw new tY($);
};
var b0 = function($) {
  return B.IsNever($) || B.IsIntersect($) || B.IsUnion($) || B.IsUnknown($) || B.IsAny($);
};
var R0 = function($, X) {
  return B.IsNever(X) ? aY($, X) : B.IsIntersect(X) ? K6($, X) : B.IsUnion(X) ? $J($, X) : B.IsUnknown(X) ? JZ($, X) : B.IsAny(X) ? eX($, X) : G$("StructuralRight");
};
var eX = function($, X) {
  return N.True;
};
var tQ = function($, X) {
  return B.IsIntersect(X) ? K6($, X) : B.IsUnion(X) && X.anyOf.some((J) => B.IsAny(J) || B.IsUnknown(J)) ? N.True : B.IsUnion(X) ? N.Union : B.IsUnknown(X) ? N.True : B.IsAny(X) ? N.True : N.Union;
};
var sQ = function($, X) {
  return B.IsUnknown($) ? N.False : B.IsAny($) ? N.Union : B.IsNever($) ? N.True : N.False;
};
var rQ = function($, X) {
  return B.IsObject(X) && V6(X) ? N.True : b0(X) ? R0($, X) : !B.IsArray(X) ? N.False : F1(J0($.items, X.items));
};
var aQ = function($, X) {
  return b0(X) ? R0($, X) : !B.IsAsyncIterator(X) ? N.False : F1(J0($.items, X.items));
};
var eQ = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsBigInt(X) ? N.True : N.False;
};
var sY = function($, X) {
  return B.IsLiteralBoolean($) ? N.True : B.IsBoolean($) ? N.True : N.False;
};
var $7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsBoolean(X) ? N.True : N.False;
};
var X7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : !B.IsConstructor(X) ? N.False : $.parameters.length > X.parameters.length ? N.False : !$.parameters.every((J, Y) => F1(J0(X.parameters[Y], J)) === N.True) ? N.False : F1(J0($.returns, X.returns));
};
var J7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsDate(X) ? N.True : N.False;
};
var Y7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : !B.IsFunction(X) ? N.False : $.parameters.length > X.parameters.length ? N.False : !$.parameters.every((J, Y) => F1(J0(X.parameters[Y], J)) === N.True) ? N.False : F1(J0($.returns, X.returns));
};
var rY = function($, X) {
  return B.IsLiteral($) && J1.IsNumber($.const) ? N.True : B.IsNumber($) || B.IsInteger($) ? N.True : N.False;
};
var Z7 = function($, X) {
  return B.IsInteger(X) || B.IsNumber(X) ? N.True : b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : N.False;
};
var K6 = function($, X) {
  return X.allOf.every((J) => J0($, J) === N.True) ? N.True : N.False;
};
var W7 = function($, X) {
  return $.allOf.some((J) => J0(J, X) === N.True) ? N.True : N.False;
};
var Q7 = function($, X) {
  return b0(X) ? R0($, X) : !B.IsIterator(X) ? N.False : F1(J0($.items, X.items));
};
var z7 = function($, X) {
  return B.IsLiteral(X) && X.const === $.const ? N.True : b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsString(X) ? XZ($, X) : B.IsNumber(X) ? eY($, X) : B.IsInteger(X) ? rY($, X) : B.IsBoolean(X) ? sY($, X) : N.False;
};
var aY = function($, X) {
  return N.False;
};
var q7 = function($, X) {
  return N.True;
};
var cY = function($) {
  let [X, J] = [$, 0];
  while (true) {
    if (!B.IsNot(X))
      break;
    X = X.not, J += 1;
  }
  return J % 2 === 0 ? X : x1();
};
var B7 = function($, X) {
  return B.IsNot($) ? J0(cY($), X) : B.IsNot(X) ? J0($, cY(X)) : G$("Invalid fallthrough for Not");
};
var M7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsNull(X) ? N.True : N.False;
};
var eY = function($, X) {
  return B.IsLiteralNumber($) ? N.True : B.IsNumber($) || B.IsInteger($) ? N.True : N.False;
};
var U7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsInteger(X) || B.IsNumber(X) ? N.True : N.False;
};
var z1 = function($, X) {
  return Object.getOwnPropertyNames($.properties).length === X;
};
var oY = function($) {
  return V6($);
};
var nY = function($) {
  return z1($, 0) || z1($, 1) && "description" in $.properties && B.IsUnion($.properties.description) && $.properties.description.anyOf.length === 2 && (B.IsString($.properties.description.anyOf[0]) && B.IsUndefined($.properties.description.anyOf[1]) || B.IsString($.properties.description.anyOf[1]) && B.IsUndefined($.properties.description.anyOf[0]));
};
var sX = function($) {
  return z1($, 0);
};
var lY = function($) {
  return z1($, 0);
};
var w7 = function($) {
  return z1($, 0);
};
var G7 = function($) {
  return z1($, 0);
};
var H7 = function($) {
  return V6($);
};
var D7 = function($) {
  const X = P1();
  return z1($, 0) || z1($, 1) && "length" in $.properties && F1(J0($.properties.length, X)) === N.True;
};
var A7 = function($) {
  return z1($, 0);
};
var V6 = function($) {
  const X = P1();
  return z1($, 0) || z1($, 1) && "length" in $.properties && F1(J0($.properties.length, X)) === N.True;
};
var N7 = function($) {
  const X = h1([o1()], o1());
  return z1($, 0) || z1($, 1) && "then" in $.properties && F1(J0($.properties.then, X)) === N.True;
};
var $Z = function($, X) {
  return J0($, X) === N.False ? N.False : B.IsOptional($) && !B.IsOptional(X) ? N.False : N.True;
};
var o0 = function($, X) {
  return B.IsUnknown($) ? N.False : B.IsAny($) ? N.Union : B.IsNever($) || B.IsLiteralString($) && oY(X) || B.IsLiteralNumber($) && sX(X) || B.IsLiteralBoolean($) && lY(X) || B.IsSymbol($) && nY(X) || B.IsBigInt($) && w7(X) || B.IsString($) && oY(X) || B.IsSymbol($) && nY(X) || B.IsNumber($) && sX(X) || B.IsInteger($) && sX(X) || B.IsBoolean($) && lY(X) || B.IsUint8Array($) && H7(X) || B.IsDate($) && G7(X) || B.IsConstructor($) && A7(X) || B.IsFunction($) && D7(X) ? N.True : B.IsRecord($) && B.IsString(rX($)) ? (() => {
    return X[S1] === "Record" ? N.True : N.False;
  })() : B.IsRecord($) && B.IsNumber(rX($)) ? (() => {
    return z1(X, 0) ? N.True : N.False;
  })() : N.False;
};
var O7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsRecord(X) ? b1($, X) : !B.IsObject(X) ? N.False : (() => {
    for (let J of Object.getOwnPropertyNames(X.properties)) {
      if (!(J in $.properties) && !B.IsOptional(X.properties[J]))
        return N.False;
      if (B.IsOptional(X.properties[J]))
        return N.True;
      if ($Z($.properties[J], X.properties[J]) === N.False)
        return N.False;
    }
    return N.True;
  })();
};
var S7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) && N7(X) ? N.True : !B.IsPromise(X) ? N.False : F1(J0($.item, X.item));
};
var rX = function($) {
  return i1 in $.patternProperties ? P1() : (Z8 in $.patternProperties) ? Z1() : G$("Unknown record key pattern");
};
var aX = function($) {
  return i1 in $.patternProperties ? $.patternProperties[i1] : (Z8 in $.patternProperties) ? $.patternProperties[Z8] : G$("Unable to get record value schema");
};
var b1 = function($, X) {
  const [J, Y] = [rX(X), aX(X)];
  return B.IsLiteralString($) && B.IsNumber(J) && F1(J0($, Y)) === N.True ? N.True : B.IsUint8Array($) && B.IsNumber(J) ? J0($, Y) : B.IsString($) && B.IsNumber(J) ? J0($, Y) : B.IsArray($) && B.IsNumber(J) ? J0($, Y) : B.IsObject($) ? (() => {
    for (let Z of Object.getOwnPropertyNames($.properties))
      if ($Z(Y, $.properties[Z]) === N.False)
        return N.False;
    return N.True;
  })() : N.False;
};
var _7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : !B.IsRecord(X) ? N.False : J0(aX($), aX(X));
};
var P7 = function($, X) {
  const J = B.IsRegExp($) ? Z1() : $, Y = B.IsRegExp(X) ? Z1() : X;
  return J0(J, Y);
};
var XZ = function($, X) {
  return B.IsLiteral($) && J1.IsString($.const) ? N.True : B.IsString($) ? N.True : N.False;
};
var L7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsString(X) ? N.True : N.False;
};
var C7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsSymbol(X) ? N.True : N.False;
};
var F7 = function($, X) {
  return B.IsTemplateLiteral($) ? J0(W8($), X) : B.IsTemplateLiteral(X) ? J0($, W8(X)) : G$("Invalid fallthrough for TemplateLiteral");
};
var b7 = function($, X) {
  return B.IsArray(X) && $.items !== undefined && $.items.every((J) => J0(J, X.items) === N.True);
};
var R7 = function($, X) {
  return B.IsNever($) ? N.True : B.IsUnknown($) ? N.False : B.IsAny($) ? N.Union : N.False;
};
var j7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) && V6(X) ? N.True : B.IsArray(X) && b7($, X) ? N.True : !B.IsTuple(X) ? N.False : J1.IsUndefined($.items) && !J1.IsUndefined(X.items) || !J1.IsUndefined($.items) && J1.IsUndefined(X.items) ? N.False : J1.IsUndefined($.items) && !J1.IsUndefined(X.items) ? N.True : $.items.every((J, Y) => J0(J, X.items[Y]) === N.True) ? N.True : N.False;
};
var K7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsUint8Array(X) ? N.True : N.False;
};
var V7 = function($, X) {
  return b0(X) ? R0($, X) : B.IsObject(X) ? o0($, X) : B.IsRecord(X) ? b1($, X) : B.IsVoid(X) ? x7($, X) : B.IsUndefined(X) ? N.True : N.False;
};
var $J = function($, X) {
  return X.anyOf.some((J) => J0($, J) === N.True) ? N.True : N.False;
};
var E7 = function($, X) {
  return $.anyOf.every((J) => J0(J, X) === N.True) ? N.True : N.False;
};
var JZ = function($, X) {
  return N.True;
};
var I7 = function($, X) {
  return B.IsNever(X) ? aY($, X) : B.IsIntersect(X) ? K6($, X) : B.IsUnion(X) ? $J($, X) : B.IsAny(X) ? eX($, X) : B.IsString(X) ? XZ($, X) : B.IsNumber(X) ? eY($, X) : B.IsInteger(X) ? rY($, X) : B.IsBoolean(X) ? sY($, X) : B.IsArray(X) ? sQ($, X) : B.IsTuple(X) ? R7($, X) : B.IsObject(X) ? o0($, X) : B.IsUnknown(X) ? N.True : N.False;
};
var x7 = function($, X) {
  return B.IsUndefined($) ? N.True : B.IsUndefined($) ? N.True : N.False;
};
var k7 = function($, X) {
  return B.IsIntersect(X) ? K6($, X) : B.IsUnion(X) ? $J($, X) : B.IsUnknown(X) ? JZ($, X) : B.IsAny(X) ? eX($, X) : B.IsObject(X) ? o0($, X) : B.IsVoid(X) ? N.True : N.False;
};
var J0 = function($, X) {
  return B.IsTemplateLiteral($) || B.IsTemplateLiteral(X) ? F7($, X) : B.IsRegExp($) || B.IsRegExp(X) ? P7($, X) : B.IsNot($) || B.IsNot(X) ? B7($, X) : B.IsAny($) ? tQ($, X) : B.IsArray($) ? rQ($, X) : B.IsBigInt($) ? eQ($, X) : B.IsBoolean($) ? $7($, X) : B.IsAsyncIterator($) ? aQ($, X) : B.IsConstructor($) ? X7($, X) : B.IsDate($) ? J7($, X) : B.IsFunction($) ? Y7($, X) : B.IsInteger($) ? Z7($, X) : B.IsIntersect($) ? W7($, X) : B.IsIterator($) ? Q7($, X) : B.IsLiteral($) ? z7($, X) : B.IsNever($) ? q7($, X) : B.IsNull($) ? M7($, X) : B.IsNumber($) ? U7($, X) : B.IsObject($) ? O7($, X) : B.IsRecord($) ? _7($, X) : B.IsString($) ? L7($, X) : B.IsSymbol($) ? C7($, X) : B.IsTuple($) ? j7($, X) : B.IsPromise($) ? S7($, X) : B.IsUint8Array($) ? K7($, X) : B.IsUndefined($) ? V7($, X) : B.IsUnion($) ? E7($, X) : B.IsUnknown($) ? I7($, X) : B.IsVoid($) ? k7($, X) : G$(`Unknown left type operand '${$[H]}'`);
};

class tY extends d {
}
var N;
(function($) {
  $[$.Union = 0] = "Union", $[$.True = 1] = "True", $[$.False = 2] = "False";
})(N || (N = {}));
var g7 = function($, X, J, Y, Z) {
  return globalThis.Object.getOwnPropertyNames($).reduce((W, Q) => {
    return { ...W, [Q]: P8($[Q], X, J, Y, Z) };
  }, {});
};
var T7 = function($, X, J, Y, Z) {
  return g7($.properties, X, J, Y, Z);
};
var f7 = function($, X, J, Y) {
  const Z = q8($, X);
  return Z === N.Union ? l([J, Y]) : Z === N.True ? J : Y;
};
var y7 = function($, X, J, Y, Z) {
  return { [$]: P8(n($), X, J, Y, Z) };
};
var d7 = function($, X, J, Y, Z) {
  return $.reduce((W, Q) => {
    return { ...W, ...y7(Q, X, J, Y, Z) };
  }, {});
};
var v7 = function($, X, J, Y, Z) {
  return d7($.keys, X, J, Y, Z);
};
var p7 = function($) {
  return $[H] === "Any" || $[H] === "Unknown";
};
var o = function($) {
  return $ !== undefined;
};
var h7 = function($, X, J) {
  return true;
};
var m7 = function($, X, J) {
  if (!f(J))
    return false;
  if (o($.minItems) && !(J.length >= $.minItems))
    return false;
  if (o($.maxItems) && !(J.length <= $.maxItems))
    return false;
  if (!J.every((W) => p0($.items, X, W)))
    return false;
  if ($.uniqueItems === true && !function() {
    const W = new Set;
    for (let Q of J) {
      const z = Q8(Q);
      if (W.has(z))
        return false;
      else
        W.add(z);
    }
    return true;
  }())
    return false;
  if (!(o($.contains) || k($.minContains) || k($.maxContains)))
    return true;
  const Y = o($.contains) ? $.contains : e(), Z = J.reduce((W, Q) => p0(Y, X, Q) ? W + 1 : W, 0);
  if (Z === 0)
    return false;
  if (k($.minContains) && Z < $.minContains)
    return false;
  if (k($.maxContains) && Z > $.maxContains)
    return false;
  return true;
};
var i7 = function($, X, J) {
  return y$(J);
};
var u7 = function($, X, J) {
  if (!k0(J))
    return false;
  if (o($.exclusiveMaximum) && !(J < $.exclusiveMaximum))
    return false;
  if (o($.exclusiveMinimum) && !(J > $.exclusiveMinimum))
    return false;
  if (o($.maximum) && !(J <= $.maximum))
    return false;
  if (o($.minimum) && !(J >= $.minimum))
    return false;
  if (o($.multipleOf) && J % $.multipleOf !== BigInt(0))
    return false;
  return true;
};
var c7 = function($, X, J) {
  return E1(J);
};
var o7 = function($, X, J) {
  return p0($.returns, X, J.prototype);
};
var n7 = function($, X, J) {
  if (!a0(J))
    return false;
  if (o($.exclusiveMaximumTimestamp) && !(J.getTime() < $.exclusiveMaximumTimestamp))
    return false;
  if (o($.exclusiveMinimumTimestamp) && !(J.getTime() > $.exclusiveMinimumTimestamp))
    return false;
  if (o($.maximumTimestamp) && !(J.getTime() <= $.maximumTimestamp))
    return false;
  if (o($.minimumTimestamp) && !(J.getTime() >= $.minimumTimestamp))
    return false;
  if (o($.multipleOfTimestamp) && J.getTime() % $.multipleOfTimestamp !== 0)
    return false;
  return true;
};
var l7 = function($, X, J) {
  return o8(J);
};
var t7 = function($, X, J) {
  if (!p$(J))
    return false;
  if (o($.exclusiveMaximum) && !(J < $.exclusiveMaximum))
    return false;
  if (o($.exclusiveMinimum) && !(J > $.exclusiveMinimum))
    return false;
  if (o($.maximum) && !(J <= $.maximum))
    return false;
  if (o($.minimum) && !(J >= $.minimum))
    return false;
  if (o($.multipleOf) && J % $.multipleOf !== 0)
    return false;
  return true;
};
var s7 = function($, X, J) {
  const Y = $.allOf.every((Z) => p0(Z, X, J));
  if ($.unevaluatedProperties === false) {
    const Z = new RegExp(u1($)), W = Object.getOwnPropertyNames(J).every((Q) => Z.test(Q));
    return Y && W;
  } else if (g($.unevaluatedProperties)) {
    const Z = new RegExp(u1($)), W = Object.getOwnPropertyNames(J).every((Q) => Z.test(Q) || p0($.unevaluatedProperties, X, J[Q]));
    return Y && W;
  } else
    return Y;
};
var r7 = function($, X, J) {
  return d$(J);
};
var a7 = function($, X, J) {
  return J === $.const;
};
var e7 = function($, X, J) {
  return false;
};
var $5 = function($, X, J) {
  return !p0($.not, X, J);
};
var X5 = function($, X, J) {
  return d1(J);
};
var J5 = function($, X, J) {
  if (!S0.IsNumberLike(J))
    return false;
  if (o($.exclusiveMaximum) && !(J < $.exclusiveMaximum))
    return false;
  if (o($.exclusiveMinimum) && !(J > $.exclusiveMinimum))
    return false;
  if (o($.minimum) && !(J >= $.minimum))
    return false;
  if (o($.maximum) && !(J <= $.maximum))
    return false;
  if (o($.multipleOf) && J % $.multipleOf !== 0)
    return false;
  return true;
};
var Y5 = function($, X, J) {
  if (!S0.IsObjectLike(J))
    return false;
  if (o($.minProperties) && !(Object.getOwnPropertyNames(J).length >= $.minProperties))
    return false;
  if (o($.maxProperties) && !(Object.getOwnPropertyNames(J).length <= $.maxProperties))
    return false;
  const Y = Object.getOwnPropertyNames($.properties);
  for (let Z of Y) {
    const W = $.properties[Z];
    if ($.required && $.required.includes(Z)) {
      if (!p0(W, X, J[Z]))
        return false;
      if ((c1(W) || p7(W)) && !(Z in J))
        return false;
    } else if (S0.IsExactOptionalProperty(J, Z) && !p0(W, X, J[Z]))
      return false;
  }
  if ($.additionalProperties === false) {
    const Z = Object.getOwnPropertyNames(J);
    if ($.required && $.required.length === Y.length && Z.length === Y.length)
      return true;
    else
      return Z.every((W) => Y.includes(W));
  } else if (typeof $.additionalProperties === "object")
    return Object.getOwnPropertyNames(J).every((W) => Y.includes(W) || p0($.additionalProperties, X, J[W]));
  else
    return true;
};
var Z5 = function($, X, J) {
  return v$(J);
};
var W5 = function($, X, J) {
  if (!S0.IsRecordLike(J))
    return false;
  if (o($.minProperties) && !(Object.getOwnPropertyNames(J).length >= $.minProperties))
    return false;
  if (o($.maxProperties) && !(Object.getOwnPropertyNames(J).length <= $.maxProperties))
    return false;
  const [Y, Z] = Object.entries($.patternProperties)[0], W = new RegExp(Y), Q = Object.entries(J).every(([U, A]) => {
    return W.test(U) ? p0(Z, X, A) : true;
  }), z = typeof $.additionalProperties === "object" ? Object.entries(J).every(([U, A]) => {
    return !W.test(U) ? p0($.additionalProperties, X, A) : true;
  }) : true, q = $.additionalProperties === false ? Object.getOwnPropertyNames(J).every((U) => {
    return W.test(U);
  }) : true;
  return Q && z && q;
};
var Q5 = function($, X, J) {
  return p0(a($, X), X, J);
};
var z5 = function($, X, J) {
  return new RegExp($.source, $.flags).test(J);
};
var q5 = function($, X, J) {
  if (!p(J))
    return false;
  if (o($.minLength)) {
    if (!(J.length >= $.minLength))
      return false;
  }
  if (o($.maxLength)) {
    if (!(J.length <= $.maxLength))
      return false;
  }
  if (o($.pattern)) {
    if (!new RegExp($.pattern).test(J))
      return false;
  }
  if (o($.format)) {
    if (!g0.Has($.format))
      return false;
    return g0.Get($.format)(J);
  }
  return true;
};
var B5 = function($, X, J) {
  return l0(J);
};
var M5 = function($, X, J) {
  return p(J) && new RegExp($.pattern).test(J);
};
var U5 = function($, X, J) {
  return p0(a($, X), X, J);
};
var w5 = function($, X, J) {
  if (!f(J))
    return false;
  if ($.items === undefined && J.length !== 0)
    return false;
  if (J.length !== $.maxItems)
    return false;
  if (!$.items)
    return true;
  for (let Y = 0;Y < $.items.length; Y++)
    if (!p0($.items[Y], X, J[Y]))
      return false;
  return true;
};
var G5 = function($, X, J) {
  return z0(J);
};
var H5 = function($, X, J) {
  return $.anyOf.some((Y) => p0(Y, X, J));
};
var D5 = function($, X, J) {
  if (!K8(J))
    return false;
  if (o($.maxByteLength) && !(J.length <= $.maxByteLength))
    return false;
  if (o($.minByteLength) && !(J.length >= $.minByteLength))
    return false;
  return true;
};
var A5 = function($, X, J) {
  return true;
};
var N5 = function($, X, J) {
  return S0.IsVoidLike(J);
};
var O5 = function($, X, J) {
  if (!V0.Has($[H]))
    return false;
  return V0.Get($[H])($, J);
};
var p0 = function($, X, J) {
  const Y = o($.$id) ? [...X, $] : X, Z = $;
  switch (Z[H]) {
    case "Any":
      return h7(Z, Y, J);
    case "Array":
      return m7(Z, Y, J);
    case "AsyncIterator":
      return i7(Z, Y, J);
    case "BigInt":
      return u7(Z, Y, J);
    case "Boolean":
      return c7(Z, Y, J);
    case "Constructor":
      return o7(Z, Y, J);
    case "Date":
      return n7(Z, Y, J);
    case "Function":
      return l7(Z, Y, J);
    case "Integer":
      return t7(Z, Y, J);
    case "Intersect":
      return s7(Z, Y, J);
    case "Iterator":
      return r7(Z, Y, J);
    case "Literal":
      return a7(Z, Y, J);
    case "Never":
      return e7(Z, Y, J);
    case "Not":
      return $5(Z, Y, J);
    case "Null":
      return X5(Z, Y, J);
    case "Number":
      return J5(Z, Y, J);
    case "Object":
      return Y5(Z, Y, J);
    case "Promise":
      return Z5(Z, Y, J);
    case "Record":
      return W5(Z, Y, J);
    case "Ref":
      return Q5(Z, Y, J);
    case "RegExp":
      return z5(Z, Y, J);
    case "String":
      return q5(Z, Y, J);
    case "Symbol":
      return B5(Z, Y, J);
    case "TemplateLiteral":
      return M5(Z, Y, J);
    case "This":
      return U5(Z, Y, J);
    case "Tuple":
      return w5(Z, Y, J);
    case "Undefined":
      return G5(Z, Y, J);
    case "Union":
      return H5(Z, Y, J);
    case "Uint8Array":
      return D5(Z, Y, J);
    case "Unknown":
      return A5(Z, Y, J);
    case "Void":
      return N5(Z, Y, J);
    default:
      if (!V0.Has(Z[H]))
        throw new WZ(Z);
      return O5(Z, Y, J);
  }
};

class WZ extends d {
  schema;
  constructor($) {
    super("Unknown type");
    this.schema = $;
  }
}
var S5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return {};
};
var _5 = function($, X) {
  if ($.uniqueItems === true && !h($, "default"))
    throw new G1($, "Array with the uniqueItems constraint requires a default value");
  else if ("contains" in $ && !h($, "default"))
    throw new G1($, "Array with the contains constraint requires a default value");
  else if ("default" in $)
    return $.default;
  else if ($.minItems !== undefined)
    return Array.from({ length: $.minItems }).map((J) => {
      return H1($.items, X);
    });
  else
    return [];
};
var P5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return async function* () {
    }();
};
var L5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return BigInt(0);
};
var C5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return false;
};
var F5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else {
    const J = H1($.returns, X);
    if (typeof J === "object" && !Array.isArray(J))
      return class {
        constructor() {
          for (let [Y, Z] of Object.entries(J)) {
            const W = this;
            W[Y] = Z;
          }
        }
      };
    else
      return class {
      };
  }
};
var b5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else if ($.minimumTimestamp !== undefined)
    return new Date($.minimumTimestamp);
  else
    return new Date;
};
var R5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return () => H1($.returns, X);
};
var j5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else if ($.minimum !== undefined)
    return $.minimum;
  else
    return 0;
};
var K5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else {
    const J = $.allOf.reduce((Y, Z) => {
      const W = H1(Z, X);
      return typeof W === "object" ? { ...Y, ...W } : W;
    }, {});
    if (!t($, X, J))
      throw new G1($, "Intersect produced invalid value. Consider using a default value.");
    return J;
  }
};
var V5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return function* () {
    }();
};
var E5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return $.const;
};
var I5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    throw new G1($, "Never types cannot be created. Consider using a default value.");
};
var x5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    throw new G1($, "Not types must have a default value");
};
var k5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return null;
};
var g5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else if ($.minimum !== undefined)
    return $.minimum;
  else
    return 0;
};
var T5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else {
    const J = new Set($.required);
    return $.default || Object.entries($.properties).reduce((Y, [Z, W]) => {
      return J.has(Z) ? { ...Y, [Z]: H1(W, X) } : { ...Y };
    }, {});
  }
};
var f5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return Promise.resolve(H1($.item, X));
};
var y5 = function($, X) {
  const [J, Y] = Object.entries($.patternProperties)[0];
  if (h($, "default"))
    return $.default;
  else if (!(J === Z8 || J === i1))
    return J.slice(1, J.length - 1).split("|").reduce((W, Q) => {
      return { ...W, [Q]: H1(Y, X) };
    }, {});
  else
    return {};
};
var d5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return H1(a($, X), X);
};
var v5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    throw new G1($, "RegExp types cannot be created. Consider using a default value.");
};
var p5 = function($, X) {
  if ($.pattern !== undefined)
    if (!h($, "default"))
      throw new G1($, "String types with patterns must specify a default value");
    else
      return $.default;
  else if ($.format !== undefined)
    if (!h($, "default"))
      throw new G1($, "String types with formats must specify a default value");
    else
      return $.default;
  else if (h($, "default"))
    return $.default;
  else if ($.minLength !== undefined)
    return Array.from({ length: $.minLength }).map(() => " ").join("");
  else
    return "";
};
var h5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else if ("value" in $)
    return Symbol.for($.value);
  else
    return Symbol();
};
var m5 = function($, X) {
  if (h($, "default"))
    return $.default;
  if (!n$($))
    throw new G1($, "Can only create template literals that produce a finite variants. Consider using a default value.");
  return k8($)[0];
};
var i5 = function($, X) {
  if (QZ++ > r5)
    throw new G1($, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  if (h($, "default"))
    return $.default;
  else
    return H1(a($, X), X);
};
var u5 = function($, X) {
  if (h($, "default"))
    return $.default;
  if ($.items === undefined)
    return [];
  else
    return Array.from({ length: $.minItems }).map((J, Y) => H1($.items[Y], X));
};
var c5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return;
};
var o5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else if ($.anyOf.length === 0)
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  else
    return H1($.anyOf[0], X);
};
var n5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else if ($.minByteLength !== undefined)
    return new Uint8Array($.minByteLength);
  else
    return new Uint8Array(0);
};
var l5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return {};
};
var t5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    return;
};
var s5 = function($, X) {
  if (h($, "default"))
    return $.default;
  else
    throw new Error("User defined types must specify a default value");
};
var H1 = function($, X) {
  const J = p($.$id) ? [...X, $] : X, Y = $;
  switch (Y[H]) {
    case "Any":
      return S5(Y, J);
    case "Array":
      return _5(Y, J);
    case "AsyncIterator":
      return P5(Y, J);
    case "BigInt":
      return L5(Y, J);
    case "Boolean":
      return C5(Y, J);
    case "Constructor":
      return F5(Y, J);
    case "Date":
      return b5(Y, J);
    case "Function":
      return R5(Y, J);
    case "Integer":
      return j5(Y, J);
    case "Intersect":
      return K5(Y, J);
    case "Iterator":
      return V5(Y, J);
    case "Literal":
      return E5(Y, J);
    case "Never":
      return I5(Y, J);
    case "Not":
      return x5(Y, J);
    case "Null":
      return k5(Y, J);
    case "Number":
      return g5(Y, J);
    case "Object":
      return T5(Y, J);
    case "Promise":
      return f5(Y, J);
    case "Record":
      return y5(Y, J);
    case "Ref":
      return d5(Y, J);
    case "RegExp":
      return v5(Y, J);
    case "String":
      return p5(Y, J);
    case "Symbol":
      return h5(Y, J);
    case "TemplateLiteral":
      return m5(Y, J);
    case "This":
      return i5(Y, J);
    case "Tuple":
      return u5(Y, J);
    case "Undefined":
      return c5(Y, J);
    case "Union":
      return o5(Y, J);
    case "Uint8Array":
      return n5(Y, J);
    case "Unknown":
      return l5(Y, J);
    case "Void":
      return t5(Y, J);
    default:
      if (!V0.Has(Y[H]))
        throw new G1(Y, "Unknown type");
      return s5(Y, J);
  }
};

class G1 extends d {
  schema;
  constructor($, X) {
    super(X);
    this.schema = $;
  }
}
var r5 = 512;
var QZ = 0;
var a5 = function($) {
  return [...Object.getOwnPropertyNames($), ...Object.getOwnPropertySymbols($)].reduce((J, Y) => ({ ...J, [Y]: U0($[Y]) }), {});
};
var e5 = function($) {
  return $.map((X) => U0(X));
};
var $9 = function($) {
  return $.slice();
};
var X9 = function($) {
  return new Date($.toISOString());
};
var J9 = function($) {
  return $;
};
var Y9 = function($, X, J) {
  if ($[H] === "Object" && typeof J === "object" && !d1(J)) {
    const Y = $, Z = Object.getOwnPropertyNames(J), W = Object.entries(Y.properties), [Q, z] = [1 / W.length, W.length];
    return W.reduce((q, [U, A]) => {
      const O = A[H] === "Literal" && A.const === J[U] ? z : 0, T = t(A, X, J[U]) ? Q : 0, E = Z.includes(U) ? Q : 0;
      return q + (O + T + E);
    }, 0);
  } else
    return t($, X, J) ? 1 : 0;
};
var Z9 = function($, X, J) {
  let [Y, Z] = [$.anyOf[0], 0];
  for (let W of $.anyOf) {
    const Q = Y9(W, X, J);
    if (Q > Z)
      Y = W, Z = Q;
  }
  return Y;
};
var W9 = function($, X, J) {
  if ("default" in $)
    return $.default;
  else {
    const Y = Z9($, X, J);
    return r$(Y, X, J);
  }
};
var Q9 = function($, X, J) {
  return t($, X, J) ? U0(J) : q1($, X);
};
var z9 = function($, X, J) {
  return t($, X, J) ? J : q1($, X);
};
var q9 = function($, X, J) {
  if (t($, X, J))
    return U0(J);
  const Y = f(J) ? U0(J) : q1($, X), Z = k($.minItems) && Y.length < $.minItems ? [...Y, ...Array.from({ length: $.minItems - Y.length }, () => null)] : Y, Q = (k($.maxItems) && Z.length > $.maxItems ? Z.slice(0, $.maxItems) : Z).map((q) => n1($.items, X, q));
  if ($.uniqueItems !== true)
    return Q;
  const z = [...new Set(Q)];
  if (!t($, X, z))
    throw new E6($, "Array cast produced invalid data due to uniqueItems constraint");
  return z;
};
var B9 = function($, X, J) {
  if (t($, X, J))
    return q1($, X);
  const Y = new Set($.returns.required || []), Z = function() {
  };
  for (let [W, Q] of Object.entries($.returns.properties)) {
    if (!Y.has(W) && J.prototype[W] === undefined)
      continue;
    Z.prototype[W] = n1(Q, X, J.prototype[W]);
  }
  return Z;
};
var M9 = function($, X, J) {
  const Y = q1($, X), Z = Y0(Y) && Y0(J) ? { ...Y, ...J } : J;
  return t($, X, Z) ? Z : q1($, X);
};
var U9 = function($, X, J) {
  throw new E6($, "Never types cannot be cast");
};
var w9 = function($, X, J) {
  if (t($, X, J))
    return J;
  if (J === null || typeof J !== "object")
    return q1($, X);
  const Y = new Set($.required || []), Z = {};
  for (let [W, Q] of Object.entries($.properties)) {
    if (!Y.has(W) && J[W] === undefined)
      continue;
    Z[W] = n1(Q, X, J[W]);
  }
  if (typeof $.additionalProperties === "object") {
    const W = Object.getOwnPropertyNames($.properties);
    for (let Q of Object.getOwnPropertyNames(J)) {
      if (W.includes(Q))
        continue;
      Z[Q] = n1($.additionalProperties, X, J[Q]);
    }
  }
  return Z;
};
var G9 = function($, X, J) {
  if (t($, X, J))
    return U0(J);
  if (J === null || typeof J !== "object" || Array.isArray(J) || J instanceof Date)
    return q1($, X);
  const Y = Object.getOwnPropertyNames($.patternProperties)[0], Z = $.patternProperties[Y], W = {};
  for (let [Q, z] of Object.entries(J))
    W[Q] = n1(Z, X, z);
  return W;
};
var H9 = function($, X, J) {
  return n1(a($, X), X, J);
};
var D9 = function($, X, J) {
  return n1(a($, X), X, J);
};
var A9 = function($, X, J) {
  if (t($, X, J))
    return U0(J);
  if (!f(J))
    return q1($, X);
  if ($.items === undefined)
    return [];
  return $.items.map((Y, Z) => n1(Y, X, J[Z]));
};
var N9 = function($, X, J) {
  return t($, X, J) ? U0(J) : W9($, X, J);
};
var n1 = function($, X, J) {
  const Y = p($.$id) ? [...X, $] : X, Z = $;
  switch ($[H]) {
    case "Array":
      return q9(Z, Y, J);
    case "Constructor":
      return B9(Z, Y, J);
    case "Intersect":
      return M9(Z, Y, J);
    case "Never":
      return U9(Z, Y, J);
    case "Object":
      return w9(Z, Y, J);
    case "Record":
      return G9(Z, Y, J);
    case "Ref":
      return H9(Z, Y, J);
    case "This":
      return D9(Z, Y, J);
    case "Tuple":
      return A9(Z, Y, J);
    case "Union":
      return N9(Z, Y, J);
    case "Date":
    case "Symbol":
    case "Uint8Array":
      return Q9($, X, J);
    default:
      return z9(Z, Y, J);
  }
};

class E6 extends d {
  schema;
  constructor($, X) {
    super(X);
    this.schema = $;
  }
}
var O9 = function($) {
  return g($) && $[H] !== "Unsafe";
};
var S9 = function($, X, J) {
  if (!f(J))
    return J;
  return J.map((Y) => D1($.items, X, Y));
};
var _9 = function($, X, J) {
  const Y = $.unevaluatedProperties, W = $.allOf.map((z) => D1(z, X, U0(J))).reduce((z, q) => x0(q) ? { ...z, ...q } : q, {});
  if (!x0(J) || !x0(W) || !g(Y))
    return W;
  const Q = s0($);
  for (let z of Object.getOwnPropertyNames(J)) {
    if (Q.includes(z))
      continue;
    if (t(Y, X, J[z]))
      W[z] = D1(Y, X, J[z]);
  }
  return W;
};
var P9 = function($, X, J) {
  if (!x0(J) || f(J))
    return J;
  const Y = $.additionalProperties;
  for (let Z of Object.getOwnPropertyNames(J)) {
    if (Z in $.properties) {
      J[Z] = D1($.properties[Z], X, J[Z]);
      continue;
    }
    if (g(Y) && t(Y, X, J[Z])) {
      J[Z] = D1(Y, X, J[Z]);
      continue;
    }
    delete J[Z];
  }
  return J;
};
var L9 = function($, X, J) {
  if (!x0(J))
    return J;
  const Y = $.additionalProperties, Z = Object.keys(J), [W, Q] = Object.entries($.patternProperties)[0], z = new RegExp(W);
  for (let q of Z) {
    if (z.test(q)) {
      J[q] = D1(Q, X, J[q]);
      continue;
    }
    if (g(Y) && t(Y, X, J[q])) {
      J[q] = D1(Y, X, J[q]);
      continue;
    }
    delete J[q];
  }
  return J;
};
var C9 = function($, X, J) {
  return D1(a($, X), X, J);
};
var F9 = function($, X, J) {
  return D1(a($, X), X, J);
};
var b9 = function($, X, J) {
  if (!f(J))
    return J;
  if (z0($.items))
    return [];
  const Y = Math.min(J.length, $.items.length);
  for (let Z = 0;Z < Y; Z++)
    J[Z] = D1($.items[Z], X, J[Z]);
  return J.length > Y ? J.slice(0, Y) : J;
};
var R9 = function($, X, J) {
  for (let Y of $.anyOf)
    if (O9(Y) && t(Y, J))
      return D1(Y, X, J);
  return J;
};
var D1 = function($, X, J) {
  const Y = p($.$id) ? [...X, $] : X, Z = $;
  switch (Z[H]) {
    case "Array":
      return S9(Z, Y, J);
    case "Intersect":
      return _9(Z, Y, J);
    case "Object":
      return P9(Z, Y, J);
    case "Record":
      return L9(Z, Y, J);
    case "Ref":
      return C9(Z, Y, J);
    case "This":
      return F9(Z, Y, J);
    case "Tuple":
      return b9(Z, Y, J);
    case "Union":
      return R9(Z, Y, J);
    default:
      return J;
  }
};
var j9 = function($) {
  const X = T0($, {}), Y = s0(X).reduce((Z, W) => ({ ...Z, [W]: W1(X, [W]) }), {});
  return $0(Y);
};
var x6 = function($) {
  return p($) && !isNaN($) && !isNaN(parseFloat($));
};
var K9 = function($) {
  return k0($) || E1($) || k($);
};
var a$ = function($) {
  return $ === true || k($) && $ === 1 || k0($) && $ === BigInt("1") || p($) && ($.toLowerCase() === "true" || $ === "1");
};
var e$ = function($) {
  return $ === false || k($) && ($ === 0 || Object.is($, -0)) || k0($) && $ === BigInt("0") || p($) && ($.toLowerCase() === "false" || $ === "0" || $ === "-0");
};
var V9 = function($) {
  return p($) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test($);
};
var E9 = function($) {
  return p($) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test($);
};
var I9 = function($) {
  return p($) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test($);
};
var x9 = function($) {
  return p($) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test($);
};
var k9 = function($) {
  return p($) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test($);
};
var g9 = function($, X) {
  const J = qZ($);
  return J === X ? J : $;
};
var T9 = function($, X) {
  const J = BZ($);
  return J === X ? J : $;
};
var f9 = function($, X) {
  const J = zZ($);
  return J === X ? J : $;
};
var y9 = function($, X) {
  return p($.const) ? g9(X, $.const) : k($.const) ? T9(X, $.const) : E1($.const) ? f9(X, $.const) : U0(X);
};
var zZ = function($) {
  return a$($) ? true : e$($) ? false : $;
};
var d9 = function($) {
  return x6($) ? BigInt(parseInt($)) : k($) ? BigInt($ | 0) : e$($) ? BigInt(0) : a$($) ? BigInt(1) : $;
};
var qZ = function($) {
  return K9($) ? $.toString() : l0($) && $.description !== undefined ? $.description.toString() : $;
};
var BZ = function($) {
  return x6($) ? parseFloat($) : a$($) ? 1 : e$($) ? 0 : $;
};
var v9 = function($) {
  return x6($) ? parseInt($) : k($) ? $ | 0 : a$($) ? 1 : e$($) ? 0 : $;
};
var p9 = function($) {
  return p($) && $.toLowerCase() === "null" ? null : $;
};
var h9 = function($) {
  return p($) && $ === "undefined" ? undefined : $;
};
var m9 = function($) {
  return a0($) ? $ : k($) ? new Date($) : a$($) ? new Date(1) : e$($) ? new Date(0) : x6($) ? new Date(parseInt($)) : E9($) ? new Date(`1970-01-01T${$}.000Z`) : V9($) ? new Date(`1970-01-01T${$}`) : x9($) ? new Date(`${$}.000Z`) : I9($) ? new Date($) : k9($) ? new Date(`${$}T00:00:00.000Z`) : $;
};
var i9 = function($) {
  return $;
};
var u9 = function($, X, J) {
  if (f(J))
    return J.map((Y) => k1($.items, X, Y));
  return J;
};
var c9 = function($, X, J) {
  return d9(J);
};
var o9 = function($, X, J) {
  return zZ(J);
};
var n9 = function($, X, J) {
  return m9(J);
};
var l9 = function($, X, J) {
  return v9(J);
};
var t9 = function($, X, J) {
  if ($.allOf.every((Z) => O0(Z)))
    return k1(H$($.allOf), X, J);
  return k1($.allOf[0], X, J);
};
var s9 = function($, X, J) {
  return y9($, J);
};
var r9 = function($, X, J) {
  return p9(J);
};
var a9 = function($, X, J) {
  return BZ(J);
};
var e9 = function($, X, J) {
  if (!x0(J))
    return J;
  return Object.getOwnPropertyNames($.properties).reduce((Z, W) => {
    return !z0(Z[W]) ? { ...Z, [W]: k1($.properties[W], X, Z[W]) } : { ...Z };
  }, J);
};
var $z = function($, X, J) {
  const Y = Object.getOwnPropertyNames($.patternProperties)[0], Z = $.patternProperties[Y], W = {};
  for (let [Q, z] of Object.entries(J))
    W[Q] = k1(Z, X, z);
  return W;
};
var Xz = function($, X, J) {
  return k1(a($, X), X, J);
};
var Jz = function($, X, J) {
  return qZ(J);
};
var Yz = function($, X, J) {
  return p(J) || k(J) ? Symbol(J) : J;
};
var Zz = function($, X, J) {
  return k1(a($, X), X, J);
};
var Wz = function($, X, J) {
  if (!(f(J) && !z0($.items)))
    return J;
  return J.map((Z, W) => {
    return W < $.items.length ? k1($.items[W], X, Z) : Z;
  });
};
var Qz = function($, X, J) {
  return h9(J);
};
var zz = function($, X, J) {
  for (let Y of $.anyOf) {
    const Z = k1(Y, X, J);
    if (t(Y, X, Z))
      return Z;
  }
  return J;
};
var k1 = function($, X, J) {
  const Y = p($.$id) ? [...X, $] : X, Z = $;
  switch ($[H]) {
    case "Array":
      return u9(Z, Y, J);
    case "BigInt":
      return c9(Z, Y, J);
    case "Boolean":
      return o9(Z, Y, J);
    case "Date":
      return n9(Z, Y, J);
    case "Integer":
      return l9(Z, Y, J);
    case "Intersect":
      return t9(Z, Y, J);
    case "Literal":
      return s9(Z, Y, J);
    case "Null":
      return r9(Z, Y, J);
    case "Number":
      return a9(Z, Y, J);
    case "Object":
      return e9(Z, Y, J);
    case "Record":
      return $z(Z, Y, J);
    case "Ref":
      return Xz(Z, Y, J);
    case "String":
      return Jz(Z, Y, J);
    case "Symbol":
      return Yz(Z, Y, J);
    case "This":
      return Zz(Z, Y, J);
    case "Tuple":
      return Wz(Z, Y, J);
    case "Undefined":
      return Qz(Z, Y, J);
    case "Union":
      return zz(Z, Y, J);
    default:
      return i9(J);
  }
};
var L8 = function($, X) {
  return X !== undefined || !("default" in $) ? X : $.default;
};
var qz = function($) {
  return g($) && $[H] !== "Unsafe";
};
var g6 = function($) {
  return g($) && "default" in $;
};
var Bz = function($, X, J) {
  const Y = L8($, J);
  if (!f(Y))
    return Y;
  for (let Z = 0;Z < Y.length; Z++)
    Y[Z] = R1($.items, X, Y[Z]);
  return Y;
};
var Mz = function($, X, J) {
  const Y = L8($, J);
  return $.allOf.reduce((Z, W) => {
    const Q = R1(W, X, Y);
    return x0(Q) ? { ...Z, ...Q } : Q;
  }, {});
};
var Uz = function($, X, J) {
  const Y = L8($, J);
  if (!x0(Y))
    return Y;
  const Z = $.additionalProperties, W = Object.getOwnPropertyNames($.properties);
  for (let Q of W) {
    if (!g6($.properties[Q]))
      continue;
    Y[Q] = R1($.properties[Q], X, Y[Q]);
  }
  if (!g6(Z))
    return Y;
  for (let Q of Object.getOwnPropertyNames(Y)) {
    if (W.includes(Q))
      continue;
    Y[Q] = R1(Z, X, Y[Q]);
  }
  return Y;
};
var wz = function($, X, J) {
  const Y = L8($, J);
  if (!x0(Y))
    return Y;
  const Z = $.additionalProperties, [W, Q] = Object.entries($.patternProperties)[0], z = new RegExp(W);
  for (let q of Object.getOwnPropertyNames(Y)) {
    if (!(z.test(q) && g6(Q)))
      continue;
    Y[q] = R1(Q, X, Y[q]);
  }
  if (!g6(Z))
    return Y;
  for (let q of Object.getOwnPropertyNames(Y)) {
    if (z.test(q))
      continue;
    Y[q] = R1(Z, X, Y[q]);
  }
  return Y;
};
var Gz = function($, X, J) {
  return R1(a($, X), X, L8($, J));
};
var Hz = function($, X, J) {
  return R1(a($, X), X, J);
};
var Dz = function($, X, J) {
  const Y = L8($, J);
  if (!f(Y) || z0($.items))
    return Y;
  const [Z, W] = [$.items, Math.max($.items.length, Y.length)];
  for (let Q = 0;Q < W; Q++)
    if (Q < Z.length)
      Y[Q] = R1(Z[Q], X, Y[Q]);
  return Y;
};
var Az = function($, X, J) {
  const Y = L8($, J);
  for (let Z of $.anyOf) {
    const W = R1(Z, X, Y);
    if (qz(Z) && t(Z, W))
      return W;
  }
  return Y;
};
var R1 = function($, X, J) {
  const Y = p($.$id) ? [...X, $] : X, Z = $;
  switch (Z[H]) {
    case "Array":
      return Bz(Z, Y, J);
    case "Intersect":
      return Mz(Z, Y, J);
    case "Object":
      return Uz(Z, Y, J);
    case "Record":
      return wz(Z, Y, J);
    case "Ref":
      return Gz(Z, Y, J);
    case "This":
      return Hz(Z, Y, J);
    case "Tuple":
      return Dz(Z, Y, J);
    case "Union":
      return Az(Z, Y, J);
    default:
      return L8(Z, J);
  }
};
var j1 = {};
G8(j1, { ValuePointerRootSetError: () => {
  {
    return XJ;
  }
}, ValuePointerRootDeleteError: () => {
  {
    return JJ;
  }
}, Set: () => {
  {
    return Nz;
  }
}, Has: () => {
  {
    return Sz;
  }
}, Get: () => {
  {
    return _z;
  }
}, Format: () => {
  {
    return $6;
  }
}, Delete: () => {
  {
    return Oz;
  }
} });
var MZ = function($) {
  return $.indexOf("~") === -1 ? $ : $.replace(/~1/g, "/").replace(/~0/g, "~");
};

class XJ extends d {
  value;
  path;
  update;
  constructor($, X, J) {
    super("Cannot set root value");
    this.value = $, this.path = X, this.update = J;
  }
}

class JJ extends d {
  value;
  path;
  constructor($, X) {
    super("Cannot delete root value");
    this.value = $, this.path = X;
  }
}
var J6 = function($, X) {
  return { type: "update", path: $, value: X };
};
var HZ = function($, X) {
  return { type: "insert", path: $, value: X };
};
var DZ = function($) {
  return { type: "delete", path: $ };
};
var Rz = function($) {
  return $.length > 0 && $[0].path === "" && $[0].type === "update";
};
var jz = function($) {
  return $.length === 0;
};
var UZ = $0({ type: n("insert"), path: Z1(), value: x1() });
var wZ = $0({ type: n("update"), path: Z1(), value: x1() });
var GZ = $0({ type: n("delete"), path: Z1() });
var Pz = l([UZ, wZ, GZ]);

class f6 extends d {
  value;
  constructor($, X) {
    super(X);
    this.value = $;
  }
}

class X6 extends f6 {
  value;
  constructor($) {
    super($, "Cannot diff objects with symbol keys");
    this.value = $;
  }
}
var Kz = function($, X) {
  if (!Y0(X))
    return false;
  const J = [...Object.keys($), ...Object.getOwnPropertySymbols($)], Y = [...Object.keys(X), ...Object.getOwnPropertySymbols(X)];
  if (J.length !== Y.length)
    return false;
  return J.every((Z) => D$($[Z], X[Z]));
};
var Vz = function($, X) {
  return a0(X) && $.getTime() === X.getTime();
};
var Ez = function($, X) {
  if (!f(X) || $.length !== X.length)
    return false;
  return $.every((J, Y) => D$(J, X[Y]));
};
var Iz = function($, X) {
  if (!M1(X) || $.length !== X.length || Object.getPrototypeOf($).constructor.name !== Object.getPrototypeOf(X).constructor.name)
    return false;
  return $.every((J, Y) => D$(J, X[Y]));
};
var xz = function($, X) {
  return $ === X;
};
var kz = function($, X, J, Y) {
  if (!Y0(J))
    j1.Set($, X, U0(Y));
  else {
    const Z = Object.keys(J), W = Object.keys(Y);
    for (let Q of Z)
      if (!W.includes(Q))
        delete J[Q];
    for (let Q of W)
      if (!Z.includes(Q))
        J[Q] = null;
    for (let Q of W)
      WJ($, `${X}/${Q}`, J[Q], Y[Q]);
  }
};
var gz = function($, X, J, Y) {
  if (!f(J))
    j1.Set($, X, U0(Y));
  else {
    for (let Z = 0;Z < Y.length; Z++)
      WJ($, `${X}/${Z}`, J[Z], Y[Z]);
    J.splice(Y.length);
  }
};
var Tz = function($, X, J, Y) {
  if (M1(J) && J.length === Y.length)
    for (let Z = 0;Z < J.length; Z++)
      J[Z] = Y[Z];
  else
    j1.Set($, X, U0(Y));
};
var fz = function($, X, J, Y) {
  if (J === Y)
    return;
  j1.Set($, X, Y);
};
var WJ = function($, X, J, Y) {
  if (f(Y))
    return gz($, X, J, Y);
  if (M1(Y))
    return Tz($, X, J, Y);
  if (Y0(Y))
    return kz($, X, J, Y);
  if (e0(Y))
    return fz($, X, J, Y);
};
var AZ = function($) {
  return M1($) || e0($);
};
var yz = function($, X) {
  return Y0($) && f(X) || f($) && Y0(X);
};

class d6 extends d {
  constructor($) {
    super($);
  }
}
var H0 = function($, X) {
  try {
    return r($) ? $[C0].Decode(X) : X;
  } catch (J) {
    throw new zJ($, X, J);
  }
};
var dz = function($, X, J) {
  return f(J) ? H0($, J.map((Y) => l1($.items, X, Y))) : H0($, J);
};
var vz = function($, X, J) {
  if (!Y0(J) || e0(J))
    return H0($, J);
  const Y = s0($), Z = Y.reduce((q, U) => {
    return U in q ? { ...q, [U]: l1(W1($, [U]), X, q[U]) } : q;
  }, J);
  if (!r($.unevaluatedProperties))
    return H0($, Z);
  const W = Object.getOwnPropertyNames(Z), Q = $.unevaluatedProperties, z = W.reduce((q, U) => {
    return !Y.includes(U) ? { ...q, [U]: H0(Q, q[U]) } : q;
  }, Z);
  return H0($, z);
};
var pz = function($, X, J) {
  return H0($, l1($.not, X, J));
};
var hz = function($, X, J) {
  if (!Y0(J))
    return H0($, J);
  const Y = s0($), Z = Y.reduce((q, U) => {
    return U in q ? { ...q, [U]: l1($.properties[U], X, q[U]) } : q;
  }, J);
  if (!g($.additionalProperties))
    return H0($, Z);
  const W = Object.getOwnPropertyNames(Z), Q = $.additionalProperties, z = W.reduce((q, U) => {
    return !Y.includes(U) ? { ...q, [U]: H0(Q, q[U]) } : q;
  }, Z);
  return H0($, z);
};
var mz = function($, X, J) {
  if (!Y0(J))
    return H0($, J);
  const Y = Object.getOwnPropertyNames($.patternProperties)[0], Z = new RegExp(Y), W = Object.getOwnPropertyNames(J).reduce((U, A) => {
    return Z.test(A) ? { ...U, [A]: l1($.patternProperties[Y], X, U[A]) } : U;
  }, J);
  if (!g($.additionalProperties))
    return H0($, W);
  const Q = Object.getOwnPropertyNames(W), z = $.additionalProperties, q = Q.reduce((U, A) => {
    return !Z.test(A) ? { ...U, [A]: H0(z, U[A]) } : U;
  }, W);
  return H0($, q);
};
var iz = function($, X, J) {
  const Y = a($, X);
  return H0($, l1(Y, X, J));
};
var uz = function($, X, J) {
  const Y = a($, X);
  return H0($, l1(Y, X, J));
};
var cz = function($, X, J) {
  return f(J) && f($.items) ? H0($, $.items.map((Y, Z) => l1(Y, X, J[Z]))) : H0($, J);
};
var oz = function($, X, J) {
  for (let Y of $.anyOf) {
    if (!t(Y, X, J))
      continue;
    const Z = l1(Y, X, J);
    return H0($, Z);
  }
  return H0($, J);
};
var l1 = function($, X, J) {
  const Y = typeof $.$id === "string" ? [...X, $] : X, Z = $;
  switch ($[H]) {
    case "Array":
      return dz(Z, Y, J);
    case "Intersect":
      return vz(Z, Y, J);
    case "Not":
      return pz(Z, Y, J);
    case "Object":
      return hz(Z, Y, J);
    case "Record":
      return mz(Z, Y, J);
    case "Ref":
      return iz(Z, Y, J);
    case "Symbol":
      return H0(Z, J);
    case "This":
      return uz(Z, Y, J);
    case "Tuple":
      return cz(Z, Y, J);
    case "Union":
      return oz(Z, Y, J);
    default:
      return H0(Z, J);
  }
};

class A$ extends d {
  schema;
  value;
  error;
  constructor($, X, J) {
    super("Unable to decode due to invalid value");
    this.schema = $, this.value = X, this.error = J;
  }
}

class zJ extends d {
  schema;
  value;
  constructor($, X, J) {
    super(`${J instanceof Error ? J.message : "Unknown error"}`);
    this.schema = $, this.value = X;
  }
}
var f0 = function($, X) {
  try {
    return r($) ? $[C0].Encode(X) : X;
  } catch (J) {
    throw new qJ($, X, J);
  }
};
var nz = function($, X, J) {
  const Y = f0($, J);
  return f(Y) ? Y.map((Z) => t1($.items, X, Z)) : Y;
};
var lz = function($, X, J) {
  const Y = f0($, J);
  if (!Y0(J) || e0(J))
    return Y;
  const Z = s0($), W = Z.reduce((q, U) => {
    return U in Y ? { ...q, [U]: t1(W1($, [U]), X, q[U]) } : q;
  }, Y);
  if (!r($.unevaluatedProperties))
    return f0($, W);
  const Q = Object.getOwnPropertyNames(W), z = $.unevaluatedProperties;
  return Q.reduce((q, U) => {
    return !Z.includes(U) ? { ...q, [U]: f0(z, q[U]) } : q;
  }, W);
};
var tz = function($, X, J) {
  return f0($.not, f0($, J));
};
var sz = function($, X, J) {
  const Y = f0($, J);
  if (!Y0(J))
    return Y;
  const Z = s0($), W = Z.reduce((q, U) => {
    return U in q ? { ...q, [U]: t1($.properties[U], X, q[U]) } : q;
  }, Y);
  if (!g($.additionalProperties))
    return W;
  const Q = Object.getOwnPropertyNames(W), z = $.additionalProperties;
  return Q.reduce((q, U) => {
    return !Z.includes(U) ? { ...q, [U]: f0(z, q[U]) } : q;
  }, W);
};
var rz = function($, X, J) {
  const Y = f0($, J);
  if (!Y0(J))
    return Y;
  const Z = Object.getOwnPropertyNames($.patternProperties)[0], W = new RegExp(Z), Q = Object.getOwnPropertyNames(J).reduce((U, A) => {
    return W.test(A) ? { ...U, [A]: t1($.patternProperties[Z], X, U[A]) } : U;
  }, Y);
  if (!g($.additionalProperties))
    return f0($, Q);
  const z = Object.getOwnPropertyNames(Q), q = $.additionalProperties;
  return z.reduce((U, A) => {
    return !W.test(A) ? { ...U, [A]: f0(q, U[A]) } : U;
  }, Q);
};
var az = function($, X, J) {
  const Y = a($, X), Z = t1(Y, X, J);
  return f0($, Z);
};
var ez = function($, X, J) {
  const Y = a($, X), Z = t1(Y, X, J);
  return f0($, Z);
};
var $2 = function($, X, J) {
  const Y = f0($, J);
  return f($.items) ? $.items.map((Z, W) => t1(Z, X, Y[W])) : [];
};
var X2 = function($, X, J) {
  for (let Y of $.anyOf) {
    if (!t(Y, X, J))
      continue;
    const Z = t1(Y, X, J);
    return f0($, Z);
  }
  for (let Y of $.anyOf) {
    const Z = t1(Y, X, J);
    if (!t($, X, Z))
      continue;
    return f0($, Z);
  }
  return f0($, J);
};
var t1 = function($, X, J) {
  const Y = typeof $.$id === "string" ? [...X, $] : X, Z = $;
  switch ($[H]) {
    case "Array":
      return nz(Z, Y, J);
    case "Intersect":
      return lz(Z, Y, J);
    case "Not":
      return tz(Z, Y, J);
    case "Object":
      return sz(Z, Y, J);
    case "Record":
      return rz(Z, Y, J);
    case "Ref":
      return az(Z, Y, J);
    case "This":
      return ez(Z, Y, J);
    case "Tuple":
      return $2(Z, Y, J);
    case "Union":
      return X2(Z, Y, J);
    default:
      return f0(Z, J);
  }
};

class N$ extends d {
  schema;
  value;
  error;
  constructor($, X, J) {
    super("Unable to encode due to invalid value");
    this.schema = $, this.value = X, this.error = J;
  }
}

class qJ extends d {
  schema;
  value;
  constructor($, X, J) {
    super(`${J instanceof Error ? J.message : "Unknown error"}`);
    this.schema = $, this.value = X;
  }
}
var J2 = function($, X) {
  return r($) || y0($.items, X);
};
var Y2 = function($, X) {
  return r($) || y0($.items, X);
};
var Z2 = function($, X) {
  return r($) || y0($.returns, X) || $.parameters.some((J) => y0(J, X));
};
var W2 = function($, X) {
  return r($) || y0($.returns, X) || $.parameters.some((J) => y0(J, X));
};
var Q2 = function($, X) {
  return r($) || r($.unevaluatedProperties) || $.allOf.some((J) => y0(J, X));
};
var z2 = function($, X) {
  return r($) || y0($.items, X);
};
var q2 = function($, X) {
  return r($) || y0($.not, X);
};
var B2 = function($, X) {
  return r($) || Object.values($.properties).some((J) => y0(J, X)) || g($.additionalProperties) && y0($.additionalProperties, X);
};
var M2 = function($, X) {
  return r($) || y0($.item, X);
};
var U2 = function($, X) {
  const J = Object.getOwnPropertyNames($.patternProperties)[0], Y = $.patternProperties[J];
  return r($) || y0(Y, X) || g($.additionalProperties) && r($.additionalProperties);
};
var w2 = function($, X) {
  if (r($))
    return true;
  return y0(a($, X), X);
};
var G2 = function($, X) {
  if (r($))
    return true;
  return y0(a($, X), X);
};
var H2 = function($, X) {
  return r($) || !z0($.items) && $.items.some((J) => y0(J, X));
};
var D2 = function($, X) {
  return r($) || $.anyOf.some((J) => y0(J, X));
};
var y0 = function($, X) {
  const J = p($.$id) ? [...X, $] : X, Y = $;
  if ($.$id && BJ.has($.$id))
    return false;
  if ($.$id)
    BJ.add($.$id);
  switch ($[H]) {
    case "Array":
      return J2(Y, J);
    case "AsyncIterator":
      return Y2(Y, J);
    case "Constructor":
      return Z2(Y, J);
    case "Function":
      return W2(Y, J);
    case "Intersect":
      return Q2(Y, J);
    case "Iterator":
      return z2(Y, J);
    case "Not":
      return q2(Y, J);
    case "Object":
      return B2(Y, J);
    case "Promise":
      return M2(Y, J);
    case "Record":
      return U2(Y, J);
    case "Ref":
      return w2(Y, J);
    case "This":
      return G2(Y, J);
    case "Tuple":
      return H2(Y, J);
    case "Union":
      return D2(Y, J);
    default:
      return r($);
  }
};
var BJ = new Set;
var j0 = {};
G8(j0, { Patch: () => {
  {
    return j2;
  }
}, Mutate: () => {
  {
    return K2;
  }
}, Hash: () => {
  {
    return R2;
  }
}, Errors: () => {
  {
    return wJ;
  }
}, Equal: () => {
  {
    return F2;
  }
}, Encode: () => {
  {
    return C2;
  }
}, Diff: () => {
  {
    return b2;
  }
}, Default: () => {
  {
    return L2;
  }
}, Decode: () => {
  {
    return P2;
  }
}, Create: () => {
  {
    return N2;
  }
}, Convert: () => {
  {
    return S2;
  }
}, Clone: () => {
  {
    return _2;
  }
}, Clean: () => {
  {
    return O2;
  }
}, Check: () => {
  {
    return UJ;
  }
}, Cast: () => {
  {
    return A2;
  }
} });
var NZ = function($) {
  return $.map((X) => GJ(X));
};
var V2 = function($) {
  return T0(NZ($));
};
var E2 = function($) {
  return l(NZ($));
};
var I2 = function($) {
  return GJ($);
};
var GJ = function($) {
  return N0($) ? V2($.allOf) : u($) ? E2($.anyOf) : O8($) ? I2($.item) : $;
};
var x2 = function($) {
  return $.map((X) => HJ(X, false));
};
var k2 = function($) {
  return globalThis.Object.getOwnPropertyNames($).reduce((X, J) => {
    return { ...X, [J]: Q1(HJ($[J], false)) };
  }, {});
};
var p6 = function($, X) {
  return X === true ? $ : Q1($);
};
var HJ = function($, X) {
  return bX($) ? p6(o1(), X) : jX($) ? p6(o1(), X) : X1($) ? Q1(L1(x2($))) : E8($) ? L$() : m$($) ? O$() : F0($) ? p6($0(k2($)), X) : RX($) ? p6(h1([], x1()), X) : G0($) ? P$() : KX($) ? S$() : EX($) ? _$() : h$($) ? _8() : p1($) ? n($) : V8($) ? n($) : M0($) ? n($) : $0({});
};
var W6 = function($, X) {
  return $.map((J) => A1(J, X));
};
var g2 = function($, X) {
  return globalThis.Object.getOwnPropertyNames($).reduce((J, Y) => {
    return { ...J, [Y]: A1($[Y], X) };
  }, {});
};
var T2 = function($, X) {
  return $.parameters = W6($.parameters, X), $.returns = A1($.returns, X), $;
};
var f2 = function($, X) {
  return $.parameters = W6($.parameters, X), $.returns = A1($.returns, X), $;
};
var y2 = function($, X) {
  return $.allOf = W6($.allOf, X), $;
};
var d2 = function($, X) {
  return $.anyOf = W6($.anyOf, X), $;
};
var v2 = function($, X) {
  if (G0($.items))
    return $;
  return $.items = W6($.items, X), $;
};
var p2 = function($, X) {
  return $.items = A1($.items, X), $;
};
var h2 = function($, X) {
  return $.properties = g2($.properties, X), $;
};
var m2 = function($, X) {
  return $.item = A1($.item, X), $;
};
var i2 = function($, X) {
  return $.items = A1($.items, X), $;
};
var u2 = function($, X) {
  return $.items = A1($.items, X), $;
};
var c2 = function($, X) {
  const J = X.find((Z) => Z.$id === $.$ref);
  if (J === undefined)
    throw Error(`Unable to dereference schema with $id ${$.$ref}`);
  const Y = A0(J, ["$id"]);
  return A1(Y, X);
};
var DJ = function($, X) {
  return i0($) ? DJ(W8($), X) : i0(X) ? DJ($, W8(X)) : u($) ? (() => {
    const J = $.anyOf.filter((Y) => q8(Y, X) === N.False);
    return J.length === 1 ? J[0] : l(J);
  })() : q8($, X) !== N.False ? e() : $;
};
var n2 = function($, X, J) {
  return globalThis.Object.getOwnPropertyNames($).reduce((Y, Z) => {
    return { ...Y, [Z]: C$($[Z], X, J) };
  }, {});
};
var l2 = function($, X, J) {
  return n2($.properties, X, J);
};
var AJ = function($, X) {
  return i0($) ? AJ(W8($), X) : i0(X) ? AJ($, W8(X)) : u($) ? (() => {
    const J = $.anyOf.filter((Y) => q8(Y, X) !== N.False);
    return J.length === 1 ? J[0] : l(J);
  })() : q8($, X) !== N.False ? $ : e();
};
var t2 = function($, X, J) {
  return globalThis.Object.getOwnPropertyNames($).reduce((Y, Z) => {
    return { ...Y, [Z]: F$($[Z], X, J) };
  }, {});
};
var s2 = function($, X, J) {
  return t2($.properties, X, J);
};
var r2 = function($, X, J) {
  return { [$]: K1(n($), X, J) };
};
var a2 = function($, X, J) {
  return $.reduce((Y, Z) => {
    return { ...Y, ...r2(Z, X, J) };
  }, {});
};
var e2 = function($, X, J) {
  return a2($.keys, X, J);
};
var $3 = function($) {
  const [X, J] = [$.slice(0, 1), $.slice(1)];
  return [X.toLowerCase(), J].join("");
};
var X3 = function($) {
  const [X, J] = [$.slice(0, 1), $.slice(1)];
  return [X.toUpperCase(), J].join("");
};
var J3 = function($) {
  return $.toUpperCase();
};
var Y3 = function($) {
  return $.toLowerCase();
};
var Z3 = function($, X, J) {
  const Y = x8($.pattern);
  if (!S8(Y))
    return { ...$, pattern: _Z($.pattern, X) };
  const Q = [...Z$(Y)].map((U) => n(U)), z = PZ(Q, X), q = l(z);
  return Q$([q], J);
};
var _Z = function($, X) {
  return typeof $ === "string" ? X === "Uncapitalize" ? $3($) : X === "Capitalize" ? X3($) : X === "Uppercase" ? J3($) : X === "Lowercase" ? Y3($) : $ : $.toString();
};
var PZ = function($, X) {
  return $.map((J) => K1(J, X));
};
var W3 = function($, X, J) {
  return globalThis.Object.getOwnPropertyNames($).reduce((Y, Z) => {
    return { ...Y, [Z]: C8($[Z], X, J) };
  }, {});
};
var Q3 = function($, X, J) {
  return W3($.properties, X, J);
};
var z3 = function($, X) {
  return $.map((J) => OJ(J, X));
};
var q3 = function($, X) {
  return $.map((J) => OJ(J, X));
};
var B3 = function($, X) {
  const { [X]: J, ...Y } = $;
  return Y;
};
var M3 = function($, X) {
  return X.reduce((J, Y) => {
    return B3(J, Y);
  }, $);
};
var U3 = function($, X, J) {
  return { [X]: C8($, [X], J) };
};
var w3 = function($, X, J) {
  return X.reduce((Y, Z) => {
    return { ...Y, ...U3($, Z, J) };
  }, {});
};
var G3 = function($, X, J) {
  return w3($, X.keys, J);
};
var FZ = function($) {
  return $.map((X) => bZ(X));
};
var H3 = function($) {
  return globalThis.Object.getOwnPropertyNames($).reduce((X, J) => {
    return { ...X, [J]: u0($[J]) };
  }, {});
};
var bZ = function($) {
  return N0($) ? T0(FZ($.allOf)) : u($) ? l(FZ($.anyOf)) : O0($) ? $0(H3($.properties)) : $0({});
};
var D3 = function($, X) {
  return globalThis.Object.getOwnPropertyNames($).reduce((J, Y) => {
    return { ...J, [Y]: b$($[Y], X) };
  }, {});
};
var A3 = function($, X) {
  return D3($.properties, X);
};
var N3 = function($, X, J) {
  return globalThis.Object.getOwnPropertyNames($).reduce((Y, Z) => {
    return { ...Y, [Z]: F8($[Z], X, J) };
  }, {});
};
var O3 = function($, X, J) {
  return N3($.properties, X, J);
};
var S3 = function($, X) {
  return $.map((J) => _J(J, X));
};
var _3 = function($, X) {
  return $.map((J) => _J(J, X));
};
var P3 = function($, X) {
  return X.reduce((J, Y) => {
    return Y in $ ? { ...J, [Y]: $[Y] } : J;
  }, {});
};
var L3 = function($, X, J) {
  return { [X]: F8($, [X], J) };
};
var C3 = function($, X, J) {
  return X.reduce((Y, Z) => {
    return { ...Y, ...L3($, Z, J) };
  }, {});
};
var F3 = function($, X, J) {
  return C3($, X.keys, J);
};
var Q6 = function($, X, J) {
  return { ...J, [H]: "Record", type: "object", patternProperties: { [$]: C(X) } };
};
var PJ = function($, X, J) {
  const Y = $.reduce((Z, W) => ({ ...Z, [W]: C(X) }), {});
  return $0(Y, { ...J, [S1]: "Record" });
};
var b3 = function($, X, J) {
  return n$($) ? PJ(t0($), X, J) : Q6($.pattern, X, J);
};
var R3 = function($, X, J) {
  return PJ(t0(l($)), X, J);
};
var j3 = function($, X, J) {
  return PJ([$.toString()], X, J);
};
var K3 = function($, X, J) {
  return Q6($.source, X, J);
};
var V3 = function($, X, J) {
  const Y = G0($.pattern) ? Z8 : $.pattern;
  return Q6(Y, X, J);
};
var E3 = function($, X, J) {
  return Q6(i1, X, J);
};
var I3 = function($, X, J) {
  return Q6(i1, X, J);
};
var x3 = 0;
var KZ = function($) {
  return $.map((X) => VZ(X));
};
var k3 = function($) {
  return globalThis.Object.getOwnPropertyNames($).reduce((X, J) => {
    return { ...X, [J]: A0($[J], [$1]) };
  }, {});
};
var VZ = function($) {
  return N0($) ? T0(KZ($.allOf)) : u($) ? l(KZ($.anyOf)) : O0($) ? $0(k3($.properties)) : $0({});
};
var g3 = function($, X) {
  return globalThis.Object.getOwnPropertyNames($).reduce((J, Y) => {
    return { ...J, [Y]: R$($[Y], X) };
  }, {});
};
var T3 = function($, X) {
  return g3($.properties, X);
};
var f3 = function($) {
  return N0($) ? [...$.allOf] : u($) ? [...$.anyOf] : _1($) ? [...$.items ?? []] : [];
};

class LJ {
  schema;
  constructor($) {
    this.schema = $;
  }
  Decode($) {
    return new CJ(this.schema, $);
  }
}

class CJ {
  schema;
  decode;
  constructor($, X) {
    this.schema = $, this.decode = X;
  }
  EncodeTransform($, X) {
    const Z = { Encode: (W) => X[C0].Encode($(W)), Decode: (W) => this.decode(X[C0].Decode(W)) };
    return { ...X, [C0]: Z };
  }
  EncodeSchema($, X) {
    const J = { Decode: this.decode, Encode: $ };
    return { ...X, [C0]: J };
  }
  Encode($) {
    const X = C(this.schema);
    return r(X) ? this.EncodeTransform($, X) : this.EncodeSchema($, X);
  }
}
var FJ = {};
G8(FJ, { Void: () => {
  {
    return zX;
  }
}, Uppercase: () => {
  {
    return t6;
  }
}, Unsafe: () => {
  {
    return t8;
  }
}, Unknown: () => {
  {
    return x1;
  }
}, Union: () => {
  {
    return l;
  }
}, Undefined: () => {
  {
    return P$;
  }
}, Uncapitalize: () => {
  {
    return l6;
  }
}, Uint8Array: () => {
  {
    return L$;
  }
}, Tuple: () => {
  {
    return L1;
  }
}, Transform: () => {
  {
    return QX;
  }
}, TemplateLiteral: () => {
  {
    return Q$;
  }
}, Symbol: () => {
  {
    return _$;
  }
}, String: () => {
  {
    return Z1;
  }
}, Strict: () => {
  {
    return WX;
  }
}, ReturnType: () => {
  {
    return ZX;
  }
}, Rest: () => {
  {
    return YX;
  }
}, Required: () => {
  {
    return R$;
  }
}, RegExp: () => {
  {
    return JX;
  }
}, Ref: () => {
  {
    return XX;
  }
}, Recursive: () => {
  {
    return $X;
  }
}, Record: () => {
  {
    return e6;
  }
}, ReadonlyOptional: () => {
  {
    return a6;
  }
}, Readonly: () => {
  {
    return Q1;
  }
}, Promise: () => {
  {
    return q$;
  }
}, Pick: () => {
  {
    return F8;
  }
}, Partial: () => {
  {
    return b$;
  }
}, Parameters: () => {
  {
    return r6;
  }
}, Optional: () => {
  {
    return u0;
  }
}, Omit: () => {
  {
    return C8;
  }
}, Object: () => {
  {
    return $0;
  }
}, Number: () => {
  {
    return P1;
  }
}, Null: () => {
  {
    return S$;
  }
}, Not: () => {
  {
    return s6;
  }
}, Never: () => {
  {
    return e;
  }
}, Mapped: () => {
  {
    return j6;
  }
}, Lowercase: () => {
  {
    return n6;
  }
}, Literal: () => {
  {
    return n;
  }
}, KeyOf: () => {
  {
    return B$;
  }
}, Iterator: () => {
  {
    return z$;
  }
}, Intersect: () => {
  {
    return T0;
  }
}, Integer: () => {
  {
    return c6;
  }
}, InstanceType: () => {
  {
    return u6;
  }
}, Index: () => {
  {
    return W1;
  }
}, Function: () => {
  {
    return h1;
  }
}, Extract: () => {
  {
    return F$;
  }
}, Extends: () => {
  {
    return P8;
  }
}, Exclude: () => {
  {
    return C$;
  }
}, Enum: () => {
  {
    return i6;
  }
}, Deref: () => {
  {
    return A1;
  }
}, Date: () => {
  {
    return O$;
  }
}, ConstructorParameters: () => {
  {
    return m6;
  }
}, Constructor: () => {
  {
    return a8;
  }
}, Const: () => {
  {
    return h6;
  }
}, Composite: () => {
  {
    return H$;
  }
}, Capitalize: () => {
  {
    return o6;
  }
}, Boolean: () => {
  {
    return W$;
  }
}, BigInt: () => {
  {
    return _8;
  }
}, Awaited: () => {
  {
    return v6;
  }
}, AsyncIterator: () => {
  {
    return r8;
  }
}, Array: () => {
  {
    return s8;
  }
}, Any: () => {
  {
    return o1;
  }
} });
var qX = FJ;

class jJ {
  schema;
  references;
  checkFunc;
  code;
  hasTransform;
  constructor($, X, J, Y) {
    this.schema = $, this.references = X, this.checkFunc = J, this.code = Y, this.hasTransform = MJ($, X);
  }
  Code() {
    return this.code;
  }
  Errors($) {
    return w$(this.schema, this.references, $);
  }
  Check($) {
    return this.checkFunc($);
  }
  Decode($) {
    if (!this.checkFunc($))
      throw new A$(this.schema, $, this.Errors($).First());
    return this.hasTransform ? Y6(this.schema, this.references, $) : $;
  }
  Encode($) {
    const X = this.hasTransform ? Z6(this.schema, this.references, $) : $;
    if (!this.checkFunc(X))
      throw new N$(this.schema, $, this.Errors($).First());
    return X;
  }
}
var B8;
(function($) {
  function X(W) {
    return W === 36;
  }
  $.DollarSign = X;
  function J(W) {
    return W === 95;
  }
  $.IsUnderscore = J;
  function Y(W) {
    return W >= 65 && W <= 90 || W >= 97 && W <= 122;
  }
  $.IsAlpha = Y;
  function Z(W) {
    return W >= 48 && W <= 57;
  }
  $.IsNumeric = Z;
})(B8 || (B8 = {}));
var BX;
(function($) {
  function X(W) {
    if (W.length === 0)
      return false;
    return B8.IsNumeric(W.charCodeAt(0));
  }
  function J(W) {
    if (X(W))
      return false;
    for (let Q = 0;Q < W.length; Q++) {
      const z = W.charCodeAt(Q);
      if (!(B8.IsAlpha(z) || B8.IsNumeric(z) || B8.DollarSign(z) || B8.IsUnderscore(z)))
        return false;
    }
    return true;
  }
  function Y(W) {
    return W.replace(/'/g, "\\'");
  }
  function Z(W, Q) {
    return J(Q) ? `${W}.${Q}` : `${W}['${Y(Q)}']`;
  }
  $.Encode = Z;
})(BX || (BX = {}));
var bJ;
(function($) {
  function X(J) {
    const Y = [];
    for (let Z = 0;Z < J.length; Z++) {
      const W = J.charCodeAt(Z);
      if (B8.IsNumeric(W) || B8.IsAlpha(W))
        Y.push(J.charAt(Z));
      else
        Y.push(`_${W}_`);
    }
    return Y.join("").replace(/__/g, "_");
  }
  $.Encode = X;
})(bJ || (bJ = {}));
var RJ;
(function($) {
  function X(J) {
    return J.replace(/'/g, "\\'");
  }
  $.Escape = X;
})(RJ || (RJ = {}));

class KJ extends d {
  schema;
  constructor($) {
    super("Unknown type");
    this.schema = $;
  }
}

class MX extends d {
  schema;
  constructor($) {
    super("Preflight validation check failed to guard for the given schema");
    this.schema = $;
  }
}
var g8;
(function($) {
  function X(Q, z, q) {
    return S0.ExactOptionalPropertyTypes ? `('${z}' in ${Q} ? ${q} : true)` : `(${BX.Encode(Q, z)} !== undefined ? ${q} : true)`;
  }
  $.IsExactOptionalProperty = X;
  function J(Q) {
    return !S0.AllowArrayObject ? `(typeof ${Q} === 'object' && ${Q} !== null && !Array.isArray(${Q}))` : `(typeof ${Q} === 'object' && ${Q} !== null)`;
  }
  $.IsObjectLike = J;
  function Y(Q) {
    return !S0.AllowArrayObject ? `(typeof ${Q} === 'object' && ${Q} !== null && !Array.isArray(${Q}) && !(${Q} instanceof Date) && !(${Q} instanceof Uint8Array))` : `(typeof ${Q} === 'object' && ${Q} !== null && !(${Q} instanceof Date) && !(${Q} instanceof Uint8Array))`;
  }
  $.IsRecordLike = Y;
  function Z(Q) {
    return !S0.AllowNaN ? `(typeof ${Q} === 'number' && Number.isFinite(${Q}))` : `typeof ${Q} === 'number'`;
  }
  $.IsNumberLike = Z;
  function W(Q) {
    return S0.AllowNullVoid ? `(${Q} === undefined || ${Q} === null)` : `${Q} === undefined`;
  }
  $.IsVoidLike = W;
})(g8 || (g8 = {}));
var j$;
(function($) {
  function X(M) {
    return M[H] === "Any" || M[H] === "Unknown";
  }
  function* J(M, K, w) {
    yield "true";
  }
  function* Y(M, K, w) {
    yield `Array.isArray(${w})`;
    const [y, V] = [b("value", "any"), b("acc", "number")];
    if (k(M.maxItems))
      yield `${w}.length <= ${M.maxItems}`;
    if (k(M.minItems))
      yield `${w}.length >= ${M.minItems}`;
    const I = B1(M.items, K, "value");
    if (yield `${w}.every((${y}) => ${I})`, g(M.contains) || k(M.minContains) || k(M.maxContains)) {
      const Q0 = g(M.contains) ? M.contains : e(), r0 = B1(Q0, K, "value"), X8 = k(M.minContains) ? [`(count >= ${M.minContains})`] : [], V1 = k(M.maxContains) ? [`(count <= ${M.maxContains})`] : [], y1 = `const count = value.reduce((${V}, ${y}) => ${r0} ? acc + 1 : acc, 0)`, D6 = ["(count > 0)", ...X8, ...V1].join(" && ");
      yield `((${y}) => { ${y1}; return ${D6}})(${w})`;
    }
    if (M.uniqueItems === true)
      yield `((${y}) => { const set = new Set(); for(const element of value) { const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true } )(${w})`;
  }
  function* Z(M, K, w) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${w})`;
  }
  function* W(M, K, w) {
    if (yield `(typeof ${w} === 'bigint')`, k0(M.exclusiveMaximum))
      yield `${w} < BigInt(${M.exclusiveMaximum})`;
    if (k0(M.exclusiveMinimum))
      yield `${w} > BigInt(${M.exclusiveMinimum})`;
    if (k0(M.maximum))
      yield `${w} <= BigInt(${M.maximum})`;
    if (k0(M.minimum))
      yield `${w} >= BigInt(${M.minimum})`;
    if (k0(M.multipleOf))
      yield `(${w} % BigInt(${M.multipleOf})) === 0`;
  }
  function* Q(M, K, w) {
    yield `(typeof ${w} === 'boolean')`;
  }
  function* z(M, K, w) {
    yield* O1(M.returns, K, `${w}.prototype`);
  }
  function* q(M, K, w) {
    if (yield `(${w} instanceof Date) && Number.isFinite(${w}.getTime())`, k(M.exclusiveMaximumTimestamp))
      yield `${w}.getTime() < ${M.exclusiveMaximumTimestamp}`;
    if (k(M.exclusiveMinimumTimestamp))
      yield `${w}.getTime() > ${M.exclusiveMinimumTimestamp}`;
    if (k(M.maximumTimestamp))
      yield `${w}.getTime() <= ${M.maximumTimestamp}`;
    if (k(M.minimumTimestamp))
      yield `${w}.getTime() >= ${M.minimumTimestamp}`;
    if (k(M.multipleOfTimestamp))
      yield `(${w}.getTime() % ${M.multipleOfTimestamp}) === 0`;
  }
  function* U(M, K, w) {
    yield `(typeof ${w} === 'function')`;
  }
  function* A(M, K, w) {
    if (yield `(typeof ${w} === 'number' && Number.isInteger(${w}))`, k(M.exclusiveMaximum))
      yield `${w} < ${M.exclusiveMaximum}`;
    if (k(M.exclusiveMinimum))
      yield `${w} > ${M.exclusiveMinimum}`;
    if (k(M.maximum))
      yield `${w} <= ${M.maximum}`;
    if (k(M.minimum))
      yield `${w} >= ${M.minimum}`;
    if (k(M.multipleOf))
      yield `(${w} % ${M.multipleOf}) === 0`;
  }
  function* O(M, K, w) {
    const y = M.allOf.map((V) => B1(V, K, w)).join(" && ");
    if (M.unevaluatedProperties === false) {
      const V = S(`${new RegExp(u1(M))};`), I = `Object.getOwnPropertyNames(${w}).every(key => ${V}.test(key))`;
      yield `(${y} && ${I})`;
    } else if (g(M.unevaluatedProperties)) {
      const V = S(`${new RegExp(u1(M))};`), I = `Object.getOwnPropertyNames(${w}).every(key => ${V}.test(key) || ${B1(M.unevaluatedProperties, K, `${w}[key]`)})`;
      yield `(${y} && ${I})`;
    } else
      yield `(${y})`;
  }
  function* T(M, K, w) {
    yield `(typeof value === 'object' && Symbol.iterator in ${w})`;
  }
  function* E(M, K, w) {
    if (typeof M.const === "number" || typeof M.const === "boolean")
      yield `(${w} === ${M.const})`;
    else
      yield `(${w} === '${RJ.Escape(M.const)}')`;
  }
  function* _(M, K, w) {
    yield "false";
  }
  function* x(M, K, w) {
    yield `(!${B1(M.not, K, w)})`;
  }
  function* P(M, K, w) {
    yield `(${w} === null)`;
  }
  function* j(M, K, w) {
    if (yield g8.IsNumberLike(w), k(M.exclusiveMaximum))
      yield `${w} < ${M.exclusiveMaximum}`;
    if (k(M.exclusiveMinimum))
      yield `${w} > ${M.exclusiveMinimum}`;
    if (k(M.maximum))
      yield `${w} <= ${M.maximum}`;
    if (k(M.minimum))
      yield `${w} >= ${M.minimum}`;
    if (k(M.multipleOf))
      yield `(${w} % ${M.multipleOf}) === 0`;
  }
  function* F(M, K, w) {
    if (yield g8.IsObjectLike(w), k(M.minProperties))
      yield `Object.getOwnPropertyNames(${w}).length >= ${M.minProperties}`;
    if (k(M.maxProperties))
      yield `Object.getOwnPropertyNames(${w}).length <= ${M.maxProperties}`;
    const y = Object.getOwnPropertyNames(M.properties);
    for (let V of y) {
      const I = BX.Encode(w, V), Q0 = M.properties[V];
      if (M.required && M.required.includes(V)) {
        if (yield* O1(Q0, K, I), c1(Q0) || X(Q0))
          yield `('${V}' in ${w})`;
      } else {
        const r0 = B1(Q0, K, I);
        yield g8.IsExactOptionalProperty(w, V, r0);
      }
    }
    if (M.additionalProperties === false)
      if (M.required && M.required.length === y.length)
        yield `Object.getOwnPropertyNames(${w}).length === ${y.length}`;
      else {
        const V = `[${y.map((I) => `'${I}'`).join(", ")}]`;
        yield `Object.getOwnPropertyNames(${w}).every(key => ${V}.includes(key))`;
      }
    if (typeof M.additionalProperties === "object") {
      const V = B1(M.additionalProperties, K, `${w}[key]`), I = `[${y.map((Q0) => `'${Q0}'`).join(", ")}]`;
      yield `(Object.getOwnPropertyNames(${w}).every(key => ${I}.includes(key) || ${V}))`;
    }
  }
  function* v(M, K, w) {
    yield `(typeof value === 'object' && typeof ${w}.then === 'function')`;
  }
  function* D(M, K, w) {
    if (yield g8.IsRecordLike(w), k(M.minProperties))
      yield `Object.getOwnPropertyNames(${w}).length >= ${M.minProperties}`;
    if (k(M.maxProperties))
      yield `Object.getOwnPropertyNames(${w}).length <= ${M.maxProperties}`;
    const [y, V] = Object.entries(M.patternProperties)[0], I = S(`${new RegExp(y)}`), Q0 = B1(V, K, "value"), r0 = g(M.additionalProperties) ? B1(M.additionalProperties, K, w) : M.additionalProperties === false ? "false" : "true", X8 = `(${I}.test(key) ? ${Q0} : ${r0})`;
    yield `(Object.entries(${w}).every(([key, value]) => ${X8}))`;
  }
  function* h0(M, K, w) {
    const y = a(M, K);
    if (L0.functions.has(M.$ref))
      return yield `${T$(M.$ref)}(${w})`;
    yield* O1(y, K, w);
  }
  function* U8(M, K, w) {
    const y = S(`${new RegExp(M.source, M.flags)};`);
    yield `(typeof ${w} === 'string')`, yield `${y}.test(${w})`;
  }
  function* g$(M, K, w) {
    if (yield `(typeof ${w} === 'string')`, k(M.maxLength))
      yield `${w}.length <= ${M.maxLength}`;
    if (k(M.minLength))
      yield `${w}.length >= ${M.minLength}`;
    if (M.pattern !== undefined)
      yield `${S(`${new RegExp(M.pattern)};`)}.test(${w})`;
    if (M.format !== undefined)
      yield `format('${M.format}', ${w})`;
  }
  function* v8(M, K, w) {
    yield `(typeof ${w} === 'symbol')`;
  }
  function* K0(M, K, w) {
    yield `(typeof ${w} === 'string')`, yield `${S(`${new RegExp(M.pattern)};`)}.test(${w})`;
  }
  function* f1(M, K, w) {
    yield `${T$(M.$ref)}(${w})`;
  }
  function* w8(M, K, w) {
    if (yield `Array.isArray(${w})`, M.items === undefined)
      return yield `${w}.length === 0`;
    yield `(${w}.length === ${M.maxItems})`;
    for (let y = 0;y < M.items.length; y++)
      yield `${B1(M.items[y], K, `${w}[${y}]`)}`;
  }
  function* p8(M, K, w) {
    yield `${w} === undefined`;
  }
  function* nJ(M, K, w) {
    yield `(${M.anyOf.map((V) => B1(V, K, w)).join(" || ")})`;
  }
  function* lJ(M, K, w) {
    if (yield `${w} instanceof Uint8Array`, k(M.maxByteLength))
      yield `(${w}.length <= ${M.maxByteLength})`;
    if (k(M.minByteLength))
      yield `(${w}.length >= ${M.minByteLength})`;
  }
  function* h8(M, K, w) {
    yield "true";
  }
  function* m8(M, K, w) {
    yield g8.IsVoidLike(w);
  }
  function* D0(M, K, w) {
    const y = L0.instances.size;
    L0.instances.set(y, M), yield `kind('${M[H]}', ${y}, ${w})`;
  }
  function* O1(M, K, w, y = true) {
    const V = p(M.$id) ? [...K, M] : K, I = M;
    if (y && p(M.$id)) {
      const Q0 = T$(M.$id);
      if (L0.functions.has(Q0))
        return yield `${Q0}(${w})`;
      else {
        const r0 = L(Q0, M, K, "value", false);
        return L0.functions.set(Q0, r0), yield `${Q0}(${w})`;
      }
    }
    switch (I[H]) {
      case "Any":
        return yield* J(I, V, w);
      case "Array":
        return yield* Y(I, V, w);
      case "AsyncIterator":
        return yield* Z(I, V, w);
      case "BigInt":
        return yield* W(I, V, w);
      case "Boolean":
        return yield* Q(I, V, w);
      case "Constructor":
        return yield* z(I, V, w);
      case "Date":
        return yield* q(I, V, w);
      case "Function":
        return yield* U(I, V, w);
      case "Integer":
        return yield* A(I, V, w);
      case "Intersect":
        return yield* O(I, V, w);
      case "Iterator":
        return yield* T(I, V, w);
      case "Literal":
        return yield* E(I, V, w);
      case "Never":
        return yield* _(I, V, w);
      case "Not":
        return yield* x(I, V, w);
      case "Null":
        return yield* P(I, V, w);
      case "Number":
        return yield* j(I, V, w);
      case "Object":
        return yield* F(I, V, w);
      case "Promise":
        return yield* v(I, V, w);
      case "Record":
        return yield* D(I, V, w);
      case "Ref":
        return yield* h0(I, V, w);
      case "RegExp":
        return yield* U8(I, V, w);
      case "String":
        return yield* g$(I, V, w);
      case "Symbol":
        return yield* v8(I, V, w);
      case "TemplateLiteral":
        return yield* K0(I, V, w);
      case "This":
        return yield* f1(I, V, w);
      case "Tuple":
        return yield* w8(I, V, w);
      case "Undefined":
        return yield* p8(I, V, w);
      case "Union":
        return yield* nJ(I, V, w);
      case "Uint8Array":
        return yield* lJ(I, V, w);
      case "Unknown":
        return yield* h8(I, V, w);
      case "Void":
        return yield* m8(I, V, w);
      default:
        if (!V0.Has(I[H]))
          throw new KJ(M);
        return yield* D0(I, V, w);
    }
  }
  const L0 = { language: "javascript", functions: new Map, variables: new Map, instances: new Map };
  function B1(M, K, w, y = true) {
    return `(${[...O1(M, K, w, y)].join(" && ")})`;
  }
  function T$(M) {
    return `check_${bJ.Encode(M)}`;
  }
  function S(M) {
    const K = `local_${L0.variables.size}`;
    return L0.variables.set(K, `const ${K} = ${M}`), K;
  }
  function L(M, K, w, y, V = true) {
    const [I, Q0] = ["\n", (y1) => "".padStart(y1, " ")], r0 = b("value", "any"), X8 = s("boolean"), V1 = [...O1(K, w, y, V)].map((y1) => `${Q0(4)}${y1}`).join(` &&${I}`);
    return `function ${M}(${r0})${X8} {${I}${Q0(2)}return (${I}${V1}${I}${Q0(2)})\n}`;
  }
  function b(M, K) {
    const w = L0.language === "typescript" ? `: ${K}` : "";
    return `${M}${w}`;
  }
  function s(M) {
    return L0.language === "typescript" ? `: ${M}` : "";
  }
  function B0(M, K, w) {
    const y = L("check", M, K, "value"), V = b("value", "any"), I = s("boolean"), Q0 = [...L0.functions.values()], r0 = [...L0.variables.values()], X8 = p(M.$id) ? `return function check(${V})${I} {\n  return ${T$(M.$id)}(value)\n}` : `return ${y}`;
    return [...r0, ...Q0, X8].join("\n");
  }
  function i8(...M) {
    const K = { language: "javascript" }, [w, y, V] = M.length === 2 && f(M[1]) ? [M[0], M[1], K] : M.length === 2 && !f(M[1]) ? [M[0], [], M[1]] : M.length === 3 ? [M[0], M[1], M[2]] : M.length === 1 ? [M[0], [], K] : [null, [], K];
    if (L0.language = V.language, L0.variables.clear(), L0.functions.clear(), L0.instances.clear(), !g(w))
      throw new MX(w);
    for (let I of y)
      if (!g(I))
        throw new MX(I);
    return B0(w, y, V);
  }
  $.Code = i8;
  function w0(M, K = []) {
    const w = i8(M, K, { language: "javascript" }), y = globalThis.Function("kind", "format", "hash", w), V = new Map(L0.instances);
    function I(V1, y1, D6) {
      if (!V0.Has(V1) || !V.has(y1))
        return false;
      const B4 = V0.Get(V1), M4 = V.get(y1);
      return B4(M4, D6);
    }
    function Q0(V1, y1) {
      if (!g0.Has(V1))
        return false;
      return g0.Get(V1)(y1);
    }
    function r0(V1) {
      return Q8(V1);
    }
    const X8 = y(I, Q0, r0);
    return new jJ(M, K, X8, w);
  }
  $.Compile = w0;
})(j$ || (j$ = {}));
var v3 = function($, X) {
  if (typeof $ !== "string")
    throw new TypeError("argument str must be a string");
  var J = {}, Y = X || {}, Z = Y.decode || h3, W = 0;
  while (W < $.length) {
    var Q = $.indexOf("=", W);
    if (Q === -1)
      break;
    var z = $.indexOf(";", W);
    if (z === -1)
      z = $.length;
    else if (z < Q) {
      W = $.lastIndexOf(";", Q - 1) + 1;
      continue;
    }
    var q = $.slice(W, Q).trim();
    if (J[q] === undefined) {
      var U = $.slice(Q + 1, z).trim();
      if (U.charCodeAt(0) === 34)
        U = U.slice(1, -1);
      J[q] = u3(U, Z);
    }
    W = z + 1;
  }
  return J;
};
var p3 = function($, X, J) {
  var Y = J || {}, Z = Y.encode || m3;
  if (typeof Z !== "function")
    throw new TypeError("option encode is invalid");
  if (!UX.test($))
    throw new TypeError("argument name is invalid");
  var W = Z(X);
  if (W && !UX.test(W))
    throw new TypeError("argument val is invalid");
  var Q = $ + "=" + W;
  if (Y.maxAge != null) {
    var z = Y.maxAge - 0;
    if (isNaN(z) || !isFinite(z))
      throw new TypeError("option maxAge is invalid");
    Q += "; Max-Age=" + Math.floor(z);
  }
  if (Y.domain) {
    if (!UX.test(Y.domain))
      throw new TypeError("option domain is invalid");
    Q += "; Domain=" + Y.domain;
  }
  if (Y.path) {
    if (!UX.test(Y.path))
      throw new TypeError("option path is invalid");
    Q += "; Path=" + Y.path;
  }
  if (Y.expires) {
    var q = Y.expires;
    if (!i3(q) || isNaN(q.valueOf()))
      throw new TypeError("option expires is invalid");
    Q += "; Expires=" + q.toUTCString();
  }
  if (Y.httpOnly)
    Q += "; HttpOnly";
  if (Y.secure)
    Q += "; Secure";
  if (Y.partitioned)
    Q += "; Partitioned";
  if (Y.priority) {
    var U = typeof Y.priority === "string" ? Y.priority.toLowerCase() : Y.priority;
    switch (U) {
      case "low":
        Q += "; Priority=Low";
        break;
      case "medium":
        Q += "; Priority=Medium";
        break;
      case "high":
        Q += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (Y.sameSite) {
    var A = typeof Y.sameSite === "string" ? Y.sameSite.toLowerCase() : Y.sameSite;
    switch (A) {
      case true:
        Q += "; SameSite=Strict";
        break;
      case "lax":
        Q += "; SameSite=Lax";
        break;
      case "strict":
        Q += "; SameSite=Strict";
        break;
      case "none":
        Q += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return Q;
};
var h3 = function($) {
  return $.indexOf("%") !== -1 ? decodeURIComponent($) : $;
};
var m3 = function($) {
  return encodeURIComponent($);
};
var i3 = function($) {
  return d3.call($) === "[object Date]" || $ instanceof Date;
};
var u3 = function($, X) {
  try {
    return X($);
  } catch (J) {
    return $;
  }
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var wX = v3;
var GX = p3;
var d3 = Object.prototype.toString;
var UX = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

class g1 {
  $;
  X;
  name;
  setter;
  constructor($, X = {}) {
    this._value = $;
    this.property = X;
  }
  get() {
    return this._value;
  }
  get value() {
    return this._value;
  }
  set value($) {
    if (typeof $ === "object") {
      if (JSON.stringify(this.value) === JSON.stringify($))
        return;
    } else if (this.value === $)
      return;
    this._value = $, this.sync();
  }
  add($) {
    const X = Object.assign(this.property, typeof $ === "function" ? $(Object.assign(this.property, this.value)) : $);
    if ("value" in X)
      this._value = X.value, delete X.value;
    return this.property = X, this.sync();
  }
  set($) {
    const X = typeof $ === "function" ? $(Object.assign(this.property, this.value)) : $;
    if ("value" in X)
      this._value = X.value, delete X.value;
    return this.property = X, this.sync();
  }
  remove($) {
    if (this.value === undefined)
      return;
    this.set({ domain: $?.domain, expires: new Date(0), maxAge: 0, path: $?.path, sameSite: $?.sameSite, secure: $?.secure, value: "" });
  }
  get domain() {
    return this.property.domain;
  }
  set domain($) {
    if (this.property.domain === $)
      return;
    this.property.domain = $, this.sync();
  }
  get expires() {
    return this.property.expires;
  }
  set expires($) {
    if (this.property.expires?.getTime() === $?.getTime())
      return;
    this.property.expires = $, this.sync();
  }
  get httpOnly() {
    return this.property.httpOnly;
  }
  set httpOnly($) {
    if (this.property.domain === $)
      return;
    this.property.httpOnly = $, this.sync();
  }
  get maxAge() {
    return this.property.maxAge;
  }
  set maxAge($) {
    if (this.property.maxAge === $)
      return;
    this.property.maxAge = $, this.sync();
  }
  get path() {
    return this.property.path;
  }
  set path($) {
    if (this.property.path === $)
      return;
    this.property.path = $, this.sync();
  }
  get priority() {
    return this.property.priority;
  }
  set priority($) {
    if (this.property.priority === $)
      return;
    this.property.priority = $, this.sync();
  }
  get sameSite() {
    return this.property.sameSite;
  }
  set sameSite($) {
    if (this.property.sameSite === $)
      return;
    this.property.sameSite = $, this.sync();
  }
  get secure() {
    return this.property.secure;
  }
  set secure($) {
    if (this.property.secure === $)
      return;
    this.property.secure = $, this.sync();
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
  sync() {
    if (!this.name || !this.setter)
      return this;
    if (!this.setter.cookie)
      this.setter.cookie = { [this.name]: Object.assign(this.property, { value: this.toString() }) };
    else
      this.setter.cookie[this.name] = Object.assign(this.property, { value: this.toString() });
    return this;
  }
}
var xZ = ($, X, J) => new Proxy($, { get(Y, Z) {
  if (Z in Y)
    return Y[Z];
  const W = new g1(undefined, J ? { ...J } : undefined);
  return W.setter = X, W.name = Z, W;
}, set(Y, Z, W) {
  if (!(W instanceof g1))
    return false;
  if (!X.cookie)
    X.cookie = {};
  return W.setter = X, W.name = Z, W.sync(), Y[Z] = W, true;
} });
var HX = async ($, X, { secret: J, sign: Y, ...Z } = {}) => {
  if (!X)
    return xZ({}, $, Z);
  const W = {}, Q = typeof J === "string";
  if (Y && Y !== true && !Array.isArray(Y))
    Y = [Y];
  const z = Object.keys(wX(X));
  for (let q = 0;q < z.length; q++) {
    const U = z[q];
    let A = wX(X)[U];
    if (Y === true || Y?.includes(U)) {
      if (!J)
        throw new Error("No secret is provided to cookie plugin");
      if (Q) {
        if (A = await VJ(A, J), A === false)
          throw new z6(U);
      } else {
        let E = true;
        for (let _ = 0;_ < J.length; _++) {
          const x = await VJ(A, J[_]);
          if (x !== false) {
            A = x, E = false;
            break;
          }
        }
        if (E)
          throw new z6(U);
      }
    }
    if (A === undefined)
      continue;
    const O = A.charCodeAt(0);
    if (O === 123 || O === 91)
      try {
        const E = new g1(JSON.parse(A));
        E.setter = $, E.name = U, W[U] = E;
        continue;
      } catch {
      }
    if (DX(A))
      A = +A;
    else if (A === "true")
      A = true;
    else if (A === "false")
      A = false;
    const T = new g1(A, Z);
    T.setter = $, T.name = U, W[U] = T;
  }
  return xZ(W, $);
};
var EJ = "toJSON" in new Headers;
var T1 = ($) => {
  for (let X in $)
    return true;
  return false;
};
var q6 = ($, X) => {
  const J = $.size;
  if (J && X && X.status !== 206 && X.status !== 304 && X.status !== 412 && X.status !== 416 || !X && J) {
    if (X) {
      if (X.headers instanceof Headers) {
        if (EJ)
          X.headers = X.headers.toJSON();
        else
          for (let [Y, Z] of X.headers.entries())
            if (Y in X.headers)
              X.headers[Y] = Z;
      }
      return new Response($, { status: X.status, headers: Object.assign({ "accept-ranges": "bytes", "content-range": `bytes 0-${J - 1}/${J}` }, X.headers) });
    }
    return new Response($, { headers: { "accept-ranges": "bytes", "content-range": `bytes 0-${J - 1}/${J}` } });
  }
  return new Response($);
};
var kZ = ($, X) => {
  if (!$ || !Array.isArray(X))
    return $;
  $.delete("Set-Cookie");
  for (let J = 0;J < X.length; J++) {
    const Y = X[J].indexOf("=");
    $.append("Set-Cookie", `${X[J].slice(0, Y)}=${X[J].slice(Y + 1)}`);
  }
  return $;
};
var gZ = ($) => {
  if (!$ || typeof $ !== "object" || !T1($))
    return;
  const X = [];
  for (let [J, Y] of Object.entries($)) {
    if (!J || !Y)
      continue;
    if (Array.isArray(Y.value))
      for (let Z = 0;Z < Y.value.length; Z++) {
        let W = Y.value[Z];
        if (W === undefined || W === null)
          continue;
        if (typeof W === "object")
          W = JSON.stringify(W);
        X.push(GX(J, W, Y));
      }
    else {
      let Z = Y.value;
      if (Z === undefined || Z === null)
        continue;
      if (typeof Z === "object")
        Z = JSON.stringify(Z);
      X.push(GX(J, Y.value, Y));
    }
  }
  if (X.length === 0)
    return;
  if (X.length === 1)
    return X[0];
  return X;
};
var s1 = ($, X) => {
  if ($?.[$.$passthrough])
    $ = $[$.$passthrough];
  if ($?.[r1])
    X.status = $[r1], $ = $.response;
  if (T1(X.headers) || X.status !== 200 || X.redirect || X.cookie) {
    if (typeof X.status === "string")
      X.status = M6[X.status];
    if (X.redirect) {
      if (X.headers.Location = X.redirect, !X.status || X.status < 300 || X.status >= 400)
        X.status = 302;
    }
    if (X.cookie && T1(X.cookie))
      X.headers["Set-Cookie"] = gZ(X.cookie);
    if (X.headers["Set-Cookie"] && Array.isArray(X.headers["Set-Cookie"]))
      X.headers = kZ(new Headers(X.headers), X.headers["Set-Cookie"]);
    switch ($?.constructor?.name) {
      case "String":
        return new Response($, X);
      case "Blob":
        return q6($, X);
      case "Object":
      case "Array":
        return Response.json($, X);
      case "ReadableStream":
        if (!X.headers["content-type"]?.startsWith("text/event-stream"))
          X.headers["content-type"] = "text/event-stream; charset=utf-8";
        return new Response($, X);
      case undefined:
        if (!$)
          return new Response("", X);
        return Response.json($, X);
      case "Response":
        const J = { ...X.headers };
        if (EJ)
          X.headers = $.headers.toJSON();
        else
          for (let [Z, W] of $.headers.entries())
            if (Z in X.headers)
              X.headers[Z] = W;
        for (let Z in J)
          $.headers.append(Z, J[Z]);
        return $;
      case "Error":
        return B6($, X);
      case "Promise":
        return $.then((Z) => s1(Z, X));
      case "Function":
        return s1($(), X);
      case "Number":
      case "Boolean":
        return new Response($.toString(), X);
      case "Cookie":
        if ($ instanceof g1)
          return new Response($.value, X);
        return new Response($?.toString(), X);
      default:
        const Y = JSON.stringify($);
        if (Y.charCodeAt(0) === 123) {
          if (!X.headers["Content-Type"])
            X.headers["Content-Type"] = "application/json";
          return new Response(JSON.stringify($), X);
        }
        return new Response(Y, X);
    }
  } else
    switch ($?.constructor?.name) {
      case "String":
        return new Response($);
      case "Blob":
        return q6($, X);
      case "Object":
      case "Array":
        return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
      case "ReadableStream":
        return new Response($, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!$)
          return new Response("");
        return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
      case "Response":
        return $;
      case "Error":
        return B6($, X);
      case "Promise":
        return $.then((Y) => {
          const Z = b8(Y);
          if (Z !== undefined)
            return Z;
          return new Response("");
        });
      case "Function":
        return b8($());
      case "Number":
      case "Boolean":
        return new Response($.toString());
      case "Cookie":
        if ($ instanceof g1)
          return new Response($.value, X);
        return new Response($?.toString(), X);
      default:
        const J = JSON.stringify($);
        if (J.charCodeAt(0) === 123)
          return new Response(JSON.stringify($), { headers: { "Content-Type": "application/json" } });
        return new Response(J);
    }
};
var N1 = ($, X) => {
  if ($ === undefined || $ === null)
    return;
  if ($?.$passthrough)
    $ = $[$.$passthrough];
  if ($?.[r1])
    X.status = $[r1], $ = $.response;
  if (T1(X.headers) || X.status !== 200 || X.redirect || X.cookie) {
    if (typeof X.status === "string")
      X.status = M6[X.status];
    if (X.redirect) {
      if (X.headers.Location = X.redirect, !X.status || X.status < 300 || X.status >= 400)
        X.status = 302;
    }
    if (X.cookie && T1(X.cookie))
      X.headers["Set-Cookie"] = gZ(X.cookie);
    if (X.headers["Set-Cookie"] && Array.isArray(X.headers["Set-Cookie"]))
      X.headers = kZ(new Headers(X.headers), X.headers["Set-Cookie"]);
    switch ($?.constructor?.name) {
      case "String":
        return new Response($, X);
      case "Blob":
        return q6($, X);
      case "Object":
      case "Array":
        return Response.json($, X);
      case "ReadableStream":
        if (!X.headers["content-type"]?.startsWith("text/event-stream"))
          X.headers["content-type"] = "text/event-stream; charset=utf-8";
        return new Response($, X);
      case undefined:
        if (!$)
          return;
        return Response.json($, X);
      case "Response":
        const J = Object.assign({}, X.headers);
        if (EJ)
          X.headers = $.headers.toJSON();
        else
          for (let [Z, W] of $.headers.entries())
            if (!(Z in X.headers))
              X.headers[Z] = W;
        for (let Z in J)
          $.headers.append(Z, J[Z]);
        if ($.status !== X.status)
          X.status = $.status;
        return $;
      case "Promise":
        return $.then((Z) => {
          const W = N1(Z, X);
          if (W !== undefined)
            return W;
          return;
        });
      case "Error":
        return B6($, X);
      case "Function":
        return N1($(), X);
      case "Number":
      case "Boolean":
        return new Response($.toString(), X);
      case "Cookie":
        if ($ instanceof g1)
          return new Response($.value, X);
        return new Response($?.toString(), X);
      default:
        const Y = JSON.stringify($);
        if (Y.charCodeAt(0) === 123) {
          if (!X.headers["Content-Type"])
            X.headers["Content-Type"] = "application/json";
          return new Response(JSON.stringify($), X);
        }
        return new Response(Y, X);
    }
  } else
    switch ($?.constructor?.name) {
      case "String":
        return new Response($);
      case "Blob":
        return q6($, X);
      case "Object":
      case "Array":
        return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
      case "ReadableStream":
        return new Response($, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!$)
          return new Response("");
        return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
      case "Response":
        return $;
      case "Promise":
        return $.then((Y) => {
          const Z = N1(Y, X);
          if (Z !== undefined)
            return Z;
          return;
        });
      case "Error":
        return B6($, X);
      case "Function":
        return b8($());
      case "Number":
      case "Boolean":
        return new Response($.toString());
      case "Cookie":
        if ($ instanceof g1)
          return new Response($.value, X);
        return new Response($?.toString(), X);
      default:
        const J = JSON.stringify($);
        if (J.charCodeAt(0) === 123)
          return new Response(JSON.stringify($), { headers: { "Content-Type": "application/json" } });
        return new Response(J);
    }
};
var b8 = ($) => {
  if ($?.$passthrough)
    $ = $[$.$passthrough];
  if ($?.[r1])
    return s1($.response, { status: $[r1], headers: {} });
  switch ($?.constructor?.name) {
    case "String":
      return new Response($);
    case "Blob":
      return q6($);
    case "Object":
    case "Array":
      return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
    case "ReadableStream":
      return new Response($, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
    case undefined:
      if (!$)
        return new Response("");
      return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
    case "Response":
      return $;
    case "Error":
      return B6($);
    case "Promise":
      return $.then((J) => {
        const Y = b8(J);
        if (Y !== undefined)
          return Y;
        return new Response("");
      });
    case "Function":
      return b8($());
    case "Number":
    case "Boolean":
      return new Response($.toString());
    default:
      const X = JSON.stringify($);
      if (X.charCodeAt(0) === 123)
        return new Response(JSON.stringify($), { headers: { "Content-Type": "application/json" } });
      return new Response(X);
  }
};
var B6 = ($, X) => new Response(JSON.stringify({ name: $?.name, message: $?.message, cause: $?.cause }), { status: X?.status !== 200 ? X?.status ?? 500 : 500, headers: X?.headers });
var IJ = ($) => $ && typeof $ === "object" && !Array.isArray($);
var xJ = ($, X) => {
  const J = new URL($);
  return J.pathname = X, J.toString();
};
var c3 = ($) => typeof $ === "function" && /^\s*class\s+/.test($.toString()) || $.toString().startsWith("[object ") || T1(Object.getPrototypeOf($));
var a1 = ($, X, { skipKeys: J } = {}) => {
  if (IJ($) && IJ(X))
    for (let [Y, Z] of Object.entries(X)) {
      if (J?.includes(Y))
        continue;
      if (!IJ(Z)) {
        $[Y] = Z;
        continue;
      }
      if (!(Y in $)) {
        $[Y] = Z;
        continue;
      }
      if (c3(Z)) {
        $[Y] = Z;
        continue;
      }
      $[Y] = a1($[Y], Z);
    }
  return $;
};
var TZ = ($, X) => a1($, X, { skipKeys: ["properties"] });
var E0 = ($, X) => {
  if (!$)
    return [];
  const J = [...Array.isArray($) ? $ : [$]], Y = [];
  for (let Z of J)
    if (Z.$elysiaChecksum)
      Y.push(Z.$elysiaChecksum);
  for (let Z of Array.isArray(X) ? X : [X])
    if (!Y.includes(Z?.$elysiaChecksum))
      J.push(Z);
  return J;
};
var kJ = ["start", "request", "parse", "transform", "resolve", "beforeHandle", "afterHandle", "onResponse", "mapResponse", "trace", "error", "stop", "body", "headers", "params", "query", "response", "type", "detail"];
var R8 = ($, X) => {
  return { ...$, ...X, body: X?.body ?? $?.body, headers: X?.headers ?? $?.headers, params: X?.params ?? $?.params, query: X?.query ?? $?.query, response: X?.response ?? $?.response, type: $?.type || X?.type, detail: a1(X?.detail ?? {}, $?.detail ?? {}), parse: E0($?.parse ?? [], X?.parse ?? []), transform: E0($?.transform ?? [], X?.transform ?? []), beforeHandle: E0($?.beforeHandle ?? [], X?.beforeHandle ?? []), afterHandle: E0($?.afterHandle ?? [], X?.afterHandle ?? []), onResponse: E0($?.onResponse ?? [], X?.onResponse ?? []), mapResponse: E0($?.mapResponse ?? [], X?.mapResponse ?? []), trace: E0($?.trace ?? [], X?.trace ?? []), error: E0($?.error ?? [], X?.error ?? []) };
};
var e1 = ($, { models: X = {}, additionalProperties: J = false, dynamic: Y = false }) => {
  if (!$)
    return;
  if (typeof $ === "string" && !($ in X))
    return;
  const Z = typeof $ === "string" ? X[$] : $;
  if (Z.type === "object" && "additionalProperties" in Z === false)
    Z.additionalProperties = J;
  if (Y)
    return { schema: Z, references: "", checkFunc: () => {
    }, code: "", Check: (W) => j0.Check(Z, W), Errors: (W) => j0.Errors(Z, W), Code: () => "" };
  return j$.Compile(Z, Object.values(X));
};
var gJ = ($, { models: X = {}, additionalProperties: J = false, dynamic: Y = false }) => {
  if (!$)
    return;
  if (typeof $ === "string" && !($ in X))
    return;
  const Z = typeof $ === "string" ? X[$] : $, W = (z, q) => {
    if (Y)
      return { schema: z, references: "", checkFunc: () => {
      }, code: "", Check: (U) => j0.Check(z, U), Errors: (U) => j0.Errors(z, U), Code: () => "" };
    return j$.Compile(z, q);
  };
  if (H in Z) {
    if ("additionalProperties" in Z === false)
      Z.additionalProperties = J;
    return { 200: W(Z, Object.values(X)) };
  }
  const Q = {};
  return Object.keys(Z).forEach((z) => {
    const q = Z[+z];
    if (typeof q === "string") {
      if (q in X) {
        const U = X[q];
        U.type === "object" && "additionalProperties" in U, Q[+z] = H in U ? W(U, Object.values(X)) : U;
      }
      return;
    }
    if (q.type === "object" && "additionalProperties" in q === false)
      q.additionalProperties = J;
    Q[+z] = H in q ? W(q, Object.values(X)) : q;
  }), Q;
};
var o3 = typeof Bun !== "undefined";
var n3 = o3 && typeof Bun.hash === "function";
var V$ = ($) => {
  if (n3)
    return Bun.hash($);
  let X = 9;
  for (let J = 0;J < $.length; )
    X = Math.imul(X ^ $.charCodeAt(J++), 387420489);
  return X = X ^ X >>> 9;
};
var AX = ($, X, J) => {
  const Y = (Z) => {
    if (J && !Z.$elysiaChecksum)
      Z.$elysiaChecksum = J;
    return Z;
  };
  return { ...$, ...X, start: E0($.start, ("start" in X ? X.start ?? [] : []).map(Y)), request: E0($.request, ("request" in X ? X.request ?? [] : []).map(Y)), parse: E0($.parse, "parse" in X ? X?.parse ?? [] : []).map(Y), transform: E0($.transform, (X?.transform ?? []).map(Y)), beforeHandle: E0($.beforeHandle, (X?.beforeHandle ?? []).map(Y)), afterHandle: E0($.afterHandle, (X?.afterHandle ?? []).map(Y)), mapResponse: E0($.mapResponse, (X?.mapResponse ?? []).map(Y)), onResponse: E0($.onResponse, (X?.onResponse ?? []).map(Y)), trace: $.trace, error: E0($.error, (X?.error ?? []).map(Y)), stop: E0($.stop, ("stop" in X ? X.stop ?? [] : []).map(Y)) };
};
var fZ = ($, X = true) => {
  if (!$)
    return $;
  if (typeof $ === "function") {
    if (X)
      $.$elysiaHookType = "global";
    else
      $.$elysiaHookType = undefined;
    return $;
  }
  return $.map((J) => {
    if (X)
      J.$elysiaHookType = "global";
    else
      J.$elysiaHookType = undefined;
    return J;
  });
};
var K$ = ($) => {
  if (!$)
    return $;
  if (typeof $ === "function")
    return $.$elysiaHookType === "global" ? $ : undefined;
  return $.filter((X) => X.$elysiaHookType === "global");
};
var TJ = ($) => {
  return { ...$, type: $?.type, detail: $?.detail, parse: K$($?.parse), transform: K$($?.transform), beforeHandle: K$($?.beforeHandle), afterHandle: K$($?.afterHandle), onResponse: K$($?.onResponse), error: K$($?.error) };
};
var M6 = { Continue: 100, "Switching Protocols": 101, Processing: 102, "Early Hints": 103, OK: 200, Created: 201, Accepted: 202, "Non-Authoritative Information": 203, "No Content": 204, "Reset Content": 205, "Partial Content": 206, "Multi-Status": 207, "Already Reported": 208, "Multiple Choices": 300, "Moved Permanently": 301, Found: 302, "See Other": 303, "Not Modified": 304, "Temporary Redirect": 307, "Permanent Redirect": 308, "Bad Request": 400, Unauthorized: 401, "Payment Required": 402, Forbidden: 403, "Not Found": 404, "Method Not Allowed": 405, "Not Acceptable": 406, "Proxy Authentication Required": 407, "Request Timeout": 408, Conflict: 409, Gone: 410, "Length Required": 411, "Precondition Failed": 412, "Payload Too Large": 413, "URI Too Long": 414, "Unsupported Media Type": 415, "Range Not Satisfiable": 416, "Expectation Failed": 417, "I'm a teapot": 418, "Misdirected Request": 421, "Unprocessable Content": 422, Locked: 423, "Failed Dependency": 424, "Too Early": 425, "Upgrade Required": 426, "Precondition Required": 428, "Too Many Requests": 429, "Request Header Fields Too Large": 431, "Unavailable For Legal Reasons": 451, "Internal Server Error": 500, "Not Implemented": 501, "Bad Gateway": 502, "Service Unavailable": 503, "Gateway Timeout": 504, "HTTP Version Not Supported": 505, "Variant Also Negotiates": 506, "Insufficient Storage": 507, "Loop Detected": 508, "Not Extended": 510, "Network Authentication Required": 511 };
var E$ = async ($, X) => {
  if (typeof $ !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (X === null)
    throw new TypeError("Secret key must be provided.");
  const J = new TextEncoder, Y = await crypto.subtle.importKey("raw", J.encode(X), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), Z = await crypto.subtle.sign("HMAC", Y, J.encode($)), W = Array.from(new Uint8Array(Z)), Q = btoa(String.fromCharCode(...W));
  return `${$}.${Q.replace(/=+$/, "")}`;
};
var VJ = async ($, X) => {
  if (typeof $ !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (X === null)
    throw new TypeError("Secret key must be provided.");
  const J = $.slice(0, $.lastIndexOf("."));
  return await E$(J, X) === $ ? J : false;
};
var fJ = ($, X, J = X) => {
  for (let [Y, Z] of Object.entries(X ?? {})) {
    if (kJ.includes(Y) || !(Y in $))
      continue;
    if (typeof $[Y] === "function")
      $[Y](Z);
    else if (typeof $[Y] === "object")
      fJ($[Y], Z, J);
  }
};
var DX = ($) => !Number.isNaN(parseInt($));
var yZ = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : undefined;
var I$ = Symbol("ElysiaErrorCode");
var r1 = Symbol("ElysiaResponse");
var U6 = (yZ?.NODE_ENV ?? yZ?.ENV) === "production";
class NX extends Error {
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor($) {
    super($ ?? "INTERNAL_SERVER_ERROR");
  }
}

class T8 extends Error {
  code = "NOT_FOUND";
  status = 404;
  constructor($) {
    super($ ?? "NOT_FOUND");
  }
}
class z6 extends Error {
  $;
  code = "INVALID_COOKIE_SIGNATURE";
  status = 400;
  constructor($, X) {
    super(X ?? `"${$}" has invalid cookie signature`);
    this.key = $;
  }
}

class P0 extends Error {
  $;
  X;
  J;
  code = "VALIDATION";
  status = 400;
  constructor($, X, J) {
    const Y = U6 ? undefined : ("Errors" in X) ? X.Errors(J).First() : j0.Errors(X, J).First(), Z = Y?.schema.error ? typeof Y.schema.error === "function" ? Y.schema.error($, X, J) : Y.schema.error : undefined, W = Y?.path?.slice(1) || "root";
    let Q = "";
    if (Z)
      Q = typeof Z === "object" ? JSON.stringify(Z) : Z + "";
    else if (U6)
      Q = JSON.stringify({ type: $, message: Y?.message });
    else
      Q = JSON.stringify({ type: $, at: W, message: Y?.message, expected: j0.Create(X.schema), found: J, errors: [...X.Errors(J)] }, null, 2);
    super(Q);
    this.type = $;
    this.validator = X;
    this.value = J;
    Object.setPrototypeOf(this, P0.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  static simplifyModel($) {
    const X = "schema" in $ ? $.schema : $;
    try {
      return j0.Create(X);
    } catch {
      return X;
    }
  }
  get model() {
    return P0.simplifyModel(this.validator);
  }
  toResponse($) {
    return new Response(this.message, { status: 400, headers: $ });
  }
}
var yJ = { open($) {
  $.data.open?.($);
}, message($, X) {
  $.data.message?.($, X);
}, drain($) {
  $.data.drain?.($);
}, close($, X, J) {
  $.data.close?.($, X, J);
} };

class x$ {
  $;
  X;
  get id() {
    return this.raw.data.id;
  }
  set id($) {
    this.raw.data.id = $;
  }
  validator;
  constructor($, X) {
    this.raw = $;
    this.data = X;
    this.validator = $.data.validator, this.id = $.data.id ?? t3(Number.MAX_SAFE_INTEGER);
  }
  get publish() {
    return ($, X = undefined, J) => {
      if (this.validator?.Check(X) === false)
        throw new P0("message", this.validator, X);
      if (typeof X === "object")
        X = JSON.stringify(X);
      return this.raw.publish($, X, J), this;
    };
  }
  get send() {
    return ($) => {
      if (this.validator?.Check($) === false)
        throw new P0("message", this.validator, $);
      if (Buffer.isBuffer($))
        return this.raw.send($), this;
      if (typeof $ === "object")
        $ = JSON.stringify($);
      return this.raw.send($), this;
    };
  }
  get subscribe() {
    return ($) => {
      return this.raw.subscribe($), this;
    };
  }
  get unsubscribe() {
    return ($) => {
      return this.raw.unsubscribe($), this;
    };
  }
  get cork() {
    return ($) => {
      return this.raw.cork($), this;
    };
  }
  get close() {
    return () => {
      return this.raw.close(), this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
}
var X4 = A6(hJ(), 1);
var J4 = A6(vJ(), 1);
var Yq = new Headers().toJSON;
var Y4 = new RegExp(" (\\w+) = context", "g");
var Z4 = { value: 0 };
var W4 = ({ hasTrace: $, hasTraceSet: X = false, addFn: J, condition: Y = {} }) => {
  if ($)
    return J("\nconst reporter = getReporter()\n"), (Z, { name: W, attribute: Q = "", unit: z = 0 } = {}) => {
      const q = Z.indexOf("."), U = q === -1;
      if (Z !== "request" && Z !== "response" && !Y[U ? Z : Z.slice(0, q)])
        return () => {
          if (X && Z === "afterHandle")
            J("\nawait traceDone\n");
        };
      if (U)
        W ||= Z;
      else
        W ||= "anonymous";
      J("\n" + `reporter.emit('event', {
					id,
					event: '${Z}',
					type: 'begin',
					name: '${W}',
					time: performance.now(),
					${U ? `unit: ${z},` : ""}
					${Q}
				})`.replace(/(\t| |\n)/g, "") + "\n");
      let A = false;
      return () => {
        if (A)
          return;
        if (A = true, J("\n" + `reporter.emit('event', {
							id,
							event: '${Z}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, "") + "\n"), X && Z === "afterHandle")
          J("\nawait traceDone\n");
      };
    };
  else
    return () => () => {
    };
};
var G6 = ($) => {
  const X = $.indexOf(")");
  if ($.charCodeAt(X + 2) === 61 && $.charCodeAt(X + 5) !== 123)
    return true;
  return $.includes("return");
};
var Zq = ($, { injectResponse: X = "" } = {}) => ({ composeValidation: (J, Y = `c.${J}`) => $ ? `c.set.status = 400; throw new ValidationError(
'${J}',
${J},
${Y}
)` : `c.set.status = 400; return new ValidationError(
	'${J}',
	${J},
	${Y}
).toResponse(c.set.headers)`, composeResponseValidation: (J = "r") => {
  const Y = $ ? `throw new ValidationError(
'response',
response[c.set.status],
${J}
)` : `return new ValidationError(
'response',
response[c.set.status],
${J}
).toResponse(c.set.headers)`;
  return `\n${X}
		if(!(${J} instanceof Response) && response[c.set.status]?.Check(${J}) === false) {
	if(!(response instanceof Error))
		${Y}
}\n`;
} });
var I0 = ($, X) => {
  if (X.startsWith("[object "))
    return false;
  if (X = X.trimStart(), X = X.replaceAll(/^async /g, ""), /^(\w+)\(/g.test(X))
    X = X.slice(X.indexOf("("));
  const J = X.charCodeAt(0) === 40 || X.startsWith("function") ? X.slice(X.indexOf("(") + 1, X.indexOf(")")) : X.slice(0, X.indexOf("=") - 1);
  if (J === "")
    return false;
  const Y = J.charCodeAt(0) === 123 ? J.indexOf("...") : -1;
  if (J.charCodeAt(0) === 123) {
    if (J.includes($))
      return true;
    if (Y === -1)
      return false;
  }
  if (X.match(new RegExp(`${J}(.${$}|\\["${$}"\\])`)))
    return true;
  const Z = Y !== -1 ? J.slice(Y + 3, J.indexOf(" ", Y + 3)) : undefined;
  if (X.match(new RegExp(`${Z}(.${$}|\\["${$}"\\])`)))
    return true;
  const W = [J];
  if (Z)
    W.push(Z);
  for (let z of X.matchAll(Y4))
    W.push(z[1]);
  const Q = new RegExp(`{.*?} = (${W.join("|")})`, "g");
  for (let [z] of X.matchAll(Q))
    if (z.includes(`{ ${$}`) || z.includes(`, ${$}`))
      return true;
  return false;
};
var H6 = ($) => {
  if ($ = $.trimStart(), $.startsWith("[object"))
    return false;
  if ($ = $.replaceAll(/^async /g, ""), /^(\w+)\(/g.test($))
    $ = $.slice($.indexOf("("));
  const X = $.charCodeAt(0) === 40 || $.startsWith("function") ? $.slice($.indexOf("(") + 1, $.indexOf(")")) : $.slice(0, $.indexOf("=") - 1);
  if (X === "")
    return false;
  const J = X.charCodeAt(0) === 123 ? X.indexOf("...") : -1, Y = J !== -1 ? X.slice(J + 3, X.indexOf(" ", J + 3)) : undefined, Z = [X];
  if (Y)
    Z.push(Y);
  for (let Q of $.matchAll(Y4))
    Z.push(Q[1]);
  for (let Q of Z)
    if (new RegExp(`\\b\\w+\\([^)]*\\b${Q}\\b[^)]*\\)`).test($))
      return true;
  const W = new RegExp(`{.*?} = (${Z.join("|")})`, "g");
  for (let [Q] of $.matchAll(W))
    if (new RegExp(`\\b\\w+\\([^)]*\\b${Q}\\b[^)]*\\)`).test($))
      return true;
  return false;
};
var k$ = Symbol.for("TypeBox.Kind");
var OX = ($, X) => {
  if (!X)
    return;
  if (k$ in X && X[k$] === $)
    return true;
  if (X.type === "object") {
    const J = X.properties;
    for (let Y of Object.keys(J)) {
      const Z = J[Y];
      if (Z.type === "object") {
        if (OX($, Z))
          return true;
      } else if (Z.anyOf) {
        for (let W = 0;W < Z.anyOf.length; W++)
          if (OX($, Z.anyOf[W]))
            return true;
      }
      if (k$ in Z && Z[k$] === $)
        return true;
    }
    return false;
  }
  return X.properties && k$ in X.properties && X.properties[k$] === $;
};
var f8 = ($, X) => {
  if (!X)
    return;
  if (X.type === "object") {
    const J = X.properties;
    if (!J)
      return false;
    for (let Y of Object.keys(J)) {
      const Z = J[Y];
      if ($ in Z)
        return true;
      if (Z.type === "object") {
        if (f8($, Z))
          return true;
      } else if (Z.anyOf) {
        for (let W = 0;W < Z.anyOf.length; W++)
          if (f8($, Z.anyOf[W]))
            return true;
      }
    }
    return false;
  }
  return $ in X;
};
var mJ = Symbol.for("TypeBox.Transform");
var y8 = ($) => {
  if (!$)
    return;
  if ($.type === "object" && $.properties) {
    const X = $.properties;
    for (let J of Object.keys(X)) {
      const Y = X[J];
      if (Y.type === "object") {
        if (y8(Y))
          return true;
      } else if (Y.anyOf) {
        for (let W = 0;W < Y.anyOf.length; W++)
          if (y8(Y.anyOf[W]))
            return true;
      }
      if (mJ in Y)
        return true;
    }
    return false;
  }
  return mJ in $ || $.properties && mJ in $.properties;
};
var Wq = ($) => {
  if (!$)
    return;
  const X = $?.schema;
  if (X && "anyOf" in X) {
    let J = false;
    const Y = X.anyOf[0].type;
    for (let Z of X.anyOf)
      if (Z.type !== Y) {
        J = true;
        break;
      }
    if (!J)
      return Y;
  }
  return $.schema?.type;
};
var Qq = /(?:return|=>) \S+\(/g;
var d0 = ($) => {
  if ($.constructor.name === "AsyncFunction")
    return true;
  const X = $.toString();
  if (X.includes("=> response.clone("))
    return false;
  return !!X.match(Qq);
};
var zq = ($) => {
  if (!$.includes("query: {") || $.includes("query,") || $.includes("query }"))
    return false;
  const X = $.indexOf("query: {");
  return $ = $.slice(X + 9), $ = $.slice(0, $.indexOf("}")), $.split(",").map((J) => {
    const Y = J.indexOf(":");
    if (Y === -1)
      return J.trim();
    return J.slice(0, Y).trim();
  });
};
var Q4 = ({ path: $, method: X, hooks: J, validator: Y, handler: Z, handleError: W, definitions: Q, schema: z, onRequest: q, config: U, getReporter: A, setHeader: O }) => {
  const T = U.forceErrorEncapsulation || J.error.length > 0 || typeof Bun === "undefined" || J.onResponse.length > 0 || !!J.trace.length, E = typeof Z === "function", _ = E ? "handler(c)" : "handler", x = J.onResponse.length ? `\n;(async () => {${J.onResponse.map((S, L) => `await res${L}(c)`).join(";")}})();\n` : "", P = J.trace.map((S) => S.toString());
  let j = false;
  if (E && H6(Z.toString()))
    j = true;
  if (!j)
    for (let [S, L] of Object.entries(J)) {
      if (!Array.isArray(L) || !L.length || !["parse", "transform", "beforeHandle", "afterHandle", "onResponse"].includes(S))
        continue;
      for (let b of L) {
        if (typeof b !== "function")
          continue;
        if (H6(b.toString())) {
          j = true;
          break;
        }
      }
      if (j)
        break;
    }
  const F = { parse: P.some((S) => I0("parse", S)), transform: P.some((S) => I0("transform", S)), handle: P.some((S) => I0("handle", S)), beforeHandle: P.some((S) => I0("beforeHandle", S)), afterHandle: P.some((S) => I0("afterHandle", S)), error: T || P.some((S) => I0("error", S)) }, v = J.trace.length > 0;
  let D = "";
  const h0 = Y || X !== "GET" && X !== "HEAD" ? [Z, ...J.transform, ...J.beforeHandle, ...J.afterHandle, ...J.mapResponse].map((S) => typeof S === "function" ? S.toString() : `${S}`) : [], U8 = X !== "GET" && X !== "HEAD" && (j || J.type !== "none" && (!!Y.body || !!J.type || h0.some((S) => I0("body", S)))), g$ = j || Y.headers || h0.some((S) => I0("headers", S)) || O && Object.keys(O).length, v8 = j || !!Y.cookie || h0.some((S) => I0("cookie", S)), K0 = Y?.cookie?.schema;
  let f1 = "";
  if (K0?.sign) {
    if (!K0.secrets)
      throw new Error(`t.Cookie required secret which is not set in (${X}) ${$}.`);
    const S = !K0.secrets ? undefined : typeof K0.secrets === "string" ? K0.secrets : K0.secrets[0];
    if (f1 += `const _setCookie = c.set.cookie
		if(_setCookie) {`, K0.sign === true)
      f1 += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${S}')
			}`;
    else
      for (let L of K0.sign)
        f1 += `if(_setCookie['${L}']?.value) { c.set.cookie['${L}'].value = await signCookie(_setCookie['${L}'].value, '${S}') }\n`;
    f1 += "}\n";
  }
  const { composeValidation: w8, composeResponseValidation: p8 } = Zq(T);
  if (g$)
    D += Yq ? "c.headers = c.request.headers.toJSON()\n" : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  if (v8) {
    const S = (b, s) => {
      const B0 = K0?.[b] ?? s;
      if (!B0)
        return typeof s === "string" ? `${b}: "${s}",` : `${b}: ${s},`;
      if (typeof B0 === "string")
        return `${b}: '${B0}',`;
      if (B0 instanceof Date)
        return `${b}: new Date(${B0.getTime()}),`;
      return `${b}: ${B0},`;
    }, L = K0 ? `{
			secret: ${K0.secrets !== undefined ? typeof K0.secrets === "string" ? `'${K0.secrets}'` : "[" + K0.secrets.reduce((b, s) => b + `'${s}',`, "") + "]" : "undefined"},
			sign: ${K0.sign === true ? true : K0.sign !== undefined ? "[" + K0.sign.reduce((b, s) => b + `'${s}',`, "") + "]" : "undefined"},
			${S("domain")}
			${S("expires")}
			${S("httpOnly")}
			${S("maxAge")}
			${S("path", "/")}
			${S("priority")}
			${S("sameSite")}
			${S("secure")}
		}` : "undefined";
    if (g$)
      D += `\nc.cookie = await parseCookie(c.set, c.headers.cookie, ${L})\n`;
    else
      D += `\nc.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${L})\n`;
  }
  if (j || Y.query || h0.some((S) => I0("query", S))) {
    let S = [], L = false;
    if (Y.query && Y.query.schema.type === "object")
      S = Object.keys(Y.query.schema.properties);
    else
      for (let b of h0) {
        const s = zq(b);
        if (!s) {
          L = true;
          continue;
        }
        for (let B0 of s)
          if (S.indexOf(B0) === -1)
            S.push(B0);
      }
    if (!L && S.length)
      D += `if(c.qi !== -1) {
				const url = decodeURIComponent(c.request.url.slice(c.qi + 1))
				let memory = 0

				${S.map((b, s) => `
						memory = url.indexOf('${b}=')

						const a${s} = memory === -1 ? undefined : url.slice(memory = memory + ${b.length + 1}, (memory = url.indexOf('&', memory)) === -1 ? undefined : memory)`).join("\n")}

				c.query = {
					${S.map((b, s) => `${b}: a${s}`).join(", ")}
				}
			} else {
				c.query = {}
			}`;
    else
      D += "c.query = c.qi !== -1 ? parseQuery(decodeURIComponent(c.request.url.slice(c.qi + 1))) : {}";
  }
  const h8 = J.trace.map((S) => S.toString()).some((S) => I0("set", S) || H6(S));
  j || J.trace.some((S) => I0("set", S.toString()));
  const m8 = O && Object.keys(O).length || h8 || v8 || h0.some((S) => I0("set", S)) || q.some((S) => I0("set", S.toString()));
  if (v)
    D += "\nconst id = c.$$requestId\n";
  const D0 = W4({ hasTrace: v, hasTraceSet: h8, condition: F, addFn: (S) => {
    D += S;
  } });
  if (D += T ? "\n try {\n" : "", h8) {
    D += "\nconst traceDone = Promise.all([";
    for (let S = 0;S < J.trace.length; S++)
      D += `new Promise(r => { reporter.once(\`res\${id}.${S}\`, r) }),`;
    D += "])\n";
  }
  const O1 = typeof Z === "function" && d0(Z), L0 = v8 || U8 || h8 || O1 || !!J.mapResponse.length || J.parse.length > 0 || J.afterHandle.some(d0) || J.beforeHandle.some(d0) || J.transform.some(d0), B1 = D0("parse", { unit: J.parse.length });
  if (U8) {
    const S = Wq(Y?.body);
    if (J.type && !Array.isArray(J.type)) {
      if (J.type)
        switch (J.type) {
          case "json":
          case "application/json":
            D += "c.body = await c.request.json()\n";
            break;
          case "text":
          case "text/plain":
            D += "c.body = await c.request.text()\n";
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            D += "c.body = parseQuery(await c.request.text())\n";
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            D += "c.body = await c.request.arrayBuffer()\n";
            break;
          case "formdata":
          case "multipart/form-data":
            D += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}\n`;
            break;
        }
      if (J.parse.length)
        D += "}}";
    } else {
      const b = (() => {
        if (J.parse.length && S && !Array.isArray(J.type)) {
          const s = Y?.body?.schema;
          switch (S) {
            case "object":
              if (OX("File", s) || OX("Files", s))
                return `c.body = {}

								const form = await c.request.formData()
								for (const key of form.keys()) {
									if (c.body[key])
										continue

									const value = form.getAll(key)
									if (value.length === 1)
										c.body[key] = value[0]
									else c.body[key] = value
								}`;
              break;
            default:
              break;
          }
        }
      })();
      if (b)
        D += b;
      else {
        if (D += "\n", D += g$ ? "let contentType = c.headers['content-type']" : "let contentType = c.request.headers.get('content-type')", D += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)\n`, J.parse.length) {
          D += "let used = false\n";
          const s = D0("parse", { unit: J.parse.length });
          for (let B0 = 0;B0 < J.parse.length; B0++) {
            const i8 = D0("parse.unit", { name: J.parse[B0].name }), w0 = `bo${B0}`;
            if (B0 !== 0)
              D += "if(!used) {\n";
            if (D += `let ${w0} = parse[${B0}](c, contentType)\n`, D += `if(${w0} instanceof Promise) ${w0} = await ${w0}\n`, D += `if(${w0} !== undefined) { c.body = ${w0}; used = true }\n`, i8(), B0 !== 0)
              D += "}";
          }
          s();
        }
        if (J.parse.length)
          D += "if (!used)";
        D += `
				switch (contentType) {
					case 'application/json':
						c.body = await c.request.json()
						break

					case 'text/plain':
						c.body = await c.request.text()
						break

					case 'application/x-www-form-urlencoded':
						c.body = parseQuery(await c.request.text())
						break

					case 'application/octet-stream':
						c.body = await c.request.arrayBuffer();
						break

					case 'multipart/form-data':
						c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}

						break
					}\n`, D += "}\n";
      }
    }
    D += "\n";
  }
  if (B1(), J?.transform) {
    const S = D0("transform", { unit: J.transform.length });
    for (let L = 0;L < J.transform.length; L++) {
      const b = J.transform[L], s = D0("transform.unit", { name: b.name });
      if (b.$elysia === "derive")
        D += d0(b) ? `Object.assign(c, await transform[${L}](c));` : `Object.assign(c, transform[${L}](c));`;
      else
        D += d0(b) ? `await transform[${L}](c);` : `transform[${L}](c);`;
      s();
    }
    S();
  }
  if (Y) {
    if (D += "\n", Y.headers) {
      if (f8("default", Y.headers.params))
        for (let [S, L] of Object.entries(j0.Default(Y.headers.schema, {}))) {
          const b = typeof L === "object" ? JSON.stringify(L) : `'${L}'`;
          if (b)
            D += `c.headers['${S}'] ??= ${b}\n`;
        }
      if (D += `if(headers.Check(c.headers) === false) {
				${w8("headers")}
			}`, y8(Y.headers.schema))
        D += "\nc.headers = headers.Decode(c.headers)\n";
    }
    if (Y.params) {
      if (f8("default", Y.params.schema))
        for (let [S, L] of Object.entries(j0.Default(Y.params.schema, {}))) {
          const b = typeof L === "object" ? JSON.stringify(L) : `'${L}'`;
          if (b)
            D += `c.params['${S}'] ??= ${b}\n`;
        }
      if (D += `if(params.Check(c.params) === false) {
				${w8("params")}
			}`, y8(Y.params.schema))
        D += "\nc.params = params.Decode(c.params)\n";
    }
    if (Y.query) {
      if (f8("default", Y.query.schema))
        for (let [S, L] of Object.entries(j0.Default(Y.query.schema, {}))) {
          const b = typeof L === "object" ? JSON.stringify(L) : `'${L}'`;
          if (b)
            D += `c.query['${S}'] ??= ${b}\n`;
        }
      if (D += `if(query.Check(c.query) === false) {
				${w8("query")}
			}`, y8(Y.query.schema))
        D += "\nc.query = query.Decode(Object.assign({}, c.query))\n";
    }
    if (Y.body) {
      if (f8("default", Y.body.schema))
        D += `if(body.Check(c.body) === false) {
    				c.body = Object.assign(${JSON.stringify(j0.Default(Y.body.schema, null) ?? {})}, c.body)

    				if(body.Check(c.query) === false) {
        				${w8("body")}
     			}
            }`;
      else
        D += `if(body.Check(c.body) === false) {
			${w8("body")}
		}`;
      if (y8(Y.body.schema))
        D += "\nc.body = body.Decode(c.body)\n";
    }
    if (T1(Y.cookie?.schema.properties ?? {})) {
      if (D += `const cookieValue = {}
    			for(const [key, value] of Object.entries(c.cookie))
    				cookieValue[key] = value.value\n`, f8("default", Y.cookie.schema))
        for (let [S, L] of Object.entries(j0.Default(Y.cookie.schema, {})))
          D += `cookieValue['${S}'] = ${typeof L === "object" ? JSON.stringify(L) : L}\n`;
      if (D += `if(cookie.Check(cookieValue) === false) {
				${w8("cookie", "cookieValue")}
			}`, y8(Y.cookie.schema))
        D += "\nc.cookie = params.Decode(c.cookie)\n";
    }
  }
  if (J?.beforeHandle) {
    const S = D0("beforeHandle", { unit: J.beforeHandle.length });
    for (let L = 0;L < J.beforeHandle.length; L++) {
      const b = J.beforeHandle[L], s = D0("beforeHandle.unit", { name: b.name }), B0 = G6(b.toString());
      if (b.$elysia === "resolve")
        D += d0(b) ? `Object.assign(c, await beforeHandle[${L}](c));` : `Object.assign(c, beforeHandle[${L}](c));`;
      else if (!B0)
        D += d0(b) ? `await beforeHandle[${L}](c);\n` : `beforeHandle[${L}](c);\n`, s();
      else {
        D += d0(b) ? `be = await beforeHandle[${L}](c);\n` : `be = beforeHandle[${L}](c);\n`, s(), D += "if(be !== undefined) {\n";
        const i8 = D0("afterHandle", { unit: J.transform.length });
        if (J.afterHandle) {
          D0("handle", { name: E ? Z.name : undefined })();
          for (let w0 = 0;w0 < J.afterHandle.length; w0++) {
            const M = G6(J.afterHandle[w0].toString()), K = D0("afterHandle.unit", { name: J.afterHandle[w0].name });
            if (D += "c.response = be\n", !M)
              D += d0(J.afterHandle[w0]) ? `await afterHandle[${w0}](c, be)\n` : `afterHandle[${w0}](c, be)\n`;
            else
              D += d0(J.afterHandle[w0]) ? `af = await afterHandle[${w0}](c)\n` : `af = afterHandle[${w0}](c)\n`, D += "if(af !== undefined) { c.response = be = af }\n";
            K();
          }
        }
        if (i8(), Y.response)
          D += p8("be");
        if (J.mapResponse.length) {
          D += "c.response = be";
          for (let w0 = 0;w0 < J.mapResponse.length; w0++)
            D += `\nif(mr === undefined) {
							mr = onMapResponse[${w0}](c)
							if(mr instanceof Promise) mr = await mr
							if(mr !== undefined) c.response = mr
						}\n`;
        }
        D += f1, D += "return mapEarlyResponse(be, c.set)}\n";
      }
    }
    S();
  }
  if (J?.afterHandle.length) {
    const S = D0("handle", { name: E ? Z.name : undefined });
    if (J.afterHandle.length)
      D += O1 ? `let r = c.response = await ${_};\n` : `let r = c.response = ${_};\n`;
    else
      D += O1 ? `let r = await ${_};\n` : `let r = ${_};\n`;
    S();
    const L = D0("afterHandle", { unit: J.afterHandle.length });
    for (let b = 0;b < J.afterHandle.length; b++) {
      const s = G6(J.afterHandle[b].toString()), B0 = D0("afterHandle.unit", { name: J.afterHandle[b].name });
      if (!s)
        D += d0(J.afterHandle[b]) ? `await afterHandle[${b}](c)\n` : `afterHandle[${b}](c)\n`, B0();
      else if (D += d0(J.afterHandle[b]) ? `af = await afterHandle[${b}](c)\n` : `af = afterHandle[${b}](c)\n`, B0(), Y.response)
        D += "if(af !== undefined) {", L(), D += p8("af"), D += "c.response = af }";
      else
        D += "if(af !== undefined) {", L(), D += "c.response = af}\n";
    }
    if (L(), D += "r = c.response\n", Y.response)
      D += p8();
    if (D += f1, J.mapResponse.length)
      for (let b = 0;b < J.mapResponse.length; b++)
        D += `\nmr = onMapResponse[${b}](c)
				if(mr instanceof Promise) mr = await mr
				if(mr !== undefined) c.response = mr\n`;
    if (m8)
      D += "return mapResponse(r, c.set)\n";
    else
      D += "return mapCompactResponse(r)\n";
  } else {
    const S = D0("handle", { name: E ? Z.name : undefined });
    if (Y.response || J.mapResponse.length) {
      if (D += O1 ? `let r = await ${_};\n` : `let r = ${_};\n`, S(), Y.response)
        D += p8();
      if (D0("afterHandle")(), J.mapResponse.length) {
        D += "c.response = r";
        for (let L = 0;L < J.mapResponse.length; L++)
          D += `\nif(mr === undefined) { 
						mr = onMapResponse[${L}](c)
						if(mr instanceof Promise) mr = await mr
    					if(mr !== undefined) r = c.response = mr
					}\n`;
      }
      if (D += f1, Z instanceof Response)
        D += `return ${_}.clone()\n`;
      else if (m8)
        D += "return mapResponse(r, c.set)\n";
      else
        D += "return mapCompactResponse(r)\n";
    } else if (F.handle || v8) {
      if (D += O1 ? `let r = await ${_};\n` : `let r = ${_};\n`, S(), D0("afterHandle")(), J.mapResponse.length) {
        D += "c.response = r";
        for (let L = 0;L < J.mapResponse.length; L++)
          D += `\nif(mr === undefined) {
							mr = onMapResponse[${L}](c)
							if(mr instanceof Promise) mr = await mr
    						if(mr !== undefined) r = c.response = mr
						}\n`;
      }
      if (D += f1, m8)
        D += "return mapResponse(r, c.set)\n";
      else
        D += "return mapCompactResponse(r)\n";
    } else {
      S();
      const L = O1 ? `await ${_}` : _;
      if (D0("afterHandle")(), Z instanceof Response)
        D += `return ${_}.clone()\n`;
      else if (m8)
        D += `return mapResponse(${L}, c.set)\n`;
      else
        D += `return mapCompactResponse(${L})\n`;
    }
  }
  if (T || x) {
    if (D += `
} catch(error) {`, !L0)
      D += "return (async () => {";
    D += `const set = c.set

		if (!set.status || set.status < 300) set.status = error?.status || 500
	`;
    const S = D0("error", { unit: J.error.length });
    if (J.error.length) {
      D += `
				c.error = error
				c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
			`;
      for (let L = 0;L < J.error.length; L++) {
        const b = `er${L}`, s = D0("error.unit", { name: J.error[L].name });
        if (D += `\nlet ${b} = handleErrors[${L}](c)\n`, d0(J.error[L]))
          D += `if (${b} instanceof Promise) ${b} = await ${b}\n`;
        s(), D += `${b} = mapEarlyResponse(${b}, set)\n`, D += `if (${b}) {`, D += `return ${b} }\n`;
      }
    }
    if (S(), D += "return handleError(c, error)\n\n", !L0)
      D += "})()";
    if (D += "}", x || v) {
      D += " finally { ";
      const L = D0("response", { unit: J.onResponse.length });
      D += x, L(), D += "}";
    }
  }
  return D = `const {
		handler,
		handleError,
		hooks: {
			transform,
			resolve,
			beforeHandle,
			afterHandle,
			mapResponse: onMapResponse,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError
		},
		schema,
		definitions,
		ERROR_CODE,
		getReporter,
		requestId,
		parseCookie,
		signCookie,
		decodeURIComponent
	} = hooks

	${J.onResponse.length ? `const ${J.onResponse.map((S, L) => `res${L} = onResponse[${L}]`).join(",")}` : ""}

	return ${L0 ? "async" : ""} function handle(c) {
		${J.beforeHandle.length ? "let be" : ""}
		${J.afterHandle.length ? "let af" : ""}
		${J.mapResponse.length ? "let mr" : ""}

		${z && Q ? "c.schema = schema; c.defs = definitions;" : ""}
		${D}
	}`, Function("hooks", D)({ handler: Z, hooks: J, validator: Y, handleError: W, utils: { mapResponse: s1, mapCompactResponse: b8, mapEarlyResponse: N1, parseQuery: X4.parse }, error: { NotFoundError: T8, ValidationError: P0, InternalServerError: NX }, schema: z, definitions: Q, ERROR_CODE: I$, getReporter: A, requestId: Z4, parseCookie: HX, signCookie: E$, decodeURIComponent: J4.default });
};
var iJ = ($) => {
  let X = "", J = "";
  for (let _ of Object.keys($.decorators))
    X += `,${_}: app.decorators.${_}`;
  const { router: Y, staticRouter: Z } = $, W = $.event.trace.length > 0, Q = `
	const route = router.find(request.method, path) ${Y.root.ALL ? '?? router.find("ALL", path)' : ""}
	if (route === null)
		return ${$.event.error.length ? "app.handleError(ctx, notFound)" : $.event.request.length ? `new Response(error404Message, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})` : "error404.clone()"}

	ctx.params = route.params

	return route.store(ctx)`;
  let z = "";
  for (let [_, { code: x, all: P }] of Object.entries(Z.map))
    z += `case '${_}':\nswitch(request.method) {\n${x}\n${P ?? "default: break map"}}\n\n`;
  const q = $.event.request.some(d0);
  if (J += `const {
		app,
		app: { store, router, staticRouter, wsRouter },
		mapEarlyResponse,
		NotFoundError,
		requestId,
		getReporter,
		handleError
	} = data

	const notFound = new NotFoundError()

	${$.event.request.length ? "const onRequest = app.event.request" : ""}
	${Z.variables}
	${$.event.error.length ? "" : `
	const error404Message = notFound.message.toString()
	const error404 = new Response(error404Message, { status: 404 });
	`}

	return ${q ? "async" : ""} function map(request) {\n`, $.event.request.length)
    J += "let re";
  const U = $.event.trace.map((_) => _.toString()), A = W4({ hasTrace: W, hasTraceSet: $.event.trace.some((_) => {
    const x = _.toString();
    return I0("set", x) || H6(x);
  }), condition: { request: U.some((_) => I0("request", _) || H6(_)) }, addFn: (_) => {
    J += _;
  } });
  if ($.event.request.length) {
    J += `
			${W ? "const id = +requestId.value++" : ""}

			const ctx = {
				request,
				store,
				set: {
					headers: ${Object.keys($.setHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
					status: 200
				}
				${W ? ",$$requestId: +id" : ""}
				${X}
			}
		`;
    const _ = A("request", { attribute: "ctx", unit: $.event.request.length });
    J += "\n try {\n";
    for (let x = 0;x < $.event.request.length; x++) {
      const P = $.event.request[x], j = G6(P.toString()), F = d0(P), v = A("request.unit", { name: $.event.request[x].name });
      if (j) {
        if (J += `re = mapEarlyResponse(
					${F ? "await" : ""} onRequest[${x}](ctx),
					ctx.set
				)\n`, v(), j)
          J += "if(re !== undefined) return re\n";
      } else
        J += `${F ? "await" : ""} onRequest[${x}](ctx)\n`, v();
    }
    J += `} catch (error) {
			return app.handleError(ctx, error)
		}`, _(), J += `
		const url = request.url
		const s = url.indexOf('/', 11)
		const qi = ctx.qi = url.indexOf('?', s + 1)
		const path = ctx.path = url.substring(s, qi === -1 ? undefined : qi)`;
  } else
    J += `
		const url = request.url
		const s = url.indexOf('/', 11)
		const qi = url.indexOf('?', s + 1)
		const path = url.substring(s, qi === -1 ? undefined : qi)
		${W ? "const id = +requestId.value++" : ""}
		const ctx = {
			request,
			store,
			qi,
			path,
			set: {
				headers: ${Object.keys($.setHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
				status: 200
			}
			${W ? ",$$requestId: id" : ""}
			${X}
		}`, A("request", { unit: $.event.request.length, attribute: U.some((_) => I0("context", _)) || U.some((_) => I0("store", _)) || U.some((_) => I0("set", _)) ? "ctx" : "" })();
  const { wsPaths: O, wsRouter: T } = $;
  if (Object.keys(O).length || T.history.length) {
    J += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (let [_, x] of Object.entries(O))
      J += `
					case '${_}':
						if(request.headers.get('upgrade') === 'websocket')
							return st${x}(ctx)

						break`;
    J += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = wsRouter.find('ws', path)

						if(route) {
							ctx.params = route.params

							return route.store(ctx)
						}
					}

					break
			}
		}\n`;
  }
  J += `
		map: switch(path) {
			${z}

			default:
				break
		}

		${Q}
	}`;
  const E = uJ($);
  return $.handleError = E, Function("data", J)({ app: $, mapEarlyResponse: N1, NotFoundError: T8, getReporter: () => $.reporter, requestId: Z4, handleError: E });
};
var uJ = ($) => {
  let X = `const {
		app: { event: { error: onError, onResponse: res } },
		mapResponse,
		ERROR_CODE,
		ELYSIA_RESPONSE
	} = inject

	return ${$.event.error.find(d0) ? "async" : ""} function(context, error) {
		let r

		const { set } = context

		context.code = error.code
		context.error = error

		if(error[ELYSIA_RESPONSE]) {
			error.status = error[ELYSIA_RESPONSE]
			error.message = error.response
		}
`;
  for (let J = 0;J < $.event.error.length; J++) {
    const Y = $.event.error[J], Z = `${d0(Y) ? "await " : ""}onError[${J}](context)`;
    if (G6(Y.toString()))
      X += `r = ${Z}; if(r !== undefined) {
				if(r instanceof Response) return r

				if(r[ELYSIA_RESPONSE]) {
					error.status = error[ELYSIA_RESPONSE]
					error.message = error.response
				}
		
				if(set.status === 200) set.status = error.status
				return mapResponse(r, set)
			}\n`;
    else
      X += Z + "\n";
  }
  return X += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
		set.status = error.status ?? 400
		return new Response(
			error.message,
			{ headers: set.headers, status: set.status }
		)
	} else {
		if(error.code && typeof error.status === "number")
			return new Response(
				error.message,
				{ headers: set.headers, status: error.status }
			)

		return mapResponse(error, set)
	}
}`, Function("inject", X)({ app: $, mapResponse: s1, ERROR_CODE: I$, ELYSIA_RESPONSE: r1 });
};
var SX = A6(hJ(), 1);
var cJ = ($) => async (X) => {
  const J = { cookie: {}, status: 200, headers: {} };
  let Y;
  if ($.decorators)
    Y = $.decorators, Y.request = X, Y.set = J, Y.store = $.store;
  else
    Y = { set: J, store: $.store, request: X };
  const Z = X.url, W = Z.indexOf("/", 11), Q = Z.indexOf("?", W + 1), z = Q === -1 ? Z.substring(W) : Z.substring(W, Q);
  try {
    for (let P = 0;P < $.event.request.length; P++) {
      const j = $.event.request[P];
      let F = j(Y);
      if (F instanceof Promise)
        F = await F;
      if (F = N1(F, J), F)
        return F;
    }
    const q = $.dynamicRouter.find(X.method, z) ?? $.dynamicRouter.find("ALL", z);
    if (!q)
      throw new T8;
    const { handle: U, hooks: A, validator: O, content: T } = q.store;
    let E;
    if (X.method !== "GET" && X.method !== "HEAD")
      if (T)
        switch (T) {
          case "application/json":
            E = await X.json();
            break;
          case "text/plain":
            E = await X.text();
            break;
          case "application/x-www-form-urlencoded":
            E = SX.parse(await X.text());
            break;
          case "application/octet-stream":
            E = await X.arrayBuffer();
            break;
          case "multipart/form-data":
            E = {};
            const P = await X.formData();
            for (let j of P.keys()) {
              if (E[j])
                continue;
              const F = P.getAll(j);
              if (F.length === 1)
                E[j] = F[0];
              else
                E[j] = F;
            }
            break;
        }
      else {
        let P = X.headers.get("content-type");
        if (P) {
          const j = P.indexOf(";");
          if (j !== -1)
            P = P.slice(0, j);
          for (let F = 0;F < $.event.parse.length; F++) {
            let v = $.event.parse[F](Y, P);
            if (v instanceof Promise)
              v = await v;
            if (v) {
              E = v;
              break;
            }
          }
          if (E === undefined)
            switch (P) {
              case "application/json":
                E = await X.json();
                break;
              case "text/plain":
                E = await X.text();
                break;
              case "application/x-www-form-urlencoded":
                E = SX.parse(await X.text());
                break;
              case "application/octet-stream":
                E = await X.arrayBuffer();
                break;
              case "multipart/form-data":
                E = {};
                const F = await X.formData();
                for (let v of F.keys()) {
                  if (E[v])
                    continue;
                  const D = F.getAll(v);
                  if (D.length === 1)
                    E[v] = D[0];
                  else
                    E[v] = D;
                }
                break;
            }
        }
      }
    Y.body = E, Y.params = q?.params || undefined, Y.query = Q === -1 ? {} : SX.parse(Z.substring(Q + 1)), Y.headers = {};
    for (let [P, j] of X.headers.entries())
      Y.headers[P] = j;
    const _ = O?.cookie?.schema;
    Y.cookie = await HX(Y.set, Y.headers.cookie, _ ? { secret: _.secrets !== undefined ? typeof _.secrets === "string" ? _.secrets : _.secrets.join(",") : undefined, sign: _.sign === true ? true : _.sign !== undefined ? typeof _.sign === "string" ? _.sign : _.sign.join(",") : undefined } : undefined);
    for (let P = 0;P < A.transform.length; P++) {
      const j = A.transform[P](Y);
      if (A.transform[P].$elysia === "derive")
        if (j instanceof Promise)
          Object.assign(Y, await j);
        else
          Object.assign(Y, j);
      else if (j instanceof Promise)
        await j;
    }
    if (O) {
      if (O.headers) {
        const P = {};
        for (let j in X.headers)
          P[j] = X.headers.get(j);
        if (O.headers.Check(P) === false)
          throw new P0("header", O.headers, P);
      }
      if (O.params?.Check(Y.params) === false)
        throw new P0("params", O.params, Y.params);
      if (O.query?.Check(Y.query) === false)
        throw new P0("query", O.query, Y.query);
      if (O.cookie) {
        const P = {};
        for (let [j, F] of Object.entries(Y.cookie))
          P[j] = F.value;
        if (O.cookie?.Check(P) === false)
          throw new P0("cookie", O.cookie, P);
      }
      if (O.body?.Check(E) === false)
        throw new P0("body", O.body, E);
    }
    for (let P = 0;P < A.beforeHandle.length; P++) {
      let j = A.beforeHandle[P](Y);
      if (j instanceof Promise)
        j = await j;
      if (j !== undefined) {
        Y.response = j;
        for (let v = 0;v < A.afterHandle.length; v++) {
          let D = A.afterHandle[v](Y);
          if (D instanceof Promise)
            D = await D;
          if (D)
            j = D;
        }
        const F = N1(j, Y.set);
        if (F)
          return F;
      }
    }
    let x = U(Y);
    if (x instanceof Promise)
      x = await x;
    if (!A.afterHandle.length) {
      const P = O?.response?.[x.status];
      if (P?.Check(x) === false)
        throw new P0("response", P, x);
    } else {
      Y.response = x;
      for (let P = 0;P < A.afterHandle.length; P++) {
        let j = A.afterHandle[P](Y);
        if (j instanceof Promise)
          j = await j;
        const F = N1(j, Y.set);
        if (F !== undefined) {
          const v = O?.response?.[x.status];
          if (v?.Check(F) === false)
            throw new P0("response", v, F);
          return F;
        }
      }
    }
    if (Y.set.cookie && _?.sign) {
      const P = !_.secrets ? undefined : typeof _.secrets === "string" ? _.secrets : _.secrets[0];
      if (_.sign === true)
        for (let [j, F] of Object.entries(Y.set.cookie))
          Y.set.cookie[j].value = await E$(F.value, "${secret}");
      else
        for (let j of _.sign) {
          if (!(j in _.properties))
            continue;
          if (Y.set.cookie[j]?.value)
            Y.set.cookie[j].value = await E$(Y.set.cookie[j].value, P);
        }
    }
    return s1(x, Y.set);
  } catch (q) {
    if (q.status)
      J.status = q.status;
    return $.handleError(Y, q);
  } finally {
    for (let q of $.event.onResponse)
      await q(Y);
  }
};
var z4 = ($) => async (X, J) => {
  const Y = Object.assign(X, { error: J, code: J.code });
  Y.set = X.set;
  for (let Z = 0;Z < $.event.error.length; Z++) {
    let W = $.event.error[Z](Y);
    if (W instanceof Promise)
      W = await W;
    if (W !== undefined && W !== null)
      return s1(W, X.set);
  }
  return new Response(typeof J.cause === "string" ? J.cause : J.message, { headers: X.set.headers, status: J.status ?? 500 });
};
var W0 = Object.assign({}, qX);
try {
  v1.Format("email", ($) => /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test($)), v1.Format("uuid", ($) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test($)), v1.Format("date", ($) => !Number.isNaN(new Date($).getTime())), v1.Format("date-time", ($) => !Number.isNaN(new Date($).getTime()));
} catch ($) {
}
var q4 = ($) => {
  if (typeof $ === "string")
    switch ($.slice(-1)) {
      case "k":
        return +$.slice(0, $.length - 1) * 1024;
      case "m":
        return +$.slice(0, $.length - 1) * 1048576;
      default:
        return +$;
    }
  return $;
};
var oJ = ($, X) => {
  if (!(X instanceof Blob))
    return false;
  if ($.minSize && X.size < q4($.minSize))
    return false;
  if ($.maxSize && X.size > q4($.maxSize))
    return false;
  if ($.extension)
    if (typeof $.extension === "string") {
      if (!X.type.startsWith($.extension))
        return false;
    } else {
      for (let J = 0;J < $.extension.length; J++)
        if (X.type.startsWith($.extension[J]))
          return true;
      return false;
    }
  return true;
};
var qq = v1.Type("Files", ($, X) => {
  if (!Array.isArray(X))
    return oJ($, X);
  if ($.minItems && X.length < $.minItems)
    return false;
  if ($.maxItems && X.length > $.maxItems)
    return false;
  for (let J = 0;J < X.length; J++)
    if (!oJ($, X[J]))
      return false;
  return true;
});
g0.Set("numeric", ($) => !!$ && !isNaN(+$));
g0.Set("ObjectString", ($) => {
  let X = $.charCodeAt(0);
  if (X === 9 || X === 10 || X === 32)
    X = $.trimStart().charCodeAt(0);
  if (X !== 123 && X !== 91)
    return false;
  try {
    return JSON.parse($), true;
  } catch {
    return false;
  }
});
var d8 = { Numeric: ($) => {
  const X = qX.Number($);
  return W0.Transform(W0.Union([W0.String({ format: "numeric", default: 0 }), W0.Number($)], $)).Decode((J) => {
    const Y = +J;
    if (isNaN(Y))
      return J;
    if ($ && !j0.Check(X, Y))
      throw new P0("property", X, Y);
    return Y;
  }).Encode((J) => J);
}, ObjectString: ($, X) => W0.Transform(W0.Union([W0.String({ format: "ObjectString", default: "" }), W0.Object($, X)], X)).Decode((J) => {
  if (typeof J === "string")
    try {
      return JSON.parse(J);
    } catch {
      return J;
    }
  return J;
}).Encode((J) => JSON.stringify(J)), File: v1.Type("File", oJ), Files: ($ = {}) => W0.Transform(W0.Union([qq($)])).Decode((X) => {
  if (Array.isArray(X))
    return X;
  return [X];
}).Encode((X) => X), Nullable: ($) => W0.Union([W0.Null(), $]), MaybeEmpty: ($) => W0.Union([W0.Null(), W0.Undefined(), $]), Cookie: ($, X) => W0.Object($, X) };
W0.ObjectString = d8.ObjectString;
W0.Numeric = d8.Numeric;
W0.File = ($ = {}) => d8.File({ default: "File", ...$, extension: $?.type, type: "string", format: "binary" });
W0.Files = ($ = {}) => d8.Files({ ...$, elysiaMeta: "Files", default: "Files", extension: $?.type, type: "array", items: { ...$, default: "Files", type: "string", format: "binary" } });
W0.Nullable = ($) => d8.Nullable($);
W0.MaybeEmpty = d8.MaybeEmpty;
W0.Cookie = d8.Cookie;

class M8 {
  config;
  dependencies = {};
  store = {};
  decorators = {};
  definitions = { type: {}, error: {} };
  schema = {};
  macros = [];
  event = { start: [], request: [], parse: [], transform: [], beforeHandle: [], afterHandle: [], mapResponse: [], onResponse: [], trace: [], error: [], stop: [] };
  reporter = new $Y;
  server = null;
  getServer() {
    return this.server;
  }
  validator = null;
  router = new j8;
  wsRouter = new j8;
  routes = [];
  staticRouter = { handlers: [], variables: "", map: {}, all: "" };
  wsPaths = {};
  dynamicRouter = new j8;
  lazyLoadModules = [];
  path = "";
  stack = undefined;
  constructor($) {
    if (this.config = { forceErrorEncapsulation: true, prefix: "", aot: true, strictPath: false, scoped: false, cookie: {}, analytic: false, ...$, seed: $?.seed === undefined ? "" : $?.seed }, $?.analytic && ($?.name || $?.seed !== undefined))
      this.stack = new Error().stack;
  }
  add($, X, J, Y, { allowMeta: Z = false, skipPrefix: W = false } = { allowMeta: false, skipPrefix: false }) {
    if (typeof X === "string")
      X = [X];
    for (let Q of X) {
      if (Q = Q === "" ? Q : Q.charCodeAt(0) === 47 ? Q : `/${Q}`, this.config.prefix && !W)
        Q = this.config.prefix + Q;
      if (Y?.type)
        switch (Y.type) {
          case "text":
            Y.type = "text/plain";
            break;
          case "json":
            Y.type = "application/json";
            break;
          case "formdata":
            Y.type = "multipart/form-data";
            break;
          case "urlencoded":
            Y.type = "application/x-www-form-urlencoded";
            break;
          case "arrayBuffer":
            Y.type = "application/octet-stream";
            break;
          default:
            break;
        }
      const z = this.definitions.type;
      let q = e1(Y?.cookie ?? this.validator?.cookie, { dynamic: !this.config.aot, models: z, additionalProperties: true });
      if (T1(this.config.cookie ?? {}))
        if (q)
          q.schema = TZ(q.schema, this.config.cookie ?? {});
        else
          q = e1(W0.Cookie({}, this.config.cookie), { dynamic: !this.config.aot, models: z, additionalProperties: true });
      const U = { body: e1(Y?.body ?? this.validator?.body, { dynamic: !this.config.aot, models: z }), headers: e1(Y?.headers ?? this.validator?.headers, { dynamic: !this.config.aot, models: z, additionalProperties: true }), params: e1(Y?.params ?? this.validator?.params, { dynamic: !this.config.aot, models: z }), query: e1(Y?.query ?? this.validator?.query, { dynamic: !this.config.aot, models: z }), cookie: q, response: gJ(Y?.response ?? this.validator?.response, { dynamic: !this.config.aot, models: z }) }, A = this.event, O = Q.endsWith("/") ? Q.slice(0, Q.length - 1) : Q + "/";
      if (this.macros.length) {
        const P = (F) => (v, D) => {
          if (typeof v === "function" || Array.isArray(v)) {
            if (!Y[F])
              Y[F] = [];
            if (typeof Y[F] === "function")
              Y[F] = [Y[F]];
            if (Array.isArray(v))
              Y[F] = Y[F].concat(v);
            else
              Y[F].push(v);
            return;
          }
          const { insert: h0 = "after", stack: U8 = "local" } = v;
          if (U8 === "global") {
            if (!Array.isArray(D))
              if (h0 === "before")
                A[F].unshift(D);
              else
                A[F].push(D);
            else if (h0 === "before")
              A[F] = D.concat(A[F]);
            else
              A[F] = A[F].concat(D);
            return;
          } else {
            if (!Y[F])
              Y[F] = [];
            if (typeof Y[F] === "function")
              Y[F] = [Y[F]];
            if (!Array.isArray(D))
              if (h0 === "before")
                Y[F].unshift(D);
              else
                Y[F].push(D);
            else if (h0 === "before")
              Y[F] = D.concat(Y[F]);
            else
              Y[F] = Y[F].concat(D);
            return;
          }
        }, j = { events: { global: A, local: Y }, onParse: P("parse"), onTransform: P("transform"), onBeforeHandle: P("beforeHandle"), onAfterHandle: P("afterHandle"), onResponse: P("onResponse"), onError: P("error") };
        for (let F of this.macros) {
          const v = {};
          for (let [h0, U8] of Object.entries(Y ?? {})) {
            if (kJ.includes(h0))
              continue;
            v[h0] = U8;
          }
          if (!F.$elysiaChecksum)
            F.$elysiaChecksum = [];
          const D = V$(JSON.stringify(v));
          if (F.$elysiaChecksum.includes(D))
            continue;
          F.$elysiaChecksum.push(V$(JSON.stringify(v))), fJ(F(j), Y);
        }
      }
      const T = R8(A, Y), E = typeof J === "function";
      if (this.config.aot === false) {
        if (this.dynamicRouter.add($, Q, { validator: U, hooks: T, content: Y?.type, handle: J }), this.config.strictPath === false)
          this.dynamicRouter.add($, O, { validator: U, hooks: T, content: Y?.type, handle: J });
        this.routes.push({ method: $, path: Q, composed: null, handler: J, hooks: T });
        return;
      }
      const _ = Q4({ path: Q, method: $, hooks: T, validator: U, handler: J, handleError: this.handleError, onRequest: this.event.request, config: this.config, definitions: Z ? this.definitions.type : undefined, schema: Z ? this.schema : undefined, getReporter: () => this.reporter, setHeader: this.setHeaders });
      if (!E) {
        const P = Object.assign({ headers: {}, query: {}, params: {}, body: undefined, request: new Request(`http://localhost${Q}`), store: this.store, path: Q, set: { headers: this.setHeaders ?? {}, status: 200 } }, this.decorators);
        let j;
        for (let F of Object.values(T.request))
          try {
            const v = N1(F(P), P.set);
            if (v !== undefined) {
              j = v;
              break;
            }
          } catch (v) {
            j = this.handleError(P, v);
            break;
          }
        if (j)
          _.response = j;
        else
          try {
            _.response = _(P);
          } catch (F) {
            _.response = this.handleError(P, F);
          }
      }
      const x = this.routes.findIndex((P) => P.path === Q && P.method === $);
      if (x !== -1)
        this.routes.splice(x, 1);
      if (this.routes.push({ method: $, path: Q, composed: _, handler: J, hooks: T }), $ === "$INTERNALWS") {
        const P = this.config.strictPath ? undefined : Q.endsWith("/") ? Q.slice(0, Q.length - 1) : Q + "/";
        if (Q.indexOf(":") === -1 && Q.indexOf("*") === -1) {
          const j = this.staticRouter.handlers.length;
          if (this.staticRouter.handlers.push(_), _.response instanceof Response)
            this.staticRouter.variables += `const st${j} = staticRouter.handlers[${j}].response\n`;
          else
            this.staticRouter.variables += `const st${j} = staticRouter.handlers[${j}]\n`;
          if (this.wsPaths[Q] = j, P)
            this.wsPaths[P] = j;
        } else if (this.wsRouter.add("ws", Q, _), P)
          this.wsRouter.add("ws", P, _);
        return;
      }
      if (Q.indexOf(":") === -1 && Q.indexOf("*") === -1) {
        const P = this.staticRouter.handlers.length;
        if (this.staticRouter.handlers.push(_), _.response instanceof Response)
          this.staticRouter.variables += `const st${P} = staticRouter.handlers[${P}].response\n`;
        else
          this.staticRouter.variables += `const st${P} = staticRouter.handlers[${P}]\n`;
        if (!this.staticRouter.map[Q])
          this.staticRouter.map[Q] = { code: "" };
        if ($ === "ALL")
          this.staticRouter.map[Q].all = `default: return st${P}(ctx)\n`;
        else if (_.response instanceof Response)
          this.staticRouter.map[Q].code = `case '${$}': return st${P}.clone()\n${this.staticRouter.map[Q].code}`;
        else
          this.staticRouter.map[Q].code = `case '${$}': return st${P}(ctx)\n${this.staticRouter.map[Q].code}`;
        if (!this.config.strictPath) {
          if (!this.staticRouter.map[O])
            this.staticRouter.map[O] = { code: "" };
          if ($ === "ALL")
            this.staticRouter.map[O].all = `default: return st${P}(ctx)\n`;
          else if (_.response instanceof Response)
            this.staticRouter.map[O].code = `case '${$}': return st${P}.clone()\n${this.staticRouter.map[O].code}`;
          else
            this.staticRouter.map[O].code = `case '${$}': return st${P}(ctx)\n${this.staticRouter.map[O].code}`;
        }
      } else if (this.router.add($, Q, _), !this.config.strictPath)
        this.router.add($, Q.endsWith("/") ? Q.slice(0, Q.length - 1) : Q + "/", _);
    }
  }
  setHeaders;
  headers($) {
    if (!$)
      return this;
    if (!this.setHeaders)
      this.setHeaders = {};
    return this.setHeaders = a1(this.setHeaders, $), this;
  }
  onStart($) {
    return this.on("start", $), this;
  }
  onRequest($) {
    return this.on("request", $), this;
  }
  onParse($) {
    return this.on("parse", $), this;
  }
  onTransform($) {
    return this.on("transform", $), this;
  }
  resolve($) {
    return $.$elysia = "resolve", this.onBeforeHandle($);
  }
  onBeforeHandle($) {
    return this.on("beforeHandle", $), this;
  }
  onAfterHandle($) {
    return this.on("afterHandle", $), this;
  }
  mapResponse($) {
    return this.on("mapResponse", $), this;
  }
  onResponse($) {
    return this.on("response", $), this;
  }
  trace($) {
    return this.reporter.on("event", XY(() => this.reporter, this.event.trace.length, $)), this.on("trace", $), this;
  }
  error($, X) {
    switch (typeof $) {
      case "string":
        return X.prototype[I$] = $, this.definitions.error[$] = X, this;
      case "function":
        return this.definitions.error = $(this.definitions.error), this;
    }
    for (let [J, Y] of Object.entries($))
      Y.prototype[I$] = J, this.definitions.error[J] = Y;
    return this;
  }
  onError($) {
    return this.on("error", $), this;
  }
  onStop($) {
    return this.on("stop", $), this;
  }
  on($, X) {
    for (let J of Array.isArray(X) ? X : [X])
      switch (J = fZ(J), $) {
        case "start":
          this.event.start.push(J);
          break;
        case "request":
          this.event.request.push(J);
          break;
        case "parse":
          this.event.parse.splice(this.event.parse.length - 1, 0, J);
          break;
        case "transform":
          this.event.transform.push(J);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(J);
          break;
        case "afterHandle":
          this.event.afterHandle.push(J);
          break;
        case "mapResponse":
          this.event.mapResponse.push(J);
          break;
        case "response":
          this.event.onResponse.push(J);
          break;
        case "trace":
          this.event.trace.push(J);
          break;
        case "error":
          this.event.error.push(J);
          break;
        case "stop":
          this.event.stop.push(J);
          break;
      }
    return this;
  }
  group($, X, J) {
    const Y = new M8({ ...this.config, prefix: "" });
    Y.store = this.store, Y.definitions = this.definitions, Y.getServer = () => this.server;
    const Z = typeof X === "object", W = (Z ? J : X)(Y);
    if (this.decorators = a1(this.decorators, Y.decorators), W.event.request.length)
      this.event.request = [...this.event.request, ...W.event.request];
    if (W.event.onResponse.length)
      this.event.onResponse = [...this.event.onResponse, ...W.event.onResponse];
    return this.model(W.definitions.type), Object.values(Y.routes).forEach(({ method: Q, path: z, handler: q, hooks: U }) => {
      if (z = (Z ? "" : this.config.prefix) + $ + z, Z) {
        const A = X, O = U;
        this.add(Q, z, q, R8(A, { ...O, error: !O.error ? W.event.error : Array.isArray(O.error) ? [...O.error, ...W.event.error] : [O.error, ...W.event.error] }));
      } else
        this.add(Q, z, q, R8(U, { error: W.event.error }), { skipPrefix: true });
    }), this;
  }
  guard($, X) {
    if (!X)
      return this.event = AX(this.event, $), this.validator = { body: $.body, headers: $.headers, params: $.params, query: $.query, response: $.response }, this;
    const J = new M8({ ...this.config, prefix: "" });
    J.store = this.store, J.definitions = this.definitions;
    const Y = X(J);
    if (this.decorators = a1(this.decorators, J.decorators), Y.event.request.length)
      this.event.request = [...this.event.request, ...Y.event.request];
    if (Y.event.onResponse.length)
      this.event.onResponse = [...this.event.onResponse, ...Y.event.onResponse];
    return this.model(Y.definitions.type), Object.values(J.routes).forEach(({ method: Z, path: W, handler: Q, hooks: z }) => {
      this.add(Z, W, Q, R8($, { ...z, error: !z.error ? Y.event.error : Array.isArray(z.error) ? [...z.error, ...Y.event.error] : [z.error, ...Y.event.error] }));
    }), this;
  }
  use($) {
    if ($ instanceof Promise)
      return this.lazyLoadModules.push($.then((X) => {
        if (typeof X === "function")
          return X(this);
        if (typeof X.default === "function")
          return X.default(this);
        return this._use(X);
      }).then((X) => X.compile())), this;
    else
      return this._use($);
    return this;
  }
  _use($) {
    if (typeof $ === "function") {
      const Z = $(this);
      if (Z instanceof Promise)
        return this.lazyLoadModules.push(Z.then((W) => {
          if (W instanceof M8) {
            this.compile();
            for (let { method: Q, path: z, handler: q, hooks: U } of Object.values(W.routes))
              this.add(Q, z, q, R8(U, { error: W.event.error }));
            return W;
          }
          if (typeof W === "function")
            return W(this);
          if (typeof W.default === "function")
            return W.default(this);
          return this._use(W);
        }).then((W) => W.compile())), this;
      return Z;
    }
    const { name: X, seed: J } = $.config;
    $.getServer = () => this.getServer(), this.headers($.setHeaders);
    const Y = $.config.scoped;
    if (Y) {
      if (X) {
        if (!(X in this.dependencies))
          this.dependencies[X] = [];
        const W = J !== undefined ? V$(X + JSON.stringify(J)) : 0;
        if (this.dependencies[X].some(({ checksum: Q }) => W === Q))
          return this;
        this.dependencies[X].push(!this.config?.analytic ? { name: $.config.name, seed: $.config.seed, checksum: W, dependencies: $.dependencies } : { name: $.config.name, seed: $.config.seed, checksum: W, dependencies: $.dependencies, stack: $.stack, routes: $.routes, decorators: $.decorators, store: $.store, type: $.definitions.type, error: $.definitions.error, derive: $.event.transform.filter((Q) => Q.$elysia === "derive").map((Q) => ({ fn: Q.toString(), stack: new Error().stack ?? "" })), resolve: $.event.transform.filter((Q) => Q.$elysia === "derive").map((Q) => ({ fn: Q.toString(), stack: new Error().stack ?? "" })) });
      }
      if ($.model(this.definitions.type), $.error(this.definitions.error), $.macros = [...this.macros, ...$.macros], $.onRequest((W) => {
        Object.assign(W, this.decorators), Object.assign(W.store, this.store);
      }), $.event.trace = [...this.event.trace, ...$.event.trace], $.config.aot)
        $.compile();
      const Z = this.mount($.fetch);
      return this.routes = this.routes.concat(Z.routes), this;
    } else {
      $.reporter = this.reporter;
      for (let Z of $.event.trace)
        this.trace(Z);
      if (X) {
        if (!(X in this.dependencies))
          this.dependencies[X] = [];
        const Z = J !== undefined ? V$(X + JSON.stringify(J)) : 0;
        if (!this.dependencies[X].some(({ checksum: W }) => Z === W))
          this.macros.push(...$.macros);
      }
    }
    this.decorate($.decorators), this.state($.store), this.model($.definitions.type), this.error($.definitions.error);
    for (let { method: Z, path: W, handler: Q, hooks: z } of Object.values($.routes))
      this.add(Z, W, Q, R8(z, { error: $.event.error }));
    if (!Y)
      if (X) {
        if (!(X in this.dependencies))
          this.dependencies[X] = [];
        const Z = J !== undefined ? V$(X + JSON.stringify(J)) : 0;
        if (this.dependencies[X].some(({ checksum: W }) => Z === W))
          return this;
        this.dependencies[X].push(!this.config?.analytic ? { name: $.config.name, seed: $.config.seed, checksum: Z, dependencies: $.dependencies } : { name: $.config.name, seed: $.config.seed, checksum: Z, dependencies: $.dependencies, stack: $.stack, routes: $.routes, decorators: $.decorators, store: $.store, type: $.definitions.type, error: $.definitions.error, derive: $.event.transform.filter((W) => W?.$elysia === "derive").map((W) => ({ fn: W.toString(), stack: new Error().stack ?? "" })), resolve: $.event.transform.filter((W) => W?.$elysia === "resolve").map((W) => ({ fn: W.toString(), stack: new Error().stack ?? "" })) }), this.event = AX(this.event, TJ($.event), Z);
      } else
        this.event = AX(this.event, TJ($.event));
    return this;
  }
  macro($) {
    return this.macros.push($), this;
  }
  mount($, X) {
    if ($ instanceof M8 || typeof $ === "function" || $.length === 0 || $ === "/") {
      const Z = typeof $ === "function" ? $ : $ instanceof M8 ? $.compile().fetch : X instanceof M8 ? X.compile().fetch : X, W = async ({ request: Q, path: z }) => Z(new Request(xJ(Q.url, z || "/"), Q));
      return this.all("/", W, { type: "none" }), this.all("/*", W, { type: "none" }), this;
    }
    const J = $.length;
    if (X instanceof M8)
      X = X.compile().fetch;
    const Y = async ({ request: Z, path: W }) => X(new Request(xJ(Z.url, W.slice(J) || "/"), Z));
    return this.all($, Y, { type: "none" }), this.all($ + ($.endsWith("/") ? "*" : "/*"), Y, { type: "none" }), this;
  }
  get($, X, J) {
    return this.add("GET", $, X, J), this;
  }
  post($, X, J) {
    return this.add("POST", $, X, J), this;
  }
  put($, X, J) {
    return this.add("PUT", $, X, J), this;
  }
  patch($, X, J) {
    return this.add("PATCH", $, X, J), this;
  }
  delete($, X, J) {
    return this.add("DELETE", $, X, J), this;
  }
  options($, X, J) {
    return this.add("OPTIONS", $, X, J), this;
  }
  all($, X, J) {
    return this.add("ALL", $, X, J), this;
  }
  head($, X, J) {
    return this.add("HEAD", $, X, J), this;
  }
  connect($, X, J) {
    return this.add("CONNECT", $, X, J), this;
  }
  ws($, X) {
    const J = X.transformMessage ? Array.isArray(X.transformMessage) ? X.transformMessage : [X.transformMessage] : undefined;
    let Y = null;
    const Z = e1(X?.body, { models: this.definitions.type }), W = e1(X?.response, { models: this.definitions.type }), Q = (z) => {
      if (typeof z === "string") {
        const q = z?.charCodeAt(0);
        if (q === 47 || q === 123)
          try {
            z = JSON.parse(z);
          } catch {
          }
        else if (DX(z))
          z = +z;
      }
      if (J?.length)
        for (let q = 0;q < J.length; q++) {
          const U = J[q](z);
          if (U !== undefined)
            z = U;
        }
      return z;
    };
    return this.route("$INTERNALWS", $, (z) => {
      const { set: q, path: U, qi: A, headers: O, query: T, params: E } = z;
      if (Y === null)
        Y = this.getServer();
      if (Y?.upgrade(z.request, { headers: typeof X.upgrade === "function" ? X.upgrade(z) : X.upgrade, data: { validator: W, open(_) {
        X.open?.(new x$(_, z));
      }, message: (_, x) => {
        const P = Q(x);
        if (Z?.Check(P) === false)
          return void _.send(new P0("message", Z, P).message);
        X.message?.(new x$(_, z), P);
      }, drain(_) {
        X.drain?.(new x$(_, z));
      }, close(_, x, P) {
        X.close?.(new x$(_, z), x, P);
      } } }))
        return;
      return q.status = 400, "Expected a websocket connection";
    }, { beforeHandle: X.beforeHandle, transform: X.transform, headers: X.headers, params: X.params, query: X.query }), this;
  }
  route($, X, J, { config: Y, ...Z } = { config: { allowMeta: false } }) {
    return this.add($, X, J, Z, Y), this;
  }
  state($, X) {
    switch (typeof $) {
      case "object":
        return this.store = a1(this.store, $), this;
      case "function":
        return this.store = $(this.store), this;
    }
    if (!($ in this.store))
      this.store[$] = X;
    return this;
  }
  decorate($, X) {
    switch (typeof $) {
      case "object":
        return this.decorators = a1(this.decorators, $), this;
      case "function":
        return this.decorators = $(this.decorators), this;
    }
    if (!($ in this.decorators))
      this.decorators[$] = X;
    return this;
  }
  derive($) {
    return $.$elysia = "derive", this.onTransform($);
  }
  model($, X) {
    switch (typeof $) {
      case "object":
        return Object.entries($).forEach(([J, Y]) => {
          if (!(J in this.definitions.type))
            this.definitions.type[J] = Y;
        }), this;
      case "function":
        return this.definitions.type = $(this.definitions.type), this;
    }
    return this.definitions.type[$] = X, this;
  }
  mapDerive($) {
    return $.$elysia = "derive", this.onTransform($);
  }
  affix($, X, J) {
    if (J === "")
      return this;
    const Y = ["_", "-", " "], Z = (q) => q[0].toUpperCase() + q.slice(1), W = $ === "prefix" ? (q, U) => Y.includes(q.at(-1) ?? "") ? q + U : q + Z(U) : Y.includes(J.at(-1) ?? "") ? (q, U) => U + q : (q, U) => U + Z(q), Q = (q) => {
      const U = {};
      switch (q) {
        case "decorator":
          for (let A in this.decorators)
            U[W(J, A)] = this.decorators[A];
          this.decorators = U;
          break;
        case "state":
          for (let A in this.store)
            U[W(J, A)] = this.store[A];
          this.store = U;
          break;
        case "model":
          for (let A in this.definitions.type)
            U[W(J, A)] = this.definitions.type[A];
          this.definitions.type = U;
          break;
        case "error":
          for (let A in this.definitions.error)
            U[W(J, A)] = this.definitions.error[A];
          this.definitions.error = U;
          break;
      }
    }, z = Array.isArray(X) ? X : [X];
    for (let q of z.some((U) => U === "all") ? ["decorator", "state", "model", "error"] : z)
      Q(q);
    return this;
  }
  prefix($, X) {
    return this.affix("prefix", $, X);
  }
  suffix($, X) {
    return this.affix("suffix", $, X);
  }
  compile() {
    if (this.fetch = this.config.aot ? iJ(this) : cJ(this), typeof this.server?.reload === "function")
      this.server.reload({ ...this.server, fetch: this.fetch });
    return this;
  }
  handle = async ($) => this.fetch($);
  fetch = ($) => {
    return (this.fetch = this.config.aot ? iJ(this) : cJ(this))($);
  };
  handleError = async ($, X) => (this.handleError = this.config.aot ? uJ(this) : z4(this))($, X);
  outerErrorHandler = ($) => new Response($.message || $.name || "Error", { status: $?.status ?? 500 });
  listen = ($, X) => {
    if (typeof Bun === "undefined")
      throw new Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
    if (this.compile(), typeof $ === "string") {
      if ($ = +$.trim(), Number.isNaN($))
        throw new Error("Port must be a numeric value");
    }
    const J = this.fetch, Y = typeof $ === "object" ? { development: !U6, reusePort: true, ...this.config.serve, ...$, websocket: { ...this.config.websocket, ...yJ }, fetch: J, error: this.outerErrorHandler } : { development: !U6, reusePort: true, ...this.config.serve, websocket: { ...this.config.websocket, ...yJ }, port: $, fetch: J, error: this.outerErrorHandler };
    if (this.server = Bun?.serve(Y), this.event.start.length)
      for (let Z = 0;Z < this.event.start.length; Z++)
        this.event.start[Z](this);
    if (X)
      X(this.server);
    return process.on("beforeExit", () => {
      for (let Z = 0;Z < this.event.stop.length; Z++)
        this.event.stop[Z](this);
    }), Promise.all(this.lazyLoadModules).then(() => {
      Bun?.gc(false);
    }), this;
  };
  stop = async () => {
    if (!this.server)
      throw new Error("Elysia isn't running. Call `app.listen` to start the server.");
    if (this.server.stop(), this.event.stop.length)
      for (let $ = 0;$ < this.event.stop.length; $++)
        this.event.stop[$](this);
  };
  get modules() {
    return Promise.all(this.lazyLoadModules);
  }
}

// node_modules/@elysiajs/html/dist/html.js
import {Readable as Readable3} from "stream";

// node_modules/@kitajs/html/suspense.js
var noop = function() {
};
var Suspense = function(props) {
  if (!SUSPENSE_ROOT.enabled) {
    throw new Error("Cannot use Suspense outside of a `renderToStream` call.");
  }
  const fallback = contentsToString([props.fallback]);
  if (!props.children) {
    return "";
  }
  const children = contentsToString([props.children]);
  if (typeof children === "string") {
    return children;
  }
  let resource = SUSPENSE_ROOT.resources.get(props.rid);
  if (!resource) {
    throw new Error("Suspense resource closed before all suspense components were resolved.");
  }
  const run = ++resource.running;
  children.then(writeStreamTemplate).catch(function errorRecover(error) {
    if (!props.catch) {
      throw error;
    }
    let html;
    if (typeof props.catch === "function") {
      html = props.catch(error);
    } else {
      html = props.catch;
    }
    if (typeof html === "string") {
      return writeStreamTemplate(html);
    }
    return html.then(writeStreamTemplate);
  }).catch(function writeFatalError(error) {
    if (resource) {
      const stream = resource.stream.deref();
      if (stream && stream.emit("error", error)) {
        return;
      }
    }
    console.error(error);
  }).finally(function cleanResource() {
    resource = SUSPENSE_ROOT.resources.get(props.rid);
    if (!resource) {
      return;
    }
    if (resource.running > 1) {
      resource.running -= 1;
    } else {
      const stream = resource.stream.deref();
      if (stream && !stream.closed) {
        stream.push(null);
      }
      SUSPENSE_ROOT.resources.delete(props.rid);
    }
  });
  if (typeof fallback === "string") {
    return '<div id="B:' + run + '" data-sf>' + fallback + "</div>";
  }
  return fallback.then(function resolveCallback(resolved) {
    return '<div id="B:' + run + '" data-sf>' + resolved + "</div>";
  });
  function writeStreamTemplate(result) {
    resource = SUSPENSE_ROOT.resources.get(props.rid);
    if (!resource) {
      return;
    }
    const stream = resource.stream.deref();
    if (!stream || stream.closed) {
      return;
    }
    if (SUSPENSE_ROOT.autoScript && resource.sent === false) {
      stream.push(SuspenseScript);
      resource.sent = true;
    }
    stream.push('<template id="N:' + run + '" data-sr>' + result + '</template><script id="S:' + run + '" data-ss>$KITA_RC(' + run + ")</script>");
  }
};
var renderToStream = function(factory, customRid) {
  if (SUSPENSE_ROOT.enabled === false) {
    SUSPENSE_ROOT.enabled = true;
  }
  if (customRid && SUSPENSE_ROOT.resources.has(customRid)) {
    throw new Error(`The provided resource ID is already in use: ${customRid}.`);
  }
  const resourceId = customRid || SUSPENSE_ROOT.requestCounter++;
  const stream = new Readable({ read: noop });
  stream.rid = resourceId;
  SUSPENSE_ROOT.resources.set(resourceId, {
    stream: new WeakRef(stream),
    running: 0,
    sent: false
  });
  let html;
  try {
    html = factory(resourceId);
  } catch (renderError) {
    stream.push(null);
    SUSPENSE_ROOT.resources.delete(resourceId);
    throw renderError;
  }
  if (typeof html === "string") {
    stream.push(html);
    const updatedResource = SUSPENSE_ROOT.resources.get(resourceId);
    if (!updatedResource || updatedResource.running === 0) {
      stream.push(null);
      SUSPENSE_ROOT.resources.delete(resourceId);
    }
    return stream;
  }
  html.then(function writeStreamHtml(html2) {
    stream.push(html2);
  }).catch(function catchError(error) {
    if (stream.emit("error", error) === false) {
      console.error(error);
    }
  }).finally(function endStream() {
    const updatedResource = SUSPENSE_ROOT.resources.get(resourceId);
    if (!updatedResource || updatedResource.running === 0) {
      stream.push(null);
      SUSPENSE_ROOT.resources.delete(resourceId);
    }
  });
  return stream;
};
var { contentsToString } = require_html();
var { Readable } = import.meta.require("stream");
if (!globalThis.SUSPENSE_ROOT) {
  globalThis.SUSPENSE_ROOT = {
    resources: new Map,
    requestCounter: 1,
    enabled: false,
    autoScript: true
  };
}
var SuspenseScript = `
      <script id="kita-html-suspense">
        /*! Apache-2.0 https://kita.js.org */
        function \$KITA_RC(i){
          //# simple aliases
          var d=document,q=d.querySelector.bind(d),
            //# div sent as the fallback wrapper
            v=q('div[id="B:'+i+'"][data-sf]'),
            // template and script sent after promise finishes
            t=q('template[id="N:'+i+'"][data-sr]'),s=q('script[id="S:'+i+'"][data-ss]'),
            // fragment created to avoid inserting element one by one
            f=d.createDocumentFragment(),
            // used by iterators
            c,j,
            // all pending hydrations
            r;

          // if div or template is not found, let this hydration as pending
          if(t&&v&&s){
            // appends into the fragment
            while(c=t.content.firstChild)
              f.appendChild(c);

            // replaces the div and removes the script and template
            v.parentNode.replaceChild(f,v);
            t.remove();
            s.remove();

            // looks for pending templates
            r=d.querySelectorAll('template[id][data-sr]');

            do{
              // resets j from previous loop
              j=0;

              // loops over every found pending template and 
              for(c=0;c<r.length;c++)
                if(r[c]!=t)
                  // let j as true while at least on \$KITA_RC call returns true
                  j=\$KITA_RC(r[c].id.slice(2))?!0:j;
            }while(j)

            // we know at least the original template was substituted
            return!0;
          }
        }
      </script>
    `.replace(/^\s*\/\/.*/gm, "").replace(/\n\s*/g, "");
var $Suspense = Suspense;
var $renderToStream = renderToStream;

// node_modules/@elysiajs/html/dist/handler.js
import {Readable as Readable2} from "stream";

// node_modules/@elysiajs/html/dist/utils.js
var exports_utils = {};
__export(exports_utils, {
  isTagHtml: () => {
    {
      return isTagHtml;
    }
  },
  isHtml: () => {
    {
      return isHtml;
    }
  }
});
function isHtml(value) {
  if (typeof value !== "string")
    return false;
  value = value.trim();
  const length = value.length;
  return length >= 7 && value[0] === "<" && value[length - 1] === ">";
}
function isTagHtml(value) {
  return value.trimStart().slice(0, 5).startsWith("<html");
}

// node_modules/@elysiajs/html/dist/handler.js
function handleHtml(value, options, hasContentType) {
  if (value instanceof Promise) {
    return value.then((v) => handleHtml(v, options, hasContentType));
  }
  if (typeof value === "string") {
    if (options.autoDoctype && isHtml(value) && isTagHtml(value))
      value = "<!doctype html>" + value;
    return new Response(value, hasContentType ? undefined : { headers: { "content-type": options.contentType } });
  }
  let stream = Readable2.toWeb(value);
  if (options.autoDoctype) {
    let first = true;
    stream = stream.pipeThrough(new TransformStream({
      transform(chunk, controller) {
        let str = chunk.toString();
        if (first && isTagHtml(str) && isTagHtml(str)) {
          first = false;
          str = "<!doctype html>" + str;
        }
        controller.enqueue(str);
      }
    }));
  }
  return new Response(stream, hasContentType ? undefined : { headers: { "content-type": options.contentType } });
}

// node_modules/@elysiajs/html/dist/html.js
function html(options = {}) {
  options.contentType ??= "text/html; charset=utf8";
  options.autoDetect ??= true;
  options.isHtml ??= isHtml;
  options.autoDoctype ??= true;
  const instance = new M8({
    name: "@elysiajs/html",
    seed: options
  }).derive(({ set }) => {
    return {
      html(value) {
        return handleHtml(value, options, "content-type" in set.headers);
      },
      stream(value, args) {
        return handleHtml($renderToStream((id) => value({ ...args, id })), options, "content-type" in set.headers);
      }
    };
  });
  if (options.autoDetect)
    return instance.mapResponse(async function handlerPossibleHtml({ response: value, set }) {
      if (isHtml(value) || value instanceof Readable3 && "rid" in value) {
        const response = await handleHtml(value, options, "content-type" in set.headers);
        if (response instanceof Response)
          return response;
        set.headers["content-type"] = options.contentType;
        return new Response(response);
      }
      return;
    });
  return instance;
}
// node_modules/@elysiajs/html/dist/options.js
var exports_options = {};

// node_modules/@elysiajs/html/dist/index.js
__reExport(exports_dist, __toESM(require_register(), 1));

// node_modules/@kitajs/html/error-boundary.js
var ErrorBoundary = function(props) {
  let children = contentsToString2([props.children]);
  if (typeof children === "string") {
    return children;
  }
  if (props.timeout) {
    children = Promise.race([
      children,
      setTimeout(props.timeout).then(function reject() {
        const error = new Error("Children timed out.");
        error[TIMEOUT_SYMBOL] = true;
        throw error;
      })
    ]);
  }
  return children.catch(function errorBoundary(error) {
    if (typeof props.catch === "function") {
      return props.catch(error);
    }
    return props.catch;
  });
};
var { contentsToString: contentsToString2 } = require_html();
var { setTimeout } = import.meta.require("timers/promises");
var TIMEOUT_SYMBOL = Symbol.for("kHtmlTimeout");
var $ErrorBoundary = ErrorBoundary;

// node_modules/@elysiajs/html/dist/index.js
var import_html = __toESM(require_html(), 1);

// node_modules/drizzle-orm/entity.js
var is = function(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(`Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
  }
  let cls = value.constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
};
var entityKind = Symbol.for("drizzle:entityKind");
var hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");

// node_modules/drizzle-orm/column.js
class Column {
  constructor(table, config) {
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.notNull = config.notNull;
    this.default = config.default;
    this.defaultFn = config.defaultFn;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
    this.isUnique = config.isUnique;
    this.uniqueName = config.uniqueName;
    this.uniqueType = config.uniqueType;
    this.dataType = config.dataType;
    this.columnType = config.columnType;
  }
  static [entityKind] = "Column";
  name;
  primary;
  notNull;
  default;
  defaultFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = undefined;
  config;
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
}

// node_modules/drizzle-orm/table.js
var isTable = function(table) {
  return typeof table === "object" && table !== null && IsDrizzleTable in table;
};
var getTableName = function(table) {
  return table[TableName];
};
var TableName = Symbol.for("drizzle:Name");
var Schema = Symbol.for("drizzle:Schema");
var Columns = Symbol.for("drizzle:Columns");
var OriginalName = Symbol.for("drizzle:OriginalName");
var BaseName = Symbol.for("drizzle:BaseName");
var IsAlias = Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");

class Table {
  static [entityKind] = "Table";
  static Symbol = {
    Name: TableName,
    Schema,
    OriginalName,
    Columns,
    BaseName,
    IsAlias,
    ExtraConfigBuilder
  };
  [TableName];
  [OriginalName];
  [Schema];
  [Columns];
  [BaseName];
  [IsAlias] = false;
  [ExtraConfigBuilder] = undefined;
  [IsDrizzleTable] = true;
  constructor(name, schema, baseName) {
    this[TableName] = this[OriginalName] = name;
    this[Schema] = schema;
    this[BaseName] = baseName;
  }
}

// node_modules/drizzle-orm/pg-core/table.js
var InlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");

class PgTable extends Table {
  static [entityKind] = "PgTable";
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys
  });
  [InlineForeignKeys] = [];
  [Table.Symbol.ExtraConfigBuilder] = undefined;
}

// node_modules/drizzle-orm/pg-core/primary-keys.js
class PrimaryKeyBuilder {
  static [entityKind] = "PgPrimaryKeyBuilder";
  columns;
  name;
  constructor(columns, name) {
    this.columns = columns;
    this.name = name;
  }
  build(table3) {
    return new PrimaryKey(table3, this.columns, this.name);
  }
}

class PrimaryKey {
  constructor(table3, columns, name) {
    this.table = table3;
    this.columns = columns;
    this.name = name;
  }
  static [entityKind] = "PgPrimaryKey";
  columns;
  name;
  getName() {
    return this.name ?? `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
  }
}

// node_modules/drizzle-orm/sql/expressions/conditions.js
var bindIfParam = function(value, column2) {
  if (isDriverValueEncoder(column2) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column2);
  }
  return value;
};
var and = function(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c10) => c10 !== undefined);
  if (conditions.length === 0) {
    return;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql2.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
};
var or = function(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c10) => c10 !== undefined);
  if (conditions.length === 0) {
    return;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql2.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
};
var not = function(condition) {
  return sql2`not ${condition}`;
};
var inArray = function(column2, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("inArray requires at least one value");
    }
    return sql2`${column2} in ${values.map((v) => bindIfParam(v, column2))}`;
  }
  return sql2`${column2} in ${bindIfParam(values, column2)}`;
};
var notInArray = function(column2, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("notInArray requires at least one value");
    }
    return sql2`${column2} not in ${values.map((v) => bindIfParam(v, column2))}`;
  }
  return sql2`${column2} not in ${bindIfParam(values, column2)}`;
};
var isNull = function(value) {
  return sql2`${value} is null`;
};
var isNotNull = function(value) {
  return sql2`${value} is not null`;
};
var exists = function(subquery) {
  return sql2`exists ${subquery}`;
};
var notExists = function(subquery) {
  return sql2`not exists ${subquery}`;
};
var between = function(column2, min, max) {
  return sql2`${column2} between ${bindIfParam(min, column2)} and ${bindIfParam(max, column2)}`;
};
var notBetween = function(column2, min, max) {
  return sql2`${column2} not between ${bindIfParam(min, column2)} and ${bindIfParam(max, column2)}`;
};
var like = function(column2, value) {
  return sql2`${column2} like ${value}`;
};
var notLike = function(column2, value) {
  return sql2`${column2} not like ${value}`;
};
var ilike = function(column2, value) {
  return sql2`${column2} ilike ${value}`;
};
var notIlike = function(column2, value) {
  return sql2`${column2} not ilike ${value}`;
};
var eq = (left, right) => {
  return sql2`${left} = ${bindIfParam(right, left)}`;
};
var ne = (left, right) => {
  return sql2`${left} <> ${bindIfParam(right, left)}`;
};
var gt = (left, right) => {
  return sql2`${left} > ${bindIfParam(right, left)}`;
};
var gte = (left, right) => {
  return sql2`${left} >= ${bindIfParam(right, left)}`;
};
var lt = (left, right) => {
  return sql2`${left} < ${bindIfParam(right, left)}`;
};
var lte = (left, right) => {
  return sql2`${left} <= ${bindIfParam(right, left)}`;
};

// node_modules/drizzle-orm/sql/expressions/select.js
var asc = function(column2) {
  return sql2`${column2} asc`;
};
var desc = function(column2) {
  return sql2`${column2} desc`;
};

// node_modules/drizzle-orm/relations.js
var getOperators = function() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql: sql2
  };
};
var getOrderByOperators = function() {
  return {
    sql: sql2,
    asc,
    desc
  };
};
var extractTablesRelationalConfig = function(schema, configHelpers) {
  if (Object.keys(schema).length === 1 && "default" in schema && !is(schema["default"], Table)) {
    schema = schema["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) {
    if (isTable(value)) {
      const dbName = value[Table.Symbol.Name];
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value[Table.Symbol.Name],
        schema: value[Table.Symbol.Schema],
        columns: value[Table.Symbol.Columns],
        relations: bufferedRelations?.relations ?? {},
        primaryKey: bufferedRelations?.primaryKey ?? []
      };
      for (const column3 of Object.values(value[Table.Symbol.Columns])) {
        if (column3.primary) {
          tablesConfig[key].primaryKey.push(column3);
        }
      }
      const extraConfig = value[Table.Symbol.ExtraConfigBuilder]?.(value);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value, Relations)) {
      const dbName = value.table[Table.Symbol.Name];
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(configHelpers(value.table));
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
          if (primaryKey) {
            tableConfig.primaryKey.push(...primaryKey);
          }
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
};
var createOne = function(sourceTable) {
  return function one(table5, config) {
    return new One(sourceTable, table5, config, config?.fields.reduce((res, f10) => res && f10.notNull, true) ?? false);
  };
};
var createMany = function(sourceTable) {
  return function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  };
};
var normalizeRelation = function(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[relation.referencedTable[Table.Symbol.Name]];
  if (!referencedTableTsName) {
    throw new Error(`Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`);
  }
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[sourceTable[Table.Symbol.Name]];
  if (!sourceTableTsName) {
    throw new Error(`Table "${sourceTable[Table.Symbol.Name]}" not found in schema`);
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(referencedTableConfig.relations)) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(`There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`) : new Error(`There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`);
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(`There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`);
};
var createTableRelationsHelpers = function(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
};
var mapRelationalRow = function(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [
    selectionItemIndex,
    selectionItem
  ] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRows, selectionItem.selection, mapColumnValue) : subRows.map((subRow) => mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRow, selectionItem.selection, mapColumnValue));
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
};

class Relation {
  constructor(sourceTable, referencedTable, relationName) {
    this.sourceTable = sourceTable;
    this.referencedTable = referencedTable;
    this.relationName = relationName;
    this.referencedTableName = referencedTable[Table.Symbol.Name];
  }
  static [entityKind] = "Relation";
  referencedTableName;
  fieldName;
}

class Relations {
  constructor(table5, config) {
    this.table = table5;
    this.config = config;
  }
  static [entityKind] = "Relations";
}

class One extends Relation {
  constructor(sourceTable, referencedTable, config, isNullable) {
    super(sourceTable, referencedTable, config?.relationName);
    this.config = config;
    this.isNullable = isNullable;
  }
  static [entityKind] = "One";
  withFieldName(fieldName) {
    const relation = new One(this.sourceTable, this.referencedTable, this.config, this.isNullable);
    relation.fieldName = fieldName;
    return relation;
  }
}

class Many extends Relation {
  constructor(sourceTable, referencedTable, config) {
    super(sourceTable, referencedTable, config?.relationName);
    this.config = config;
  }
  static [entityKind] = "Many";
  withFieldName(fieldName) {
    const relation = new Many(this.sourceTable, this.referencedTable, this.config);
    relation.fieldName = fieldName;
    return relation;
  }
}

// node_modules/drizzle-orm/subquery.js
var SubqueryConfig = Symbol.for("drizzle:SubqueryConfig");

class Subquery {
  static [entityKind] = "Subquery";
  [SubqueryConfig];
  constructor(sql5, selection, alias, isWith = false) {
    this[SubqueryConfig] = {
      sql: sql5,
      selection,
      alias,
      isWith
    };
  }
}

class WithSubquery extends Subquery {
  static [entityKind] = "WithSubquery";
}

// node_modules/drizzle-orm/tracing-utils.js
var iife = function(fn, ...args) {
  return fn(...args);
};

// node_modules/drizzle-orm/version.js
var version = "0.29.3";

// node_modules/drizzle-orm/tracing.js
var otel;
var rawTracer;
var tracer = {
  startActiveSpan(name, fn) {
    if (!otel) {
      return fn();
    }
    if (!rawTracer) {
      rawTracer = otel.trace.getTracer("drizzle-orm", version);
    }
    return iife((otel2, rawTracer2) => rawTracer2.startActiveSpan(name, (span) => {
      try {
        return fn(span);
      } catch (e3) {
        span.setStatus({
          code: otel2.SpanStatusCode.ERROR,
          message: e3 instanceof Error ? e3.message : "Unknown error"
        });
        throw e3;
      } finally {
        span.end();
      }
    }), otel, rawTracer);
  }
};

// node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");

// node_modules/drizzle-orm/sql/sql.js
var isSQLWrapper = function(value) {
  return typeof value === "object" && value !== null && "getSQL" in value && typeof value.getSQL === "function";
};
var mergeQueries = function(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
};
var isDriverValueEncoder = function(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
};
var sql2 = function(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
};
var fillPlaceholders = function(params, values) {
  return params.map((p8) => {
    if (is(p8, Placeholder)) {
      if (!(p8.name in values)) {
        throw new Error(`No value for placeholder "${p8.name}" was provided`);
      }
      return values[p8.name];
    }
    return p8;
  });
};
class StringChunk {
  static [entityKind] = "StringChunk";
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
}

class SQL {
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
  }
  static [entityKind] = "SQL";
  decoder = noopDecoder;
  shouldInlineParams = false;
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span?.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const {
      escapeName,
      escapeParam,
      prepareTyping,
      inlineParams,
      paramStartIndex
    } = config;
    return mergeQueries(chunks.map((chunk) => {
      if (is(chunk, StringChunk)) {
        return { sql: chunk.value.join(""), params: [] };
      }
      if (is(chunk, Name)) {
        return { sql: escapeName(chunk.value), params: [] };
      }
      if (chunk === undefined) {
        return { sql: "", params: [] };
      }
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i8, p8] of chunk.entries()) {
          result.push(p8);
          if (i8 < chunk.length - 1) {
            result.push(new StringChunk(", "));
          }
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config);
      }
      if (is(chunk, SQL)) {
        return this.buildQueryFromSourceParams(chunk.queryChunks, {
          ...config,
          inlineParams: inlineParams || chunk.shouldInlineParams
        });
      }
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        return {
          sql: schemaName === undefined ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (is(chunk, Column)) {
        return { sql: escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(chunk.name), params: [] };
      }
      if (is(chunk, View)) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === undefined ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (is(chunk, Param)) {
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (is(mappedValue, SQL)) {
          return this.buildQueryFromSourceParams([mappedValue], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(mappedValue, config), params: [] };
        }
        let typings;
        if (prepareTyping !== undefined) {
          typings = [prepareTyping(chunk.encoder)];
        }
        return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
      }
      if (is(chunk, Placeholder)) {
        return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
      }
      if (is(chunk, SQL.Aliased) && chunk.fieldAlias !== undefined) {
        return { sql: escapeName(chunk.fieldAlias), params: [] };
      }
      if (is(chunk, Subquery)) {
        if (chunk[SubqueryConfig].isWith) {
          return { sql: escapeName(chunk[SubqueryConfig].alias), params: [] };
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk[SubqueryConfig].sql,
          new StringChunk(") "),
          new Name(chunk[SubqueryConfig].alias)
        ], config);
      }
      if (isSQLWrapper(chunk)) {
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config);
      }
      if (is(chunk, Relation)) {
        return this.buildQueryFromSourceParams([
          chunk.sourceTable,
          new StringChunk("."),
          sql2.identifier(chunk.fieldName)
        ], config);
      }
      if (inlineParams) {
        return { sql: this.mapInlineParam(chunk, config), params: [] };
      }
      return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return "null";
    }
    if (typeof chunk === "number" || typeof chunk === "boolean") {
      return chunk.toString();
    }
    if (typeof chunk === "string") {
      return escapeString(chunk);
    }
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === undefined) {
      return this;
    }
    return new SQL.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
}

class Name {
  constructor(value) {
    this.value = value;
  }
  static [entityKind] = "Name";
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
var noopDecoder = {
  mapFromDriverValue: (value) => value
};
var noopEncoder = {
  mapToDriverValue: (value) => value
};
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};

class Param {
  constructor(value, encoder = noopEncoder) {
    this.value = value;
    this.encoder = encoder;
  }
  static [entityKind] = "Param";
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
((sql22) => {
  function empty() {
    return new SQL([]);
  }
  sql22.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  sql22.fromList = fromList;
  function raw(str) {
    return new SQL([new StringChunk(str)]);
  }
  sql22.raw = raw;
  function join(chunks, separator) {
    const result = [];
    for (const [i8, chunk] of chunks.entries()) {
      if (i8 > 0 && separator !== undefined) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return new SQL(result);
  }
  sql22.join = join;
  function identifier(value) {
    return new Name(value);
  }
  sql22.identifier = identifier;
  function placeholder2(name2) {
    return new Placeholder(name2);
  }
  sql22.placeholder = placeholder2;
  function param2(value, encoder) {
    return new Param(value, encoder);
  }
  sql22.param = param2;
})(sql2 || (sql2 = {}));
((SQL2) => {

  class Aliased {
    constructor(sql22, fieldAlias) {
      this.sql = sql22;
      this.fieldAlias = fieldAlias;
    }
    static [entityKind] = "SQL.Aliased";
    isSelectionField = false;
    getSQL() {
      return this.sql;
    }
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));

class Placeholder {
  constructor(name2) {
    this.name = name2;
  }
  static [entityKind] = "Placeholder";
  getSQL() {
    return new SQL([this]);
  }
}

class View {
  static [entityKind] = "View";
  [ViewBaseConfig];
  constructor({ name: name2, schema, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
  getSQL() {
    return new SQL([this]);
  }
}
Column.prototype.getSQL = function() {
  return new SQL([this]);
};
Table.prototype.getSQL = function() {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
  return new SQL([this]);
};

// node_modules/drizzle-orm/alias.js
var aliasedTable = function(table7, tableAlias) {
  return new Proxy(table7, new TableAliasProxyHandler(tableAlias, false));
};
var aliasedTableColumn = function(column5, tableAlias) {
  return new Proxy(column5, new ColumnAliasProxyHandler(new Proxy(column5.table, new TableAliasProxyHandler(tableAlias, false))));
};
var mapColumnsInAliasedSQLToAlias = function(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
};
var mapColumnsInSQLToAlias = function(query, alias) {
  return sql2.join(query.queryChunks.map((c10) => {
    if (is(c10, Column)) {
      return aliasedTableColumn(c10, alias);
    }
    if (is(c10, SQL)) {
      return mapColumnsInSQLToAlias(c10, alias);
    }
    if (is(c10, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c10, alias);
    }
    return c10;
  }));
};

class ColumnAliasProxyHandler {
  constructor(table7) {
    this.table = table7;
  }
  static [entityKind] = "ColumnAliasProxyHandler";
  get(columnObj, prop) {
    if (prop === "table") {
      return this.table;
    }
    return columnObj[prop];
  }
}

class TableAliasProxyHandler {
  constructor(alias, replaceOriginalName) {
    this.alias = alias;
    this.replaceOriginalName = replaceOriginalName;
  }
  static [entityKind] = "TableAliasProxyHandler";
  get(target, prop) {
    if (prop === Table.Symbol.IsAlias) {
      return true;
    }
    if (prop === Table.Symbol.Name) {
      return this.alias;
    }
    if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
      return this.alias;
    }
    if (prop === ViewBaseConfig) {
      return {
        ...target[ViewBaseConfig],
        name: this.alias,
        isAlias: true
      };
    }
    if (prop === Table.Symbol.Columns) {
      const columns = target[Table.Symbol.Columns];
      if (!columns) {
        return columns;
      }
      const proxiedColumns = {};
      Object.keys(columns).map((key) => {
        proxiedColumns[key] = new Proxy(columns[key], new ColumnAliasProxyHandler(new Proxy(target, this)));
      });
      return proxiedColumns;
    }
    const value = target[prop];
    if (is(value, Column)) {
      return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
    }
    return value;
  }
}

// node_modules/drizzle-orm/column-builder.js
class ColumnBuilder {
  static [entityKind] = "ColumnBuilder";
  config;
  constructor(name, dataType, columnType) {
    this.config = {
      name,
      notNull: false,
      default: undefined,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: undefined,
      uniqueType: undefined,
      dataType,
      columnType
    };
  }
  $type() {
    return this;
  }
  notNull() {
    this.config.notNull = true;
    return this;
  }
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  $default = this.$defaultFn;
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
}

// node_modules/drizzle-orm/errors.js
class DrizzleError extends Error {
  static [entityKind] = "DrizzleError";
  constructor({ message, cause }) {
    super(message);
    this.name = "DrizzleError";
    this.cause = cause;
  }
}

class TransactionRollbackError extends DrizzleError {
  static [entityKind] = "TransactionRollbackError";
  constructor() {
    super({ message: "Rollback" });
  }
}

// node_modules/drizzle-orm/logger.js
class ConsoleLogWriter {
  static [entityKind] = "ConsoleLogWriter";
  write(message) {
    console.log(message);
  }
}

class DefaultLogger {
  static [entityKind] = "DefaultLogger";
  writer;
  constructor(config) {
    this.writer = config?.writer ?? new ConsoleLogWriter;
  }
  logQuery(query, params) {
    const stringifiedParams = params.map((p8) => {
      try {
        return JSON.stringify(p8);
      } catch {
        return String(p8);
      }
    });
    const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
    this.writer.write(`Query: ${query}${paramsStr}`);
  }
}

class NoopLogger {
  static [entityKind] = "NoopLogger";
  logQuery() {
  }
}

// node_modules/drizzle-orm/query-promise.js
class QueryPromise {
  static [entityKind] = "QueryPromise";
  [Symbol.toStringTag] = "QueryPromise";
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(onFinally) {
    return this.then((value) => {
      onFinally?.();
      return value;
    }, (reason) => {
      onFinally?.();
      throw reason;
    });
  }
  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
}

// node_modules/drizzle-orm/utils.js
var mapResultRow = function(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce((result2, { path, field }, columnIndex) => {
    let decoder;
    if (is(field, Column)) {
      decoder = field;
    } else if (is(field, SQL)) {
      decoder = field.decoder;
    } else {
      decoder = field.sql.decoder;
    }
    let node = result2;
    for (const [pathChunkIndex, pathChunk] of path.entries()) {
      if (pathChunkIndex < path.length - 1) {
        if (!(pathChunk in node)) {
          node[pathChunk] = {};
        }
        node = node[pathChunk];
      } else {
        const rawValue = row[columnIndex];
        const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
        if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
          const objectName = path[0];
          if (!(objectName in nullifyMap)) {
            nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
          } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
            nullifyMap[objectName] = false;
          }
        }
      }
    }
    return result2;
  }, {});
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
};
var orderSelectedFields = function(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name, field]) => {
    if (typeof name !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name] : [name];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
};
var haveSameKeys = function(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index, key] of leftKeys.entries()) {
    if (key !== rightKeys[index]) {
      return false;
    }
  }
  return true;
};
var mapUpdateSet = function(table8, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== undefined).map(([key, value]) => {
    if (is(value, SQL)) {
      return [key, value];
    } else {
      return [key, new Param(value, table8[Table.Symbol.Columns][key])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
};
var applyMixins = function(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
      if (name === "constructor")
        continue;
      Object.defineProperty(baseClass.prototype, name, Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || Object.create(null));
    }
  }
};
var getTableColumns = function(table8) {
  return table8[Table.Symbol.Columns];
};
var getTableLikeName = function(table8) {
  return is(table8, Subquery) ? table8[SubqueryConfig].alias : is(table8, View) ? table8[ViewBaseConfig].name : is(table8, SQL) ? undefined : table8[Table.Symbol.IsAlias] ? table8[Table.Symbol.Name] : table8[Table.Symbol.BaseName];
};

// src/index.tsx
var elements = __toESM(require_elements(), 1);

// node_modules/@libsql/client/lib-esm/api.js
class LibsqlError extends Error {
  code;
  rawCode;
  constructor(message, code, rawCode, cause) {
    if (code !== undefined) {
      message = `${code}: ${message}`;
    }
    super(message, { cause });
    this.code = code;
    this.rawCode = rawCode;
    this.name = "LibsqlError";
  }
}

// node_modules/@libsql/client/lib-esm/uri.js
function parseUri(text) {
  const match = URI_RE.exec(text);
  if (match === null) {
    throw new LibsqlError("The URL is not in a valid format", "URL_INVALID");
  }
  const groups = match.groups;
  const scheme = groups["scheme"];
  const authority = groups["authority"] !== undefined ? parseAuthority(groups["authority"]) : undefined;
  const path = percentDecode(groups["path"]);
  const query = groups["query"] !== undefined ? parseQuery(groups["query"]) : undefined;
  const fragment = groups["fragment"] !== undefined ? percentDecode(groups["fragment"]) : undefined;
  return { scheme, authority, path, query, fragment };
}
var parseAuthority = function(text) {
  const match = AUTHORITY_RE.exec(text);
  if (match === null) {
    throw new LibsqlError("The authority part of the URL is not in a valid format", "URL_INVALID");
  }
  const groups = match.groups;
  const host = percentDecode(groups["host_br"] ?? groups["host"]);
  const port = groups["port"] ? parseInt(groups["port"], 10) : undefined;
  const userinfo = groups["username"] !== undefined ? {
    username: percentDecode(groups["username"]),
    password: groups["password"] !== undefined ? percentDecode(groups["password"]) : undefined
  } : undefined;
  return { host, port, userinfo };
};
var parseQuery = function(text) {
  const sequences = text.split("&");
  const pairs = [];
  for (const sequence of sequences) {
    if (sequence === "") {
      continue;
    }
    let key;
    let value;
    const splitIdx = sequence.indexOf("=");
    if (splitIdx < 0) {
      key = sequence;
      value = "";
    } else {
      key = sequence.substring(0, splitIdx);
      value = sequence.substring(splitIdx + 1);
    }
    pairs.push({
      key: percentDecode(key.replaceAll("+", " ")),
      value: percentDecode(value.replaceAll("+", " "))
    });
  }
  return { pairs };
};
var percentDecode = function(text) {
  try {
    return decodeURIComponent(text);
  } catch (e3) {
    if (e3 instanceof URIError) {
      throw new LibsqlError(`URL component has invalid percent encoding: ${e3}`, "URL_INVALID", undefined, e3);
    }
    throw e3;
  }
};
function encodeBaseUrl(scheme, authority, path) {
  if (authority === undefined) {
    throw new LibsqlError(`URL with scheme ${JSON.stringify(scheme + ":")} requires authority (the "//" part)`, "URL_INVALID");
  }
  const schemeText = `${scheme}:`;
  const hostText = encodeHost(authority.host);
  const portText = encodePort(authority.port);
  const userinfoText = encodeUserinfo(authority.userinfo);
  const authorityText = `//${userinfoText}${hostText}${portText}`;
  let pathText = path.split("/").map(encodeURIComponent).join("/");
  if (pathText !== "" && !pathText.startsWith("/")) {
    pathText = "/" + pathText;
  }
  return new URL(`${schemeText}${authorityText}${pathText}`);
}
var encodeHost = function(host) {
  return host.includes(":") ? `[${encodeURI(host)}]` : encodeURI(host);
};
var encodePort = function(port) {
  return port !== undefined ? `:${port}` : "";
};
var encodeUserinfo = function(userinfo) {
  if (userinfo === undefined) {
    return "";
  }
  const usernameText = encodeURIComponent(userinfo.username);
  const passwordText = userinfo.password !== undefined ? `:${encodeURIComponent(userinfo.password)}` : "";
  return `${usernameText}${passwordText}@`;
};
var URI_RE = (() => {
  const SCHEME = "(?<scheme>[A-Za-z][A-Za-z.+-]*)";
  const AUTHORITY = "(?<authority>[^/?#]*)";
  const PATH = "(?<path>[^?#]*)";
  const QUERY = "(?<query>[^#]*)";
  const FRAGMENT = "(?<fragment>.*)";
  return new RegExp(`^${SCHEME}:(//${AUTHORITY})?${PATH}(\\?${QUERY})?(#${FRAGMENT})?\$`, "su");
})();
var AUTHORITY_RE = (() => {
  const USERINFO = "(?<username>[^:]*)(:(?<password>.*))?";
  const HOST = "((?<host>[^:\\[\\]]*)|(\\[(?<host_br>[^\\[\\]]*)\\]))";
  const PORT = "(?<port>[0-9]*)";
  return new RegExp(`^(${USERINFO}@)?${HOST}(:${PORT})?\$`, "su");
})();

// node_modules/js-base64/base64.mjs
var version3 = "3.7.5";
var VERSION = version3;
var _hasatob = typeof atob === "function";
var _hasbtoa = typeof btoa === "function";
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder : undefined;
var _TE = typeof TextEncoder === "function" ? new TextEncoder : undefined;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a3) => {
  let tab = {};
  a3.forEach((c10, i8) => tab[c10] = i8);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c02, c12, c22, asc2 = "";
  const pad = bin.length % 3;
  for (let i8 = 0;i8 < bin.length; ) {
    if ((c02 = bin.charCodeAt(i8++)) > 255 || (c12 = bin.charCodeAt(i8++)) > 255 || (c22 = bin.charCodeAt(i8++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c02 << 16 | c12 << 8 | c22;
    asc2 += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc2.slice(0, pad - 3) + "===".substring(pad) : asc2;
};
var _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i8 = 0, l3 = u8a.length;i8 < l3; i8 += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i8, i8 + maxargs)));
  }
  return _btoa(strs.join(""));
};
var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
var cb_utob = (c10) => {
  if (c10.length < 2) {
    var cc = c10.charCodeAt(0);
    return cc < 128 ? c10 : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c10.charCodeAt(0) - 55296) * 1024 + (c10.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u10) => u10.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var encodeURI2 = (src) => encode(src, true);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc2) => {
  asc2 = asc2.replace(/\s+/g, "");
  if (!b64re.test(asc2))
    throw new TypeError("malformed base64.");
  asc2 += "==".slice(2 - (asc2.length & 3));
  let u24, bin = "", r12, r22;
  for (let i8 = 0;i8 < asc2.length; ) {
    u24 = b64tab[asc2.charAt(i8++)] << 18 | b64tab[asc2.charAt(i8++)] << 12 | (r12 = b64tab[asc2.charAt(i8++)]) << 6 | (r22 = b64tab[asc2.charAt(i8++)]);
    bin += r12 === 64 ? _fromCC(u24 >> 16 & 255) : r22 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};
var _atob = _hasatob ? (asc2) => atob(_tidyB64(asc2)) : _hasBuffer ? (asc2) => Buffer.from(asc2, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a3) => _U8Afrom(Buffer.from(a3, "base64")) : (a3) => _U8Afrom(_atob(a3).split("").map((c10) => c10.charCodeAt(0)));
var toUint8Array = (a3) => _toUint8Array(_unURI(a3));
var _decode = _hasBuffer ? (a3) => Buffer.from(a3, "base64").toString("utf8") : _TD ? (a3) => _TD.decode(_toUint8Array(a3)) : (a3) => btou(_atob(a3));
var _unURI = (a3) => _tidyB64(a3.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));
var isValid = (src) => {
  if (typeof src !== "string")
    return false;
  const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
var _noEnum = (v) => {
  return {
    value: v,
    enumerable: false,
    writable: true,
    configurable: true
  };
};
var extendString = function() {
  const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
  _add("fromBase64", function() {
    return decode(this);
  });
  _add("toBase64", function(urlsafe) {
    return encode(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return encode(this, true);
  });
  _add("toBase64URL", function() {
    return encode(this, true);
  });
  _add("toUint8Array", function() {
    return toUint8Array(this);
  });
};
var extendUint8Array = function() {
  const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
  _add("toBase64", function(urlsafe) {
    return fromUint8Array(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return fromUint8Array(this, true);
  });
  _add("toBase64URL", function() {
    return fromUint8Array(this, true);
  });
};
var extendBuiltins = () => {
  extendString();
  extendUint8Array();
};
var gBase64 = {
  version: version3,
  VERSION,
  atob: _atob,
  atobPolyfill,
  btoa: _btoa,
  btoaPolyfill,
  fromBase64: decode,
  toBase64: encode,
  encode,
  encodeURI: encodeURI2,
  encodeURL: encodeURI2,
  utob,
  btou,
  decode,
  isValid,
  fromUint8Array,
  toUint8Array,
  extendString,
  extendUint8Array,
  extendBuiltins
};

// node_modules/@libsql/client/lib-esm/util.js
function transactionModeToBegin(mode) {
  if (mode === "write") {
    return "BEGIN IMMEDIATE";
  } else if (mode === "read") {
    return "BEGIN TRANSACTION READONLY";
  } else if (mode === "deferred") {
    return "BEGIN DEFERRED";
  } else {
    throw RangeError('Unknown transaction mode, supported values are "write", "read" and "deferred"');
  }
}
var rowToJson = function(row) {
  return Array.prototype.map.call(row, valueToJson);
};
var valueToJson = function(value) {
  if (typeof value === "bigint") {
    return "" + value;
  } else if (value instanceof ArrayBuffer) {
    return gBase64.fromUint8Array(new Uint8Array(value));
  } else {
    return value;
  }
};
var supportedUrlLink = "https://github.com/libsql/libsql-client-ts#supported-urls";

class ResultSetImpl {
  columns;
  columnTypes;
  rows;
  rowsAffected;
  lastInsertRowid;
  constructor(columns, columnTypes, rows, rowsAffected, lastInsertRowid) {
    this.columns = columns;
    this.columnTypes = columnTypes;
    this.rows = rows;
    this.rowsAffected = rowsAffected;
    this.lastInsertRowid = lastInsertRowid;
  }
  toJSON() {
    return {
      columns: this.columns,
      columnTypes: this.columnTypes,
      rows: this.rows.map(rowToJson),
      rowsAffected: this.rowsAffected,
      lastInsertRowid: this.lastInsertRowid !== undefined ? "" + this.lastInsertRowid : null
    };
  }
}

// node_modules/@libsql/client/lib-esm/config.js
function expandConfig(config, preferHttp) {
  if (typeof config !== "object") {
    throw new TypeError(`Expected client configuration as object, got ${typeof config}`);
  }
  let tls = config.tls;
  let authToken = config.authToken;
  let syncUrl = config.syncUrl;
  const intMode = "" + (config.intMode ?? "number");
  if (intMode !== "number" && intMode !== "bigint" && intMode !== "string") {
    throw new TypeError(`Invalid value for intMode, expected "number", "bigint" or "string",             got ${JSON.stringify(intMode)}`);
  }
  if (config.url === ":memory:") {
    return {
      path: ":memory:",
      scheme: "file",
      syncUrl,
      intMode,
      fetch: config.fetch,
      tls: false,
      authToken: undefined,
      authority: undefined
    };
  }
  const uri2 = parseUri(config.url);
  for (const { key, value } of uri2.query?.pairs ?? []) {
    if (key === "authToken") {
      authToken = value ? value : undefined;
    } else if (key === "tls") {
      if (value === "0") {
        tls = false;
      } else if (value === "1") {
        tls = true;
      } else {
        throw new LibsqlError(`Unknown value for the "tls" query argument: ${JSON.stringify(value)}. ` + 'Supported values are "0" and "1"', "URL_INVALID");
      }
    } else {
      throw new LibsqlError(`Unknown URL query parameter ${JSON.stringify(key)}`, "URL_PARAM_NOT_SUPPORTED");
    }
  }
  const uriScheme = uri2.scheme.toLowerCase();
  let scheme;
  if (uriScheme === "libsql") {
    if (tls === false) {
      if (uri2.authority?.port === undefined) {
        throw new LibsqlError('A "libsql:" URL with ?tls=0 must specify an explicit port', "URL_INVALID");
      }
      scheme = preferHttp ? "http" : "ws";
    } else {
      scheme = preferHttp ? "https" : "wss";
    }
  } else if (uriScheme === "http" || uriScheme === "ws") {
    scheme = uriScheme;
    tls ??= false;
  } else if (uriScheme === "https" || uriScheme === "wss" || uriScheme === "file") {
    scheme = uriScheme;
  } else {
    throw new LibsqlError('The client supports only "libsql:", "wss:", "ws:", "https:", "http:" and "file:" URLs, ' + `got ${JSON.stringify(uri2.scheme + ":")}. ` + `For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (uri2.fragment !== undefined) {
    throw new LibsqlError(`URL fragments are not supported: ${JSON.stringify("#" + uri2.fragment)}`, "URL_INVALID");
  }
  return {
    scheme,
    tls: tls ?? true,
    authority: uri2.authority,
    path: uri2.path,
    authToken,
    syncUrl,
    intMode,
    fetch: config.fetch
  };
}

// node_modules/@libsql/client/lib-esm/sqlite3.js
var import_libsql = __toESM(require_libsql(), 1);
import {Buffer as Buffer2} from "buffer";
function _createClient(config2) {
  if (config2.scheme !== "file") {
    throw new LibsqlError(`URL scheme ${JSON.stringify(config2.scheme + ":")} is not supported by the local sqlite3 client. ` + `For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  const authority = config2.authority;
  if (authority !== undefined) {
    const host = authority.host.toLowerCase();
    if (host !== "" && host !== "localhost") {
      throw new LibsqlError(`Invalid host in file URL: ${JSON.stringify(authority.host)}. ` + 'A "file:" URL with an absolute path should start with one slash ("file:/absolute/path.db") or with three slashes ("file:///absolute/path.db"). ' + `For more information, please read ${supportedUrlLink}`, "URL_INVALID");
    }
    if (authority.port !== undefined) {
      throw new LibsqlError("File URL cannot have a port", "URL_INVALID");
    }
    if (authority.userinfo !== undefined) {
      throw new LibsqlError("File URL cannot have username and password", "URL_INVALID");
    }
  }
  const path = config2.path;
  const options2 = {
    authToken: config2.authToken,
    syncUrl: config2.syncUrl
  };
  const db = new import_libsql.default(path, options2);
  executeStmt(db, "SELECT 1 AS checkThatTheDatabaseCanBeOpened", config2.intMode);
  return new Sqlite3Client(path, options2, db, config2.intMode);
}
var executeStmt = function(db, stmt, intMode) {
  let sql7;
  let args;
  if (typeof stmt === "string") {
    sql7 = stmt;
    args = [];
  } else {
    sql7 = stmt.sql;
    if (Array.isArray(stmt.args)) {
      args = stmt.args.map((value) => valueToSql(value, intMode));
    } else {
      args = {};
      for (const name in stmt.args) {
        const argName = name[0] === "@" || name[0] === "$" || name[0] === ":" ? name.substring(1) : name;
        args[argName] = valueToSql(stmt.args[name], intMode);
      }
    }
  }
  try {
    const sqlStmt = db.prepare(sql7);
    sqlStmt.safeIntegers(true);
    let returnsData = true;
    try {
      sqlStmt.raw(true);
    } catch {
      returnsData = false;
    }
    if (returnsData) {
      const columns = Array.from(sqlStmt.columns().map((col) => col.name));
      const columnTypes = Array.from(sqlStmt.columns().map((col) => col.type ?? ""));
      const rows = sqlStmt.all(args).map((sqlRow) => {
        return rowFromSql(sqlRow, columns, intMode);
      });
      const rowsAffected = 0;
      const lastInsertRowid = undefined;
      return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
    } else {
      const info = sqlStmt.run(args);
      const rowsAffected = info.changes;
      const lastInsertRowid = BigInt(info.lastInsertRowid);
      return new ResultSetImpl([], [], [], rowsAffected, lastInsertRowid);
    }
  } catch (e3) {
    throw mapSqliteError(e3);
  }
};
var rowFromSql = function(sqlRow, columns, intMode) {
  const row = {};
  Object.defineProperty(row, "length", { value: sqlRow.length });
  for (let i8 = 0;i8 < sqlRow.length; ++i8) {
    const value = valueFromSql(sqlRow[i8], intMode);
    Object.defineProperty(row, i8, { value });
    const column6 = columns[i8];
    if (!Object.hasOwn(row, column6)) {
      Object.defineProperty(row, column6, { value, enumerable: true });
    }
  }
  return row;
};
var valueFromSql = function(sqlValue, intMode) {
  if (typeof sqlValue === "bigint") {
    if (intMode === "number") {
      if (sqlValue < minSafeBigint || sqlValue > maxSafeBigint) {
        throw new RangeError("Received integer which cannot be safely represented as a JavaScript number");
      }
      return Number(sqlValue);
    } else if (intMode === "bigint") {
      return sqlValue;
    } else if (intMode === "string") {
      return "" + sqlValue;
    } else {
      throw new Error("Invalid value for IntMode");
    }
  } else if (sqlValue instanceof Buffer2) {
    return sqlValue.buffer;
  }
  return sqlValue;
};
var valueToSql = function(value, intMode) {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
    }
    return value;
  } else if (typeof value === "bigint") {
    if (value < minInteger || value > maxInteger) {
      throw new RangeError("bigint is too large to be represented as a 64-bit integer and passed as argument");
    }
    return value;
  } else if (typeof value === "boolean") {
    switch (intMode) {
      case "bigint":
        return value ? 1n : 0n;
      case "string":
        return value ? "1" : "0";
      default:
        return value ? 1 : 0;
    }
  } else if (value instanceof ArrayBuffer) {
    return Buffer2.from(value);
  } else if (value instanceof Date) {
    return value.valueOf();
  } else if (value === undefined) {
    throw new TypeError("undefined cannot be passed as argument to the database");
  } else {
    return value;
  }
};
var executeMultiple = function(db, sql7) {
  try {
    db.exec(sql7);
  } catch (e3) {
    throw mapSqliteError(e3);
  }
};
var mapSqliteError = function(e3) {
  if (e3 instanceof import_libsql.default.SqliteError) {
    return new LibsqlError(e3.message, e3.code, e3.rawCode, e3);
  }
  return e3;
};

class Sqlite3Client {
  #path;
  #options;
  #db;
  #intMode;
  closed;
  protocol;
  constructor(path, options2, db, intMode) {
    this.#path = path;
    this.#options = options2;
    this.#db = db;
    this.#intMode = intMode;
    this.closed = false;
    this.protocol = "file";
  }
  async execute(stmt) {
    this.#checkNotClosed();
    return executeStmt(this.#getDb(), stmt, this.#intMode);
  }
  async batch(stmts, mode = "deferred") {
    this.#checkNotClosed();
    const db = this.#getDb();
    try {
      executeStmt(db, transactionModeToBegin(mode), this.#intMode);
      const resultSets = stmts.map((stmt) => {
        if (!db.inTransaction) {
          throw new LibsqlError("The transaction has been rolled back", "TRANSACTION_CLOSED");
        }
        return executeStmt(db, stmt, this.#intMode);
      });
      executeStmt(db, "COMMIT", this.#intMode);
      return resultSets;
    } finally {
      if (db.inTransaction) {
        executeStmt(db, "ROLLBACK", this.#intMode);
      }
    }
  }
  async transaction(mode = "write") {
    const db = this.#getDb();
    executeStmt(db, transactionModeToBegin(mode), this.#intMode);
    this.#db = null;
    return new Sqlite3Transaction(db, this.#intMode);
  }
  async executeMultiple(sql7) {
    this.#checkNotClosed();
    const db = this.#getDb();
    try {
      return executeMultiple(db, sql7);
    } finally {
      if (db.inTransaction) {
        executeStmt(db, "ROLLBACK", this.#intMode);
      }
    }
  }
  async sync() {
    this.#checkNotClosed();
    await this.#getDb().sync();
  }
  close() {
    this.closed = true;
    if (this.#db !== null) {
      this.#db.close();
    }
  }
  #checkNotClosed() {
    if (this.closed) {
      throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
    }
  }
  #getDb() {
    if (this.#db === null) {
      this.#db = new import_libsql.default(this.#path, this.#options);
    }
    return this.#db;
  }
}

class Sqlite3Transaction {
  #database;
  #intMode;
  constructor(database, intMode) {
    this.#database = database;
    this.#intMode = intMode;
  }
  async execute(stmt) {
    this.#checkNotClosed();
    return executeStmt(this.#database, stmt, this.#intMode);
  }
  async batch(stmts) {
    return stmts.map((stmt) => {
      this.#checkNotClosed();
      return executeStmt(this.#database, stmt, this.#intMode);
    });
  }
  async executeMultiple(sql7) {
    this.#checkNotClosed();
    return executeMultiple(this.#database, sql7);
  }
  async rollback() {
    if (!this.#database.open) {
      return;
    }
    this.#checkNotClosed();
    executeStmt(this.#database, "ROLLBACK", this.#intMode);
  }
  async commit() {
    this.#checkNotClosed();
    executeStmt(this.#database, "COMMIT", this.#intMode);
  }
  close() {
    if (this.#database.inTransaction) {
      executeStmt(this.#database, "ROLLBACK", this.#intMode);
    }
  }
  get closed() {
    return !this.#database.inTransaction;
  }
  #checkNotClosed() {
    if (this.closed) {
      throw new LibsqlError("The transaction is closed", "TRANSACTION_CLOSED");
    }
  }
}
var minSafeBigint = -9007199254740991n;
var maxSafeBigint = 9007199254740991n;
var minInteger = -9223372036854775808n;
var maxInteger = 9223372036854775807n;

// node_modules/@libsql/isomorphic-ws/web.mjs
var _WebSocket;
if (typeof WebSocket !== "undefined") {
  _WebSocket = WebSocket;
} else if (typeof global !== "undefined") {
  _WebSocket = global.WebSocket;
} else if (typeof window !== "undefined") {
  _WebSocket = window.WebSocket;
} else if (typeof self !== "undefined") {
  _WebSocket = self.WebSocket;
}

// node_modules/@libsql/hrana-client/lib-esm/client.js
class Client {
  constructor() {
    this.intMode = "number";
  }
  intMode;
}

// node_modules/@libsql/hrana-client/lib-esm/errors.js
class ClientError extends Error {
  constructor(message) {
    super(message);
    this.name = "ClientError";
  }
}

class ProtoError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "ProtoError";
  }
}

class ResponseError extends ClientError {
  code;
  proto;
  constructor(message, protoError) {
    super(message);
    this.name = "ResponseError";
    this.code = protoError.code;
    this.proto = protoError;
    this.stack = undefined;
  }
}

class ClosedError extends ClientError {
  constructor(message, cause) {
    if (cause !== undefined) {
      super(`${message}: ${cause}`);
      this.cause = cause;
    } else {
      super(message);
    }
    this.name = "ClosedError";
  }
}

class WebSocketUnsupportedError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "WebSocketUnsupportedError";
  }
}

class WebSocketError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "WebSocketError";
  }
}

class HttpServerError extends ClientError {
  status;
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "HttpServerError";
  }
}
class ProtocolVersionError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "ProtocolVersionError";
  }
}

class InternalError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "InternalError";
  }
}

class MisuseError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "MisuseError";
  }
}

// node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js
function string(value) {
  if (typeof value === "string") {
    return value;
  }
  throw typeError(value, "string");
}
function stringOpt(value) {
  if (value === null || value === undefined) {
    return;
  } else if (typeof value === "string") {
    return value;
  }
  throw typeError(value, "string or null");
}
function number(value) {
  if (typeof value === "number") {
    return value;
  }
  throw typeError(value, "number");
}
function boolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  throw typeError(value, "boolean");
}
function array(value) {
  if (Array.isArray(value)) {
    return value;
  }
  throw typeError(value, "array");
}
function object(value) {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  throw typeError(value, "object");
}
function arrayObjectsMap(value, fun) {
  return array(value).map((elemValue) => fun(object(elemValue)));
}
var typeError = function(value, expected) {
  if (value === undefined) {
    return new ProtoError(`Expected ${expected}, but the property was missing`);
  }
  let received = typeof value;
  if (value === null) {
    received = "null";
  } else if (Array.isArray(value)) {
    received = "array";
  }
  return new ProtoError(`Expected ${expected}, received ${received}`);
};
function readJsonObject(value, fun) {
  return fun(object(value));
}
// node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js
function writeJsonObject(value, fun) {
  const output = [];
  const writer = new ObjectWriter(output);
  writer.begin();
  fun(writer, value);
  writer.end();
  return output.join("");
}

class ObjectWriter {
  #output;
  #isFirst;
  constructor(output) {
    this.#output = output;
    this.#isFirst = false;
  }
  begin() {
    this.#output.push("{");
    this.#isFirst = true;
  }
  end() {
    this.#output.push("}");
    this.#isFirst = false;
  }
  #key(name) {
    if (this.#isFirst) {
      this.#output.push('"');
      this.#isFirst = false;
    } else {
      this.#output.push(',"');
    }
    this.#output.push(name);
    this.#output.push('":');
  }
  string(name, value) {
    this.#key(name);
    this.#output.push(JSON.stringify(value));
  }
  stringRaw(name, value) {
    this.#key(name);
    this.#output.push('"');
    this.#output.push(value);
    this.#output.push('"');
  }
  number(name, value) {
    this.#key(name);
    this.#output.push("" + value);
  }
  boolean(name, value) {
    this.#key(name);
    this.#output.push(value ? "true" : "false");
  }
  object(name, value, valueFun) {
    this.#key(name);
    this.begin();
    valueFun(this, value);
    this.end();
  }
  arrayObjects(name, values, valueFun) {
    this.#key(name);
    this.#output.push("[");
    for (let i8 = 0;i8 < values.length; ++i8) {
      if (i8 !== 0) {
        this.#output.push(",");
      }
      this.begin();
      valueFun(this, values[i8]);
      this.end();
    }
    this.#output.push("]");
  }
}
// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/util.js
var VARINT = 0;
var FIXED_64 = 1;
var LENGTH_DELIMITED = 2;
var FIXED_32 = 5;

// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js
function readProtobufMessage(data, def) {
  const msgReader = new MessageReader(data);
  const fieldReader = new FieldReader(msgReader);
  let value = def.default();
  while (!msgReader.eof()) {
    const key = msgReader.varint();
    const tag = key >> 3;
    const wireType = key & 7;
    fieldReader.setup(wireType);
    const tagFun = def[tag];
    if (tagFun !== undefined) {
      const returnedValue = tagFun(fieldReader, value);
      if (returnedValue !== undefined) {
        value = returnedValue;
      }
    }
    fieldReader.maybeSkip();
  }
  return value;
}

class MessageReader {
  #array;
  #view;
  #pos;
  constructor(array2) {
    this.#array = array2;
    this.#view = new DataView(array2.buffer, array2.byteOffset, array2.byteLength);
    this.#pos = 0;
  }
  varint() {
    let value = 0;
    for (let shift = 0;; shift += 7) {
      const byte = this.#array[this.#pos++];
      value |= (byte & 127) << shift;
      if (!(byte & 128)) {
        break;
      }
    }
    return value;
  }
  varintBig() {
    let value = 0n;
    for (let shift = 0n;; shift += 7n) {
      const byte = this.#array[this.#pos++];
      value |= BigInt(byte & 127) << shift;
      if (!(byte & 128)) {
        break;
      }
    }
    return value;
  }
  bytes(length) {
    const array2 = new Uint8Array(this.#array.buffer, this.#array.byteOffset + this.#pos, length);
    this.#pos += length;
    return array2;
  }
  double() {
    const value = this.#view.getFloat64(this.#pos, true);
    this.#pos += 8;
    return value;
  }
  skipVarint() {
    for (;; ) {
      const byte = this.#array[this.#pos++];
      if (!(byte & 128)) {
        break;
      }
    }
  }
  skip(count) {
    this.#pos += count;
  }
  eof() {
    return this.#pos >= this.#array.byteLength;
  }
}

class FieldReader {
  #reader;
  #wireType;
  constructor(reader) {
    this.#reader = reader;
    this.#wireType = -1;
  }
  setup(wireType) {
    this.#wireType = wireType;
  }
  #expect(expectedWireType) {
    if (this.#wireType !== expectedWireType) {
      throw new ProtoError(`Expected wire type ${expectedWireType}, got ${this.#wireType}`);
    }
    this.#wireType = -1;
  }
  bytes() {
    this.#expect(LENGTH_DELIMITED);
    const length = this.#reader.varint();
    return this.#reader.bytes(length);
  }
  string() {
    return new TextDecoder().decode(this.bytes());
  }
  message(def) {
    return readProtobufMessage(this.bytes(), def);
  }
  int32() {
    this.#expect(VARINT);
    return this.#reader.varint();
  }
  uint32() {
    return this.int32();
  }
  bool() {
    return this.int32() !== 0;
  }
  uint64() {
    this.#expect(VARINT);
    return this.#reader.varintBig();
  }
  sint64() {
    const value = this.uint64();
    return value >> 1n ^ -(value & 1n);
  }
  double() {
    this.#expect(FIXED_64);
    return this.#reader.double();
  }
  maybeSkip() {
    if (this.#wireType < 0) {
      return;
    } else if (this.#wireType === VARINT) {
      this.#reader.skipVarint();
    } else if (this.#wireType === FIXED_64) {
      this.#reader.skip(8);
    } else if (this.#wireType === LENGTH_DELIMITED) {
      const length = this.#reader.varint();
      this.#reader.skip(length);
    } else if (this.#wireType === FIXED_32) {
      this.#reader.skip(4);
    } else {
      throw new ProtoError(`Unexpected wire type ${this.#wireType}`);
    }
    this.#wireType = -1;
  }
}
// node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js
function writeProtobufMessage(value, fun) {
  const w = new MessageWriter;
  fun(w, value);
  return w.data();
}

class MessageWriter {
  #buf;
  #array;
  #view;
  #pos;
  constructor() {
    this.#buf = new ArrayBuffer(256);
    this.#array = new Uint8Array(this.#buf);
    this.#view = new DataView(this.#buf);
    this.#pos = 0;
  }
  #ensure(extra) {
    if (this.#pos + extra <= this.#buf.byteLength) {
      return;
    }
    let newCap = this.#buf.byteLength;
    while (newCap < this.#pos + extra) {
      newCap *= 2;
    }
    const newBuf = new ArrayBuffer(newCap);
    const newArray = new Uint8Array(newBuf);
    const newView = new DataView(newBuf);
    newArray.set(new Uint8Array(this.#buf, 0, this.#pos));
    this.#buf = newBuf;
    this.#array = newArray;
    this.#view = newView;
  }
  #varint(value) {
    this.#ensure(5);
    value = 0 | value;
    do {
      let byte = value & 127;
      value >>>= 7;
      byte |= value ? 128 : 0;
      this.#array[this.#pos++] = byte;
    } while (value);
  }
  #varintBig(value) {
    this.#ensure(10);
    value = value & 0xffffffffffffffffn;
    do {
      let byte = Number(value & 0x7fn);
      value >>= 7n;
      byte |= value ? 128 : 0;
      this.#array[this.#pos++] = byte;
    } while (value);
  }
  #tag(tag, wireType) {
    this.#varint(tag << 3 | wireType);
  }
  bytes(tag, value) {
    this.#tag(tag, LENGTH_DELIMITED);
    this.#varint(value.byteLength);
    this.#ensure(value.byteLength);
    this.#array.set(value, this.#pos);
    this.#pos += value.byteLength;
  }
  string(tag, value) {
    this.bytes(tag, new TextEncoder().encode(value));
  }
  message(tag, value, fun) {
    const writer = new MessageWriter;
    fun(writer, value);
    this.bytes(tag, writer.data());
  }
  int32(tag, value) {
    this.#tag(tag, VARINT);
    this.#varint(value);
  }
  uint32(tag, value) {
    this.int32(tag, value);
  }
  bool(tag, value) {
    this.int32(tag, value ? 1 : 0);
  }
  sint64(tag, value) {
    this.#tag(tag, VARINT);
    this.#varintBig(value << 1n ^ value >> 63n);
  }
  double(tag, value) {
    this.#tag(tag, FIXED_64);
    this.#ensure(8);
    this.#view.setFloat64(this.#pos, value, true);
    this.#pos += 8;
  }
  data() {
    return new Uint8Array(this.#buf, 0, this.#pos);
  }
}
// node_modules/@libsql/hrana-client/lib-esm/id_alloc.js
class IdAlloc {
  #usedIds;
  #freeIds;
  constructor() {
    this.#usedIds = new Set;
    this.#freeIds = new Set;
  }
  alloc() {
    for (const freeId2 of this.#freeIds) {
      this.#freeIds.delete(freeId2);
      this.#usedIds.add(freeId2);
      if (!this.#usedIds.has(this.#usedIds.size - 1)) {
        this.#freeIds.add(this.#usedIds.size - 1);
      }
      return freeId2;
    }
    const freeId = this.#usedIds.size;
    this.#usedIds.add(freeId);
    return freeId;
  }
  free(id) {
    if (!this.#usedIds.delete(id)) {
      throw new InternalError("Freeing an id that is not allocated");
    }
    this.#freeIds.delete(this.#usedIds.size);
    if (id < this.#usedIds.size) {
      this.#freeIds.add(id);
    }
  }
}

// node_modules/@libsql/hrana-client/lib-esm/util.js
function impossible(value, message) {
  throw new InternalError(message);
}

// node_modules/@libsql/hrana-client/lib-esm/value.js
function valueToProto(value) {
  if (value === null) {
    return null;
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
    }
    return value;
  } else if (typeof value === "bigint") {
    if (value < minInteger2 || value > maxInteger2) {
      throw new RangeError("This bigint value is too large to be represented as a 64-bit integer and passed as argument");
    }
    return value;
  } else if (typeof value === "boolean") {
    return value ? 1n : 0n;
  } else if (value instanceof ArrayBuffer) {
    return new Uint8Array(value);
  } else if (value instanceof Uint8Array) {
    return value;
  } else if (value instanceof Date) {
    return +value.valueOf();
  } else if (typeof value === "object") {
    return "" + value.toString();
  } else {
    throw new TypeError("Unsupported type of value");
  }
}
function valueFromProto(value, intMode) {
  if (value === null) {
    return null;
  } else if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "bigint") {
    if (intMode === "number") {
      const num = Number(value);
      if (!Number.isSafeInteger(num)) {
        throw new RangeError("Received integer which is too large to be safely represented as a JavaScript number");
      }
      return num;
    } else if (intMode === "bigint") {
      return value;
    } else if (intMode === "string") {
      return "" + value;
    } else {
      throw new MisuseError("Invalid value for IntMode");
    }
  } else if (value instanceof Uint8Array) {
    return value.slice().buffer;
  } else if (value === undefined) {
    throw new ProtoError("Received unrecognized type of Value");
  } else {
    throw impossible(value, "Impossible type of Value");
  }
}
var minInteger2 = -9223372036854775808n;
var maxInteger2 = 9223372036854775807n;

// node_modules/@libsql/hrana-client/lib-esm/result.js
function stmtResultFromProto(result) {
  return {
    affectedRowCount: result.affectedRowCount,
    lastInsertRowid: result.lastInsertRowid,
    columnNames: result.cols.map((col) => col.name),
    columnDecltypes: result.cols.map((col) => col.decltype)
  };
}
function rowsResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  const rows = result.rows.map((row) => rowFromProto(stmtResult.columnNames, row, intMode));
  return { ...stmtResult, rows };
}
function rowResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  let row;
  if (result.rows.length > 0) {
    row = rowFromProto(stmtResult.columnNames, result.rows[0], intMode);
  }
  return { ...stmtResult, row };
}
function valueResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  let value2;
  if (result.rows.length > 0 && stmtResult.columnNames.length > 0) {
    value2 = valueFromProto(result.rows[0][0], intMode);
  }
  return { ...stmtResult, value: value2 };
}
var rowFromProto = function(colNames, values, intMode) {
  const row = {};
  Object.defineProperty(row, "length", { value: values.length });
  for (let i8 = 0;i8 < values.length; ++i8) {
    const value2 = valueFromProto(values[i8], intMode);
    Object.defineProperty(row, i8, { value: value2 });
    const colName = colNames[i8];
    if (colName !== undefined && !Object.hasOwn(row, colName)) {
      Object.defineProperty(row, colName, { value: value2, enumerable: true });
    }
  }
  return row;
};
function errorFromProto(error) {
  return new ResponseError(error.message, error);
}

// node_modules/@libsql/hrana-client/lib-esm/sql.js
function sqlToProto(owner, sql7) {
  if (sql7 instanceof Sql) {
    return { sqlId: sql7._getSqlId(owner) };
  } else {
    return { sql: "" + sql7 };
  }
}

class Sql {
  #owner;
  #sqlId;
  #closed;
  constructor(owner, sqlId) {
    this.#owner = owner;
    this.#sqlId = sqlId;
    this.#closed = undefined;
  }
  _getSqlId(owner) {
    if (this.#owner !== owner) {
      throw new MisuseError("Attempted to use SQL text opened with other object");
    } else if (this.#closed !== undefined) {
      throw new ClosedError("SQL text is closed", this.#closed);
    }
    return this.#sqlId;
  }
  close() {
    this._setClosed(new ClientError("SQL text was manually closed"));
  }
  _setClosed(error) {
    if (this.#closed === undefined) {
      this.#closed = error;
      this.#owner._closeSql(this.#sqlId);
    }
  }
  get closed() {
    return this.#closed !== undefined;
  }
}

// node_modules/@libsql/hrana-client/lib-esm/queue.js
class Queue {
  #pushStack;
  #shiftStack;
  constructor() {
    this.#pushStack = [];
    this.#shiftStack = [];
  }
  get length() {
    return this.#pushStack.length + this.#shiftStack.length;
  }
  push(elem) {
    this.#pushStack.push(elem);
  }
  shift() {
    if (this.#shiftStack.length === 0 && this.#pushStack.length > 0) {
      this.#shiftStack = this.#pushStack.reverse();
      this.#pushStack = [];
    }
    return this.#shiftStack.pop();
  }
  first() {
    return this.#shiftStack.length !== 0 ? this.#shiftStack[this.#shiftStack.length - 1] : this.#pushStack[0];
  }
}

// node_modules/@libsql/hrana-client/lib-esm/stmt.js
function stmtToProto(sqlOwner, stmt, wantRows) {
  let inSql;
  let args = [];
  let namedArgs = [];
  if (stmt instanceof Stmt) {
    inSql = stmt.sql;
    args = stmt._args;
    for (const [name, value3] of stmt._namedArgs.entries()) {
      namedArgs.push({ name, value: value3 });
    }
  } else if (Array.isArray(stmt)) {
    inSql = stmt[0];
    if (Array.isArray(stmt[1])) {
      args = stmt[1].map((arg) => valueToProto(arg));
    } else {
      namedArgs = Object.entries(stmt[1]).map(([name, value3]) => {
        return { name, value: valueToProto(value3) };
      });
    }
  } else {
    inSql = stmt;
  }
  const { sql: sql8, sqlId } = sqlToProto(sqlOwner, inSql);
  return { sql: sql8, sqlId, args, namedArgs, wantRows };
}

class Stmt {
  sql;
  _args;
  _namedArgs;
  constructor(sql8) {
    this.sql = sql8;
    this._args = [];
    this._namedArgs = new Map;
  }
  bindIndexes(values) {
    this._args.length = 0;
    for (const value3 of values) {
      this._args.push(valueToProto(value3));
    }
    return this;
  }
  bindIndex(index, value3) {
    if (index !== (index | 0) || index <= 0) {
      throw new RangeError("Index of a positional argument must be positive integer");
    }
    while (this._args.length < index) {
      this._args.push(null);
    }
    this._args[index - 1] = valueToProto(value3);
    return this;
  }
  bindName(name, value3) {
    this._namedArgs.set(name, valueToProto(value3));
    return this;
  }
  unbindAll() {
    this._args.length = 0;
    this._namedArgs.clear();
    return this;
  }
}

// node_modules/@libsql/hrana-client/lib-esm/batch.js
var executeRegular = function(stream, steps, batch) {
  return stream._batch(batch).then((result2) => {
    for (let step = 0;step < steps.length; ++step) {
      const stepResult = result2.stepResults.get(step);
      const stepError = result2.stepErrors.get(step);
      steps[step].callback(stepResult, stepError);
    }
  });
};
async function executeCursor(stream, steps, batch) {
  const cursor = await stream._openCursor(batch);
  try {
    let nextStep = 0;
    let beginEntry = undefined;
    let rows = [];
    for (;; ) {
      const entry = await cursor.next();
      if (entry === undefined) {
        break;
      }
      if (entry.type === "step_begin") {
        if (entry.step < nextStep || entry.step >= steps.length) {
          throw new ProtoError("Server produced StepBeginEntry for unexpected step");
        } else if (beginEntry !== undefined) {
          throw new ProtoError("Server produced StepBeginEntry before terminating previous step");
        }
        for (let step = nextStep;step < entry.step; ++step) {
          steps[step].callback(undefined, undefined);
        }
        nextStep = entry.step + 1;
        beginEntry = entry;
        rows = [];
      } else if (entry.type === "step_end") {
        if (beginEntry === undefined) {
          throw new ProtoError("Server produced StepEndEntry but no step is active");
        }
        const stmtResult = {
          cols: beginEntry.cols,
          rows,
          affectedRowCount: entry.affectedRowCount,
          lastInsertRowid: entry.lastInsertRowid
        };
        steps[beginEntry.step].callback(stmtResult, undefined);
        beginEntry = undefined;
        rows = [];
      } else if (entry.type === "step_error") {
        if (beginEntry === undefined) {
          if (entry.step >= steps.length) {
            throw new ProtoError("Server produced StepErrorEntry for unexpected step");
          }
          for (let step = nextStep;step < entry.step; ++step) {
            steps[step].callback(undefined, undefined);
          }
        } else {
          if (entry.step !== beginEntry.step) {
            throw new ProtoError("Server produced StepErrorEntry for unexpected step");
          }
          beginEntry = undefined;
          rows = [];
        }
        steps[entry.step].callback(undefined, entry.error);
        nextStep = entry.step + 1;
      } else if (entry.type === "row") {
        if (beginEntry === undefined) {
          throw new ProtoError("Server produced RowEntry but no step is active");
        }
        rows.push(entry.row);
      } else if (entry.type === "error") {
        throw errorFromProto(entry.error);
      } else if (entry.type === "none") {
        throw new ProtoError("Server produced unrecognized CursorEntry");
      } else {
        throw impossible(entry, "Impossible CursorEntry");
      }
    }
    if (beginEntry !== undefined) {
      throw new ProtoError("Server closed Cursor before terminating active step");
    }
    for (let step = nextStep;step < steps.length; ++step) {
      steps[step].callback(undefined, undefined);
    }
  } finally {
    cursor.close();
  }
}
var stepIndex = function(step) {
  if (step._index === undefined) {
    throw new MisuseError("Cannot add a condition referencing a step that has not been added to the batch");
  }
  return step._index;
};
var checkCondBatch = function(expectedBatch, cond) {
  if (cond._batch !== expectedBatch) {
    throw new MisuseError("Cannot mix BatchCond objects for different Batch objects");
  }
};

class Batch {
  _stream;
  #useCursor;
  _steps;
  #executed;
  constructor(stream, useCursor) {
    this._stream = stream;
    this.#useCursor = useCursor;
    this._steps = [];
    this.#executed = false;
  }
  step() {
    return new BatchStep(this);
  }
  execute() {
    if (this.#executed) {
      throw new MisuseError("This batch has already been executed");
    }
    this.#executed = true;
    const batch = {
      steps: this._steps.map((step) => step.proto)
    };
    if (this.#useCursor) {
      return executeCursor(this._stream, this._steps, batch);
    } else {
      return executeRegular(this._stream, this._steps, batch);
    }
  }
}

class BatchStep {
  _batch;
  #conds;
  _index;
  constructor(batch) {
    this._batch = batch;
    this.#conds = [];
    this._index = undefined;
  }
  condition(cond) {
    this.#conds.push(cond._proto);
    return this;
  }
  query(stmt2) {
    return this.#add(stmt2, true, rowsResultFromProto);
  }
  queryRow(stmt2) {
    return this.#add(stmt2, true, rowResultFromProto);
  }
  queryValue(stmt2) {
    return this.#add(stmt2, true, valueResultFromProto);
  }
  run(stmt2) {
    return this.#add(stmt2, false, stmtResultFromProto);
  }
  #add(inStmt, wantRows, fromProto) {
    if (this._index !== undefined) {
      throw new MisuseError("This BatchStep has already been added to the batch");
    }
    const stmt2 = stmtToProto(this._batch._stream._sqlOwner(), inStmt, wantRows);
    let condition;
    if (this.#conds.length === 0) {
      condition = undefined;
    } else if (this.#conds.length === 1) {
      condition = this.#conds[0];
    } else {
      condition = { type: "and", conds: this.#conds.slice() };
    }
    const proto = { stmt: stmt2, condition };
    return new Promise((outputCallback, errorCallback) => {
      const callback = (stepResult, stepError) => {
        if (stepResult !== undefined && stepError !== undefined) {
          errorCallback(new ProtoError("Server returned both result and error"));
        } else if (stepError !== undefined) {
          errorCallback(errorFromProto(stepError));
        } else if (stepResult !== undefined) {
          outputCallback(fromProto(stepResult, this._batch._stream.intMode));
        } else {
          outputCallback(undefined);
        }
      };
      this._index = this._batch._steps.length;
      this._batch._steps.push({ proto, callback });
    });
  }
}

class BatchCond {
  _batch;
  _proto;
  constructor(batch, proto) {
    this._batch = batch;
    this._proto = proto;
  }
  static ok(step) {
    return new BatchCond(step._batch, { type: "ok", step: stepIndex(step) });
  }
  static error(step) {
    return new BatchCond(step._batch, { type: "error", step: stepIndex(step) });
  }
  static not(cond) {
    return new BatchCond(cond._batch, { type: "not", cond: cond._proto });
  }
  static and(batch, conds) {
    for (const cond of conds) {
      checkCondBatch(batch, cond);
    }
    return new BatchCond(batch, { type: "and", conds: conds.map((e3) => e3._proto) });
  }
  static or(batch, conds) {
    for (const cond of conds) {
      checkCondBatch(batch, cond);
    }
    return new BatchCond(batch, { type: "or", conds: conds.map((e3) => e3._proto) });
  }
  static isAutocommit(batch) {
    batch._stream.client()._ensureVersion(3, "BatchCond.isAutocommit()");
    return new BatchCond(batch, { type: "is_autocommit" });
  }
}

// node_modules/@libsql/hrana-client/lib-esm/describe.js
function describeResultFromProto(result2) {
  return {
    paramNames: result2.params.map((p8) => p8.name),
    columns: result2.cols,
    isExplain: result2.isExplain,
    isReadonly: result2.isReadonly
  };
}

// node_modules/@libsql/hrana-client/lib-esm/stream.js
class Stream {
  constructor(intMode) {
    this.intMode = intMode;
  }
  query(stmt3) {
    return this.#execute(stmt3, true, rowsResultFromProto);
  }
  queryRow(stmt3) {
    return this.#execute(stmt3, true, rowResultFromProto);
  }
  queryValue(stmt3) {
    return this.#execute(stmt3, true, valueResultFromProto);
  }
  run(stmt3) {
    return this.#execute(stmt3, false, stmtResultFromProto);
  }
  #execute(inStmt, wantRows, fromProto) {
    const stmt3 = stmtToProto(this._sqlOwner(), inStmt, wantRows);
    return this._execute(stmt3).then((r3) => fromProto(r3, this.intMode));
  }
  batch(useCursor = false) {
    return new Batch(this, useCursor);
  }
  describe(inSql) {
    const protoSql = sqlToProto(this._sqlOwner(), inSql);
    return this._describe(protoSql).then(describeResultFromProto);
  }
  sequence(inSql) {
    const protoSql = sqlToProto(this._sqlOwner(), inSql);
    return this._sequence(protoSql);
  }
  intMode;
}

// node_modules/@libsql/hrana-client/lib-esm/cursor.js
class Cursor {
}

// node_modules/@libsql/hrana-client/lib-esm/ws/cursor.js
var fetchChunkSize = 1000;
var fetchQueueSize = 10;

class WsCursor extends Cursor {
  #client;
  #stream;
  #cursorId;
  #entryQueue;
  #fetchQueue;
  #closed;
  #done;
  constructor(client, stream, cursorId) {
    super();
    this.#client = client;
    this.#stream = stream;
    this.#cursorId = cursorId;
    this.#entryQueue = new Queue;
    this.#fetchQueue = new Queue;
    this.#closed = undefined;
    this.#done = false;
  }
  async next() {
    for (;; ) {
      if (this.#closed !== undefined) {
        throw new ClosedError("Cursor is closed", this.#closed);
      }
      while (!this.#done && this.#fetchQueue.length < fetchQueueSize) {
        this.#fetchQueue.push(this.#fetch());
      }
      const entry = this.#entryQueue.shift();
      if (this.#done || entry !== undefined) {
        return entry;
      }
      await this.#fetchQueue.shift().then((response) => {
        if (response === undefined) {
          return;
        }
        for (const entry2 of response.entries) {
          this.#entryQueue.push(entry2);
        }
        this.#done ||= response.done;
      });
    }
  }
  #fetch() {
    return this.#stream._sendCursorRequest(this, {
      type: "fetch_cursor",
      cursorId: this.#cursorId,
      maxCount: fetchChunkSize
    }).then((resp) => resp, (error) => {
      this._setClosed(error);
      return;
    });
  }
  _setClosed(error) {
    if (this.#closed !== undefined) {
      return;
    }
    this.#closed = error;
    this.#stream._sendCursorRequest(this, {
      type: "close_cursor",
      cursorId: this.#cursorId
    }).catch(() => {
      return;
    });
    this.#stream._cursorClosed(this);
  }
  close() {
    this._setClosed(new ClientError("Cursor was manually closed"));
  }
  get closed() {
    return this.#closed !== undefined;
  }
}

// node_modules/@libsql/hrana-client/lib-esm/ws/stream.js
class WsStream extends Stream {
  #client;
  #streamId;
  #queue;
  #cursor;
  #closing;
  #closed;
  static open(client) {
    const streamId = client._streamIdAlloc.alloc();
    const stream2 = new WsStream(client, streamId);
    const responseCallback = () => {
      return;
    };
    const errorCallback = (e3) => stream2.#setClosed(e3);
    const request = { type: "open_stream", streamId };
    client._sendRequest(request, { responseCallback, errorCallback });
    return stream2;
  }
  constructor(client, streamId) {
    super(client.intMode);
    this.#client = client;
    this.#streamId = streamId;
    this.#queue = new Queue;
    this.#cursor = undefined;
    this.#closing = false;
    this.#closed = undefined;
  }
  client() {
    return this.#client;
  }
  _sqlOwner() {
    return this.#client;
  }
  _execute(stmt3) {
    return this.#sendStreamRequest({
      type: "execute",
      streamId: this.#streamId,
      stmt: stmt3
    }).then((response) => {
      return response.result;
    });
  }
  _batch(batch2) {
    return this.#sendStreamRequest({
      type: "batch",
      streamId: this.#streamId,
      batch: batch2
    }).then((response) => {
      return response.result;
    });
  }
  _describe(protoSql) {
    this.#client._ensureVersion(2, "describe()");
    return this.#sendStreamRequest({
      type: "describe",
      streamId: this.#streamId,
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((response) => {
      return response.result;
    });
  }
  _sequence(protoSql) {
    this.#client._ensureVersion(2, "sequence()");
    return this.#sendStreamRequest({
      type: "sequence",
      streamId: this.#streamId,
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((_response) => {
      return;
    });
  }
  getAutocommit() {
    this.#client._ensureVersion(3, "getAutocommit()");
    return this.#sendStreamRequest({
      type: "get_autocommit",
      streamId: this.#streamId
    }).then((response) => {
      return response.isAutocommit;
    });
  }
  #sendStreamRequest(request) {
    return new Promise((responseCallback, errorCallback) => {
      this.#pushToQueue({ type: "request", request, responseCallback, errorCallback });
    });
  }
  _openCursor(batch2) {
    this.#client._ensureVersion(3, "cursor");
    return new Promise((cursorCallback, errorCallback) => {
      this.#pushToQueue({ type: "cursor", batch: batch2, cursorCallback, errorCallback });
    });
  }
  _sendCursorRequest(cursor3, request) {
    if (cursor3 !== this.#cursor) {
      throw new InternalError("Cursor not associated with the stream attempted to execute a request");
    }
    return new Promise((responseCallback, errorCallback) => {
      if (this.#closed !== undefined) {
        errorCallback(new ClosedError("Stream is closed", this.#closed));
      } else {
        this.#client._sendRequest(request, { responseCallback, errorCallback });
      }
    });
  }
  _cursorClosed(cursor3) {
    if (cursor3 !== this.#cursor) {
      throw new InternalError("Cursor was closed, but it was not associated with the stream");
    }
    this.#cursor = undefined;
    this.#flushQueue();
  }
  #pushToQueue(entry) {
    if (this.#closed !== undefined) {
      entry.errorCallback(new ClosedError("Stream is closed", this.#closed));
    } else if (this.#closing) {
      entry.errorCallback(new ClosedError("Stream is closing", undefined));
    } else {
      this.#queue.push(entry);
      this.#flushQueue();
    }
  }
  #flushQueue() {
    for (;; ) {
      const entry = this.#queue.first();
      if (entry === undefined && this.#cursor === undefined && this.#closing) {
        this.#setClosed(new ClientError("Stream was gracefully closed"));
        break;
      } else if (entry?.type === "request" && this.#cursor === undefined) {
        const { request, responseCallback, errorCallback } = entry;
        this.#queue.shift();
        this.#client._sendRequest(request, { responseCallback, errorCallback });
      } else if (entry?.type === "cursor" && this.#cursor === undefined) {
        const { batch: batch2, cursorCallback } = entry;
        this.#queue.shift();
        const cursorId = this.#client._cursorIdAlloc.alloc();
        const cursor3 = new WsCursor(this.#client, this, cursorId);
        const request = {
          type: "open_cursor",
          streamId: this.#streamId,
          cursorId,
          batch: batch2
        };
        const responseCallback = () => {
          return;
        };
        const errorCallback = (e3) => cursor3._setClosed(e3);
        this.#client._sendRequest(request, { responseCallback, errorCallback });
        this.#cursor = cursor3;
        cursorCallback(cursor3);
      } else {
        break;
      }
    }
  }
  #setClosed(error) {
    if (this.#closed !== undefined) {
      return;
    }
    this.#closed = error;
    if (this.#cursor !== undefined) {
      this.#cursor._setClosed(error);
    }
    for (;; ) {
      const entry = this.#queue.shift();
      if (entry !== undefined) {
        entry.errorCallback(error);
      } else {
        break;
      }
    }
    const request = { type: "close_stream", streamId: this.#streamId };
    const responseCallback = () => this.#client._streamIdAlloc.free(this.#streamId);
    const errorCallback = () => {
      return;
    };
    this.#client._sendRequest(request, { responseCallback, errorCallback });
  }
  close() {
    this.#setClosed(new ClientError("Stream was manually closed"));
  }
  closeGracefully() {
    this.#closing = true;
    this.#flushQueue();
  }
  get closed() {
    return this.#closed !== undefined || this.#closing;
  }
}

// node_modules/@libsql/hrana-client/lib-esm/shared/json_encode.js
function Stmt2(w, msg) {
  if (msg.sql !== undefined) {
    w.string("sql", msg.sql);
  }
  if (msg.sqlId !== undefined) {
    w.number("sql_id", msg.sqlId);
  }
  w.arrayObjects("args", msg.args, Value);
  w.arrayObjects("named_args", msg.namedArgs, NamedArg);
  w.boolean("want_rows", msg.wantRows);
}
var NamedArg = function(w, msg) {
  w.string("name", msg.name);
  w.object("value", msg.value, Value);
};
function Batch2(w, msg) {
  w.arrayObjects("steps", msg.steps, BatchStep2);
}
var BatchStep2 = function(w, msg) {
  if (msg.condition !== undefined) {
    w.object("condition", msg.condition, BatchCond2);
  }
  w.object("stmt", msg.stmt, Stmt2);
};
var BatchCond2 = function(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "ok" || msg.type === "error") {
    w.number("step", msg.step);
  } else if (msg.type === "not") {
    w.object("cond", msg.cond, BatchCond2);
  } else if (msg.type === "and" || msg.type === "or") {
    w.arrayObjects("conds", msg.conds, BatchCond2);
  } else if (msg.type === "is_autocommit") {
  } else {
    throw impossible(msg, "Impossible type of BatchCond");
  }
};
var Value = function(w, msg) {
  if (msg === null) {
    w.stringRaw("type", "null");
  } else if (typeof msg === "bigint") {
    w.stringRaw("type", "integer");
    w.stringRaw("value", "" + msg);
  } else if (typeof msg === "number") {
    w.stringRaw("type", "float");
    w.number("value", msg);
  } else if (typeof msg === "string") {
    w.stringRaw("type", "text");
    w.string("value", msg);
  } else if (msg instanceof Uint8Array) {
    w.stringRaw("type", "blob");
    w.stringRaw("base64", gBase64.fromUint8Array(msg));
  } else if (msg === undefined) {
  } else {
    throw impossible(msg, "Impossible type of Value");
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/json_encode.js
function ClientMsg(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "hello") {
    if (msg.jwt !== undefined) {
      w.string("jwt", msg.jwt);
    }
  } else if (msg.type === "request") {
    w.number("request_id", msg.requestId);
    w.object("request", msg.request, Request2);
  } else {
    throw impossible(msg, "Impossible type of ClientMsg");
  }
}
var Request2 = function(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "open_stream") {
    w.number("stream_id", msg.streamId);
  } else if (msg.type === "close_stream") {
    w.number("stream_id", msg.streamId);
  } else if (msg.type === "execute") {
    w.number("stream_id", msg.streamId);
    w.object("stmt", msg.stmt, Stmt2);
  } else if (msg.type === "batch") {
    w.number("stream_id", msg.streamId);
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "open_cursor") {
    w.number("stream_id", msg.streamId);
    w.number("cursor_id", msg.cursorId);
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "close_cursor") {
    w.number("cursor_id", msg.cursorId);
  } else if (msg.type === "fetch_cursor") {
    w.number("cursor_id", msg.cursorId);
    w.number("max_count", msg.maxCount);
  } else if (msg.type === "sequence") {
    w.number("stream_id", msg.streamId);
    if (msg.sql !== undefined) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== undefined) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "describe") {
    w.number("stream_id", msg.streamId);
    if (msg.sql !== undefined) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== undefined) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "store_sql") {
    w.number("sql_id", msg.sqlId);
    w.string("sql", msg.sql);
  } else if (msg.type === "close_sql") {
    w.number("sql_id", msg.sqlId);
  } else if (msg.type === "get_autocommit") {
    w.number("stream_id", msg.streamId);
  } else {
    throw impossible(msg, "Impossible type of Request");
  }
};

// node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_encode.js
function Stmt3(w, msg) {
  if (msg.sql !== undefined) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== undefined) {
    w.int32(2, msg.sqlId);
  }
  for (const arg of msg.args) {
    w.message(3, arg, Value2);
  }
  for (const arg of msg.namedArgs) {
    w.message(4, arg, NamedArg2);
  }
  w.bool(5, msg.wantRows);
}
var NamedArg2 = function(w, msg) {
  w.string(1, msg.name);
  w.message(2, msg.value, Value2);
};
function Batch3(w, msg) {
  for (const step of msg.steps) {
    w.message(1, step, BatchStep3);
  }
}
var BatchStep3 = function(w, msg) {
  if (msg.condition !== undefined) {
    w.message(1, msg.condition, BatchCond3);
  }
  w.message(2, msg.stmt, Stmt3);
};
var BatchCond3 = function(w, msg) {
  if (msg.type === "ok") {
    w.uint32(1, msg.step);
  } else if (msg.type === "error") {
    w.uint32(2, msg.step);
  } else if (msg.type === "not") {
    w.message(3, msg.cond, BatchCond3);
  } else if (msg.type === "and") {
    w.message(4, msg.conds, BatchCondList);
  } else if (msg.type === "or") {
    w.message(5, msg.conds, BatchCondList);
  } else if (msg.type === "is_autocommit") {
    w.message(6, undefined, Empty);
  } else {
    throw impossible(msg, "Impossible type of BatchCond");
  }
};
var BatchCondList = function(w, msg) {
  for (const cond of msg) {
    w.message(1, cond, BatchCond3);
  }
};
var Value2 = function(w, msg) {
  if (msg === null) {
    w.message(1, undefined, Empty);
  } else if (typeof msg === "bigint") {
    w.sint64(2, msg);
  } else if (typeof msg === "number") {
    w.double(3, msg);
  } else if (typeof msg === "string") {
    w.string(4, msg);
  } else if (msg instanceof Uint8Array) {
    w.bytes(5, msg);
  } else if (msg === undefined) {
  } else {
    throw impossible(msg, "Impossible type of Value");
  }
};
var Empty = function(_w, _msg) {
};

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_encode.js
function ClientMsg2(w, msg) {
  if (msg.type === "hello") {
    w.message(1, msg, HelloMsg);
  } else if (msg.type === "request") {
    w.message(2, msg, RequestMsg);
  } else {
    throw impossible(msg, "Impossible type of ClientMsg");
  }
}
var HelloMsg = function(w, msg) {
  if (msg.jwt !== undefined) {
    w.string(1, msg.jwt);
  }
};
var RequestMsg = function(w, msg) {
  w.int32(1, msg.requestId);
  const request = msg.request;
  if (request.type === "open_stream") {
    w.message(2, request, OpenStreamReq);
  } else if (request.type === "close_stream") {
    w.message(3, request, CloseStreamReq);
  } else if (request.type === "execute") {
    w.message(4, request, ExecuteReq);
  } else if (request.type === "batch") {
    w.message(5, request, BatchReq);
  } else if (request.type === "open_cursor") {
    w.message(6, request, OpenCursorReq);
  } else if (request.type === "close_cursor") {
    w.message(7, request, CloseCursorReq);
  } else if (request.type === "fetch_cursor") {
    w.message(8, request, FetchCursorReq);
  } else if (request.type === "sequence") {
    w.message(9, request, SequenceReq);
  } else if (request.type === "describe") {
    w.message(10, request, DescribeReq);
  } else if (request.type === "store_sql") {
    w.message(11, request, StoreSqlReq);
  } else if (request.type === "close_sql") {
    w.message(12, request, CloseSqlReq);
  } else if (request.type === "get_autocommit") {
    w.message(13, request, GetAutocommitReq);
  } else {
    throw impossible(request, "Impossible type of Request");
  }
};
var OpenStreamReq = function(w, msg) {
  w.int32(1, msg.streamId);
};
var CloseStreamReq = function(w, msg) {
  w.int32(1, msg.streamId);
};
var ExecuteReq = function(w, msg) {
  w.int32(1, msg.streamId);
  w.message(2, msg.stmt, Stmt3);
};
var BatchReq = function(w, msg) {
  w.int32(1, msg.streamId);
  w.message(2, msg.batch, Batch3);
};
var OpenCursorReq = function(w, msg) {
  w.int32(1, msg.streamId);
  w.int32(2, msg.cursorId);
  w.message(3, msg.batch, Batch3);
};
var CloseCursorReq = function(w, msg) {
  w.int32(1, msg.cursorId);
};
var FetchCursorReq = function(w, msg) {
  w.int32(1, msg.cursorId);
  w.uint32(2, msg.maxCount);
};
var SequenceReq = function(w, msg) {
  w.int32(1, msg.streamId);
  if (msg.sql !== undefined) {
    w.string(2, msg.sql);
  }
  if (msg.sqlId !== undefined) {
    w.int32(3, msg.sqlId);
  }
};
var DescribeReq = function(w, msg) {
  w.int32(1, msg.streamId);
  if (msg.sql !== undefined) {
    w.string(2, msg.sql);
  }
  if (msg.sqlId !== undefined) {
    w.int32(3, msg.sqlId);
  }
};
var StoreSqlReq = function(w, msg) {
  w.int32(1, msg.sqlId);
  w.string(2, msg.sql);
};
var CloseSqlReq = function(w, msg) {
  w.int32(1, msg.sqlId);
};
var GetAutocommitReq = function(w, msg) {
  w.int32(1, msg.streamId);
};

// node_modules/@libsql/hrana-client/lib-esm/shared/json_decode.js
function Error2(obj) {
  const message = string(obj["message"]);
  const code = stringOpt(obj["code"]);
  return { message, code };
}
function StmtResult(obj) {
  const cols = arrayObjectsMap(obj["cols"], Col);
  const rows = array(obj["rows"]).map((rowObj) => arrayObjectsMap(rowObj, Value3));
  const affectedRowCount = number(obj["affected_row_count"]);
  const lastInsertRowidStr = stringOpt(obj["last_insert_rowid"]);
  const lastInsertRowid = lastInsertRowidStr !== undefined ? BigInt(lastInsertRowidStr) : undefined;
  return { cols, rows, affectedRowCount, lastInsertRowid };
}
var Col = function(obj) {
  const name = stringOpt(obj["name"]);
  const decltype = stringOpt(obj["decltype"]);
  return { name, decltype };
};
function BatchResult(obj) {
  const stepResults = new Map;
  array(obj["step_results"]).forEach((value3, i8) => {
    if (value3 !== null) {
      stepResults.set(i8, StmtResult(object(value3)));
    }
  });
  const stepErrors = new Map;
  array(obj["step_errors"]).forEach((value3, i8) => {
    if (value3 !== null) {
      stepErrors.set(i8, Error2(object(value3)));
    }
  });
  return { stepResults, stepErrors };
}
function CursorEntry(obj) {
  const type = string(obj["type"]);
  if (type === "step_begin") {
    const step = number(obj["step"]);
    const cols = arrayObjectsMap(obj["cols"], Col);
    return { type: "step_begin", step, cols };
  } else if (type === "step_end") {
    const affectedRowCount = number(obj["affected_row_count"]);
    const lastInsertRowidStr = stringOpt(obj["last_insert_rowid"]);
    const lastInsertRowid = lastInsertRowidStr !== undefined ? BigInt(lastInsertRowidStr) : undefined;
    return { type: "step_end", affectedRowCount, lastInsertRowid };
  } else if (type === "step_error") {
    const step = number(obj["step"]);
    const error = Error2(object(obj["error"]));
    return { type: "step_error", step, error };
  } else if (type === "row") {
    const row = arrayObjectsMap(obj["row"], Value3);
    return { type: "row", row };
  } else if (type === "error") {
    const error = Error2(object(obj["error"]));
    return { type: "error", error };
  } else {
    throw new ProtoError("Unexpected type of CursorEntry");
  }
}
function DescribeResult(obj) {
  const params = arrayObjectsMap(obj["params"], DescribeParam);
  const cols = arrayObjectsMap(obj["cols"], DescribeCol);
  const isExplain = boolean(obj["is_explain"]);
  const isReadonly = boolean(obj["is_readonly"]);
  return { params, cols, isExplain, isReadonly };
}
var DescribeParam = function(obj) {
  const name = stringOpt(obj["name"]);
  return { name };
};
var DescribeCol = function(obj) {
  const name = string(obj["name"]);
  const decltype = stringOpt(obj["decltype"]);
  return { name, decltype };
};
function Value3(obj) {
  const type = string(obj["type"]);
  if (type === "null") {
    return null;
  } else if (type === "integer") {
    const value3 = string(obj["value"]);
    return BigInt(value3);
  } else if (type === "float") {
    return number(obj["value"]);
  } else if (type === "text") {
    return string(obj["value"]);
  } else if (type === "blob") {
    return gBase64.toUint8Array(string(obj["base64"]));
  } else {
    throw new ProtoError("Unexpected type of Value");
  }
}

// node_modules/@libsql/hrana-client/lib-esm/ws/json_decode.js
function ServerMsg(obj) {
  const type = string(obj["type"]);
  if (type === "hello_ok") {
    return { type: "hello_ok" };
  } else if (type === "hello_error") {
    const error = Error2(object(obj["error"]));
    return { type: "hello_error", error };
  } else if (type === "response_ok") {
    const requestId = number(obj["request_id"]);
    const response = Response2(object(obj["response"]));
    return { type: "response_ok", requestId, response };
  } else if (type === "response_error") {
    const requestId = number(obj["request_id"]);
    const error = Error2(object(obj["error"]));
    return { type: "response_error", requestId, error };
  } else {
    throw new ProtoError("Unexpected type of ServerMsg");
  }
}
var Response2 = function(obj) {
  const type = string(obj["type"]);
  if (type === "open_stream") {
    return { type: "open_stream" };
  } else if (type === "close_stream") {
    return { type: "close_stream" };
  } else if (type === "execute") {
    const result3 = StmtResult(object(obj["result"]));
    return { type: "execute", result: result3 };
  } else if (type === "batch") {
    const result3 = BatchResult(object(obj["result"]));
    return { type: "batch", result: result3 };
  } else if (type === "open_cursor") {
    return { type: "open_cursor" };
  } else if (type === "close_cursor") {
    return { type: "close_cursor" };
  } else if (type === "fetch_cursor") {
    const entries = arrayObjectsMap(obj["entries"], CursorEntry);
    const done = boolean(obj["done"]);
    return { type: "fetch_cursor", entries, done };
  } else if (type === "sequence") {
    return { type: "sequence" };
  } else if (type === "describe") {
    const result3 = DescribeResult(object(obj["result"]));
    return { type: "describe", result: result3 };
  } else if (type === "store_sql") {
    return { type: "store_sql" };
  } else if (type === "close_sql") {
    return { type: "close_sql" };
  } else if (type === "get_autocommit") {
    const isAutocommit = boolean(obj["is_autocommit"]);
    return { type: "get_autocommit", isAutocommit };
  } else {
    throw new ProtoError("Unexpected type of Response");
  }
};

// node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_decode.js
var Error3 = {
  default() {
    return { message: "", code: undefined };
  },
  1(r3, msg) {
    msg.message = r3.string();
  },
  2(r3, msg) {
    msg.code = r3.string();
  }
};
var StmtResult2 = {
  default() {
    return {
      cols: [],
      rows: [],
      affectedRowCount: 0,
      lastInsertRowid: undefined
    };
  },
  1(r3, msg) {
    msg.cols.push(r3.message(Col2));
  },
  2(r3, msg) {
    msg.rows.push(r3.message(Row));
  },
  3(r3, msg) {
    msg.affectedRowCount = Number(r3.uint64());
  },
  4(r3, msg) {
    msg.lastInsertRowid = r3.sint64();
  }
};
var Col2 = {
  default() {
    return { name: undefined, decltype: undefined };
  },
  1(r3, msg) {
    msg.name = r3.string();
  },
  2(r3, msg) {
    msg.decltype = r3.string();
  }
};
var Row = {
  default() {
    return [];
  },
  1(r3, msg) {
    msg.push(r3.message(Value4));
  }
};
var BatchResult2 = {
  default() {
    return { stepResults: new Map, stepErrors: new Map };
  },
  1(r3, msg) {
    const [key, value3] = r3.message(BatchResultStepResult);
    msg.stepResults.set(key, value3);
  },
  2(r3, msg) {
    const [key, value3] = r3.message(BatchResultStepError);
    msg.stepErrors.set(key, value3);
  }
};
var BatchResultStepResult = {
  default() {
    return [0, StmtResult2.default()];
  },
  1(r3, msg) {
    msg[0] = r3.uint32();
  },
  2(r3, msg) {
    msg[1] = r3.message(StmtResult2);
  }
};
var BatchResultStepError = {
  default() {
    return [0, Error3.default()];
  },
  1(r3, msg) {
    msg[0] = r3.uint32();
  },
  2(r3, msg) {
    msg[1] = r3.message(Error3);
  }
};
var CursorEntry2 = {
  default() {
    return { type: "none" };
  },
  1(r3) {
    return r3.message(StepBeginEntry);
  },
  2(r3) {
    return r3.message(StepEndEntry);
  },
  3(r3) {
    return r3.message(StepErrorEntry);
  },
  4(r3) {
    return { type: "row", row: r3.message(Row) };
  },
  5(r3) {
    return { type: "error", error: r3.message(Error3) };
  }
};
var StepBeginEntry = {
  default() {
    return { type: "step_begin", step: 0, cols: [] };
  },
  1(r3, msg) {
    msg.step = r3.uint32();
  },
  2(r3, msg) {
    msg.cols.push(r3.message(Col2));
  }
};
var StepEndEntry = {
  default() {
    return {
      type: "step_end",
      affectedRowCount: 0,
      lastInsertRowid: undefined
    };
  },
  1(r3, msg) {
    msg.affectedRowCount = r3.uint32();
  },
  2(r3, msg) {
    msg.lastInsertRowid = r3.uint64();
  }
};
var StepErrorEntry = {
  default() {
    return {
      type: "step_error",
      step: 0,
      error: Error3.default()
    };
  },
  1(r3, msg) {
    msg.step = r3.uint32();
  },
  2(r3, msg) {
    msg.error = r3.message(Error3);
  }
};
var DescribeResult2 = {
  default() {
    return {
      params: [],
      cols: [],
      isExplain: false,
      isReadonly: false
    };
  },
  1(r3, msg) {
    msg.params.push(r3.message(DescribeParam2));
  },
  2(r3, msg) {
    msg.cols.push(r3.message(DescribeCol2));
  },
  3(r3, msg) {
    msg.isExplain = r3.bool();
  },
  4(r3, msg) {
    msg.isReadonly = r3.bool();
  }
};
var DescribeParam2 = {
  default() {
    return { name: undefined };
  },
  1(r3, msg) {
    msg.name = r3.string();
  }
};
var DescribeCol2 = {
  default() {
    return { name: "", decltype: undefined };
  },
  1(r3, msg) {
    msg.name = r3.string();
  },
  2(r3, msg) {
    msg.decltype = r3.string();
  }
};
var Value4 = {
  default() {
    return;
  },
  1(r3) {
    return null;
  },
  2(r3) {
    return r3.sint64();
  },
  3(r3) {
    return r3.double();
  },
  4(r3) {
    return r3.string();
  },
  5(r3) {
    return r3.bytes();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_decode.js
var ServerMsg2 = {
  default() {
    return { type: "none" };
  },
  1(r3) {
    return { type: "hello_ok" };
  },
  2(r3) {
    return r3.message(HelloErrorMsg);
  },
  3(r3) {
    return r3.message(ResponseOkMsg);
  },
  4(r3) {
    return r3.message(ResponseErrorMsg);
  }
};
var HelloErrorMsg = {
  default() {
    return { type: "hello_error", error: Error3.default() };
  },
  1(r3, msg) {
    msg.error = r3.message(Error3);
  }
};
var ResponseErrorMsg = {
  default() {
    return { type: "response_error", requestId: 0, error: Error3.default() };
  },
  1(r3, msg) {
    msg.requestId = r3.int32();
  },
  2(r3, msg) {
    msg.error = r3.message(Error3);
  }
};
var ResponseOkMsg = {
  default() {
    return {
      type: "response_ok",
      requestId: 0,
      response: { type: "none" }
    };
  },
  1(r3, msg) {
    msg.requestId = r3.int32();
  },
  2(r3, msg) {
    msg.response = { type: "open_stream" };
  },
  3(r3, msg) {
    msg.response = { type: "close_stream" };
  },
  4(r3, msg) {
    msg.response = r3.message(ExecuteResp);
  },
  5(r3, msg) {
    msg.response = r3.message(BatchResp);
  },
  6(r3, msg) {
    msg.response = { type: "open_cursor" };
  },
  7(r3, msg) {
    msg.response = { type: "close_cursor" };
  },
  8(r3, msg) {
    msg.response = r3.message(FetchCursorResp);
  },
  9(r3, msg) {
    msg.response = { type: "sequence" };
  },
  10(r3, msg) {
    msg.response = r3.message(DescribeResp);
  },
  11(r3, msg) {
    msg.response = { type: "store_sql" };
  },
  12(r3, msg) {
    msg.response = { type: "close_sql" };
  },
  13(r3, msg) {
    msg.response = r3.message(GetAutocommitResp);
  }
};
var ExecuteResp = {
  default() {
    return { type: "execute", result: StmtResult2.default() };
  },
  1(r3, msg) {
    msg.result = r3.message(StmtResult2);
  }
};
var BatchResp = {
  default() {
    return { type: "batch", result: BatchResult2.default() };
  },
  1(r3, msg) {
    msg.result = r3.message(BatchResult2);
  }
};
var FetchCursorResp = {
  default() {
    return { type: "fetch_cursor", entries: [], done: false };
  },
  1(r3, msg) {
    msg.entries.push(r3.message(CursorEntry2));
  },
  2(r3, msg) {
    msg.done = r3.bool();
  }
};
var DescribeResp = {
  default() {
    return { type: "describe", result: DescribeResult2.default() };
  },
  1(r3, msg) {
    msg.result = r3.message(DescribeResult2);
  }
};
var GetAutocommitResp = {
  default() {
    return { type: "get_autocommit", isAutocommit: false };
  },
  1(r3, msg) {
    msg.isAutocommit = r3.bool();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/ws/client.js
var subprotocolsV2 = new Map([
  ["hrana2", { version: 2, encoding: "json" }],
  ["hrana1", { version: 1, encoding: "json" }]
]);
var subprotocolsV3 = new Map([
  ["hrana3-protobuf", { version: 3, encoding: "protobuf" }],
  ["hrana3", { version: 3, encoding: "json" }],
  ["hrana2", { version: 2, encoding: "json" }],
  ["hrana1", { version: 1, encoding: "json" }]
]);

class WsClient extends Client {
  #socket;
  #openCallbacks;
  #opened;
  #closed;
  #recvdHello;
  #subprotocol;
  #getVersionCalled;
  #responseMap;
  #requestIdAlloc;
  _streamIdAlloc;
  _cursorIdAlloc;
  #sqlIdAlloc;
  constructor(socket, jwt) {
    super();
    this.#socket = socket;
    this.#openCallbacks = [];
    this.#opened = false;
    this.#closed = undefined;
    this.#recvdHello = false;
    this.#subprotocol = undefined;
    this.#getVersionCalled = false;
    this.#responseMap = new Map;
    this.#requestIdAlloc = new IdAlloc;
    this._streamIdAlloc = new IdAlloc;
    this._cursorIdAlloc = new IdAlloc;
    this.#sqlIdAlloc = new IdAlloc;
    this.#socket.binaryType = "arraybuffer";
    this.#socket.addEventListener("open", () => this.#onSocketOpen());
    this.#socket.addEventListener("close", (event) => this.#onSocketClose(event));
    this.#socket.addEventListener("error", (event) => this.#onSocketError(event));
    this.#socket.addEventListener("message", (event) => this.#onSocketMessage(event));
    this.#send({ type: "hello", jwt });
  }
  #send(msg) {
    if (this.#closed !== undefined) {
      throw new InternalError("Trying to send a message on a closed client");
    }
    if (this.#opened) {
      this.#sendToSocket(msg);
    } else {
      const openCallback = () => this.#sendToSocket(msg);
      const errorCallback = () => {
        return;
      };
      this.#openCallbacks.push({ openCallback, errorCallback });
    }
  }
  #onSocketOpen() {
    const protocol = this.#socket.protocol;
    if (protocol === undefined) {
      this.#setClosed(new ClientError("The `WebSocket.protocol` property is undefined. This most likely means that the WebSocket implementation provided by the environment is broken. If you are using Miniflare 2, please update to Miniflare 3, which fixes this problem."));
      return;
    } else if (protocol === "") {
      this.#subprotocol = { version: 1, encoding: "json" };
    } else {
      this.#subprotocol = subprotocolsV3.get(protocol);
      if (this.#subprotocol === undefined) {
        this.#setClosed(new ProtoError(`Unrecognized WebSocket subprotocol: ${JSON.stringify(protocol)}`));
        return;
      }
    }
    for (const callbacks of this.#openCallbacks) {
      callbacks.openCallback();
    }
    this.#openCallbacks.length = 0;
    this.#opened = true;
  }
  #sendToSocket(msg) {
    const encoding2 = this.#subprotocol.encoding;
    if (encoding2 === "json") {
      const jsonMsg = writeJsonObject(msg, ClientMsg);
      this.#socket.send(jsonMsg);
    } else if (encoding2 === "protobuf") {
      const protobufMsg = writeProtobufMessage(msg, ClientMsg2);
      this.#socket.send(protobufMsg);
    } else {
      throw impossible(encoding2, "Impossible encoding");
    }
  }
  getVersion() {
    return new Promise((versionCallback, errorCallback) => {
      this.#getVersionCalled = true;
      if (this.#closed !== undefined) {
        errorCallback(this.#closed);
      } else if (!this.#opened) {
        const openCallback = () => versionCallback(this.#subprotocol.version);
        this.#openCallbacks.push({ openCallback, errorCallback });
      } else {
        versionCallback(this.#subprotocol.version);
      }
    });
  }
  _ensureVersion(minVersion, feature) {
    if (this.#subprotocol === undefined || !this.#getVersionCalled) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, ` + "but the version supported by the WebSocket server is not yet known. Use Client.getVersion() to wait until the version is available.");
    } else if (this.#subprotocol.version < minVersion) {
      throw new ProtocolVersionError(`${feature} is supported on protocol version ${minVersion} and higher, ` + `but the WebSocket server only supports version ${this.#subprotocol.version}`);
    }
  }
  _sendRequest(request, callbacks) {
    if (this.#closed !== undefined) {
      callbacks.errorCallback(new ClosedError("Client is closed", this.#closed));
      return;
    }
    const requestId = this.#requestIdAlloc.alloc();
    this.#responseMap.set(requestId, { ...callbacks, type: request.type });
    this.#send({ type: "request", requestId, request });
  }
  #onSocketError(event) {
    const eventMessage = event.message;
    const message = eventMessage ?? "WebSocket was closed due to an error";
    this.#setClosed(new WebSocketError(message));
  }
  #onSocketClose(event) {
    let message = `WebSocket was closed with code ${event.code}`;
    if (event.reason) {
      message += `: ${event.reason}`;
    }
    this.#setClosed(new WebSocketError(message));
  }
  #setClosed(error) {
    if (this.#closed !== undefined) {
      return;
    }
    this.#closed = error;
    for (const callbacks of this.#openCallbacks) {
      callbacks.errorCallback(error);
    }
    this.#openCallbacks.length = 0;
    for (const [requestId, responseState] of this.#responseMap.entries()) {
      responseState.errorCallback(error);
      this.#requestIdAlloc.free(requestId);
    }
    this.#responseMap.clear();
    this.#socket.close();
  }
  #onSocketMessage(event) {
    if (this.#closed !== undefined) {
      return;
    }
    try {
      let msg;
      const encoding2 = this.#subprotocol.encoding;
      if (encoding2 === "json") {
        if (typeof event.data !== "string") {
          this.#socket.close(3003, "Only text messages are accepted with JSON encoding");
          this.#setClosed(new ProtoError("Received non-text message from server with JSON encoding"));
          return;
        }
        msg = readJsonObject(JSON.parse(event.data), ServerMsg);
      } else if (encoding2 === "protobuf") {
        if (!(event.data instanceof ArrayBuffer)) {
          this.#socket.close(3003, "Only binary messages are accepted with Protobuf encoding");
          this.#setClosed(new ProtoError("Received non-binary message from server with Protobuf encoding"));
          return;
        }
        msg = readProtobufMessage(new Uint8Array(event.data), ServerMsg2);
      } else {
        throw impossible(encoding2, "Impossible encoding");
      }
      this.#handleMsg(msg);
    } catch (e3) {
      this.#socket.close(3007, "Could not handle message");
      this.#setClosed(e3);
    }
  }
  #handleMsg(msg) {
    if (msg.type === "none") {
      throw new ProtoError("Received an unrecognized ServerMsg");
    } else if (msg.type === "hello_ok" || msg.type === "hello_error") {
      if (this.#recvdHello) {
        throw new ProtoError("Received a duplicated hello response");
      }
      this.#recvdHello = true;
      if (msg.type === "hello_error") {
        throw errorFromProto(msg.error);
      }
      return;
    } else if (!this.#recvdHello) {
      throw new ProtoError("Received a non-hello message before a hello response");
    }
    if (msg.type === "response_ok") {
      const requestId = msg.requestId;
      const responseState = this.#responseMap.get(requestId);
      this.#responseMap.delete(requestId);
      if (responseState === undefined) {
        throw new ProtoError("Received unexpected OK response");
      }
      this.#requestIdAlloc.free(requestId);
      try {
        if (responseState.type !== msg.response.type) {
          console.dir({ responseState, msg });
          throw new ProtoError("Received unexpected type of response");
        }
        responseState.responseCallback(msg.response);
      } catch (e3) {
        responseState.errorCallback(e3);
        throw e3;
      }
    } else if (msg.type === "response_error") {
      const requestId = msg.requestId;
      const responseState = this.#responseMap.get(requestId);
      this.#responseMap.delete(requestId);
      if (responseState === undefined) {
        throw new ProtoError("Received unexpected error response");
      }
      this.#requestIdAlloc.free(requestId);
      responseState.errorCallback(errorFromProto(msg.error));
    } else {
      throw impossible(msg, "Impossible ServerMsg type");
    }
  }
  openStream() {
    return WsStream.open(this);
  }
  storeSql(sql10) {
    this._ensureVersion(2, "storeSql()");
    const sqlId = this.#sqlIdAlloc.alloc();
    const sqlObj = new Sql(this, sqlId);
    const responseCallback = () => {
      return;
    };
    const errorCallback = (e3) => sqlObj._setClosed(e3);
    const request = { type: "store_sql", sqlId, sql: sql10 };
    this._sendRequest(request, { responseCallback, errorCallback });
    return sqlObj;
  }
  _closeSql(sqlId) {
    if (this.#closed !== undefined) {
      return;
    }
    const responseCallback = () => this.#sqlIdAlloc.free(sqlId);
    const errorCallback = (e3) => this.#setClosed(e3);
    const request = { type: "close_sql", sqlId };
    this._sendRequest(request, { responseCallback, errorCallback });
  }
  close() {
    this.#setClosed(new ClientError("Client was manually closed"));
  }
  get closed() {
    return this.#closed !== undefined;
  }
}

// node_modules/@libsql/isomorphic-fetch/web.js
var _fetch = fetch;
var _Request = Request;
var _Headers = Headers;

// node_modules/@libsql/hrana-client/lib-esm/queue_microtask.js
var _queueMicrotask;
if (typeof queueMicrotask !== "undefined") {
  _queueMicrotask = queueMicrotask;
} else {
  const resolved = Promise.resolve();
  _queueMicrotask = (callback) => {
    resolved.then(callback);
  };
}

// node_modules/@libsql/hrana-client/lib-esm/byte_queue.js
class ByteQueue {
  #array;
  #shiftPos;
  #pushPos;
  constructor(initialCap) {
    this.#array = new Uint8Array(new ArrayBuffer(initialCap));
    this.#shiftPos = 0;
    this.#pushPos = 0;
  }
  get length() {
    return this.#pushPos - this.#shiftPos;
  }
  data() {
    return this.#array.slice(this.#shiftPos, this.#pushPos);
  }
  push(chunk) {
    this.#ensurePush(chunk.byteLength);
    this.#array.set(chunk, this.#pushPos);
    this.#pushPos += chunk.byteLength;
  }
  #ensurePush(pushLength) {
    if (this.#pushPos + pushLength <= this.#array.byteLength) {
      return;
    }
    const filledLength = this.#pushPos - this.#shiftPos;
    if (filledLength + pushLength <= this.#array.byteLength && 2 * this.#pushPos >= this.#array.byteLength) {
      this.#array.copyWithin(0, this.#shiftPos, this.#pushPos);
    } else {
      let newCap = this.#array.byteLength;
      do {
        newCap *= 2;
      } while (filledLength + pushLength > newCap);
      const newArray = new Uint8Array(new ArrayBuffer(newCap));
      newArray.set(this.#array.slice(this.#shiftPos, this.#pushPos), 0);
      this.#array = newArray;
    }
    this.#pushPos = filledLength;
    this.#shiftPos = 0;
  }
  shift(length) {
    this.#shiftPos += length;
  }
}

// node_modules/@libsql/hrana-client/lib-esm/http/json_decode.js
function PipelineRespBody(obj) {
  const baton = stringOpt(obj["baton"]);
  const baseUrl = stringOpt(obj["base_url"]);
  const results = arrayObjectsMap(obj["results"], StreamResult);
  return { baton, baseUrl, results };
}
var StreamResult = function(obj) {
  const type = string(obj["type"]);
  if (type === "ok") {
    const response = StreamResponse(object(obj["response"]));
    return { type: "ok", response };
  } else if (type === "error") {
    const error = Error2(object(obj["error"]));
    return { type: "error", error };
  } else {
    throw new ProtoError("Unexpected type of StreamResult");
  }
};
var StreamResponse = function(obj) {
  const type = string(obj["type"]);
  if (type === "close") {
    return { type: "close" };
  } else if (type === "execute") {
    const result4 = StmtResult(object(obj["result"]));
    return { type: "execute", result: result4 };
  } else if (type === "batch") {
    const result4 = BatchResult(object(obj["result"]));
    return { type: "batch", result: result4 };
  } else if (type === "sequence") {
    return { type: "sequence" };
  } else if (type === "describe") {
    const result4 = DescribeResult(object(obj["result"]));
    return { type: "describe", result: result4 };
  } else if (type === "store_sql") {
    return { type: "store_sql" };
  } else if (type === "close_sql") {
    return { type: "close_sql" };
  } else if (type === "get_autocommit") {
    const isAutocommit = boolean(obj["is_autocommit"]);
    return { type: "get_autocommit", isAutocommit };
  } else {
    throw new ProtoError("Unexpected type of StreamResponse");
  }
};
function CursorRespBody(obj) {
  const baton = stringOpt(obj["baton"]);
  const baseUrl = stringOpt(obj["base_url"]);
  return { baton, baseUrl };
}

// node_modules/@libsql/hrana-client/lib-esm/http/protobuf_decode.js
var PipelineRespBody2 = {
  default() {
    return { baton: undefined, baseUrl: undefined, results: [] };
  },
  1(r3, msg) {
    msg.baton = r3.string();
  },
  2(r3, msg) {
    msg.baseUrl = r3.string();
  },
  3(r3, msg) {
    msg.results.push(r3.message(StreamResult2));
  }
};
var StreamResult2 = {
  default() {
    return { type: "none" };
  },
  1(r3) {
    return { type: "ok", response: r3.message(StreamResponse2) };
  },
  2(r3) {
    return { type: "error", error: r3.message(Error3) };
  }
};
var StreamResponse2 = {
  default() {
    return { type: "none" };
  },
  1(r3) {
    return { type: "close" };
  },
  2(r3) {
    return r3.message(ExecuteStreamResp);
  },
  3(r3) {
    return r3.message(BatchStreamResp);
  },
  4(r3) {
    return { type: "sequence" };
  },
  5(r3) {
    return r3.message(DescribeStreamResp);
  },
  6(r3) {
    return { type: "store_sql" };
  },
  7(r3) {
    return { type: "close_sql" };
  },
  8(r3) {
    return r3.message(GetAutocommitStreamResp);
  }
};
var ExecuteStreamResp = {
  default() {
    return { type: "execute", result: StmtResult2.default() };
  },
  1(r3, msg) {
    msg.result = r3.message(StmtResult2);
  }
};
var BatchStreamResp = {
  default() {
    return { type: "batch", result: BatchResult2.default() };
  },
  1(r3, msg) {
    msg.result = r3.message(BatchResult2);
  }
};
var DescribeStreamResp = {
  default() {
    return { type: "describe", result: DescribeResult2.default() };
  },
  1(r3, msg) {
    msg.result = r3.message(DescribeResult2);
  }
};
var GetAutocommitStreamResp = {
  default() {
    return { type: "get_autocommit", isAutocommit: false };
  },
  1(r3, msg) {
    msg.isAutocommit = r3.bool();
  }
};
var CursorRespBody2 = {
  default() {
    return { baton: undefined, baseUrl: undefined };
  },
  1(r3, msg) {
    msg.baton = r3.string();
  },
  2(r3, msg) {
    msg.baseUrl = r3.string();
  }
};

// node_modules/@libsql/hrana-client/lib-esm/http/cursor.js
class HttpCursor extends Cursor {
  #stream;
  #encoding;
  #reader;
  #queue;
  #closed;
  #done;
  constructor(stream3, encoding2) {
    super();
    this.#stream = stream3;
    this.#encoding = encoding2;
    this.#reader = undefined;
    this.#queue = new ByteQueue(16 * 1024);
    this.#closed = undefined;
    this.#done = false;
  }
  async open(response) {
    if (response.body === null) {
      throw new ProtoError("No response body for cursor request");
    }
    this.#reader = response.body.getReader();
    const respBody = await this.#nextItem(CursorRespBody, CursorRespBody2);
    if (respBody === undefined) {
      throw new ProtoError("Empty response to cursor request");
    }
    return respBody;
  }
  next() {
    return this.#nextItem(CursorEntry, CursorEntry2);
  }
  close() {
    this._setClosed(new ClientError("Cursor was manually closed"));
  }
  _setClosed(error) {
    if (this.#closed !== undefined) {
      return;
    }
    this.#closed = error;
    this.#stream._cursorClosed(this);
    if (this.#reader !== undefined) {
      this.#reader.cancel();
    }
  }
  get closed() {
    return this.#closed !== undefined;
  }
  async#nextItem(jsonFun, protobufDef) {
    for (;; ) {
      if (this.#done) {
        return;
      } else if (this.#closed !== undefined) {
        throw new ClosedError("Cursor is closed", this.#closed);
      }
      if (this.#encoding === "json") {
        const jsonData = this.#parseItemJson();
        if (jsonData !== undefined) {
          const jsonText = new TextDecoder().decode(jsonData);
          const jsonValue = JSON.parse(jsonText);
          return readJsonObject(jsonValue, jsonFun);
        }
      } else if (this.#encoding === "protobuf") {
        const protobufData = this.#parseItemProtobuf();
        if (protobufData !== undefined) {
          return readProtobufMessage(protobufData, protobufDef);
        }
      } else {
        throw impossible(this.#encoding, "Impossible encoding");
      }
      if (this.#reader === undefined) {
        throw new InternalError("Attempted to read from HTTP cursor before it was opened");
      }
      const { value: value3, done } = await this.#reader.read();
      if (done && this.#queue.length === 0) {
        this.#done = true;
      } else if (done) {
        throw new ProtoError("Unexpected end of cursor stream");
      } else {
        this.#queue.push(value3);
      }
    }
  }
  #parseItemJson() {
    const data = this.#queue.data();
    const newlineByte = 10;
    const newlinePos = data.indexOf(newlineByte);
    if (newlinePos < 0) {
      return;
    }
    const jsonData = data.slice(0, newlinePos);
    this.#queue.shift(newlinePos + 1);
    return jsonData;
  }
  #parseItemProtobuf() {
    const data = this.#queue.data();
    let varintValue = 0;
    let varintLength = 0;
    for (;; ) {
      if (varintLength >= data.byteLength) {
        return;
      }
      const byte = data[varintLength];
      varintValue |= (byte & 127) << 7 * varintLength;
      varintLength += 1;
      if (!(byte & 128)) {
        break;
      }
    }
    if (data.byteLength < varintLength + varintValue) {
      return;
    }
    const protobufData = data.slice(varintLength, varintLength + varintValue);
    this.#queue.shift(varintLength + varintValue);
    return protobufData;
  }
}

// node_modules/@libsql/hrana-client/lib-esm/http/json_encode.js
function PipelineReqBody(w, msg) {
  if (msg.baton !== undefined) {
    w.string("baton", msg.baton);
  }
  w.arrayObjects("requests", msg.requests, StreamRequest);
}
var StreamRequest = function(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "close") {
  } else if (msg.type === "execute") {
    w.object("stmt", msg.stmt, Stmt2);
  } else if (msg.type === "batch") {
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "sequence") {
    if (msg.sql !== undefined) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== undefined) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "describe") {
    if (msg.sql !== undefined) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== undefined) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "store_sql") {
    w.number("sql_id", msg.sqlId);
    w.string("sql", msg.sql);
  } else if (msg.type === "close_sql") {
    w.number("sql_id", msg.sqlId);
  } else if (msg.type === "get_autocommit") {
  } else {
    throw impossible(msg, "Impossible type of StreamRequest");
  }
};
function CursorReqBody(w, msg) {
  if (msg.baton !== undefined) {
    w.string("baton", msg.baton);
  }
  w.object("batch", msg.batch, Batch2);
}

// node_modules/@libsql/hrana-client/lib-esm/http/protobuf_encode.js
function PipelineReqBody2(w, msg) {
  if (msg.baton !== undefined) {
    w.string(1, msg.baton);
  }
  for (const req of msg.requests) {
    w.message(2, req, StreamRequest2);
  }
}
var StreamRequest2 = function(w, msg) {
  if (msg.type === "close") {
    w.message(1, msg, CloseStreamReq2);
  } else if (msg.type === "execute") {
    w.message(2, msg, ExecuteStreamReq);
  } else if (msg.type === "batch") {
    w.message(3, msg, BatchStreamReq);
  } else if (msg.type === "sequence") {
    w.message(4, msg, SequenceStreamReq);
  } else if (msg.type === "describe") {
    w.message(5, msg, DescribeStreamReq);
  } else if (msg.type === "store_sql") {
    w.message(6, msg, StoreSqlStreamReq);
  } else if (msg.type === "close_sql") {
    w.message(7, msg, CloseSqlStreamReq);
  } else if (msg.type === "get_autocommit") {
    w.message(8, msg, GetAutocommitStreamReq);
  } else {
    throw impossible(msg, "Impossible type of StreamRequest");
  }
};
var CloseStreamReq2 = function(_w, _msg) {
};
var ExecuteStreamReq = function(w, msg) {
  w.message(1, msg.stmt, Stmt3);
};
var BatchStreamReq = function(w, msg) {
  w.message(1, msg.batch, Batch3);
};
var SequenceStreamReq = function(w, msg) {
  if (msg.sql !== undefined) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== undefined) {
    w.int32(2, msg.sqlId);
  }
};
var DescribeStreamReq = function(w, msg) {
  if (msg.sql !== undefined) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== undefined) {
    w.int32(2, msg.sqlId);
  }
};
var StoreSqlStreamReq = function(w, msg) {
  w.int32(1, msg.sqlId);
  w.string(2, msg.sql);
};
var CloseSqlStreamReq = function(w, msg) {
  w.int32(1, msg.sqlId);
};
var GetAutocommitStreamReq = function(_w, _msg) {
};
function CursorReqBody2(w, msg) {
  if (msg.baton !== undefined) {
    w.string(1, msg.baton);
  }
  w.message(2, msg.batch, Batch3);
}

// node_modules/@libsql/hrana-client/lib-esm/http/stream.js
var handlePipelineResponse = function(pipeline, respBody) {
  if (respBody.results.length !== pipeline.length) {
    throw new ProtoError("Server returned unexpected number of pipeline results");
  }
  for (let i8 = 0;i8 < pipeline.length; ++i8) {
    const result5 = respBody.results[i8];
    const entry = pipeline[i8];
    if (result5.type === "ok") {
      if (result5.response.type !== entry.request.type) {
        throw new ProtoError("Received unexpected type of response");
      }
      entry.responseCallback(result5.response);
    } else if (result5.type === "error") {
      entry.errorCallback(errorFromProto(result5.error));
    } else if (result5.type === "none") {
      throw new ProtoError("Received unrecognized type of StreamResult");
    } else {
      throw impossible(result5, "Received impossible type of StreamResult");
    }
  }
};
async function decodePipelineResponse(resp, encoding3) {
  if (encoding3 === "json") {
    const respJson = await resp.json();
    return readJsonObject(respJson, PipelineRespBody);
  } else if (encoding3 === "protobuf") {
    const respData = await resp.arrayBuffer();
    return readProtobufMessage(new Uint8Array(respData), PipelineRespBody2);
  } else {
    throw impossible(encoding3, "Impossible encoding");
  }
}
async function errorFromResponse(resp) {
  const respType = resp.headers.get("content-type") ?? "text/plain";
  if (respType === "application/json") {
    const respBody = await resp.json();
    if ("message" in respBody) {
      return errorFromProto(respBody);
    }
  }
  let message = `Server returned HTTP status ${resp.status}`;
  if (respType === "text/plain") {
    const respBody = (await resp.text()).trim();
    if (respBody !== "") {
      message += `: ${respBody}`;
    }
  }
  if (resp.status === 404) {
    message += ". It seems that the libsql server is outdated, please try updating the database.";
  }
  return new HttpServerError(message, resp.status);
}

class HttpStream extends Stream {
  #client;
  #baseUrl;
  #jwt;
  #fetch;
  #baton;
  #queue;
  #flushing;
  #cursor;
  #closing;
  #closeQueued;
  #closed;
  #sqlIdAlloc;
  constructor(client2, baseUrl, jwt, customFetch) {
    super(client2.intMode);
    this.#client = client2;
    this.#baseUrl = baseUrl.toString();
    this.#jwt = jwt;
    this.#fetch = customFetch;
    this.#baton = undefined;
    this.#queue = new Queue;
    this.#flushing = false;
    this.#closing = false;
    this.#closeQueued = false;
    this.#closed = undefined;
    this.#sqlIdAlloc = new IdAlloc;
  }
  client() {
    return this.#client;
  }
  _sqlOwner() {
    return this;
  }
  storeSql(sql11) {
    const sqlId = this.#sqlIdAlloc.alloc();
    this.#sendStreamRequest({ type: "store_sql", sqlId, sql: sql11 }).then(() => {
      return;
    }, (error) => this._setClosed(error));
    return new Sql(this, sqlId);
  }
  _closeSql(sqlId) {
    if (this.#closed !== undefined) {
      return;
    }
    this.#sendStreamRequest({ type: "close_sql", sqlId }).then(() => this.#sqlIdAlloc.free(sqlId), (error) => this._setClosed(error));
  }
  _execute(stmt3) {
    return this.#sendStreamRequest({ type: "execute", stmt: stmt3 }).then((response) => {
      return response.result;
    });
  }
  _batch(batch2) {
    return this.#sendStreamRequest({ type: "batch", batch: batch2 }).then((response) => {
      return response.result;
    });
  }
  _describe(protoSql) {
    return this.#sendStreamRequest({
      type: "describe",
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((response) => {
      return response.result;
    });
  }
  _sequence(protoSql) {
    return this.#sendStreamRequest({
      type: "sequence",
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((_response) => {
      return;
    });
  }
  getAutocommit() {
    this.#client._ensureVersion(3, "getAutocommit()");
    return this.#sendStreamRequest({
      type: "get_autocommit"
    }).then((response) => {
      return response.isAutocommit;
    });
  }
  #sendStreamRequest(request) {
    return new Promise((responseCallback, errorCallback) => {
      this.#pushToQueue({ type: "pipeline", request, responseCallback, errorCallback });
    });
  }
  _openCursor(batch2) {
    return new Promise((cursorCallback, errorCallback) => {
      this.#pushToQueue({ type: "cursor", batch: batch2, cursorCallback, errorCallback });
    });
  }
  _cursorClosed(cursor5) {
    if (cursor5 !== this.#cursor) {
      throw new InternalError("Cursor was closed, but it was not associated with the stream");
    }
    this.#cursor = undefined;
    _queueMicrotask(() => this.#flushQueue());
  }
  close() {
    this._setClosed(new ClientError("Stream was manually closed"));
  }
  closeGracefully() {
    this.#closing = true;
    _queueMicrotask(() => this.#flushQueue());
  }
  get closed() {
    return this.#closed !== undefined || this.#closing;
  }
  _setClosed(error) {
    if (this.#closed !== undefined) {
      return;
    }
    this.#closed = error;
    if (this.#cursor !== undefined) {
      this.#cursor._setClosed(error);
    }
    this.#client._streamClosed(this);
    for (;; ) {
      const entry = this.#queue.shift();
      if (entry !== undefined) {
        entry.errorCallback(error);
      } else {
        break;
      }
    }
    if ((this.#baton !== undefined || this.#flushing) && !this.#closeQueued) {
      this.#queue.push({
        type: "pipeline",
        request: { type: "close" },
        responseCallback: () => {
          return;
        },
        errorCallback: () => {
          return;
        }
      });
      this.#closeQueued = true;
      _queueMicrotask(() => this.#flushQueue());
    }
  }
  #pushToQueue(entry) {
    if (this.#closed !== undefined) {
      throw new ClosedError("Stream is closed", this.#closed);
    } else if (this.#closing) {
      throw new ClosedError("Stream is closing", undefined);
    } else {
      this.#queue.push(entry);
      _queueMicrotask(() => this.#flushQueue());
    }
  }
  #flushQueue() {
    if (this.#flushing || this.#cursor !== undefined) {
      return;
    }
    if (this.#closing && this.#queue.length === 0) {
      this._setClosed(new ClientError("Stream was gracefully closed"));
      return;
    }
    const endpoint = this.#client._endpoint;
    if (endpoint === undefined) {
      this.#client._endpointPromise.then(() => this.#flushQueue(), (error) => this._setClosed(error));
      return;
    }
    const firstEntry = this.#queue.shift();
    if (firstEntry === undefined) {
      return;
    } else if (firstEntry.type === "pipeline") {
      const pipeline = [firstEntry];
      for (;; ) {
        const entry = this.#queue.first();
        if (entry !== undefined && entry.type === "pipeline") {
          pipeline.push(entry);
          this.#queue.shift();
        } else if (entry === undefined && this.#closing && !this.#closeQueued) {
          pipeline.push({
            type: "pipeline",
            request: { type: "close" },
            responseCallback: () => {
              return;
            },
            errorCallback: () => {
              return;
            }
          });
          this.#closeQueued = true;
          break;
        } else {
          break;
        }
      }
      this.#flushPipeline(endpoint, pipeline);
    } else if (firstEntry.type === "cursor") {
      this.#flushCursor(endpoint, firstEntry);
    } else {
      throw impossible(firstEntry, "Impossible type of QueueEntry");
    }
  }
  #flushPipeline(endpoint, pipeline) {
    this.#flush(() => this.#createPipelineRequest(pipeline, endpoint), (resp) => decodePipelineResponse(resp, endpoint.encoding), (respBody) => respBody.baton, (respBody) => respBody.baseUrl, (respBody) => handlePipelineResponse(pipeline, respBody), (error) => pipeline.forEach((entry) => entry.errorCallback(error)));
  }
  #flushCursor(endpoint, entry) {
    const cursor5 = new HttpCursor(this, endpoint.encoding);
    this.#cursor = cursor5;
    this.#flush(() => this.#createCursorRequest(entry, endpoint), (resp) => cursor5.open(resp), (respBody) => respBody.baton, (respBody) => respBody.baseUrl, (_respBody) => entry.cursorCallback(cursor5), (error) => entry.errorCallback(error));
  }
  #flush(createRequest, decodeResponse, getBaton, getBaseUrl, handleResponse, handleError) {
    let promise;
    try {
      const request = createRequest();
      const fetch2 = this.#fetch;
      promise = fetch2(request);
    } catch (error) {
      promise = Promise.reject(error);
    }
    this.#flushing = true;
    promise.then((resp) => {
      if (!resp.ok) {
        return errorFromResponse(resp).then((error) => {
          throw error;
        });
      }
      return decodeResponse(resp);
    }).then((r3) => {
      this.#baton = getBaton(r3);
      this.#baseUrl = getBaseUrl(r3) ?? this.#baseUrl;
      handleResponse(r3);
    }).catch((error) => {
      this._setClosed(error);
      handleError(error);
    }).finally(() => {
      this.#flushing = false;
      this.#flushQueue();
    });
  }
  #createPipelineRequest(pipeline, endpoint) {
    return this.#createRequest(new URL(endpoint.pipelinePath, this.#baseUrl), {
      baton: this.#baton,
      requests: pipeline.map((entry) => entry.request)
    }, endpoint.encoding, PipelineReqBody, PipelineReqBody2);
  }
  #createCursorRequest(entry, endpoint) {
    if (endpoint.cursorPath === undefined) {
      throw new ProtocolVersionError("Cursors are supported only on protocol version 3 and higher, " + `but the HTTP server only supports version ${endpoint.version}.`);
    }
    return this.#createRequest(new URL(endpoint.cursorPath, this.#baseUrl), {
      baton: this.#baton,
      batch: entry.batch
    }, endpoint.encoding, CursorReqBody, CursorReqBody2);
  }
  #createRequest(url, reqBody, encoding3, jsonFun, protobufFun) {
    let bodyData;
    let contentType;
    if (encoding3 === "json") {
      bodyData = writeJsonObject(reqBody, jsonFun);
      contentType = "application/json";
    } else if (encoding3 === "protobuf") {
      bodyData = writeProtobufMessage(reqBody, protobufFun);
      contentType = "application/x-protobuf";
    } else {
      throw impossible(encoding3, "Impossible encoding");
    }
    const headers = new _Headers;
    headers.set("content-type", contentType);
    if (this.#jwt !== undefined) {
      headers.set("authorization", `Bearer ${this.#jwt}`);
    }
    return new _Request(url.toString(), { method: "POST", headers, body: bodyData });
  }
}

// node_modules/@libsql/hrana-client/lib-esm/http/client.js
async function findEndpoint(customFetch, clientUrl) {
  const fetch2 = customFetch;
  for (const endpoint of checkEndpoints) {
    const url = new URL(endpoint.versionPath, clientUrl);
    const request = new _Request(url.toString(), { method: "GET" });
    const response = await fetch2(request);
    await response.arrayBuffer();
    if (response.ok) {
      return endpoint;
    }
  }
  return fallbackEndpoint;
}
var checkEndpoints = [
  {
    versionPath: "v3-protobuf",
    pipelinePath: "v3-protobuf/pipeline",
    cursorPath: "v3-protobuf/cursor",
    version: 3,
    encoding: "protobuf"
  }
];
var fallbackEndpoint = {
  versionPath: "v2",
  pipelinePath: "v2/pipeline",
  cursorPath: undefined,
  version: 2,
  encoding: "json"
};

class HttpClient extends Client {
  #url;
  #jwt;
  #fetch;
  #closed;
  #streams;
  _endpointPromise;
  _endpoint;
  constructor(url, jwt, customFetch, protocolVersion = 2) {
    super();
    this.#url = url;
    this.#jwt = jwt;
    this.#fetch = customFetch ?? _fetch;
    this.#closed = undefined;
    this.#streams = new Set;
    if (protocolVersion == 3) {
      this._endpointPromise = findEndpoint(this.#fetch, this.#url);
      this._endpointPromise.then((endpoint) => this._endpoint = endpoint, (error) => this.#setClosed(error));
    } else {
      this._endpointPromise = Promise.resolve(fallbackEndpoint);
      this._endpointPromise.then((endpoint) => this._endpoint = endpoint, (error) => this.#setClosed(error));
    }
  }
  async getVersion() {
    if (this._endpoint !== undefined) {
      return this._endpoint.version;
    }
    return (await this._endpointPromise).version;
  }
  _ensureVersion(minVersion, feature) {
    if (minVersion <= fallbackEndpoint.version) {
      return;
    } else if (this._endpoint === undefined) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, ` + "but the version supported by the HTTP server is not yet known. Use Client.getVersion() to wait until the version is available.");
    } else if (this._endpoint.version < minVersion) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, ` + `but the HTTP server only supports version ${this._endpoint.version}.`);
    }
  }
  openStream() {
    if (this.#closed !== undefined) {
      throw new ClosedError("Client is closed", this.#closed);
    }
    const stream5 = new HttpStream(this, this.#url, this.#jwt, this.#fetch);
    this.#streams.add(stream5);
    return stream5;
  }
  _streamClosed(stream5) {
    this.#streams.delete(stream5);
  }
  close() {
    this.#setClosed(new ClientError("Client was manually closed"));
  }
  get closed() {
    return this.#closed !== undefined;
  }
  #setClosed(error) {
    if (this.#closed !== undefined) {
      return;
    }
    this.#closed = error;
    for (const stream5 of Array.from(this.#streams)) {
      stream5._setClosed(new ClosedError("Client was closed", error));
    }
  }
}

// node_modules/@libsql/hrana-client/lib-esm/index.js
function openWs(url, jwt, protocolVersion = 2) {
  if (typeof _WebSocket === "undefined") {
    throw new WebSocketUnsupportedError("WebSockets are not supported in this environment");
  }
  var subprotocols = undefined;
  if (protocolVersion == 3) {
    subprotocols = Array.from(subprotocolsV3.keys());
  } else {
    subprotocols = Array.from(subprotocolsV2.keys());
  }
  const socket = new _WebSocket(url, subprotocols);
  return new WsClient(socket, jwt);
}
function openHttp(url, jwt, customFetch, protocolVersion = 2) {
  return new HttpClient(url instanceof URL ? url : new URL(url), jwt, customFetch, protocolVersion);
}

// node_modules/@libsql/client/lib-esm/hrana.js
async function executeHranaBatch(mode, version4, batch2, hranaStmts) {
  const beginStep = batch2.step();
  const beginPromise = beginStep.run(transactionModeToBegin(mode));
  let lastStep = beginStep;
  const stmtPromises = hranaStmts.map((hranaStmt) => {
    const stmtStep = batch2.step().condition(BatchCond.ok(lastStep));
    if (version4 >= 3) {
      stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch2)));
    }
    const stmtPromise = stmtStep.query(hranaStmt);
    lastStep = stmtStep;
    return stmtPromise;
  });
  const commitStep = batch2.step().condition(BatchCond.ok(lastStep));
  if (version4 >= 3) {
    commitStep.condition(BatchCond.not(BatchCond.isAutocommit(batch2)));
  }
  const commitPromise = commitStep.run("COMMIT");
  const rollbackStep = batch2.step().condition(BatchCond.not(BatchCond.ok(commitStep)));
  rollbackStep.run("ROLLBACK").catch((_) => {
    return;
  });
  await batch2.execute();
  const resultSets = [];
  await beginPromise;
  for (const stmtPromise of stmtPromises) {
    const hranaRows = await stmtPromise;
    if (hranaRows === undefined) {
      throw new LibsqlError("Statement in a batch was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
    }
    resultSets.push(resultSetFromHrana(hranaRows));
  }
  await commitPromise;
  return resultSets;
}
function stmtToHrana(stmt3) {
  if (typeof stmt3 === "string") {
    return new Stmt(stmt3);
  }
  const hranaStmt = new Stmt(stmt3.sql);
  if (Array.isArray(stmt3.args)) {
    hranaStmt.bindIndexes(stmt3.args);
  } else {
    for (const [key, value3] of Object.entries(stmt3.args)) {
      hranaStmt.bindName(key, value3);
    }
  }
  return hranaStmt;
}
function resultSetFromHrana(hranaRows) {
  const columns = hranaRows.columnNames.map((c10) => c10 ?? "");
  const columnTypes = hranaRows.columnDecltypes.map((c10) => c10 ?? "");
  const rows = hranaRows.rows;
  const rowsAffected = hranaRows.affectedRowCount;
  const lastInsertRowid = hranaRows.lastInsertRowid !== undefined ? hranaRows.lastInsertRowid : undefined;
  return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
}
function mapHranaError(e3) {
  if (e3 instanceof ClientError) {
    const code = mapHranaErrorCode(e3);
    return new LibsqlError(e3.message, code, undefined, e3);
  }
  return e3;
}
var mapHranaErrorCode = function(e3) {
  if (e3 instanceof ResponseError && e3.code !== undefined) {
    return e3.code;
  } else if (e3 instanceof ProtoError) {
    return "HRANA_PROTO_ERROR";
  } else if (e3 instanceof ClosedError) {
    return e3.cause instanceof ClientError ? mapHranaErrorCode(e3.cause) : "HRANA_CLOSED_ERROR";
  } else if (e3 instanceof WebSocketError) {
    return "HRANA_WEBSOCKET_ERROR";
  } else if (e3 instanceof HttpServerError) {
    return "SERVER_ERROR";
  } else if (e3 instanceof ProtocolVersionError) {
    return "PROTOCOL_VERSION_ERROR";
  } else if (e3 instanceof InternalError) {
    return "INTERNAL_ERROR";
  } else {
    return "UNKNOWN";
  }
};

class HranaTransaction {
  #mode;
  #version;
  #started;
  constructor(mode, version4) {
    this.#mode = mode;
    this.#version = version4;
    this.#started = undefined;
  }
  execute(stmt3) {
    return this.batch([stmt3]).then((results) => results[0]);
  }
  async batch(stmts) {
    const stream5 = this._getStream();
    if (stream5.closed) {
      throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
    }
    try {
      const hranaStmts = stmts.map(stmtToHrana);
      let rowsPromises;
      if (this.#started === undefined) {
        this._getSqlCache().apply(hranaStmts);
        const batch2 = stream5.batch(this.#version >= 3);
        const beginStep = batch2.step();
        const beginPromise = beginStep.run(transactionModeToBegin(this.#mode));
        let lastStep = beginStep;
        rowsPromises = hranaStmts.map((hranaStmt) => {
          const stmtStep = batch2.step().condition(BatchCond.ok(lastStep));
          if (this.#version >= 3) {
            stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch2)));
          }
          const rowsPromise = stmtStep.query(hranaStmt);
          rowsPromise.catch(() => {
            return;
          });
          lastStep = stmtStep;
          return rowsPromise;
        });
        this.#started = batch2.execute().then(() => beginPromise).then(() => {
          return;
        });
        try {
          await this.#started;
        } catch (e3) {
          this.close();
          throw e3;
        }
      } else {
        if (this.#version < 3) {
          await this.#started;
        } else {
        }
        this._getSqlCache().apply(hranaStmts);
        const batch2 = stream5.batch(this.#version >= 3);
        let lastStep = undefined;
        rowsPromises = hranaStmts.map((hranaStmt) => {
          const stmtStep = batch2.step();
          if (lastStep !== undefined) {
            stmtStep.condition(BatchCond.ok(lastStep));
          }
          if (this.#version >= 3) {
            stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch2)));
          }
          const rowsPromise = stmtStep.query(hranaStmt);
          rowsPromise.catch(() => {
            return;
          });
          lastStep = stmtStep;
          return rowsPromise;
        });
        await batch2.execute();
      }
      const resultSets = [];
      for (const rowsPromise of rowsPromises) {
        const rows = await rowsPromise;
        if (rows === undefined) {
          throw new LibsqlError("Statement in a transaction was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
        }
        resultSets.push(resultSetFromHrana(rows));
      }
      return resultSets;
    } catch (e3) {
      throw mapHranaError(e3);
    }
  }
  async executeMultiple(sql11) {
    const stream5 = this._getStream();
    if (stream5.closed) {
      throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
    }
    try {
      if (this.#started === undefined) {
        this.#started = stream5.run(transactionModeToBegin(this.#mode)).then(() => {
          return;
        });
        try {
          await this.#started;
        } catch (e3) {
          this.close();
          throw e3;
        }
      } else {
        await this.#started;
      }
      await stream5.sequence(sql11);
    } catch (e3) {
      throw mapHranaError(e3);
    }
  }
  async rollback() {
    try {
      const stream5 = this._getStream();
      if (stream5.closed) {
        return;
      }
      if (this.#started !== undefined) {
      } else {
        return;
      }
      const promise = stream5.run("ROLLBACK").catch((e3) => {
        throw mapHranaError(e3);
      });
      stream5.closeGracefully();
      await promise;
    } catch (e3) {
      throw mapHranaError(e3);
    } finally {
      this.close();
    }
  }
  async commit() {
    try {
      const stream5 = this._getStream();
      if (stream5.closed) {
        throw new LibsqlError("Cannot commit the transaction because it is already closed", "TRANSACTION_CLOSED");
      }
      if (this.#started !== undefined) {
        await this.#started;
      } else {
        return;
      }
      const promise = stream5.run("COMMIT").catch((e3) => {
        throw mapHranaError(e3);
      });
      stream5.closeGracefully();
      await promise;
    } catch (e3) {
      throw mapHranaError(e3);
    } finally {
      this.close();
    }
  }
}

// node_modules/@libsql/client/lib-esm/sql_cache.js
class SqlCache {
  #owner;
  #sqls;
  capacity;
  constructor(owner, capacity) {
    this.#owner = owner;
    this.#sqls = new Lru;
    this.capacity = capacity;
  }
  apply(hranaStmts) {
    if (this.capacity <= 0) {
      return;
    }
    const usedSqlObjs = new Set;
    for (const hranaStmt of hranaStmts) {
      if (typeof hranaStmt.sql !== "string") {
        continue;
      }
      const sqlText = hranaStmt.sql;
      let sqlObj = this.#sqls.get(sqlText);
      if (sqlObj === undefined) {
        while (this.#sqls.size + 1 > this.capacity) {
          const [evictSqlText, evictSqlObj] = this.#sqls.peekLru();
          if (usedSqlObjs.has(evictSqlObj)) {
            break;
          }
          evictSqlObj.close();
          this.#sqls.delete(evictSqlText);
        }
        if (this.#sqls.size + 1 <= this.capacity) {
          sqlObj = this.#owner.storeSql(sqlText);
          this.#sqls.set(sqlText, sqlObj);
        }
      }
      if (sqlObj !== undefined) {
        hranaStmt.sql = sqlObj;
        usedSqlObjs.add(sqlObj);
      }
    }
  }
}

class Lru {
  #cache;
  constructor() {
    this.#cache = new Map;
  }
  get(key) {
    const value3 = this.#cache.get(key);
    if (value3 !== undefined) {
      this.#cache.delete(key);
      this.#cache.set(key, value3);
    }
    return value3;
  }
  set(key, value3) {
    this.#cache.set(key, value3);
  }
  peekLru() {
    for (const entry of this.#cache.entries()) {
      return entry;
    }
    return;
  }
  delete(key) {
    this.#cache.delete(key);
  }
  get size() {
    return this.#cache.size;
  }
}
// node_modules/@libsql/client/lib-esm/ws.js
function _createClient2(config3) {
  if (config3.scheme !== "wss" && config3.scheme !== "ws") {
    throw new LibsqlError('The WebSocket client supports only "libsql:", "wss:" and "ws:" URLs, ' + `got ${JSON.stringify(config3.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (config3.scheme === "ws" && config3.tls) {
    throw new LibsqlError(`A "ws:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
  } else if (config3.scheme === "wss" && !config3.tls) {
    throw new LibsqlError(`A "wss:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
  }
  const url = encodeBaseUrl(config3.scheme, config3.authority, config3.path);
  let client6;
  try {
    client6 = openWs(url, config3.authToken);
  } catch (e3) {
    if (e3 instanceof WebSocketUnsupportedError) {
      const suggestedScheme = config3.scheme === "wss" ? "https" : "http";
      const suggestedUrl = encodeBaseUrl(suggestedScheme, config3.authority, config3.path);
      throw new LibsqlError("This environment does not support WebSockets, please switch to the HTTP client by using " + `a "${suggestedScheme}:" URL (${JSON.stringify(suggestedUrl)}). ` + `For more information, please read ${supportedUrlLink}`, "WEBSOCKETS_NOT_SUPPORTED");
    }
    throw mapHranaError(e3);
  }
  return new WsClient2(client6, url, config3.authToken, config3.intMode);
}
var maxConnAgeMillis = 60 * 1000;
var sqlCacheCapacity = 100;

class WsClient2 {
  #url;
  #authToken;
  #intMode;
  #connState;
  #futureConnState;
  closed;
  protocol;
  constructor(client6, url, authToken, intMode) {
    this.#url = url;
    this.#authToken = authToken;
    this.#intMode = intMode;
    this.#connState = this.#openConn(client6);
    this.#futureConnState = undefined;
    this.closed = false;
    this.protocol = "ws";
  }
  async execute(stmt3) {
    const streamState = await this.#openStream();
    try {
      const hranaStmt = stmtToHrana(stmt3);
      streamState.conn.sqlCache.apply([hranaStmt]);
      const hranaRowsPromise = streamState.stream.query(hranaStmt);
      streamState.stream.closeGracefully();
      return resultSetFromHrana(await hranaRowsPromise);
    } catch (e3) {
      throw mapHranaError(e3);
    } finally {
      this._closeStream(streamState);
    }
  }
  async batch(stmts, mode = "deferred") {
    const streamState = await this.#openStream();
    try {
      const hranaStmts = stmts.map(stmtToHrana);
      const version4 = await streamState.conn.client.getVersion();
      streamState.conn.sqlCache.apply(hranaStmts);
      const batch2 = streamState.stream.batch(version4 >= 3);
      const resultsPromise = executeHranaBatch(mode, version4, batch2, hranaStmts);
      return await resultsPromise;
    } catch (e3) {
      throw mapHranaError(e3);
    } finally {
      this._closeStream(streamState);
    }
  }
  async transaction(mode = "write") {
    const streamState = await this.#openStream();
    try {
      const version4 = await streamState.conn.client.getVersion();
      return new WsTransaction(this, streamState, mode, version4);
    } catch (e3) {
      this._closeStream(streamState);
      throw mapHranaError(e3);
    }
  }
  async executeMultiple(sql11) {
    const streamState = await this.#openStream();
    try {
      const promise = streamState.stream.sequence(sql11);
      streamState.stream.closeGracefully();
      await promise;
    } catch (e3) {
      throw mapHranaError(e3);
    } finally {
      this._closeStream(streamState);
    }
  }
  sync() {
    return Promise.resolve();
  }
  async#openStream() {
    if (this.closed) {
      throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
    }
    const now = new Date;
    const ageMillis = now.valueOf() - this.#connState.openTime.valueOf();
    if (ageMillis > maxConnAgeMillis && this.#futureConnState === undefined) {
      const futureConnState = this.#openConn();
      this.#futureConnState = futureConnState;
      futureConnState.client.getVersion().then((_version) => {
        if (this.#connState !== futureConnState) {
          if (this.#connState.streamStates.size === 0) {
            this.#connState.client.close();
          } else {
          }
        }
        this.#connState = futureConnState;
        this.#futureConnState = undefined;
      }, (_e) => {
        this.#futureConnState = undefined;
      });
    }
    if (this.#connState.client.closed) {
      try {
        if (this.#futureConnState !== undefined) {
          this.#connState = this.#futureConnState;
        } else {
          this.#connState = this.#openConn();
        }
      } catch (e3) {
        throw mapHranaError(e3);
      }
    }
    const connState = this.#connState;
    try {
      if (connState.useSqlCache === undefined) {
        connState.useSqlCache = await connState.client.getVersion() >= 2;
        if (connState.useSqlCache) {
          connState.sqlCache.capacity = sqlCacheCapacity;
        }
      }
      const stream5 = connState.client.openStream();
      stream5.intMode = this.#intMode;
      const streamState = { conn: connState, stream: stream5 };
      connState.streamStates.add(streamState);
      return streamState;
    } catch (e3) {
      throw mapHranaError(e3);
    }
  }
  #openConn(client6) {
    try {
      client6 ??= openWs(this.#url, this.#authToken);
      return {
        client: client6,
        useSqlCache: undefined,
        sqlCache: new SqlCache(client6, 0),
        openTime: new Date,
        streamStates: new Set
      };
    } catch (e3) {
      throw mapHranaError(e3);
    }
  }
  _closeStream(streamState) {
    streamState.stream.close();
    const connState = streamState.conn;
    connState.streamStates.delete(streamState);
    if (connState.streamStates.size === 0 && connState !== this.#connState) {
      connState.client.close();
    }
  }
  close() {
    this.#connState.client.close();
    this.closed = true;
  }
}

class WsTransaction extends HranaTransaction {
  #client;
  #streamState;
  constructor(client6, state, mode, version4) {
    super(mode, version4);
    this.#client = client6;
    this.#streamState = state;
  }
  _getStream() {
    return this.#streamState.stream;
  }
  _getSqlCache() {
    return this.#streamState.conn.sqlCache;
  }
  close() {
    this.#client._closeStream(this.#streamState);
  }
  get closed() {
    return this.#streamState.stream.closed;
  }
}
// node_modules/@libsql/client/lib-esm/http.js
function _createClient3(config4) {
  if (config4.scheme !== "https" && config4.scheme !== "http") {
    throw new LibsqlError('The HTTP client supports only "libsql:", "https:" and "http:" URLs, ' + `got ${JSON.stringify(config4.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (config4.scheme === "http" && config4.tls) {
    throw new LibsqlError(`A "http:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
  } else if (config4.scheme === "https" && !config4.tls) {
    throw new LibsqlError(`A "https:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
  }
  const url = encodeBaseUrl(config4.scheme, config4.authority, config4.path);
  return new HttpClient2(url, config4.authToken, config4.intMode, config4.fetch);
}
var sqlCacheCapacity2 = 30;

class HttpClient2 {
  #client;
  protocol;
  constructor(url, authToken, intMode, customFetch) {
    this.#client = openHttp(url, authToken, customFetch);
    this.#client.intMode = intMode;
    this.protocol = "http";
  }
  async execute(stmt3) {
    try {
      const hranaStmt = stmtToHrana(stmt3);
      let rowsPromise;
      const stream5 = this.#client.openStream();
      try {
        rowsPromise = stream5.query(hranaStmt);
      } finally {
        stream5.closeGracefully();
      }
      return resultSetFromHrana(await rowsPromise);
    } catch (e3) {
      throw mapHranaError(e3);
    }
  }
  async batch(stmts, mode = "deferred") {
    try {
      const hranaStmts = stmts.map(stmtToHrana);
      const version4 = await this.#client.getVersion();
      let resultsPromise;
      const stream5 = this.#client.openStream();
      try {
        const sqlCache = new SqlCache(stream5, sqlCacheCapacity2);
        sqlCache.apply(hranaStmts);
        const batch2 = stream5.batch(false);
        resultsPromise = executeHranaBatch(mode, version4, batch2, hranaStmts);
      } finally {
        stream5.closeGracefully();
      }
      return await resultsPromise;
    } catch (e3) {
      throw mapHranaError(e3);
    }
  }
  async transaction(mode = "write") {
    try {
      const version4 = await this.#client.getVersion();
      return new HttpTransaction(this.#client.openStream(), mode, version4);
    } catch (e3) {
      throw mapHranaError(e3);
    }
  }
  async executeMultiple(sql11) {
    try {
      let promise;
      const stream5 = this.#client.openStream();
      try {
        promise = stream5.sequence(sql11);
      } finally {
        stream5.closeGracefully();
      }
      await promise;
    } catch (e3) {
      throw mapHranaError(e3);
    }
  }
  sync() {
    throw new LibsqlError("sync not supported in http mode", "SYNC_NOT_SUPPORTED");
  }
  close() {
    this.#client.close();
  }
  get closed() {
    return this.#client.closed;
  }
}

class HttpTransaction extends HranaTransaction {
  #stream;
  #sqlCache;
  constructor(stream5, mode, version4) {
    super(mode, version4);
    this.#stream = stream5;
    this.#sqlCache = new SqlCache(stream5, sqlCacheCapacity2);
  }
  _getStream() {
    return this.#stream;
  }
  _getSqlCache() {
    return this.#sqlCache;
  }
  close() {
    this.#stream.close();
  }
  get closed() {
    return this.#stream.closed;
  }
}

// node_modules/@libsql/client/lib-esm/node.js
function createClient(config5) {
  return _createClient4(expandConfig(config5, true));
}
var _createClient4 = function(config5) {
  if (config5.scheme === "wss" || config5.scheme === "ws") {
    return _createClient2(config5);
  } else if (config5.scheme === "https" || config5.scheme === "http") {
    return _createClient3(config5);
  } else {
    return _createClient(config5);
  }
};

// node_modules/drizzle-orm/selection-proxy.js
class SelectionProxyHandler {
  static [entityKind] = "SelectionProxyHandler";
  config;
  constructor(config5) {
    this.config = { ...config5 };
  }
  get(subquery4, prop) {
    if (prop === SubqueryConfig) {
      return {
        ...subquery4[SubqueryConfig],
        selection: new Proxy(subquery4[SubqueryConfig].selection, this)
      };
    }
    if (prop === ViewBaseConfig) {
      return {
        ...subquery4[ViewBaseConfig],
        selectedFields: new Proxy(subquery4[ViewBaseConfig].selectedFields, this)
      };
    }
    if (typeof prop === "symbol") {
      return subquery4[prop];
    }
    const columns = is(subquery4, Subquery) ? subquery4[SubqueryConfig].selection : is(subquery4, View) ? subquery4[ViewBaseConfig].selectedFields : subquery4;
    const value3 = columns[prop];
    if (is(value3, SQL.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !value3.isSelectionField) {
        return value3.sql;
      }
      const newValue = value3.clone();
      newValue.isSelectionField = true;
      return newValue;
    }
    if (is(value3, SQL)) {
      if (this.config.sqlBehavior === "sql") {
        return value3;
      }
      throw new Error(`You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
    }
    if (is(value3, Column)) {
      if (this.config.alias) {
        return new Proxy(value3, new ColumnAliasProxyHandler(new Proxy(value3.table, new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false))));
      }
      return value3;
    }
    if (typeof value3 !== "object" || value3 === null) {
      return value3;
    }
    return new Proxy(value3, new SelectionProxyHandler(this.config));
  }
}

// node_modules/drizzle-orm/sqlite-core/table.js
var sqliteTableBase = function(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new SQLiteTable(name, schema, baseName);
  const builtColumns = Object.fromEntries(Object.entries(columns).map(([name2, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    const column7 = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column7, rawTable));
    return [name2, column7];
  }));
  const table9 = Object.assign(rawTable, builtColumns);
  table9[Table.Symbol.Columns] = builtColumns;
  if (extraConfig) {
    table9[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table9;
};
var InlineForeignKeys2 = Symbol.for("drizzle:SQLiteInlineForeignKeys");

class SQLiteTable extends Table {
  static [entityKind] = "SQLiteTable";
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys: InlineForeignKeys2
  });
  [Table.Symbol.Columns];
  [InlineForeignKeys2] = [];
  [Table.Symbol.ExtraConfigBuilder] = undefined;
}
var sqliteTable = (name, columns, extraConfig) => {
  return sqliteTableBase(name, columns, extraConfig);
};

// node_modules/drizzle-orm/sqlite-core/query-builders/delete.js
class SQLiteDeleteBase extends QueryPromise {
  constructor(table10, session, dialect) {
    super();
    this.table = table10;
    this.session = session;
    this.dialect = dialect;
    this.config = { table: table10 };
  }
  static [entityKind] = "SQLiteDelete";
  config;
  where(where) {
    this.config.where = where;
    return this;
  }
  returning(fields = this.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  prepare(isOneTimeQuery) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run");
  }
  run = (placeholderValues) => {
    return this.prepare(true).run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this.prepare(true).all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this.prepare(true).get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this.prepare(true).values(placeholderValues);
  };
  async execute(placeholderValues) {
    return this.prepare(true).execute(placeholderValues);
  }
  $dynamic() {
    return this;
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/insert.js
class SQLiteInsertBuilder {
  constructor(table12, session, dialect) {
    this.table = table12;
    this.session = session;
    this.dialect = dialect;
  }
  static [entityKind] = "SQLiteInsertBuilder";
  values(values) {
    values = Array.isArray(values) ? values : [values];
    if (values.length === 0) {
      throw new Error("values() must be called with at least one value");
    }
    const mappedValues = values.map((entry) => {
      const result5 = {};
      const cols = this.table[Table.Symbol.Columns];
      for (const colKey of Object.keys(entry)) {
        const colValue = entry[colKey];
        result5[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
      }
      return result5;
    });
    return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect);
  }
}

class SQLiteInsertBase extends QueryPromise {
  constructor(table12, values, session, dialect) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { table: table12, values };
  }
  static [entityKind] = "SQLiteInsert";
  config;
  returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  onConflictDoNothing(config5 = {}) {
    if (config5.target === undefined) {
      this.config.onConflict = sql2`do nothing`;
    } else {
      const targetSql = Array.isArray(config5.target) ? sql2`${config5.target}` : sql2`${[config5.target]}`;
      const whereSql = config5.where ? sql2` where ${config5.where}` : sql2``;
      this.config.onConflict = sql2`${targetSql} do nothing${whereSql}`;
    }
    return this;
  }
  onConflictDoUpdate(config5) {
    const targetSql = Array.isArray(config5.target) ? sql2`${config5.target}` : sql2`${[config5.target]}`;
    const whereSql = config5.where ? sql2` where ${config5.where}` : sql2``;
    const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config5.set));
    this.config.onConflict = sql2`${targetSql} do update set ${setSql}${whereSql}`;
    return this;
  }
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  prepare(isOneTimeQuery) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run");
  }
  run = (placeholderValues) => {
    return this.prepare(true).run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this.prepare(true).all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this.prepare(true).get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this.prepare(true).values(placeholderValues);
  };
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
}

// node_modules/drizzle-orm/sqlite-core/foreign-keys.js
class ForeignKeyBuilder {
  static [entityKind] = "SQLiteForeignKeyBuilder";
  reference;
  _onUpdate;
  _onDelete;
  constructor(config5, actions) {
    this.reference = () => {
      const { name, columns, foreignColumns } = config5();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action;
    return this;
  }
  build(table13) {
    return new ForeignKey(table13, this);
  }
}

class ForeignKey {
  constructor(table13, builder) {
    this.table = table13;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "SQLiteForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column7) => column7.name);
    const foreignColumnNames = foreignColumns.map((column7) => column7.name);
    const chunks = [
      this.table[SQLiteTable.Symbol.Name],
      ...columnNames,
      foreignColumns[0].table[SQLiteTable.Symbol.Name],
      ...foreignColumnNames
    ];
    return name ?? `${chunks.join("_")}_fk`;
  }
}

// node_modules/drizzle-orm/sqlite-core/unique-constraint.js
var uniqueKeyName = function(table14, columns) {
  return `${table14[SQLiteTable.Symbol.Name]}_${columns.join("_")}_unique`;
};

// node_modules/drizzle-orm/sqlite-core/columns/common.js
class SQLiteColumnBuilder extends ColumnBuilder {
  static [entityKind] = "SQLiteColumnBuilder";
  foreignKeyConfigs = [];
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    return this;
  }
  buildForeignKeys(column8, table14) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return ((ref2, actions2) => {
        const builder = new ForeignKeyBuilder(() => {
          const foreignColumn = ref2();
          return { columns: [column8], foreignColumns: [foreignColumn] };
        });
        if (actions2.onUpdate) {
          builder.onUpdate(actions2.onUpdate);
        }
        if (actions2.onDelete) {
          builder.onDelete(actions2.onDelete);
        }
        return builder.build(table14);
      })(ref, actions);
    });
  }
}

class SQLiteColumn extends Column {
  constructor(table14, config5) {
    if (!config5.uniqueName) {
      config5.uniqueName = uniqueKeyName(table14, [config5.name]);
    }
    super(table14, config5);
    this.table = table14;
  }
  static [entityKind] = "SQLiteColumn";
}

// node_modules/drizzle-orm/sqlite-core/columns/integer.js
var integer = function(name, config5) {
  if (config5?.mode === "timestamp" || config5?.mode === "timestamp_ms") {
    return new SQLiteTimestampBuilder(name, config5.mode);
  }
  if (config5?.mode === "boolean") {
    return new SQLiteBooleanBuilder(name, config5.mode);
  }
  return new SQLiteIntegerBuilder(name);
};

class SQLiteBaseIntegerBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBaseIntegerBuilder";
  constructor(name, dataType, columnType) {
    super(name, dataType, columnType);
    this.config.autoIncrement = false;
  }
  primaryKey(config5) {
    if (config5?.autoIncrement) {
      this.config.autoIncrement = true;
    }
    this.config.hasDefault = true;
    return super.primaryKey();
  }
}

class SQLiteBaseInteger extends SQLiteColumn {
  static [entityKind] = "SQLiteBaseInteger";
  autoIncrement = this.config.autoIncrement;
  getSQLType() {
    return "integer";
  }
}

class SQLiteIntegerBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteIntegerBuilder";
  constructor(name) {
    super(name, "number", "SQLiteInteger");
  }
  build(table14) {
    return new SQLiteInteger(table14, this.config);
  }
}

class SQLiteInteger extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteInteger";
}

class SQLiteTimestampBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteTimestampBuilder";
  constructor(name, mode) {
    super(name, "date", "SQLiteTimestamp");
    this.config.mode = mode;
  }
  defaultNow() {
    return this.default(sql2`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
  }
  build(table14) {
    return new SQLiteTimestamp(table14, this.config);
  }
}

class SQLiteTimestamp extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteTimestamp";
  mode = this.config.mode;
  mapFromDriverValue(value3) {
    if (this.config.mode === "timestamp") {
      return new Date(value3 * 1000);
    }
    return new Date(value3);
  }
  mapToDriverValue(value3) {
    const unix = value3.getTime();
    if (this.config.mode === "timestamp") {
      return Math.floor(unix / 1000);
    }
    return unix;
  }
}

class SQLiteBooleanBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteBooleanBuilder";
  constructor(name, mode) {
    super(name, "boolean", "SQLiteBoolean");
    this.config.mode = mode;
  }
  build(table14) {
    return new SQLiteBoolean(table14, this.config);
  }
}

class SQLiteBoolean extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteBoolean";
  mode = this.config.mode;
  mapFromDriverValue(value3) {
    return Number(value3) === 1;
  }
  mapToDriverValue(value3) {
    return value3 ? 1 : 0;
  }
}

// node_modules/drizzle-orm/sqlite-core/columns/text.js
var text = function(name, config5 = {}) {
  return config5.mode === "json" ? new SQLiteTextJsonBuilder(name) : new SQLiteTextBuilder(name, config5);
};

class SQLiteTextBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextBuilder";
  constructor(name, config5) {
    super(name, "string", "SQLiteText");
    this.config.enumValues = config5.enum;
    this.config.length = config5.length;
  }
  build(table14) {
    return new SQLiteText(table14, this.config);
  }
}

class SQLiteText extends SQLiteColumn {
  static [entityKind] = "SQLiteText";
  enumValues = this.config.enumValues;
  length = this.config.length;
  constructor(table14, config5) {
    super(table14, config5);
  }
  getSQLType() {
    return `text${this.config.length ? `(${this.config.length})` : ""}`;
  }
}

class SQLiteTextJsonBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextJsonBuilder";
  constructor(name) {
    super(name, "json", "SQLiteTextJson");
  }
  build(table14) {
    return new SQLiteTextJson(table14, this.config);
  }
}

class SQLiteTextJson extends SQLiteColumn {
  static [entityKind] = "SQLiteTextJson";
  getSQLType() {
    return "text";
  }
  mapFromDriverValue(value3) {
    return JSON.parse(value3);
  }
  mapToDriverValue(value3) {
    return JSON.stringify(value3);
  }
}

// node_modules/drizzle-orm/sqlite-core/view-base.js
class SQLiteViewBase extends View {
  static [entityKind] = "SQLiteViewBase";
}

// node_modules/drizzle-orm/sqlite-core/dialect.js
class SQLiteDialect {
  static [entityKind] = "SQLiteDialect";
  escapeName(name) {
    return `"${name}"`;
  }
  escapeParam(_num) {
    return "?";
  }
  escapeString(str) {
    return `'${str.replace(/'/g, "''")}'`;
  }
  buildDeleteQuery({ table: table16, where, returning }) {
    const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const whereSql = where ? sql2` where ${where}` : undefined;
    return sql2`delete from ${table16}${whereSql}${returningSql}`;
  }
  buildUpdateSet(table16, set) {
    const setEntries = Object.entries(set);
    const setSize = setEntries.length;
    return sql2.join(setEntries.flatMap(([colName, value3], i8) => {
      const col = table16[Table.Symbol.Columns][colName];
      const res = sql2`${sql2.identifier(col.name)} = ${value3}`;
      if (i8 < setSize - 1) {
        return [res, sql2.raw(", ")];
      }
      return [res];
    }));
  }
  buildUpdateQuery({ table: table16, set, where, returning }) {
    const setSql = this.buildUpdateSet(table16, set);
    const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const whereSql = where ? sql2` where ${where}` : undefined;
    return sql2`update ${table16} set ${setSql}${whereSql}${returningSql}`;
  }
  buildSelection(fields, { isSingleTable = false } = {}) {
    const columnsLen = fields.length;
    const chunks = fields.flatMap(({ field }, i8) => {
      const chunk = [];
      if (is(field, SQL.Aliased) && field.isSelectionField) {
        chunk.push(sql2.identifier(field.fieldAlias));
      } else if (is(field, SQL.Aliased) || is(field, SQL)) {
        const query = is(field, SQL.Aliased) ? field.sql : field;
        if (isSingleTable) {
          chunk.push(new SQL(query.queryChunks.map((c10) => {
            if (is(c10, Column)) {
              return sql2.identifier(c10.name);
            }
            return c10;
          })));
        } else {
          chunk.push(query);
        }
        if (is(field, SQL.Aliased)) {
          chunk.push(sql2` as ${sql2.identifier(field.fieldAlias)}`);
        }
      } else if (is(field, Column)) {
        const tableName = field.table[Table.Symbol.Name];
        const columnName = field.name;
        if (isSingleTable) {
          chunk.push(sql2.identifier(columnName));
        } else {
          chunk.push(sql2`${sql2.identifier(tableName)}.${sql2.identifier(columnName)}`);
        }
      }
      if (i8 < columnsLen - 1) {
        chunk.push(sql2`, `);
      }
      return chunk;
    });
    return sql2.join(chunks);
  }
  buildSelectQuery({
    withList,
    fields,
    fieldsFlat,
    where,
    having,
    table: table16,
    joins,
    orderBy,
    groupBy,
    limit,
    offset,
    distinct,
    setOperators
  }) {
    const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
    for (const f10 of fieldsList) {
      if (is(f10.field, Column) && getTableName(f10.field.table) !== (is(table16, Subquery) ? table16[SubqueryConfig].alias : is(table16, SQLiteViewBase) ? table16[ViewBaseConfig].name : is(table16, SQL) ? undefined : getTableName(table16)) && !((table22) => joins?.some(({ alias: alias3 }) => alias3 === (table22[Table.Symbol.IsAlias] ? getTableName(table22) : table22[Table.Symbol.BaseName])))(f10.field.table)) {
        const tableName = getTableName(f10.field.table);
        throw new Error(`Your "${f10.path.join("->")}" field references a column "${tableName}"."${f10.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
      }
    }
    const isSingleTable = !joins || joins.length === 0;
    let withSql;
    if (withList?.length) {
      const withSqlChunks = [sql2`with `];
      for (const [i8, w] of withList.entries()) {
        withSqlChunks.push(sql2`${sql2.identifier(w[SubqueryConfig].alias)} as (${w[SubqueryConfig].sql})`);
        if (i8 < withList.length - 1) {
          withSqlChunks.push(sql2`, `);
        }
      }
      withSqlChunks.push(sql2` `);
      withSql = sql2.join(withSqlChunks);
    }
    const distinctSql = distinct ? sql2` distinct` : undefined;
    const selection = this.buildSelection(fieldsList, { isSingleTable });
    const tableSql = (() => {
      if (is(table16, Table) && table16[Table.Symbol.OriginalName] !== table16[Table.Symbol.Name]) {
        return sql2`${sql2.identifier(table16[Table.Symbol.OriginalName])} ${sql2.identifier(table16[Table.Symbol.Name])}`;
      }
      return table16;
    })();
    const joinsArray = [];
    if (joins) {
      for (const [index, joinMeta] of joins.entries()) {
        if (index === 0) {
          joinsArray.push(sql2` `);
        }
        const table22 = joinMeta.table;
        if (is(table22, SQLiteTable)) {
          const tableName = table22[SQLiteTable.Symbol.Name];
          const tableSchema = table22[SQLiteTable.Symbol.Schema];
          const origTableName = table22[SQLiteTable.Symbol.OriginalName];
          const alias3 = tableName === origTableName ? undefined : joinMeta.alias;
          joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join ${tableSchema ? sql2`${sql2.identifier(tableSchema)}.` : undefined}${sql2.identifier(origTableName)}${alias3 && sql2` ${sql2.identifier(alias3)}`} on ${joinMeta.on}`);
        } else {
          joinsArray.push(sql2`${sql2.raw(joinMeta.joinType)} join ${table22} on ${joinMeta.on}`);
        }
        if (index < joins.length - 1) {
          joinsArray.push(sql2` `);
        }
      }
    }
    const joinsSql = sql2.join(joinsArray);
    const whereSql = where ? sql2` where ${where}` : undefined;
    const havingSql = having ? sql2` having ${having}` : undefined;
    const orderByList = [];
    if (orderBy) {
      for (const [index, orderByValue] of orderBy.entries()) {
        orderByList.push(orderByValue);
        if (index < orderBy.length - 1) {
          orderByList.push(sql2`, `);
        }
      }
    }
    const groupByList = [];
    if (groupBy) {
      for (const [index, groupByValue] of groupBy.entries()) {
        groupByList.push(groupByValue);
        if (index < groupBy.length - 1) {
          groupByList.push(sql2`, `);
        }
      }
    }
    const groupBySql = groupByList.length > 0 ? sql2` group by ${sql2.join(groupByList)}` : undefined;
    const orderBySql = orderByList.length > 0 ? sql2` order by ${sql2.join(orderByList)}` : undefined;
    const limitSql = limit ? sql2` limit ${limit}` : undefined;
    const offsetSql = offset ? sql2` offset ${offset}` : undefined;
    const finalQuery = sql2`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
    if (setOperators.length > 0) {
      return this.buildSetOperations(finalQuery, setOperators);
    }
    return finalQuery;
  }
  buildSetOperations(leftSelect, setOperators) {
    const [setOperator, ...rest] = setOperators;
    if (!setOperator) {
      throw new Error("Cannot pass undefined values to any set operator");
    }
    if (rest.length === 0) {
      return this.buildSetOperationQuery({ leftSelect, setOperator });
    }
    return this.buildSetOperations(this.buildSetOperationQuery({ leftSelect, setOperator }), rest);
  }
  buildSetOperationQuery({
    leftSelect,
    setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
  }) {
    const leftChunk = sql2`${leftSelect.getSQL()} `;
    const rightChunk = sql2`${rightSelect.getSQL()}`;
    let orderBySql;
    if (orderBy && orderBy.length > 0) {
      const orderByValues = [];
      for (const singleOrderBy of orderBy) {
        if (is(singleOrderBy, SQLiteColumn)) {
          orderByValues.push(sql2.identifier(singleOrderBy.name));
        } else if (is(singleOrderBy, SQL)) {
          for (let i8 = 0;i8 < singleOrderBy.queryChunks.length; i8++) {
            const chunk = singleOrderBy.queryChunks[i8];
            if (is(chunk, SQLiteColumn)) {
              singleOrderBy.queryChunks[i8] = sql2.identifier(chunk.name);
            }
          }
          orderByValues.push(sql2`${singleOrderBy}`);
        } else {
          orderByValues.push(sql2`${singleOrderBy}`);
        }
      }
      orderBySql = sql2` order by ${sql2.join(orderByValues, sql2`, `)}`;
    }
    const limitSql = limit ? sql2` limit ${limit}` : undefined;
    const operatorChunk = sql2.raw(`${type} ${isAll ? "all " : ""}`);
    const offsetSql = offset ? sql2` offset ${offset}` : undefined;
    return sql2`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
  }
  buildInsertQuery({ table: table16, values, onConflict, returning }) {
    const valuesSqlList = [];
    const columns2 = table16[Table.Symbol.Columns];
    const colEntries = Object.entries(columns2);
    const insertOrder = colEntries.map(([, column9]) => sql2.identifier(column9.name));
    for (const [valueIndex, value3] of values.entries()) {
      const valueList = [];
      for (const [fieldName, col] of colEntries) {
        const colValue = value3[fieldName];
        if (colValue === undefined || is(colValue, Param) && colValue.value === undefined) {
          let defaultValue;
          if (col.default !== null && col.default !== undefined) {
            defaultValue = is(col.default, SQL) ? col.default : sql2.param(col.default, col);
          } else if (col.defaultFn !== undefined) {
            const defaultFnResult = col.defaultFn();
            defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql2.param(defaultFnResult, col);
          } else {
            defaultValue = sql2`null`;
          }
          valueList.push(defaultValue);
        } else {
          valueList.push(colValue);
        }
      }
      valuesSqlList.push(valueList);
      if (valueIndex < values.length - 1) {
        valuesSqlList.push(sql2`, `);
      }
    }
    const valuesSql = sql2.join(valuesSqlList);
    const returningSql = returning ? sql2` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const onConflictSql = onConflict ? sql2` on conflict ${onConflict}` : undefined;
    return sql2`insert into ${table16} ${insertOrder} values ${valuesSql}${onConflictSql}${returningSql}`;
  }
  sqlToQuery(sql22) {
    return sql22.toQuery({
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString
    });
  }
  buildRelationalQuery({
    fullSchema,
    schema,
    tableNamesMap,
    table: table16,
    tableConfig,
    queryConfig: config5,
    tableAlias,
    nestedQueryRelation,
    joinOn
  }) {
    let selection = [];
    let limit, offset, orderBy = [], where;
    const joins = [];
    if (config5 === true) {
      const selectionEntries = Object.entries(tableConfig.columns);
      selection = selectionEntries.map(([key, value3]) => ({
        dbKey: value3.name,
        tsKey: key,
        field: aliasedTableColumn(value3, tableAlias),
        relationTableTsKey: undefined,
        isJson: false,
        selection: []
      }));
    } else {
      const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key, value3]) => [key, aliasedTableColumn(value3, tableAlias)]));
      if (config5.where) {
        const whereSql = typeof config5.where === "function" ? config5.where(aliasedColumns, getOperators()) : config5.where;
        where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
      }
      const fieldsSelection = [];
      let selectedColumns = [];
      if (config5.columns) {
        let isIncludeMode = false;
        for (const [field, value3] of Object.entries(config5.columns)) {
          if (value3 === undefined) {
            continue;
          }
          if (field in tableConfig.columns) {
            if (!isIncludeMode && value3 === true) {
              isIncludeMode = true;
            }
            selectedColumns.push(field);
          }
        }
        if (selectedColumns.length > 0) {
          selectedColumns = isIncludeMode ? selectedColumns.filter((c10) => config5.columns?.[c10] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
        }
      } else {
        selectedColumns = Object.keys(tableConfig.columns);
      }
      for (const field of selectedColumns) {
        const column9 = tableConfig.columns[field];
        fieldsSelection.push({ tsKey: field, value: column9 });
      }
      let selectedRelations = [];
      if (config5.with) {
        selectedRelations = Object.entries(config5.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
      }
      let extras;
      if (config5.extras) {
        extras = typeof config5.extras === "function" ? config5.extras(aliasedColumns, { sql: sql2 }) : config5.extras;
        for (const [tsKey, value3] of Object.entries(extras)) {
          fieldsSelection.push({
            tsKey,
            value: mapColumnsInAliasedSQLToAlias(value3, tableAlias)
          });
        }
      }
      for (const { tsKey, value: value3 } of fieldsSelection) {
        selection.push({
          dbKey: is(value3, SQL.Aliased) ? value3.fieldAlias : tableConfig.columns[tsKey].name,
          tsKey,
          field: is(value3, Column) ? aliasedTableColumn(value3, tableAlias) : value3,
          relationTableTsKey: undefined,
          isJson: false,
          selection: []
        });
      }
      let orderByOrig = typeof config5.orderBy === "function" ? config5.orderBy(aliasedColumns, getOrderByOperators()) : config5.orderBy ?? [];
      if (!Array.isArray(orderByOrig)) {
        orderByOrig = [orderByOrig];
      }
      orderBy = orderByOrig.map((orderByValue) => {
        if (is(orderByValue, Column)) {
          return aliasedTableColumn(orderByValue, tableAlias);
        }
        return mapColumnsInSQLToAlias(orderByValue, tableAlias);
      });
      limit = config5.limit;
      offset = config5.offset;
      for (const {
        tsKey: selectedRelationTsKey,
        queryConfig: selectedRelationConfigValue,
        relation
      } of selectedRelations) {
        const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
        const relationTableName = relation.referencedTable[Table.Symbol.Name];
        const relationTableTsName = tableNamesMap[relationTableName];
        const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
        const joinOn2 = and(...normalizedRelation.fields.map((field2, i8) => eq(aliasedTableColumn(normalizedRelation.references[i8], relationTableAlias), aliasedTableColumn(field2, tableAlias))));
        const builtRelation = this.buildRelationalQuery({
          fullSchema,
          schema,
          tableNamesMap,
          table: fullSchema[relationTableTsName],
          tableConfig: schema[relationTableTsName],
          queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
          tableAlias: relationTableAlias,
          joinOn: joinOn2,
          nestedQueryRelation: relation
        });
        const field = sql2`(${builtRelation.sql})`.as(selectedRelationTsKey);
        selection.push({
          dbKey: selectedRelationTsKey,
          tsKey: selectedRelationTsKey,
          field,
          relationTableTsKey: relationTableTsName,
          isJson: true,
          selection: builtRelation.selection
        });
      }
    }
    if (selection.length === 0) {
      throw new DrizzleError({
        message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
      });
    }
    let result5;
    where = and(joinOn, where);
    if (nestedQueryRelation) {
      let field = sql2`json_array(${sql2.join(selection.map(({ field: field2 }) => is(field2, SQLiteColumn) ? sql2.identifier(field2.name) : is(field2, SQL.Aliased) ? field2.sql : field2), sql2`, `)})`;
      if (is(nestedQueryRelation, Many)) {
        field = sql2`coalesce(json_group_array(${field}), json_array())`;
      }
      const nestedSelection = [{
        dbKey: "data",
        tsKey: "data",
        field: field.as("data"),
        isJson: true,
        relationTableTsKey: tableConfig.tsName,
        selection
      }];
      const needsSubquery = limit !== undefined || offset !== undefined || orderBy.length > 0;
      if (needsSubquery) {
        result5 = this.buildSelectQuery({
          table: aliasedTable(table16, tableAlias),
          fields: {},
          fieldsFlat: [
            {
              path: [],
              field: sql2.raw("*")
            }
          ],
          where,
          limit,
          offset,
          orderBy,
          setOperators: []
        });
        where = undefined;
        limit = undefined;
        offset = undefined;
        orderBy = undefined;
      } else {
        result5 = aliasedTable(table16, tableAlias);
      }
      result5 = this.buildSelectQuery({
        table: is(result5, SQLiteTable) ? result5 : new Subquery(result5, {}, tableAlias),
        fields: {},
        fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
          path: [],
          field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    } else {
      result5 = this.buildSelectQuery({
        table: aliasedTable(table16, tableAlias),
        fields: {},
        fieldsFlat: selection.map(({ field }) => ({
          path: [],
          field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    }
    return {
      tableTsKey: tableConfig.tsName,
      sql: result5,
      selection
    };
  }
}

class SQLiteSyncDialect extends SQLiteDialect {
  static [entityKind] = "SQLiteSyncDialect";
  migrate(migrations, session) {
    const migrationTableCreate = sql2`
			CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
    session.run(migrationTableCreate);
    const dbMigrations = session.values(sql2`SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`);
    const lastDbMigration = dbMigrations[0] ?? undefined;
    session.run(sql2`BEGIN`);
    try {
      for (const migration of migrations) {
        if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
          for (const stmt3 of migration.sql) {
            session.run(sql2.raw(stmt3));
          }
          session.run(sql2`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
        }
      }
      session.run(sql2`COMMIT`);
    } catch (e3) {
      session.run(sql2`ROLLBACK`);
      throw e3;
    }
  }
}

class SQLiteAsyncDialect extends SQLiteDialect {
  static [entityKind] = "SQLiteAsyncDialect";
  async migrate(migrations, session) {
    const migrationTableCreate = sql2`
			CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
    await session.run(migrationTableCreate);
    const dbMigrations = await session.values(sql2`SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`);
    const lastDbMigration = dbMigrations[0] ?? undefined;
    await session.transaction(async (tx) => {
      for (const migration of migrations) {
        if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
          for (const stmt3 of migration.sql) {
            await tx.run(sql2.raw(stmt3));
          }
          await tx.run(sql2`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
        }
      }
    });
  }
}

// node_modules/drizzle-orm/query-builders/query-builder.js
class TypedQueryBuilder {
  static [entityKind] = "TypedQueryBuilder";
  getSelectedFields() {
    return this._.selectedFields;
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/select.js
var createSetOperator = function(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) {
      if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
        throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
};

class SQLiteSelectBuilder {
  static [entityKind] = "SQLiteSelectBuilder";
  fields;
  session;
  dialect;
  withList;
  distinct;
  constructor(config5) {
    this.fields = config5.fields;
    this.session = config5.session;
    this.dialect = config5.dialect;
    this.withList = config5.withList;
    this.distinct = config5.distinct;
  }
  from(source) {
    const isPartialSelect = !!this.fields;
    let fields;
    if (this.fields) {
      fields = this.fields;
    } else if (is(source, Subquery)) {
      fields = Object.fromEntries(Object.keys(source[SubqueryConfig].selection).map((key) => [key, source[key]]));
    } else if (is(source, SQLiteViewBase)) {
      fields = source[ViewBaseConfig].selectedFields;
    } else if (is(source, SQL)) {
      fields = {};
    } else {
      fields = getTableColumns(source);
    }
    return new SQLiteSelectBase({
      table: source,
      fields,
      isPartialSelect,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct
    });
  }
}

class SQLiteSelectQueryBuilderBase extends TypedQueryBuilder {
  static [entityKind] = "SQLiteSelectQueryBuilder";
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  constructor({ table: table17, fields, isPartialSelect, session, dialect, withList, distinct }) {
    super();
    this.config = {
      withList,
      table: table17,
      fields: { ...fields },
      distinct,
      setOperators: []
    };
    this.isPartialSelect = isPartialSelect;
    this.session = session;
    this.dialect = dialect;
    this._ = {
      selectedFields: fields
    };
    this.tableName = getTableLikeName(table17);
    this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
  }
  createJoin(joinType) {
    return (table17, on) => {
      const baseTableName = this.tableName;
      const tableName = getTableLikeName(table17);
      if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (!this.isPartialSelect) {
        if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
          this.config.fields = {
            [baseTableName]: this.config.fields
          };
        }
        if (typeof tableName === "string" && !is(table17, SQL)) {
          const selection = is(table17, Subquery) ? table17[SubqueryConfig].selection : is(table17, View) ? table17[ViewBaseConfig].selectedFields : table17[Table.Symbol.Columns];
          this.config.fields[tableName] = selection;
        }
      }
      if (typeof on === "function") {
        on = on(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
      }
      if (!this.config.joins) {
        this.config.joins = [];
      }
      this.config.joins.push({ on, table: table17, joinType, alias: tableName });
      if (typeof tableName === "string") {
        switch (joinType) {
          case "left": {
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "inner": {
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
        }
      }
      return this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  createSetOperator(type, isAll) {
    return (rightSelection) => {
      const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
      if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
        throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
      }
      this.config.setOperators.push({ type, isAll, rightSelect });
      return this;
    };
  }
  union = this.createSetOperator("union", false);
  unionAll = this.createSetOperator("union", true);
  intersect = this.createSetOperator("intersect", false);
  except = this.createSetOperator("except", false);
  addSetOperators(setOperators) {
    this.config.setOperators.push(...setOperators);
    return this;
  }
  where(where) {
    if (typeof where === "function") {
      where = where(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.where = where;
    return this;
  }
  having(having) {
    if (typeof having === "function") {
      having = having(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.having = having;
    return this;
  }
  groupBy(...columns2) {
    if (typeof columns2[0] === "function") {
      const groupBy = columns2[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
    } else {
      this.config.groupBy = columns2;
    }
    return this;
  }
  orderBy(...columns2) {
    if (typeof columns2[0] === "function") {
      const orderBy = columns2[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    } else {
      const orderByArray = columns2;
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    }
    return this;
  }
  limit(limit) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).limit = limit;
    } else {
      this.config.limit = limit;
    }
    return this;
  }
  offset(offset) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).offset = offset;
    } else {
      this.config.offset = offset;
    }
    return this;
  }
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  as(alias3) {
    return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias3), new SelectionProxyHandler({ alias: alias3, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
  }
  getSelectedFields() {
    return new Proxy(this.config.fields, new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
  }
  $dynamic() {
    return this;
  }
}

class SQLiteSelectBase extends SQLiteSelectQueryBuilderBase {
  static [entityKind] = "SQLiteSelect";
  prepare(isOneTimeQuery) {
    if (!this.session) {
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    }
    const fieldsList = orderSelectedFields(this.config.fields);
    const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), fieldsList, "all");
    query.joinsNotNullableMap = this.joinsNotNullableMap;
    return query;
  }
  run = (placeholderValues) => {
    return this.prepare(true).run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this.prepare(true).all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this.prepare(true).get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this.prepare(true).values(placeholderValues);
  };
  async execute() {
    return this.all();
  }
}
applyMixins(SQLiteSelectBase, [QueryPromise]);
var getSQLiteSetOperators = () => ({
  union,
  unionAll,
  intersect,
  except
});
var union = createSetOperator("union", false);
var unionAll = createSetOperator("union", true);
var intersect = createSetOperator("intersect", false);
var except = createSetOperator("except", false);

// node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js
class QueryBuilder {
  static [entityKind] = "SQLiteQueryBuilder";
  dialect;
  $with(alias3) {
    const queryBuilder = this;
    return {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(queryBuilder);
        }
        return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias3, true), new SelectionProxyHandler({ alias: alias3, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
  }
  with(...queries) {
    const self2 = this;
    function select2(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: undefined,
        dialect: self2.getDialect(),
        withList: queries
      });
    }
    function selectDistinct(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: undefined,
        dialect: self2.getDialect(),
        withList: queries,
        distinct: true
      });
    }
    return { select: select2, selectDistinct };
  }
  select(fields) {
    return new SQLiteSelectBuilder({ fields: fields ?? undefined, session: undefined, dialect: this.getDialect() });
  }
  selectDistinct(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? undefined,
      session: undefined,
      dialect: this.getDialect(),
      distinct: true
    });
  }
  getDialect() {
    if (!this.dialect) {
      this.dialect = new SQLiteSyncDialect;
    }
    return this.dialect;
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/update.js
class SQLiteUpdateBuilder {
  constructor(table18, session, dialect2) {
    this.table = table18;
    this.session = session;
    this.dialect = dialect2;
  }
  static [entityKind] = "SQLiteUpdateBuilder";
  set(values) {
    return new SQLiteUpdateBase(this.table, mapUpdateSet(this.table, values), this.session, this.dialect);
  }
}

class SQLiteUpdateBase extends QueryPromise {
  constructor(table18, set, session, dialect2) {
    super();
    this.session = session;
    this.dialect = dialect2;
    this.config = { set, table: table18 };
  }
  static [entityKind] = "SQLiteUpdate";
  config;
  where(where) {
    this.config.where = where;
    return this;
  }
  returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  prepare(isOneTimeQuery) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run");
  }
  run = (placeholderValues) => {
    return this.prepare(true).run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this.prepare(true).all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this.prepare(true).get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this.prepare(true).values(placeholderValues);
  };
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/query.js
class RelationalQueryBuilder {
  constructor(mode, fullSchema, schema, tableNamesMap, table18, tableConfig, dialect2, session) {
    this.mode = mode;
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table18;
    this.tableConfig = tableConfig;
    this.dialect = dialect2;
    this.session = session;
  }
  static [entityKind] = "SQLiteAsyncRelationalQueryBuilder";
  findMany(config5) {
    return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config5 ? config5 : {}, "many") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config5 ? config5 : {}, "many");
  }
  findFirst(config5) {
    return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config5 ? { ...config5, limit: 1 } : { limit: 1 }, "first") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config5 ? { ...config5, limit: 1 } : { limit: 1 }, "first");
  }
}

class SQLiteRelationalQuery extends QueryPromise {
  constructor(fullSchema, schema, tableNamesMap, table18, tableConfig, dialect2, session, config5, mode) {
    super();
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table18;
    this.tableConfig = tableConfig;
    this.dialect = dialect2;
    this.session = session;
    this.config = config5;
    this.mode = mode;
  }
  static [entityKind] = "SQLiteAsyncRelationalQuery";
  mode;
  getSQL() {
    return this.dialect.buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    }).sql;
  }
  prepare() {
    const { query, builtQuery } = this._toSQL();
    return this.session.prepareQuery(builtQuery, undefined, this.mode === "first" ? "get" : "all", (rawRows, mapColumnValue) => {
      const rows = rawRows.map((row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
      if (this.mode === "first") {
        return rows[0];
      }
      return rows;
    });
  }
  _toSQL() {
    const query = this.dialect.buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    });
    const builtQuery = this.dialect.sqlToQuery(query.sql);
    return { query, builtQuery };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  executeRaw() {
    if (this.mode === "first") {
      return this.prepare().get();
    }
    return this.prepare().all();
  }
  async execute() {
    return this.executeRaw();
  }
}

class SQLiteSyncRelationalQuery extends SQLiteRelationalQuery {
  static [entityKind] = "SQLiteSyncRelationalQuery";
  sync() {
    return this.executeRaw();
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/raw.js
class SQLiteRaw extends QueryPromise {
  constructor(cb, getSQLCb, action, dialect2, mapBatchResult) {
    super();
    this.cb = cb;
    this.getSQLCb = getSQLCb;
    this.dialect = dialect2;
    this.mapBatchResult = mapBatchResult;
    this.config = { action };
  }
  static [entityKind] = "SQLiteRaw";
  config;
  getSQL() {
    return this.getSQLCb();
  }
  async execute() {
    return this.cb();
  }
  prepare() {
    return {
      getQuery: () => {
        return this.dialect.sqlToQuery(this.getSQL());
      },
      mapResult: (result5, isFromBatch) => {
        return isFromBatch ? this.mapBatchResult(result5) : result5;
      }
    };
  }
}

// node_modules/drizzle-orm/sqlite-core/db.js
class BaseSQLiteDatabase {
  constructor(resultKind, dialect2, session, schema) {
    this.resultKind = resultKind;
    this.dialect = dialect2;
    this.session = session;
    this._ = schema ? { schema: schema.schema, tableNamesMap: schema.tableNamesMap } : { schema: undefined, tableNamesMap: {} };
    this.query = {};
    if (this._.schema) {
      for (const [tableName, columns2] of Object.entries(this._.schema)) {
        this.query[tableName] = new RelationalQueryBuilder(resultKind, schema.fullSchema, this._.schema, this._.tableNamesMap, schema.fullSchema[tableName], columns2, dialect2, session);
      }
    }
  }
  static [entityKind] = "BaseSQLiteDatabase";
  query;
  $with(alias3) {
    return {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder);
        }
        return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias3, true), new SelectionProxyHandler({ alias: alias3, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
  }
  with(...queries) {
    const self2 = this;
    function select2(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries
      });
    }
    function selectDistinct(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries,
        distinct: true
      });
    }
    return { select: select2, selectDistinct };
  }
  select(fields) {
    return new SQLiteSelectBuilder({ fields: fields ?? undefined, session: this.session, dialect: this.dialect });
  }
  selectDistinct(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? undefined,
      session: this.session,
      dialect: this.dialect,
      distinct: true
    });
  }
  update(table18) {
    return new SQLiteUpdateBuilder(table18, this.session, this.dialect);
  }
  insert(into) {
    return new SQLiteInsertBuilder(into, this.session, this.dialect);
  }
  delete(from) {
    return new SQLiteDeleteBase(from, this.session, this.dialect);
  }
  run(query2) {
    const sql18 = query2.getSQL();
    if (this.resultKind === "async") {
      return new SQLiteRaw(async () => this.session.run(sql18), () => sql18, "run", this.dialect, this.session.extractRawRunValueFromBatchResult.bind(this.session));
    }
    return this.session.run(sql18);
  }
  all(query2) {
    const sql18 = query2.getSQL();
    if (this.resultKind === "async") {
      return new SQLiteRaw(async () => this.session.all(sql18), () => sql18, "all", this.dialect, this.session.extractRawAllValueFromBatchResult.bind(this.session));
    }
    return this.session.all(sql18);
  }
  get(query2) {
    const sql18 = query2.getSQL();
    if (this.resultKind === "async") {
      return new SQLiteRaw(async () => this.session.get(sql18), () => sql18, "get", this.dialect, this.session.extractRawGetValueFromBatchResult.bind(this.session));
    }
    return this.session.get(sql18);
  }
  values(query2) {
    const sql18 = query2.getSQL();
    if (this.resultKind === "async") {
      return new SQLiteRaw(async () => this.session.values(sql18), () => sql18, "values", this.dialect, this.session.extractRawValuesValueFromBatchResult.bind(this.session));
    }
    return this.session.values(sql18);
  }
  transaction(transaction, config5) {
    return this.session.transaction(transaction, config5);
  }
}

// node_modules/drizzle-orm/sqlite-core/session.js
class ExecuteResultSync extends QueryPromise {
  constructor(resultCb) {
    super();
    this.resultCb = resultCb;
  }
  static [entityKind] = "ExecuteResultSync";
  async execute() {
    return this.resultCb();
  }
  sync() {
    return this.resultCb();
  }
}

class SQLitePreparedQuery {
  constructor(mode, executeMethod, query2) {
    this.mode = mode;
    this.executeMethod = executeMethod;
    this.query = query2;
  }
  static [entityKind] = "PreparedQuery";
  joinsNotNullableMap;
  getQuery() {
    return this.query;
  }
  mapRunResult(result5, _isFromBatch) {
    return result5;
  }
  mapAllResult(_result, _isFromBatch) {
    throw new Error("Not implemented");
  }
  mapGetResult(_result, _isFromBatch) {
    throw new Error("Not implemented");
  }
  execute(placeholderValues) {
    if (this.mode === "async") {
      return this[this.executeMethod](placeholderValues);
    }
    return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
  }
  mapResult(response, isFromBatch) {
    switch (this.executeMethod) {
      case "run": {
        return this.mapRunResult(response, isFromBatch);
      }
      case "all": {
        return this.mapAllResult(response, isFromBatch);
      }
      case "get": {
        return this.mapGetResult(response, isFromBatch);
      }
    }
  }
}

class SQLiteSession {
  constructor(dialect2) {
    this.dialect = dialect2;
  }
  static [entityKind] = "SQLiteSession";
  prepareOneTimeQuery(query2, fields, executeMethod) {
    return this.prepareQuery(query2, fields, executeMethod);
  }
  run(query2) {
    const staticQuery = this.dialect.sqlToQuery(query2);
    try {
      return this.prepareOneTimeQuery(staticQuery, undefined, "run").run();
    } catch (err) {
      throw new DrizzleError({ cause: err, message: `Failed to run the query '${staticQuery.sql}'` });
    }
  }
  extractRawRunValueFromBatchResult(result5) {
    return result5;
  }
  all(query2) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query2), undefined, "run").all();
  }
  extractRawAllValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
  get(query2) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query2), undefined, "run").get();
  }
  extractRawGetValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
  values(query2) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query2), undefined, "run").values();
  }
  extractRawValuesValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
}

class SQLiteTransaction extends BaseSQLiteDatabase {
  constructor(resultType, dialect2, session, schema, nestedIndex = 0) {
    super(resultType, dialect2, session, schema);
    this.schema = schema;
    this.nestedIndex = nestedIndex;
  }
  static [entityKind] = "SQLiteTransaction";
  rollback() {
    throw new TransactionRollbackError;
  }
}

// node_modules/drizzle-orm/libsql/session.js
var normalizeRow = function(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (Object.prototype.propertyIsEnumerable.call(obj, key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
var normalizeFieldValue = function(value3) {
  if (typeof ArrayBuffer !== "undefined" && value3 instanceof ArrayBuffer) {
    if (typeof Buffer !== "undefined") {
      if (!(value3 instanceof Buffer)) {
        return Buffer.from(value3);
      }
      return value3;
    }
    if (typeof TextDecoder !== "undefined") {
      return new TextDecoder().decode(value3);
    }
    throw new Error("TextDecoder is not available. Please provide either Buffer or TextDecoder polyfill.");
  }
  return value3;
};

class LibSQLSession extends SQLiteSession {
  constructor(client6, dialect2, schema, options2, tx) {
    super(dialect2);
    this.client = client6;
    this.schema = schema;
    this.options = options2;
    this.tx = tx;
    this.logger = options2.logger ?? new NoopLogger;
  }
  static [entityKind] = "LibSQLSession";
  logger;
  prepareQuery(query2, fields, executeMethod, customResultMapper) {
    return new LibSQLPreparedQuery(this.client, query2, this.logger, fields, this.tx, executeMethod, customResultMapper);
  }
  async batch(queries) {
    const preparedQueries = [];
    const builtQueries = [];
    for (const query2 of queries) {
      const preparedQuery = query2.prepare();
      const builtQuery = preparedQuery.getQuery();
      preparedQueries.push(preparedQuery);
      builtQueries.push({ sql: builtQuery.sql, args: builtQuery.params });
    }
    const batchResults = await this.client.batch(builtQueries);
    return batchResults.map((result5, i8) => preparedQueries[i8].mapResult(result5, true));
  }
  async transaction(transaction, _config) {
    const libsqlTx = await this.client.transaction();
    const session2 = new LibSQLSession(this.client, this.dialect, this.schema, this.options, libsqlTx);
    const tx = new LibSQLTransaction("async", this.dialect, session2, this.schema);
    try {
      const result5 = await transaction(tx);
      await libsqlTx.commit();
      return result5;
    } catch (err) {
      await libsqlTx.rollback();
      throw err;
    }
  }
  extractRawAllValueFromBatchResult(result5) {
    return result5.rows;
  }
  extractRawGetValueFromBatchResult(result5) {
    return result5.rows[0];
  }
  extractRawValuesValueFromBatchResult(result5) {
    return result5.rows;
  }
}

class LibSQLTransaction extends SQLiteTransaction {
  static [entityKind] = "LibSQLTransaction";
  async transaction(transaction) {
    const savepointName = `sp${this.nestedIndex}`;
    const tx = new LibSQLTransaction("async", this.dialect, this.session, this.schema, this.nestedIndex + 1);
    await this.session.run(sql2.raw(`savepoint ${savepointName}`));
    try {
      const result5 = await transaction(tx);
      await this.session.run(sql2.raw(`release savepoint ${savepointName}`));
      return result5;
    } catch (err) {
      await this.session.run(sql2.raw(`rollback to savepoint ${savepointName}`));
      throw err;
    }
  }
}

class LibSQLPreparedQuery extends SQLitePreparedQuery {
  constructor(client6, query2, logger2, fields, tx, executeMethod, customResultMapper) {
    super("async", executeMethod, query2);
    this.client = client6;
    this.logger = logger2;
    this.fields = fields;
    this.tx = tx;
    this.customResultMapper = customResultMapper;
    this.customResultMapper = customResultMapper;
    this.fields = fields;
  }
  static [entityKind] = "LibSQLPreparedQuery";
  run(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    const stmt3 = { sql: this.query.sql, args: params };
    return this.tx ? this.tx.execute(stmt3) : this.client.execute(stmt3);
  }
  async all(placeholderValues) {
    const { fields, logger: logger2, query: query2, tx, client: client6, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      const params = fillPlaceholders(query2.params, placeholderValues ?? {});
      logger2.logQuery(query2.sql, params);
      const stmt3 = { sql: query2.sql, args: params };
      return (tx ? tx.execute(stmt3) : client6.execute(stmt3)).then(({ rows: rows2 }) => this.mapAllResult(rows2));
    }
    const rows = await this.values(placeholderValues);
    return this.mapAllResult(rows);
  }
  mapAllResult(rows, isFromBatch) {
    if (isFromBatch) {
      rows = rows.rows;
    }
    if (!this.fields && !this.customResultMapper) {
      return rows.map((row) => normalizeRow(row));
    }
    if (this.customResultMapper) {
      return this.customResultMapper(rows, normalizeFieldValue);
    }
    return rows.map((row) => {
      return mapResultRow(this.fields, Array.prototype.slice.call(row).map((v) => normalizeFieldValue(v)), this.joinsNotNullableMap);
    });
  }
  async get(placeholderValues) {
    const { fields, logger: logger2, query: query2, tx, client: client6, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      const params = fillPlaceholders(query2.params, placeholderValues ?? {});
      logger2.logQuery(query2.sql, params);
      const stmt3 = { sql: query2.sql, args: params };
      return (tx ? tx.execute(stmt3) : client6.execute(stmt3)).then(({ rows: rows2 }) => this.mapGetResult(rows2));
    }
    const rows = await this.values(placeholderValues);
    return this.mapGetResult(rows);
  }
  mapGetResult(rows, isFromBatch) {
    if (isFromBatch) {
      rows = rows.rows;
    }
    const row = rows[0];
    if (!this.fields && !this.customResultMapper) {
      return normalizeRow(row);
    }
    if (!row) {
      return;
    }
    if (this.customResultMapper) {
      return this.customResultMapper(rows, normalizeFieldValue);
    }
    return mapResultRow(this.fields, Array.prototype.slice.call(row).map((v) => normalizeFieldValue(v)), this.joinsNotNullableMap);
  }
  values(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    const stmt3 = { sql: this.query.sql, args: params };
    return (this.tx ? this.tx.execute(stmt3) : this.client.execute(stmt3)).then(({ rows }) => rows);
  }
}

// node_modules/drizzle-orm/libsql/driver.js
var drizzle = function(client6, config5 = {}) {
  const dialect3 = new SQLiteAsyncDialect;
  let logger3;
  if (config5.logger === true) {
    logger3 = new DefaultLogger;
  } else if (config5.logger !== false) {
    logger3 = config5.logger;
  }
  let schema;
  if (config5.schema) {
    const tablesConfig = extractTablesRelationalConfig(config5.schema, createTableRelationsHelpers);
    schema = {
      fullSchema: config5.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const session3 = new LibSQLSession(client6, dialect3, schema, { logger: logger3 }, undefined);
  return new LibSQLDatabase("async", dialect3, session3, schema);
};

class LibSQLDatabase extends BaseSQLiteDatabase {
  static [entityKind] = "LibSQLDatabase";
  async batch(batch2) {
    return this.session.batch(batch2);
  }
}

// src/db/schema.ts
var exports_schema = {};
__export(exports_schema, {
  todosTbl: () => {
    {
      return todosTbl;
    }
  }
});
var todosTbl = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }).unique(),
  content: text("content").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false)
});

// src/db/index.ts
var client7 = createClient({
  url: "libsql://beth-ex1-db-carltonj2000.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDI0LTAxLTEyVDE2OjM3OjI1LjQ3MDExOTg1NloiLCJpZCI6IjZiM2U5NzdhLWIxNjgtMTFlZS04ZmRkLWNhODg0YjRhMDA4OCJ9._wpBbiVfc37sFWr-nW7-qG58S4sMqiBt7wSe4AR35Y09_737YUGiu35AJQHmWxMbdTmXpJp2kDYVK87s-M-eDQ"
});
var db3 = drizzle(client7, { schema: exports_schema, logger: true });

// src/index.tsx
var TodoItem = function({ content, completed, id }) {
  return elements.createElement("div", {
    class: "flex flex-row space-x-3"
  }, elements.createElement("p", null, content), elements.createElement("input", {
    type: "checkbox",
    checked: completed,
    "hx-post": `/todos/toggle/${id}`,
    "hx-target": "closest div",
    "hx-swap": "outerHTML"
  }), elements.createElement("button", {
    class: "text-red-500",
    "hx-delete": `/todos/${id}`,
    "hx-target": "closest div",
    "hx-swap": "outerHTML"
  }, "X"));
};
var TodoList = function({ todos }) {
  return elements.createElement("div", null, todos.map((todo) => elements.createElement(TodoItem, {
    ...todo
  })), elements.createElement(TodoForm, null));
};
var TodoForm = function() {
  return elements.createElement("form", {
    class: "flex flex-row space-x-3",
    "hx-post": "todos",
    "hx-swap": "beforebegin",
    _: "on submit target.reset()"
  }, elements.createElement("input", {
    type: "text",
    name: "content",
    class: "border border-black"
  }), elements.createElement("button", {
    type: "submit"
  }, "Add"));
};
var app = new M8().use(html()).get("/", ({ html: html4 }) => html4(elements.createElement(BaseHtml, null, elements.createElement("body", {
  class: "flex w-full h-screen justify-center items-center",
  "hx-get": "/todos",
  "hx-trigger": "load",
  "hx-swap": "innerHTML"
})))).post("/clicked", () => elements.createElement("div", null, "I'm from the server")).get("/todos", async () => {
  const data = await db3.select().from(todosTbl).all();
  return elements.createElement(TodoList, {
    todos: data
  });
}).post("/todos/toggle/:id", async ({ params }) => {
  const oldTodo = await db3.select().from(todosTbl).where(eq(todosTbl.id, params.id)).get();
  const newTodo = await db3.update(todosTbl).set({ completed: !oldTodo?.completed }).where(eq(todosTbl.id, params.id)).returning().get();
  return elements.createElement(TodoItem, {
    ...newTodo
  });
}, { params: W0.Object({ id: W0.Numeric() }) }).delete("/todos/:id", async ({ params }) => {
  await db3.delete(todosTbl).where(eq(todosTbl.id, params.id)).run();
}, { params: W0.Object({ id: W0.Numeric() }) }).post("/todos", async ({ body }) => {
  if (body.content.length === 0) {
    throw new Error("Content cannot be empty");
  }
  const todo = await db3.insert(todosTbl).values(body).returning().get();
  return elements.createElement(TodoItem, {
    ...todo
  });
}, { body: W0.Object({ content: W0.String() }) }).get("/styles.css", () => Bun.file("./src/styles.css")).listen(3000);
console.log(`Elysia running at http://${app.server?.hostname}:${app.server?.port}`);
var BaseHtml = ({ children }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CJ's Beth Stack</title>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
    <link rel="stylesheet" href="/styles.css">
</head>
${children}
</html>
`;
var lastID = db3.length + 1;

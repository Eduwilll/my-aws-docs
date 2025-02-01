import { j as n, c as pe } from "./createLucideIcon.D_iQW354.js";
import { r as m } from "./index.BL7xzsR_.js";
import { r as ke } from "./index.BOCmybfF.js";
function fe(e) {
  var a,
    o,
    t = "";
  if (typeof e == "string" || typeof e == "number") t += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var r = e.length;
      for (a = 0; a < r; a++)
        e[a] && (o = fe(e[a])) && (t && (t += " "), (t += o));
    } else for (o in e) e[o] && (t && (t += " "), (t += o));
  return t;
}
function xe() {
  for (var e, a, o = 0, t = "", r = arguments.length; o < r; o++)
    (e = arguments[o]) && (a = fe(e)) && (t && (t += " "), (t += a));
  return t;
}
const ee = "-",
  Ie = (e) => {
    const a = Re(e),
      { conflictingClassGroups: o, conflictingClassGroupModifiers: t } = e;
    return {
      getClassGroupId: (d) => {
        const s = d.split(ee);
        return s[0] === "" && s.length !== 1 && s.shift(), ge(s, a) || Te(d);
      },
      getConflictingClassGroupIds: (d, s) => {
        const c = o[d] || [];
        return s && t[d] ? [...c, ...t[d]] : c;
      },
    };
  },
  ge = (e, a) => {
    if (e.length === 0) return a.classGroupId;
    const o = e[0],
      t = a.nextPart.get(o),
      r = t ? ge(e.slice(1), t) : void 0;
    if (r) return r;
    if (a.validators.length === 0) return;
    const i = e.join(ee);
    return a.validators.find(({ validator: d }) => d(i))?.classGroupId;
  },
  se = /^\[(.+)\]$/,
  Te = (e) => {
    if (se.test(e)) {
      const a = se.exec(e)[1],
        o = a?.substring(0, a.indexOf(":"));
      if (o) return "arbitrary.." + o;
    }
  },
  Re = (e) => {
    const { theme: a, prefix: o } = e,
      t = { nextPart: new Map(), validators: [] };
    return (
      _e(Object.entries(e.classGroups), o).forEach(([i, d]) => {
        K(d, t, i, a);
      }),
      t
    );
  },
  K = (e, a, o, t) => {
    e.forEach((r) => {
      if (typeof r == "string") {
        const i = r === "" ? a : ne(a, r);
        i.classGroupId = o;
        return;
      }
      if (typeof r == "function") {
        if (Me(r)) {
          K(r(t), a, o, t);
          return;
        }
        a.validators.push({ validator: r, classGroupId: o });
        return;
      }
      Object.entries(r).forEach(([i, d]) => {
        K(d, ne(a, i), o, t);
      });
    });
  },
  ne = (e, a) => {
    let o = e;
    return (
      a.split(ee).forEach((t) => {
        o.nextPart.has(t) ||
          o.nextPart.set(t, { nextPart: new Map(), validators: [] }),
          (o = o.nextPart.get(t));
      }),
      o
    );
  },
  Me = (e) => e.isThemeGetter,
  _e = (e, a) =>
    a
      ? e.map(([o, t]) => {
          const r = t.map((i) =>
            typeof i == "string"
              ? a + i
              : typeof i == "object"
                ? Object.fromEntries(
                    Object.entries(i).map(([d, s]) => [a + d, s]),
                  )
                : i,
          );
          return [o, r];
        })
      : e,
  Fe = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let a = 0,
      o = new Map(),
      t = new Map();
    const r = (i, d) => {
      o.set(i, d), a++, a > e && ((a = 0), (t = o), (o = new Map()));
    };
    return {
      get(i) {
        let d = o.get(i);
        if (d !== void 0) return d;
        if ((d = t.get(i)) !== void 0) return r(i, d), d;
      },
      set(i, d) {
        o.has(i) ? o.set(i, d) : r(i, d);
      },
    };
  },
  be = "!",
  Qe = (e) => {
    const { separator: a, experimentalParseClassName: o } = e,
      t = a.length === 1,
      r = a[0],
      i = a.length,
      d = (s) => {
        const c = [];
        let p = 0,
          f = 0,
          b;
        for (let g = 0; g < s.length; g++) {
          let S = s[g];
          if (p === 0) {
            if (S === r && (t || s.slice(g, g + i) === a)) {
              c.push(s.slice(f, g)), (f = g + i);
              continue;
            }
            if (S === "/") {
              b = g;
              continue;
            }
          }
          S === "[" ? p++ : S === "]" && p--;
        }
        const x = c.length === 0 ? s : s.substring(f),
          w = x.startsWith(be),
          A = w ? x.substring(1) : x,
          v = b && b > f ? b - f : void 0;
        return {
          modifiers: c,
          hasImportantModifier: w,
          baseClassName: A,
          maybePostfixModifierPosition: v,
        };
      };
    return o ? (s) => o({ className: s, parseClassName: d }) : d;
  },
  Oe = (e) => {
    if (e.length <= 1) return e;
    const a = [];
    let o = [];
    return (
      e.forEach((t) => {
        t[0] === "[" ? (a.push(...o.sort(), t), (o = [])) : o.push(t);
      }),
      a.push(...o.sort()),
      a
    );
  },
  Ge = (e) => ({ cache: Fe(e.cacheSize), parseClassName: Qe(e), ...Ie(e) }),
  Ve = /\s+/,
  Be = (e, a) => {
    const {
        parseClassName: o,
        getClassGroupId: t,
        getConflictingClassGroupIds: r,
      } = a,
      i = [],
      d = e.trim().split(Ve);
    let s = "";
    for (let c = d.length - 1; c >= 0; c -= 1) {
      const p = d[c],
        {
          modifiers: f,
          hasImportantModifier: b,
          baseClassName: x,
          maybePostfixModifierPosition: w,
        } = o(p);
      let A = !!w,
        v = t(A ? x.substring(0, w) : x);
      if (!v) {
        if (!A) {
          s = p + (s.length > 0 ? " " + s : s);
          continue;
        }
        if (((v = t(x)), !v)) {
          s = p + (s.length > 0 ? " " + s : s);
          continue;
        }
        A = !1;
      }
      const g = Oe(f).join(":"),
        S = b ? g + be : g,
        y = S + v;
      if (i.includes(y)) continue;
      i.push(y);
      const q = r(v, A);
      for (let D = 0; D < q.length; ++D) {
        const M = q[D];
        i.push(S + M);
      }
      s = p + (s.length > 0 ? " " + s : s);
    }
    return s;
  };
function Le() {
  let e = 0,
    a,
    o,
    t = "";
  for (; e < arguments.length; )
    (a = arguments[e++]) && (o = ve(a)) && (t && (t += " "), (t += o));
  return t;
}
const ve = (e) => {
  if (typeof e == "string") return e;
  let a,
    o = "";
  for (let t = 0; t < e.length; t++)
    e[t] && (a = ve(e[t])) && (o && (o += " "), (o += a));
  return o;
};
function Ue(e, ...a) {
  let o,
    t,
    r,
    i = d;
  function d(c) {
    const p = a.reduce((f, b) => b(f), e());
    return (o = Ge(p)), (t = o.cache.get), (r = o.cache.set), (i = s), s(c);
  }
  function s(c) {
    const p = t(c);
    if (p) return p;
    const f = Be(c, o);
    return r(c, f), f;
  }
  return function () {
    return i(Le.apply(null, arguments));
  };
}
const C = (e) => {
    const a = (o) => o[e] || [];
    return (a.isThemeGetter = !0), a;
  },
  he = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  $e = /^\d+\/\d+$/,
  He = new Set(["px", "full", "screen"]),
  Ze = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Xe =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Je = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  Ke = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Ye =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  E = (e) => Q(e) || He.has(e) || $e.test(e),
  P = (e) => O(e, "length", na),
  Q = (e) => !!e && !Number.isNaN(Number(e)),
  J = (e) => O(e, "number", Q),
  B = (e) => !!e && Number.isInteger(Number(e)),
  ea = (e) => e.endsWith("%") && Q(e.slice(0, -1)),
  u = (e) => he.test(e),
  k = (e) => Ze.test(e),
  aa = new Set(["length", "size", "percentage"]),
  oa = (e) => O(e, aa, Ce),
  ta = (e) => O(e, "position", Ce),
  ra = new Set(["image", "url"]),
  ia = (e) => O(e, ra, ca),
  sa = (e) => O(e, "", da),
  L = () => !0,
  O = (e, a, o) => {
    const t = he.exec(e);
    return t
      ? t[1]
        ? typeof a == "string"
          ? t[1] === a
          : a.has(t[1])
        : o(t[2])
      : !1;
  },
  na = (e) => Xe.test(e) && !Je.test(e),
  Ce = () => !1,
  da = (e) => Ke.test(e),
  ca = (e) => Ye.test(e),
  la = () => {
    const e = C("colors"),
      a = C("spacing"),
      o = C("blur"),
      t = C("brightness"),
      r = C("borderColor"),
      i = C("borderRadius"),
      d = C("borderSpacing"),
      s = C("borderWidth"),
      c = C("contrast"),
      p = C("grayscale"),
      f = C("hueRotate"),
      b = C("invert"),
      x = C("gap"),
      w = C("gradientColorStops"),
      A = C("gradientColorStopPositions"),
      v = C("inset"),
      g = C("margin"),
      S = C("opacity"),
      y = C("padding"),
      q = C("saturate"),
      D = C("scale"),
      M = C("sepia"),
      U = C("skew"),
      $ = C("space"),
      H = C("translate"),
      G = () => ["auto", "contain", "none"],
      _ = () => ["auto", "hidden", "clip", "visible", "scroll"],
      F = () => ["auto", u, a],
      h = () => [u, a],
      l = () => ["", E, P],
      z = () => ["auto", Q, u],
      j = () => [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ],
      W = () => ["solid", "dashed", "dotted", "double", "none"],
      re = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      X = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
      ],
      V = () => ["", "0", u],
      ie = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      N = () => [Q, u];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [L],
        spacing: [E, P],
        blur: ["none", "", k, u],
        brightness: N(),
        borderColor: [e],
        borderRadius: ["none", "", "full", k, u],
        borderSpacing: h(),
        borderWidth: l(),
        contrast: N(),
        grayscale: V(),
        hueRotate: N(),
        invert: V(),
        gap: h(),
        gradientColorStops: [e],
        gradientColorStopPositions: [ea, P],
        inset: F(),
        margin: F(),
        opacity: N(),
        padding: h(),
        saturate: N(),
        scale: N(),
        sepia: V(),
        skew: N(),
        space: h(),
        translate: h(),
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", "video", u] }],
        container: ["container"],
        columns: [{ columns: [k] }],
        "break-after": [{ "break-after": ie() }],
        "break-before": [{ "break-before": ie() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: [...j(), u] }],
        overflow: [{ overflow: _() }],
        "overflow-x": [{ "overflow-x": _() }],
        "overflow-y": [{ "overflow-y": _() }],
        overscroll: [{ overscroll: G() }],
        "overscroll-x": [{ "overscroll-x": G() }],
        "overscroll-y": [{ "overscroll-y": G() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: [v] }],
        "inset-x": [{ "inset-x": [v] }],
        "inset-y": [{ "inset-y": [v] }],
        start: [{ start: [v] }],
        end: [{ end: [v] }],
        top: [{ top: [v] }],
        right: [{ right: [v] }],
        bottom: [{ bottom: [v] }],
        left: [{ left: [v] }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: ["auto", B, u] }],
        basis: [{ basis: F() }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
        flex: [{ flex: ["1", "auto", "initial", "none", u] }],
        grow: [{ grow: V() }],
        shrink: [{ shrink: V() }],
        order: [{ order: ["first", "last", "none", B, u] }],
        "grid-cols": [{ "grid-cols": [L] }],
        "col-start-end": [{ col: ["auto", { span: ["full", B, u] }, u] }],
        "col-start": [{ "col-start": z() }],
        "col-end": [{ "col-end": z() }],
        "grid-rows": [{ "grid-rows": [L] }],
        "row-start-end": [{ row: ["auto", { span: [B, u] }, u] }],
        "row-start": [{ "row-start": z() }],
        "row-end": [{ "row-end": z() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", u] }],
        "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", u] }],
        gap: [{ gap: [x] }],
        "gap-x": [{ "gap-x": [x] }],
        "gap-y": [{ "gap-y": [x] }],
        "justify-content": [{ justify: ["normal", ...X()] }],
        "justify-items": [
          { "justify-items": ["start", "end", "center", "stretch"] },
        ],
        "justify-self": [
          { "justify-self": ["auto", "start", "end", "center", "stretch"] },
        ],
        "align-content": [{ content: ["normal", ...X(), "baseline"] }],
        "align-items": [
          { items: ["start", "end", "center", "baseline", "stretch"] },
        ],
        "align-self": [
          { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
        ],
        "place-content": [{ "place-content": [...X(), "baseline"] }],
        "place-items": [
          { "place-items": ["start", "end", "center", "baseline", "stretch"] },
        ],
        "place-self": [
          { "place-self": ["auto", "start", "end", "center", "stretch"] },
        ],
        p: [{ p: [y] }],
        px: [{ px: [y] }],
        py: [{ py: [y] }],
        ps: [{ ps: [y] }],
        pe: [{ pe: [y] }],
        pt: [{ pt: [y] }],
        pr: [{ pr: [y] }],
        pb: [{ pb: [y] }],
        pl: [{ pl: [y] }],
        m: [{ m: [g] }],
        mx: [{ mx: [g] }],
        my: [{ my: [g] }],
        ms: [{ ms: [g] }],
        me: [{ me: [g] }],
        mt: [{ mt: [g] }],
        mr: [{ mr: [g] }],
        mb: [{ mb: [g] }],
        ml: [{ ml: [g] }],
        "space-x": [{ "space-x": [$] }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": [$] }],
        "space-y-reverse": ["space-y-reverse"],
        w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", u, a] }],
        "min-w": [{ "min-w": [u, a, "min", "max", "fit"] }],
        "max-w": [
          {
            "max-w": [
              u,
              a,
              "none",
              "full",
              "min",
              "max",
              "fit",
              "prose",
              { screen: [k] },
              k,
            ],
          },
        ],
        h: [{ h: [u, a, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "min-h": [
          { "min-h": [u, a, "min", "max", "fit", "svh", "lvh", "dvh"] },
        ],
        "max-h": [
          { "max-h": [u, a, "min", "max", "fit", "svh", "lvh", "dvh"] },
        ],
        size: [{ size: [u, a, "auto", "min", "max", "fit"] }],
        "font-size": [{ text: ["base", k, P] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [
          {
            font: [
              "thin",
              "extralight",
              "light",
              "normal",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
              J,
            ],
          },
        ],
        "font-family": [{ font: [L] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [
          {
            tracking: [
              "tighter",
              "tight",
              "normal",
              "wide",
              "wider",
              "widest",
              u,
            ],
          },
        ],
        "line-clamp": [{ "line-clamp": ["none", Q, J] }],
        leading: [
          {
            leading: [
              "none",
              "tight",
              "snug",
              "normal",
              "relaxed",
              "loose",
              E,
              u,
            ],
          },
        ],
        "list-image": [{ "list-image": ["none", u] }],
        "list-style-type": [{ list: ["none", "disc", "decimal", u] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "placeholder-color": [{ placeholder: [e] }],
        "placeholder-opacity": [{ "placeholder-opacity": [S] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "text-color": [{ text: [e] }],
        "text-opacity": [{ "text-opacity": [S] }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...W(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: ["auto", "from-font", E, P] },
        ],
        "underline-offset": [{ "underline-offset": ["auto", E, u] }],
        "text-decoration-color": [{ decoration: [e] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: h() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              u,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", u] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-opacity": [{ "bg-opacity": [S] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...j(), ta] }],
        "bg-repeat": [
          { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
        ],
        "bg-size": [{ bg: ["auto", "cover", "contain", oa] }],
        "bg-image": [
          {
            bg: [
              "none",
              { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
              ia,
            ],
          },
        ],
        "bg-color": [{ bg: [e] }],
        "gradient-from-pos": [{ from: [A] }],
        "gradient-via-pos": [{ via: [A] }],
        "gradient-to-pos": [{ to: [A] }],
        "gradient-from": [{ from: [w] }],
        "gradient-via": [{ via: [w] }],
        "gradient-to": [{ to: [w] }],
        rounded: [{ rounded: [i] }],
        "rounded-s": [{ "rounded-s": [i] }],
        "rounded-e": [{ "rounded-e": [i] }],
        "rounded-t": [{ "rounded-t": [i] }],
        "rounded-r": [{ "rounded-r": [i] }],
        "rounded-b": [{ "rounded-b": [i] }],
        "rounded-l": [{ "rounded-l": [i] }],
        "rounded-ss": [{ "rounded-ss": [i] }],
        "rounded-se": [{ "rounded-se": [i] }],
        "rounded-ee": [{ "rounded-ee": [i] }],
        "rounded-es": [{ "rounded-es": [i] }],
        "rounded-tl": [{ "rounded-tl": [i] }],
        "rounded-tr": [{ "rounded-tr": [i] }],
        "rounded-br": [{ "rounded-br": [i] }],
        "rounded-bl": [{ "rounded-bl": [i] }],
        "border-w": [{ border: [s] }],
        "border-w-x": [{ "border-x": [s] }],
        "border-w-y": [{ "border-y": [s] }],
        "border-w-s": [{ "border-s": [s] }],
        "border-w-e": [{ "border-e": [s] }],
        "border-w-t": [{ "border-t": [s] }],
        "border-w-r": [{ "border-r": [s] }],
        "border-w-b": [{ "border-b": [s] }],
        "border-w-l": [{ "border-l": [s] }],
        "border-opacity": [{ "border-opacity": [S] }],
        "border-style": [{ border: [...W(), "hidden"] }],
        "divide-x": [{ "divide-x": [s] }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": [s] }],
        "divide-y-reverse": ["divide-y-reverse"],
        "divide-opacity": [{ "divide-opacity": [S] }],
        "divide-style": [{ divide: W() }],
        "border-color": [{ border: [r] }],
        "border-color-x": [{ "border-x": [r] }],
        "border-color-y": [{ "border-y": [r] }],
        "border-color-s": [{ "border-s": [r] }],
        "border-color-e": [{ "border-e": [r] }],
        "border-color-t": [{ "border-t": [r] }],
        "border-color-r": [{ "border-r": [r] }],
        "border-color-b": [{ "border-b": [r] }],
        "border-color-l": [{ "border-l": [r] }],
        "divide-color": [{ divide: [r] }],
        "outline-style": [{ outline: ["", ...W()] }],
        "outline-offset": [{ "outline-offset": [E, u] }],
        "outline-w": [{ outline: [E, P] }],
        "outline-color": [{ outline: [e] }],
        "ring-w": [{ ring: l() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: [e] }],
        "ring-opacity": [{ "ring-opacity": [S] }],
        "ring-offset-w": [{ "ring-offset": [E, P] }],
        "ring-offset-color": [{ "ring-offset": [e] }],
        shadow: [{ shadow: ["", "inner", "none", k, sa] }],
        "shadow-color": [{ shadow: [L] }],
        opacity: [{ opacity: [S] }],
        "mix-blend": [
          { "mix-blend": [...re(), "plus-lighter", "plus-darker"] },
        ],
        "bg-blend": [{ "bg-blend": re() }],
        filter: [{ filter: ["", "none"] }],
        blur: [{ blur: [o] }],
        brightness: [{ brightness: [t] }],
        contrast: [{ contrast: [c] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", k, u] }],
        grayscale: [{ grayscale: [p] }],
        "hue-rotate": [{ "hue-rotate": [f] }],
        invert: [{ invert: [b] }],
        saturate: [{ saturate: [q] }],
        sepia: [{ sepia: [M] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
        "backdrop-blur": [{ "backdrop-blur": [o] }],
        "backdrop-brightness": [{ "backdrop-brightness": [t] }],
        "backdrop-contrast": [{ "backdrop-contrast": [c] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [p] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [f] }],
        "backdrop-invert": [{ "backdrop-invert": [b] }],
        "backdrop-opacity": [{ "backdrop-opacity": [S] }],
        "backdrop-saturate": [{ "backdrop-saturate": [q] }],
        "backdrop-sepia": [{ "backdrop-sepia": [M] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": [d] }],
        "border-spacing-x": [{ "border-spacing-x": [d] }],
        "border-spacing-y": [{ "border-spacing-y": [d] }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "none",
              "all",
              "",
              "colors",
              "opacity",
              "shadow",
              "transform",
              u,
            ],
          },
        ],
        duration: [{ duration: N() }],
        ease: [{ ease: ["linear", "in", "out", "in-out", u] }],
        delay: [{ delay: N() }],
        animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", u] }],
        transform: [{ transform: ["", "gpu", "none"] }],
        scale: [{ scale: [D] }],
        "scale-x": [{ "scale-x": [D] }],
        "scale-y": [{ "scale-y": [D] }],
        rotate: [{ rotate: [B, u] }],
        "translate-x": [{ "translate-x": [H] }],
        "translate-y": [{ "translate-y": [H] }],
        "skew-x": [{ "skew-x": [U] }],
        "skew-y": [{ "skew-y": [U] }],
        "transform-origin": [
          {
            origin: [
              "center",
              "top",
              "top-right",
              "right",
              "bottom-right",
              "bottom",
              "bottom-left",
              "left",
              "top-left",
              u,
            ],
          },
        ],
        accent: [{ accent: ["auto", e] }],
        appearance: [{ appearance: ["none", "auto"] }],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              u,
            ],
          },
        ],
        "caret-color": [{ caret: [e] }],
        "pointer-events": [{ "pointer-events": ["none", "auto"] }],
        resize: [{ resize: ["none", "y", "x", ""] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": h() }],
        "scroll-mx": [{ "scroll-mx": h() }],
        "scroll-my": [{ "scroll-my": h() }],
        "scroll-ms": [{ "scroll-ms": h() }],
        "scroll-me": [{ "scroll-me": h() }],
        "scroll-mt": [{ "scroll-mt": h() }],
        "scroll-mr": [{ "scroll-mr": h() }],
        "scroll-mb": [{ "scroll-mb": h() }],
        "scroll-ml": [{ "scroll-ml": h() }],
        "scroll-p": [{ "scroll-p": h() }],
        "scroll-px": [{ "scroll-px": h() }],
        "scroll-py": [{ "scroll-py": h() }],
        "scroll-ps": [{ "scroll-ps": h() }],
        "scroll-pe": [{ "scroll-pe": h() }],
        "scroll-pt": [{ "scroll-pt": h() }],
        "scroll-pr": [{ "scroll-pr": h() }],
        "scroll-pb": [{ "scroll-pb": h() }],
        "scroll-pl": [{ "scroll-pl": h() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          { "will-change": ["auto", "scroll", "contents", "transform", u] },
        ],
        fill: [{ fill: [e, "none"] }],
        "stroke-w": [{ stroke: [E, P, J] }],
        stroke: [{ stroke: [e, "none"] }],
        sr: ["sr-only", "not-sr-only"],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
    };
  },
  ua = Ue(la);
function I(...e) {
  return ua(xe(e));
}
const Ae = m.forwardRef(({ className: e, ...a }, o) =>
  n.jsx("div", {
    ref: o,
    className: I("rounded-lg border bg-card text-card-foreground shadow-sm", e),
    ...a,
  }),
);
Ae.displayName = "Card";
const Se = m.forwardRef(({ className: e, ...a }, o) =>
  n.jsx("div", {
    ref: o,
    className: I("flex flex-col space-y-1.5 p-6", e),
    ...a,
  }),
);
Se.displayName = "CardHeader";
const ye = m.forwardRef(({ className: e, ...a }, o) =>
  n.jsx("div", {
    ref: o,
    className: I("text-2xl font-semibold leading-none tracking-tight", e),
    ...a,
  }),
);
ye.displayName = "CardTitle";
const ze = m.forwardRef(({ className: e, ...a }, o) =>
  n.jsx("div", {
    ref: o,
    className: I("text-sm text-muted-foreground", e),
    ...a,
  }),
);
ze.displayName = "CardDescription";
const we = m.forwardRef(({ className: e, ...a }, o) =>
  n.jsx("div", { ref: o, className: I("p-6 pt-0", e), ...a }),
);
we.displayName = "CardContent";
const ma = m.forwardRef(({ className: e, ...a }, o) =>
  n.jsx("div", { ref: o, className: I("flex items-center p-6 pt-0", e), ...a }),
);
ma.displayName = "CardFooter";
function de(e, a) {
  if (typeof e == "function") return e(a);
  e != null && (e.current = a);
}
function pa(...e) {
  return (a) => {
    let o = !1;
    const t = e.map((r) => {
      const i = de(r, a);
      return !o && typeof i == "function" && (o = !0), i;
    });
    if (o)
      return () => {
        for (let r = 0; r < t.length; r++) {
          const i = t[r];
          typeof i == "function" ? i() : de(e[r], null);
        }
      };
  };
}
var ae = m.forwardRef((e, a) => {
  const { children: o, ...t } = e,
    r = m.Children.toArray(o),
    i = r.find(xa);
  if (i) {
    const d = i.props.children,
      s = r.map((c) =>
        c === i
          ? m.Children.count(d) > 1
            ? m.Children.only(null)
            : m.isValidElement(d)
              ? d.props.children
              : null
          : c,
      );
    return n.jsx(Y, {
      ...t,
      ref: a,
      children: m.isValidElement(d) ? m.cloneElement(d, void 0, s) : null,
    });
  }
  return n.jsx(Y, { ...t, ref: a, children: o });
});
ae.displayName = "Slot";
var Y = m.forwardRef((e, a) => {
  const { children: o, ...t } = e;
  if (m.isValidElement(o)) {
    const r = ba(o);
    return m.cloneElement(o, { ...ga(t, o.props), ref: a ? pa(a, r) : r });
  }
  return m.Children.count(o) > 1 ? m.Children.only(null) : null;
});
Y.displayName = "SlotClone";
var fa = ({ children: e }) => n.jsx(n.Fragment, { children: e });
function xa(e) {
  return m.isValidElement(e) && e.type === fa;
}
function ga(e, a) {
  const o = { ...a };
  for (const t in a) {
    const r = e[t],
      i = a[t];
    /^on[A-Z]/.test(t)
      ? r && i
        ? (o[t] = (...s) => {
            i(...s), r(...s);
          })
        : r && (o[t] = r)
      : t === "style"
        ? (o[t] = { ...r, ...i })
        : t === "className" && (o[t] = [r, i].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function ba(e) {
  let a = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    o = a && "isReactWarning" in a && a.isReactWarning;
  return o
    ? e.ref
    : ((a = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (o = a && "isReactWarning" in a && a.isReactWarning),
      o ? e.props.ref : e.props.ref || e.ref);
}
const ce = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  le = xe,
  va = (e, a) => (o) => {
    var t;
    if (a?.variants == null) return le(e, o?.class, o?.className);
    const { variants: r, defaultVariants: i } = a,
      d = Object.keys(r).map((p) => {
        const f = o?.[p],
          b = i?.[p];
        if (f === null) return null;
        const x = ce(f) || ce(b);
        return r[p][x];
      }),
      s =
        o &&
        Object.entries(o).reduce((p, f) => {
          let [b, x] = f;
          return x === void 0 || (p[b] = x), p;
        }, {}),
      c =
        a == null || (t = a.compoundVariants) === null || t === void 0
          ? void 0
          : t.reduce((p, f) => {
              let { class: b, className: x, ...w } = f;
              return Object.entries(w).every((A) => {
                let [v, g] = A;
                return Array.isArray(g)
                  ? g.includes({ ...i, ...s }[v])
                  : { ...i, ...s }[v] === g;
              })
                ? [...p, b, x]
                : p;
            }, []);
    return le(e, d, c, o?.class, o?.className);
  },
  ha = va(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
          success: "bg-green-500 text-white hover:bg-green-600",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  R = m.forwardRef(
    ({ className: e, variant: a, size: o, asChild: t = !1, ...r }, i) => {
      const d = t ? ae : "button";
      return n.jsx(d, {
        className: I(ha({ variant: a, size: o, className: e })),
        ref: i,
        ...r,
      });
    },
  );
R.displayName = "Button";
function Ca(e, a = []) {
  let o = [];
  function t(i, d) {
    const s = m.createContext(d),
      c = o.length;
    o = [...o, d];
    const p = (b) => {
      const { scope: x, children: w, ...A } = b,
        v = x?.[e]?.[c] || s,
        g = m.useMemo(() => A, Object.values(A));
      return n.jsx(v.Provider, { value: g, children: w });
    };
    p.displayName = i + "Provider";
    function f(b, x) {
      const w = x?.[e]?.[c] || s,
        A = m.useContext(w);
      if (A) return A;
      if (d !== void 0) return d;
      throw new Error(`\`${b}\` must be used within \`${i}\``);
    }
    return [p, f];
  }
  const r = () => {
    const i = o.map((d) => m.createContext(d));
    return function (s) {
      const c = s?.[e] || i;
      return m.useMemo(() => ({ [`__scope${e}`]: { ...s, [e]: c } }), [s, c]);
    };
  };
  return (r.scopeName = e), [t, Aa(r, ...a)];
}
function Aa(...e) {
  const a = e[0];
  if (e.length === 1) return a;
  const o = () => {
    const t = e.map((r) => ({ useScope: r(), scopeName: r.scopeName }));
    return function (i) {
      const d = t.reduce((s, { useScope: c, scopeName: p }) => {
        const b = c(i)[`__scope${p}`];
        return { ...s, ...b };
      }, {});
      return m.useMemo(() => ({ [`__scope${a.scopeName}`]: d }), [d]);
    };
  };
  return (o.scopeName = a.scopeName), o;
}
ke();
var Sa = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul",
  ],
  We = Sa.reduce((e, a) => {
    const o = m.forwardRef((t, r) => {
      const { asChild: i, ...d } = t,
        s = i ? ae : a;
      return (
        typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
        n.jsx(s, { ...d, ref: r })
      );
    });
    return (o.displayName = `Primitive.${a}`), { ...e, [a]: o };
  }, {}),
  oe = "Progress",
  te = 100,
  [ya, Ma] = Ca(oe),
  [za, wa] = ya(oe),
  qe = m.forwardRef((e, a) => {
    const {
      __scopeProgress: o,
      value: t = null,
      max: r,
      getValueLabel: i = Wa,
      ...d
    } = e;
    (r || r === 0) && !ue(r) && console.error(qa(`${r}`, "Progress"));
    const s = ue(r) ? r : te;
    t !== null && !me(t, s) && console.error(ja(`${t}`, "Progress"));
    const c = me(t, s) ? t : null,
      p = Z(c) ? i(c, s) : void 0;
    return n.jsx(za, {
      scope: o,
      value: c,
      max: s,
      children: n.jsx(We.div, {
        "aria-valuemax": s,
        "aria-valuemin": 0,
        "aria-valuenow": Z(c) ? c : void 0,
        "aria-valuetext": p,
        role: "progressbar",
        "data-state": Ne(c, s),
        "data-value": c ?? void 0,
        "data-max": s,
        ...d,
        ref: a,
      }),
    });
  });
qe.displayName = oe;
var je = "ProgressIndicator",
  De = m.forwardRef((e, a) => {
    const { __scopeProgress: o, ...t } = e,
      r = wa(je, o);
    return n.jsx(We.div, {
      "data-state": Ne(r.value, r.max),
      "data-value": r.value ?? void 0,
      "data-max": r.max,
      ...t,
      ref: a,
    });
  });
De.displayName = je;
function Wa(e, a) {
  return `${Math.round((e / a) * 100)}%`;
}
function Ne(e, a) {
  return e == null ? "indeterminate" : e === a ? "complete" : "loading";
}
function Z(e) {
  return typeof e == "number";
}
function ue(e) {
  return Z(e) && !isNaN(e) && e > 0;
}
function me(e, a) {
  return Z(e) && !isNaN(e) && e <= a && e >= 0;
}
function qa(e, a) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${te}\`.`;
}
function ja(e, a) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${te} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Ee = qe,
  Da = De;
const Pe = m.forwardRef(({ className: e, value: a, ...o }, t) =>
  n.jsx(Ee, {
    ref: t,
    className: I(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      e,
    ),
    ...o,
    children: n.jsx(Da, {
      className: "h-full w-full flex-1 bg-primary transition-all",
      style: { transform: `translateX(-${100 - (a || 0)}%)` },
    }),
  }),
);
Pe.displayName = Ee.displayName;
/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Na = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]],
  Ea = pe("Check", Na);
/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Pa = [
    ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
    ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
    ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }],
  ],
  ka = pe("Timer", Pa),
  T = [
    {
      id: "q1",
      type: "single_choice",
      text: "Um desenvolvedor deseja implantar um aplicativo rapidamente na AWS sem criar manualmente os recursos necessários. Qual serviço da AWS atenderá a esses requisitos?",
      options: [
        {
          id: "a",
          text: "Amazon EC2",
          isCorrect: !1,
          explanation:
            "O Amazon EC2 é um serviço de computação que requer configuração manual dos recursos.",
        },
        {
          id: "b",
          text: "AWS Elastic Beanstalk",
          isCorrect: !0,
          explanation:
            "O AWS Elastic Beanstalk é um serviço que facilita a implantação rápida de aplicativos, gerenciando automaticamente os detalhes de capacidade, balanceamento de carga, escalonamento e monitoramento.",
        },
        {
          id: "c",
          text: "AWS CodeBuild",
          isCorrect: !1,
          explanation:
            "AWS CodeBuild é um serviço de compilação que compila código fonte, executa testes e produz pacotes de software, mas não implanta aplicativos automaticamente.",
        },
        {
          id: "d",
          text: "Amazon Personalize",
          isCorrect: !1,
          explanation:
            "Amazon Personalize é um serviço de machine learning para criar recomendações personalizadas, não relacionado à implantação de aplicativos.",
        },
      ],
      category: "deployment",
      dominio: "Domínio 1: Conceitos de Nuvem",
      difficulty: "easy",
      references: ["https://aws.amazon.com/elasticbeanstalk/"],
    },
    {
      id: "q2",
      type: "single_choice",
      text: "Uma empresa precisa de uma rede de entrega de conteúdo que forneça entrega segura de dados, vídeos, aplicativos e APIs para usuários em todo o mundo, com baixa latência e altas velocidades de transferência. Qual serviço da AWS atende a esses requisitos?",
      options: [
        {
          id: "a",
          text: "Elastic Load Balancing",
          isCorrect: !1,
          explanation:
            "ELB é usado para distribuir tráfego entre múltiplas instâncias, não é uma CDN global.",
        },
        {
          id: "b",
          text: "Amazon S3",
          isCorrect: !1,
          explanation:
            "Embora o S3 seja um serviço de armazenamento, não é uma CDN otimizada para entrega global de conteúdo.",
        },
        {
          id: "c",
          text: "Amazon Elastic Transcoder",
          isCorrect: !1,
          explanation:
            "Este serviço é usado para converter arquivos de mídia, não para distribuição de conteúdo.",
        },
        {
          id: "d",
          text: "Amazon CloudFront",
          isCorrect: !0,
          explanation:
            "Amazon CloudFront é uma CDN rápida que distribui dados, vídeos, aplicativos e APIs de forma segura, com baixa latência e altas velocidades de transferência.",
        },
      ],
      category: "networking",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: ["https://aws.amazon.com/cloudfront/"],
    },
    {
      id: "q3",
      type: "single_choice",
      text: "Uma empresa que possui diversas unidades de negócios deseja gerenciar e governar centralmente seus ambientes da Nuvem AWS. A empresa deseja automatizar a criação de contas AWS, aplicar políticas de controle de serviço (SCPs) e simplificar os processos de faturamento. Qual serviço ou ferramenta da AWS a empresa deve usar para atender a esses requisitos?",
      options: [
        {
          id: "a",
          text: "AWS Trusted Advisor",
          isCorrect: !1,
          explanation:
            "AWS Trusted Advisor fornece recomendações de melhores práticas, mas não gerencia contas ou aplica políticas.",
        },
        {
          id: "b",
          text: "AWS Budgets",
          isCorrect: !1,
          explanation:
            "AWS Budgets é usado para monitorar custos e uso, não para gerenciamento centralizado de contas.",
        },
        {
          id: "c",
          text: "Cost Explorer",
          isCorrect: !1,
          explanation:
            "Cost Explorer é uma ferramenta para visualizar e analisar custos, não para gerenciamento de contas.",
        },
        {
          id: "d",
          text: "AWS Organizations",
          isCorrect: !0,
          explanation:
            "AWS Organizations permite gerenciamento centralizado de múltiplas contas AWS, aplicação de políticas de controle de serviço e consolidação de faturamento.",
        },
      ],
      category: "management",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/organizations/"],
    },
    {
      id: "q4",
      type: "single_choice",
      text: "De acordo com as práticas recomendadas de segurança, como uma instância do Amazon EC2 deve receber acesso a um bucket do Amazon S3?",
      options: [
        {
          id: "a",
          text: "Codifique a chave secreta e a chave de acesso de um usuário IAM diretamente no aplicativo e faça upload do arquivo.",
          isCorrect: !1,
          explanation:
            "Nunca é seguro codificar credenciais diretamente no código do aplicativo.",
        },
        {
          id: "b",
          text: "Armazene a chave secreta e a chave de acesso do usuário IAM em um arquivo de texto na instância EC2, leia as chaves e faça upload do arquivo.",
          isCorrect: !1,
          explanation:
            "Armazenar credenciais em arquivos de texto não é uma prática segura.",
        },
        {
          id: "c",
          text: "Faça com que a instância do EC2 assuma uma função(role) para obter os privilégios para fazer upload do arquivo.",
          isCorrect: !0,
          explanation:
            "Usar funções IAM (roles) é a maneira mais segura e recomendada para conceder permissões a instâncias EC2.",
        },
        {
          id: "d",
          text: "Modifique a política do bucket S3 para que qualquer serviço possa fazer upload para ela a qualquer momento.",
          isCorrect: !1,
          explanation:
            "Permitir acesso irrestrito ao bucket S3 é uma prática insegura que viola o princípio do privilégio mínimo.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: ["https://aws.amazon.com/iam/features/manage-roles/"],
    },
    {
      id: "q5",
      type: "single_choice",
      text: "Uma empresa tem o interesse de acompanhar o percentual de processamento em seus servidores durante um período específico do dia. Qual serviço da AWS seria adequado para atender a essa necessidade?",
      options: [
        {
          id: "a",
          text: "AWS CloudTrail",
          isCorrect: !1,
          explanation:
            "CloudTrail registra atividades de API, não métricas de processamento.",
        },
        {
          id: "b",
          text: "AWS CloudWatch",
          isCorrect: !0,
          explanation:
            "Amazon CloudWatch é o serviço ideal para monitorar métricas de recursos AWS, incluindo utilização de CPU.",
        },
        {
          id: "c",
          text: "AWS DataSync",
          isCorrect: !1,
          explanation:
            "DataSync é usado para transferência de dados, não para monitoramento.",
        },
        {
          id: "d",
          text: "AWS Cost Explorer",
          isCorrect: !1,
          explanation:
            "Cost Explorer é usado para análise de custos, não para monitoramento de recursos.",
        },
      ],
      category: "monitoring",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/cloudwatch/"],
    },
    {
      id: "q6",
      type: "multiple_choice",
      text: "Quais das alternativas a seguir são as melhores práticas ao usar o AWS Organizations? (Selecione DUAS)",
      options: [
        {
          id: "a",
          text: "Restringir privilégios de conta usando políticas de controle de serviço (Service Control Policies – SCP)",
          isCorrect: !0,
          explanation:
            "Usar SCPs é uma prática recomendada para controlar permissões em todas as contas da organização.",
        },
        {
          id: "b",
          text: "Desabilitar o CloudTrail em várias contas",
          isCorrect: !1,
          explanation:
            "Desabilitar o CloudTrail reduz a visibilidade e auditoria, o que não é uma boa prática.",
        },
        {
          id: "c",
          text: "Criar contas por departamento",
          isCorrect: !0,
          explanation:
            "Organizar contas por departamento ajuda na governança e no controle de custos.",
        },
        {
          id: "d",
          text: "Nunca usar tags para faturamento",
          isCorrect: !1,
          explanation:
            "Tags são importantes para rastreamento de custos e devem ser usadas.",
        },
        {
          id: "e",
          text: "Não usar AWS Organizations para automatizar a criação de contas AWS",
          isCorrect: !1,
          explanation:
            "A automação da criação de contas é um benefício importante do AWS Organizations.",
        },
      ],
      category: "management",
      dominio: "Domínio 1: Conceitos de Nuvem",
      difficulty: "medium",
      references: [
        "https://aws.amazon.com/organizations/getting-started/best-practices/",
      ],
    },
    {
      id: "q7",
      type: "single_choice",
      text: "O S3 é um armazenamento virtualmente ilimitado?",
      options: [
        {
          id: "a",
          text: "Verdadeiro",
          isCorrect: !0,
          explanation:
            "O Amazon S3 oferece armazenamento virtualmente ilimitado, permitindo armazenar e recuperar qualquer quantidade de dados.",
        },
        {
          id: "b",
          text: "Falso",
          isCorrect: !1,
          explanation:
            "Esta afirmação está incorreta. O S3 é projetado para ser virtualmente ilimitado em termos de capacidade de armazenamento.",
        },
      ],
      category: "storage",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/s3/features/"],
    },
    {
      id: "q8",
      type: "single_choice",
      text: "Um usuário precisa implantar rapidamente um banco de dados não relacional na AWS. O usuário não deseja gerenciar o hardware subjacente ou o software de banco de dados. Qual serviço AWS pode ser usado para fazer isso?",
      options: [
        {
          id: "a",
          text: "Amazon RDS",
          isCorrect: !1,
          explanation:
            "Amazon RDS é um serviço de banco de dados relacional, não não-relacional.",
        },
        {
          id: "b",
          text: "Amazon DynamoDB",
          isCorrect: !0,
          explanation:
            "Amazon DynamoDB é um banco de dados não relacional totalmente gerenciado que oferece desempenho consistente em qualquer escala.",
        },
        {
          id: "c",
          text: "Amazon Aurora",
          isCorrect: !1,
          explanation:
            "Amazon Aurora é um banco de dados relacional compatível com MySQL e PostgreSQL.",
        },
        {
          id: "d",
          text: "Amazon Redshift",
          isCorrect: !1,
          explanation:
            "Amazon Redshift é um data warehouse relacional, não um banco de dados não relacional.",
        },
      ],
      category: "database",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/dynamodb/"],
    },
    {
      id: "q9",
      type: "single_choice",
      text: "Uma empresa de jogos online precisa escolher uma opção de compra para executar suas instâncias do Amazon EC2 por 1 ano. O tráfego da web é consistente e qualquer aumento no tráfego é previsível. As instâncias EC2 devem estar online e disponíveis sem qualquer interrupção. Qual opção de compra de instância do EC2 atenderá a esses requisitos de maneira MAIS econômica?",
      options: [
        {
          id: "a",
          text: "Instâncias sob demanda",
          isCorrect: !1,
          explanation:
            "Instâncias sob demanda são mais caras e melhor utilizadas para cargas de trabalho de curto prazo ou imprevisíveis.",
        },
        {
          id: "b",
          text: "Instâncias Reservadas",
          isCorrect: !0,
          explanation:
            "Instâncias Reservadas são a opção mais econômica para cargas de trabalho previsíveis e de longo prazo, oferecendo descontos significativos em comparação com instâncias sob demanda.",
        },
        {
          id: "c",
          text: "Instâncias spot",
          isCorrect: !1,
          explanation:
            "Instâncias spot podem ser interrompidas e não são adequadas para aplicações que precisam estar sempre disponíveis.",
        },
        {
          id: "d",
          text: "Frota Spot (Spot Fleet)",
          isCorrect: !1,
          explanation:
            "Spot Fleet também usa instâncias spot e não é adequado para aplicações que precisam de disponibilidade constante.",
        },
      ],
      category: "compute",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/ec2/pricing/"],
    },
    {
      id: "q10",
      type: "single_choice",
      text: "Qual serviço da AWS oferece a capacidade de gerenciar infraestrutura como código?",
      options: [
        {
          id: "a",
          text: "AWS CodePipeline",
          isCorrect: !1,
          explanation:
            "AWS CodePipeline é um serviço de entrega contínua, não um serviço de infraestrutura como código.",
        },
        {
          id: "b",
          text: "AWS CodeDeploy",
          isCorrect: !1,
          explanation:
            "AWS CodeDeploy é um serviço de implantação de aplicativos, não um serviço de infraestrutura como código.",
        },
        {
          id: "c",
          text: "AWS Direct Connect",
          isCorrect: !1,
          explanation:
            "AWS Direct Connect é um serviço de conectividade dedicada, não relacionado à infraestrutura como código.",
        },
        {
          id: "d",
          text: "AWS CloudFormation",
          isCorrect: !0,
          explanation:
            "AWS CloudFormation permite criar e gerenciar recursos da AWS usando templates de infraestrutura como código.",
        },
      ],
      category: "management",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/cloudformation/"],
    },
    {
      id: "q11",
      type: "single_choice",
      text: "Qual política de roteamento AWS Route 53 você usaria para rotear o tráfego para vários recursos e também escolher quanto tráfego é roteado para cada recurso?",
      options: [
        {
          id: "a",
          text: "Política de roteamento simplificada",
          isCorrect: !1,
          explanation:
            "A política de roteamento simplificada não permite distribuir o tráfego em proporções específicas.",
        },
        {
          id: "b",
          text: "Política de roteamento ponderado (peso)",
          isCorrect: !0,
          explanation:
            "A política de roteamento ponderado permite especificar quanto tráfego é enviado para diferentes recursos usando pesos.",
        },
        {
          id: "c",
          text: "Política de roteamento para falhas (failover)",
          isCorrect: !1,
          explanation:
            "A política de failover é usada para configurar backup, não para distribuir tráfego em proporções específicas.",
        },
        {
          id: "d",
          text: "Política de roteamento de latência",
          isCorrect: !1,
          explanation:
            "A política de roteamento de latência roteia com base no menor tempo de resposta, não em proporções específicas.",
        },
      ],
      category: "networking",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/route53/features/"],
    },
    {
      id: "q12",
      type: "single_choice",
      text: "Qual dos seguintes atua como um firewall em nível de instância para controlar o acesso de entrada e saída?",
      options: [
        {
          id: "a",
          text: "Lista de controle de acesso à rede (Nacls)",
          isCorrect: !1,
          explanation:
            "NACLs são firewalls em nível de sub-rede, não em nível de instância.",
        },
        {
          id: "b",
          text: "Grupos de segurança",
          isCorrect: !0,
          explanation:
            "Grupos de segurança atuam como firewall virtual em nível de instância, controlando o tráfego de entrada e saída.",
        },
        {
          id: "c",
          text: "AWS Trusted Advisor",
          isCorrect: !1,
          explanation:
            "AWS Trusted Advisor é um serviço de recomendações de melhores práticas, não um firewall.",
        },
        {
          id: "d",
          text: "Virtual private gateways",
          isCorrect: !1,
          explanation:
            "Virtual private gateways são usados para conexões VPN, não como firewall.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: [
        "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html",
      ],
    },
    {
      id: "q13",
      type: "single_choice",
      text: "Qual opção é uma perspectiva que inclui recursos básicos do AWS Cloud Adoption Framework (AWS CAF)?",
      options: [
        {
          id: "a",
          text: "Sustentabilidade",
          isCorrect: !1,
          explanation:
            "Sustentabilidade não é uma das perspectivas principais do AWS CAF.",
        },
        {
          id: "b",
          text: "Eficiência de desempenho",
          isCorrect: !1,
          explanation:
            "Eficiência de desempenho é um pilar do Well-Architected Framework, não uma perspectiva do CAF.",
        },
        {
          id: "c",
          text: "Governança",
          isCorrect: !0,
          explanation:
            "Governança é uma das perspectivas principais do AWS CAF, focando em orquestração e controle de recursos AWS.",
        },
        {
          id: "d",
          text: "Confiabilidade",
          isCorrect: !1,
          explanation:
            "Confiabilidade é um pilar do Well-Architected Framework, não uma perspectiva do CAF.",
        },
      ],
      category: "cloud-concepts",
      dominio: "Domínio 1: Conceitos de Nuvem",
      difficulty: "medium",
      references: ["https://aws.amazon.com/professional-services/CAF/"],
    },
    {
      id: "q14",
      type: "single_choice",
      text: "Quais das alternativas a seguir é um serviço de computação sem servidor oferecido pela AWS?",
      options: [
        {
          id: "a",
          text: "AWS Elastic Beanstalk",
          isCorrect: !1,
          explanation:
            "Elastic Beanstalk é uma plataforma como serviço (PaaS), não um serviço sem servidor.",
        },
        {
          id: "b",
          text: "Amazon Lightsail",
          isCorrect: !1,
          explanation:
            "Lightsail é um serviço de hospedagem virtual privada (VPS), não um serviço sem servidor.",
        },
        {
          id: "c",
          text: "Amazon Elastic Compute Cloud (EC2)",
          isCorrect: !1,
          explanation:
            "EC2 é um serviço de computação que requer gerenciamento de servidor.",
        },
        {
          id: "d",
          text: "AWS Lambda",
          isCorrect: !0,
          explanation:
            "AWS Lambda é um serviço de computação sem servidor que executa código em resposta a eventos.",
        },
      ],
      category: "compute",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/lambda/"],
    },
    {
      id: "q15",
      type: "single_choice",
      text: "Qual opção é uma localização física da infraestrutura global da AWS?",
      options: [
        {
          id: "a",
          text: "AWS DataSync",
          isCorrect: !1,
          explanation:
            "AWS DataSync é um serviço de transferência de dados, não uma localização física.",
        },
        {
          id: "b",
          text: "Região AWS",
          isCorrect: !0,
          explanation:
            "Uma Região AWS é uma localização física onde a AWS mantém múltiplos data centers agrupados em Zonas de Disponibilidade.",
        },
        {
          id: "c",
          text: "Amazon Connect",
          isCorrect: !1,
          explanation:
            "Amazon Connect é um serviço de contact center, não uma localização física.",
        },
        {
          id: "d",
          text: "AWS Organizations",
          isCorrect: !1,
          explanation:
            "AWS Organizations é um serviço de gerenciamento de contas, não uma localização física.",
        },
      ],
      category: "infrastructure",
      dominio: "Domínio 1: Conceitos de Nuvem",
      difficulty: "easy",
      references: ["https://aws.amazon.com/about-aws/global-infrastructure/"],
    },
    {
      id: "q16",
      type: "single_choice",
      text: "Uma empresa tem o interesse de acompanhar o percentual de processamento em seus servidores durante um período específico do dia. Qual serviço da AWS seria adequado para atender a essa necessidade?",
      options: [
        {
          id: "a",
          text: "AWS CloudTrail",
          isCorrect: !1,
          explanation:
            "CloudTrail registra atividades de API, não métricas de processamento.",
        },
        {
          id: "b",
          text: "AWS CloudWatch",
          isCorrect: !0,
          explanation:
            "Amazon CloudWatch é o serviço ideal para monitorar métricas de recursos AWS, incluindo utilização de CPU.",
        },
        {
          id: "c",
          text: "AWS DataSync",
          isCorrect: !1,
          explanation:
            "DataSync é usado para transferência de dados, não para monitoramento.",
        },
        {
          id: "d",
          text: "AWS Cost Explorer",
          isCorrect: !1,
          explanation:
            "Cost Explorer é usado para análise de custos, não para monitoramento de recursos.",
        },
      ],
      category: "monitoring",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/cloudwatch/"],
    },
    {
      id: "q17",
      type: "single_choice",
      text: "Qual tarefa é de responsabilidade da AWS ao usar os serviços da AWS?",
      options: [
        {
          id: "a",
          text: "Gerenciamento de permissões de usuário IAM",
          isCorrect: !1,
          explanation:
            "O gerenciamento de permissões IAM é responsabilidade do cliente.",
        },
        {
          id: "b",
          text: "Configurar firewalls e redes.",
          isCorrect: !1,
          explanation:
            "A configuração de firewalls e redes é responsabilidade do cliente.",
        },
        {
          id: "c",
          text: "Manutenção de controles físicos e ambientais",
          isCorrect: !0,
          explanation:
            "A AWS é responsável pela segurança física e ambiental dos data centers que hospedam os serviços AWS.",
        },
        {
          id: "d",
          text: "Implementar controles físicos e ambientais",
          isCorrect: !1,
          explanation:
            "A AWS é responsável pelos controles físicos e ambientais dos data centers.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: [
        "https://aws.amazon.com/compliance/shared-responsibility-model/",
      ],
    },
    {
      id: "q18",
      type: "single_choice",
      text: "Uma empresa de mídia social deseja proteger seu aplicativo Web contra explorações comuns da Web, como injeções de SQL e scripts entre sites. Qual serviço da AWS atenderá a esses requisitos?",
      options: [
        {
          id: "a",
          text: "Amazon Inspector",
          isCorrect: !1,
          explanation:
            "Amazon Inspector é usado para avaliação de vulnerabilidades em instâncias EC2, não para proteção de aplicativos web.",
        },
        {
          id: "b",
          text: "AWS WAF",
          isCorrect: !0,
          explanation:
            "AWS WAF (Web Application Firewall) protege aplicativos web contra explorações comuns como injeção SQL e XSS.",
        },
        {
          id: "c",
          text: "Amazon GuardDuty",
          isCorrect: !1,
          explanation:
            "Amazon GuardDuty é um serviço de detecção de ameaças, não um firewall de aplicativo web.",
        },
        {
          id: "d",
          text: "Amazon CloudWatch",
          isCorrect: !1,
          explanation:
            "Amazon CloudWatch é um serviço de monitoramento, não um serviço de segurança para aplicativos web.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: ["https://aws.amazon.com/waf/"],
    },
    {
      id: "q19",
      type: "single_choice",
      text: "Qual serviço da AWS oferece armazenamento de objetos altamente durável?",
      options: [
        {
          id: "a",
          text: "Amazon S3",
          isCorrect: !0,
          explanation:
            "Amazon S3 oferece armazenamento de objetos altamente durável, com 99,999999999% (11 noves) de durabilidade.",
        },
        {
          id: "b",
          text: "Amazon Elastic File System (Amazon EFS)",
          isCorrect: !1,
          explanation:
            "Amazon EFS é um sistema de arquivos gerenciado, não um serviço de armazenamento de objetos.",
        },
        {
          id: "c",
          text: "Amazon Elastic Block Store (Amazon EBS)",
          isCorrect: !1,
          explanation:
            "Amazon EBS é um serviço de armazenamento em bloco, não um serviço de armazenamento de objetos.",
        },
        {
          id: "d",
          text: "Amazon FSx",
          isCorrect: !1,
          explanation:
            "Amazon FSx é um serviço de sistema de arquivos gerenciado, não um serviço de armazenamento de objetos.",
        },
      ],
      category: "storage",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/s3/"],
    },
    {
      id: "q20",
      type: "single_choice",
      text: "Uma empresa está executando uma carga de trabalho crítica em uma instância de banco de dados do Amazon RDS. A empresa precisa que a instância de banco de dados esteja altamente disponível com um tempo de recuperação inferior a 5 minutos. Qual solução atenderá a esses requisitos?",
      options: [
        {
          id: "a",
          text: "Crie uma réplica de leitura da instância de banco de dados.",
          isCorrect: !1,
          explanation:
            "Réplicas de leitura são usadas para escalabilidade de leitura e não fornecem failover automático.",
        },
        {
          id: "b",
          text: "Crie um modelo da instância de banco de dados usando AWS CloudFormation.",
          isCorrect: !1,
          explanation:
            "CloudFormation é usado para automação de infraestrutura, não para alta disponibilidade.",
        },
        {
          id: "c",
          text: "Tire snapshots frequentes da instância de banco de dados. Armazene os snapshots no Amazon S3.",
          isCorrect: !1,
          explanation:
            "Snapshots são para backup e não fornecem failover automático rápido.",
        },
        {
          id: "d",
          text: "Modifique a instância de banco de dados para ser uma implantação Multi-AZ.",
          isCorrect: !0,
          explanation:
            "A implantação Multi-AZ do RDS fornece alta disponibilidade com failover automático em menos de 5 minutos.",
        },
      ],
      category: "database",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/rds/features/multi-az/"],
    },
    {
      id: "q21",
      type: "single_choice",
      text: "Qual tarefa é de responsabilidade do cliente, de acordo com o modelo de responsabilidade compartilhada da AWS?",
      options: [
        {
          id: "a",
          text: "Mantenha a segurança da Nuvem AWS.",
          isCorrect: !1,
          explanation:
            "A AWS é responsável pela segurança da nuvem, incluindo infraestrutura física e rede.",
        },
        {
          id: "b",
          text: "Configurar firewalls e redes.",
          isCorrect: !0,
          explanation:
            "O cliente é responsável pela configuração de firewalls, redes e outros controles de segurança na nuvem.",
        },
        {
          id: "c",
          text: "Aplicar patch no sistema operacional das instâncias do Amazon RDS.",
          isCorrect: !1,
          explanation:
            "A AWS é responsável pela aplicação de patches no sistema operacional do RDS.",
        },
        {
          id: "d",
          text: "Implementar controles físicos e ambientais.",
          isCorrect: !1,
          explanation:
            "A AWS é responsável pelos controles físicos e ambientais dos data centers.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: [
        "https://aws.amazon.com/compliance/shared-responsibility-model/",
      ],
    },
    {
      id: "q22",
      type: "single_choice",
      text: "Qual princípio de design do AWS Well-Architected Framework que se concentra na proteção de informações e sistemas?",
      options: [
        {
          id: "a",
          text: "Segurança",
          isCorrect: !0,
          explanation:
            "O pilar de Segurança do Well-Architected Framework foca na proteção de informações e sistemas.",
        },
        {
          id: "b",
          text: "Otimização de custos",
          isCorrect: !1,
          explanation:
            "Otimização de custos foca em evitar custos desnecessários, não em segurança.",
        },
        {
          id: "c",
          text: "Sustentabilidade",
          isCorrect: !1,
          explanation:
            "Sustentabilidade foca em minimizar impactos ambientais, não em segurança.",
        },
        {
          id: "d",
          text: "Eficiência de desempenho",
          isCorrect: !1,
          explanation:
            "Eficiência de desempenho foca em usar recursos de computação de forma eficiente, não em segurança.",
        },
      ],
      category: "cloud-concepts",
      dominio: "Domínio 1: Conceitos de Nuvem",
      difficulty: "medium",
      references: ["https://aws.amazon.com/architecture/well-architected/"],
    },
    {
      id: "q23",
      type: "single_choice",
      text: "Uma empresa planeja migrar para a AWS e deseja criar estimativas de custos para seus casos de uso da AWS. Qual serviço ou ferramenta da AWS a empresa pode usar para atender a esses requisitos?",
      options: [
        {
          id: "a",
          text: "AWS Pricing Calculator",
          isCorrect: !0,
          explanation:
            "AWS Pricing Calculator permite estimar custos de serviços AWS antes da implementação.",
        },
        {
          id: "b",
          text: "Amazon CloudWatch",
          isCorrect: !1,
          explanation:
            "CloudWatch é usado para monitoramento, não para estimativas de custos.",
        },
        {
          id: "c",
          text: "AWS Cost Explorer",
          isCorrect: !1,
          explanation:
            "Cost Explorer analisa custos históricos, não faz estimativas para casos de uso futuros.",
        },
        {
          id: "d",
          text: "AWS Budgets",
          isCorrect: !1,
          explanation:
            "AWS Budgets é usado para definir alertas de orçamento, não para estimativas de custos.",
        },
      ],
      category: "billing-and-pricing",
      dominio: "Domínio 4: Faturamento e Preços",
      difficulty: "easy",
      references: ["https://calculator.aws/"],
    },
    {
      id: "q24",
      type: "single_choice",
      text: "Uma empresa de serviços financeiros deseja garantir a auditoria das atividades em sua conta AWS. Como Cloud Practitioner, qual serviço da AWS você recomendaria nesse caso?",
      options: [
        {
          id: "a",
          text: "Config",
          isCorrect: !1,
          explanation:
            "AWS Config é usado para avaliar configurações de recursos, não para auditoria de atividades.",
        },
        {
          id: "b",
          text: "CloudTrail",
          isCorrect: !0,
          explanation:
            "AWS CloudTrail é o serviço ideal para auditoria, pois registra todas as atividades da conta AWS.",
        },
        {
          id: "c",
          text: "Trusted Advisor",
          isCorrect: !1,
          explanation:
            "Trusted Advisor fornece recomendações de melhores práticas, não auditoria.",
        },
        {
          id: "d",
          text: "CloudWatch",
          isCorrect: !1,
          explanation:
            "CloudWatch é usado para monitoramento de recursos, não para auditoria de atividades.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: ["https://aws.amazon.com/cloudtrail/"],
    },
    {
      id: "q25",
      type: "single_choice",
      text: "Uma empresa deseja automatizar a implantação de infraestrutura usando infraestrutura como código (IaC). A empresa deseja dimensionar as pilhas de produção para que possam ser implantadas em várias regiões da AWS. Qual serviço da AWS atenderá a esses requisitos?",
      options: [
        {
          id: "a",
          text: "Amazon CloudWatch",
          isCorrect: !1,
          explanation:
            "CloudWatch é um serviço de monitoramento, não de implantação de infraestrutura.",
        },
        {
          id: "b",
          text: "AWS Config",
          isCorrect: !1,
          explanation:
            "AWS Config é usado para avaliar conformidade de recursos, não para implantação.",
        },
        {
          id: "c",
          text: "AWS Trusted Advisor",
          isCorrect: !1,
          explanation:
            "Trusted Advisor fornece recomendações de melhores práticas, não implantação de infraestrutura.",
        },
        {
          id: "d",
          text: "AWS CloudFormation",
          isCorrect: !0,
          explanation:
            "AWS CloudFormation permite automatizar a implantação de infraestrutura como código em várias regiões.",
        },
      ],
      category: "management",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/cloudformation/"],
    },
    {
      id: "q26",
      type: "multiple_choice",
      text: "Quais ações são práticas recomendadas para um usuário root de conta da AWS? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Compartilhe credenciais de usuário root com membros da equipe.",
          isCorrect: !1,
          explanation:
            "Nunca compartilhe credenciais do usuário root, isso compromete a segurança da conta.",
        },
        {
          id: "b",
          text: "Crie vários usuários root para a conta, separados por ambiente.",
          isCorrect: !1,
          explanation:
            "Não é possível criar múltiplos usuários root, e isso não seria uma prática segura.",
        },
        {
          id: "c",
          text: "Habilite a autenticação multifator (MFA) no usuário root.",
          isCorrect: !0,
          explanation:
            "Habilitar MFA no usuário root é uma prática de segurança essencial.",
        },
        {
          id: "d",
          text: "Crie um usuário IAM com privilégios de administrador para tarefas administrativas diárias, em vez de usar o usuário root.",
          isCorrect: !0,
          explanation:
            "Use usuários IAM com privilégios apropriados para tarefas diárias, não o usuário root.",
        },
        {
          id: "e",
          text: "Use acesso programático em vez do usuário root e senha.",
          isCorrect: !1,
          explanation:
            "O acesso programático deve ser configurado para usuários IAM, não para o usuário root.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: [
        "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
      ],
    },
    {
      id: "q27",
      type: "multiple_choice",
      text: "Quais das opções a seguir são benefícios de usar o AWS Trusted Advisor? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Fornecimento de orquestração de contêineres de alto desempenho.",
          isCorrect: !1,
          explanation:
            "Orquestração de contêineres não é uma função do Trusted Advisor.",
        },
        {
          id: "b",
          text: "Criação e rotação de chaves de criptografia.",
          isCorrect: !1,
          explanation:
            "Gerenciamento de chaves não é uma função do Trusted Advisor.",
        },
        {
          id: "c",
          text: "Detectando recursos subutilizados para economizar custos.",
          isCorrect: !0,
          explanation:
            "Trusted Advisor ajuda a identificar recursos subutilizados para otimização de custos.",
        },
        {
          id: "d",
          text: "Melhorar a segurança monitorando proativamente o ambiente AWS.",
          isCorrect: !0,
          explanation:
            "Trusted Advisor fornece recomendações de segurança proativas.",
        },
        {
          id: "e",
          text: "Implementação de marcação forçada em recursos da AWS",
          isCorrect: !1,
          explanation: "Marcação forçada não é uma função do Trusted Advisor.",
        },
      ],
      category: "management",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: [
        "https://aws.amazon.com/premiumsupport/technology/trusted-advisor/",
      ],
    },
    {
      id: "q28",
      type: "single_choice",
      text: "Qual serviço ou recurso da AWS oferece aos usuários a capacidade de capturar informações sobre o tráfego de rede em uma VPC?",
      options: [
        {
          id: "a",
          text: "VPC Flow Logs",
          isCorrect: !0,
          explanation:
            "VPC Flow Logs permite capturar informações sobre o tráfego IP que flui para e a partir das interfaces de rede em sua VPC.",
        },
        {
          id: "b",
          text: "Amazon Inspector",
          isCorrect: !1,
          explanation:
            "Amazon Inspector avalia a segurança de aplicações, não captura tráfego de rede.",
        },
        {
          id: "c",
          text: "Tabelas de rotas da VPC",
          isCorrect: !1,
          explanation:
            "Tabelas de rotas definem rotas de tráfego, mas não capturam informações sobre o tráfego.",
        },
        {
          id: "d",
          text: "AWS CloudTrail",
          isCorrect: !1,
          explanation:
            "CloudTrail registra atividades de API, não tráfego de rede em uma VPC.",
        },
      ],
      category: "networking",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: [
        "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
      ],
    },
    {
      id: "q29",
      type: "single_choice",
      text: "Qual serviço ou ferramenta da AWS ajuda os usuários a visualizar, compreender e gerenciar gastos e uso ao longo do tempo?",
      options: [
        {
          id: "a",
          text: "AWS Organizations",
          isCorrect: !1,
          explanation:
            "AWS Organizations é usado para gerenciar várias contas AWS, não para análise de custos.",
        },
        {
          id: "b",
          text: "AWS Pricing Calculator",
          isCorrect: !1,
          explanation:
            "AWS Pricing Calculator é usado para estimar custos futuros, não para analisar gastos atuais.",
        },
        {
          id: "c",
          text: "AWS Cost Explorer",
          isCorrect: !0,
          explanation:
            "AWS Cost Explorer fornece visualização e análise de custos atuais e históricos da AWS.",
        },
        {
          id: "d",
          text: "AWS Service Catalog",
          isCorrect: !1,
          explanation:
            "AWS Service Catalog é usado para gerenciar catálogos de serviços aprovados, não para análise de custos.",
        },
      ],
      category: "billing-and-pricing",
      dominio: "Domínio 4: Faturamento e Preços",
      difficulty: "easy",
      references: [
        "https://aws.amazon.com/aws-cost-management/aws-cost-explorer/",
      ],
    },
    {
      id: "q30",
      type: "single_choice",
      text: "Qual é o melhor recurso para um usuário encontrar informações e relatórios relacionados à conformidade sobre a AWS?",
      options: [
        {
          id: "a",
          text: "AWS Artifact",
          isCorrect: !0,
          explanation:
            "AWS Artifact é o recurso central para acessar relatórios de conformidade e acordos da AWS.",
        },
        {
          id: "b",
          text: "AWS Marketplace",
          isCorrect: !1,
          explanation:
            "AWS Marketplace é uma loja digital para software de terceiros, não um recurso de conformidade.",
        },
        {
          id: "c",
          text: "Amazon Inspector",
          isCorrect: !1,
          explanation:
            "Amazon Inspector avalia a segurança de aplicações, não fornece relatórios de conformidade.",
        },
        {
          id: "d",
          text: "AWS Support",
          isCorrect: !1,
          explanation:
            "AWS Support fornece ajuda técnica, não é o recurso principal para documentos de conformidade.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: ["https://aws.amazon.com/artifact/"],
    },
    {
      id: "q31",
      type: "single_choice",
      text: "Usar o AWS Identity and Access Management (IAM) para conceder acesso apenas aos recursos necessários para executar uma tarefa é um conceito conhecido como:",
      options: [
        {
          id: "a",
          text: "Acesso restrito",
          isCorrect: !1,
          explanation:
            "Acesso restrito não é o termo técnico correto para este conceito de segurança.",
        },
        {
          id: "b",
          text: "Acesso conforme necessário",
          isCorrect: !1,
          explanation:
            "Acesso conforme necessário não é o termo técnico correto para este princípio de segurança.",
        },
        {
          id: "c",
          text: "Acesso simbólico",
          isCorrect: !1,
          explanation:
            "Acesso simbólico não é um termo usado em práticas de segurança da AWS.",
        },
        {
          id: "d",
          text: "Acesso com privilégios mínimos",
          isCorrect: !0,
          explanation:
            "O princípio do privilégio mínimo significa conceder apenas os direitos de acesso necessários para realizar uma tarefa específica.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: [
        "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
      ],
    },
    {
      id: "q32",
      type: "single_choice",
      text: "Qual serviço da Nuvem AWS pode enviar alertas aos clientes se os limites de gastos personalizados forem excedidos?",
      options: [
        {
          id: "a",
          text: "AWS Budgets",
          isCorrect: !0,
          explanation:
            "AWS Budgets permite definir limites de gastos personalizados e receber alertas quando esses limites são excedidos.",
        },
        {
          id: "b",
          text: "AWS Cost Explorer",
          isCorrect: !1,
          explanation:
            "Cost Explorer é usado para análise de custos, não para alertas de gastos.",
        },
        {
          id: "c",
          text: "AWS Cost Allocation Tags",
          isCorrect: !1,
          explanation:
            "Cost Allocation Tags são usadas para organizar recursos e custos, não para alertas.",
        },
        {
          id: "d",
          text: "AWS Organizations",
          isCorrect: !1,
          explanation:
            "AWS Organizations é usado para gerenciar múltiplas contas AWS, não para alertas de gastos.",
        },
      ],
      category: "billing-and-pricing",
      dominio: "Domínio 4: Faturamento e Preços",
      difficulty: "easy",
      references: ["https://aws.amazon.com/aws-cost-management/aws-budgets/"],
    },
    {
      id: "q33",
      type: "single_choice",
      text: "Qual das alternativas a seguir descreve algumas das principais funcionalidades do Amazon S3?",
      options: [
        {
          id: "a",
          text: "O Amazon S3 é um serviço de armazenamento em blocos de alto desempenho projetado para uso com o Amazon EC2.",
          isCorrect: !1,
          explanation: "Esta descrição se aplica ao Amazon EBS, não ao S3.",
        },
        {
          id: "b",
          text: "Amazon S3 é um serviço de armazenamento de objetos que oferece desempenho, segurança, escalabilidade e disponibilidade de dados de alto nível.",
          isCorrect: !0,
          explanation:
            "Esta é a descrição correta do Amazon S3, um serviço de armazenamento de objetos altamente escalável.",
        },
        {
          id: "c",
          text: "O Amazon S3 é um sistema de armazenamento de arquivos totalmente gerenciado, altamente confiável e escalável, acessível por meio do protocolo SMB padrão do setor.",
          isCorrect: !1,
          explanation:
            "Esta descrição se aplica ao Amazon FSx for Windows File Server, não ao S3.",
        },
        {
          id: "d",
          text: "O Amazon S3 é um NFS elástico escalável e totalmente gerenciado para uso com serviços da Nuvem AWS e recursos locais.",
          isCorrect: !1,
          explanation: "Esta descrição se aplica ao Amazon EFS, não ao S3.",
        },
      ],
      category: "storage",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/s3/features/"],
    },
    {
      id: "q34",
      type: "multiple_choice",
      text: "Quais ações são práticas recomendadas para um usuário root de conta da AWS? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Compartilhe credenciais de usuário root com membros da equipe.",
          isCorrect: !1,
          explanation:
            "Nunca compartilhe credenciais do usuário root, isso compromete a segurança da conta.",
        },
        {
          id: "b",
          text: "Crie vários usuários root para a conta, separados por ambiente.",
          isCorrect: !1,
          explanation:
            "Não é possível criar múltiplos usuários root, e isso não seria uma prática segura.",
        },
        {
          id: "c",
          text: "Habilite a autenticação multifator (MFA) no usuário root.",
          isCorrect: !0,
          explanation:
            "Habilitar MFA no usuário root é uma prática de segurança essencial.",
        },
        {
          id: "d",
          text: "Crie um usuário IAM com privilégios de administrador para tarefas administrativas diárias, em vez de usar o usuário root.",
          isCorrect: !0,
          explanation:
            "Use usuários IAM com privilégios apropriados para tarefas diárias, não o usuário root.",
        },
        {
          id: "e",
          text: "Use acesso programático em vez do usuário root e senha.",
          isCorrect: !1,
          explanation:
            "O acesso programático deve ser configurado para usuários IAM, não para o usuário root.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: [
        "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
      ],
    },
    {
      id: "q35",
      type: "multiple_choice",
      text: "A implantação Multi-AZ significa que o ambiente é/possui: (Selecione DUAS)",
      options: [
        {
          id: "a",
          text: "Dimensionamento Vertical",
          isCorrect: !1,
          explanation:
            "Multi-AZ não está relacionado ao dimensionamento vertical.",
        },
        {
          id: "b",
          text: "Alta disponibilidade",
          isCorrect: !0,
          explanation:
            "Multi-AZ fornece alta disponibilidade através de redundância em diferentes zonas de disponibilidade.",
        },
        {
          id: "c",
          text: "Projetado para falhas (failover)",
          isCorrect: !0,
          explanation:
            "Multi-AZ oferece failover automático para manter a disponibilidade em caso de falhas.",
        },
        {
          id: "d",
          text: "Eficiência de desempenho",
          isCorrect: !1,
          explanation:
            "Multi-AZ é focado em disponibilidade, não em eficiência de desempenho.",
        },
        {
          id: "e",
          text: "Elasticidade",
          isCorrect: !1,
          explanation:
            "Multi-AZ não está diretamente relacionado à elasticidade, que é a capacidade de escalar automaticamente.",
        },
      ],
      category: "architecture-design",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/rds/features/multi-az/"],
    },
    {
      id: "q36",
      type: "single_choice",
      text: "Uma empresa está armazenando dados confidenciais de clientes em um bucket do Amazon S3. A empresa deseja proteger os dados contra exclusão ou substituição acidental. Qual recurso do S3 a empresa deve usar para atender a esses requisitos?",
      options: [
        {
          id: "a",
          text: "Regras do ciclo de vida",
          isCorrect: !1,
          explanation:
            "Regras do ciclo de vida são usadas para gerenciar a transição e expiração de objetos, não para proteção contra exclusão.",
        },
        {
          id: "b",
          text: "Versionamento",
          isCorrect: !0,
          explanation:
            "O versionamento do S3 mantém múltiplas variantes de um objeto, protegendo contra exclusões e substituições acidentais.",
        },
        {
          id: "c",
          text: "Políticas de bucket",
          isCorrect: !1,
          explanation:
            "Políticas de bucket controlam acesso, mas não protegem contra exclusão acidental por usuários autorizados.",
        },
        {
          id: "d",
          text: "Criptografia do lado do servidor",
          isCorrect: !1,
          explanation:
            "Criptografia protege a confidencialidade dos dados, não contra exclusão acidental.",
        },
      ],
      category: "storage",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: [
        "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html",
      ],
    },
    {
      id: "q37",
      type: "single_choice",
      text: "Qual das seguintes classes de armazenamento S3 leva mais tempo para recuperar dados (também conhecido como latência do primeiro byte)?",
      options: [
        {
          id: "a",
          text: "S3 Glacier Deep Archive",
          isCorrect: !0,
          explanation:
            "S3 Glacier Deep Archive tem o maior tempo de recuperação (até 48 horas), mas é a opção mais econômica para arquivamento de longo prazo.",
        },
        {
          id: "b",
          text: "S3 Intelligent-Tiering",
          isCorrect: !1,
          explanation:
            "S3 Intelligent-Tiering oferece acesso em milissegundos e move automaticamente objetos entre níveis de acesso.",
        },
        {
          id: "c",
          text: "S3 Glacier",
          isCorrect: !1,
          explanation:
            "S3 Glacier tem tempos de recuperação mais longos que o Standard, mas mais curtos que o Deep Archive.",
        },
        {
          id: "d",
          text: "S3 Standard",
          isCorrect: !1,
          explanation:
            "S3 Standard oferece latência muito baixa e alta disponibilidade para acesso frequente.",
        },
      ],
      category: "storage",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/s3/storage-classes/"],
    },
    {
      id: "q38",
      type: "multiple_choice",
      text: "Qual a finalidade dos pontos de presença da AWS? (Escolha duas.)",
      options: [
        {
          id: "a",
          text: "Hospedagem de aplicativos",
          isCorrect: !1,
          explanation:
            "Pontos de presença não são usados para hospedagem de aplicativos.",
        },
        {
          id: "b",
          text: "Oferecer conteúdo mais próximo dos usuários",
          isCorrect: !0,
          explanation:
            "Pontos de presença ajudam a entregar conteúdo com menor latência aos usuários finais.",
        },
        {
          id: "c",
          text: "Redução de tráfego no servidor, armazenando respostas em cache",
          isCorrect: !0,
          explanation:
            "Pontos de presença armazenam conteúdo em cache para melhorar o desempenho e reduzir a carga nos servidores de origem.",
        },
        {
          id: "d",
          text: "Execução de serviços de armazenamento em cache do banco de dados NoSQL",
          isCorrect: !1,
          explanation:
            "Pontos de presença não são usados para cache de banco de dados NoSQL.",
        },
        {
          id: "e",
          text: "Envio de mensagens de notificação para usuários finais",
          isCorrect: !1,
          explanation:
            "Pontos de presença não são usados para envio de notificações.",
        },
      ],
      category: "networking",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/cloudfront/features/"],
    },
    {
      id: "q39",
      type: "single_choice",
      text: "Uma plataforma de e-learning precisa executar um aplicativo durante 2 meses por ano. O aplicativo será implantado em instâncias do Amazon EC2. Qualquer tempo de inatividade do aplicativo durante esses 2 meses deve ser evitado. Qual opção de compra do EC2 atenderá a esses requisitos de maneira MAIS econômica?",
      options: [
        {
          id: "a",
          text: "Instâncias Reservadas",
          isCorrect: !1,
          explanation:
            "Instâncias Reservadas são mais econômicas para uso contínuo de 1 ou 3 anos, não para uso sazonal.",
        },
        {
          id: "b",
          text: "Hosts Dedicados",
          isCorrect: !1,
          explanation:
            "Hosts Dedicados são mais caros e usados quando você precisa de hardware dedicado.",
        },
        {
          id: "c",
          text: "Instâncias Spot",
          isCorrect: !1,
          explanation:
            "Instâncias Spot podem ser interrompidas e não são adequadas quando o tempo de inatividade deve ser evitado.",
        },
        {
          id: "d",
          text: "Instâncias Sob Demanda",
          isCorrect: !0,
          explanation:
            "Instâncias Sob Demanda são a melhor opção para cargas de trabalho de curto prazo que precisam de disponibilidade garantida.",
        },
      ],
      category: "compute",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/ec2/pricing/"],
    },
    {
      id: "q40",
      type: "single_choice",
      text: "Uma empresa está executando uma aplicação web no Amazon EC2 e deseja monitorar a utilização da CPU. Qual serviço da AWS deve ser usado?",
      options: [
        {
          id: "a",
          text: "AWS CloudTrail",
          isCorrect: !1,
          explanation:
            "CloudTrail é usado para registrar atividades de API, não para monitorar métricas de recursos.",
        },
        {
          id: "b",
          text: "Amazon CloudWatch",
          isCorrect: !0,
          explanation:
            "Amazon CloudWatch é o serviço de monitoramento que coleta e rastreia métricas, incluindo utilização de CPU.",
        },
        {
          id: "c",
          text: "AWS Config",
          isCorrect: !1,
          explanation:
            "AWS Config é usado para avaliar e auditar configurações de recursos, não para monitoramento de métricas.",
        },
        {
          id: "d",
          text: "Amazon Inspector",
          isCorrect: !1,
          explanation:
            "Amazon Inspector é usado para análise de segurança automatizada, não para monitoramento de recursos.",
        },
      ],
      category: "management",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/cloudwatch/features/"],
    },
    {
      id: "q41",
      type: "single_choice",
      text: "Uma empresa precisa de uma solução de banco de dados que ofereça alta disponibilidade e failover automático. Qual configuração do Amazon RDS atende a esses requisitos?",
      options: [
        {
          id: "a",
          text: "Implantação Multi-AZ",
          isCorrect: !0,
          explanation:
            "A implantação Multi-AZ do RDS fornece alta disponibilidade e failover automático para o banco de dados standby em outra zona de disponibilidade.",
        },
        {
          id: "b",
          text: "Réplicas de leitura",
          isCorrect: !1,
          explanation:
            "Réplicas de leitura são usadas para melhorar o desempenho de leitura, não para alta disponibilidade automática.",
        },
        {
          id: "c",
          text: "Snapshots de banco de dados",
          isCorrect: !1,
          explanation:
            "Snapshots são usados para backup e recuperação, não para alta disponibilidade.",
        },
        {
          id: "d",
          text: "Grupos de segurança",
          isCorrect: !1,
          explanation:
            "Grupos de segurança controlam o acesso ao banco de dados, não fornecem alta disponibilidade.",
        },
      ],
      category: "database",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/rds/features/multi-az/"],
    },
    {
      id: "q42",
      type: "multiple_choice",
      text: "Quais são os benefícios do AWS Organizations? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Gerenciamento centralizado de todas as suas contas AWS",
          isCorrect: !0,
          explanation:
            "AWS Organizations permite gerenciar centralmente múltiplas contas AWS.",
        },
        {
          id: "b",
          text: "Configuração automática de Multi-AZ para todos os recursos",
          isCorrect: !1,
          explanation:
            "AWS Organizations não configura automaticamente Multi-AZ.",
        },
        {
          id: "c",
          text: "Faturamento consolidado para todas as contas AWS",
          isCorrect: !0,
          explanation:
            "AWS Organizations permite consolidar o faturamento de todas as contas AWS membro.",
        },
        {
          id: "d",
          text: "Backup automático de todos os dados em todas as contas",
          isCorrect: !1,
          explanation:
            "AWS Organizations não gerencia backups automaticamente.",
        },
        {
          id: "e",
          text: "Monitoramento de performance em tempo real",
          isCorrect: !1,
          explanation:
            "AWS Organizations não fornece monitoramento de performance.",
        },
      ],
      category: "management",
      dominio: "Domínio 1: Conceitos de Nuvem",
      difficulty: "medium",
      references: ["https://aws.amazon.com/organizations/features/"],
    },
    {
      id: "q43",
      type: "single_choice",
      text: "Uma empresa precisa de uma solução de armazenamento para arquivos que são acessados com pouca frequência, mas precisam estar disponíveis imediatamente quando necessário. Qual classe de armazenamento do Amazon S3 é a MAIS adequada?",
      options: [
        {
          id: "a",
          text: "S3 Standard",
          isCorrect: !1,
          explanation:
            "S3 Standard é otimizado para dados acessados frequentemente, sendo mais caro para dados raramente acessados.",
        },
        {
          id: "b",
          text: "S3 Glacier",
          isCorrect: !1,
          explanation:
            "S3 Glacier tem tempos de recuperação longos e é mais adequado para arquivamento.",
        },
        {
          id: "c",
          text: "S3 Standard-IA",
          isCorrect: !0,
          explanation:
            "S3 Standard-IA (Infrequent Access) é ideal para dados acessados com menos frequência, mas que precisam estar disponíveis imediatamente quando necessário.",
        },
        {
          id: "d",
          text: "S3 Glacier Deep Archive",
          isCorrect: !1,
          explanation:
            "S3 Glacier Deep Archive tem o maior tempo de recuperação e é usado para arquivamento de longo prazo.",
        },
      ],
      category: "storage",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/s3/storage-classes/"],
    },
    {
      id: "q44",
      type: "multiple_choice",
      text: "Quais são os benefícios do Amazon CloudFront? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Redução da latência para entrega de conteúdo",
          isCorrect: !0,
          explanation:
            "CloudFront usa uma rede global de pontos de presença para reduzir a latência na entrega de conteúdo.",
        },
        {
          id: "b",
          text: "Backup automático de dados",
          isCorrect: !1,
          explanation: "CloudFront não fornece backup automático de dados.",
        },
        {
          id: "c",
          text: "Proteção contra ataques DDoS",
          isCorrect: !0,
          explanation:
            "CloudFront, integrado com AWS Shield, fornece proteção contra ataques DDoS.",
        },
        {
          id: "d",
          text: "Gerenciamento de banco de dados",
          isCorrect: !1,
          explanation: "CloudFront não gerencia bancos de dados.",
        },
        {
          id: "e",
          text: "Hospedagem de aplicativos serverless",
          isCorrect: !1,
          explanation:
            "CloudFront não hospeda aplicativos serverless, isso é função do AWS Lambda.",
        },
      ],
      category: "networking",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/cloudfront/features/"],
    },
    {
      id: "q45",
      type: "single_choice",
      text: "Qual serviço da AWS pode ser usado para criar uma conexão privada dedicada de um data center local para a AWS?",
      options: [
        {
          id: "a",
          text: "Amazon VPC",
          isCorrect: !1,
          explanation:
            "Amazon VPC é usado para criar redes virtuais isoladas na AWS, não para conexões dedicadas com data centers locais.",
        },
        {
          id: "b",
          text: "AWS Direct Connect",
          isCorrect: !0,
          explanation:
            "AWS Direct Connect estabelece uma conexão de rede dedicada entre seu data center e a AWS.",
        },
        {
          id: "c",
          text: "Amazon Route 53",
          isCorrect: !1,
          explanation:
            "Amazon Route 53 é um serviço de DNS, não para conexões dedicadas.",
        },
        {
          id: "d",
          text: "AWS VPN",
          isCorrect: !1,
          explanation:
            "AWS VPN cria uma conexão criptografada através da internet, não uma conexão dedicada.",
        },
      ],
      category: "networking",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/directconnect/features/"],
    },
    {
      id: "q46",
      type: "single_choice",
      text: "Qual serviço da Nuvem AWS pode enviar alertas aos clientes se os limites de gastos personalizados forem excedidos?",
      options: [
        {
          id: "a",
          text: "AWS Budgets",
          isCorrect: !0,
          explanation:
            "AWS Budgets permite definir limites de gastos personalizados e receber alertas quando esses limites são excedidos.",
        },
        {
          id: "b",
          text: "AWS Cost Explorer",
          isCorrect: !1,
          explanation:
            "Cost Explorer é usado para análise de custos, não para alertas de gastos.",
        },
        {
          id: "c",
          text: "AWS Cost Allocation Tags",
          isCorrect: !1,
          explanation:
            "Cost Allocation Tags são usadas para organizar recursos e custos, não para alertas.",
        },
        {
          id: "d",
          text: "AWS Organizations",
          isCorrect: !1,
          explanation:
            "AWS Organizations é usado para gerenciar múltiplas contas AWS, não para alertas de gastos.",
        },
      ],
      category: "billing-and-pricing",
      dominio: "Domínio 4: Faturamento e Preços",
      difficulty: "easy",
      references: ["https://aws.amazon.com/aws-cost-management/aws-budgets/"],
    },
    {
      id: "q47",
      type: "single_choice",
      text: "Qual serviço da AWS fornece recomendações para otimizar custos e melhorar a segurança?",
      options: [
        {
          id: "a",
          text: "AWS Trusted Advisor",
          isCorrect: !0,
          explanation:
            "AWS Trusted Advisor fornece recomendações em tempo real para otimizar seu ambiente AWS em termos de custo, segurança, desempenho e tolerância a falhas.",
        },
        {
          id: "b",
          text: "Amazon Inspector",
          isCorrect: !1,
          explanation:
            "Amazon Inspector é focado apenas em avaliações de segurança automatizadas.",
        },
        {
          id: "c",
          text: "AWS Config",
          isCorrect: !1,
          explanation:
            "AWS Config é usado para avaliar e auditar configurações de recursos, não para fornecer recomendações de otimização.",
        },
        {
          id: "d",
          text: "AWS CloudTrail",
          isCorrect: !1,
          explanation:
            "AWS CloudTrail é usado para registro e monitoramento de atividades de API, não para recomendações.",
        },
      ],
      category: "management",
      dominio: "Domínio 4: Faturamento e Preços",
      difficulty: "easy",
      references: [
        "https://aws.amazon.com/premiumsupport/technology/trusted-advisor/",
      ],
    },
    {
      id: "q48",
      type: "multiple_choice",
      text: "Quais são os benefícios do Amazon DynamoDB? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Escalabilidade automática",
          isCorrect: !0,
          explanation:
            "DynamoDB escala automaticamente para lidar com aumentos de tráfego sem necessidade de intervenção.",
        },
        {
          id: "b",
          text: "Suporte a SQL complexo",
          isCorrect: !1,
          explanation:
            "DynamoDB é um banco de dados NoSQL e não suporta SQL complexo.",
        },
        {
          id: "c",
          text: "Latência consistente de milissegundos",
          isCorrect: !0,
          explanation:
            "DynamoDB oferece consistentemente latência de milissegundos para operações de leitura e gravação.",
        },
        {
          id: "d",
          text: "Armazenamento ilimitado de arquivos",
          isCorrect: !1,
          explanation:
            "DynamoDB é um banco de dados NoSQL, não um serviço de armazenamento de arquivos.",
        },
        {
          id: "e",
          text: "Hospedagem de aplicativos web",
          isCorrect: !1,
          explanation:
            "DynamoDB é um banco de dados, não um serviço de hospedagem de aplicativos.",
        },
      ],
      category: "database",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/dynamodb/features/"],
    },
    {
      id: "q49",
      type: "single_choice",
      text: "Uma empresa de mídia social deseja proteger seu aplicativo Web contra explorações comuns da Web, como injeções de SQL e scripts entre sites. Qual serviço da AWS atenderá a esses requisitos?",
      options: [
        {
          id: "a",
          text: "Amazon Inspector",
          isCorrect: !1,
          explanation:
            "Amazon Inspector é usado para avaliação de vulnerabilidades em instâncias EC2, não para proteção de aplicativos web.",
        },
        {
          id: "b",
          text: "AWS WAF",
          isCorrect: !0,
          explanation:
            "AWS WAF (Web Application Firewall) protege aplicativos web contra explorações comuns como injeção SQL e XSS.",
        },
        {
          id: "c",
          text: "Amazon GuardDuty",
          isCorrect: !1,
          explanation:
            "Amazon GuardDuty é um serviço de detecção de ameaças, não um firewall de aplicativo web.",
        },
        {
          id: "d",
          text: "Amazon CloudWatch",
          isCorrect: !1,
          explanation:
            "Amazon CloudWatch é um serviço de monitoramento, não um serviço de segurança para aplicativos web.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: ["https://aws.amazon.com/waf/"],
    },
    {
      id: "q50",
      type: "multiple_choice",
      text: "Quais são os benefícios do Amazon RDS? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Backups automatizados",
          isCorrect: !0,
          explanation:
            "Amazon RDS oferece backups automatizados configuráveis do seu banco de dados.",
        },
        {
          id: "b",
          text: "Hospedagem de sites estáticos",
          isCorrect: !1,
          explanation:
            "RDS é um serviço de banco de dados, não para hospedagem de sites.",
        },
        {
          id: "c",
          text: "Gerenciamento automatizado de patches",
          isCorrect: !0,
          explanation:
            "RDS gerencia automaticamente patches do sistema operacional e do banco de dados.",
        },
        {
          id: "d",
          text: "Processamento de big data",
          isCorrect: !1,
          explanation:
            "RDS é um serviço de banco de dados relacional, não otimizado para processamento de big data.",
        },
        {
          id: "e",
          text: "Armazenamento de arquivos em grande escala",
          isCorrect: !1,
          explanation:
            "RDS é para bancos de dados relacionais, não para armazenamento de arquivos em grande escala.",
        },
      ],
      category: "database",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/rds/features/"],
    },
    {
      id: "q51",
      type: "single_choice",
      text: "Qual serviço da AWS deve ser usado para criar uma VPN site-to-site entre um data center on-premises e a AWS?",
      options: [
        {
          id: "a",
          text: "AWS Direct Connect",
          isCorrect: !1,
          explanation:
            "AWS Direct Connect é para conexões de rede dedicadas, não para VPN.",
        },
        {
          id: "b",
          text: "Amazon VPC",
          isCorrect: !1,
          explanation:
            "Amazon VPC é usado para criar redes virtuais isoladas, não para criar VPNs.",
        },
        {
          id: "c",
          text: "AWS Site-to-Site VPN",
          isCorrect: !0,
          explanation:
            "AWS Site-to-Site VPN cria uma conexão VPN segura e criptografada entre sua rede on-premises e a VPC.",
        },
        {
          id: "d",
          text: "AWS Transit Gateway",
          isCorrect: !1,
          explanation:
            "AWS Transit Gateway é um hub de rede que conecta VPCs e redes on-premises, mas não cria a VPN em si.",
        },
      ],
      category: "networking",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/vpn/features/"],
    },
    {
      id: "q52",
      type: "single_choice",
      text: "Qual serviço da AWS oferece armazenamento de objetos altamente durável?",
      options: [
        {
          id: "a",
          text: "Amazon S3",
          isCorrect: !0,
          explanation:
            "Amazon S3 oferece armazenamento de objetos altamente durável, com 99,999999999% (11 noves) de durabilidade.",
        },
        {
          id: "b",
          text: "Amazon Elastic File System (Amazon EFS)",
          isCorrect: !1,
          explanation:
            "Amazon EFS é um sistema de arquivos gerenciado, não um serviço de armazenamento de objetos.",
        },
        {
          id: "c",
          text: "Amazon Elastic Block Store (Amazon EBS)",
          isCorrect: !1,
          explanation:
            "Amazon EBS é um serviço de armazenamento em bloco, não um serviço de armazenamento de objetos.",
        },
        {
          id: "d",
          text: "Amazon FSx",
          isCorrect: !1,
          explanation:
            "Amazon FSx é um serviço de sistema de arquivos gerenciado, não um serviço de armazenamento de objetos.",
        },
      ],
      category: "storage",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/s3/"],
    },
    {
      id: "q53",
      type: "multiple_choice",
      text: "Quais são os benefícios do Amazon CloudWatch? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Monitoramento de recursos em tempo real",
          isCorrect: !0,
          explanation:
            "CloudWatch fornece monitoramento em tempo real dos recursos da AWS.",
        },
        {
          id: "b",
          text: "Gerenciamento de banco de dados",
          isCorrect: !1,
          explanation:
            "CloudWatch é para monitoramento, não para gerenciamento de banco de dados.",
        },
        {
          id: "c",
          text: "Configuração de alarmes automatizados",
          isCorrect: !0,
          explanation:
            "CloudWatch permite configurar alarmes que notificam e tomam ações automaticamente.",
        },
        {
          id: "d",
          text: "Hospedagem de aplicativos",
          isCorrect: !1,
          explanation:
            "CloudWatch é para monitoramento, não para hospedagem de aplicativos.",
        },
        {
          id: "e",
          text: "Backup de dados",
          isCorrect: !1,
          explanation:
            "CloudWatch é para monitoramento, não para backup de dados.",
        },
      ],
      category: "management",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/cloudwatch/features/"],
    },
    {
      id: "q54",
      type: "single_choice",
      text: "Qual serviço da AWS deve ser usado para criar um pipeline de integração e entrega contínua (CI/CD)?",
      options: [
        {
          id: "a",
          text: "AWS CodePipeline",
          isCorrect: !0,
          explanation:
            "AWS CodePipeline é um serviço de entrega contínua que automatiza as fases de lançamento para entrega rápida e confiável de aplicativos e atualizações.",
        },
        {
          id: "b",
          text: "Amazon EC2",
          isCorrect: !1,
          explanation:
            "Amazon EC2 é um serviço de computação, não um serviço de CI/CD.",
        },
        {
          id: "c",
          text: "Amazon S3",
          isCorrect: !1,
          explanation:
            "Amazon S3 é um serviço de armazenamento, não um serviço de CI/CD.",
        },
        {
          id: "d",
          text: "AWS Lambda",
          isCorrect: !1,
          explanation:
            "AWS Lambda é um serviço de computação serverless, não um serviço de CI/CD.",
        },
      ],
      category: "developer_tools",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/codepipeline/features/"],
    },
    {
      id: "q55",
      type: "single_choice",
      text: "Uma empresa precisa de uma solução para executar análises complexas em grandes conjuntos de dados. Qual serviço da AWS é MAIS adequado para essa necessidade?",
      options: [
        {
          id: "a",
          text: "Amazon Redshift",
          isCorrect: !0,
          explanation:
            "Amazon Redshift é um data warehouse totalmente gerenciado que permite analisar grandes volumes de dados usando SQL padrão.",
        },
        {
          id: "b",
          text: "Amazon RDS",
          isCorrect: !1,
          explanation:
            "Amazon RDS é um banco de dados relacional para aplicações, não otimizado para análise de grandes conjuntos de dados.",
        },
        {
          id: "c",
          text: "Amazon DynamoDB",
          isCorrect: !1,
          explanation:
            "Amazon DynamoDB é um banco de dados NoSQL, não projetado para análises complexas em grandes conjuntos de dados.",
        },
        {
          id: "d",
          text: "Amazon ElastiCache",
          isCorrect: !1,
          explanation:
            "Amazon ElastiCache é um serviço de cache em memória, não para análise de dados.",
        },
      ],
      category: "analytics",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/redshift/features/"],
    },
    {
      id: "q56",
      type: "multiple_choice",
      text: "Quais são os benefícios do Amazon Route 53? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Roteamento baseado em latência",
          isCorrect: !0,
          explanation:
            "Route 53 pode rotear o tráfego para o endpoint com menor latência para o usuário.",
        },
        {
          id: "b",
          text: "Armazenamento de arquivos",
          isCorrect: !1,
          explanation:
            "Route 53 é um serviço de DNS, não para armazenamento de arquivos.",
        },
        {
          id: "c",
          text: "Alta disponibilidade e failover automático",
          isCorrect: !0,
          explanation:
            "Route 53 oferece verificações de integridade e failover automático para alta disponibilidade.",
        },
        {
          id: "d",
          text: "Processamento de imagens",
          isCorrect: !1,
          explanation: "Route 53 é um serviço de DNS, não processa imagens.",
        },
        {
          id: "e",
          text: "Hospedagem de banco de dados",
          isCorrect: !1,
          explanation:
            "Route 53 é um serviço de DNS, não hospeda bancos de dados.",
        },
      ],
      category: "networking",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/route53/features/"],
    },
    {
      id: "q57",
      type: "single_choice",
      text: "Qual serviço da AWS deve ser usado para enviar notificações por e-mail ou SMS para usuários?",
      options: [
        {
          id: "a",
          text: "Amazon SNS",
          isCorrect: !0,
          explanation:
            "Amazon Simple Notification Service (SNS) é um serviço de mensagens pub/sub totalmente gerenciado para envio de notificações.",
        },
        {
          id: "b",
          text: "Amazon SQS",
          isCorrect: !1,
          explanation:
            "Amazon SQS é um serviço de filas de mensagens, não otimizado para envio de notificações para usuários finais.",
        },
        {
          id: "c",
          text: "Amazon SES",
          isCorrect: !1,
          explanation:
            "Amazon SES é para envio de e-mails em massa, mas não suporta SMS e não é otimizado para notificações em tempo real.",
        },
        {
          id: "d",
          text: "AWS Lambda",
          isCorrect: !1,
          explanation:
            "AWS Lambda é um serviço de computação serverless, não um serviço de notificação.",
        },
      ],
      category: "application_integration",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/sns/features/"],
    },
    {
      id: "q58",
      type: "single_choice",
      text: "Uma empresa precisa de uma solução para armazenar e recuperar qualquer quantidade de dados de qualquer lugar. Qual serviço da AWS é MAIS adequado para essa necessidade?",
      options: [
        {
          id: "a",
          text: "Amazon S3",
          isCorrect: !0,
          explanation:
            "Amazon S3 é um serviço de armazenamento de objetos projetado para armazenar e recuperar qualquer quantidade de dados de qualquer lugar.",
        },
        {
          id: "b",
          text: "Amazon EBS",
          isCorrect: !1,
          explanation:
            "Amazon EBS é um armazenamento em bloco anexado a instâncias EC2, não é acessível globalmente.",
        },
        {
          id: "c",
          text: "Amazon EFS",
          isCorrect: !1,
          explanation:
            "Amazon EFS é um sistema de arquivos compartilhado para EC2, não é otimizado para acesso global.",
        },
        {
          id: "d",
          text: "AWS Storage Gateway",
          isCorrect: !1,
          explanation:
            "AWS Storage Gateway é para integrar armazenamento on-premises com a nuvem, não é a melhor opção para armazenamento direto na nuvem.",
        },
      ],
      category: "storage",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "easy",
      references: ["https://aws.amazon.com/s3/features/"],
    },
    {
      id: "q59",
      type: "multiple_choice",
      text: "Quais são os benefícios do Amazon EC2 Auto Scaling? (Escolha dois.)",
      options: [
        {
          id: "a",
          text: "Escalabilidade automática baseada em demanda",
          isCorrect: !0,
          explanation:
            "EC2 Auto Scaling ajusta automaticamente o número de instâncias EC2 com base na demanda.",
        },
        {
          id: "b",
          text: "Backup automático de dados",
          isCorrect: !1,
          explanation:
            "EC2 Auto Scaling não faz backup de dados, isso é função de outros serviços.",
        },
        {
          id: "c",
          text: "Melhor disponibilidade da aplicação",
          isCorrect: !0,
          explanation:
            "EC2 Auto Scaling mantém a disponibilidade da aplicação substituindo instâncias não saudáveis.",
        },
        {
          id: "d",
          text: "Criptografia de dados em repouso",
          isCorrect: !1,
          explanation: "EC2 Auto Scaling não lida com criptografia de dados.",
        },
        {
          id: "e",
          text: "Gerenciamento de banco de dados",
          isCorrect: !1,
          explanation: "EC2 Auto Scaling não gerencia bancos de dados.",
        },
      ],
      category: "compute",
      dominio: "Domínio 3: Tecnologia",
      difficulty: "medium",
      references: ["https://aws.amazon.com/ec2/autoscaling/features/"],
    },
    {
      id: "q60",
      type: "single_choice",
      text: "Qual serviço da AWS ajuda a proteger aplicativos web contra ataques comuns na web?",
      options: [
        {
          id: "a",
          text: "AWS WAF",
          isCorrect: !0,
          explanation:
            "AWS WAF é um firewall de aplicativo web que ajuda a proteger seus aplicativos web contra exploits comuns.",
        },
        {
          id: "b",
          text: "Amazon Inspector",
          isCorrect: !1,
          explanation:
            "Amazon Inspector é para avaliação de segurança automatizada de aplicações, não para proteção ativa contra ataques.",
        },
        {
          id: "c",
          text: "AWS Shield",
          isCorrect: !1,
          explanation:
            "AWS Shield é focado em proteção contra DDoS, não contra outros tipos de ataques web.",
        },
        {
          id: "d",
          text: "Security Groups",
          isCorrect: !1,
          explanation:
            "Security Groups são firewalls de nível de instância, não específicos para proteção de aplicativos web.",
        },
      ],
      category: "security",
      dominio: "Domínio 2: Segurança e Conformidade",
      difficulty: "medium",
      references: ["https://aws.amazon.com/waf/features/"],
    },
  ],
  _a = () => {
    const [e, a] = m.useState(0),
      [o, t] = m.useState(0),
      [r, i] = m.useState(!1),
      [d, s] = m.useState(90 * 60),
      [c, p] = m.useState(!1),
      [f, b] = m.useState([]),
      [x, w] = m.useState(!1),
      [A, v] = m.useState(null),
      [g, S] = m.useState(null),
      y = T[e],
      q = y.options,
      D = q.filter((l) => l.isCorrect),
      M = q.filter((l) => !l.isCorrect);
    m.useEffect(() => {
      let l = null;
      return (
        c && d > 0
          ? (l = setInterval(() => {
              s((z) => z - 1);
            }, 1e3))
          : d === 0 &&
            (clearInterval(l),
            i(!0),
            S("O tempo acabou! Sua prova foi finalizada automaticamente.")),
        () => clearInterval(l)
      );
    }, [c, d]);
    const U = (l) => {
        const z = Math.floor(l / 60),
          j = l % 60;
        return `${z}:${j.toString().padStart(2, "0")}`;
      },
      $ = (l) => {
        b((z) => (z.includes(l) ? z.filter((j) => j !== l) : [...z, l]));
      },
      H = () => {
        const l = q.filter((W) => W.isCorrect).map((W) => W.id),
          z = f.length === l.length && f.every((W) => l.includes(W)),
          j = f.some((W) => l.includes(W)) && !z;
        z
          ? (t(o + 1), v("correct"))
          : j
            ? (t(o + 0.5), v("partial"))
            : v("incorrect"),
          w(!0);
      },
      G = () => {
        w(!1),
          v(null),
          b([]),
          e + 1 < T.length
            ? a(e + 1)
            : (i(!0), p(!1), S("Parabéns! Você finalizou a prova."));
      },
      _ = (l) => {
        const z = f.includes(l),
          j = q.find((W) => W.id === l)?.isCorrect;
        return x
          ? j
            ? "success"
            : z && !j
              ? "destructive"
              : "outline"
          : z
            ? "default"
            : "outline";
      },
      F = () => {
        p(!0), a(0), t(0), i(!1), s(90 * 60), b([]), w(!1), S(null);
      },
      h = ((e + 1) / T.length) * 100;
    return n.jsx("div", {
      className: "w-full max-w-4xl mx-auto p-4",
      children: n.jsxs(Ae, {
        children: [
          n.jsx(Se, {
            children: n.jsxs(ye, {
              className: "flex justify-between items-center",
              children: [
                n.jsx("span", { children: "AWS Cloud Practitioner Simulator" }),
                c &&
                  n.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      n.jsx(ka, { className: "w-5 h-5" }),
                      n.jsx("span", { children: U(d) }),
                    ],
                  }),
              ],
            }),
          }),
          n.jsxs(we, {
            children: [
              !c &&
                !r &&
                n.jsxs("div", {
                  className: "text-center",
                  children: [
                    n.jsx("h2", {
                      className: "text-xl mb-4",
                      children: "Bem-vindo ao Simulador CLF-C02",
                    }),
                    n.jsx(R, { onClick: F, children: "Iniciar Simulado" }),
                  ],
                }),
              c &&
                !r &&
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "mb-4",
                      children: [
                        n.jsxs("span", {
                          className: "text-sm text-gray-500",
                          children: ["Questão ", e + 1, " de ", T.length],
                        }),
                        n.jsxs(ze, {
                          children: ["Progress: ", Math.round(h), "%"],
                        }),
                        n.jsx(Pe, { value: h, className: "mt-2" }),
                      ],
                    }),
                    n.jsxs("div", {
                      className: "mb-4",
                      children: [
                        n.jsxs("span", {
                          className: "text-sm font-medium text-blue-600",
                          children: [y.category, ", ID: ", y.id],
                        }),
                        n.jsx("h3", {
                          className: "text-lg font-medium mt-2",
                          children: y.text,
                        }),
                        y.type === "multiple_choice" &&
                          n.jsx("p", {
                            className: "text-sm text-gray-500 mt-1",
                            children: "(Selecione todas as opções corretas)",
                          }),
                      ],
                    }),
                    n.jsx("div", {
                      className: "space-y-3 mt-4",
                      children: q.map((l) =>
                        n.jsx(
                          "div",
                          {
                            className:
                              "flex items-center space-x-2 p-1 rounded hover:bg-gray-50",
                            children:
                              y.type === "multiple_choice"
                                ? n.jsx(R, {
                                    variant: _(l.id),
                                    className: "w-full justify-start text-left",
                                    onClick: () => !x && $(l.id),
                                    disabled: x,
                                    children: l.text,
                                  })
                                : n.jsx(R, {
                                    variant: _(l.id),
                                    className: "w-full justify-start text-left",
                                    onClick: () => !x && b([l.id]),
                                    disabled: x,
                                    children: l.text,
                                  }),
                          },
                          l.id,
                        ),
                      ),
                    }),
                    !x &&
                      f.length > 0 &&
                      n.jsx(R, {
                        className: "mt-4",
                        onClick: H,
                        children: "Verificar Resposta",
                      }),
                    x &&
                      n.jsxs("div", {
                        className:
                          "mt-4 p-4 bg-gray-100 border border-gray-300 rounded",
                        children: [
                          n.jsxs("p", {
                            className: "font-medium mb-2",
                            children: [
                              A === "correct" && "✅ Correto!",
                              A === "partial" && "⚠️ Parcialmente Correto!",
                              A === "incorrect" && "❌ Incorreto!",
                            ],
                          }),
                          n.jsxs("div", {
                            className: "space-y-4",
                            children: [
                              n.jsxs("div", {
                                children: [
                                  n.jsx("h3", {
                                    className: "text-green-600 font-bold mb-2",
                                    children: "Respostas Corretas:",
                                  }),
                                  n.jsx("ul", {
                                    className: "space-y-2",
                                    children: D.map((l) =>
                                      n.jsxs(
                                        "li",
                                        {
                                          className: "flex items-start",
                                          children: [
                                            n.jsx(Ea, {
                                              className:
                                                "w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1",
                                            }),
                                            n.jsxs("div", {
                                              children: [
                                                n.jsx("strong", {
                                                  children: l.text,
                                                }),
                                                n.jsx("p", {
                                                  className:
                                                    "text-sm text-gray-700",
                                                  children: l.explanation,
                                                }),
                                              ],
                                            }),
                                          ],
                                        },
                                        l.id,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                              n.jsxs("div", {
                                children: [
                                  n.jsx("h3", {
                                    className: "text-red-600 font-bold mb-2",
                                    children: "Explicação das outras opções:",
                                  }),
                                  n.jsx("ul", {
                                    className: "space-y-2",
                                    children: M.map((l) =>
                                      n.jsxs(
                                        "li",
                                        {
                                          children: [
                                            n.jsxs("strong", {
                                              children: [l.text, ":"],
                                            }),
                                            n.jsx("p", {
                                              className:
                                                "text-sm text-gray-700",
                                              children: l.explanation,
                                            }),
                                          ],
                                        },
                                        l.id,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          n.jsxs("div", {
                            className: "mt-4",
                            children: [
                              n.jsx("h4", {
                                className:
                                  "text-sm font-medium text-gray-700 mb-2",
                                children: "Referências:",
                              }),
                              n.jsx("ul", {
                                className: "space-y-1",
                                children: y.references.map((l, z) =>
                                  n.jsx(
                                    "li",
                                    {
                                      children: n.jsx("a", {
                                        href: l,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className:
                                          "text-blue-500 hover:underline",
                                        children: l,
                                      }),
                                    },
                                    z,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          n.jsx(R, {
                            onClick: G,
                            className: "mt-4",
                            children:
                              e === T.length - 1 ? "Finalizar" : "Próxima",
                          }),
                        ],
                      }),
                  ],
                }),
              r &&
                n.jsxs("div", {
                  className: "text-center",
                  children: [
                    n.jsx("h2", {
                      className: "text-2xl mb-4",
                      children: "Resultado do Simulado",
                    }),
                    g &&
                      n.jsx("p", {
                        className: "text-lg text-gray-700 mb-4",
                        children: g,
                      }),
                    n.jsxs("p", {
                      className: "text-xl mb-4",
                      children: [
                        "Você acertou ",
                        o,
                        " de ",
                        T.length,
                        " questões (",
                        Math.round((o / T.length) * 100),
                        "%)",
                      ],
                    }),
                    n.jsx(R, { onClick: F, children: "Tentar Novamente" }),
                  ],
                }),
            ],
          }),
        ],
      }),
    });
  };
export { _a as default };

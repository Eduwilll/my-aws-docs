var m = { exports: {} },
  u = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var N;
function Z() {
  if (N) return u;
  N = 1;
  var E = Symbol.for("react.transitional.element"),
    x = Symbol.for("react.portal"),
    M = Symbol.for("react.fragment"),
    k = Symbol.for("react.strict_mode"),
    I = Symbol.for("react.profiler"),
    L = Symbol.for("react.consumer"),
    U = Symbol.for("react.context"),
    q = Symbol.for("react.forward_ref"),
    b = Symbol.for("react.suspense"),
    D = Symbol.for("react.memo"),
    C = Symbol.for("react.lazy"),
    w = Symbol.iterator;
  function z(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (w && t[w]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var A = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    S = Object.assign,
    h = {};
  function a(t, e, n) {
    (this.props = t),
      (this.context = e),
      (this.refs = h),
      (this.updater = n || A);
  }
  (a.prototype.isReactComponent = {}),
    (a.prototype.setState = function (t, e) {
      if (typeof t != "object" && typeof t != "function" && t != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, t, e, "setState");
    }),
    (a.prototype.forceUpdate = function (t) {
      this.updater.enqueueForceUpdate(this, t, "forceUpdate");
    });
  function g() {}
  g.prototype = a.prototype;
  function y(t, e, n) {
    (this.props = t),
      (this.context = e),
      (this.refs = h),
      (this.updater = n || A);
  }
  var d = (y.prototype = new g());
  (d.constructor = y), S(d, a.prototype), (d.isPureReactComponent = !0);
  var O = Array.isArray,
    f = { H: null, A: null, T: null, S: null },
    j = Object.prototype.hasOwnProperty;
  function R(t, e, n, r, s, i) {
    return (
      (n = i.ref),
      { $$typeof: E, type: t, key: e, ref: n !== void 0 ? n : null, props: i }
    );
  }
  function G(t, e) {
    return R(t.type, e, void 0, void 0, void 0, t.props);
  }
  function v(t) {
    return typeof t == "object" && t !== null && t.$$typeof === E;
  }
  function K(t) {
    var e = { "=": "=0", ":": "=2" };
    return (
      "$" +
      t.replace(/[=:]/g, function (n) {
        return e[n];
      })
    );
  }
  var H = /\/+/g;
  function T(t, e) {
    return typeof t == "object" && t !== null && t.key != null
      ? K("" + t.key)
      : e.toString(36);
  }
  function P() {}
  function B(t) {
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        switch (
          (typeof t.status == "string"
            ? t.then(P, P)
            : ((t.status = "pending"),
              t.then(
                function (e) {
                  t.status === "pending" &&
                    ((t.status = "fulfilled"), (t.value = e));
                },
                function (e) {
                  t.status === "pending" &&
                    ((t.status = "rejected"), (t.reason = e));
                },
              )),
          t.status)
        ) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
    }
    throw t;
  }
  function _(t, e, n, r, s) {
    var i = typeof t;
    (i === "undefined" || i === "boolean") && (t = null);
    var o = !1;
    if (t === null) o = !0;
    else
      switch (i) {
        case "bigint":
        case "string":
        case "number":
          o = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case E:
            case x:
              o = !0;
              break;
            case C:
              return (o = t._init), _(o(t._payload), e, n, r, s);
          }
      }
    if (o)
      return (
        (s = s(t)),
        (o = r === "" ? "." + T(t, 0) : r),
        O(s)
          ? ((n = ""),
            o != null && (n = o.replace(H, "$&/") + "/"),
            _(s, e, n, "", function (X) {
              return X;
            }))
          : s != null &&
            (v(s) &&
              (s = G(
                s,
                n +
                  (s.key == null || (t && t.key === s.key)
                    ? ""
                    : ("" + s.key).replace(H, "$&/") + "/") +
                  o,
              )),
            e.push(s)),
        1
      );
    o = 0;
    var p = r === "" ? "." : r + ":";
    if (O(t))
      for (var c = 0; c < t.length; c++)
        (r = t[c]), (i = p + T(r, c)), (o += _(r, e, n, i, s));
    else if (((c = z(t)), typeof c == "function"))
      for (t = c.call(t), c = 0; !(r = t.next()).done; )
        (r = r.value), (i = p + T(r, c++)), (o += _(r, e, n, i, s));
    else if (i === "object") {
      if (typeof t.then == "function") return _(B(t), e, n, r, s);
      throw (
        ((e = String(t)),
        Error(
          "Objects are not valid as a React child (found: " +
            (e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    }
    return o;
  }
  function l(t, e, n) {
    if (t == null) return t;
    var r = [],
      s = 0;
    return (
      _(t, r, "", "", function (i) {
        return e.call(n, i, s++);
      }),
      r
    );
  }
  function W(t) {
    if (t._status === -1) {
      var e = t._result;
      (e = e()),
        e.then(
          function (n) {
            (t._status === 0 || t._status === -1) &&
              ((t._status = 1), (t._result = n));
          },
          function (n) {
            (t._status === 0 || t._status === -1) &&
              ((t._status = 2), (t._result = n));
          },
        ),
        t._status === -1 && ((t._status = 0), (t._result = e));
    }
    if (t._status === 1) return t._result.default;
    throw t._result;
  }
  var $ =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var e = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof t == "object" &&
                t !== null &&
                typeof t.message == "string"
                  ? String(t.message)
                  : String(t),
              error: t,
            });
            if (!window.dispatchEvent(e)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", t);
            return;
          }
          console.error(t);
        };
  function Q() {}
  return (
    (u.Children = {
      map: l,
      forEach: function (t, e, n) {
        l(
          t,
          function () {
            e.apply(this, arguments);
          },
          n,
        );
      },
      count: function (t) {
        var e = 0;
        return (
          l(t, function () {
            e++;
          }),
          e
        );
      },
      toArray: function (t) {
        return (
          l(t, function (e) {
            return e;
          }) || []
        );
      },
      only: function (t) {
        if (!v(t))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return t;
      },
    }),
    (u.Component = a),
    (u.Fragment = M),
    (u.Profiler = I),
    (u.PureComponent = y),
    (u.StrictMode = k),
    (u.Suspense = b),
    (u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f),
    (u.act = function () {
      throw Error("act(...) is not supported in production builds of React.");
    }),
    (u.cache = function (t) {
      return function () {
        return t.apply(null, arguments);
      };
    }),
    (u.cloneElement = function (t, e, n) {
      if (t == null)
        throw Error(
          "The argument must be a React element, but you passed " + t + ".",
        );
      var r = S({}, t.props),
        s = t.key,
        i = void 0;
      if (e != null)
        for (o in (e.ref !== void 0 && (i = void 0),
        e.key !== void 0 && (s = "" + e.key),
        e))
          !j.call(e, o) ||
            o === "key" ||
            o === "__self" ||
            o === "__source" ||
            (o === "ref" && e.ref === void 0) ||
            (r[o] = e[o]);
      var o = arguments.length - 2;
      if (o === 1) r.children = n;
      else if (1 < o) {
        for (var p = Array(o), c = 0; c < o; c++) p[c] = arguments[c + 2];
        r.children = p;
      }
      return R(t.type, s, void 0, void 0, i, r);
    }),
    (u.createContext = function (t) {
      return (
        (t = {
          $$typeof: U,
          _currentValue: t,
          _currentValue2: t,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (t.Provider = t),
        (t.Consumer = { $$typeof: L, _context: t }),
        t
      );
    }),
    (u.createElement = function (t, e, n) {
      var r,
        s = {},
        i = null;
      if (e != null)
        for (r in (e.key !== void 0 && (i = "" + e.key), e))
          j.call(e, r) &&
            r !== "key" &&
            r !== "__self" &&
            r !== "__source" &&
            (s[r] = e[r]);
      var o = arguments.length - 2;
      if (o === 1) s.children = n;
      else if (1 < o) {
        for (var p = Array(o), c = 0; c < o; c++) p[c] = arguments[c + 2];
        s.children = p;
      }
      if (t && t.defaultProps)
        for (r in ((o = t.defaultProps), o)) s[r] === void 0 && (s[r] = o[r]);
      return R(t, i, void 0, void 0, null, s);
    }),
    (u.createRef = function () {
      return { current: null };
    }),
    (u.forwardRef = function (t) {
      return { $$typeof: q, render: t };
    }),
    (u.isValidElement = v),
    (u.lazy = function (t) {
      return { $$typeof: C, _payload: { _status: -1, _result: t }, _init: W };
    }),
    (u.memo = function (t, e) {
      return { $$typeof: D, type: t, compare: e === void 0 ? null : e };
    }),
    (u.startTransition = function (t) {
      var e = f.T,
        n = {};
      f.T = n;
      try {
        var r = t(),
          s = f.S;
        s !== null && s(n, r),
          typeof r == "object" &&
            r !== null &&
            typeof r.then == "function" &&
            r.then(Q, $);
      } catch (i) {
        $(i);
      } finally {
        f.T = e;
      }
    }),
    (u.unstable_useCacheRefresh = function () {
      return f.H.useCacheRefresh();
    }),
    (u.use = function (t) {
      return f.H.use(t);
    }),
    (u.useActionState = function (t, e, n) {
      return f.H.useActionState(t, e, n);
    }),
    (u.useCallback = function (t, e) {
      return f.H.useCallback(t, e);
    }),
    (u.useContext = function (t) {
      return f.H.useContext(t);
    }),
    (u.useDebugValue = function () {}),
    (u.useDeferredValue = function (t, e) {
      return f.H.useDeferredValue(t, e);
    }),
    (u.useEffect = function (t, e) {
      return f.H.useEffect(t, e);
    }),
    (u.useId = function () {
      return f.H.useId();
    }),
    (u.useImperativeHandle = function (t, e, n) {
      return f.H.useImperativeHandle(t, e, n);
    }),
    (u.useInsertionEffect = function (t, e) {
      return f.H.useInsertionEffect(t, e);
    }),
    (u.useLayoutEffect = function (t, e) {
      return f.H.useLayoutEffect(t, e);
    }),
    (u.useMemo = function (t, e) {
      return f.H.useMemo(t, e);
    }),
    (u.useOptimistic = function (t, e) {
      return f.H.useOptimistic(t, e);
    }),
    (u.useReducer = function (t, e, n) {
      return f.H.useReducer(t, e, n);
    }),
    (u.useRef = function (t) {
      return f.H.useRef(t);
    }),
    (u.useState = function (t) {
      return f.H.useState(t);
    }),
    (u.useSyncExternalStore = function (t, e, n) {
      return f.H.useSyncExternalStore(t, e, n);
    }),
    (u.useTransition = function () {
      return f.H.useTransition();
    }),
    (u.version = "19.0.0"),
    u
  );
}
var Y;
function J() {
  return Y || ((Y = 1), (m.exports = Z())), m.exports;
}
var V = J();
export { J as a, V as r };

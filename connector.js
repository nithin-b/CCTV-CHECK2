(() => {
  var e = {
      452: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(269),
          n(214),
          n(888),
          n(109),
          (function () {
            var e = r,
              t = e.lib.BlockCipher,
              n = e.algo,
              i = [],
              o = [],
              a = [],
              _ = [],
              c = [],
              s = [],
              l = [],
              u = [],
              d = [],
              f = [];
            !(function () {
              for (var e = [], t = 0; t < 256; t++)
                e[t] = t < 128 ? t << 1 : (t << 1) ^ 283;
              var n = 0,
                r = 0;
              for (t = 0; t < 256; t++) {
                var h = r ^ (r << 1) ^ (r << 2) ^ (r << 3) ^ (r << 4);
                (h = (h >>> 8) ^ (255 & h) ^ 99), (i[n] = h), (o[h] = n);
                var p = e[n],
                  P = e[p],
                  m = e[P],
                  v = (257 * e[h]) ^ (16843008 * h);
                (a[n] = (v << 24) | (v >>> 8)),
                  (_[n] = (v << 16) | (v >>> 16)),
                  (c[n] = (v << 8) | (v >>> 24)),
                  (s[n] = v),
                  (v =
                    (16843009 * m) ^ (65537 * P) ^ (257 * p) ^ (16843008 * n)),
                  (l[h] = (v << 24) | (v >>> 8)),
                  (u[h] = (v << 16) | (v >>> 16)),
                  (d[h] = (v << 8) | (v >>> 24)),
                  (f[h] = v),
                  n ? ((n = p ^ e[e[e[m ^ p]]]), (r ^= e[e[r]])) : (n = r = 1);
              }
            })();
            var h = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
              p = (n.AES = t.extend({
                _doReset: function () {
                  if (!this._nRounds || this._keyPriorReset !== this._key) {
                    for (
                      var e = (this._keyPriorReset = this._key),
                        t = e.words,
                        n = e.sigBytes / 4,
                        r = 4 * ((this._nRounds = n + 6) + 1),
                        o = (this._keySchedule = []),
                        a = 0;
                      a < r;
                      a++
                    )
                      a < n
                        ? (o[a] = t[a])
                        : ((s = o[a - 1]),
                          a % n
                            ? n > 6 &&
                              a % n == 4 &&
                              (s =
                                (i[s >>> 24] << 24) |
                                (i[(s >>> 16) & 255] << 16) |
                                (i[(s >>> 8) & 255] << 8) |
                                i[255 & s])
                            : ((s =
                                (i[(s = (s << 8) | (s >>> 24)) >>> 24] << 24) |
                                (i[(s >>> 16) & 255] << 16) |
                                (i[(s >>> 8) & 255] << 8) |
                                i[255 & s]),
                              (s ^= h[(a / n) | 0] << 24)),
                          (o[a] = o[a - n] ^ s));
                    for (
                      var _ = (this._invKeySchedule = []), c = 0;
                      c < r;
                      c++
                    ) {
                      if (((a = r - c), c % 4)) var s = o[a];
                      else s = o[a - 4];
                      _[c] =
                        c < 4 || a <= 4
                          ? s
                          : l[i[s >>> 24]] ^
                            u[i[(s >>> 16) & 255]] ^
                            d[i[(s >>> 8) & 255]] ^
                            f[i[255 & s]];
                    }
                  }
                },
                encryptBlock: function (e, t) {
                  this._doCryptBlock(e, t, this._keySchedule, a, _, c, s, i);
                },
                decryptBlock: function (e, t) {
                  var n = e[t + 1];
                  (e[t + 1] = e[t + 3]),
                    (e[t + 3] = n),
                    this._doCryptBlock(
                      e,
                      t,
                      this._invKeySchedule,
                      l,
                      u,
                      d,
                      f,
                      o
                    ),
                    (n = e[t + 1]),
                    (e[t + 1] = e[t + 3]),
                    (e[t + 3] = n);
                },
                _doCryptBlock: function (e, t, n, r, i, o, a, _) {
                  for (
                    var c = this._nRounds,
                      s = e[t] ^ n[0],
                      l = e[t + 1] ^ n[1],
                      u = e[t + 2] ^ n[2],
                      d = e[t + 3] ^ n[3],
                      f = 4,
                      h = 1;
                    h < c;
                    h++
                  ) {
                    var p =
                        r[s >>> 24] ^
                        i[(l >>> 16) & 255] ^
                        o[(u >>> 8) & 255] ^
                        a[255 & d] ^
                        n[f++],
                      P =
                        r[l >>> 24] ^
                        i[(u >>> 16) & 255] ^
                        o[(d >>> 8) & 255] ^
                        a[255 & s] ^
                        n[f++],
                      m =
                        r[u >>> 24] ^
                        i[(d >>> 16) & 255] ^
                        o[(s >>> 8) & 255] ^
                        a[255 & l] ^
                        n[f++],
                      v =
                        r[d >>> 24] ^
                        i[(s >>> 16) & 255] ^
                        o[(l >>> 8) & 255] ^
                        a[255 & u] ^
                        n[f++];
                    (s = p), (l = P), (u = m), (d = v);
                  }
                  (p =
                    ((_[s >>> 24] << 24) |
                      (_[(l >>> 16) & 255] << 16) |
                      (_[(u >>> 8) & 255] << 8) |
                      _[255 & d]) ^
                    n[f++]),
                    (P =
                      ((_[l >>> 24] << 24) |
                        (_[(u >>> 16) & 255] << 16) |
                        (_[(d >>> 8) & 255] << 8) |
                        _[255 & s]) ^
                      n[f++]),
                    (m =
                      ((_[u >>> 24] << 24) |
                        (_[(d >>> 16) & 255] << 16) |
                        (_[(s >>> 8) & 255] << 8) |
                        _[255 & l]) ^
                      n[f++]),
                    (v =
                      ((_[d >>> 24] << 24) |
                        (_[(s >>> 16) & 255] << 16) |
                        (_[(l >>> 8) & 255] << 8) |
                        _[255 & u]) ^
                      n[f++]),
                    (e[t] = p),
                    (e[t + 1] = P),
                    (e[t + 2] = m),
                    (e[t + 3] = v);
                },
                keySize: 8,
              }));
            e.AES = t._createHelper(p);
          })(),
          r.AES);
      },
      109: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(888),
          void (
            r.lib.Cipher ||
            (function (e) {
              var t = r,
                n = t.lib,
                i = n.Base,
                o = n.WordArray,
                a = n.BufferedBlockAlgorithm,
                _ = t.enc,
                c = (_.Utf8, _.Base64),
                s = t.algo,
                l = s.EvpKDF,
                u = (n.Cipher = a.extend({
                  cfg: i.extend(),
                  createEncryptor: function (e, t) {
                    return this.create(this._ENC_XFORM_MODE, e, t);
                  },
                  createDecryptor: function (e, t) {
                    return this.create(this._DEC_XFORM_MODE, e, t);
                  },
                  init: function (e, t, n) {
                    (this.cfg = this.cfg.extend(n)),
                      (this._xformMode = e),
                      (this._key = t),
                      this.reset();
                  },
                  reset: function () {
                    a.reset.call(this), this._doReset();
                  },
                  process: function (e) {
                    return this._append(e), this._process();
                  },
                  finalize: function (e) {
                    e && this._append(e);
                    var t = this._doFinalize();
                    return t;
                  },
                  keySize: 4,
                  ivSize: 4,
                  _ENC_XFORM_MODE: 1,
                  _DEC_XFORM_MODE: 2,
                  _createHelper: (function () {
                    function e(e) {
                      return "string" == typeof e ? g : R;
                    }
                    return function (t) {
                      return {
                        encrypt: function (n, r, i) {
                          return e(r).encrypt(t, n, r, i);
                        },
                        decrypt: function (n, r, i) {
                          return e(r).decrypt(t, n, r, i);
                        },
                      };
                    };
                  })(),
                })),
                d =
                  ((n.StreamCipher = u.extend({
                    _doFinalize: function () {
                      var e = this._process(!0);
                      return e;
                    },
                    blockSize: 1,
                  })),
                  (t.mode = {})),
                f = (n.BlockCipherMode = i.extend({
                  createEncryptor: function (e, t) {
                    return this.Encryptor.create(e, t);
                  },
                  createDecryptor: function (e, t) {
                    return this.Decryptor.create(e, t);
                  },
                  init: function (e, t) {
                    (this._cipher = e), (this._iv = t);
                  },
                })),
                h = (d.CBC = (function () {
                  var t = f.extend();
                  function n(t, n, r) {
                    var i,
                      o = this._iv;
                    o ? ((i = o), (this._iv = e)) : (i = this._prevBlock);
                    for (var a = 0; a < r; a++) t[n + a] ^= i[a];
                  }
                  return (
                    (t.Encryptor = t.extend({
                      processBlock: function (e, t) {
                        var r = this._cipher,
                          i = r.blockSize;
                        n.call(this, e, t, i),
                          r.encryptBlock(e, t),
                          (this._prevBlock = e.slice(t, t + i));
                      },
                    })),
                    (t.Decryptor = t.extend({
                      processBlock: function (e, t) {
                        var r = this._cipher,
                          i = r.blockSize,
                          o = e.slice(t, t + i);
                        r.decryptBlock(e, t),
                          n.call(this, e, t, i),
                          (this._prevBlock = o);
                      },
                    })),
                    t
                  );
                })()),
                p = (t.pad = {}),
                P = (p.Pkcs7 = {
                  pad: function (e, t) {
                    for (
                      var n = 4 * t,
                        r = n - (e.sigBytes % n),
                        i = (r << 24) | (r << 16) | (r << 8) | r,
                        a = [],
                        _ = 0;
                      _ < r;
                      _ += 4
                    )
                      a.push(i);
                    var c = o.create(a, r);
                    e.concat(c);
                  },
                  unpad: function (e) {
                    var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
                    e.sigBytes -= t;
                  },
                }),
                m =
                  ((n.BlockCipher = u.extend({
                    cfg: u.cfg.extend({ mode: h, padding: P }),
                    reset: function () {
                      var e;
                      u.reset.call(this);
                      var t = this.cfg,
                        n = t.iv,
                        r = t.mode;
                      this._xformMode == this._ENC_XFORM_MODE
                        ? (e = r.createEncryptor)
                        : ((e = r.createDecryptor), (this._minBufferSize = 1)),
                        this._mode && this._mode.__creator == e
                          ? this._mode.init(this, n && n.words)
                          : ((this._mode = e.call(r, this, n && n.words)),
                            (this._mode.__creator = e));
                    },
                    _doProcessBlock: function (e, t) {
                      this._mode.processBlock(e, t);
                    },
                    _doFinalize: function () {
                      var e,
                        t = this.cfg.padding;
                      return (
                        this._xformMode == this._ENC_XFORM_MODE
                          ? (t.pad(this._data, this.blockSize),
                            (e = this._process(!0)))
                          : ((e = this._process(!0)), t.unpad(e)),
                        e
                      );
                    },
                    blockSize: 4,
                  })),
                  (n.CipherParams = i.extend({
                    init: function (e) {
                      this.mixIn(e);
                    },
                    toString: function (e) {
                      return (e || this.formatter).stringify(this);
                    },
                  }))),
                v = (t.format = {}),
                E = (v.OpenSSL = {
                  stringify: function (e) {
                    var t = e.ciphertext,
                      n = e.salt;
                    return (
                      n
                        ? o.create([1398893684, 1701076831]).concat(n).concat(t)
                        : t
                    ).toString(c);
                  },
                  parse: function (e) {
                    var t,
                      n = c.parse(e),
                      r = n.words;
                    return (
                      1398893684 == r[0] &&
                        1701076831 == r[1] &&
                        ((t = o.create(r.slice(2, 4))),
                        r.splice(0, 4),
                        (n.sigBytes -= 16)),
                      m.create({ ciphertext: n, salt: t })
                    );
                  },
                }),
                R = (n.SerializableCipher = i.extend({
                  cfg: i.extend({ format: E }),
                  encrypt: function (e, t, n, r) {
                    r = this.cfg.extend(r);
                    var i = e.createEncryptor(n, r),
                      o = i.finalize(t),
                      a = i.cfg;
                    return m.create({
                      ciphertext: o,
                      key: n,
                      iv: a.iv,
                      algorithm: e,
                      mode: a.mode,
                      padding: a.padding,
                      blockSize: e.blockSize,
                      formatter: r.format,
                    });
                  },
                  decrypt: function (e, t, n, r) {
                    (r = this.cfg.extend(r)), (t = this._parse(t, r.format));
                    var i = e.createDecryptor(n, r).finalize(t.ciphertext);
                    return i;
                  },
                  _parse: function (e, t) {
                    return "string" == typeof e ? t.parse(e, this) : e;
                  },
                })),
                A = (t.kdf = {}),
                T = (A.OpenSSL = {
                  execute: function (e, t, n, r) {
                    r || (r = o.random(8));
                    var i = l.create({ keySize: t + n }).compute(e, r),
                      a = o.create(i.words.slice(t), 4 * n);
                    return (
                      (i.sigBytes = 4 * t), m.create({ key: i, iv: a, salt: r })
                    );
                  },
                }),
                g = (n.PasswordBasedCipher = R.extend({
                  cfg: R.cfg.extend({ kdf: T }),
                  encrypt: function (e, t, n, r) {
                    var i = (r = this.cfg.extend(r)).kdf.execute(
                      n,
                      e.keySize,
                      e.ivSize
                    );
                    r.iv = i.iv;
                    var o = R.encrypt.call(this, e, t, i.key, r);
                    return o.mixIn(i), o;
                  },
                  decrypt: function (e, t, n, r) {
                    (r = this.cfg.extend(r)), (t = this._parse(t, r.format));
                    var i = r.kdf.execute(n, e.keySize, e.ivSize, t.salt);
                    r.iv = i.iv;
                    var o = R.decrypt.call(this, e, t, i.key, r);
                    return o;
                  },
                }));
            })()
          ));
      },
      249: function (e, t, n) {
        var r;
        e.exports =
          ((r =
            r ||
            (function (e, t) {
              var r;
              if (
                ("undefined" != typeof window &&
                  window.crypto &&
                  (r = window.crypto),
                !r &&
                  "undefined" != typeof window &&
                  window.msCrypto &&
                  (r = window.msCrypto),
                !r && void 0 !== n.g && n.g.crypto && (r = n.g.crypto),
                !r)
              )
                try {
                  r = n(
                    Object(
                      (function () {
                        var e = new Error("Cannot find module 'crypto'");
                        throw ((e.code = "MODULE_NOT_FOUND"), e);
                      })()
                    )
                  );
                } catch (e) {}
              var i = function () {
                  if (r) {
                    if ("function" == typeof r.getRandomValues)
                      try {
                        return r.getRandomValues(new Uint32Array(1))[0];
                      } catch (e) {}
                    if ("function" == typeof r.randomBytes)
                      try {
                        return r.randomBytes(4).readInt32LE();
                      } catch (e) {}
                  }
                  throw new Error(
                    "Native crypto module could not be used to get secure random number."
                  );
                },
                o =
                  Object.create ||
                  (function () {
                    function e() {}
                    return function (t) {
                      var n;
                      return (
                        (e.prototype = t),
                        (n = new e()),
                        (e.prototype = null),
                        n
                      );
                    };
                  })(),
                a = {},
                _ = (a.lib = {}),
                c = (_.Base = {
                  extend: function (e) {
                    var t = o(this);
                    return (
                      e && t.mixIn(e),
                      (t.hasOwnProperty("init") && this.init !== t.init) ||
                        (t.init = function () {
                          t.$super.init.apply(this, arguments);
                        }),
                      (t.init.prototype = t),
                      (t.$super = this),
                      t
                    );
                  },
                  create: function () {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e;
                  },
                  init: function () {},
                  mixIn: function (e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") &&
                      (this.toString = e.toString);
                  },
                  clone: function () {
                    return this.init.prototype.extend(this);
                  },
                }),
                s = (_.WordArray = c.extend({
                  init: function (e, t) {
                    (e = this.words = e || []),
                      (this.sigBytes = void 0 != t ? t : 4 * e.length);
                  },
                  toString: function (e) {
                    return (e || u).stringify(this);
                  },
                  concat: function (e) {
                    var t = this.words,
                      n = e.words,
                      r = this.sigBytes,
                      i = e.sigBytes;
                    if ((this.clamp(), r % 4))
                      for (var o = 0; o < i; o++) {
                        var a = (n[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                        t[(r + o) >>> 2] |= a << (24 - ((r + o) % 4) * 8);
                      }
                    else
                      for (var o = 0; o < i; o += 4)
                        t[(r + o) >>> 2] = n[o >>> 2];
                    return (this.sigBytes += i), this;
                  },
                  clamp: function () {
                    var t = this.words,
                      n = this.sigBytes;
                    (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                      (t.length = e.ceil(n / 4));
                  },
                  clone: function () {
                    var e = c.clone.call(this);
                    return (e.words = this.words.slice(0)), e;
                  },
                  random: function (e) {
                    for (var t = [], n = 0; n < e; n += 4) t.push(i());
                    return new s.init(t, e);
                  },
                })),
                l = (a.enc = {}),
                u = (l.Hex = {
                  stringify: function (e) {
                    for (
                      var t = e.words, n = e.sigBytes, r = [], i = 0;
                      i < n;
                      i++
                    ) {
                      var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                      r.push((o >>> 4).toString(16)),
                        r.push((15 & o).toString(16));
                    }
                    return r.join("");
                  },
                  parse: function (e) {
                    for (var t = e.length, n = [], r = 0; r < t; r += 2)
                      n[r >>> 3] |=
                        parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
                    return new s.init(n, t / 2);
                  },
                }),
                d = (l.Latin1 = {
                  stringify: function (e) {
                    for (
                      var t = e.words, n = e.sigBytes, r = [], i = 0;
                      i < n;
                      i++
                    ) {
                      var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                      r.push(String.fromCharCode(o));
                    }
                    return r.join("");
                  },
                  parse: function (e) {
                    for (var t = e.length, n = [], r = 0; r < t; r++)
                      n[r >>> 2] |=
                        (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
                    return new s.init(n, t);
                  },
                }),
                f = (l.Utf8 = {
                  stringify: function (e) {
                    try {
                      return decodeURIComponent(escape(d.stringify(e)));
                    } catch (e) {
                      throw new Error("Malformed UTF-8 data");
                    }
                  },
                  parse: function (e) {
                    return d.parse(unescape(encodeURIComponent(e)));
                  },
                }),
                h = (_.BufferedBlockAlgorithm = c.extend({
                  reset: function () {
                    (this._data = new s.init()), (this._nDataBytes = 0);
                  },
                  _append: function (e) {
                    "string" == typeof e && (e = f.parse(e)),
                      this._data.concat(e),
                      (this._nDataBytes += e.sigBytes);
                  },
                  _process: function (t) {
                    var n,
                      r = this._data,
                      i = r.words,
                      o = r.sigBytes,
                      a = this.blockSize,
                      _ = 4 * a,
                      c = o / _,
                      l =
                        (c = t
                          ? e.ceil(c)
                          : e.max((0 | c) - this._minBufferSize, 0)) * a,
                      u = e.min(4 * l, o);
                    if (l) {
                      for (var d = 0; d < l; d += a) this._doProcessBlock(i, d);
                      (n = i.splice(0, l)), (r.sigBytes -= u);
                    }
                    return new s.init(n, u);
                  },
                  clone: function () {
                    var e = c.clone.call(this);
                    return (e._data = this._data.clone()), e;
                  },
                  _minBufferSize: 0,
                })),
                p =
                  ((_.Hasher = h.extend({
                    cfg: c.extend(),
                    init: function (e) {
                      (this.cfg = this.cfg.extend(e)), this.reset();
                    },
                    reset: function () {
                      h.reset.call(this), this._doReset();
                    },
                    update: function (e) {
                      return this._append(e), this._process(), this;
                    },
                    finalize: function (e) {
                      e && this._append(e);
                      var t = this._doFinalize();
                      return t;
                    },
                    blockSize: 16,
                    _createHelper: function (e) {
                      return function (t, n) {
                        return new e.init(n).finalize(t);
                      };
                    },
                    _createHmacHelper: function (e) {
                      return function (t, n) {
                        return new p.HMAC.init(e, n).finalize(t);
                      };
                    },
                  })),
                  (a.algo = {}));
              return a;
            })(Math)),
          r);
      },
      269: function (e, t, n) {
        var r, i, o;
        e.exports =
          ((r = n(249)),
          (o = (i = r).lib.WordArray),
          (i.enc.Base64 = {
            stringify: function (e) {
              var t = e.words,
                n = e.sigBytes,
                r = this._map;
              e.clamp();
              for (var i = [], o = 0; o < n; o += 3)
                for (
                  var a =
                      (((t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
                      (((t[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) &
                        255) <<
                        8) |
                      ((t[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
                    _ = 0;
                  _ < 4 && o + 0.75 * _ < n;
                  _++
                )
                  i.push(r.charAt((a >>> (6 * (3 - _))) & 63));
              var c = r.charAt(64);
              if (c) for (; i.length % 4; ) i.push(c);
              return i.join("");
            },
            parse: function (e) {
              var t = e.length,
                n = this._map,
                r = this._reverseMap;
              if (!r) {
                r = this._reverseMap = [];
                for (var i = 0; i < n.length; i++) r[n.charCodeAt(i)] = i;
              }
              var a = n.charAt(64);
              if (a) {
                var _ = e.indexOf(a);
                -1 !== _ && (t = _);
              }
              return (function (e, t, n) {
                for (var r = [], i = 0, a = 0; a < t; a++)
                  if (a % 4) {
                    var _ = n[e.charCodeAt(a - 1)] << ((a % 4) * 2),
                      c = n[e.charCodeAt(a)] >>> (6 - (a % 4) * 2),
                      s = _ | c;
                    (r[i >>> 2] |= s << (24 - (i % 4) * 8)), i++;
                  }
                return o.create(r, i);
              })(e, t, r);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          }),
          r.enc.Base64);
      },
      298: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          (function () {
            var e = r,
              t = e.lib.WordArray,
              n = e.enc;
            function i(e) {
              return ((e << 8) & 4278255360) | ((e >>> 8) & 16711935);
            }
            (n.Utf16 = n.Utf16BE =
              {
                stringify: function (e) {
                  for (
                    var t = e.words, n = e.sigBytes, r = [], i = 0;
                    i < n;
                    i += 2
                  ) {
                    var o = (t[i >>> 2] >>> (16 - (i % 4) * 8)) & 65535;
                    r.push(String.fromCharCode(o));
                  }
                  return r.join("");
                },
                parse: function (e) {
                  for (var n = e.length, r = [], i = 0; i < n; i++)
                    r[i >>> 1] |= e.charCodeAt(i) << (16 - (i % 2) * 16);
                  return t.create(r, 2 * n);
                },
              }),
              (n.Utf16LE = {
                stringify: function (e) {
                  for (
                    var t = e.words, n = e.sigBytes, r = [], o = 0;
                    o < n;
                    o += 2
                  ) {
                    var a = i((t[o >>> 2] >>> (16 - (o % 4) * 8)) & 65535);
                    r.push(String.fromCharCode(a));
                  }
                  return r.join("");
                },
                parse: function (e) {
                  for (var n = e.length, r = [], o = 0; o < n; o++)
                    r[o >>> 1] |= i(e.charCodeAt(o) << (16 - (o % 2) * 16));
                  return t.create(r, 2 * n);
                },
              });
          })(),
          r.enc.Utf16);
      },
      888: function (e, t, n) {
        var r, i, o, a, _, c, s, l;
        e.exports =
          ((r = n(249)),
          n(783),
          n(824),
          (o = (i = r).lib),
          (a = o.Base),
          (_ = o.WordArray),
          (c = i.algo),
          (s = c.MD5),
          (l = c.EvpKDF =
            a.extend({
              cfg: a.extend({ keySize: 4, hasher: s, iterations: 1 }),
              init: function (e) {
                this.cfg = this.cfg.extend(e);
              },
              compute: function (e, t) {
                for (
                  var n,
                    r = this.cfg,
                    i = r.hasher.create(),
                    o = _.create(),
                    a = o.words,
                    c = r.keySize,
                    s = r.iterations;
                  a.length < c;

                ) {
                  n && i.update(n), (n = i.update(e).finalize(t)), i.reset();
                  for (var l = 1; l < s; l++) (n = i.finalize(n)), i.reset();
                  o.concat(n);
                }
                return (o.sigBytes = 4 * c), o;
              },
            })),
          (i.EvpKDF = function (e, t, n) {
            return l.create(n).compute(e, t);
          }),
          r.EvpKDF);
      },
      209: function (e, t, n) {
        var r, i, o, a;
        e.exports =
          ((r = n(249)),
          n(109),
          (o = (i = r).lib.CipherParams),
          (a = i.enc.Hex),
          (i.format.Hex = {
            stringify: function (e) {
              return e.ciphertext.toString(a);
            },
            parse: function (e) {
              var t = a.parse(e);
              return o.create({ ciphertext: t });
            },
          }),
          r.format.Hex);
      },
      824: function (e, t, n) {
        var r, i, o, a, _, c, s;
        e.exports =
          ((r = n(249)),
          (o = (i = r).lib),
          (a = o.Base),
          (_ = i.enc),
          (c = _.Utf8),
          (s = i.algo),
          void (s.HMAC = a.extend({
            init: function (e, t) {
              (e = this._hasher = new e.init()),
                "string" == typeof t && (t = c.parse(t));
              var n = e.blockSize,
                r = 4 * n;
              t.sigBytes > r && (t = e.finalize(t)), t.clamp();
              for (
                var i = (this._oKey = t.clone()),
                  o = (this._iKey = t.clone()),
                  a = i.words,
                  _ = o.words,
                  s = 0;
                s < n;
                s++
              )
                (a[s] ^= 1549556828), (_[s] ^= 909522486);
              (i.sigBytes = o.sigBytes = r), this.reset();
            },
            reset: function () {
              var e = this._hasher;
              e.reset(), e.update(this._iKey);
            },
            update: function (e) {
              return this._hasher.update(e), this;
            },
            finalize: function (e) {
              var t = this._hasher,
                n = t.finalize(e);
              t.reset();
              var r = t.finalize(this._oKey.clone().concat(n));
              return r;
            },
          })));
      },
      354: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(938),
          n(433),
          n(298),
          n(269),
          n(214),
          n(783),
          n(153),
          n(792),
          n(34),
          n(460),
          n(327),
          n(706),
          n(824),
          n(112),
          n(888),
          n(109),
          n(568),
          n(242),
          n(968),
          n(660),
          n(148),
          n(615),
          n(807),
          n(77),
          n(475),
          n(991),
          n(209),
          n(452),
          n(253),
          n(857),
          n(454),
          n(974),
          r);
      },
      433: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          (function () {
            if ("function" == typeof ArrayBuffer) {
              var e = r.lib.WordArray,
                t = e.init;
              (e.init = function (e) {
                if (
                  (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
                  (e instanceof Int8Array ||
                    ("undefined" != typeof Uint8ClampedArray &&
                      e instanceof Uint8ClampedArray) ||
                    e instanceof Int16Array ||
                    e instanceof Uint16Array ||
                    e instanceof Int32Array ||
                    e instanceof Uint32Array ||
                    e instanceof Float32Array ||
                    e instanceof Float64Array) &&
                    (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)),
                  e instanceof Uint8Array)
                ) {
                  for (var n = e.byteLength, r = [], i = 0; i < n; i++)
                    r[i >>> 2] |= e[i] << (24 - (i % 4) * 8);
                  t.call(this, r, n);
                } else t.apply(this, arguments);
              }).prototype = e;
            }
          })(),
          r.lib.WordArray);
      },
      214: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          (function (e) {
            var t = r,
              n = t.lib,
              i = n.WordArray,
              o = n.Hasher,
              a = t.algo,
              _ = [];
            !(function () {
              for (var t = 0; t < 64; t++)
                _[t] = (4294967296 * e.abs(e.sin(t + 1))) | 0;
            })();
            var c = (a.MD5 = o.extend({
              _doReset: function () {
                this._hash = new i.init([
                  1732584193, 4023233417, 2562383102, 271733878,
                ]);
              },
              _doProcessBlock: function (e, t) {
                for (var n = 0; n < 16; n++) {
                  var r = t + n,
                    i = e[r];
                  e[r] =
                    (16711935 & ((i << 8) | (i >>> 24))) |
                    (4278255360 & ((i << 24) | (i >>> 8)));
                }
                var o = this._hash.words,
                  a = e[t + 0],
                  c = e[t + 1],
                  f = e[t + 2],
                  h = e[t + 3],
                  p = e[t + 4],
                  P = e[t + 5],
                  m = e[t + 6],
                  v = e[t + 7],
                  E = e[t + 8],
                  R = e[t + 9],
                  A = e[t + 10],
                  T = e[t + 11],
                  g = e[t + 12],
                  O = e[t + 13],
                  y = e[t + 14],
                  C = e[t + 15],
                  M = o[0],
                  S = o[1],
                  I = o[2],
                  w = o[3];
                (S = d(
                  (S = d(
                    (S = d(
                      (S = d(
                        (S = u(
                          (S = u(
                            (S = u(
                              (S = u(
                                (S = l(
                                  (S = l(
                                    (S = l(
                                      (S = l(
                                        (S = s(
                                          (S = s(
                                            (S = s(
                                              (S = s(
                                                S,
                                                (I = s(
                                                  I,
                                                  (w = s(
                                                    w,
                                                    (M = s(
                                                      M,
                                                      S,
                                                      I,
                                                      w,
                                                      a,
                                                      7,
                                                      _[0]
                                                    )),
                                                    S,
                                                    I,
                                                    c,
                                                    12,
                                                    _[1]
                                                  )),
                                                  M,
                                                  S,
                                                  f,
                                                  17,
                                                  _[2]
                                                )),
                                                w,
                                                M,
                                                h,
                                                22,
                                                _[3]
                                              )),
                                              (I = s(
                                                I,
                                                (w = s(
                                                  w,
                                                  (M = s(
                                                    M,
                                                    S,
                                                    I,
                                                    w,
                                                    p,
                                                    7,
                                                    _[4]
                                                  )),
                                                  S,
                                                  I,
                                                  P,
                                                  12,
                                                  _[5]
                                                )),
                                                M,
                                                S,
                                                m,
                                                17,
                                                _[6]
                                              )),
                                              w,
                                              M,
                                              v,
                                              22,
                                              _[7]
                                            )),
                                            (I = s(
                                              I,
                                              (w = s(
                                                w,
                                                (M = s(M, S, I, w, E, 7, _[8])),
                                                S,
                                                I,
                                                R,
                                                12,
                                                _[9]
                                              )),
                                              M,
                                              S,
                                              A,
                                              17,
                                              _[10]
                                            )),
                                            w,
                                            M,
                                            T,
                                            22,
                                            _[11]
                                          )),
                                          (I = s(
                                            I,
                                            (w = s(
                                              w,
                                              (M = s(M, S, I, w, g, 7, _[12])),
                                              S,
                                              I,
                                              O,
                                              12,
                                              _[13]
                                            )),
                                            M,
                                            S,
                                            y,
                                            17,
                                            _[14]
                                          )),
                                          w,
                                          M,
                                          C,
                                          22,
                                          _[15]
                                        )),
                                        (I = l(
                                          I,
                                          (w = l(
                                            w,
                                            (M = l(M, S, I, w, c, 5, _[16])),
                                            S,
                                            I,
                                            m,
                                            9,
                                            _[17]
                                          )),
                                          M,
                                          S,
                                          T,
                                          14,
                                          _[18]
                                        )),
                                        w,
                                        M,
                                        a,
                                        20,
                                        _[19]
                                      )),
                                      (I = l(
                                        I,
                                        (w = l(
                                          w,
                                          (M = l(M, S, I, w, P, 5, _[20])),
                                          S,
                                          I,
                                          A,
                                          9,
                                          _[21]
                                        )),
                                        M,
                                        S,
                                        C,
                                        14,
                                        _[22]
                                      )),
                                      w,
                                      M,
                                      p,
                                      20,
                                      _[23]
                                    )),
                                    (I = l(
                                      I,
                                      (w = l(
                                        w,
                                        (M = l(M, S, I, w, R, 5, _[24])),
                                        S,
                                        I,
                                        y,
                                        9,
                                        _[25]
                                      )),
                                      M,
                                      S,
                                      h,
                                      14,
                                      _[26]
                                    )),
                                    w,
                                    M,
                                    E,
                                    20,
                                    _[27]
                                  )),
                                  (I = l(
                                    I,
                                    (w = l(
                                      w,
                                      (M = l(M, S, I, w, O, 5, _[28])),
                                      S,
                                      I,
                                      f,
                                      9,
                                      _[29]
                                    )),
                                    M,
                                    S,
                                    v,
                                    14,
                                    _[30]
                                  )),
                                  w,
                                  M,
                                  g,
                                  20,
                                  _[31]
                                )),
                                (I = u(
                                  I,
                                  (w = u(
                                    w,
                                    (M = u(M, S, I, w, P, 4, _[32])),
                                    S,
                                    I,
                                    E,
                                    11,
                                    _[33]
                                  )),
                                  M,
                                  S,
                                  T,
                                  16,
                                  _[34]
                                )),
                                w,
                                M,
                                y,
                                23,
                                _[35]
                              )),
                              (I = u(
                                I,
                                (w = u(
                                  w,
                                  (M = u(M, S, I, w, c, 4, _[36])),
                                  S,
                                  I,
                                  p,
                                  11,
                                  _[37]
                                )),
                                M,
                                S,
                                v,
                                16,
                                _[38]
                              )),
                              w,
                              M,
                              A,
                              23,
                              _[39]
                            )),
                            (I = u(
                              I,
                              (w = u(
                                w,
                                (M = u(M, S, I, w, O, 4, _[40])),
                                S,
                                I,
                                a,
                                11,
                                _[41]
                              )),
                              M,
                              S,
                              h,
                              16,
                              _[42]
                            )),
                            w,
                            M,
                            m,
                            23,
                            _[43]
                          )),
                          (I = u(
                            I,
                            (w = u(
                              w,
                              (M = u(M, S, I, w, R, 4, _[44])),
                              S,
                              I,
                              g,
                              11,
                              _[45]
                            )),
                            M,
                            S,
                            C,
                            16,
                            _[46]
                          )),
                          w,
                          M,
                          f,
                          23,
                          _[47]
                        )),
                        (I = d(
                          I,
                          (w = d(
                            w,
                            (M = d(M, S, I, w, a, 6, _[48])),
                            S,
                            I,
                            v,
                            10,
                            _[49]
                          )),
                          M,
                          S,
                          y,
                          15,
                          _[50]
                        )),
                        w,
                        M,
                        P,
                        21,
                        _[51]
                      )),
                      (I = d(
                        I,
                        (w = d(
                          w,
                          (M = d(M, S, I, w, g, 6, _[52])),
                          S,
                          I,
                          h,
                          10,
                          _[53]
                        )),
                        M,
                        S,
                        A,
                        15,
                        _[54]
                      )),
                      w,
                      M,
                      c,
                      21,
                      _[55]
                    )),
                    (I = d(
                      I,
                      (w = d(
                        w,
                        (M = d(M, S, I, w, E, 6, _[56])),
                        S,
                        I,
                        C,
                        10,
                        _[57]
                      )),
                      M,
                      S,
                      m,
                      15,
                      _[58]
                    )),
                    w,
                    M,
                    O,
                    21,
                    _[59]
                  )),
                  (I = d(
                    I,
                    (w = d(
                      w,
                      (M = d(M, S, I, w, p, 6, _[60])),
                      S,
                      I,
                      T,
                      10,
                      _[61]
                    )),
                    M,
                    S,
                    f,
                    15,
                    _[62]
                  )),
                  w,
                  M,
                  R,
                  21,
                  _[63]
                )),
                  (o[0] = (o[0] + M) | 0),
                  (o[1] = (o[1] + S) | 0),
                  (o[2] = (o[2] + I) | 0),
                  (o[3] = (o[3] + w) | 0);
              },
              _doFinalize: function () {
                var t = this._data,
                  n = t.words,
                  r = 8 * this._nDataBytes,
                  i = 8 * t.sigBytes;
                n[i >>> 5] |= 128 << (24 - (i % 32));
                var o = e.floor(r / 4294967296),
                  a = r;
                (n[15 + (((i + 64) >>> 9) << 4)] =
                  (16711935 & ((o << 8) | (o >>> 24))) |
                  (4278255360 & ((o << 24) | (o >>> 8)))),
                  (n[14 + (((i + 64) >>> 9) << 4)] =
                    (16711935 & ((a << 8) | (a >>> 24))) |
                    (4278255360 & ((a << 24) | (a >>> 8)))),
                  (t.sigBytes = 4 * (n.length + 1)),
                  this._process();
                for (var _ = this._hash, c = _.words, s = 0; s < 4; s++) {
                  var l = c[s];
                  c[s] =
                    (16711935 & ((l << 8) | (l >>> 24))) |
                    (4278255360 & ((l << 24) | (l >>> 8)));
                }
                return _;
              },
              clone: function () {
                var e = o.clone.call(this);
                return (e._hash = this._hash.clone()), e;
              },
            }));
            function s(e, t, n, r, i, o, a) {
              var _ = e + ((t & n) | (~t & r)) + i + a;
              return ((_ << o) | (_ >>> (32 - o))) + t;
            }
            function l(e, t, n, r, i, o, a) {
              var _ = e + ((t & r) | (n & ~r)) + i + a;
              return ((_ << o) | (_ >>> (32 - o))) + t;
            }
            function u(e, t, n, r, i, o, a) {
              var _ = e + (t ^ n ^ r) + i + a;
              return ((_ << o) | (_ >>> (32 - o))) + t;
            }
            function d(e, t, n, r, i, o, a) {
              var _ = e + (n ^ (t | ~r)) + i + a;
              return ((_ << o) | (_ >>> (32 - o))) + t;
            }
            (t.MD5 = o._createHelper(c)), (t.HmacMD5 = o._createHmacHelper(c));
          })(Math),
          r.MD5);
      },
      568: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.mode.CFB = (function () {
            var e = r.lib.BlockCipherMode.extend();
            function t(e, t, n, r) {
              var i,
                o = this._iv;
              o
                ? ((i = o.slice(0)), (this._iv = void 0))
                : (i = this._prevBlock),
                r.encryptBlock(i, 0);
              for (var a = 0; a < n; a++) e[t + a] ^= i[a];
            }
            return (
              (e.Encryptor = e.extend({
                processBlock: function (e, n) {
                  var r = this._cipher,
                    i = r.blockSize;
                  t.call(this, e, n, i, r),
                    (this._prevBlock = e.slice(n, n + i));
                },
              })),
              (e.Decryptor = e.extend({
                processBlock: function (e, n) {
                  var r = this._cipher,
                    i = r.blockSize,
                    o = e.slice(n, n + i);
                  t.call(this, e, n, i, r), (this._prevBlock = o);
                },
              })),
              e
            );
          })()),
          r.mode.CFB);
      },
      968: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(109),
          /** @preserve
           * Counter block mode compatible with  Dr Brian Gladman fileenc.c
           * derived from CryptoJS.mode.CTR
           * Jan Hruby jhruby.web@gmail.com
           */
          (r.mode.CTRGladman = (function () {
            var e = r.lib.BlockCipherMode.extend();
            function t(e) {
              if (255 == ((e >> 24) & 255)) {
                var t = (e >> 16) & 255,
                  n = (e >> 8) & 255,
                  r = 255 & e;
                255 === t
                  ? ((t = 0),
                    255 === n ? ((n = 0), 255 === r ? (r = 0) : ++r) : ++n)
                  : ++t,
                  (e = 0),
                  (e += t << 16),
                  (e += n << 8),
                  (e += r);
              } else e += 1 << 24;
              return e;
            }
            var n = (e.Encryptor = e.extend({
              processBlock: function (e, n) {
                var r = this._cipher,
                  i = r.blockSize,
                  o = this._iv,
                  a = this._counter;
                o && ((a = this._counter = o.slice(0)), (this._iv = void 0)),
                  (function (e) {
                    0 === (e[0] = t(e[0])) && (e[1] = t(e[1]));
                  })(a);
                var _ = a.slice(0);
                r.encryptBlock(_, 0);
                for (var c = 0; c < i; c++) e[n + c] ^= _[c];
              },
            }));
            return (e.Decryptor = n), e;
          })()),
          r.mode.CTRGladman);
      },
      242: function (e, t, n) {
        var r, i, o;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.mode.CTR =
            ((i = r.lib.BlockCipherMode.extend()),
            (o = i.Encryptor =
              i.extend({
                processBlock: function (e, t) {
                  var n = this._cipher,
                    r = n.blockSize,
                    i = this._iv,
                    o = this._counter;
                  i && ((o = this._counter = i.slice(0)), (this._iv = void 0));
                  var a = o.slice(0);
                  n.encryptBlock(a, 0), (o[r - 1] = (o[r - 1] + 1) | 0);
                  for (var _ = 0; _ < r; _++) e[t + _] ^= a[_];
                },
              })),
            (i.Decryptor = o),
            i)),
          r.mode.CTR);
      },
      148: function (e, t, n) {
        var r, i;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.mode.ECB =
            (((i = r.lib.BlockCipherMode.extend()).Encryptor = i.extend({
              processBlock: function (e, t) {
                this._cipher.encryptBlock(e, t);
              },
            })),
            (i.Decryptor = i.extend({
              processBlock: function (e, t) {
                this._cipher.decryptBlock(e, t);
              },
            })),
            i)),
          r.mode.ECB);
      },
      660: function (e, t, n) {
        var r, i, o;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.mode.OFB =
            ((i = r.lib.BlockCipherMode.extend()),
            (o = i.Encryptor =
              i.extend({
                processBlock: function (e, t) {
                  var n = this._cipher,
                    r = n.blockSize,
                    i = this._iv,
                    o = this._keystream;
                  i &&
                    ((o = this._keystream = i.slice(0)), (this._iv = void 0)),
                    n.encryptBlock(o, 0);
                  for (var a = 0; a < r; a++) e[t + a] ^= o[a];
                },
              })),
            (i.Decryptor = o),
            i)),
          r.mode.OFB);
      },
      615: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.pad.AnsiX923 = {
            pad: function (e, t) {
              var n = e.sigBytes,
                r = 4 * t,
                i = r - (n % r),
                o = n + i - 1;
              e.clamp(),
                (e.words[o >>> 2] |= i << (24 - (o % 4) * 8)),
                (e.sigBytes += i);
            },
            unpad: function (e) {
              var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
              e.sigBytes -= t;
            },
          }),
          r.pad.Ansix923);
      },
      807: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.pad.Iso10126 = {
            pad: function (e, t) {
              var n = 4 * t,
                i = n - (e.sigBytes % n);
              e.concat(r.lib.WordArray.random(i - 1)).concat(
                r.lib.WordArray.create([i << 24], 1)
              );
            },
            unpad: function (e) {
              var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
              e.sigBytes -= t;
            },
          }),
          r.pad.Iso10126);
      },
      77: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.pad.Iso97971 = {
            pad: function (e, t) {
              e.concat(r.lib.WordArray.create([2147483648], 1)),
                r.pad.ZeroPadding.pad(e, t);
            },
            unpad: function (e) {
              r.pad.ZeroPadding.unpad(e), e.sigBytes--;
            },
          }),
          r.pad.Iso97971);
      },
      991: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.pad.NoPadding = { pad: function () {}, unpad: function () {} }),
          r.pad.NoPadding);
      },
      475: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(109),
          (r.pad.ZeroPadding = {
            pad: function (e, t) {
              var n = 4 * t;
              e.clamp(), (e.sigBytes += n - (e.sigBytes % n || n));
            },
            unpad: function (e) {
              var t = e.words,
                n = e.sigBytes - 1;
              for (n = e.sigBytes - 1; n >= 0; n--)
                if ((t[n >>> 2] >>> (24 - (n % 4) * 8)) & 255) {
                  e.sigBytes = n + 1;
                  break;
                }
            },
          }),
          r.pad.ZeroPadding);
      },
      112: function (e, t, n) {
        var r, i, o, a, _, c, s, l, u;
        e.exports =
          ((r = n(249)),
          n(783),
          n(824),
          (o = (i = r).lib),
          (a = o.Base),
          (_ = o.WordArray),
          (c = i.algo),
          (s = c.SHA1),
          (l = c.HMAC),
          (u = c.PBKDF2 =
            a.extend({
              cfg: a.extend({ keySize: 4, hasher: s, iterations: 1 }),
              init: function (e) {
                this.cfg = this.cfg.extend(e);
              },
              compute: function (e, t) {
                for (
                  var n = this.cfg,
                    r = l.create(n.hasher, e),
                    i = _.create(),
                    o = _.create([1]),
                    a = i.words,
                    c = o.words,
                    s = n.keySize,
                    u = n.iterations;
                  a.length < s;

                ) {
                  var d = r.update(t).finalize(o);
                  r.reset();
                  for (
                    var f = d.words, h = f.length, p = d, P = 1;
                    P < u;
                    P++
                  ) {
                    (p = r.finalize(p)), r.reset();
                    for (var m = p.words, v = 0; v < h; v++) f[v] ^= m[v];
                  }
                  i.concat(d), c[0]++;
                }
                return (i.sigBytes = 4 * s), i;
              },
            })),
          (i.PBKDF2 = function (e, t, n) {
            return u.create(n).compute(e, t);
          }),
          r.PBKDF2);
      },
      974: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(269),
          n(214),
          n(888),
          n(109),
          (function () {
            var e = r,
              t = e.lib.StreamCipher,
              n = [],
              i = [],
              o = [],
              a = (e.algo.RabbitLegacy = t.extend({
                _doReset: function () {
                  var e = this._key.words,
                    t = this.cfg.iv,
                    n = (this._X = [
                      e[0],
                      (e[3] << 16) | (e[2] >>> 16),
                      e[1],
                      (e[0] << 16) | (e[3] >>> 16),
                      e[2],
                      (e[1] << 16) | (e[0] >>> 16),
                      e[3],
                      (e[2] << 16) | (e[1] >>> 16),
                    ]),
                    r = (this._C = [
                      (e[2] << 16) | (e[2] >>> 16),
                      (4294901760 & e[0]) | (65535 & e[1]),
                      (e[3] << 16) | (e[3] >>> 16),
                      (4294901760 & e[1]) | (65535 & e[2]),
                      (e[0] << 16) | (e[0] >>> 16),
                      (4294901760 & e[2]) | (65535 & e[3]),
                      (e[1] << 16) | (e[1] >>> 16),
                      (4294901760 & e[3]) | (65535 & e[0]),
                    ]);
                  this._b = 0;
                  for (var i = 0; i < 4; i++) _.call(this);
                  for (i = 0; i < 8; i++) r[i] ^= n[(i + 4) & 7];
                  if (t) {
                    var o = t.words,
                      a = o[0],
                      c = o[1],
                      s =
                        (16711935 & ((a << 8) | (a >>> 24))) |
                        (4278255360 & ((a << 24) | (a >>> 8))),
                      l =
                        (16711935 & ((c << 8) | (c >>> 24))) |
                        (4278255360 & ((c << 24) | (c >>> 8))),
                      u = (s >>> 16) | (4294901760 & l),
                      d = (l << 16) | (65535 & s);
                    for (
                      r[0] ^= s,
                        r[1] ^= u,
                        r[2] ^= l,
                        r[3] ^= d,
                        r[4] ^= s,
                        r[5] ^= u,
                        r[6] ^= l,
                        r[7] ^= d,
                        i = 0;
                      i < 4;
                      i++
                    )
                      _.call(this);
                  }
                },
                _doProcessBlock: function (e, t) {
                  var r = this._X;
                  _.call(this),
                    (n[0] = r[0] ^ (r[5] >>> 16) ^ (r[3] << 16)),
                    (n[1] = r[2] ^ (r[7] >>> 16) ^ (r[5] << 16)),
                    (n[2] = r[4] ^ (r[1] >>> 16) ^ (r[7] << 16)),
                    (n[3] = r[6] ^ (r[3] >>> 16) ^ (r[1] << 16));
                  for (var i = 0; i < 4; i++)
                    (n[i] =
                      (16711935 & ((n[i] << 8) | (n[i] >>> 24))) |
                      (4278255360 & ((n[i] << 24) | (n[i] >>> 8)))),
                      (e[t + i] ^= n[i]);
                },
                blockSize: 4,
                ivSize: 2,
              }));
            function _() {
              for (var e = this._X, t = this._C, n = 0; n < 8; n++) i[n] = t[n];
              for (
                t[0] = (t[0] + 1295307597 + this._b) | 0,
                  t[1] =
                    (t[1] + 3545052371 + (t[0] >>> 0 < i[0] >>> 0 ? 1 : 0)) | 0,
                  t[2] =
                    (t[2] + 886263092 + (t[1] >>> 0 < i[1] >>> 0 ? 1 : 0)) | 0,
                  t[3] =
                    (t[3] + 1295307597 + (t[2] >>> 0 < i[2] >>> 0 ? 1 : 0)) | 0,
                  t[4] =
                    (t[4] + 3545052371 + (t[3] >>> 0 < i[3] >>> 0 ? 1 : 0)) | 0,
                  t[5] =
                    (t[5] + 886263092 + (t[4] >>> 0 < i[4] >>> 0 ? 1 : 0)) | 0,
                  t[6] =
                    (t[6] + 1295307597 + (t[5] >>> 0 < i[5] >>> 0 ? 1 : 0)) | 0,
                  t[7] =
                    (t[7] + 3545052371 + (t[6] >>> 0 < i[6] >>> 0 ? 1 : 0)) | 0,
                  this._b = t[7] >>> 0 < i[7] >>> 0 ? 1 : 0,
                  n = 0;
                n < 8;
                n++
              ) {
                var r = e[n] + t[n],
                  a = 65535 & r,
                  _ = r >>> 16,
                  c = ((((a * a) >>> 17) + a * _) >>> 15) + _ * _,
                  s = (((4294901760 & r) * r) | 0) + (((65535 & r) * r) | 0);
                o[n] = c ^ s;
              }
              (e[0] =
                (o[0] +
                  ((o[7] << 16) | (o[7] >>> 16)) +
                  ((o[6] << 16) | (o[6] >>> 16))) |
                0),
                (e[1] = (o[1] + ((o[0] << 8) | (o[0] >>> 24)) + o[7]) | 0),
                (e[2] =
                  (o[2] +
                    ((o[1] << 16) | (o[1] >>> 16)) +
                    ((o[0] << 16) | (o[0] >>> 16))) |
                  0),
                (e[3] = (o[3] + ((o[2] << 8) | (o[2] >>> 24)) + o[1]) | 0),
                (e[4] =
                  (o[4] +
                    ((o[3] << 16) | (o[3] >>> 16)) +
                    ((o[2] << 16) | (o[2] >>> 16))) |
                  0),
                (e[5] = (o[5] + ((o[4] << 8) | (o[4] >>> 24)) + o[3]) | 0),
                (e[6] =
                  (o[6] +
                    ((o[5] << 16) | (o[5] >>> 16)) +
                    ((o[4] << 16) | (o[4] >>> 16))) |
                  0),
                (e[7] = (o[7] + ((o[6] << 8) | (o[6] >>> 24)) + o[5]) | 0);
            }
            e.RabbitLegacy = t._createHelper(a);
          })(),
          r.RabbitLegacy);
      },
      454: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(269),
          n(214),
          n(888),
          n(109),
          (function () {
            var e = r,
              t = e.lib.StreamCipher,
              n = [],
              i = [],
              o = [],
              a = (e.algo.Rabbit = t.extend({
                _doReset: function () {
                  for (
                    var e = this._key.words, t = this.cfg.iv, n = 0;
                    n < 4;
                    n++
                  )
                    e[n] =
                      (16711935 & ((e[n] << 8) | (e[n] >>> 24))) |
                      (4278255360 & ((e[n] << 24) | (e[n] >>> 8)));
                  var r = (this._X = [
                      e[0],
                      (e[3] << 16) | (e[2] >>> 16),
                      e[1],
                      (e[0] << 16) | (e[3] >>> 16),
                      e[2],
                      (e[1] << 16) | (e[0] >>> 16),
                      e[3],
                      (e[2] << 16) | (e[1] >>> 16),
                    ]),
                    i = (this._C = [
                      (e[2] << 16) | (e[2] >>> 16),
                      (4294901760 & e[0]) | (65535 & e[1]),
                      (e[3] << 16) | (e[3] >>> 16),
                      (4294901760 & e[1]) | (65535 & e[2]),
                      (e[0] << 16) | (e[0] >>> 16),
                      (4294901760 & e[2]) | (65535 & e[3]),
                      (e[1] << 16) | (e[1] >>> 16),
                      (4294901760 & e[3]) | (65535 & e[0]),
                    ]);
                  for (this._b = 0, n = 0; n < 4; n++) _.call(this);
                  for (n = 0; n < 8; n++) i[n] ^= r[(n + 4) & 7];
                  if (t) {
                    var o = t.words,
                      a = o[0],
                      c = o[1],
                      s =
                        (16711935 & ((a << 8) | (a >>> 24))) |
                        (4278255360 & ((a << 24) | (a >>> 8))),
                      l =
                        (16711935 & ((c << 8) | (c >>> 24))) |
                        (4278255360 & ((c << 24) | (c >>> 8))),
                      u = (s >>> 16) | (4294901760 & l),
                      d = (l << 16) | (65535 & s);
                    for (
                      i[0] ^= s,
                        i[1] ^= u,
                        i[2] ^= l,
                        i[3] ^= d,
                        i[4] ^= s,
                        i[5] ^= u,
                        i[6] ^= l,
                        i[7] ^= d,
                        n = 0;
                      n < 4;
                      n++
                    )
                      _.call(this);
                  }
                },
                _doProcessBlock: function (e, t) {
                  var r = this._X;
                  _.call(this),
                    (n[0] = r[0] ^ (r[5] >>> 16) ^ (r[3] << 16)),
                    (n[1] = r[2] ^ (r[7] >>> 16) ^ (r[5] << 16)),
                    (n[2] = r[4] ^ (r[1] >>> 16) ^ (r[7] << 16)),
                    (n[3] = r[6] ^ (r[3] >>> 16) ^ (r[1] << 16));
                  for (var i = 0; i < 4; i++)
                    (n[i] =
                      (16711935 & ((n[i] << 8) | (n[i] >>> 24))) |
                      (4278255360 & ((n[i] << 24) | (n[i] >>> 8)))),
                      (e[t + i] ^= n[i]);
                },
                blockSize: 4,
                ivSize: 2,
              }));
            function _() {
              for (var e = this._X, t = this._C, n = 0; n < 8; n++) i[n] = t[n];
              for (
                t[0] = (t[0] + 1295307597 + this._b) | 0,
                  t[1] =
                    (t[1] + 3545052371 + (t[0] >>> 0 < i[0] >>> 0 ? 1 : 0)) | 0,
                  t[2] =
                    (t[2] + 886263092 + (t[1] >>> 0 < i[1] >>> 0 ? 1 : 0)) | 0,
                  t[3] =
                    (t[3] + 1295307597 + (t[2] >>> 0 < i[2] >>> 0 ? 1 : 0)) | 0,
                  t[4] =
                    (t[4] + 3545052371 + (t[3] >>> 0 < i[3] >>> 0 ? 1 : 0)) | 0,
                  t[5] =
                    (t[5] + 886263092 + (t[4] >>> 0 < i[4] >>> 0 ? 1 : 0)) | 0,
                  t[6] =
                    (t[6] + 1295307597 + (t[5] >>> 0 < i[5] >>> 0 ? 1 : 0)) | 0,
                  t[7] =
                    (t[7] + 3545052371 + (t[6] >>> 0 < i[6] >>> 0 ? 1 : 0)) | 0,
                  this._b = t[7] >>> 0 < i[7] >>> 0 ? 1 : 0,
                  n = 0;
                n < 8;
                n++
              ) {
                var r = e[n] + t[n],
                  a = 65535 & r,
                  _ = r >>> 16,
                  c = ((((a * a) >>> 17) + a * _) >>> 15) + _ * _,
                  s = (((4294901760 & r) * r) | 0) + (((65535 & r) * r) | 0);
                o[n] = c ^ s;
              }
              (e[0] =
                (o[0] +
                  ((o[7] << 16) | (o[7] >>> 16)) +
                  ((o[6] << 16) | (o[6] >>> 16))) |
                0),
                (e[1] = (o[1] + ((o[0] << 8) | (o[0] >>> 24)) + o[7]) | 0),
                (e[2] =
                  (o[2] +
                    ((o[1] << 16) | (o[1] >>> 16)) +
                    ((o[0] << 16) | (o[0] >>> 16))) |
                  0),
                (e[3] = (o[3] + ((o[2] << 8) | (o[2] >>> 24)) + o[1]) | 0),
                (e[4] =
                  (o[4] +
                    ((o[3] << 16) | (o[3] >>> 16)) +
                    ((o[2] << 16) | (o[2] >>> 16))) |
                  0),
                (e[5] = (o[5] + ((o[4] << 8) | (o[4] >>> 24)) + o[3]) | 0),
                (e[6] =
                  (o[6] +
                    ((o[5] << 16) | (o[5] >>> 16)) +
                    ((o[4] << 16) | (o[4] >>> 16))) |
                  0),
                (e[7] = (o[7] + ((o[6] << 8) | (o[6] >>> 24)) + o[5]) | 0);
            }
            e.Rabbit = t._createHelper(a);
          })(),
          r.Rabbit);
      },
      857: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(269),
          n(214),
          n(888),
          n(109),
          (function () {
            var e = r,
              t = e.lib.StreamCipher,
              n = e.algo,
              i = (n.RC4 = t.extend({
                _doReset: function () {
                  for (
                    var e = this._key,
                      t = e.words,
                      n = e.sigBytes,
                      r = (this._S = []),
                      i = 0;
                    i < 256;
                    i++
                  )
                    r[i] = i;
                  i = 0;
                  for (var o = 0; i < 256; i++) {
                    var a = i % n,
                      _ = (t[a >>> 2] >>> (24 - (a % 4) * 8)) & 255;
                    o = (o + r[i] + _) % 256;
                    var c = r[i];
                    (r[i] = r[o]), (r[o] = c);
                  }
                  this._i = this._j = 0;
                },
                _doProcessBlock: function (e, t) {
                  e[t] ^= o.call(this);
                },
                keySize: 8,
                ivSize: 0,
              }));
            function o() {
              for (
                var e = this._S, t = this._i, n = this._j, r = 0, i = 0;
                i < 4;
                i++
              ) {
                n = (n + e[(t = (t + 1) % 256)]) % 256;
                var o = e[t];
                (e[t] = e[n]),
                  (e[n] = o),
                  (r |= e[(e[t] + e[n]) % 256] << (24 - 8 * i));
              }
              return (this._i = t), (this._j = n), r;
            }
            e.RC4 = t._createHelper(i);
            var a = (n.RC4Drop = i.extend({
              cfg: i.cfg.extend({ drop: 192 }),
              _doReset: function () {
                i._doReset.call(this);
                for (var e = this.cfg.drop; e > 0; e--) o.call(this);
              },
            }));
            e.RC4Drop = t._createHelper(a);
          })(),
          r.RC4);
      },
      706: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          /** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
          (function (e) {
            var t = r,
              n = t.lib,
              i = n.WordArray,
              o = n.Hasher,
              a = t.algo,
              _ = i.create([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13,
                1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15,
                8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13,
                3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8,
                11, 6, 15, 13,
              ]),
              c = i.create([
                5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3,
                7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14,
                6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5,
                12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13,
                14, 0, 3, 9, 11,
              ]),
              s = i.create([
                11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8,
                13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14,
                9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9,
                8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12,
                13, 14, 11, 8, 5, 6,
              ]),
              l = i.create([
                8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13,
                15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11,
                8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14,
                6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8,
                13, 6, 5, 15, 13, 11, 11,
              ]),
              u = i.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
              d = i.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
              f = (a.RIPEMD160 = o.extend({
                _doReset: function () {
                  this._hash = i.create([
                    1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                  ]);
                },
                _doProcessBlock: function (e, t) {
                  for (var n = 0; n < 16; n++) {
                    var r = t + n,
                      i = e[r];
                    e[r] =
                      (16711935 & ((i << 8) | (i >>> 24))) |
                      (4278255360 & ((i << 24) | (i >>> 8)));
                  }
                  var o,
                    a,
                    f,
                    R,
                    A,
                    T,
                    g,
                    O,
                    y,
                    C,
                    M,
                    S = this._hash.words,
                    I = u.words,
                    w = d.words,
                    D = _.words,
                    x = c.words,
                    N = s.words,
                    k = l.words;
                  for (
                    T = o = S[0],
                      g = a = S[1],
                      O = f = S[2],
                      y = R = S[3],
                      C = A = S[4],
                      n = 0;
                    n < 80;
                    n += 1
                  )
                    (M = (o + e[t + D[n]]) | 0),
                      (M +=
                        n < 16
                          ? h(a, f, R) + I[0]
                          : n < 32
                          ? p(a, f, R) + I[1]
                          : n < 48
                          ? P(a, f, R) + I[2]
                          : n < 64
                          ? m(a, f, R) + I[3]
                          : v(a, f, R) + I[4]),
                      (M = ((M = E((M |= 0), N[n])) + A) | 0),
                      (o = A),
                      (A = R),
                      (R = E(f, 10)),
                      (f = a),
                      (a = M),
                      (M = (T + e[t + x[n]]) | 0),
                      (M +=
                        n < 16
                          ? v(g, O, y) + w[0]
                          : n < 32
                          ? m(g, O, y) + w[1]
                          : n < 48
                          ? P(g, O, y) + w[2]
                          : n < 64
                          ? p(g, O, y) + w[3]
                          : h(g, O, y) + w[4]),
                      (M = ((M = E((M |= 0), k[n])) + C) | 0),
                      (T = C),
                      (C = y),
                      (y = E(O, 10)),
                      (O = g),
                      (g = M);
                  (M = (S[1] + f + y) | 0),
                    (S[1] = (S[2] + R + C) | 0),
                    (S[2] = (S[3] + A + T) | 0),
                    (S[3] = (S[4] + o + g) | 0),
                    (S[4] = (S[0] + a + O) | 0),
                    (S[0] = M);
                },
                _doFinalize: function () {
                  var e = this._data,
                    t = e.words,
                    n = 8 * this._nDataBytes,
                    r = 8 * e.sigBytes;
                  (t[r >>> 5] |= 128 << (24 - (r % 32))),
                    (t[14 + (((r + 64) >>> 9) << 4)] =
                      (16711935 & ((n << 8) | (n >>> 24))) |
                      (4278255360 & ((n << 24) | (n >>> 8)))),
                    (e.sigBytes = 4 * (t.length + 1)),
                    this._process();
                  for (var i = this._hash, o = i.words, a = 0; a < 5; a++) {
                    var _ = o[a];
                    o[a] =
                      (16711935 & ((_ << 8) | (_ >>> 24))) |
                      (4278255360 & ((_ << 24) | (_ >>> 8)));
                  }
                  return i;
                },
                clone: function () {
                  var e = o.clone.call(this);
                  return (e._hash = this._hash.clone()), e;
                },
              }));
            function h(e, t, n) {
              return e ^ t ^ n;
            }
            function p(e, t, n) {
              return (e & t) | (~e & n);
            }
            function P(e, t, n) {
              return (e | ~t) ^ n;
            }
            function m(e, t, n) {
              return (e & n) | (t & ~n);
            }
            function v(e, t, n) {
              return e ^ (t | ~n);
            }
            function E(e, t) {
              return (e << t) | (e >>> (32 - t));
            }
            (t.RIPEMD160 = o._createHelper(f)),
              (t.HmacRIPEMD160 = o._createHmacHelper(f));
          })(Math),
          r.RIPEMD160);
      },
      783: function (e, t, n) {
        var r, i, o, a, _, c, s;
        e.exports =
          ((r = n(249)),
          (o = (i = r).lib),
          (a = o.WordArray),
          (_ = o.Hasher),
          (c = []),
          (s = i.algo.SHA1 =
            _.extend({
              _doReset: function () {
                this._hash = new a.init([
                  1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                ]);
              },
              _doProcessBlock: function (e, t) {
                for (
                  var n = this._hash.words,
                    r = n[0],
                    i = n[1],
                    o = n[2],
                    a = n[3],
                    _ = n[4],
                    s = 0;
                  s < 80;
                  s++
                ) {
                  if (s < 16) c[s] = 0 | e[t + s];
                  else {
                    var l = c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16];
                    c[s] = (l << 1) | (l >>> 31);
                  }
                  var u = ((r << 5) | (r >>> 27)) + _ + c[s];
                  (u +=
                    s < 20
                      ? 1518500249 + ((i & o) | (~i & a))
                      : s < 40
                      ? 1859775393 + (i ^ o ^ a)
                      : s < 60
                      ? ((i & o) | (i & a) | (o & a)) - 1894007588
                      : (i ^ o ^ a) - 899497514),
                    (_ = a),
                    (a = o),
                    (o = (i << 30) | (i >>> 2)),
                    (i = r),
                    (r = u);
                }
                (n[0] = (n[0] + r) | 0),
                  (n[1] = (n[1] + i) | 0),
                  (n[2] = (n[2] + o) | 0),
                  (n[3] = (n[3] + a) | 0),
                  (n[4] = (n[4] + _) | 0);
              },
              _doFinalize: function () {
                var e = this._data,
                  t = e.words,
                  n = 8 * this._nDataBytes,
                  r = 8 * e.sigBytes;
                return (
                  (t[r >>> 5] |= 128 << (24 - (r % 32))),
                  (t[14 + (((r + 64) >>> 9) << 4)] = Math.floor(
                    n / 4294967296
                  )),
                  (t[15 + (((r + 64) >>> 9) << 4)] = n),
                  (e.sigBytes = 4 * t.length),
                  this._process(),
                  this._hash
                );
              },
              clone: function () {
                var e = _.clone.call(this);
                return (e._hash = this._hash.clone()), e;
              },
            })),
          (i.SHA1 = _._createHelper(s)),
          (i.HmacSHA1 = _._createHmacHelper(s)),
          r.SHA1);
      },
      792: function (e, t, n) {
        var r, i, o, a, _, c;
        e.exports =
          ((r = n(249)),
          n(153),
          (o = (i = r).lib.WordArray),
          (a = i.algo),
          (_ = a.SHA256),
          (c = a.SHA224 =
            _.extend({
              _doReset: function () {
                this._hash = new o.init([
                  3238371032, 914150663, 812702999, 4144912697, 4290775857,
                  1750603025, 1694076839, 3204075428,
                ]);
              },
              _doFinalize: function () {
                var e = _._doFinalize.call(this);
                return (e.sigBytes -= 4), e;
              },
            })),
          (i.SHA224 = _._createHelper(c)),
          (i.HmacSHA224 = _._createHmacHelper(c)),
          r.SHA224);
      },
      153: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          (function (e) {
            var t = r,
              n = t.lib,
              i = n.WordArray,
              o = n.Hasher,
              a = t.algo,
              _ = [],
              c = [];
            !(function () {
              function t(t) {
                for (var n = e.sqrt(t), r = 2; r <= n; r++)
                  if (!(t % r)) return !1;
                return !0;
              }
              function n(e) {
                return (4294967296 * (e - (0 | e))) | 0;
              }
              for (var r = 2, i = 0; i < 64; )
                t(r) &&
                  (i < 8 && (_[i] = n(e.pow(r, 0.5))),
                  (c[i] = n(e.pow(r, 1 / 3))),
                  i++),
                  r++;
            })();
            var s = [],
              l = (a.SHA256 = o.extend({
                _doReset: function () {
                  this._hash = new i.init(_.slice(0));
                },
                _doProcessBlock: function (e, t) {
                  for (
                    var n = this._hash.words,
                      r = n[0],
                      i = n[1],
                      o = n[2],
                      a = n[3],
                      _ = n[4],
                      l = n[5],
                      u = n[6],
                      d = n[7],
                      f = 0;
                    f < 64;
                    f++
                  ) {
                    if (f < 16) s[f] = 0 | e[t + f];
                    else {
                      var h = s[f - 15],
                        p =
                          ((h << 25) | (h >>> 7)) ^
                          ((h << 14) | (h >>> 18)) ^
                          (h >>> 3),
                        P = s[f - 2],
                        m =
                          ((P << 15) | (P >>> 17)) ^
                          ((P << 13) | (P >>> 19)) ^
                          (P >>> 10);
                      s[f] = p + s[f - 7] + m + s[f - 16];
                    }
                    var v = (r & i) ^ (r & o) ^ (i & o),
                      E =
                        ((r << 30) | (r >>> 2)) ^
                        ((r << 19) | (r >>> 13)) ^
                        ((r << 10) | (r >>> 22)),
                      R =
                        d +
                        (((_ << 26) | (_ >>> 6)) ^
                          ((_ << 21) | (_ >>> 11)) ^
                          ((_ << 7) | (_ >>> 25))) +
                        ((_ & l) ^ (~_ & u)) +
                        c[f] +
                        s[f];
                    (d = u),
                      (u = l),
                      (l = _),
                      (_ = (a + R) | 0),
                      (a = o),
                      (o = i),
                      (i = r),
                      (r = (R + (E + v)) | 0);
                  }
                  (n[0] = (n[0] + r) | 0),
                    (n[1] = (n[1] + i) | 0),
                    (n[2] = (n[2] + o) | 0),
                    (n[3] = (n[3] + a) | 0),
                    (n[4] = (n[4] + _) | 0),
                    (n[5] = (n[5] + l) | 0),
                    (n[6] = (n[6] + u) | 0),
                    (n[7] = (n[7] + d) | 0);
                },
                _doFinalize: function () {
                  var t = this._data,
                    n = t.words,
                    r = 8 * this._nDataBytes,
                    i = 8 * t.sigBytes;
                  return (
                    (n[i >>> 5] |= 128 << (24 - (i % 32))),
                    (n[14 + (((i + 64) >>> 9) << 4)] = e.floor(r / 4294967296)),
                    (n[15 + (((i + 64) >>> 9) << 4)] = r),
                    (t.sigBytes = 4 * n.length),
                    this._process(),
                    this._hash
                  );
                },
                clone: function () {
                  var e = o.clone.call(this);
                  return (e._hash = this._hash.clone()), e;
                },
              }));
            (t.SHA256 = o._createHelper(l)),
              (t.HmacSHA256 = o._createHmacHelper(l));
          })(Math),
          r.SHA256);
      },
      327: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(938),
          (function (e) {
            var t = r,
              n = t.lib,
              i = n.WordArray,
              o = n.Hasher,
              a = t.x64.Word,
              _ = t.algo,
              c = [],
              s = [],
              l = [];
            !(function () {
              for (var e = 1, t = 0, n = 0; n < 24; n++) {
                c[e + 5 * t] = (((n + 1) * (n + 2)) / 2) % 64;
                var r = (2 * e + 3 * t) % 5;
                (e = t % 5), (t = r);
              }
              for (e = 0; e < 5; e++)
                for (t = 0; t < 5; t++)
                  s[e + 5 * t] = t + ((2 * e + 3 * t) % 5) * 5;
              for (var i = 1, o = 0; o < 24; o++) {
                for (var _ = 0, u = 0, d = 0; d < 7; d++) {
                  if (1 & i) {
                    var f = (1 << d) - 1;
                    f < 32 ? (u ^= 1 << f) : (_ ^= 1 << (f - 32));
                  }
                  128 & i ? (i = (i << 1) ^ 113) : (i <<= 1);
                }
                l[o] = a.create(_, u);
              }
            })();
            var u = [];
            !(function () {
              for (var e = 0; e < 25; e++) u[e] = a.create();
            })();
            var d = (_.SHA3 = o.extend({
              cfg: o.cfg.extend({ outputLength: 512 }),
              _doReset: function () {
                for (var e = (this._state = []), t = 0; t < 25; t++)
                  e[t] = new a.init();
                this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
              },
              _doProcessBlock: function (e, t) {
                for (
                  var n = this._state, r = this.blockSize / 2, i = 0;
                  i < r;
                  i++
                ) {
                  var o = e[t + 2 * i],
                    a = e[t + 2 * i + 1];
                  (o =
                    (16711935 & ((o << 8) | (o >>> 24))) |
                    (4278255360 & ((o << 24) | (o >>> 8)))),
                    (a =
                      (16711935 & ((a << 8) | (a >>> 24))) |
                      (4278255360 & ((a << 24) | (a >>> 8)))),
                    ((S = n[i]).high ^= a),
                    (S.low ^= o);
                }
                for (var _ = 0; _ < 24; _++) {
                  for (var d = 0; d < 5; d++) {
                    for (var f = 0, h = 0, p = 0; p < 5; p++)
                      (f ^= (S = n[d + 5 * p]).high), (h ^= S.low);
                    var P = u[d];
                    (P.high = f), (P.low = h);
                  }
                  for (d = 0; d < 5; d++) {
                    var m = u[(d + 4) % 5],
                      v = u[(d + 1) % 5],
                      E = v.high,
                      R = v.low;
                    for (
                      f = m.high ^ ((E << 1) | (R >>> 31)),
                        h = m.low ^ ((R << 1) | (E >>> 31)),
                        p = 0;
                      p < 5;
                      p++
                    )
                      ((S = n[d + 5 * p]).high ^= f), (S.low ^= h);
                  }
                  for (var A = 1; A < 25; A++) {
                    var T = (S = n[A]).high,
                      g = S.low,
                      O = c[A];
                    O < 32
                      ? ((f = (T << O) | (g >>> (32 - O))),
                        (h = (g << O) | (T >>> (32 - O))))
                      : ((f = (g << (O - 32)) | (T >>> (64 - O))),
                        (h = (T << (O - 32)) | (g >>> (64 - O))));
                    var y = u[s[A]];
                    (y.high = f), (y.low = h);
                  }
                  var C = u[0],
                    M = n[0];
                  for (C.high = M.high, C.low = M.low, d = 0; d < 5; d++)
                    for (p = 0; p < 5; p++) {
                      var S = n[(A = d + 5 * p)],
                        I = u[A],
                        w = u[((d + 1) % 5) + 5 * p],
                        D = u[((d + 2) % 5) + 5 * p];
                      (S.high = I.high ^ (~w.high & D.high)),
                        (S.low = I.low ^ (~w.low & D.low));
                    }
                  S = n[0];
                  var x = l[_];
                  (S.high ^= x.high), (S.low ^= x.low);
                }
              },
              _doFinalize: function () {
                var t = this._data,
                  n = t.words,
                  r = (this._nDataBytes, 8 * t.sigBytes),
                  o = 32 * this.blockSize;
                (n[r >>> 5] |= 1 << (24 - (r % 32))),
                  (n[((e.ceil((r + 1) / o) * o) >>> 5) - 1] |= 128),
                  (t.sigBytes = 4 * n.length),
                  this._process();
                for (
                  var a = this._state,
                    _ = this.cfg.outputLength / 8,
                    c = _ / 8,
                    s = [],
                    l = 0;
                  l < c;
                  l++
                ) {
                  var u = a[l],
                    d = u.high,
                    f = u.low;
                  (d =
                    (16711935 & ((d << 8) | (d >>> 24))) |
                    (4278255360 & ((d << 24) | (d >>> 8)))),
                    (f =
                      (16711935 & ((f << 8) | (f >>> 24))) |
                      (4278255360 & ((f << 24) | (f >>> 8)))),
                    s.push(f),
                    s.push(d);
                }
                return new i.init(s, _);
              },
              clone: function () {
                for (
                  var e = o.clone.call(this),
                    t = (e._state = this._state.slice(0)),
                    n = 0;
                  n < 25;
                  n++
                )
                  t[n] = t[n].clone();
                return e;
              },
            }));
            (t.SHA3 = o._createHelper(d)),
              (t.HmacSHA3 = o._createHmacHelper(d));
          })(Math),
          r.SHA3);
      },
      460: function (e, t, n) {
        var r, i, o, a, _, c, s, l;
        e.exports =
          ((r = n(249)),
          n(938),
          n(34),
          (o = (i = r).x64),
          (a = o.Word),
          (_ = o.WordArray),
          (c = i.algo),
          (s = c.SHA512),
          (l = c.SHA384 =
            s.extend({
              _doReset: function () {
                this._hash = new _.init([
                  new a.init(3418070365, 3238371032),
                  new a.init(1654270250, 914150663),
                  new a.init(2438529370, 812702999),
                  new a.init(355462360, 4144912697),
                  new a.init(1731405415, 4290775857),
                  new a.init(2394180231, 1750603025),
                  new a.init(3675008525, 1694076839),
                  new a.init(1203062813, 3204075428),
                ]);
              },
              _doFinalize: function () {
                var e = s._doFinalize.call(this);
                return (e.sigBytes -= 16), e;
              },
            })),
          (i.SHA384 = s._createHelper(l)),
          (i.HmacSHA384 = s._createHmacHelper(l)),
          r.SHA384);
      },
      34: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(938),
          (function () {
            var e = r,
              t = e.lib.Hasher,
              n = e.x64,
              i = n.Word,
              o = n.WordArray,
              a = e.algo;
            function _() {
              return i.create.apply(i, arguments);
            }
            var c = [
                _(1116352408, 3609767458),
                _(1899447441, 602891725),
                _(3049323471, 3964484399),
                _(3921009573, 2173295548),
                _(961987163, 4081628472),
                _(1508970993, 3053834265),
                _(2453635748, 2937671579),
                _(2870763221, 3664609560),
                _(3624381080, 2734883394),
                _(310598401, 1164996542),
                _(607225278, 1323610764),
                _(1426881987, 3590304994),
                _(1925078388, 4068182383),
                _(2162078206, 991336113),
                _(2614888103, 633803317),
                _(3248222580, 3479774868),
                _(3835390401, 2666613458),
                _(4022224774, 944711139),
                _(264347078, 2341262773),
                _(604807628, 2007800933),
                _(770255983, 1495990901),
                _(1249150122, 1856431235),
                _(1555081692, 3175218132),
                _(1996064986, 2198950837),
                _(2554220882, 3999719339),
                _(2821834349, 766784016),
                _(2952996808, 2566594879),
                _(3210313671, 3203337956),
                _(3336571891, 1034457026),
                _(3584528711, 2466948901),
                _(113926993, 3758326383),
                _(338241895, 168717936),
                _(666307205, 1188179964),
                _(773529912, 1546045734),
                _(1294757372, 1522805485),
                _(1396182291, 2643833823),
                _(1695183700, 2343527390),
                _(1986661051, 1014477480),
                _(2177026350, 1206759142),
                _(2456956037, 344077627),
                _(2730485921, 1290863460),
                _(2820302411, 3158454273),
                _(3259730800, 3505952657),
                _(3345764771, 106217008),
                _(3516065817, 3606008344),
                _(3600352804, 1432725776),
                _(4094571909, 1467031594),
                _(275423344, 851169720),
                _(430227734, 3100823752),
                _(506948616, 1363258195),
                _(659060556, 3750685593),
                _(883997877, 3785050280),
                _(958139571, 3318307427),
                _(1322822218, 3812723403),
                _(1537002063, 2003034995),
                _(1747873779, 3602036899),
                _(1955562222, 1575990012),
                _(2024104815, 1125592928),
                _(2227730452, 2716904306),
                _(2361852424, 442776044),
                _(2428436474, 593698344),
                _(2756734187, 3733110249),
                _(3204031479, 2999351573),
                _(3329325298, 3815920427),
                _(3391569614, 3928383900),
                _(3515267271, 566280711),
                _(3940187606, 3454069534),
                _(4118630271, 4000239992),
                _(116418474, 1914138554),
                _(174292421, 2731055270),
                _(289380356, 3203993006),
                _(460393269, 320620315),
                _(685471733, 587496836),
                _(852142971, 1086792851),
                _(1017036298, 365543100),
                _(1126000580, 2618297676),
                _(1288033470, 3409855158),
                _(1501505948, 4234509866),
                _(1607167915, 987167468),
                _(1816402316, 1246189591),
              ],
              s = [];
            !(function () {
              for (var e = 0; e < 80; e++) s[e] = _();
            })();
            var l = (a.SHA512 = t.extend({
              _doReset: function () {
                this._hash = new o.init([
                  new i.init(1779033703, 4089235720),
                  new i.init(3144134277, 2227873595),
                  new i.init(1013904242, 4271175723),
                  new i.init(2773480762, 1595750129),
                  new i.init(1359893119, 2917565137),
                  new i.init(2600822924, 725511199),
                  new i.init(528734635, 4215389547),
                  new i.init(1541459225, 327033209),
                ]);
              },
              _doProcessBlock: function (e, t) {
                for (
                  var n = this._hash.words,
                    r = n[0],
                    i = n[1],
                    o = n[2],
                    a = n[3],
                    _ = n[4],
                    l = n[5],
                    u = n[6],
                    d = n[7],
                    f = r.high,
                    h = r.low,
                    p = i.high,
                    P = i.low,
                    m = o.high,
                    v = o.low,
                    E = a.high,
                    R = a.low,
                    A = _.high,
                    T = _.low,
                    g = l.high,
                    O = l.low,
                    y = u.high,
                    C = u.low,
                    M = d.high,
                    S = d.low,
                    I = f,
                    w = h,
                    D = p,
                    x = P,
                    N = m,
                    k = v,
                    L = E,
                    b = R,
                    B = A,
                    U = T,
                    F = g,
                    H = O,
                    Y = y,
                    V = C,
                    z = M,
                    X = S,
                    K = 0;
                  K < 80;
                  K++
                ) {
                  var q,
                    G,
                    W = s[K];
                  if (K < 16)
                    (G = W.high = 0 | e[t + 2 * K]),
                      (q = W.low = 0 | e[t + 2 * K + 1]);
                  else {
                    var Q = s[K - 15],
                      j = Q.high,
                      Z = Q.low,
                      J =
                        ((j >>> 1) | (Z << 31)) ^
                        ((j >>> 8) | (Z << 24)) ^
                        (j >>> 7),
                      $ =
                        ((Z >>> 1) | (j << 31)) ^
                        ((Z >>> 8) | (j << 24)) ^
                        ((Z >>> 7) | (j << 25)),
                      ee = s[K - 2],
                      te = ee.high,
                      ne = ee.low,
                      re =
                        ((te >>> 19) | (ne << 13)) ^
                        ((te << 3) | (ne >>> 29)) ^
                        (te >>> 6),
                      ie =
                        ((ne >>> 19) | (te << 13)) ^
                        ((ne << 3) | (te >>> 29)) ^
                        ((ne >>> 6) | (te << 26)),
                      oe = s[K - 7],
                      ae = oe.high,
                      _e = oe.low,
                      ce = s[K - 16],
                      se = ce.high,
                      le = ce.low;
                    (G =
                      (G =
                        (G = J + ae + ((q = $ + _e) >>> 0 < $ >>> 0 ? 1 : 0)) +
                        re +
                        ((q += ie) >>> 0 < ie >>> 0 ? 1 : 0)) +
                      se +
                      ((q += le) >>> 0 < le >>> 0 ? 1 : 0)),
                      (W.high = G),
                      (W.low = q);
                  }
                  var ue,
                    de = (B & F) ^ (~B & Y),
                    fe = (U & H) ^ (~U & V),
                    he = (I & D) ^ (I & N) ^ (D & N),
                    pe = (w & x) ^ (w & k) ^ (x & k),
                    Pe =
                      ((I >>> 28) | (w << 4)) ^
                      ((I << 30) | (w >>> 2)) ^
                      ((I << 25) | (w >>> 7)),
                    me =
                      ((w >>> 28) | (I << 4)) ^
                      ((w << 30) | (I >>> 2)) ^
                      ((w << 25) | (I >>> 7)),
                    ve =
                      ((B >>> 14) | (U << 18)) ^
                      ((B >>> 18) | (U << 14)) ^
                      ((B << 23) | (U >>> 9)),
                    Ee =
                      ((U >>> 14) | (B << 18)) ^
                      ((U >>> 18) | (B << 14)) ^
                      ((U << 23) | (B >>> 9)),
                    Re = c[K],
                    Ae = Re.high,
                    Te = Re.low,
                    ge = z + ve + ((ue = X + Ee) >>> 0 < X >>> 0 ? 1 : 0),
                    Oe = me + pe;
                  (z = Y),
                    (X = V),
                    (Y = F),
                    (V = H),
                    (F = B),
                    (H = U),
                    (B =
                      (L +
                        (ge =
                          (ge =
                            (ge =
                              ge + de + ((ue += fe) >>> 0 < fe >>> 0 ? 1 : 0)) +
                            Ae +
                            ((ue += Te) >>> 0 < Te >>> 0 ? 1 : 0)) +
                          G +
                          ((ue += q) >>> 0 < q >>> 0 ? 1 : 0)) +
                        ((U = (b + ue) | 0) >>> 0 < b >>> 0 ? 1 : 0)) |
                      0),
                    (L = N),
                    (b = k),
                    (N = D),
                    (k = x),
                    (D = I),
                    (x = w),
                    (I =
                      (ge +
                        (Pe + he + (Oe >>> 0 < me >>> 0 ? 1 : 0)) +
                        ((w = (ue + Oe) | 0) >>> 0 < ue >>> 0 ? 1 : 0)) |
                      0);
                }
                (h = r.low = h + w),
                  (r.high = f + I + (h >>> 0 < w >>> 0 ? 1 : 0)),
                  (P = i.low = P + x),
                  (i.high = p + D + (P >>> 0 < x >>> 0 ? 1 : 0)),
                  (v = o.low = v + k),
                  (o.high = m + N + (v >>> 0 < k >>> 0 ? 1 : 0)),
                  (R = a.low = R + b),
                  (a.high = E + L + (R >>> 0 < b >>> 0 ? 1 : 0)),
                  (T = _.low = T + U),
                  (_.high = A + B + (T >>> 0 < U >>> 0 ? 1 : 0)),
                  (O = l.low = O + H),
                  (l.high = g + F + (O >>> 0 < H >>> 0 ? 1 : 0)),
                  (C = u.low = C + V),
                  (u.high = y + Y + (C >>> 0 < V >>> 0 ? 1 : 0)),
                  (S = d.low = S + X),
                  (d.high = M + z + (S >>> 0 < X >>> 0 ? 1 : 0));
              },
              _doFinalize: function () {
                var e = this._data,
                  t = e.words,
                  n = 8 * this._nDataBytes,
                  r = 8 * e.sigBytes;
                return (
                  (t[r >>> 5] |= 128 << (24 - (r % 32))),
                  (t[30 + (((r + 128) >>> 10) << 5)] = Math.floor(
                    n / 4294967296
                  )),
                  (t[31 + (((r + 128) >>> 10) << 5)] = n),
                  (e.sigBytes = 4 * t.length),
                  this._process(),
                  this._hash.toX32()
                );
              },
              clone: function () {
                var e = t.clone.call(this);
                return (e._hash = this._hash.clone()), e;
              },
              blockSize: 32,
            }));
            (e.SHA512 = t._createHelper(l)),
              (e.HmacSHA512 = t._createHmacHelper(l));
          })(),
          r.SHA512);
      },
      253: function (e, t, n) {
        var r;
        e.exports =
          ((r = n(249)),
          n(269),
          n(214),
          n(888),
          n(109),
          (function () {
            var e = r,
              t = e.lib,
              n = t.WordArray,
              i = t.BlockCipher,
              o = e.algo,
              a = [
                57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59,
                51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31,
                23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29,
                21, 13, 5, 28, 20, 12, 4,
              ],
              _ = [
                14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26,
                8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45,
                33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32,
              ],
              c = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
              s = [
                {
                  0: 8421888,
                  268435456: 32768,
                  536870912: 8421378,
                  805306368: 2,
                  1073741824: 512,
                  1342177280: 8421890,
                  1610612736: 8389122,
                  1879048192: 8388608,
                  2147483648: 514,
                  2415919104: 8389120,
                  2684354560: 33280,
                  2952790016: 8421376,
                  3221225472: 32770,
                  3489660928: 8388610,
                  3758096384: 0,
                  4026531840: 33282,
                  134217728: 0,
                  402653184: 8421890,
                  671088640: 33282,
                  939524096: 32768,
                  1207959552: 8421888,
                  1476395008: 512,
                  1744830464: 8421378,
                  2013265920: 2,
                  2281701376: 8389120,
                  2550136832: 33280,
                  2818572288: 8421376,
                  3087007744: 8389122,
                  3355443200: 8388610,
                  3623878656: 32770,
                  3892314112: 514,
                  4160749568: 8388608,
                  1: 32768,
                  268435457: 2,
                  536870913: 8421888,
                  805306369: 8388608,
                  1073741825: 8421378,
                  1342177281: 33280,
                  1610612737: 512,
                  1879048193: 8389122,
                  2147483649: 8421890,
                  2415919105: 8421376,
                  2684354561: 8388610,
                  2952790017: 33282,
                  3221225473: 514,
                  3489660929: 8389120,
                  3758096385: 32770,
                  4026531841: 0,
                  134217729: 8421890,
                  402653185: 8421376,
                  671088641: 8388608,
                  939524097: 512,
                  1207959553: 32768,
                  1476395009: 8388610,
                  1744830465: 2,
                  2013265921: 33282,
                  2281701377: 32770,
                  2550136833: 8389122,
                  2818572289: 514,
                  3087007745: 8421888,
                  3355443201: 8389120,
                  3623878657: 0,
                  3892314113: 33280,
                  4160749569: 8421378,
                },
                {
                  0: 1074282512,
                  16777216: 16384,
                  33554432: 524288,
                  50331648: 1074266128,
                  67108864: 1073741840,
                  83886080: 1074282496,
                  100663296: 1073758208,
                  117440512: 16,
                  134217728: 540672,
                  150994944: 1073758224,
                  167772160: 1073741824,
                  184549376: 540688,
                  201326592: 524304,
                  218103808: 0,
                  234881024: 16400,
                  251658240: 1074266112,
                  8388608: 1073758208,
                  25165824: 540688,
                  41943040: 16,
                  58720256: 1073758224,
                  75497472: 1074282512,
                  92274688: 1073741824,
                  109051904: 524288,
                  125829120: 1074266128,
                  142606336: 524304,
                  159383552: 0,
                  176160768: 16384,
                  192937984: 1074266112,
                  209715200: 1073741840,
                  226492416: 540672,
                  243269632: 1074282496,
                  260046848: 16400,
                  268435456: 0,
                  285212672: 1074266128,
                  301989888: 1073758224,
                  318767104: 1074282496,
                  335544320: 1074266112,
                  352321536: 16,
                  369098752: 540688,
                  385875968: 16384,
                  402653184: 16400,
                  419430400: 524288,
                  436207616: 524304,
                  452984832: 1073741840,
                  469762048: 540672,
                  486539264: 1073758208,
                  503316480: 1073741824,
                  520093696: 1074282512,
                  276824064: 540688,
                  293601280: 524288,
                  310378496: 1074266112,
                  327155712: 16384,
                  343932928: 1073758208,
                  360710144: 1074282512,
                  377487360: 16,
                  394264576: 1073741824,
                  411041792: 1074282496,
                  427819008: 1073741840,
                  444596224: 1073758224,
                  461373440: 524304,
                  478150656: 0,
                  494927872: 16400,
                  511705088: 1074266128,
                  528482304: 540672,
                },
                {
                  0: 260,
                  1048576: 0,
                  2097152: 67109120,
                  3145728: 65796,
                  4194304: 65540,
                  5242880: 67108868,
                  6291456: 67174660,
                  7340032: 67174400,
                  8388608: 67108864,
                  9437184: 67174656,
                  10485760: 65792,
                  11534336: 67174404,
                  12582912: 67109124,
                  13631488: 65536,
                  14680064: 4,
                  15728640: 256,
                  524288: 67174656,
                  1572864: 67174404,
                  2621440: 0,
                  3670016: 67109120,
                  4718592: 67108868,
                  5767168: 65536,
                  6815744: 65540,
                  7864320: 260,
                  8912896: 4,
                  9961472: 256,
                  11010048: 67174400,
                  12058624: 65796,
                  13107200: 65792,
                  14155776: 67109124,
                  15204352: 67174660,
                  16252928: 67108864,
                  16777216: 67174656,
                  17825792: 65540,
                  18874368: 65536,
                  19922944: 67109120,
                  20971520: 256,
                  22020096: 67174660,
                  23068672: 67108868,
                  24117248: 0,
                  25165824: 67109124,
                  26214400: 67108864,
                  27262976: 4,
                  28311552: 65792,
                  29360128: 67174400,
                  30408704: 260,
                  31457280: 65796,
                  32505856: 67174404,
                  17301504: 67108864,
                  18350080: 260,
                  19398656: 67174656,
                  20447232: 0,
                  21495808: 65540,
                  22544384: 67109120,
                  23592960: 256,
                  24641536: 67174404,
                  25690112: 65536,
                  26738688: 67174660,
                  27787264: 65796,
                  28835840: 67108868,
                  29884416: 67109124,
                  30932992: 67174400,
                  31981568: 4,
                  33030144: 65792,
                },
                {
                  0: 2151682048,
                  65536: 2147487808,
                  131072: 4198464,
                  196608: 2151677952,
                  262144: 0,
                  327680: 4198400,
                  393216: 2147483712,
                  458752: 4194368,
                  524288: 2147483648,
                  589824: 4194304,
                  655360: 64,
                  720896: 2147487744,
                  786432: 2151678016,
                  851968: 4160,
                  917504: 4096,
                  983040: 2151682112,
                  32768: 2147487808,
                  98304: 64,
                  163840: 2151678016,
                  229376: 2147487744,
                  294912: 4198400,
                  360448: 2151682112,
                  425984: 0,
                  491520: 2151677952,
                  557056: 4096,
                  622592: 2151682048,
                  688128: 4194304,
                  753664: 4160,
                  819200: 2147483648,
                  884736: 4194368,
                  950272: 4198464,
                  1015808: 2147483712,
                  1048576: 4194368,
                  1114112: 4198400,
                  1179648: 2147483712,
                  1245184: 0,
                  1310720: 4160,
                  1376256: 2151678016,
                  1441792: 2151682048,
                  1507328: 2147487808,
                  1572864: 2151682112,
                  1638400: 2147483648,
                  1703936: 2151677952,
                  1769472: 4198464,
                  1835008: 2147487744,
                  1900544: 4194304,
                  1966080: 64,
                  2031616: 4096,
                  1081344: 2151677952,
                  1146880: 2151682112,
                  1212416: 0,
                  1277952: 4198400,
                  1343488: 4194368,
                  1409024: 2147483648,
                  1474560: 2147487808,
                  1540096: 64,
                  1605632: 2147483712,
                  1671168: 4096,
                  1736704: 2147487744,
                  1802240: 2151678016,
                  1867776: 4160,
                  1933312: 2151682048,
                  1998848: 4194304,
                  2064384: 4198464,
                },
                {
                  0: 128,
                  4096: 17039360,
                  8192: 262144,
                  12288: 536870912,
                  16384: 537133184,
                  20480: 16777344,
                  24576: 553648256,
                  28672: 262272,
                  32768: 16777216,
                  36864: 537133056,
                  40960: 536871040,
                  45056: 553910400,
                  49152: 553910272,
                  53248: 0,
                  57344: 17039488,
                  61440: 553648128,
                  2048: 17039488,
                  6144: 553648256,
                  10240: 128,
                  14336: 17039360,
                  18432: 262144,
                  22528: 537133184,
                  26624: 553910272,
                  30720: 536870912,
                  34816: 537133056,
                  38912: 0,
                  43008: 553910400,
                  47104: 16777344,
                  51200: 536871040,
                  55296: 553648128,
                  59392: 16777216,
                  63488: 262272,
                  65536: 262144,
                  69632: 128,
                  73728: 536870912,
                  77824: 553648256,
                  81920: 16777344,
                  86016: 553910272,
                  90112: 537133184,
                  94208: 16777216,
                  98304: 553910400,
                  102400: 553648128,
                  106496: 17039360,
                  110592: 537133056,
                  114688: 262272,
                  118784: 536871040,
                  122880: 0,
                  126976: 17039488,
                  67584: 553648256,
                  71680: 16777216,
                  75776: 17039360,
                  79872: 537133184,
                  83968: 536870912,
                  88064: 17039488,
                  92160: 128,
                  96256: 553910272,
                  100352: 262272,
                  104448: 553910400,
                  108544: 0,
                  112640: 553648128,
                  116736: 16777344,
                  120832: 262144,
                  124928: 537133056,
                  129024: 536871040,
                },
                {
                  0: 268435464,
                  256: 8192,
                  512: 270532608,
                  768: 270540808,
                  1024: 268443648,
                  1280: 2097152,
                  1536: 2097160,
                  1792: 268435456,
                  2048: 0,
                  2304: 268443656,
                  2560: 2105344,
                  2816: 8,
                  3072: 270532616,
                  3328: 2105352,
                  3584: 8200,
                  3840: 270540800,
                  128: 270532608,
                  384: 270540808,
                  640: 8,
                  896: 2097152,
                  1152: 2105352,
                  1408: 268435464,
                  1664: 268443648,
                  1920: 8200,
                  2176: 2097160,
                  2432: 8192,
                  2688: 268443656,
                  2944: 270532616,
                  3200: 0,
                  3456: 270540800,
                  3712: 2105344,
                  3968: 268435456,
                  4096: 268443648,
                  4352: 270532616,
                  4608: 270540808,
                  4864: 8200,
                  5120: 2097152,
                  5376: 268435456,
                  5632: 268435464,
                  5888: 2105344,
                  6144: 2105352,
                  6400: 0,
                  6656: 8,
                  6912: 270532608,
                  7168: 8192,
                  7424: 268443656,
                  7680: 270540800,
                  7936: 2097160,
                  4224: 8,
                  4480: 2105344,
                  4736: 2097152,
                  4992: 268435464,
                  5248: 268443648,
                  5504: 8200,
                  5760: 270540808,
                  6016: 270532608,
                  6272: 270540800,
                  6528: 270532616,
                  6784: 8192,
                  7040: 2105352,
                  7296: 2097160,
                  7552: 0,
                  7808: 268435456,
                  8064: 268443656,
                },
                {
                  0: 1048576,
                  16: 33555457,
                  32: 1024,
                  48: 1049601,
                  64: 34604033,
                  80: 0,
                  96: 1,
                  112: 34603009,
                  128: 33555456,
                  144: 1048577,
                  160: 33554433,
                  176: 34604032,
                  192: 34603008,
                  208: 1025,
                  224: 1049600,
                  240: 33554432,
                  8: 34603009,
                  24: 0,
                  40: 33555457,
                  56: 34604032,
                  72: 1048576,
                  88: 33554433,
                  104: 33554432,
                  120: 1025,
                  136: 1049601,
                  152: 33555456,
                  168: 34603008,
                  184: 1048577,
                  200: 1024,
                  216: 34604033,
                  232: 1,
                  248: 1049600,
                  256: 33554432,
                  272: 1048576,
                  288: 33555457,
                  304: 34603009,
                  320: 1048577,
                  336: 33555456,
                  352: 34604032,
                  368: 1049601,
                  384: 1025,
                  400: 34604033,
                  416: 1049600,
                  432: 1,
                  448: 0,
                  464: 34603008,
                  480: 33554433,
                  496: 1024,
                  264: 1049600,
                  280: 33555457,
                  296: 34603009,
                  312: 1,
                  328: 33554432,
                  344: 1048576,
                  360: 1025,
                  376: 34604032,
                  392: 33554433,
                  408: 34603008,
                  424: 0,
                  440: 34604033,
                  456: 1049601,
                  472: 1024,
                  488: 33555456,
                  504: 1048577,
                },
                {
                  0: 134219808,
                  1: 131072,
                  2: 134217728,
                  3: 32,
                  4: 131104,
                  5: 134350880,
                  6: 134350848,
                  7: 2048,
                  8: 134348800,
                  9: 134219776,
                  10: 133120,
                  11: 134348832,
                  12: 2080,
                  13: 0,
                  14: 134217760,
                  15: 133152,
                  2147483648: 2048,
                  2147483649: 134350880,
                  2147483650: 134219808,
                  2147483651: 134217728,
                  2147483652: 134348800,
                  2147483653: 133120,
                  2147483654: 133152,
                  2147483655: 32,
                  2147483656: 134217760,
                  2147483657: 2080,
                  2147483658: 131104,
                  2147483659: 134350848,
                  2147483660: 0,
                  2147483661: 134348832,
                  2147483662: 134219776,
                  2147483663: 131072,
                  16: 133152,
                  17: 134350848,
                  18: 32,
                  19: 2048,
                  20: 134219776,
                  21: 134217760,
                  22: 134348832,
                  23: 131072,
                  24: 0,
                  25: 131104,
                  26: 134348800,
                  27: 134219808,
                  28: 134350880,
                  29: 133120,
                  30: 2080,
                  31: 134217728,
                  2147483664: 131072,
                  2147483665: 2048,
                  2147483666: 134348832,
                  2147483667: 133152,
                  2147483668: 32,
                  2147483669: 134348800,
                  2147483670: 134217728,
                  2147483671: 134219808,
                  2147483672: 134350880,
                  2147483673: 134217760,
                  2147483674: 134219776,
                  2147483675: 0,
                  2147483676: 133120,
                  2147483677: 2080,
                  2147483678: 131104,
                  2147483679: 134350848,
                },
              ],
              l = [
                4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504,
                2147483679,
              ],
              u = (o.DES = i.extend({
                _doReset: function () {
                  for (var e = this._key.words, t = [], n = 0; n < 56; n++) {
                    var r = a[n] - 1;
                    t[n] = (e[r >>> 5] >>> (31 - (r % 32))) & 1;
                  }
                  for (var i = (this._subKeys = []), o = 0; o < 16; o++) {
                    var s = (i[o] = []),
                      l = c[o];
                    for (n = 0; n < 24; n++)
                      (s[(n / 6) | 0] |=
                        t[(_[n] - 1 + l) % 28] << (31 - (n % 6))),
                        (s[4 + ((n / 6) | 0)] |=
                          t[28 + ((_[n + 24] - 1 + l) % 28)] << (31 - (n % 6)));
                    for (s[0] = (s[0] << 1) | (s[0] >>> 31), n = 1; n < 7; n++)
                      s[n] = s[n] >>> (4 * (n - 1) + 3);
                    s[7] = (s[7] << 5) | (s[7] >>> 27);
                  }
                  var u = (this._invSubKeys = []);
                  for (n = 0; n < 16; n++) u[n] = i[15 - n];
                },
                encryptBlock: function (e, t) {
                  this._doCryptBlock(e, t, this._subKeys);
                },
                decryptBlock: function (e, t) {
                  this._doCryptBlock(e, t, this._invSubKeys);
                },
                _doCryptBlock: function (e, t, n) {
                  (this._lBlock = e[t]),
                    (this._rBlock = e[t + 1]),
                    d.call(this, 4, 252645135),
                    d.call(this, 16, 65535),
                    f.call(this, 2, 858993459),
                    f.call(this, 8, 16711935),
                    d.call(this, 1, 1431655765);
                  for (var r = 0; r < 16; r++) {
                    for (
                      var i = n[r],
                        o = this._lBlock,
                        a = this._rBlock,
                        _ = 0,
                        c = 0;
                      c < 8;
                      c++
                    )
                      _ |= s[c][((a ^ i[c]) & l[c]) >>> 0];
                    (this._lBlock = a), (this._rBlock = o ^ _);
                  }
                  var u = this._lBlock;
                  (this._lBlock = this._rBlock),
                    (this._rBlock = u),
                    d.call(this, 1, 1431655765),
                    f.call(this, 8, 16711935),
                    f.call(this, 2, 858993459),
                    d.call(this, 16, 65535),
                    d.call(this, 4, 252645135),
                    (e[t] = this._lBlock),
                    (e[t + 1] = this._rBlock);
                },
                keySize: 2,
                ivSize: 2,
                blockSize: 2,
              }));
            function d(e, t) {
              var n = ((this._lBlock >>> e) ^ this._rBlock) & t;
              (this._rBlock ^= n), (this._lBlock ^= n << e);
            }
            function f(e, t) {
              var n = ((this._rBlock >>> e) ^ this._lBlock) & t;
              (this._lBlock ^= n), (this._rBlock ^= n << e);
            }
            e.DES = i._createHelper(u);
            var h = (o.TripleDES = i.extend({
              _doReset: function () {
                var e = this._key.words;
                if (2 !== e.length && 4 !== e.length && e.length < 6)
                  throw new Error(
                    "Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192."
                  );
                var t = e.slice(0, 2),
                  r = e.length < 4 ? e.slice(0, 2) : e.slice(2, 4),
                  i = e.length < 6 ? e.slice(0, 2) : e.slice(4, 6);
                (this._des1 = u.createEncryptor(n.create(t))),
                  (this._des2 = u.createEncryptor(n.create(r))),
                  (this._des3 = u.createEncryptor(n.create(i)));
              },
              encryptBlock: function (e, t) {
                this._des1.encryptBlock(e, t),
                  this._des2.decryptBlock(e, t),
                  this._des3.encryptBlock(e, t);
              },
              decryptBlock: function (e, t) {
                this._des3.decryptBlock(e, t),
                  this._des2.encryptBlock(e, t),
                  this._des1.decryptBlock(e, t);
              },
              keySize: 6,
              ivSize: 2,
              blockSize: 2,
            }));
            e.TripleDES = i._createHelper(h);
          })(),
          r.TripleDES);
      },
      938: function (e, t, n) {
        var r, i, o, a, _, c;
        e.exports =
          ((r = n(249)),
          (o = (i = r).lib),
          (a = o.Base),
          (_ = o.WordArray),
          ((c = i.x64 = {}).Word = a.extend({
            init: function (e, t) {
              (this.high = e), (this.low = t);
            },
          })),
          (c.WordArray = a.extend({
            init: function (e, t) {
              (e = this.words = e || []),
                (this.sigBytes = void 0 != t ? t : 8 * e.length);
            },
            toX32: function () {
              for (
                var e = this.words, t = e.length, n = [], r = 0;
                r < t;
                r++
              ) {
                var i = e[r];
                n.push(i.high), n.push(i.low);
              }
              return _.create(n, this.sigBytes);
            },
            clone: function () {
              for (
                var e = a.clone.call(this),
                  t = (e.words = this.words.slice(0)),
                  n = t.length,
                  r = 0;
                r < n;
                r++
              )
                t[r] = t[r].clone();
              return e;
            },
          })),
          r);
      },
    },
    t = {};
  function n(r) {
    var i = t[r];
    if (void 0 !== i) return i.exports;
    var o = (t[r] = { exports: {} });
    return e[r].call(o.exports, o, o.exports, n), o.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      var e = {};
      n.r(e),
        n.d(e, {
          decode64: () =>
            function (e) {
              var t = r().enc.Base64.parse(e),
                n = t.toString(r().enc.Utf8);
              return console.log("base64解码。", e, t, n), n;
            },
          encode64: () =>
            function (e) {
              var t = r().enc.Utf8.parse(e);
              return r().enc.Base64.stringify(t);
            },
          getWifiAPsData: () =>
            function (e) {
              let t = document.getElementById("dev_id").value,
                n = document.getElementById("user").value,
                r = document.getElementById("pwd").value,
                i = new Date();
              i.setFullYear(i.getFullYear() - 1);
              let o = {
                Version: "1.0.0",
                Method: "get",
                CapabilitySet: {},
                IPCam: {
                  DeviceInfo: {},
                  recordInfo: {
                    recordScheduleDateInfo: [
                      {
                        chnNum: 0,
                        beginTimeS: "",
                        endTimeS: "",
                        recordDay: [],
                      },
                    ],
                  },
                  ModeSetting: { AudioVolume: {} },
                  AlarmSetting: {
                    HumanoidDetection: {},
                    MotionDetection: {},
                    MessagePushSchedule: [],
                    FaceDetection: {},
                    MessagePushBitSchedule: [],
                  },
                  SystemOperation: {
                    TimeSync: {},
                    DaylightSavingTime: { week: [{}, {}] },
                    Upgrade: {},
                  },
                  PromptSounds: {},
                  TfcardManager: { TFcard_recordSchedule: [] },
                  WirelessManager: {},
                  ChannelStatus: [{}],
                  ChannelInfo: [{}],
                  videoManager: {},
                  WirelessStation: { APs: [] },
                  devCoverSetting: [],
                  RecordCtrl: {},
                  powerLineFrequencyMode: "",
                },
                Authorization: { Verify: "", username: n, password: r },
                UserManager: {},
              };
              console.log("config :>>时间录像管理", o),
                Player.RemoteSetting(t, "", JSON.stringify(o));
            },
          rebootDevice: () =>
            function () {
              let e = document.getElementById("dev_id").value,
                t = document.getElementById("user").value,
                n = document.getElementById("pwd").value,
                r = document.querySelector(".loading-view"),
                i = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: { SystemOperation: { Reboot: !0 } },
                  Authorization: { Verify: "", username: "", password: "" },
                };
              (i.Authorization.username = t),
                (i.Authorization.password = n),
                console.log("config :>> 重启摄像头", i),
                (r.style.display = "block"),
                handleMessage("重启摄像头后请稍后重新连接"),
                document.querySelector(".remote-Modal").remove(),
                Player.RemoteSetting(e, "", JSON.stringify(i));
            },
          resetDevice: () =>
            function (e, t) {
              let n = document.getElementById("dev_id").value,
                r = document.getElementById("user").value,
                i = document.getElementById("pwd").value,
                o = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: { SystemOperation: { ResetDefault: !0 } },
                  Authorization: { Verify: "", username: r, password: i },
                };
              Player.RemoteSetting(n, "", JSON.stringify(o));
            },
          setAudioEnabled: () =>
            function (e) {
              let t = document.getElementById("dev_id").value,
                n = document.getElementById("user").value,
                r = document.getElementById("pwd").value,
                i = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: { ModeSetting: { AudioEnabled: "" } },
                  Authorization: { Verify: "", username: "", password: "" },
                };
              (i.IPCam.ModeSetting.AudioEnabled = e),
                (i.Authorization.username = n),
                (i.Authorization.password = r),
                console.log("config :>> setAudioEnabled", i),
                (isremoteing = !0),
                Player.RemoteSetting(t, "", JSON.stringify(i));
            },
          setAudioVolume: () =>
            function (e, t) {
              let n = document.getElementById("dev_id").value,
                r = document.getElementById("user").value,
                i = document.getElementById("pwd").value,
                o = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: {
                    ModeSetting: {
                      AudioVolume: {
                        AudioInputVolume: "",
                        AudioOutputVolume: "",
                      },
                    },
                  },
                  Authorization: { Verify: "", username: "", password: "" },
                };
              (o.IPCam.ModeSetting.AudioVolume.AudioInputVolume = e),
                (o.IPCam.ModeSetting.AudioVolume.AudioOutputVolume = t),
                (o.Authorization.username = r),
                (o.Authorization.password = i),
                console.log("config", o),
                (isremoteing = !0),
                Player.RemoteSetting(n, "", JSON.stringify(o));
            },
          setDevicePassword: () =>
            function (e, t) {
              let n = document.getElementById("dev_id").value,
                r = document.getElementById("user").value,
                i = document.getElementById("pwd").value,
                o = new Date(),
                a = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: {
                    SystemOperation: {
                      TimeSync: {
                        UTCTime: parseInt(o.getTime() / 1e3).toString(),
                      },
                    },
                  },
                  UserManager: {
                    Method: "modify",
                    Verify: "",
                    username: e,
                    password: t,
                  },
                  Authorization: { Verify: "", username: r, password: i },
                };
              console.log("config :>>IPC设置设备密码", a),
                (isremoteing = !0),
                Player.RemoteSetting(n, "", JSON.stringify(a));
            },
          setMobileAlarmSetting: () =>
            function (e) {
              let t = document.getElementById("dev_id").value,
                n = document.getElementById("user").value,
                r = document.getElementById("pwd").value,
                i = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: {
                    AlarmSetting: {
                      MotionDetection: {
                        Enabled: "",
                        MotionRecord: "",
                        MotionWarningTone: "",
                        SensitivityLevel: "",
                        motionTrackEnabled: "",
                        MdRecDuration: "",
                      },
                      MessagePushBitSchedule: "",
                      HumanoidDetection: { enable: "", drawRegion: "" },
                      MessagePushEnabled: "",
                      FaceDetection: { enable: "", drawRegion: "" },
                    },
                  },
                  Authorization: { Verify: "", username: "", password: "" },
                };
              (i.IPCam.AlarmSetting.MotionDetection.Enabled =
                e.MotionDetectionEnabled),
                (i.IPCam.AlarmSetting.HumanoidDetection.enable =
                  e.HumanoidDetectionenable),
                (i.IPCam.AlarmSetting.HumanoidDetection.drawRegion =
                  e.HumanoidDetectiondrawRegion),
                (i.IPCam.AlarmSetting.FaceDetection.enable =
                  e.FaceDetectionenable),
                (i.IPCam.AlarmSetting.FaceDetection.drawRegion =
                  e.FaceDetectiondrawRegion),
                (i.IPCam.AlarmSetting.MotionDetection.MdRecDuration =
                  e.MotionDetectionMdRecDuration),
                (i.IPCam.AlarmSetting.MotionDetection.MotionRecord =
                  e.MotionDetectionMotionRecord),
                (i.IPCam.AlarmSetting.MessagePushEnabled =
                  e.MessagePushEnabled),
                (i.IPCam.AlarmSetting.MotionDetection.SensitivityLevel =
                  e.MotionDetectionSensitivityLevel),
                (i.IPCam.AlarmSetting.MotionDetection.MotionWarningTone =
                  e.MotionDetectionMotionWarningTone),
                (i.Authorization.username = n),
                (i.Authorization.password = r),
                console.log("config :>>移动侦查告警相关配置", i),
                (isremoteing = !0),
                Player.RemoteSetting(t, "", JSON.stringify(i));
            },
          setNetwork: () =>
            function (e, t) {
              let n = document.getElementById("dev_id").value,
                r = document.getElementById("user").value,
                i = document.getElementById("pwd").value,
                o = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: { WirelessStation: { ssid: e, psk: t } },
                  Authorization: { Verify: "", username: r, password: i },
                };
              console.log("config :>>切换连接wifi", o),
                Player.RemoteSetting(n, "", JSON.stringify(o));
            },
          setPromptSounds: () =>
            function (e, t) {
              let n = document.getElementById("dev_id").value,
                r = document.getElementById("user").value,
                i = document.getElementById("pwd").value,
                o = {
                  Version: "1.1.23",
                  Method: "set",
                  IPCam: { PromptSounds: { Enabled: "", Type: "" } },
                  Authorization: { Verify: "", username: "", password: "" },
                };
              (o.IPCam.PromptSounds.Enabled = e),
                (o.IPCam.PromptSounds.Type = t),
                (o.Authorization.username = r),
                (o.Authorization.password = i),
                console.log("config :>> setPromptSounds", o),
                (isremoteing = !0),
                Player.RemoteSetting(n, "", JSON.stringify(o));
            },
          setTFcardRecordSchedule: () =>
            function (e, t) {
              let n = document.getElementById("dev_id").value,
                r = document.getElementById("user").value,
                i = document.getElementById("pwd").value,
                o = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: {
                    TfcardManager: {
                      TimeRecordEnabled: "",
                      TFcard_recordSchedule: "",
                    },
                  },
                  Authorization: { Verify: "", username: "", password: "" },
                };
              (o.IPCam.TfcardManager.TimeRecordEnabled = e),
                (o.IPCam.TfcardManager.TFcard_recordSchedule = t),
                (o.Authorization.username = r),
                (o.Authorization.password = i),
                console.log("config :>>时间录像管理", o),
                console.log("TimeRecordEnabled", e),
                console.log("TFcardRecordScheduleArr", t),
                (isremoteing = !0),
                Player.RemoteSetting(n, "", JSON.stringify(o));
            },
          setUpdat: () =>
            function () {
              let e = document.getElementById("dev_id").value,
                t = document.getElementById("user").value,
                n = document.getElementById("pwd").value,
                r = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: { SystemOperation: { Upgrade: { Enabled: !0 } } },
                  Authorization: { Verify: "", username: t, password: n },
                };
              console.log("IPC固件更新", r),
                Player.RemoteSetting(e, "", JSON.stringify(r));
            },
          setVideoimage: () =>
            function (e) {
              let t = document.getElementById("dev_id").value,
                n = document.getElementById("user").value,
                r = document.getElementById("pwd").value,
                i = {
                  Version: "1.0.0",
                  Method: "set",
                  IPCam: {
                    ModeSetting: { IRCutFilterMode: e.IRCutFilterMode },
                  },
                  Authorization: { Verify: "", username: n, password: r },
                };
              console.log("config :>>保存视频图像设置", i),
                (isremoteing = !0),
                Player.RemoteSetting(t, "", JSON.stringify(i));
            },
        });
      var t = n(354),
        r = n.n(t);
      const i = {};
      let o = parseInt("FF000000", 16),
        a = parseInt("FF0000", 16),
        _ = parseInt("FF00", 16),
        c = parseInt("FF", 16);
      (i.hdr_len = 32),
        (i.iot_cmd = {
          IOT_LINK_CMD_DEV_NONCE_REQ: 0,
          IOT_LINK_CMD_DEV_NONCE_RES: 1,
          IOT_LINK_CMD_DEV_SESSION_REQ: 2,
          IOT_LINK_CMD_DEV_SESSION_RES: 3,
          IOT_LINK_CMD_DEV_LOGIN_REQ: 4,
          IOT_LINK_CMD_DEV_LOGIN_RES: 5,
          IOT_LINK_CMD_HOLE_REQ: 6,
          IOT_LINK_CMD_HOLE_S2D: 7,
          IOT_LINK_CMD_HOLE_D2S: 8,
          IOT_LINK_CMD_HOLE_S2D2: 9,
          IOT_LINK_CMD_HOLE_S2A: 10,
          IOT_LINK_CMD_HOLE_PUNCH: 11,
          IOT_LINK_CMD_TURN_REQ: 12,
          IOT_LINK_CMD_TURN_M2S: 13,
          IOT_LINK_CMD_TURN_S2D: 14,
          IOT_LINK_CMD_TURN_D2S: 15,
          IOT_LINK_CMD_TURN_S2A: 16,
          IOT_LINK_CMD_PING: 17,
          IOT_LINK_CMD_PONG: 18,
          IOT_LINK_CMD_DATA: 19,
          IOT_LINK_CMD_OPEN_REQ: 20,
          IOT_LINK_CMD_OPEN_RES: 21,
          IOT_LINK_CMD_CLOSE_REQ: 22,
          IOT_LINK_CMD_CLOSE_RES: 23,
          IOT_LINK_CMD_TURNTOPROXY_REG: 24,
          IOT_LINK_CMD_TURNTOPROXY_RES: 25,
          IOT_LINK_CMD_TURN_DEVICE_CONN_REG: 26,
          IOT_LINK_CMD_TURN_DEVICE_CONN_RES: 27,
          IOT_LINK_CMD_TURN_DEVICE_DISCONN_REG: 28,
          IOT_LINK_CMD_TURN_DEVICE_DISCONN_RES: 29,
          IOT_LINK_CMD_TURN_CLIENT_CONN_REG: 30,
          IOT_LINK_CMD_TURN_CLIENT_CONN_RES: 31,
          IOT_LINK_CMD_TURN_CLIENT_DISCONN_REG: 32,
          IOT_LINK_CMD_TURN_CLIENT_DISCONN_RES: 33,
          IOT_LINK_CMD_DEVICE_LOGINTURN_REQ: 34,
          IOT_LINK_CMD_DEVICE_LOGINTURN_RES: 35,
          IOT_LINK_CMD_CLIENT_LOGINTURN_REQ: 36,
          IOT_LINK_CMD_CLIENT_LOGINTURN_RES: 37,
          IOT_LINK_CMD_TURN_CLOSE: 38,
          IOT_LINK_CMD_ECHO_REQ: 39,
          IOT_LINK_CMD_ECHO_RES: 40,
          IOT_LINK_CMD_SID_P2S: 41,
          IOT_LINK_CMD_TURN_REQ2: 42,
          IOT_LINK_CMD_DATA_PRIOR: 43,
        }),
        (i.iot_hdr = function (e, t, n, r) {
          let i = 0;
          r && (i = r.length);
          let o = new ArrayBuffer(32 + i),
            a = new Uint8Array(o);
          for (let e = 0; e < 32; e++) a[e] = 0;
          (a[0] = parseInt("ab", 16)),
            (a[1] = parseInt("bc", 16)),
            (a[2] = parseInt("cd", 16)),
            (a[3] = parseInt("de", 16)),
            (a[4] = e),
            (a[5] = 0),
            (a[6] = 0),
            (a[7] = 0),
            (a[8] = 0),
            (a[9] = 0),
            (a[10] = 0),
            (a[11] = 1),
            (a[12] = t & c),
            (a[13] = (t >> 8) & c),
            (a[14] = (t >> 16) & c),
            (a[15] = (t >> 24) & c),
            (a[16] = n & c),
            (a[17] = (n >> 8) & c),
            (a[18] = (n >> 16) & c),
            (a[19] = (n >> 24) & c),
            (a[28] = i & c),
            (a[29] = (i >> 8) & c),
            (a[30] = (i >> 16) & c),
            (a[31] = (i >> 24) & c);
          for (let e = 0; e < i; e++) a[e + 32] = r[e];
          return a;
        }),
        (i.arq_open_conn = function (e) {
          let t = new ArrayBuffer(20),
            n = new Uint8Array(t),
            r = [
              "d9",
              "ff",
              "cc",
              "02",
              "8c",
              "38",
              "ee",
              "d2",
              "d1",
              "99",
              "ac",
              "60",
              "26",
              "94",
              "7f",
              "ae",
            ];
          for (let e = 0; e < 16; e++) n[e] = parseInt(r[e], 16);
          return (
            (n[16] = e & c),
            (n[17] = (e >> 8) & c),
            (n[18] = (e >> 16) & c),
            (n[19] = (e >> 24) & c),
            n
          );
        }),
        (i.arq_open_conn_res = function () {
          let e = new ArrayBuffer(16),
            t = new Uint8Array(e),
            n = [
              "96",
              "d5",
              "39",
              "0d",
              "12",
              "fc",
              "be",
              "8f",
              "47",
              "90",
              "d9",
              "32",
              "cc",
              "d8",
              "49",
              "f3",
            ];
          for (let e = 0; e < 16; e++) t[e] = parseInt(n[e], 16);
          return t;
        }),
        (i.arq_close_conn = function () {
          let e = new ArrayBuffer(16),
            t = new Uint8Array(e),
            n = [
              "2f",
              "f1",
              "f2",
              "73",
              "b2",
              "66",
              "21",
              "03",
              "cd",
              "23",
              "07",
              "52",
              "b9",
              "4a",
              "63",
              "e9",
            ];
          for (let e = 0; e < 16; e++) t[e] = parseInt(n[e], 16);
          return t;
        }),
        (i.iot_flow_stats = function () {
          let e = new ArrayBuffer(64),
            t = new Uint8Array(e);
          for (let e = 0; e < 64; e++) t[e] = 0;
          return t;
        }),
        (i.iot_ping = function (e) {
          let t = new ArrayBuffer(96),
            n = new Uint8Array(t);
          for (let e = 0; e < 96; e++) n[e] = 0;
          for (let t = 0; t < e.length; t++) n[t] = e.charCodeAt(t);
          return n;
        }),
        (i.iot_pong = function (e) {
          let t = new ArrayBuffer(68),
            n = new Uint8Array(t);
          (n[0] = e & c),
            (n[1] = (e >> 8) & c),
            (n[2] = (e >> 16) & c),
            (n[3] = (e >> 24) & c);
          for (let e = 4; e < 68; e++) n[e] = 0;
          return n;
        }),
        (i.iot_turn_req = function (e, t, n) {
          let r = new ArrayBuffer(40),
            i = new Uint8Array(r);
          for (let e = 0; e < 40; e++) i[e] = 0;
          for (let t = 0; t < e.length; t++) i[t] = e.charCodeAt(t);
          return (
            (i[32] = t & c),
            (i[33] = (t >> 8) & c),
            (i[34] = (t >> 16) & c),
            (i[35] = (t >> 24) & c),
            (i[36] = n & c),
            (i[37] = (n >> 8) & c),
            (i[38] = (n >> 16) & c),
            (i[39] = (n >> 24) & c),
            i
          );
        }),
        (i.iot_loginturn = function (e) {
          let t = new ArrayBuffer(4),
            n = new Uint8Array(t);
          return (
            (n[0] = e & c),
            (n[1] = (e >> 8) & c),
            (n[2] = (e >> 16) & c),
            (n[3] = (e >> 24) & c),
            n
          );
        }),
        (i.iot_open_req = function (e, t) {
          let n = new ArrayBuffer(8),
            r = new Uint8Array(n);
          return (
            (r[0] = e & c),
            (r[1] = (e >> 8) & c),
            (r[2] = (e >> 16) & c),
            (r[3] = (e >> 24) & c),
            (r[4] = t & c),
            (r[5] = (t >> 8) & c),
            (r[6] = (t >> 16) & c),
            (r[7] = (t >> 24) & c),
            r
          );
        }),
        (i.parse_iot_hdr = function (e) {
          let t = {};
          return (
            (t.magic =
              ((e[0] << 24) & o) |
              ((e[1] << 16) & a) |
              ((e[2] << 8) & _) |
              (e[3] & c)),
            (t.cmd =
              ((e[7] << 24) & o) |
              ((e[6] << 16) & a) |
              ((e[5] << 8) & _) |
              (e[4] & c)),
            (t.version =
              ((e[8] << 24) & o) |
              ((e[9] << 16) & a) |
              ((e[10] << 8) & _) |
              (e[11] & c)),
            (t.ticket =
              ((e[15] << 24) & o) |
              ((e[14] << 16) & a) |
              ((e[13] << 8) & _) |
              (e[12] & c)),
            (t.sid =
              ((e[19] << 24) & o) |
              ((e[18] << 16) & a) |
              ((e[17] << 8) & _) |
              (e[16] & c)),
            (t.transferlog =
              ((e[23] << 24) & o) |
              ((e[22] << 16) & a) |
              ((e[21] << 8) & _) |
              (e[20] & c)),
            (t.ecode =
              ((e[27] << 24) & o) |
              ((e[26] << 16) & a) |
              ((e[25] << 8) & _) |
              (e[24] & c)),
            (t.payload_len =
              ((e[31] << 24) & o) |
              ((e[30] << 16) & a) |
              ((e[29] << 8) & _) |
              (e[28] & c)),
            t
          );
        }),
        (i.parse_iot_turn_s2a = function (e) {
          let t = { uid: "" };
          t.sid =
            ((e[3] << 24) & o) |
            ((e[2] << 16) & a) |
            ((e[1] << 8) & _) |
            (e[0] & c);
          for (let n = 4; n < 32 && 0 != e[n]; n++)
            t.uid = t.uid + String.fromCharCode(e[n]);
          return (
            console.log(t.uid),
            (t.turntype =
              ((e[39] << 24) & o) |
              ((e[38] << 16) & a) |
              ((e[37] << 8) & _) |
              (e[36] & c)),
            (t.turnsvr_ip =
              String(e[43]) +
              "." +
              String(e[42]) +
              "." +
              String(e[41]) +
              "." +
              String(e[40])),
            (t.turnsvr_ipv6 = ""),
            (t.turnsvr_port =
              ((e[63] << 24) & o) |
              ((e[62] << 16) & a) |
              ((e[61] << 8) & _) |
              (e[60] & c)),
            t
          );
        }),
        (i.parse_iot_login_res = function (e) {
          let t = {};
          return (
            (t.sid =
              ((e[3] << 24) & o) |
              ((e[2] << 16) & a) |
              ((e[1] << 8) & _) |
              (e[0] & c)),
            t
          );
        }),
        (i.parse_iot_open_res = function (e) {
          let t = {};
          return (
            (t.sid =
              ((e[3] << 24) & o) |
              ((e[2] << 16) & a) |
              ((e[1] << 8) & _) |
              (e[0] & c)),
            (t.linktype =
              ((e[7] << 24) & o) |
              ((e[6] << 16) & a) |
              ((e[5] << 8) & _) |
              (e[4] & c)),
            t
          );
        });
      const s = i,
        l = {};
      var u = [
        parseInt("ce", 16),
        parseInt("fa", 16),
        parseInt("ef", 16),
        parseInt("fe", 16),
      ];
      (l.socklist = []),
        (l.onopen = null),
        (l.onclose = null),
        (l.onerror = null),
        (l.ondata = null);
      var d = function (e) {
          for (var t = 0; t < l.socklist.length; t++)
            if (l.socklist[t].key == e) return l.socklist[t];
          return null;
        },
        f = function (e) {
          for (var t = 0; t < l.socklist.length; t++)
            if (l.socklist[t].sock == e) return l.socklist[t];
          return null;
        };
      (l.arq_error_code = {
        ARQ_CONN_SUCCESS: 0,
        ARQ_CONN_FAIL: 1,
        ARQ_CONN_REMOTE_CLOSE: 2,
        ARQ_CONN_CLOSE: 3,
      }),
        (l.init = function (e, t, n, r) {
          (l.onopen = e), (l.onclose = t), (l.onerror = n), (l.ondata = r);
        }),
        (l.connect = function (e, t, n, r, i) {
          var o = (i ? "wss" : "ws") + "://" + t + ":" + n;
          console.log(o);
          var a = {
            key: e,
            ip: t,
            port: n,
            sock: 0,
            timer: 0,
            ctx: r,
            connected: 0,
            firstdata: 0,
            req_timer: 0,
            time: 0,
          };
          (a.sock = new WebSocket(o)),
            a.sock.addEventListener("open", function (t) {
              (a.sock.binaryType = "arraybuffer"),
                console.log("websocket opened");
              var n = s.arq_open_conn(e);
              a.sock.send(n),
                (a.time = Date.parse(new Date())),
                (a.req_timer = setInterval(function () {
                  var e = (Date.parse(new Date()) - a.time) / 1e3;
                  console.log(e), e >= 10 && a.close();
                }, 1e3));
            }),
            a.sock.addEventListener("close", function (e) {
              if (
                (console.log("onclose"),
                console.log(e),
                a.req_timer > 0 &&
                  (console.log("close time out timer"),
                  clearInterval(a.req_timer),
                  (a.req_timer = 0)),
                null != l.onclose)
              ) {
                var t = f(e.target);
                null != t && l.onclose(t.key, t.ctx, e.code, e.reason);
              }
            }),
            a.sock.addEventListener("error", function (e) {
              console.log("onerror"), console.log(e);
            }),
            a.sock.addEventListener("message", function (t) {
              var n = f(t.target);
              if (null != n) {
                for (
                  var i = new Uint8Array(t.data),
                    o = (new Int8Array(t.data).slice(32), 0);
                  o < 4 && i[o] == u[o];
                  o++
                )
                  return;
                var _ = s.arq_open_conn_res(),
                  c = 1;
                for (o = 0; o < _.length; o++)
                  if (_[o] != i[o]) {
                    c = 0;
                    break;
                  }
                if ((0 == n.connected && n.connected, 0 == n.firstdata))
                  return (
                    a.req_timer > 0 &&
                      (console.log("close arq timer"),
                      clearInterval(a.req_timer),
                      (a.req_timer = 0)),
                    (n.firstdata = 1),
                    void (
                      null != l.onopen &&
                      (1 == c
                        ? l.onopen(e, r, l.arq_error_code.ARQ_CONN_SUCCESS)
                        : l.onopen(e, r, l.arq_error_code.ARQ_CONN_FAIL))
                    )
                  );
                null != l.ondata && l.ondata(e, r, i);
              }
            }),
            l.socklist.push(a);
        }),
        (l.disconnect = function (e) {
          var t = d(e);
          null != t && t.sock.close(),
            (function (e) {
              for (var t = 0; t < l.socklist.length; t++)
                if (l.socklist[t].key == e) return void l.socklist.splice(t, 1);
            })(e);
        }),
        (l.send = function (e, t) {
          var n = d(e);
          if (null != n) {
            for (
              var r = new ArrayBuffer(8), i = new Uint8Array(r), o = 0;
              o < 4;
              o++
            )
              i[o] = u[o];
            return (
              (i[4] = t.length & parseInt("ff", 16)),
              (i[5] = (t.length >> 8) & parseInt("ff", 16)),
              (i[6] = (t.length >> 16) & parseInt("ff", 16)),
              (i[7] = (t.length >> 24) & parseInt("ff", 16)),
              n.sock && 1 == n.sock.readyState
                ? (n.sock.send(i), n.sock.send(t), 1)
                : 0
            );
          }
          return 0;
        });
      const h = l,
        p = {};
      parseInt("FF00000000000000", 16),
        parseInt("FF000000000000", 16),
        parseInt("FF0000000000", 16),
        parseInt("FF00000000", 16);
      var P = parseInt("FF000000", 16),
        m = parseInt("FF0000", 16),
        v = parseInt("FF00", 16),
        E = parseInt("FF", 16);
      (p.APP_PROTO_MAGIC = parseInt("4b503250", 16)),
        (p.APP_PROTO_VERSION = 1),
        (p.APP_PROTO_AES128_KEY = "~!JUAN*&Vision-="),
        (p.APP_PROTO_PARAM_AUTH_NAME_STRLEN = 32),
        (p.APP_PROTO_PARAM_AUTH_PASSWD_STRLEN = 32),
        (p.APP_PROTO_PARAM_AUTH_NAME_STRLEN2 = 1024),
        (p.APP_PROTO_PARAM_AUTH_PASSWD_STRLEN2 = 1024),
        (p.APP_PROTO_PARAM_NONCE_STRLEN = 64),
        (p.APP_PROTO_PARAM_AUTH_INFO_STRLEN = 64),
        (p.APP_PROTO_PARAM_SIGNATURE_STRLEN = 64),
        (p.APP_PROTO_PARAM_LIVE_CAM_DESC_STRLEN = 32),
        (p.APP_PROTO_PARAM_SETUP_STRLEN = 2048),
        (p.PROC_FRAME_MAGIC = parseInt("4652414d", 16)),
        (p.PROC_FRAME_MAGIC2 = parseInt("4652414E", 16)),
        (p.PROC_FRAME_VERSION = parseInt("01000000", 16)),
        (p.hdr_len = 24),
        (p.p2p_head_len = 48),
        (p.live_head_len = 8),
        (p.live_param_len = 24),
        (p.rec_search_rows = 100),
        (p.p2p_frame_type = { live: 0, replay: 1 }),
        (p.reply_cmd = {
          PROC_REPLAY_CMD_START: 3,
          PROC_REPLAY_CMD_PAUSE: 4,
          PROC_REPLAY_CMD_CONTINUE: 5,
          PROC_REPLAY_CMD_STOP: 2,
        }),
        (p.frame_head_type = {
          PROC_FRAME_HEAD_TYPE_LIVE: 0,
          PROC_FRAME_HEAD_TYPE_REPLAY: 1,
          PROC_FRAME_HEAD_TYPE_VOP2P: 2,
        }),
        (p.frame_type = {
          PROC_FRAME_TYPE_AUDIO: 0,
          PROC_FRAME_TYPE_IFRAME: 1,
          PROC_FRAME_TYPE_PFRAME: 2,
          PROC_FRAME_TYPE_OOB: 15,
        }),
        (p.api_cmd = {
          APP_PROTO_CMD_AUTH_REQ: 10,
          APP_PROTO_CMD_AUTH_RSP: 11,
          APP_PROTO_CMD_NONCE_REQ: 120,
          APP_PROTO_CMD_NONCE_RSP: 121,
          APP_PROTO_CMD_AUTH2_REQ: 130,
          APP_PROTO_CMD_AUTH2_RSP: 131,
          APP_PROTO_CMD_AUTH3_REQ: 140,
          APP_PROTO_CMD_AUTH3_RSP: 141,
          APP_PROTO_CMD_PTZ_REQ: 20,
          APP_PROTO_CMD_PTZ_RSP: 21,
          APP_PROTO_CMD_LIVE_REQ: 30,
          APP_PROTO_CMD_LIVE_RSP: 31,
          APP_PROTO_CMD_FIND_START_REQ: 90,
          APP_PROTO_CMD_FIND_START_RSP: 91,
          APP_PROTO_CMD_FIND_NEXT_REQ: 100,
          APP_PROTO_CMD_FIND_NEXT_RSP: 101,
          APP_PROTO_CMD_FIND_STOP_REQ: 110,
          APP_PROTO_CMD_FIND_STOP_RSP: 111,
          APP_PROTO_CMD_REPLAY_REQ: 40,
          APP_PROTO_CMD_REPLAY_RSP: 41,
          APP_PROTO_CMD_VCON_REQ: 50,
          APP_PROTO_CMD_VCON_RSP: 51,
          APP_PROTO_CMD_VOP2P_REQ: 60,
          APP_PROTO_CMD_VOP2P_RSP: 61,
          APP_PROTO_CMD_ALARM_REQ: 70,
          APP_PROTO_CMD_ALARM_RSP: 71,
          APP_PROTO_CMD_SETUP_REQ: 80,
          APP_PROTO_CMD_SETUP_RSP: 81,
          APP_PROTO_PARAM_LIVE_CMD_STOP: 1,
          APP_PROTO_PARAM_LIVE_CMD_START: 2,
          APP_PROTO_PARAM_LIVE_CMD_CHANGE_STREAM: 3,
          APP_PROTO_PARAM_REPLAY_CMD_SEARCH: 1,
          APP_PROTO_PARAM_REPLAY_CMD_STOP: 2,
          APP_PROTO_PARAM_REPLAY_CMD_START: 3,
          APP_PROTO_PARAM_REPLAY_CMD_PAUSE: 4,
          APP_PROTO_PARAM_REPLAY_CMD_CONTINUE: 5,
          APP_PROTO_DATA_FIND_FILE_START: 1,
          APP_PROTO_DATA_FIND_FILE_NEXT: 2,
          APP_PROTO_DATA_FIND_FILE_STOP: 3,
          APP_PROTO_PARAM_VCON_CMD_CREATE: 1,
          APP_PROTO_PARAM_VCON_CMD_DATA: 2,
          APP_PROTO_PARAM_VCON_CMD_DESTROY: 3,
          APP_PROTO_PARAM_VCON_APP_NAME_STRLEN: 32,
          APP_PROTO_PARAM_VOP2P_CMD_CALL: 1,
          APP_PROTO_PARAM_VOP2P_CMD_HANGUP: 2,
          APP_PROTO_CMD_SETUP_REQ: 80,
          APP_PROTO_CMD_SETUP_RSP: 81,
          APP_PROTO_CMD_SETUP2_REQ: 150,
          APP_PROTO_CMD_SETUP2_RSP: 151,
        }),
        (p.api_err_code = {
          APP_PROTO_SUCCESS: 0,
          APP_PROTO_AUTH_FAILED: -11,
          APP_PROTO_OPEN_STREAM_FAILED: -21,
          APP_PROTO_CLOSE_STREAM_FAILED: -22,
          APP_PROTO_VOP2P_CALL_FAILED: -31,
          APP_PROTO_VOP2P_HANGUP_FAILED: -32,
          APP_PROTO_PTZ_CONTROL_FAILED: -41,
          APP_PROTO_FIND_START_FAILED: -51,
          APP_PROTO_FIND_NEXT_FAILED: -52,
          APP_PROTO_FIND_STOP_FAILED: -53,
          APP_PROTO_REPLAY_SEARCH_FAILED: -61,
          APP_PROTO_REPLAY_STOP_FAILED: -71,
          APP_PROTO_REPLAY_START_FAILED: -72,
          APP_PROTO_REPLAY_PAUSE_FAILED: -73,
          APP_PROTO_REPLAY_RESUME_FAILED: -74,
          APP_PROTO_REMOTE_SETUP_FAILED: -81,
        }),
        (p.api_kp2p_code = {
          KP2P_ERR_SUCCESS: 0,
          KP2P_ERR_TIMEOUT: -2,
          KP2P_ERR_CLOSE_BY_SELF: -10,
          KP2P_ERR_CLOSE_BY_PEER: -11,
          KP2P_ERR_RESOLVE_FAILED: -12,
          KP2P_ERR_CONNECT_FAILED: -13,
          KP2P_ERR_SEND_FAILED: -14,
          KP2P_ERR_P2PSEVER_TIME_OUT: -15,
          KP2P_ERR_AUTH_FAILED: -20,
          KP2P_ERR_GET_NONCE_FAILED: -21,
          KP2P_ERR_AUTH2_FAILED: -22,
          KP2P_ERR_PTZ_CTRL_FAILED: -30,
          KP2P_ERR_OPEN_STREAM_FAILED: -40,
          KP2P_ERR_REC_SEARCH_FAILED: -50,
          KP2P_ERR_REC_PLAY_FAILED: -51,
          KP2P_ERR_VOP2P_CALL_FAILED: -60,
          KP2P_ERR_REMOTE_SETUP_FAILED: -70,
        }),
        (p.connect_type = {
          CONNECT_TYPE_NONE: 0,
          CONNECT_TYPE_IP_UDP: 1,
          CONNECT_TYPE_IP_TCP: 2,
          CONNECT_TYPE_HOLE: 3,
          CONNECT_TYPE_TURN_UDP: 4,
          CONNECT_TYPE_TURN_TCP: 5,
        }),
        (p.ptz_action = {
          KP2P_PTZ_CONTROL_ACTION_STOP: 0,
          KP2P_PTZ_CONTROL_ACTION_AUTO: 1,
          KP2P_PTZ_CONTROL_ACTION_UP: 2,
          KP2P_PTZ_CONTROL_ACTION_DOWN: 3,
          KP2P_PTZ_CONTROL_ACTION_LEFT: 4,
          KP2P_PTZ_CONTROL_ACTION_RIGHT: 5,
          KP2P_PTZ_CONTROL_ACTION_IRIS_OPEN: 6,
          KP2P_PTZ_CONTROL_ACTION_IRIS_CLOSE: 7,
          KP2P_PTZ_CONTROL_ACTION_ZOOM_IN: 8,
          KP2P_PTZ_CONTROL_ACTION_ZOOM_OUT: 9,
          KP2P_PTZ_CONTROL_ACTION_FOCUS_F: 10,
          KP2P_PTZ_CONTROL_ACTION_FOCUS_N: 11,
          KP2P_PTZ_CONTROL_ACTION_AUX: 12,
          KP2P_PTZ_CONTROL_ACTION_PRESET_SET: 13,
          KP2P_PTZ_CONTROL_ACTION_PRESET_GO: 14,
          KP2P_PTZ_CONTROL_ACTION_PRESET_CLEAR: 15,
        }),
        (p.api_hdr = function (e, t, n) {
          var r = 0;
          n && (r = n.length);
          for (
            var i = new ArrayBuffer(p.hdr_len + r),
              o = new Uint8Array(i),
              a = 0;
            a < p.hdr_len;
            a++
          )
            o[a] = 0;
          (o[0] = p.APP_PROTO_MAGIC & E),
            (o[1] = (p.APP_PROTO_MAGIC >> 8) & E),
            (o[2] = (p.APP_PROTO_MAGIC >> 16) & E),
            (o[3] = (p.APP_PROTO_MAGIC >> 24) & E),
            (o[4] = p.APP_PROTO_VERSION & E),
            (o[5] = (p.APP_PROTO_VERSION >> 8) & E),
            (o[6] = (p.APP_PROTO_VERSION >> 16) & E),
            (o[7] = (p.APP_PROTO_VERSION >> 24) & E),
            (o[8] = t & E),
            (o[9] = (t >> 8) & E),
            (o[10] = (t >> 16) & E),
            (o[11] = (t >> 24) & E),
            (o[12] = e & E),
            (o[13] = (e >> 8) & E),
            (o[14] = (e >> 16) & E),
            (o[15] = (e >> 24) & E),
            (o[16] = 0),
            (o[17] = 0),
            (o[18] = 0),
            (o[19] = 0),
            (o[20] = n.length & E),
            (o[21] = (n.length >> 8) & E),
            (o[22] = (n.length >> 16) & E),
            (o[23] = (n.length >> 24) & E);
          for (a = 0; a < n.length; a++) o[p.hdr_len + a] = n[a];
          return o;
        }),
        (p.api_hdr_v2 = function (e, t, n) {
          var r = 0;
          n && (r = n.length);
          var i = new ArrayBuffer(p.hdr_len + r),
            o = new Uint8Array(i);
          for (a = 0; a < p.hdr_len; a++) o[a] = 0;
          (o[0] = p.APP_PROTO_MAGIC & E),
            (o[1] = (p.APP_PROTO_MAGIC >> 8) & E),
            (o[2] = (p.APP_PROTO_MAGIC >> 16) & E),
            (o[3] = (p.APP_PROTO_MAGIC >> 24) & E),
            (o[4] = p.APP_PROTO_VERSION_V2 & E),
            (o[5] = (p.APP_PROTO_VERSION_V2 >> 8) & E),
            (o[6] = (p.APP_PROTO_VERSION_V2 >> 16) & E),
            (o[7] = (p.APP_PROTO_VERSION_V2 >> 24) & E),
            (o[8] = t & E),
            (o[9] = (t >> 8) & E),
            (o[10] = (t >> 16) & E),
            (o[11] = (t >> 24) & E),
            (o[12] = e & E),
            (o[13] = (e >> 8) & E),
            (o[14] = (e >> 16) & E),
            (o[15] = (e >> 24) & E),
            (o[16] = 0),
            (o[17] = 0),
            (o[18] = 0),
            (o[19] = 0),
            (o[20] = n.length & E),
            (o[21] = (n.length >> 8) & E),
            (o[22] = (n.length >> 16) & E),
            (o[23] = (n.length >> 24) & E);
          for (var a = 0; a < n.length; a++) o[p.hdr_len + a] = n[a];
          return o;
        }),
        (p.auth_req = function (e, t) {
          for (
            var n =
                p.APP_PROTO_PARAM_AUTH_NAME_STRLEN +
                p.APP_PROTO_PARAM_AUTH_PASSWD_STRLEN,
              r = new ArrayBuffer(n),
              i = new Uint8Array(r),
              o = 0;
            o < n;
            o++
          )
            i[o] = 0;
          for (o = 0; o < e.length; o += 2)
            i[o / 2] = parseInt(e.substr(o, 2), 16);
          for (o = 0; o < t.length; o += 2)
            i[p.APP_PROTO_PARAM_AUTH_NAME_STRLEN + o / 2] = parseInt(
              t.substr(o, 2),
              16
            );
          return i;
        }),
        (p.auth_req3 = function (e, t) {
          for (
            var n =
                p.APP_PROTO_PARAM_AUTH_NAME_STRLEN2 +
                p.APP_PROTO_PARAM_AUTH_PASSWD_STRLEN2,
              r = new ArrayBuffer(n),
              i = new Uint8Array(r),
              o = 0;
            o < n;
            o++
          )
            i[o] = 0;
          for (o = 0; o < e.length; o++) i[o] = e.charCodeAt(o);
          for (o = 0; o < t.length; o++)
            i[p.APP_PROTO_PARAM_AUTH_NAME_STRLEN2 + o] = t.charCodeAt(o);
          return i;
        }),
        (p.live_req = function (e, t, n) {
          for (
            var r = new ArrayBuffer(12), i = new Uint8Array(r), o = 0;
            o < 12;
            o++
          )
            i[o] = 0;
          return (
            (i[0] = e & E),
            (i[1] = (e >> 8) & E),
            (i[2] = (e >> 16) & E),
            (i[3] = (e >> 24) & E),
            (i[4] = t & E),
            (i[5] = (t >> 8) & E),
            (i[6] = (t >> 16) & E),
            (i[7] = (t >> 24) & E),
            (i[8] = n & E),
            (i[9] = (n >> 8) & E),
            (i[10] = (n >> 16) & E),
            (i[11] = (n >> 24) & E),
            i
          );
        }),
        (p.vop2p_call_req = function (e, t) {
          for (
            var n = new ArrayBuffer(8), r = new Uint8Array(n), i = 0;
            i < 8;
            i++
          )
            r[i] = 0;
          return (
            (r[0] = t & E),
            (r[1] = (t >> 8) & E),
            (r[2] = (t >> 16) & E),
            (r[3] = (t >> 24) & E),
            (r[4] = e & E),
            (r[5] = (e >> 8) & E),
            (r[6] = (e >> 16) & E),
            (r[7] = (e >> 24) & E),
            r
          );
        }),
        (p.vop2p_send_req = function (e, t, n, r, i, o, a, _, c) {
          for (
            var s = 64 + c,
              l = new ArrayBuffer(s),
              u = new Uint8Array(l),
              d = 0;
            d < s;
            d++
          )
            u[d] = 0;
          (u[0] = p.PROC_FRAME_MAGIC & E),
            (u[1] = (p.PROC_FRAME_MAGIC >> 8) & E),
            (u[2] = (p.PROC_FRAME_MAGIC >> 16) & E),
            (u[3] = (p.PROC_FRAME_MAGIC >> 24) & E),
            (u[4] = p.PROC_FRAME_VERSION & E),
            (u[5] = (p.PROC_FRAME_VERSION >> 8) & E),
            (u[6] = (p.PROC_FRAME_VERSION >> 16) & E),
            (u[7] = (p.PROC_FRAME_VERSION >> 24) & E),
            (u[8] = p.frame_head_type.PROC_FRAME_HEAD_TYPE_VOP2P & E),
            (u[9] = (p.frame_head_type.PROC_FRAME_HEAD_TYPE_VOP2P >> 8) & E),
            (u[10] = (p.frame_head_type.PROC_FRAME_HEAD_TYPE_VOP2P >> 16) & E),
            (u[11] = (p.frame_head_type.PROC_FRAME_HEAD_TYPE_VOP2P >> 24) & E),
            (u[12] = c & E),
            (u[13] = (c >> 8) & E),
            (u[14] = (c >> 16) & E),
            (u[15] = (c >> 24) & E),
            (u[16] = t & E),
            (u[17] = (t >> 8) & E),
            (u[18] = (t >> 16) & E),
            (u[19] = (t >> 24) & E),
            (u[20] = (t >> 32) & E),
            (u[21] = (t >> 40) & E),
            (u[22] = (t >> 48) & E),
            (u[23] = (t >> 56) & E),
            (u[24] = p.frame_type.PROC_FRAME_TYPE_AUDIO & E),
            (u[25] = (p.frame_type.PROC_FRAME_TYPE_AUDIO >> 8) & E),
            (u[26] = (p.frame_type.PROC_FRAME_TYPE_AUDIO >> 16) & E),
            (u[27] = (p.frame_type.PROC_FRAME_TYPE_AUDIO >> 24) & E),
            (u[28] = e & E),
            (u[29] = (e >> 8) & E),
            (u[30] = (e >> 16) & E),
            (u[31] = (e >> 24) & E);
          for (d = 0; d < n.length; d++) u[d + 32] = n.charCodeAt(d);
          (u[40] = r & E),
            (u[41] = (r >> 8) & E),
            (u[42] = (r >> 16) & E),
            (u[43] = (r >> 24) & E),
            (u[44] = i & E),
            (u[45] = (i >> 8) & E),
            (u[46] = (i >> 16) & E),
            (u[47] = (i >> 24) & E),
            (u[48] = o & E),
            (u[49] = (o >> 8) & E),
            (u[50] = (o >> 16) & E),
            (u[51] = (o >> 24) & E),
            (u[52] = a & E),
            (u[53] = (a >> 8) & E),
            (u[54] = (a >> 16) & E),
            (u[55] = (a >> 24) & E);
          for (d = 0; d < c; d++) u[d + 64] = _[d];
          return u;
        }),
        (p.time_struct = function (e) {
          var t = new ArrayBuffer(24),
            n = new Uint8Array(t),
            r = e.getFullYear(),
            i = e.getMonth() + 1,
            o = e.getDate(),
            a = e.getHours(),
            _ = e.getMinutes(),
            c = e.getSeconds();
          return (
            (n[0] = r & E),
            (n[1] = (r >> 8) & E),
            (n[2] = (r >> 16) & E),
            (n[3] = (r >> 24) & E),
            (n[4] = i & E),
            (n[5] = (i >> 8) & E),
            (n[6] = (i >> 16) & E),
            (n[7] = (i >> 24) & E),
            (n[8] = o & E),
            (n[9] = (o >> 8) & E),
            (n[10] = (o >> 16) & E),
            (n[11] = (o >> 24) & E),
            (n[12] = a & E),
            (n[13] = (a >> 8) & E),
            (n[14] = (a >> 16) & E),
            (n[15] = (a >> 24) & E),
            (n[16] = _ & E),
            (n[17] = (_ >> 8) & E),
            (n[18] = (_ >> 16) & E),
            (n[19] = (_ >> 24) & E),
            (n[20] = c & E),
            (n[21] = (c >> 8) & E),
            (n[22] = (c >> 16) & E),
            (n[23] = (c >> 24) & E),
            n
          );
        }),
        (p.find_file_cond = function (e, t, n, r) {
          var i = new ArrayBuffer(56),
            o = new Uint8Array(i),
            a = p.time_struct(n),
            _ = p.time_struct(r);
          (o[0] = e & E),
            (o[1] = (e >> 8) & E),
            (o[2] = (e >> 16) & E),
            (o[3] = (e >> 24) & E),
            (o[4] = t & E),
            (o[5] = (t >> 8) & E),
            (o[6] = (t >> 16) & E),
            (o[7] = (t >> 24) & E);
          for (var c = 0; c < a.length; c++) o[c + 8] = a[c];
          for (c = 0; c < _.length; c++) o[c + 32] = _[c];
          return o;
        }),
        (p.find_next_req = function (e) {
          var t = new ArrayBuffer(4),
            n = new Uint8Array(t);
          return (
            (n[0] = e & E),
            (n[1] = (e >> 8) & E),
            (n[2] = (e >> 16) & E),
            (n[3] = (e >> 24) & E),
            n
          );
        }),
        (p.find_stop_req = function (e) {
          var t = new ArrayBuffer(4),
            n = new Uint8Array(t);
          return (
            (n[0] = e & E),
            (n[1] = (e >> 8) & E),
            (n[2] = (e >> 16) & E),
            (n[3] = (e >> 24) & E),
            n
          );
        }),
        (p.find_file_req_2 = function (e, t, n, r, i, o, a, _) {
          for (
            var c = new ArrayBuffer(52), s = new Uint8Array(c), l = 0;
            l < s.length;
            l++
          )
            s[l] = 0;
          if (
            ((s[0] = e & E),
            (s[1] = (e >> 8) & E),
            (s[2] = (e >> 16) & E),
            (s[3] = (e >> 24) & E),
            (s[4] = n & E),
            (s[5] = (n >> 8) & E),
            (s[6] = (n >> 16) & E),
            (s[7] = (n >> 24) & E),
            null != t)
          )
            for (l = 0; l < t.length; l++)
              t[l] > 0 &&
                (s[8 + parseInt(l / 8)] =
                  s[8 + parseInt(l / 8)] | (1 << l % 8));
          return (
            (s[24] = r & E),
            (s[25] = (r >> 8) & E),
            (s[26] = (r >> 16) & E),
            (s[27] = (r >> 24) & E),
            (s[32] = i & E),
            (s[33] = (i >> 8) & E),
            (s[34] = (i >> 16) & E),
            (s[35] = (i >> 24) & E),
            (s[36] = o & E),
            (s[37] = (o >> 8) & E),
            (s[38] = (o >> 16) & E),
            (s[39] = (o >> 24) & E),
            (s[44] = a & E),
            (s[45] = (a >> 8) & E),
            (s[46] = (a >> 16) & E),
            (s[47] = (a >> 24) & E),
            (s[48] = _ & E),
            (s[49] = (_ >> 8) & E),
            (s[50] = (_ >> 16) & E),
            (s[51] = (_ >> 24) & E),
            s
          );
        }),
        (p.ptz_req = function (e, t, n, r) {
          var i = new ArrayBuffer(16),
            o = new Uint8Array(i);
          return (
            (o[0] = e & E),
            (o[1] = (e >> 8) & E),
            (o[2] = (e >> 16) & E),
            (o[3] = (e >> 24) & E),
            (o[4] = t & E),
            (o[5] = (t >> 8) & E),
            (o[6] = (t >> 16) & E),
            (o[7] = (t >> 24) & E),
            (o[8] = n & E),
            (o[9] = (n >> 8) & E),
            (o[10] = (n >> 16) & E),
            (o[11] = (n >> 24) & E),
            (o[12] = r & E),
            (o[13] = (r >> 8) & E),
            (o[14] = (r >> 16) & E),
            (o[15] = (r >> 24) & E),
            o
          );
        }),
        (p.parse_ptz_req = function (e) {
          var t = { len: 4 };
          return (
            (t.result =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            t
          );
        }),
        (p.parse_search_res = function (e) {
          var t = { len: 52 };
          return (
            (t.replay_cmd =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            (t.search_type =
              ((e[23] << 24) & P) |
              ((e[22] << 16) & m) |
              ((e[21] << 8) & v) |
              (e[20] & E)),
            (t.begin_time =
              ((e[31] << 24) & P) |
              ((e[30] << 16) & m) |
              ((e[29] << 8) & v) |
              (e[28] & E)),
            (t.end_time =
              ((e[35] << 24) & P) |
              ((e[34] << 16) & m) |
              ((e[33] << 8) & v) |
              (e[32] & E)),
            (t.file_index =
              ((e[43] << 24) & P) |
              ((e[42] << 16) & m) |
              ((e[41] << 8) & v) |
              (e[40] & E)),
            (t.file_count =
              ((e[47] << 24) & P) |
              ((e[46] << 16) & m) |
              ((e[45] << 8) & v) |
              (e[44] & E)),
            (t.file_total =
              ((e[51] << 24) & P) |
              ((e[50] << 16) & m) |
              ((e[49] << 8) & v) |
              (e[48] & E)),
            t
          );
        }),
        (p.parse_record_file = function (e) {
          var t = { len: 20 };
          return (
            (t.channel =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            (t.file_type =
              ((e[7] << 24) & P) |
              ((e[6] << 16) & m) |
              ((e[5] << 8) & v) |
              (e[4] & E)),
            (t.file_begintime =
              ((e[11] << 24) & P) |
              ((e[10] << 16) & m) |
              ((e[9] << 8) & v) |
              (e[8] & E)),
            (t.file_endtime =
              ((e[15] << 24) & P) |
              ((e[14] << 16) & m) |
              ((e[13] << 8) & v) |
              (e[12] & E)),
            (t.file_quality =
              ((e[19] << 24) & P) |
              ((e[18] << 16) & m) |
              ((e[17] << 8) & v) |
              (e[16] & E)),
            t
          );
        }),
        (p.get_api_magic = function (e) {
          return (
            ((e[3] << 24) & P) |
            ((e[2] << 16) & m) |
            ((e[1] << 8) & v) |
            (e[0] & E)
          );
        }),
        (p.parse_api_hdr = function (e) {
          var t = {};
          return (
            (t.magic =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            (t.version =
              ((e[7] << 24) & P) |
              ((e[6] << 16) & m) |
              ((e[5] << 8) & v) |
              (e[4] & E)),
            (t.ticket =
              ((e[11] << 24) & P) |
              ((e[10] << 16) & m) |
              ((e[9] << 8) & v) |
              (e[8] & E)),
            (t.cmd =
              ((e[15] << 24) & P) |
              ((e[14] << 16) & m) |
              ((e[13] << 8) & v) |
              (e[12] & E)),
            (t.result =
              ((e[19] << 24) & P) |
              ((e[18] << 16) & m) |
              ((e[17] << 8) & v) |
              (e[16] & E)),
            (t.size =
              ((e[23] << 24) & P) |
              ((e[22] << 16) & m) |
              ((e[21] << 8) & v) |
              (e[20] & E)),
            t
          );
        }),
        (p.parse_auth_res = function (e) {
          var t = {};
          return (
            (t.reserve =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            t
          );
        }),
        (p.parse_auth3_res = function (e) {
          return e;
        }),
        (p.parse_live_res = function (e) {
          var t = { cam_desc: "" };
          (t.channel =
            ((e[3] << 24) & P) |
            ((e[2] << 16) & m) |
            ((e[1] << 8) & v) |
            (e[0] & E)),
            (t.streamid =
              ((e[7] << 24) & P) |
              ((e[6] << 16) & m) |
              ((e[5] << 8) & v) |
              (e[4] & E)),
            (t.live_cmd =
              ((e[11] << 24) & P) |
              ((e[10] << 16) & m) |
              ((e[9] << 8) & v) |
              (e[8] & E));
          for (
            var n = 12;
            n < p.APP_PROTO_PARAM_LIVE_CAM_DESC_STRLEN && 0 != e[n];
            n++
          )
            t.cam_desc = t.cam_desc + String.fromCharCode(e[n]);
          return t;
        }),
        (p.parse_p2p_frame_head = function (e) {
          var t = {};
          function n(e, t) {
            for (; t > e.length; ) e = "0" + e;
            return e;
          }
          (t.magic =
            ((e[3] << 24) & P) |
            ((e[2] << 16) & m) |
            ((e[1] << 8) & v) |
            (e[0] & E)),
            (t.version =
              ((e[7] << 24) & P) |
              ((e[6] << 16) & m) |
              ((e[5] << 8) & v) |
              (e[4] & E)),
            (t.headtype =
              ((e[11] << 24) & P) |
              ((e[10] << 16) & m) |
              ((e[9] << 8) & v) |
              (e[8] & E)),
            (t.framesize =
              ((e[15] << 24) & P) |
              ((e[14] << 16) & m) |
              ((e[13] << 8) & v) |
              (e[12] & E)),
            (t.len = 24);
          var r =
            n(e[23].toString(2), 8) +
            n(e[22].toString(2), 8) +
            n(e[21].toString(2), 8) +
            n(e[20].toString(2), 8) +
            n(e[19].toString(2), 8) +
            n(e[18].toString(2), 8) +
            n(e[17].toString(2), 8) +
            n(e[16].toString(2), 8);
          return (t.ts_ms = parseInt(r, 2)), t;
        }),
        (p.parse_p2p_frame_head_2 = function (e) {
          var t = {};
          return (
            (t.margic =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            (t.frame_seq =
              ((e[7] << 24) & P) |
              ((e[6] << 16) & m) |
              ((e[5] << 8) & v) |
              (e[4] & E)),
            (t.len = 40),
            t
          );
        }),
        (p.parse_live_head = function (e) {
          var t = {};
          return (
            (t.frametype =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            (t.channel =
              ((e[7] << 24) & P) |
              ((e[6] << 16) & m) |
              ((e[5] << 8) & v) |
              (e[4] & E)),
            (t.len = 8),
            t
          );
        }),
        (p.parse_oob = function (e) {
          var t = {},
            n = e.subarray(40);
          return (
            (t.centerX =
              ((n[3] << 24) & P) |
              ((n[2] << 16) & m) |
              ((n[1] << 8) & v) |
              (n[0] & E)),
            (t.centerY =
              ((n[7] << 24) & P) |
              ((n[6] << 16) & m) |
              ((n[5] << 8) & v) |
              (n[4] & E)),
            (t.radius =
              ((n[11] << 24) & P) |
              ((n[10] << 16) & m) |
              ((n[9] << 8) & v) |
              (n[8] & E)),
            (t.angleX =
              ((n[15] << 24) & P) |
              ((n[14] << 16) & m) |
              ((n[13] << 8) & v) |
              (n[12] & E)),
            (t.angleY =
              ((n[19] << 24) & P) |
              ((n[18] << 16) & m) |
              ((n[17] << 8) & v) |
              (n[16] & E)),
            (t.angleZ =
              ((n[23] << 24) & P) |
              ((n[22] << 16) & m) |
              ((n[21] << 8) & v) |
              (n[20] & E)),
            t
          );
        }),
        (p.parse_video_param = function (e) {
          for (var t = { enc: "" }, n = 0; n < 8 && 0 != e[n]; n++)
            t.enc = t.enc + String.fromCharCode(e[n]);
          return (
            (t.fps =
              ((e[11] << 24) & P) |
              ((e[10] << 16) & m) |
              ((e[9] << 8) & v) |
              (e[8] & E)),
            (t.width =
              ((e[15] << 24) & P) |
              ((e[14] << 16) & m) |
              ((e[13] << 8) & v) |
              (e[12] & E)),
            (t.height =
              ((e[19] << 24) & P) |
              ((e[18] << 16) & m) |
              ((e[17] << 8) & v) |
              (e[16] & E)),
            (t.reserv =
              ((e[23] << 24) & P) |
              ((e[22] << 16) & m) |
              ((e[21] << 8) & v) |
              (e[20] & E)),
            "H265" === t.enc ? (t.len = 24) : "H264" === t.enc && (t.len = 24),
            t
          );
        }),
        (p.parse_audio_param = function (e) {
          for (var t = { enc: "" }, n = 0; n < 8 && 0 != e[n]; n++)
            t.enc = t.enc + String.fromCharCode(e[n]);
          return (
            (t.samplerate =
              ((e[11] << 24) & P) |
              ((e[10] << 16) & m) |
              ((e[9] << 8) & v) |
              (e[8] & E)),
            (t.samplewidth =
              ((e[15] << 24) & P) |
              ((e[14] << 16) & m) |
              ((e[13] << 8) & v) |
              (e[12] & E)),
            (t.channels =
              ((e[19] << 24) & P) |
              ((e[18] << 16) & m) |
              ((e[17] << 8) & v) |
              (e[16] & E)),
            (t.cpmpress =
              ((e[23] << 24) & P) |
              ((e[22] << 16) & m) |
              ((e[21] << 8) & v) |
              (e[20] & E)),
            (t.len = 32),
            t
          );
        }),
        (p.parse_replay_head = function (e) {
          var t = {};
          return (
            (t.frametype =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            (t.channel =
              ((e[7] << 24) & P) |
              ((e[6] << 16) & m) |
              ((e[5] << 8) & v) |
              (e[4] & E)),
            (t.type =
              ((e[11] << 24) & P) |
              ((e[10] << 16) & m) |
              ((e[9] << 8) & v) |
              (e[8] & E)),
            (t.quality =
              ((e[15] << 24) & P) |
              ((e[14] << 16) & m) |
              ((e[13] << 8) & v) |
              (e[12] & E)),
            (t.len = 16),
            t
          );
        }),
        (p.setup_req = function (e) {
          var t = new ArrayBuffer(2052),
            n = new Uint8Array(t);
          if (
            ((n[0] = e.length & E),
            (n[1] = (e.length >> 8) & E),
            (n[2] = (e.length >> 16) & E),
            (n[3] = (e.length >> 24) & E),
            e.length >= 2048)
          )
            return n;
          for (var r = 0; r < e.length; r++) n[r + 4] = e.charCodeAt(r);
          return n;
        }),
        (p.setup_req2 = function (e) {
          var t = new ArrayBuffer(36),
            n = new Uint8Array(t);
          return (
            (n[32] = e.length & E),
            (n[33] = (e.length >> 8) & E),
            (n[34] = (e.length >> 16) & E),
            (n[35] = (e.length >> 24) & E),
            n
          );
        }),
        (p.parse_setup = function (e) {
          var t = {};
          return (
            (t.data_size =
              ((e[3] << 24) & P) |
              ((e[2] << 16) & m) |
              ((e[1] << 8) & v) |
              (e[0] & E)),
            (t.len = 4),
            t
          );
        }),
        (p.parse_setup2 = function (e) {
          var t = { len: 36 };
          return (
            (t.data_size =
              ((e[35] << 24) & P) |
              ((e[34] << 16) & m) |
              ((e[33] << 8) & v) |
              (e[32] & E)),
            t
          );
        }),
        (p.parse_p2p_head = function (e) {});
      const R = p,
        A = {};
      var T = [];
      (A.onconnect = null),
        (A.onclose = null),
        (A.ondata = null),
        (A.onerror = null),
        (A.iot_linktype = { turntcp: 1, iptcp: 2, p2ptcp: 3 }),
        (A.setAddressUrl = function (e) {
          e;
        });
      var g = function (e) {
          for (var t = 0; t < T.length; t++)
            if (T[t].p2p_key == e || T[t].turn_key == e || T[t].iptcp_key == e)
              return T[t];
        },
        O = function (e) {
          var t = e.charCodeAt(0);
          return t < 58 ? t - 48 : t < 91 ? t - 55 : t - 61;
        },
        y = function (e, t) {
          var n = t.charCodeAt(0),
            r = 0;
          if (48 == n) {
            var i = y(e, "z");
            return (i.mon += 1), i;
          }
          var o =
              (r = n > 48 && n < 58 ? n - 48 : n < 91 ? n - 55 : n - 61) % 12,
            a = Math.floor(r / 12);
          return (
            0 == o && ((o = 12), (a -= 1)), { year: 62 * a + e + 2010, mon: o }
          );
        },
        C = function (e, t) {
          return e < 2023
            ? 0
            : 2023 == e && t < 5
            ? 0
            : e < 2320
            ? 12 * (e - 2024) + 8 + t
            : 3560 + 2 * (e - 2320) + t;
        },
        M = function (e, t) {
          if (e.length > 10) {
            var n = (function (e, t) {
                var n = O(e),
                  r = y(n, t);
                return C(r.year, r.mon);
              })(e.substr(e.length - 12, 1), e.substr(e.length - 11, 1)),
              r = 80;
            t && (r = 443);
            var i = "ngw-cli.dvr163.com";
            return (
              n >= 9 && (i = "ngw-cli-" + n + ".dvr163.com"),
              { domain: i, port: r }
            );
          }
          return t
            ? { domain: "ngw-cli.dvr163.com", port: 443 }
            : { domain: "ngw-cli.dvr163.com", port: 80 };
        },
        S = function (e) {
          console.log("handle_resolve_ngw:%s", e.uid);
          var t = new XMLHttpRequest();
          t.onreadystatechange = function () {
            if (4 == t.readyState && 200 == t.status) {
              var n = JSON.parse(t.responseText);
              (e.p2p_ip = n.ipv4),
                (e.p2p_port = parseInt(n.tcpport)),
                (e.p2p_key = parseInt(n.apconv)),
                (e.turn_key = parseInt(n.amconv)),
                (e.sid = parseInt(n.sid)),
                e.usehttps &&
                  ((e.p2p_ip =
                    e.p2p_ip.replace(/\./g, "-") + ".kp2p.dvr163.com"),
                  (e.p2p_port = 19001)),
                h.connect(e.p2p_key, e.p2p_ip, e.p2p_port, e.ctx, e.usehttps);
            } else
              4 == t.readyState &&
                200 != t.status &&
                A.onconnect(e, e.ctx, -12);
          };
          var n = "http://";
          e.usehttps && (n = "https://");
          var r = M(e.uid, e.usehttps);
          e.uid = (function (e) {
            if (e.length <= 10) return console.log(e), e;
            for (var t = e.length - 10, n = t; n <= e.length; n++)
              if ("0" != e.charAt(n)) {
                t = n;
                break;
              }
            return console.log(e.substr(t)), e.substr(t);
          })(e.uid);
          var i = Math.round(1e7 * Math.random()),
            o = parseInt(new Date().getTime() / 1e3),
            a = (function (e, t, n, r, i) {
              var o =
                "ch_count=" +
                t +
                "&extconv=" +
                r +
                "&id=" +
                e +
                "&r=" +
                n +
                "&timestamp=" +
                i;
              (o = o.toUpperCase()), console.log(o);
              var a = i % 10,
                _ = ((i / 10) % 10) + 1,
                c = stringChangeMd5(o).substr(a, _) + "9an-ngw$app&*" + i;
              return stringChangeMd5(c);
            })(e.uid, e.chancount, i, 3, o);
          t.open(
            "GET",
            n +
              r.domain +
              "/address/clientV2?id=" +
              e.uid +
              "&ch_count=" +
              e.chancount +
              "&r=" +
              i +
              "&extconv=3&sign=" +
              a +
              "&timestamp=" +
              o
          ),
            t.send();
        },
        I = function (e, t) {
          console.log("handle_open_req:%s, session:%d", e.uid, e.sid);
          var n = s.iot_open_req(e.sid, e.turntype),
            r = s.iot_hdr(s.iot_cmd.IOT_LINK_CMD_OPEN_REQ, 0, e.sid, n);
          h.send(t, r);
        },
        w = function (e, t, n) {
          null != A.ondata && A.ondata(e, n, e.ctx);
        };
      (h.onopen = function (e, t, n) {
        var r = g(e);
        null != r &&
          (r.linktype == A.iot_linktype.iptcp
            ? (I(r, r.iptcp_key),
              console.log(
                "iptcp connect success ip=%s, port=%s",
                r.iptcp_ip,
                r.iptcp_port
              ))
            : r.linktype == A.iot_linktype.turntcp
            ? (!(function (e) {
                console.log("handle_login_req:%s", e.uid);
                var t = s.iot_loginturn(e.sid),
                  n = s.iot_hdr(
                    s.iot_cmd.IOT_LINK_CMD_CLIENT_LOGINTURN_REQ,
                    0,
                    e.sid,
                    t
                  );
                h.send(e.turn_key, n);
              })(r),
              console.log(
                "turntcp connect success ip=%s, port=%d",
                r.turn_ip,
                r.turn_port
              ))
            : r.linktype == A.iot_linktype.p2ptcp &&
              (!(function (e) {
                console.log("handle_turn_req:%s", e.uid);
                var t = s.iot_turn_req(e.uid, e.turntype, e.chancount),
                  n = s.iot_hdr(s.iot_cmd.IOT_LINK_CMD_TURN_REQ, 0, e.sid, t);
                h.send(e.p2p_key, n),
                  (e.turn_timestamp = Date.parse(new Date())),
                  (e.turn_timer = setInterval(function () {
                    var t = (Date.parse(new Date()) - e.turn_timestamp) / 1e3;
                    console.log(t),
                      t >= 20 &&
                        (clearInterval(e.turn_timer),
                        A.onconnect(e, e.ctx, -15));
                  }, 2e3)),
                  console.log("item.turn_timer:", e.turn_timer);
              })(r),
              (r.linktype = A.iot_linktype.turntcp),
              console.log(
                "p2ptcp connect success ip=%s, port=%d",
                r.p2p_ip,
                r.p2p_port
              )));
      }),
        (h.onerror = function (e, t, n) {
          var r = g(e);
          null != r && null != A.onerror && A.onerror(r, r.ctx, n);
        }),
        (h.ondata = function (e, t, n) {
          var r = g(e);
          if (null != r) {
            var i = s.parse_iot_hdr(n);
            if (i.cmd == s.iot_cmd.IOT_LINK_CMD_TURN_S2A) {
              var o = n.slice(s.hdr_len);
              console.log("s2a_data"),
                console.log(o),
                (function (e, t, n) {
                  console.log("handle_turn_res:%s", e.uid),
                    (e.turn_ip = n.turnsvr_ip),
                    (e.turn_port = n.turnsvr_port),
                    (e.turn_timestamp = Date.parse(new Date())),
                    e.usehttps &&
                      ((e.turn_ip =
                        e.turn_ip.replace(/\./g, "-") + ".kp2p.dvr163.com"),
                      (e.turn_port = 2e4)),
                    h.connect(
                      e.turn_key,
                      e.turn_ip,
                      e.turn_port,
                      e.ctx,
                      e.usehttps
                    ),
                    h.disconnect(e.p2p_key),
                    (e.p2p_key = 0);
                })(r, 0, s.parse_iot_turn_s2a(o));
            } else if (i.cmd == s.iot_cmd.IOT_LINK_CMD_PONG);
            else if (i.cmd == s.iot_cmd.IOT_LINK_CMD_OPEN_RES) {
              r.turn_timer > 0 && clearInterval(r.turn_timer);
              var a = n.slice(s.hdr_len);
              !(function (e, t, n, r) {
                console.log("item:", e),
                  console.log(
                    "handle_open_res sid:%d, ecode:%d, uid:%s",
                    n.sid,
                    r,
                    e.uid
                  ),
                  0 == r &&
                    (null != A.onconnect &&
                      ((e.link_isok = 1), A.onconnect(e, e.ctx, r)),
                    (e.live_timer = setInterval(function () {
                      console.log("live_timer=" + e.iptcp_key);
                      for (var t = 0; t < T.length; t++) {
                        var n = T[t];
                        if (n.linktype == A.iot_linktype.iptcp) {
                          var r = s.iot_ping(n.iptcp_key),
                            i = s.iot_hdr(
                              s.iot_cmd.IOT_LINK_CMD_PING,
                              0,
                              n.sid,
                              r
                            );
                          h.send(n.iptcp_key, i);
                        }
                        n.linktype == A.iot_linktype.turntcp &&
                          ((r = s.iot_ping(n.uid)),
                          (i = s.iot_hdr(
                            s.iot_cmd.IOT_LINK_CMD_PING,
                            0,
                            n.sid,
                            r
                          )),
                          h.send(n.turn_key, i));
                      }
                    }, 1e4)));
              })(r, 0, s.parse_iot_open_res(a), i.ecode);
            } else if (i.cmd == s.iot_cmd.IOT_LINK_CMD_CLOSE_RES);
            else if (i.cmd == s.iot_cmd.IOT_LINK_CMD_DATA) {
              var _ = n.slice(s.hdr_len),
                c = R.get_api_magic(_);
              if (c == R.PROC_FRAME_MAGIC || c == R.PROC_FRAME_MAGIC2) {
                var l = _.slice(0);
                if (c == R.PROC_FRAME_MAGIC2) {
                  var u = R.parse_p2p_frame_head_2(l);
                  l = l.subarray(u.len);
                }
                var d = R.parse_p2p_frame_head(l);
                if (d.framesize > l.length)
                  return (
                    (r.trunk_buf = l.slice(0)),
                    void (r.trunk_size = d.framesize)
                  );
              } else if (r.trunk_size > 0) {
                var f = new Uint8Array(r.trunk_buf.length + _.length);
                if (
                  (f.set(r.trunk_buf, 0),
                  f.set(_, r.trunk_buf.length),
                  !(r.trunk_size <= f.length))
                )
                  return void (r.trunk_buf = f.slice(0));
                (r.trunk_size = 0), w(r, 0, f), (r.trunk_buf = null);
              }
              w(r, 0, _);
            } else if (i.cmd == s.iot_cmd.IOT_LINK_CMD_DATA_PRIOR) {
              _ = n.slice(s.hdr_len);
              w(r, 0, _);
            } else if (i.cmd == s.iot_cmd.IOT_LINK_CMD_CLIENT_LOGINTURN_RES) {
              var p = n.slice(s.hdr_len);
              s.parse_iot_login_res(p);
              !(function (e) {
                console.log("handle_login_res:%s", e.uid),
                  console.log(e),
                  I(e, e.turn_key);
              })(r);
            }
          }
        }),
        (h.onclose = function (e, t, n) {
          console.log("arq.onclose, key=%u", e);
          var r = g(e);
          null != r
            ? (null != A.onclose &&
                e != r.p2p_key &&
                1 == r.link_isok &&
                A.onclose(r, r.ctx, n),
              null != A.onconnect &&
                e != r.p2p_key &&
                0 == r.link_isok &&
                A.onconnect(r, r.ctx, -13),
              e != r.p2p_key &&
                (r.turn_timer > 0 && clearInterval(r.turn_timer),
                r.live_timer > 0 && clearInterval(r.live_timer),
                (function (e) {
                  for (var t = 0; t < T.length; t++)
                    if (
                      T[t].p2p_key == e ||
                      T[t].turn_key == e ||
                      T[t].iptcp_key == e
                    ) {
                      T.splice(t, 1);
                      break;
                    }
                })(e)))
            : null != A.onclose && A.onclose(0, 0, n);
        }),
        (A.init = function (e, t, n, r) {
          (A.onconnect = e), (A.onclose = t), (A.onerror = n), (A.ondata = r);
        }),
        (A.connect_v2 = function (e, t, n, r, i, o, a, _) {
          var c,
            s = new XMLHttpRequest();
          s.onreadystatechange = function () {
            if (4 === s.readyState && 200 === s.status) {
              console.log(s.responseText);
              var l = JSON.parse(s.responseText),
                u =
                  l.nonce.toUpperCase() +
                  e +
                  l.request_id.toUpperCase() +
                  "Japass^2>.j",
                d = stringChangeMd5(u),
                f = new XMLHttpRequest();
              f.onreadystatechange = function () {
                if (4 === f.readyState && 200 === f.status) {
                  console.log(f.responseText);
                  var e = JSON.parse(f.responseText);
                  c = A.connect(e.sn, t, n, r, i, o, a, _);
                }
              };
              var h =
                "https://openapi.dvr163.com/device/device?method=get_sn&id=" +
                e +
                "&request_id=" +
                l.request_id +
                "&verify=" +
                d;
              f.open("GET", h, !1), f.send();
            }
          };
          return (
            s.open(
              "GET",
              "https://openapi.dvr163.com/message/nonce?method=get",
              !1
            ),
            s.send(),
            c
          );
        }),
        (A.connect = function (e, t, n, r, i, o, a, _) {
          var c = {
            uid: e,
            iptcp_ip: n,
            iptcp_port: r,
            ctx: o,
            linktype: 0,
            chancount: t,
            turntype: i,
            iptcp_key: 0,
            turn_key: 0,
            p2p_key: 0,
            link_isok: 0,
            turn_timer: -1,
            turn_timestamp: 0,
            trunk_size: 0,
            trunk_buf: null,
            usehttps: a,
            cb: _,
          };
          if ("" != n) {
            for (c.linktype = A.iot_linktype.iptcp; 0 == c.iptcp_key; )
              c.iptcp_key = Math.round(1e4 * Math.random());
            (c.sid = c.iptcp_key), h.connect(c.iptcp_key, n, r, o, "ws");
          } else {
            if ("" == e) return null;
            (c.linktype = A.iot_linktype.p2ptcp), S(c);
          }
          return T.push(c), c;
        }),
        (A.close = function (e) {
          clearInterval(e.live_timer),
            e.p2p_key > 0 && h.disconnect(e.p2p_key),
            e.turn_key > 0 && h.disconnect(e.turn_key),
            e.iptcp_key > 0 && h.disconnect(e.iptcp_key);
          for (var t = 0; t < T.length; t++)
            if (T[t] == e) {
              T.slice(t, 1);
              break;
            }
        }),
        (A.send = function (e, t) {
          if (e.linktype == A.iot_linktype.iptcp) {
            var n = s.iot_hdr(s.iot_cmd.IOT_LINK_CMD_DATA, 0, e.sid, t);
            return h.send(e.iptcp_key, n), 0;
          }
          if (e.linktype == A.iot_linktype.turntcp) {
            n = s.iot_hdr(s.iot_cmd.IOT_LINK_CMD_DATA, 0, e.sid, t);
            return h.send(e.turn_key, n), 0;
          }
          return -1;
        }),
        (A.send_prior = function (e, t) {
          if (e.linktype == A.iot_linktype.iptcp) {
            var n = s.iot_hdr(s.iot_cmd.IOT_LINK_CMD_DATA_PRIOR, 0, e.sid, t);
            return h.send(e.iptcp_key, n), 0;
          }
          if (e.linktype == A.iot_linktype.turntcp) {
            n = s.iot_hdr(s.iot_cmd.IOT_LINK_CMD_DATA_PRIOR, 0, e.sid, t);
            return h.send(e.turn_key, n), 0;
          }
          return -1;
        });
      const D = A,
        x = {};
      R.connect_type.CONNECT_TYPE_NONE;
      var N = [];
      (x.onconnect = null),
        (x.ondisconnect = null),
        (x.onloginresult = null),
        (x.onptzresult = null),
        (x.onopenstream = null),
        (x.onclosestream = null),
        (x.onrecvframe = null),
        (x.onrecvframeex = null),
        (x.onrecplaystart = null),
        (x.onrecplaycontrol = null),
        (x.onrecplaystop = null),
        (x.onrecvrecframe = null),
        (x.onremotesetup = null),
        (x.onp2perror = null),
        (x.onsearchrec = null),
        (x.onsearchrecend = null),
        (x.onoob = null),
        (x.onvop2pcallresult = null);
      var k = function (e, t, n, r, i) {
        var o = R.find_file_req_2(
            R.api_cmd.APP_PROTO_PARAM_REPLAY_CMD_SEARCH,
            t,
            0,
            i,
            n,
            r,
            e.find_file_index,
            e.find_file_count
          ),
          a = R.api_hdr(R.api_cmd.APP_PROTO_CMD_REPLAY_REQ, e.tick, o);
        D.send(e.iot, a);
      };
      D.init(
        function (e, t, n) {
          null != x.onconnect && x.onconnect(t, n);
        },
        function (e, t, n) {
          null != x.ondisconnect && x.ondisconnect(t, n);
        },
        function (e, t, n) {
          null != onp2perror && x.onp2perror(t, n);
        },
        function (e, t, n) {
          t.length;
          var r = R.get_api_magic(t);
          if (r == R.APP_PROTO_MAGIC) {
            var i = new Int8Array(t),
              o = (R.parse_api_hdr(i), R.parse_api_hdr(t));
            if (o.cmd == R.api_cmd.APP_PROTO_CMD_AUTH_RSP) {
              var a = t.subarray(R.hdr_len);
              R.parse_auth_res(a),
                null != x.onloginresult && x.onloginresult(n, o.result);
            } else if (o.cmd == R.api_cmd.APP_PROTO_CMD_AUTH3_RSP)
              (a = t.subarray(R.hdr_len)),
                R.parse_auth_res(a),
                null != x.onloginresult && x.onloginresult(n, o.result);
            else if (o.cmd == R.api_cmd.APP_PROTO_CMD_LIVE_RSP) {
              var _ = t.subarray(R.hdr_len),
                c = R.parse_live_res(_);
              c.live_cmd == R.api_cmd.APP_PROTO_PARAM_LIVE_CMD_STOP
                ? null != x.onclosestream &&
                  x.onclosestream(n, c.channel, c.streamid, o.result)
                : c.live_cmd == R.api_cmd.APP_PROTO_PARAM_LIVE_CMD_START &&
                  null != x.onopenstream &&
                  x.onopenstream(
                    n,
                    c.channel,
                    c.streamid,
                    o.result,
                    c.cam_desc
                  );
            } else if (o.cmd == R.api_cmd.APP_PROTO_CMD_VOP2P_RSP)
              null != x.onvop2pcallresult && x.onvop2pcallresult(n, o.result);
            else if (o.cmd == R.api_cmd.APP_PROTO_CMD_FIND_START_RSP)
              x.find_next(n);
            else if (o.cmd == R.api_cmd.APP_PROTO_CMD_FIND_NEXT_RSP);
            else if (o.cmd == R.api_cmd.APP_PROTO_CMD_REPLAY_RSP) {
              if (1 != n.file_find)
                return void (
                  0 == n.file_find &&
                  (null != x.onsearchrecend && x.onsearchrecend(n),
                  (n.file_find = 2))
                );
              var s = t.subarray(R.hdr_len),
                l = R.parse_search_res(s);
              if (
                ((n.file_total += l.file_count),
                (n.file_index += l.file_count),
                null != x.onsearchrec)
              )
                for (var u = s.subarray(l.len), d = 0; d < l.file_count; d++) {
                  var f = R.parse_record_file(u);
                  (u = u.subarray(f.len)),
                    x.onsearchrec(
                      n,
                      f.channel,
                      f.file_type,
                      f.file_begintime,
                      f.file_endtime,
                      l.file_total
                    );
                }
              n.file_total >= l.file_total
                ? null != x.onsearchrecend &&
                  ((n.file_find = 2), x.onsearchrecend(n))
                : ((n.find_file_index += n.find_file_count),
                  console.log("find_file_next_2"),
                  k(
                    n,
                    n.file_chnlist,
                    n.file_begintime,
                    n.file_endtime,
                    n.file_type
                  ));
            } else if (o.cmd == R.api_cmd.APP_PROTO_CMD_SETUP_RSP) {
              console.log("APP_PROTO_CMD_SETUP_RSP");
              var h = t.subarray(R.hdr_len),
                p = R.parse_setup(h),
                P = h.subarray(p.len),
                m = "";
              for (d = 0; d < p.data_size; d++) m += String.fromCharCode(P[d]);
              null != x.onremotesetup &&
                x.onremotesetup(n, m, p.data_size, o.result);
            } else if (o.cmd === R.api_cmd.APP_PROTO_CMD_SETUP2_RSP) {
              for (
                console.log("APP_PROTO_CMD_SETUP2_RSP"),
                  h = t.subarray(R.hdr_len),
                  p = R.parse_setup2(h),
                  P = h.subarray(p.len),
                  m = "",
                  d = 0;
                d < p.data_size;
                d++
              )
                m += String.fromCharCode(P[d]);
              null != x.onremotesetup &&
                x.onremotesetup(n, m, p.data_size, o.result);
            } else if (o.cmd === R.api_cmd.APP_PROTO_CMD_PTZ_RSP) {
              var v = t.subarray(R.hdr_len);
              R.parse_ptz_req(v),
                console.log("ptz_rsp_data.result = %d", o.result),
                x.onptzresult(n, o.result);
            }
          } else if (r == R.PROC_FRAME_MAGIC || r == R.PROC_FRAME_MAGIC2) {
            if (r == R.PROC_FRAME_MAGIC2) {
              var E = R.parse_p2p_frame_head_2(t);
              t = t.subarray(E.len);
            }
            var A = R.parse_p2p_frame_head(t);
            if (
              ((t = t.subarray(A.len)), A.headtype == R.p2p_frame_type.live)
            ) {
              var T = R.parse_live_head(t);
              if (
                ((t = t.subarray(T.len)),
                T.frametype == R.frame_type.PROC_FRAME_TYPE_AUDIO)
              ) {
                var g = R.parse_audio_param(t),
                  O = t.subarray(g.len);
                null != x.onrecvframeex &&
                  x.onrecvframeex(
                    n,
                    T.frametype,
                    O,
                    O.length,
                    T.channel,
                    g.samplerate,
                    g.samplewidth,
                    g.enc,
                    g.channels
                  );
              } else if (
                T.frametype == R.frame_type.PROC_FRAME_TYPE_IFRAME ||
                T.frametype == R.frame_type.PROC_FRAME_TYPE_PFRAME
              ) {
                var y = R.parse_video_param(t),
                  C = t.subarray(y.len);
                null != x.onrecvframeex &&
                  x.onrecvframeex(
                    n,
                    T.frametype,
                    C,
                    C.length,
                    T.channel,
                    y.width,
                    y.height,
                    y.enc,
                    y.fps,
                    A.ts_ms
                  );
              } else if (T.frametype == R.frame_type.PROC_FRAME_TYPE_OOB) {
                var M = R.parse_oob(t);
                null != x.onoob && x.onoob(n, M), console.log(M);
              }
            } else if (A.headtype == R.p2p_frame_type.replay) {
              var S = R.parse_replay_head(t);
              (t = t.subarray(S.len)),
                S.frametype == R.frame_type.PROC_FRAME_TYPE_AUDIO
                  ? ((g = R.parse_audio_param(t)),
                    (O = t.subarray(g.len)),
                    g.enc.indexOf("AAC") > -1 && (O = t.subarray(24)),
                    null != x.onrecvrecframe &&
                      x.onrecvrecframe(
                        n,
                        S.frametype,
                        O,
                        O.length,
                        S.channel,
                        g.samplerate,
                        g.samplewidth,
                        g.enc,
                        g.channels,
                        A.ts_ms
                      ))
                  : S.frametype == R.frame_type.PROC_FRAME_TYPE_IFRAME ||
                    S.frametype == R.frame_type.PROC_FRAME_TYPE_PFRAME
                  ? ((y = R.parse_video_param(t)),
                    (C = t.subarray(y.len)),
                    null != x.onrecvrecframe &&
                      x.onrecvrecframe(
                        n,
                        S.frametype,
                        C,
                        C.length,
                        S.channel,
                        y.width,
                        y.height,
                        y.enc,
                        y.fps,
                        A.ts_ms
                      ))
                  : S.frametype == R.frame_type.PROC_FRAME_TYPE_OOB &&
                    console.log("OOB FRAME");
            }
          }
        }
      ),
        (x.getversion = function () {
          return "0.1.32";
        }),
        (x.set_conn_type = function (e) {
          e;
        }),
        (x.set_turn_server = function (e) {
          e;
        }),
        (x.create = function (e, t) {
          if (!t) return null;
          var n = {};
          return (
            (n.context = e),
            N.push(n),
            (n.tick = 0),
            (n.aes = t),
            (n.find_file_index = 0),
            (n.find_file_count = 100),
            (n.find_file_total = 0),
            n
          );
        }),
        (x.connectbyid = function (e, t, n, r) {
          (e.deviceid = t),
            (e.ip = ""),
            (e.port = 0),
            (e.iot = D.connect_v2(t, 1, "", 0, 0, e, n, r));
        }),
        (x.connectbyip = function (e, t, n) {
          (e.deviceid = ""),
            (e.ip = t),
            (e.port = n),
            (e.iot = D.connect_v2("", 1, t, n, 0, e));
        }),
        (x.login = function (e, t, n) {
          if (
            t.length < R.APP_PROTO_PARAM_AUTH_NAME_STRLEN &&
            n.length < R.APP_PROTO_PARAM_AUTH_PASSWD_STRLEN
          ) {
            for (
              var r = t.substr(0, 16),
                i = t.substr(16),
                o = n.substr(0, 16),
                a = n.substr(16),
                _ = r.length;
              _ < 16;
              _++
            )
              r += String.fromCharCode(0);
            for (_ = i.length; _ < 16; _++) i += String.fromCharCode(0);
            for (_ = o.length; _ < 16; _++) o += String.fromCharCode(0);
            for (_ = a.length; _ < 16; _++) a += String.fromCharCode(0);
            (r = e.aes.enc.Utf8.parse(r)),
              (i = e.aes.enc.Utf8.parse(i)),
              (o = e.aes.enc.Utf8.parse(o)),
              (a = e.aes.enc.Utf8.parse(a));
            var c = e.aes.enc.Utf8.parse(R.APP_PROTO_AES128_KEY),
              s = e.aes.AES.encrypt(r, c, {
                mode: e.aes.mode.ECB,
                padding: e.aes.pad.NoPadding,
              }),
              l = e.aes.AES.encrypt(i, c, {
                mode: e.aes.mode.ECB,
                padding: e.aes.pad.NoPadding,
              }),
              u = e.aes.AES.encrypt(o, c, {
                mode: e.aes.mode.ECB,
                padding: e.aes.pad.NoPadding,
              }),
              d = e.aes.AES.encrypt(a, c, {
                mode: e.aes.mode.ECB,
                padding: e.aes.pad.NoPadding,
              }),
              f =
                e.aes.enc.Hex.stringify(s.ciphertext).toString() +
                e.aes.enc.Hex.stringify(l.ciphertext).toString(),
              h =
                e.aes.enc.Hex.stringify(u.ciphertext).toString() +
                e.aes.enc.Hex.stringify(d.ciphertext).toString();
            e.tick += 1;
            var p = R.auth_req(f, h),
              P = "";
            for (_ = 0; _ < p.length; _++) P += String.fromCharCode(p[_]);
            (t = P.slice(32)), (n = P);
            var m = R.api_hdr(R.api_cmd.APP_PROTO_CMD_AUTH_REQ, e.tick, p);
            D.send(e.iot, m);
          } else {
            (p = R.auth_req3(t, n)),
              (m = R.api_hdr(R.api_cmd.APP_PROTO_CMD_AUTH3_REQ, e.tick, p));
            D.send_prior(e.iot, m);
          }
        }),
        (x.login2 = function (e, t, n) {
          e.tick += 1;
        }),
        (x.ptz_ctrl = function (e, t, n, r, i) {
          e.tick += 1;
          var o = R.ptz_req(t, n, r, i),
            a = R.api_hdr(R.api_cmd.APP_PROTO_CMD_PTZ_REQ, e.tick, o);
          D.send(e.iot, a);
        }),
        (x.open_stream = function (e, t, n) {
          (e.tick += 1), (e.channel = t), (e.streamid = n);
          var r = R.live_req(t, n, R.api_cmd.APP_PROTO_PARAM_LIVE_CMD_START),
            i = R.api_hdr(R.api_cmd.APP_PROTO_CMD_LIVE_REQ, e.tick, r);
          D.send(e.iot, i);
        }),
        (x.close_stream = function (e, t, n) {
          e.tick += 1;
          var r = R.live_req(t, n, R.api_cmd.APP_PROTO_PARAM_LIVE_CMD_STOP),
            i = R.api_hdr(R.api_cmd.APP_PROTO_CMD_LIVE_REQ, e.tick, r);
          D.send(e.iot, i);
        }),
        (x.close_socket = function (e) {
          D.close(e.iot);
        }),
        (x.change_stream = function (e, t, n) {
          (e.tick += 1), (e.channel = t), (e.streamid = n);
          var r = R.live_req(t, n, R.api_cmd.APP_PROTO_PARAM_LIVE_CMD_START),
            i = R.api_hdr(R.api_cmd.APP_PROTO_CMD_LIVE_REQ, e.tick, r);
          D.send(e.iot, i);
        }),
        (x.find_file_start = function (e, t, n, r, i) {
          e.tick += 1;
          var o = R.find_file_cond(t, n, r, i),
            a = R.api_hdr(R.api_cmd.APP_PROTO_CMD_FIND_START_REQ, e.tick, o);
          D.send(e.iot, a);
        }),
        (x.find_next = function (e) {
          e.tick += 1;
          var t = R.find_next_req(0),
            n = R.api_hdr(R.api_cmd.APP_PROTO_CMD_FIND_NEXT_REQ, e.tick, t);
          D.send(e.iot, n);
        }),
        (x.find_file_stop = function (e) {
          e.tick += 1;
          var t = R.find_next_req(0),
            n = R.api_hdr(R.api_cmd.APP_PROTO_CMD_FIND_STOP_REQ, e.tick, t);
          D.send(e.iot, n);
        }),
        (x.find_file_start_2 = function (e, t, n, r, i) {
          (e.tick += 1),
            (e.file_index = 0),
            (e.file_total = 0),
            (e.file_begintime = n),
            (e.file_endtime = r),
            (e.file_type = i),
            (e.file_chnlist = t),
            (e.file_find = 1),
            (e.find_file_index = 0),
            (e.find_file_count = 100),
            (e.find_file_total = 0),
            k(e, t, n, r, i);
        }),
        (x.find_file_stop_2 = function (e) {
          e.file_find = 0;
        }),
        (x.replay_start = function (e, t, n, r, i, o) {
          e.tick += 1;
          var a = R.find_file_req_2(
              R.api_cmd.APP_PROTO_PARAM_REPLAY_CMD_START,
              t,
              o,
              i,
              n,
              r,
              0,
              0
            ),
            _ = R.api_hdr(R.api_cmd.APP_PROTO_CMD_REPLAY_REQ, e.tick, a);
          D.send(e.iot, _);
        }),
        (x.replay_pause = function (e) {
          e.tick += 1;
          var t = R.find_file_req_2(
              R.api_cmd.APP_PROTO_PARAM_REPLAY_CMD_PAUSE,
              null,
              0,
              0,
              0,
              0,
              0,
              0
            ),
            n = R.api_hdr(R.api_cmd.APP_PROTO_CMD_REPLAY_REQ, e.tick, t);
          D.send(e.iot, n);
        }),
        (x.replay_continue = function (e) {
          e.tick += 1;
          var t = R.find_file_req_2(
              R.api_cmd.APP_PROTO_PARAM_REPLAY_CMD_CONTINUE,
              null,
              0,
              0,
              0,
              0,
              0,
              0
            ),
            n = R.api_hdr(R.api_cmd.APP_PROTO_CMD_REPLAY_REQ, e.tick, t);
          D.send(e.iot, n);
        }),
        (x.replay_stop = function (e) {
          e.tick += 1;
          var t = R.find_file_req_2(
              R.api_cmd.APP_PROTO_PARAM_REPLAY_CMD_STOP,
              null,
              0,
              0,
              0,
              0,
              0,
              0
            ),
            n = R.api_hdr(R.api_cmd.APP_PROTO_CMD_REPLAY_REQ, e.tick, t);
          D.send(e.iot, n);
        }),
        (x.remote_setup = function (e, t) {
          e.tick += 1;
          var n = R.setup_req(t),
            r = R.api_hdr(R.api_cmd.APP_PROTO_CMD_SETUP_REQ, e.tick, n);
          D.send(e.iot, r);
        }),
        (x.remote_setup2 = function (e, t) {
          e.tick += 1;
          for (
            var n = R.setup_req2(t),
              r = R.api_hdr(R.api_cmd.APP_PROTO_CMD_SETUP2_REQ, e.tick, n),
              i = r.length + t.length,
              o = new ArrayBuffer(i),
              a = new Uint8Array(o),
              _ = 0;
            _ < r.length;
            _++
          )
            a[_] = r[_];
          for (_ = r.length; _ < t.length + r.length; _++)
            a[_] = t.charCodeAt(_ - r.length);
          D.send(e.iot, a);
        }),
        (x.vop2p_call = function (e, t) {
          e.tick += 1;
          var n = R.vop2p_call_req(t, R.api_cmd.APP_PROTO_PARAM_VOP2P_CMD_CALL),
            r = R.api_hdr(R.api_cmd.APP_PROTO_CMD_VOP2P_REQ, e.tick, n);
          D.send(e.iot, r);
        }),
        (x.vop2p_send = function (e, t, n, r, i, o, a, _, c, s) {
          var l = R.vop2p_send_req(t, n, r, i, o, a, _, c, s);
          D.send(e.iot, l);
        }),
        (x.vop2p_hangup = function (e, t) {
          var n = R.vop2p_call_req(
              t,
              R.api_cmd.APP_PROTO_PARAM_VOP2P_CMD_HANGUP
            ),
            r = R.api_hdr(R.api_cmd.APP_PROTO_CMD_VOP2P_REQ, e.tick, n);
          D.send(e.iot, r);
        }),
        (x.setAddressUrl = function (e) {});
      const L = x;
      const b = function (e, t, n, r) {
        var i =
            "#define PI 3.1415926535897932384626433832795\n#define VERTEX_TYPE_HEMISPHERE 0\n#define VERTEX_TYPE_PANORAMA 1\n#define VERTEX_TYPE_CYLINDER 2\n#define VERTEX_TYPE_EXPAND 3\n#define VERTEX_TYPE_NORMAL 4\n#define VERTEX_TYPE_SPHERE 5\n#define VERTEX_TYPE_CONE 6\nuniform mat4 projection;\nuniform mat4 modelView;\nuniform mat4 changeprojection;\nuniform mat4 changemodelView;\nattribute vec4 vPosition;\nattribute vec4 vChangePosition;\nattribute vec2 aTexCoor;\nuniform int aMode;\nuniform int aChangeMode;\nuniform float texwidth;\nuniform float texheight;\nuniform float aRotate;\nuniform float aDiameter;\nuniform float aAspect;\nuniform float aViewportAspect;\nuniform float aChangeDiameter;uniform float aChangeRotate;uniform int aChangeAnimation;\nuniform float aChangeStep;\nuniform float aChangeStepCount;\n\nvarying vec2 vTextureCoord;\nvarying float vtexwidth;\nvarying float vtexheight;\nvarying float fMode;\n\nvec4 GetPosition(mat4 proj,mat4 mv,vec4 pos,int mode,float diameter)\n{\n    vec4 aPos=pos;\n    if(mode==VERTEX_TYPE_CYLINDER||mode==VERTEX_TYPE_CONE)\n    {\n       float y;       float x=cos((aPos.x)/diameter-0.5*PI+(diameter-1.0)/diameter*PI)*0.8*diameter;\n       if(aPos.y>250.0)\n           y=-35.0/180.0*PI*1.1;\n       else\n           if(mode==VERTEX_TYPE_CONE)\n              y=(215.0-(180.0+(1.0-abs(cos(aPos.y/180.0*PI)))*90.0))/180.0*PI*1.1;\n           else\n              y=(215.0-aPos.y)/180.0*PI*1.1;\n       float z=sin((aPos.x)/diameter-0.5*PI+(diameter-1.0)/diameter*PI)*0.8*diameter-(sqrt(diameter)-1.0/diameter);\n       aPos = vec4(x,y,z,1.0);\n    }\n    else\n    if(mode!=VERTEX_TYPE_HEMISPHERE&&mode!=VERTEX_TYPE_SPHERE)\n    {\n       float vcut=texwidth/texheight;\n       if(mode==VERTEX_TYPE_EXPAND)\n           aPos=vec4(aPos.x*aAspect,aPos.y*vcut,aPos.z,1.0);\n       else\n           aPos=vec4(aPos.x*aAspect,aPos.y,aPos.z,1.0);\n    }\n    else\n           aPos=vec4(aPos.x,aPos.y,aPos.z,1.0);\n    return proj * mv * aPos;\n}\nvec2 GetCoord(float pRotate)\n{\n    float sin_factor = sin(-pRotate);\n    float cos_factor = cos(-pRotate);\n    vec2 tmpcoor = vec2(aTexCoor.x - 0.5, aTexCoor.y - 0.5) * mat2(cos_factor, sin_factor, -sin_factor, cos_factor);\n       return vec2(tmpcoor.x+0.5,tmpcoor.y+0.5);\n}\nvoid main(void)\n{\n    vec4 aPos = GetPosition(projection,modelView,vPosition,aMode,aDiameter);\n    if(aChangeAnimation==1)\n    {\n       vec4 bPos=GetPosition(changeprojection,changemodelView,vChangePosition,aChangeMode,aChangeDiameter)-aPos;\n       bPos=bPos/aChangeStepCount;\n       aPos=aPos+bPos*aChangeStep;\n       float tmp1 = aChangeRotate - aRotate;\n       tmp1=aRotate+tmp1/aChangeStepCount*aChangeStep;\n       vTextureCoord = GetCoord(tmp1);\n    }\n    else\n       vTextureCoord = GetCoord(aRotate);\n    gl_Position = aPos;\n    vtexwidth=texwidth;\n    vtexheight = texheight;\n    if(aMode==4)\n       fMode=1.0;\n    else\n       fMode=0.0;\n}\n",
          o =
            "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vTextCoord;\n uniform sampler2D s_texture_y;\n uniform sampler2D s_texture_u;\n uniform sampler2D s_texture_v;\nuniform float centerx;\nuniform float centery;\nuniform float radius;\nvarying float vtexwidth;\nvarying float vtexheight;\nvarying float fMode;\n\nvoid main()\n{\n    vec2 ltc;\n    if(fMode>0.0)\n        ltc = vTextureCoord;\n    else\n        ltc = vec2((vTextureCoord.x-0.5)*radius+centerx+0.5,(vTextureCoord.y-0.5)*radius*(vtexwidth/vtexheight)+0.5+centery);    if(ltc.y>1.0||ltc.y<0.0)\n       gl_FragColor=vec4(0.0,0.0,0.0,0.0);\n    else\n    {\n     highp float y = texture2D(s_texture_y, vTextureCoord).r;\n     highp float u = texture2D(s_texture_u, vTextureCoord).r - 0.5;\n     highp float v = texture2D(s_texture_v, vTextureCoord).r - 0.5;\n     \n     highp float r = y +             1.402 * v;\n     highp float g = y - 0.344 * u - 0.714 * v;\n     highp float b = y + 1.772 * u;\n     gl_FragColor=vec4(r,g,b,1.0);\n    }\n}",
          a = null,
          _ = new Array(VERTEX_TYPE_COUNT),
          c = new Array(VERTEX_TYPE_COUNT),
          s = new Array(VERTEX_TYPE_COUNT),
          l = new Array(VERTEX_TYPE_COUNT),
          u = new Array(VERTEX_TYPE_COUNT),
          d = 0,
          f = 0,
          h = 0,
          p = 0,
          P = 0,
          m = 0,
          v = 0,
          E = 0,
          R = 0,
          A = 0,
          T = 0,
          g = 0,
          O = 0,
          y = 0,
          C = 0,
          M = 0,
          S = 0,
          I = 0,
          w = 0,
          D = new Array(3),
          x = ((a = 0), 0),
          N = 0,
          k = 0,
          L = 0,
          b = newMat4_identity(),
          B = newMat4_identity(),
          U = newMat4_identity(),
          F = 256,
          H = 256,
          Y = 256,
          V = 0,
          z = vec3(0, 0, 0),
          X = vec3(1, 1, 1),
          K = vec3(0, 0, 0),
          q = vec3(0, 0, 0),
          G = vec3(1, 1, 1),
          W = vec3(0, 0, 0),
          Q = vec3(0, 0, 0),
          j = vec3(1, 1, 1),
          Z = vec3(0, 0, 0),
          J = vec3(0, 0, 0),
          $ = vec3(1, 1, 1),
          ee = vec3(0, 0, 0),
          te = !1,
          ne = 0,
          re = 0,
          ie = 0,
          oe = new Array(3),
          ae = new Array(3),
          _e = 512,
          ce = 512,
          se = 3,
          le = vec2(0 + se, 180 + se),
          ue = vec2(360 + se, 270 + se),
          de = t,
          fe = e;
        fe || console.log("gl failed");
        var he,
          pe = n;
        function Pe(e, t, n, r, i, o, a, _, c, s) {
          (t = newMat4_identity()),
            ksTranslate(t, vec3(0, 0, r)),
            (n = newMat4_identity());
          var l = newMat4_identity();
          newMat4_identity(),
            a[0] && ksRotate(l, a[0], 1, 0, 0),
            a[1] && ksRotate(l, a[1], 0, 1, 0),
            a[2] && ksRotate(l, a[2], 0, 0, 1),
            ksMatrixMultiply(n, n, l),
            ksTranslate(t, vec3(i[0], i[1], i[2])),
            s != VERTEX_TYPE_CYLINDER && s != VERTEX_TYPE_CONE
              ? ((e = newMat4_identity()),
                ksPerspective(e, 60 / o[0], pe, 1e-4, 1200),
                fe.uniformMatrix4fv(_, !1, e))
              : ((e = newMat4_identity()),
                ksOrtho(e, -pe, pe, -1, 1, 1e-4, 1200),
                fe.uniformMatrix4fv(_, !1, e),
                ksScale(n, vec3(o[0], o[1], 1))),
            ksMatrixMultiply(t, n, t),
            fe.uniformMatrix4fv(c, !1, t);
        }
        function me() {
          return ((ue[0] - le[0]) / se) * ((ue[1] - le[1]) / se) * 6;
        }
        function ve(e, t) {
          for (var n = [], r = [], i = le[1]; i < ue[1]; i += se)
            for (var o = le[0]; o < ue[0]; o += se) {
              var a = vec2(o, i),
                _ = Ee(a);
              n.push(_[0]),
                n.push(_[1]),
                n.push(_[2]),
                (_ = Ee((a = vec2(o - se, i)))),
                n.push(_[0]),
                n.push(_[1]),
                n.push(_[2]),
                (_ = Ee((a = vec2(o, i - se)))),
                n.push(_[0]),
                n.push(_[1]),
                n.push(_[2]),
                (_ = Ee((a = vec2(o, i - se)))),
                n.push(_[0]),
                n.push(_[1]),
                n.push(_[2]),
                (_ = Ee((a = vec2(o - se, i)))),
                n.push(_[0]),
                n.push(_[1]),
                n.push(_[2]),
                (_ = Ee((a = vec2(o - se, i - se)))),
                n.push(_[0]),
                n.push(_[1]),
                n.push(_[2]);
              var c = Re((a = vec2(o, i)));
              r.push(c[0]),
                r.push(c[1]),
                (c = Re((a = vec2(o - se, i)))),
                r.push(c[0]),
                r.push(c[1]),
                (c = Re((a = vec2(o, i - se)))),
                r.push(c[0]),
                r.push(c[1]),
                (c = Re((a = vec2(o, i - se)))),
                r.push(c[0]),
                r.push(c[1]),
                (c = Re((a = vec2(o - se, i)))),
                r.push(c[0]),
                r.push(c[1]),
                (c = Re((a = vec2(o - se, i - se)))),
                r.push(c[0]),
                r.push(c[1]);
            }
          e.set(n), t.set(r);
        }
        function Ee(e) {
          var t = e[0],
            n = e[1],
            r = 0,
            i = 0,
            o = 0;
          switch (V) {
            case VERTEX_TYPE_HEMISPHERE:
              (r =
                de *
                Math.cos((t / 180) * Math.PI) *
                Math.cos((n / 180) * Math.PI)),
                (i =
                  de *
                  Math.sin((t / 180) * Math.PI) *
                  Math.cos((n / 180) * Math.PI)),
                (o = de * Math.sin((n / 180) * Math.PI));
              break;
            case VERTEX_TYPE_PANORAMA:
              (r = ((180 - t) / 180) * 1.2),
                (i = n > 250 ? (-35 / 180) * 6 : ((215 - n) / 180) * 6),
                (o = 1);
              break;
            case VERTEX_TYPE_CYLINDER:
            case VERTEX_TYPE_CONE:
              (r = (t / 180) * Math.PI), (i = n), (o = 1);
              break;
            case VERTEX_TYPE_EXPAND:
              (r =
                2 *
                Math.cos((t / 180) * Math.PI) *
                Math.cos((n / 180) * Math.PI)),
                (i =
                  2 *
                  Math.sin((t / 180) * Math.PI) *
                  Math.cos((n / 180) * Math.PI)),
                0 == (o = 2 * Math.sin(((n - 180) / 180) * Math.PI)) &&
                  (o = 1e-7),
                (r = (2 * Math.atan(r / o)) / Math.PI),
                (i =
                  -Math.sin((t / 180) * Math.PI) *
                  Math.sin(((270 - n) / 180) * Math.PI)),
                (o = 1.265);
              break;
            case VERTEX_TYPE_NORMAL:
              (r = ((t - 180) / 360) * 2),
                (i = ((n - 225) / 90) * 2),
                (o = 1.265);
              break;
            case VERTEX_TYPE_SPHERE:
              (r =
                Math.cos((t / 180) * Math.PI) * Math.cos((n / 180) * Math.PI)),
                (i =
                  Math.sin((t / 180) * Math.PI) *
                  Math.cos((n / 180) * Math.PI)),
                0 == (o = Math.sin(((n - 180) / 180) * Math.PI)) && (o = 1e-7),
                (r = (2 * Math.atan(r / o)) / Math.PI),
                (i =
                  -Math.sin((t / 180) * Math.PI) *
                  Math.sin(((270 - n) / 180) * Math.PI)),
                (o = 1.265);
          }
          return vec3(r, i, o);
        }
        function Re(e) {
          if (V == VERTEX_TYPE_NORMAL)
            return (s = vec2(e[0] / 360, (270 - e[1]) / 90));
          var t,
            n,
            r,
            i = e[0],
            o = e[1];
          (t =
            de * Math.cos((i / 180) * Math.PI) * Math.cos((o / 180) * Math.PI)),
            (n =
              de *
              Math.sin((i / 180) * Math.PI) *
              Math.cos((o / 180) * Math.PI)),
            (r = de * Math.sin((o / 180) * Math.PI));
          var a = vec3(t, n, r);
          vec3normalize(a, a);
          var _ = vec2(a[0], a[1]),
            c = vec2length(_);
          vec2normalize(_, _), c > 1 && (c = 1);
          var s,
            l = Math.asin(c),
            u = 2 * Math.sin(0.5 * l);
          return (
            ((s = vec2(
              _[0] * u * ((1 / Math.pow(2, 0.5)) * 0.5),
              _[1] * u * ((1 / Math.pow(2, 0.5)) * 0.5)
            ))[0] = s[0] + 0.5),
            (s[1] = s[1] + 0.5),
            (s[1] = 1 - s[1]),
            s
          );
        }
        (this.DrawSelf = function () {
          if (!(Y <= 0 && V != VERTEX_TYPE_NORMAL)) {
            fe.useProgram(a);
            var e,
              t = _e,
              n = ce;
            fe.uniform1f(p, t),
              fe.uniform1f(P, n),
              V == VERTEX_TYPE_HEMISPHERE || V == VERTEX_TYPE_SPHERE
                ? Pe(
                    B,
                    b,
                    U,
                    (-3 * Math.tan((30 / 180) * Math.PI)) /
                      Math.tan((30 / 180) * Math.PI),
                    vec3(
                      z[0],
                      z[1],
                      (z[2] * Math.tan((30 / 180) * Math.PI)) /
                        Math.tan((30 / 180) * Math.PI)
                    ),
                    X,
                    K,
                    L,
                    k,
                    V
                  )
                : Pe(B, b, U, -3, z, X, K, L, k, V),
              fe.uniform1i(d, V),
              fe.uniform1f(f, q[0]),
              fe.uniform1f(h, G[0]),
              fe.uniform1f(m, pe),
              fe.uniform1f(M, 1),
              fe.uniform1f(S, F / t - 0.5),
              fe.uniform1f(I, H / n - 0.5),
              fe.uniform1f(w, Y / (t / 2)),
              fe.uniform1i(v, te ? 1 : 0),
              te &&
                (fe.uniform1f(C, J[0]),
                fe.uniform1f(y, $[0]),
                fe.uniform1f(A, ie),
                fe.uniform1f(E, re),
                fe.uniform1i(T, ne),
                (e =
                  ne != VERTEX_TYPE_CYLINDER && ne != VERTEX_TYPE_CONE
                    ? -3
                    : 1),
                Pe(
                  mChangeprojectionMatrix,
                  mChangemodelViewMatrix,
                  mChangeRoateMatrix,
                  e,
                  Q,
                  j,
                  Z,
                  g,
                  O,
                  ne
                )),
              fe.bindBuffer(fe.ARRAY_BUFFER, _[ne]),
              fe.vertexAttribPointer(R, 3, fe.FLOAT, !1, 0, 0),
              fe.enableVertexAttribArray(R),
              fe.bindBuffer(fe.ARRAY_BUFFER, _[V]),
              fe.vertexAttribPointer(x, 3, fe.FLOAT, !1, 0, 0),
              fe.enableVertexAttribArray(x),
              fe.bindBuffer(fe.ARRAY_BUFFER, u[V]),
              fe.vertexAttribPointer(N, 2, fe.FLOAT, !1, 0, 0),
              fe.enableVertexAttribArray(N);
            for (
              var r = [fe.TEXTURE0, fe.TEXTURE1, fe.TEXTURE2], i = 0;
              i < 3;
              i++
            )
              fe.activeTexture(r[i]),
                null != ae[0]
                  ? fe.bindTexture(fe.TEXTURE_2D, ae[i])
                  : fe.bindTexture(fe.TEXTURE_2D, oe[i]),
                fe.uniform1i(D[i], i);
            fe.drawArrays(fe.TRIANGLES, 0, s[V]),
              fe.disableVertexAttribArray(x),
              fe.disableVertexAttribArray(N);
          }
        }),
          (this.SwitchMode = function (e) {
            e < 0 || e > 6 || (V = e);
          }),
          (this.Transform = function (e, t, n) {
            if (n)
              switch (e) {
                case TRANSFORM_TYPE_POSITION:
                  cpvec3(t, q);
                  break;
                case TRANSFORM_TYPE_SCALE:
                  cpvec3(t, G);
                  break;
                case TRANSFORM_TYPE_ROTATE:
                  cpvec3(t, W);
              }
            else
              switch (e) {
                case TRANSFORM_TYPE_POSITION:
                  cpvec3(t, z);
                  break;
                case TRANSFORM_TYPE_SCALE:
                  cpvec3(t, X);
                  break;
                case TRANSFORM_TYPE_ROTATE:
                  cpvec3(t, K);
              }
          }),
          (this.SetTexture = function (e) {
            (ae[0] = e.texture[0]),
              (ae[1] = e.texture[1]),
              (ae[2] = e.texture[2]),
              (_e = e.texwidth),
              (ce = e.texheight);
          }),
          (this.ClearTexture = function () {
            (ae[0] = null), (ae[1] = null), (ae[2] = null), (_e = 0), (ce = 0);
          }),
          (this.SetFishEyeParameter = function (e, t, n) {
            (Y = e), (F = t), (H = n);
          }),
          (this.SetChangeAnimation = function (e, t, n, r) {
            (te = e), (re = t), (ne = r), (ie = n);
          }),
          (this.SetChangePSR = function (e, t, n, r, i, o) {
            cpvec3(e, Q),
              cpvec3(t, j),
              cpvec3(n, Z),
              cpvec3(r, J),
              cpvec3(i, $),
              cpvec3(o, ee);
          }),
          (function () {
            var e = fe.createShader(fe.VERTEX_SHADER);
            fe.shaderSource(e, i), fe.compileShader(e);
            var t,
              n,
              r = fe.createShader(fe.FRAGMENT_SHADER);
            fe.shaderSource(r, o),
              fe.compileShader(r),
              (a = fe.createProgram()),
              fe.attachShader(a, e),
              fe.attachShader(a, r),
              fe.linkProgram(a),
              fe.useProgram(a),
              fe.getUniformLocation(a, "modelView"),
              (d = fe.getUniformLocation(a, "aMode")),
              (f = fe.getUniformLocation(a, "aRotate")),
              (h = fe.getUniformLocation(a, "aDiameter")),
              (p = fe.getUniformLocation(a, "texwidth")),
              (P = fe.getUniformLocation(a, "texheight")),
              (m = fe.getUniformLocation(a, "aAspect")),
              (v = fe.getUniformLocation(a, "aChangeAnimation")),
              (E = fe.getUniformLocation(a, "aChangeStep")),
              (R = fe.getAttribLocation(a, "vChangePosition")),
              (A = fe.getUniformLocation(a, "aChangeStepCount")),
              (g = fe.getUniformLocation(a, "changeprojection")),
              (O = fe.getUniformLocation(a, "changemodelView")),
              (T = fe.getUniformLocation(a, "aChangeMode")),
              (D[0] = fe.getUniformLocation(a, "s_texture_y")),
              (D[1] = fe.getUniformLocation(a, "s_texture_u")),
              (D[2] = fe.getUniformLocation(a, "s_texture_v")),
              fe.getUniformLocation(a, "sTexText"),
              (y = fe.getUniformLocation(a, "aChangeDiameter")),
              (C = fe.getUniformLocation(a, "aChangeRotate")),
              (M = fe.getUniformLocation(a, "aViewportAspect")),
              (S = fe.getUniformLocation(a, "centerx")),
              (I = fe.getUniformLocation(a, "centery")),
              (w = fe.getUniformLocation(a, "radius")),
              (x = fe.getAttribLocation(a, "vPosition")),
              (N = fe.getAttribLocation(a, "aTexCoor")),
              (k = fe.getUniformLocation(a, "modelView")),
              (L = fe.getUniformLocation(a, "projection")),
              (t = newMat4_identity()),
              (n = fe.canvas.clientWidth / fe.canvas.clientHeight),
              V != VERTEX_TYPE_CYLINDER && V != VERTEX_TYPE_CONE
                ? ksPerspective(t, 60, n, 1e-4, 1200)
                : ksOrtho(t, -n, n, -1, 1, 1e-4, 1200),
              fe.uniformMatrix4fv(L, !1, t);
          })(),
          (function () {
            for (var e = 0; e < VERTEX_TYPE_COUNT; e++) {
              V = e;
              var t = 3 * me(),
                n = me();
              s[e] = n;
              var r = new Float32Array(t),
                i = ((ue[0] - le[0]) / se) * ((ue[1] - le[1]) / se) * 6 * 2,
                o = new Float32Array(i);
              ve(r, o),
                (c[e] = r.BYTES_PER_ELEMENT),
                (l[e] = o.BYTES_PER_ELEMENT),
                (_[e] = fe.createBuffer()),
                fe.bindBuffer(fe.ARRAY_BUFFER, _[e]),
                fe.bufferData(fe.ARRAY_BUFFER, r, fe.STATIC_DRAW),
                (u[e] = fe.createBuffer()),
                fe.bindBuffer(fe.ARRAY_BUFFER, u[e]),
                fe.bufferData(fe.ARRAY_BUFFER, o, fe.STATIC_DRAW);
            }
            V = 4;
          })(),
          ((he = new Image()).src = "./logo_bg.png"),
          he.addEventListener("load", function () {
            var e = document.createElement("canvas");
            (e.width = he.height), (e.height = he.height);
            var t = e.getContext("2d");
            t.drawImage(he, 0, 0, he.height, he.height);
            let n = t.getImageData(0, 0, he.height, he.height).data,
              r = n.length / 4,
              i = new Uint8Array(r),
              o = new Uint8Array(r),
              a = new Uint8Array(r);
            for (let e = 0; e < r; e++) {
              let t = n[4 * e],
                r = n[4 * e + 1],
                _ = n[4 * e + 2];
              (i[e] = 0.299 * t + 0.587 * r + 0.114 * _),
                (o[e] = -0.147108 * t - 0.288804 * r + 0.435912 * _ + 128),
                (a[e] = 0.614777 * t - 0.514799 * r - 0.099978 * _ + 128);
            }
            let _ = e.width,
              c = e.height;
            for (
              var s = [fe.TEXTURE0, fe.TEXTURE1, fe.TEXTURE2],
                l = [i, o, a],
                u = [_, _ / 2, _ / 2],
                d = [c, c / 2, c / 2],
                f = 0;
              f < 3;
              f++
            )
              (oe[f] = fe.createTexture()),
                fe.activeTexture(s[f]),
                fe.bindTexture(fe.TEXTURE_2D, oe[f]),
                fe.texParameteri(
                  fe.TEXTURE_2D,
                  fe.TEXTURE_MIN_FILTER,
                  fe.LINEAR
                ),
                fe.texParameteri(
                  fe.TEXTURE_2D,
                  fe.TEXTURE_WRAP_S,
                  fe.CLAMP_TO_EDGE
                ),
                fe.texParameteri(
                  fe.TEXTURE_2D,
                  fe.TEXTURE_WRAP_T,
                  fe.CLAMP_TO_EDGE
                ),
                fe.texImage2D(
                  fe.TEXTURE_2D,
                  0,
                  fe.LUMINANCE,
                  u[f],
                  d[f],
                  0,
                  fe.LUMINANCE,
                  fe.UNSIGNED_BYTE,
                  l[f]
                );
            (Y = he.height / 2),
              (ce = he.height),
              (_e = he.width),
              (F = he.width / 2),
              (H = he.height / 2);
          });
      };
      const B = function (e) {
        function t() {
          return vec3(0, 0, 0);
        }
        function n() {
          return vec3(1, 1, 1);
        }
        function r() {
          return vec3(0, 0, 0);
        }
        function i() {
          return vec3(60, 0, 0);
        }
        function o() {
          return vec3(0, 0, 3);
        }
        function a() {
          var e = {};
          return (
            (e._pos = t()),
            (e._scale = n()),
            (e._rotate = r()),
            (e._texpos = t()),
            (e._texscale = n()),
            (e._texrotate = r()),
            e
          );
        }
        var _,
          c,
          s,
          l,
          u,
          d,
          f,
          h = [
            {
              _item: [
                {
                  _winpos: [0, 0, 12, 12],
                  _default: a(),
                  _matrix: a(),
                  _vertype: VERTEX_TYPE_NORMAL,
                  _ismain: !0,
                  _showframe: !1,
                },
              ],
              _mode: SCRN_NORMAL,
              _count: 1,
              _showselected: !1,
            },
            {
              _item: [
                {
                  _winpos: [0, 0, 12, 12],
                  _default: a(),
                  _matrix: a(),
                  _vertype: VERTEX_TYPE_HEMISPHERE,
                  _ismain: !0,
                  _showframe: !1,
                },
              ],
              _mode: SCRN_HEMISPHERE,
              _count: 1,
              _showselected: !1,
            },
            {
              _item: [
                {
                  _winpos: [0, 0, 12, 12],
                  _default: {
                    _pos: vec3(0, 0, 0),
                    _scale: n(),
                    _rotate: vec3(-30, 0, 0),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _matrix: {
                    _pos: vec3(0, 0, 0),
                    _scale: n(),
                    _rotate: vec3(-30, 0, 0),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _vertype: VERTEX_TYPE_CYLINDER,
                  _ismain: !0,
                  _showframe: !1,
                },
              ],
              _mode: SCRN_CYLINDER,
              _count: 1,
              _showselected: !1,
            },
            {
              _item: [
                {
                  _winpos: [0, 0, 12, 12],
                  _default: a(),
                  _matrix: a(),
                  _vertype: VERTEX_TYPE_EXPAND,
                  _ismain: !0,
                  _showframe: !1,
                },
              ],
              _mode: SCRN_EXPAND,
              _count: 1,
              _showselected: !1,
            },
            {
              _item: [
                {
                  _winpos: [-12, 6, 24, 6],
                  _default: a(),
                  _matrix: a(),
                  _vertype: VERTEX_TYPE_PANORAMA,
                  _ismain: !0,
                  _showframe: !1,
                },
                {
                  _winpos: [0, 0, 24, 6],
                  _default: a(),
                  _matrix: a(),
                  _vertype: VERTEX_TYPE_PANORAMA,
                  _ismain: !1,
                  _showframe: !1,
                },
              ],
              _mode: SCRN_UPDOWN,
              _count: 2,
              _showselected: !1,
            },
            {
              _item: [
                {
                  _winpos: [0, 0, 6, 6],
                  _default: {
                    _pos: o(),
                    _scale: n(),
                    _rotate: i(),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _matrix: {
                    _pos: o(),
                    _scale: n(),
                    _rotate: i(),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _vertype: VERTEX_TYPE_HEMISPHERE,
                  _ismain: !1,
                  _showframe: !1,
                },
                {
                  _winpos: [6, 0, 6, 6],
                  _default: {
                    _pos: o(),
                    _scale: n(),
                    _rotate: vec3(60, 0, -90),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _matrix: {
                    _pos: o(),
                    _scale: n(),
                    _rotate: vec3(60, 0, -90),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _vertype: VERTEX_TYPE_HEMISPHERE,
                  _ismain: !1,
                  _showframe: !1,
                },
                {
                  _winpos: [0, 6, 6, 6],
                  _default: {
                    _pos: o(),
                    _scale: n(),
                    _rotate: vec3(60, 0, -180),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _matrix: {
                    _pos: o(),
                    _scale: n(),
                    _rotate: vec3(60, 0, -180),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _vertype: VERTEX_TYPE_HEMISPHERE,
                  _ismain: !1,
                  _showframe: !1,
                },
                {
                  _winpos: [6, 6, 6, 6],
                  _default: {
                    _pos: o(),
                    _scale: n(),
                    _rotate: vec3(60, 0, -270),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _matrix: {
                    _pos: o(),
                    _scale: n(),
                    _rotate: vec3(60, 0, -270),
                    _texpos: t(),
                    _texscale: n(),
                    _texrotate: r(),
                  },
                  _vertype: VERTEX_TYPE_HEMISPHERE,
                  _ismain: !1,
                  _showframe: !1,
                },
              ],
              _mode: SCRN_FOUR,
              _count: 4,
              _showselected: !1,
            },
          ],
          p = 0,
          P = 0,
          m = [],
          v = -1,
          E = -1,
          R = -1,
          A = this,
          T = e;
        T || console.log("gl failed");
        var g = new b(T, 1.7, T.canvas.width / T.canvas.height, 1),
          O = T.canvas.width,
          y = T.canvas.height;
        function C() {
          return new Date().valueOf();
        }
        (this.DrawSelf = function () {
          T.viewport(0, 0, T.canvas.width, T.canvas.height),
            T.enable(T.DEPTH_TEST),
            T.clearColor(0, 0, 0, 1),
            T.clear(T.COLOR_BUFFER_BIT | T.DEPTH_BUFFER_BIT);
          for (
            var e = T.canvas.width / 12,
              t = T.canvas.height / 12,
              n = h[p],
              r = 0;
            r < n._count;
            r++
          )
            T.viewport(
              n._item[r]._winpos[0] * e,
              n._item[r]._winpos[1] * t,
              n._item[r]._winpos[2] * e,
              n._item[r]._winpos[3] * t
            ),
              g.Transform(TRANSFORM_TYPE_POSITION, n._item[r]._matrix._pos, !1),
              g.Transform(TRANSFORM_TYPE_SCALE, n._item[r]._matrix._scale, !1),
              g.Transform(
                TRANSFORM_TYPE_ROTATE,
                n._item[r]._matrix._rotate,
                !1
              ),
              g.Transform(
                TRANSFORM_TYPE_POSITION,
                n._item[r]._matrix._texpos,
                !0
              ),
              g.Transform(
                TRANSFORM_TYPE_SCALE,
                n._item[r]._matrix._texscale,
                !0
              ),
              g.Transform(
                TRANSFORM_TYPE_ROTATE,
                n._item[r]._matrix._texrotate,
                !0
              ),
              g.SwitchMode(n._item[r]._vertype),
              g.DrawSelf();
          T.viewport(0, 0, T.canvas.width, T.canvas.height);
        }),
          (this.ClearTexture = function () {
            g.ClearTexture();
          }),
          (this.LoadTexture = function (e, t, n) {
            var r = {},
              i = [T.TEXTURE0, T.TEXTURE1, T.TEXTURE2],
              o = t * n,
              a = o >> 2,
              _ = [
                e.subarray(0, o),
                e.subarray(o, o + a),
                e.subarray(o + a, o + 2 * a),
              ];
            r.texture = new Array(3);
            for (
              var c = [t, t / 2, t / 2], s = [n, n / 2, n / 2], l = 0;
              l < 3;
              l++
            )
              (r.texture[l] = T.createTexture()),
                T.activeTexture(i[l]),
                T.bindTexture(T.TEXTURE_2D, r.texture[l]),
                T.texParameteri(T.TEXTURE_2D, T.TEXTURE_MIN_FILTER, T.LINEAR),
                T.texParameteri(
                  T.TEXTURE_2D,
                  T.TEXTURE_WRAP_S,
                  T.CLAMP_TO_EDGE
                ),
                T.texParameteri(
                  T.TEXTURE_2D,
                  T.TEXTURE_WRAP_T,
                  T.CLAMP_TO_EDGE
                ),
                T.texImage2D(
                  T.TEXTURE_2D,
                  0,
                  T.LUMINANCE,
                  c[l],
                  s[l],
                  0,
                  T.LUMINANCE,
                  T.UNSIGNED_BYTE,
                  _[l]
                );
            return (r.texwidth = t), (r.texheight = n), g.SetTexture(r), r;
          }),
          (this.LoadTextureFormFile = function (e, t) {
            var n = new Image();
            n.src = e;
            var r = {};
            return (
              n.addEventListener("load", function () {
                (r.texture = T.createTexture()),
                  T.activeTexture(T.TEXTURE0),
                  T.bindTexture(T.TEXTURE_2D, r.texture),
                  T.texImage2D(
                    T.TEXTURE_2D,
                    0,
                    T.RGBA,
                    T.RGBA,
                    T.UNSIGNED_BYTE,
                    n
                  ),
                  T.texParameteri(
                    T.TEXTURE_2D,
                    T.TEXTURE_MAG_FILTER,
                    T.NEAREST
                  ),
                  T.texParameteri(
                    T.TEXTURE_2D,
                    T.TEXTURE_MIN_FILTER,
                    T.NEAREST
                  ),
                  T.texParameteri(
                    T.TEXTURE_2D,
                    T.TEXTURE_WRAP_S,
                    T.CLAMP_TO_EDGE
                  ),
                  T.texParameteri(
                    T.TEXTURE_2D,
                    T.TEXTURE_WRAP_T,
                    T.CLAMP_TO_EDGE
                  ),
                  T.generateMipmap(T.TEXTURE_2D),
                  (r.texwidth = n.width),
                  (r.texheight = n.height),
                  g.SetTexture(r),
                  null != t && t(r);
              }),
              r
            );
          }),
          (this.Transform = function (e, t, n, r) {
            if (!(r >= h[p]._count))
              if (n)
                switch (e) {
                  case TRANSFORM_TYPE_POSITION:
                    cpvec3(t, h[p]._item[r]._matrix._texpos);
                    break;
                  case TRANSFORM_TYPE_SCALE:
                    cpvec3(t, h[p]._item[r]._matrix._texscale);
                    break;
                  case TRANSFORM_TYPE_ROTATE:
                    cpvec3(t, h[p]._item[r]._matrix._texrotate);
                }
              else
                switch (e) {
                  case TRANSFORM_TYPE_POSITION:
                    cpvec3(t, h[p]._item[r]._matrix._pos);
                    break;
                  case TRANSFORM_TYPE_SCALE:
                    cpvec3(t, h[p]._item[r]._matrix._scale);
                    break;
                  case TRANSFORM_TYPE_ROTATE:
                    cpvec3(t, h[p]._item[r]._matrix._rotate);
                }
          }),
          (this.SetFishEyeParameter = function (e, t, n) {
            g.SetFishEyeParameter(e, t, n);
          }),
          (this.SwitchMode = function (e) {
            e < 0 || e > 5 || (p = e);
          }),
          (this.StartAnimation = function (e, t, n, r, i, o, a, _) {
            var c = h[p];
            if (!(o < 0 || o >= c._count)) {
              var s = {};
              switch (
                ((s._onEnd = _),
                (s._end = new Float32Array(3)),
                cpvec3(e, s._end),
                (s._start = new Float32Array(3)),
                (s._value = new Float32Array(3)),
                (s._Inertia = a),
                r)
              ) {
                case TRANSFORM_TYPE_POSITION:
                  i
                    ? (cpvec3(c._item[o]._matrix._texpos, s._start),
                      cpvec3(c._item[o]._matrix._texpos, s._value))
                    : (cpvec3(c._item[o]._matrix._pos, s._start),
                      cpvec3(c._item[o]._matrix._pos, s._value));
                  break;
                case TRANSFORM_TYPE_SCALE:
                  i
                    ? (cpvec3(c._item[o]._matrix._texscale, s._start),
                      cpvec3(c._item[o]._matrix._texscale, s._value))
                    : (cpvec3(c._item[o]._matrix._scale, s._start),
                      cpvec3(c._item[o]._matrix._scale, s._value));
                  break;
                case TRANSFORM_TYPE_ROTATE:
                  i
                    ? (cpvec3(c._item[o]._matrix._texrotate, s._start),
                      cpvec3(c._item[o]._matrix._texrotate, s._value))
                    : (cpvec3(c._item[o]._matrix._rotate, s._start),
                      cpvec3(c._item[o]._matrix._rotate, s._value));
              }
              return (
                (s._isloop = n),
                (s._istexture = i),
                (s._type = r),
                (s._step = t),
                (s._stepcount = 0),
                (s._index = o),
                s._isloop
                  ? (s._unit = s._end)
                  : (s._unit = vec3(
                      (e[0] - s._start[0]) / t,
                      (e[1] - s._start[1]) / t,
                      (e[2] - s._start[2]) / t
                    )),
                m.push(s),
                s
              );
            }
          }),
          (this.TapOrMouseDown = function (e, t) {
            (R = (function (e, t, n) {
              var r, i, o;
              switch (n) {
                case SCRN_UPDOWN:
                  o = t > y / 2 ? 1 : 0;
                  break;
                case SCRN_FOUR:
                  (r = parseInt(e / (O / 2))),
                    (i = parseInt(t / (y / 2))),
                    (o = parseInt(r + 2 * (1 - i)));
                  break;
                default:
                  o = 0;
              }
              return o;
            })(e, t, p)),
              (m = []),
              (v = e),
              (E = t),
              (_ = e),
              (c = t),
              (s = C());
          }),
          (this.TapOrMouseMove = function (e, t) {
            var n, r;
            if (!(v < 0 && E < 0)) {
              var i = new Float32Array(3),
                o = new Float32Array(3),
                a = new Float32Array(3),
                _ = new Float32Array(3),
                s = new Float32Array(3),
                m = new Float32Array(3),
                A = h[p],
                T = P;
              switch (p) {
                case SCRN_NORMAL:
                  (n = e - v),
                    (r = t - E),
                    cpvec3(A._item[0]._matrix._scale, a),
                    a[0] > 1.00001 &&
                      ((l = ((a[0] - 1) * O) / y),
                      (d = -l),
                      (u = a[1] - 1),
                      (f = -u),
                      cpvec3(A._item[0]._matrix._pos, i),
                      (i[0] += (n / O) * 2),
                      (i[1] -= (r / y) * 2),
                      i[0] > l && (i[0] = l),
                      i[0] < d && (i[0] = d),
                      i[1] > u && (i[1] = u),
                      i[1] < f && (i[1] = f),
                      cpvec3(i, A._item[0]._matrix._pos));
                  break;
                case SCRN_HEMISPHERE:
                  cpvec3(A._item[0]._matrix._scale, i),
                    cpvec3(A._item[0]._matrix._rotate, o),
                    T
                      ? ((l = 60 - 60 / i[1] / 2),
                        (d = -l),
                        (u = 30 - 60 / i[0] / 2),
                        (f = -u),
                        (o[0] = o[0] + ((t - E) / y) * 90),
                        (o[1] = o[1] + ((e - v) / O) * 90),
                        o[1] > l + 20 && (o[1] = l + 20),
                        o[1] < d - 20 && (o[1] = d - 20),
                        o[0] > u + 10 && (o[0] = u + 10),
                        o[0] < f - 10 && (o[0] = f - 10),
                        cpvec3(o, A._item[0]._matrix._rotate))
                      : ((u = 90 - 60 / i[1] / 2),
                        (f = 0),
                        (o[0] = o[0] + ((t - E) / y) * 90),
                        (o[2] = o[2] + ((e - v) / O) * 90),
                        o[0] > u + 10 && (o[0] = u + 10),
                        o[0] < f - 10 && (o[0] = f - 10),
                        cpvec3(o, A._item[0]._matrix._rotate));
                  break;
                case SCRN_CYLINDER:
                  cpvec3(A._item[0]._matrix._scale, a),
                    cpvec3(A._item[0]._matrix._rotate, _),
                    cpvec3(A._item[0]._matrix._texscale, s),
                    cpvec3(A._item[0]._matrix._texpos, m),
                    Math.abs(e - v) < 20 &&
                      Math.abs(t - c) > 20 &&
                      ((s[0] += (10 * (E - t)) / y),
                      s[0] < 1 && (s[0] = 1),
                      s[0] > 6 && (s[0] = 6),
                      (_[0] = 6 * (s[0] - 1) - 30),
                      (a = vec3(
                        1 + 0.1 * (s[0] - 1),
                        1 + 0.1 * (s[0] - 1),
                        1 + 0.1 * (s[0] - 1)
                      )),
                      cpvec3(s, A._item[0]._matrix._texscale),
                      cpvec3(_, A._item[0]._matrix._rotate),
                      cpvec3(a, A._item[0]._matrix._scale)),
                    (m[0] -= (e - v) / O),
                    cpvec3(m, A._item[0]._matrix._texpos);
                  break;
                case SCRN_UPDOWN:
                  cpvec3(A._item[R]._matrix._texpos, m),
                    (m[0] -= (2 * (e - v)) / O),
                    cpvec3(m, A._item[R]._matrix._texpos);
                  break;
                case SCRN_FOUR:
                  R >= 0 &&
                    (cpvec3(A._item[R]._matrix._rotate, o),
                    cpvec3(A._item[R]._matrix._scale, i),
                    (u = 90 - (60 - 100 * (i[1] - 1) * 8) / 2),
                    (f = 0),
                    (o[0] = o[0] + ((t - E) / y) * 90),
                    (o[2] = o[2] + ((e - v) / O) * 90),
                    o[0] > u + 10 && (o[0] = u + 10),
                    o[0] < f - 10 && (o[0] = f - 10),
                    cpvec3(o, A._item[R]._matrix._rotate));
              }
              (v = e), (E = t);
            }
          }),
          (this.TapOrMouseUp = function (e, t) {
            new Float32Array(3);
            var n,
              r = new Float32Array(3),
              i = new Float32Array(3),
              o = new Float32Array(3),
              a = new Float32Array(3),
              m = new Float32Array(3),
              T = h[p],
              g = P;
            switch (p) {
              case SCRN_NORMAL:
                cpvec3(T._item[0]._matrix._scale, i),
                  i[0] > 1.00001 &&
                    (cpvec3(T._item[0]._matrix._pos, r),
                    (n = C() - s) < 1500 &&
                      n > 100 &&
                      Math.abs(e - _) > 30 &&
                      ((r[0] += (e - _) / O / (n / 1e3)),
                      (r[1] -= (t - c) / y / (n / 1e3)),
                      r[0] > l && (r[0] = l),
                      r[0] < d && (r[0] = d),
                      r[1] > u && (r[1] = u),
                      r[1] < f && (r[1] = f),
                      A.StartAnimation(
                        r,
                        100,
                        !1,
                        TRANSFORM_TYPE_POSITION,
                        !1,
                        0,
                        !0,
                        null
                      )));
                break;
              case SCRN_HEMISPHERE:
                cpvec3(T._item[0]._matrix._rotate, r),
                  g
                    ? (r[1] > l && (r[1] = l),
                      r[1] < d && (r[1] = d),
                      r[0] > u && (r[0] = u),
                      r[0] < f && (r[0] = f),
                      A.StartAnimation(
                        r,
                        100,
                        !1,
                        TRANSFORM_TYPE_ROTATE,
                        !1,
                        0,
                        !0,
                        null
                      ))
                    : (r[0] > u && (r[0] = u),
                      r[0] < f && (r[0] = f),
                      (n = C() - s),
                      Math.abs(e - _) > 30 &&
                        ((r[2] += ((e - _) / O / (n / 1e3)) * 180),
                        A.StartAnimation(
                          r,
                          100,
                          !1,
                          TRANSFORM_TYPE_ROTATE,
                          !1,
                          0,
                          !0,
                          null
                        )));
                break;
              case SCRN_CYLINDER:
                cpvec3(T._item[0]._matrix._texpos, r),
                  cpvec3(T._item[0]._matrix._scale, i),
                  cpvec3(T._item[0]._matrix._rotate, o),
                  cpvec3(T._item[0]._matrix._texscale, a),
                  cpvec3(T._item[0]._matrix._texpos, m),
                  (n = C() - s) < 1500 &&
                    n > 0 &&
                    (r[0] -= ((e - _) / O / (n / 1e3)) * 2),
                  A.StartAnimation(
                    r,
                    100,
                    !1,
                    TRANSFORM_TYPE_POSITION,
                    !0,
                    0,
                    !0,
                    null
                  ),
                  1 != a[0] &&
                    6 != a[0] &&
                    (a[0] < 1.3
                      ? ((a[0] = 1), (o[0] = -30), (i = vec3(1, 1, 1)))
                      : ((a[0] = 6), (o[0] = 0), (i = vec3(1.5, 1.5, 1.5))),
                    A.StartAnimation(
                      a,
                      100,
                      !1,
                      TRANSFORM_TYPE_SCALE,
                      !0,
                      0,
                      !0,
                      null
                    ),
                    A.StartAnimation(
                      o,
                      100,
                      !1,
                      TRANSFORM_TYPE_ROTATE,
                      !1,
                      0,
                      !0,
                      null
                    ),
                    A.StartAnimation(
                      i,
                      100,
                      !1,
                      TRANSFORM_TYPE_SCALE,
                      !1,
                      0,
                      !0,
                      null
                    ));
                break;
              case SCRN_UPDOWN:
                cpvec3(T._item[R]._matrix._texpos, r),
                  (n = C() - s) < 1500 &&
                    n > 0 &&
                    (r[0] -= ((e - _) / O / (n / 1e3)) * 2),
                  A.StartAnimation(
                    r,
                    100,
                    !1,
                    TRANSFORM_TYPE_POSITION,
                    !0,
                    R,
                    !0,
                    null
                  );
                break;
              case SCRN_FOUR:
                R >= 0 &&
                  (cpvec3(T._item[R]._matrix._rotate, r),
                  r[0] > u && (r[0] = u),
                  r[0] < f && (r[0] = f),
                  (n = C() - s) < 1500 &&
                    n > 0 &&
                    Math.abs(e - _) > 30 &&
                    ((r[2] += ((e - _) / O / (n / 1e3)) * 180),
                    A.StartAnimation(
                      r,
                      100,
                      !1,
                      TRANSFORM_TYPE_ROTATE,
                      !1,
                      R,
                      !0,
                      null
                    )));
            }
            (v = -1), (E = -1), (_ = -1), (c = -1), (s = 0), (R = -1);
          }),
          (this.SetWallmode = function (e) {
            P = e;
          }),
          (this.tick = function () {
            !(function () {
              for (var e = h[p], t = m.length - 1; t >= 0; t--) {
                if (((ani = m[t]), ani._Inertia)) {
                  var n = Math.PI / 180,
                    r =
                      Math.sin(n * ani._stepcount * (90 / ani._step)) *
                      (ani._end[0] - ani._start[0]),
                    i =
                      Math.sin(n * ani._stepcount * (90 / ani._step)) *
                      (ani._end[1] - ani._start[1]),
                    o =
                      Math.sin(n * ani._stepcount * (90 / ani._step)) *
                      (ani._end[2] - ani._start[2]);
                  ani._value = addvec3(ani._start, vec3(r, i, o));
                } else ani._value = addvec3(ani._value, ani._unit);
                switch (ani._type) {
                  case TRANSFORM_TYPE_POSITION:
                    ani._istexture
                      ? cpvec3(ani._value, e._item[ani._index]._matrix._texpos)
                      : cpvec3(ani._value, e._item[ani._index]._matrix._pos);
                    break;
                  case TRANSFORM_TYPE_SCALE:
                    ani._istexture
                      ? cpvec3(
                          ani._value,
                          e._item[ani._index]._matrix._texscale
                        )
                      : cpvec3(ani._value, e._item[ani._index]._matrix._scale);
                    break;
                  case TRANSFORM_TYPE_ROTATE:
                    ani._istexture
                      ? cpvec3(
                          ani._value,
                          e._item[ani._index]._matrix._texrotate
                        )
                      : cpvec3(ani._value, e._item[ani._index]._matrix._rotate);
                }
                if (
                  (ani._stepcount++,
                  ani._stepcount >= ani._step && !ani._isloop)
                ) {
                  null != ani._onEnd && ani._onEnd(ani);
                  var a = m.indexOf(ani);
                  a > -1 && m.splice(a, 1);
                }
              }
            })(),
              A.DrawSelf(),
              window.setTimeout(A.tick, 40);
          }),
          (this.ClearAnimation = function () {
            m = [];
          }),
          window.setTimeout(this.tick, 40);
      };
      console.log("ParametricManager", B),
        (window.CryptoJS = r()),
        (window.p2papi = L),
        (window.ConnectApi = L),
        (window.kp2pPlayer = function (e, t, n, r) {
          (this.fetchController = null),
            (this.httpflv = null),
            this.parsecount,
            this.lastframetime,
            this.flvpts,
            (this.requestUrl = "");
          var i = e,
            o = this,
            a = null,
            _ = null,
            c = null,
            s = "",
            l = null,
            u = 0,
            d = 0,
            f = 0,
            h = 0,
            p = 0,
            P = 0,
            m = 0,
            v = !1,
            E = document.createElement("canvas");
          (E.visible = !1),
            (this.OnTooManyFrames = null),
            (this.OnNeedFrames = null);
          var R,
            A,
            T = null,
            g = !1,
            O = !1,
            y = n,
            C = [],
            M = 40,
            S = 1,
            I = !0,
            w = 0,
            D = 0,
            x = -1,
            N = null,
            k = null,
            L = "snapshot.png";
          this.winIndex = n;
          var b = r,
            U = { callback: null, index: 0 },
            F = null;
          if ((console.log("threeD", r), console.log("canvas", e), r)) {
            console.log("canvas1", e);
            var H =
              e.getContext("webgl", { preserveDrawingBuffer: !0 }) ||
              e.getContext("experimental-webgl", { preserveDrawingBuffer: !0 });
            console.log("gl", H),
              null != H ? (a = new B(H)) : ((l = e.getContext("2d")), (b = !1));
          } else l = e.getContext("2d");
          if (t)
            (_ = new Worker("Decoder.js")).addEventListener(
              "message",
              function (e) {
                var t = e.data;
                t.consoleLog
                  ? console.log(t.consoleLog)
                  : A(new Uint8Array(t.buf), t.width, t.height);
              }
            ),
              _.postMessage({
                type: "Broadway.js - Worker init",
                options: { rgb: null == a },
              });
          else {
            var Y = this;
            A = function (e, t, n, r, i) {
              var o = new Date().getTime(),
                a = o - 0;
              d <= a ? (d = a) : (0 == u || u >= a) && (u = a),
                a,
                0,
                (0 == t && 0 == n) ||
                  (Y.DrawPicture(e, t, n),
                  Y.setDecodeTime(z() - R),
                  Y.setPlaybackTime(D));
            };
          }
          function V(e) {
            if (
              (console.log("loadLogo", N),
              console.log(N),
              console.log("parametric", a),
              N)
            ) {
              const e = document.createElement("canvas");
              (e.width = N.width), (e.height = N.height);
              const t = e.getContext("2d");
              t.drawImage(N, 0, 0);
              const n = t.getImageData(0, 0, e.width, e.height);
              if (r) {
                const e = new Uint8Array(n.data);
                return console.log("207", e), a.ClearTexture(), 0;
              }
              l.drawImage(N, 0, 0, N.width, N.height, 0, 0, i.width, i.height);
            } else
              ((N = new Image()).src = e || "./logo_bg.png"),
                (N.onload = function () {
                  console.log("图片加载", N);
                  const e = document.createElement("canvas");
                  (e.width = N.width), (e.height = N.height);
                  const t = e.getContext("2d");
                  t.drawImage(N, 0, 0);
                  const n = t.getImageData(0, 0, e.width, e.height);
                  if (r) {
                    const e = new Uint8Array(n.data);
                    return (
                      console.log("207", e),
                      console.log("parametric", a),
                      a.ClearTexture(),
                      0
                    );
                  }
                  l.drawImage(
                    N,
                    0,
                    0,
                    N.width,
                    N.height,
                    0,
                    0,
                    i.width,
                    i.height
                  );
                });
          }
          function z() {
            return new Date().valueOf();
          }
          function X() {
            if (!I) return console.log("执行关闭码流操作"), void V();
            C.length < 100 &&
              null != T &&
              !g &&
              O &&
              (T(y), (g = !0), (O = !1));
            var e = M,
              t = 40;
            if (!v) {
              if (C.length > 0) {
                var n = new Date().getTime(),
                  r = C.shift();
                (D = r.timestamp),
                  (R = z()),
                  (o.codec = r.encode),
                  c
                    ? s != r.encode &&
                      (c.UninitDecoder(),
                      "H264" == r.encode
                        ? c.InitDecoder(!1, !b)
                        : "H265" == r.encode && c.InitDecoder(!0, !b),
                      (s = r.encode))
                    : (((c = new hevcDecoder()).onPictureDecoded = A),
                      "H264" == r.encode
                        ? c.InitDecoder(!1, !b)
                        : "H265" == r.encode && c.InitDecoder(!0, !b),
                      (s = r.encode)),
                  r.index != m && 1 != r.frame_type
                    ? console.log(
                        "decode frame index ",
                        m,
                        " frameIndex ",
                        r.index,
                        " frametype ",
                        r.frame_type
                      )
                    : (c.DirectDecode(r.frame),
                      (m = r.index + 1),
                      (t = new Date().getTime() - n) > p
                        ? (p = t)
                        : (t < h || h <= 0) && (h = t),
                      x < 0 && (x = z()));
              }
              C.length > 0 && (e = C[0].timestamp - D - t),
                (e > 100 || e < 0) && (e = 0);
            }
            I
              ? 0 == w
                ? window.setTimeout(X, 10)
                : window.setTimeout(X, e * S)
              : (console.log("clear frameList"),
                (C = []),
                null != a && a.ClearTexture());
          }
          function K() {
            var e = -1;
            if (!o.httpflv) return e;
            (new Date().getTime() - o.lastframetime >= o.flvpts - 16 ||
              o.parsecount < 3) &&
              (e = o.httpflv.parse()),
              window.requestAnimationFrame && window.requestAnimationFrame(K),
              0 == e &&
                (o.parsecount++, (o.lastframetime = new Date().getTime()));
          }
          !(function () {
            if (null != a) {
              i.addEventListener(
                "mousedown",
                function (e) {
                  a.TapOrMouseDown(e.offsetX, e.offsetY);
                },
                !1
              ),
                i.addEventListener(
                  "mouseup",
                  function (e) {
                    a.TapOrMouseUp(e.offsetX, e.offsetY);
                  },
                  !1
                ),
                i.addEventListener(
                  "mousemove",
                  function (e) {
                    a.TapOrMouseMove(e.offsetX, e.offsetY);
                  },
                  !1
                );
              var e = {};
              i.addEventListener(
                "touchstart",
                function (e) {
                  var t = e.touches[0],
                    n = new MouseEvent("mousedown", {
                      clientX: t.clientX,
                      clientY: t.clientY,
                    });
                  i.dispatchEvent(n);
                },
                !1
              ),
                i.addEventListener(
                  "touchend",
                  function (t) {
                    var n = new MouseEvent("mouseup", e);
                    i.dispatchEvent(n);
                  },
                  !1
                ),
                i.addEventListener(
                  "touchmove",
                  function (t) {
                    var n = t.touches[0];
                    (e.clientX = n.clientX), (e.clientY = n.clientY);
                    var r = new MouseEvent("mousemove", {
                      clientX: n.clientX,
                      clientY: n.clientY,
                    });
                    i.dispatchEvent(r);
                  },
                  !1
                );
            }
          })(),
            V(),
            (this.fillframe = function (e, t, n) {
              0 == f && (f = new Date().getTime()),
                c
                  ? s != n &&
                    (c.UninitDecoder(),
                    "H264" == n
                      ? c.InitDecoder(!1, !b)
                      : "H265" == n && c.InitDecoder(!0, !b),
                    (s = n))
                  : (((c = new hevcDecoder()).onPictureDecoded = A),
                    "H264" == n
                      ? c.InitDecoder(!1, !b)
                      : "H265" == n && c.InitDecoder(!0, !b),
                    (s = n)),
                c.DirectDecode(e);
            }),
            (this.deinit = function () {
              c && (c.UninitDecoder(), (c = null));
            }),
            (this.fillframe_v2 = function (e, t, n, r, i, o, a) {
              I &&
                (C.push({
                  frame: e,
                  frame_len: t,
                  encode: n,
                  timestamp: r,
                  index: P,
                  frame_width: i,
                  frame_height: o,
                  frame_type: a,
                }),
                P++,
                C.length > 200 &&
                  (null == this.OnTooManyFrames ||
                    O ||
                    (this.OnTooManyFrames(y), (O = !0), (g = !1))));
            }),
            (this.DrawPicture = function (e, t, n) {
              if (null != a) a.LoadTexture(new Uint8Array(e), t, n);
              else {
                E.width != t && (E.width = t), E.height != n && (E.height = n);
                var r = E.getContext("2d"),
                  o = r.createImageData(t, n);
                o.data.set(e),
                  r.putImageData(o, 0, 0),
                  l.drawImage(
                    E,
                    0,
                    0,
                    E.width,
                    E.height,
                    0,
                    0,
                    i.width,
                    i.height
                  );
              }
            }),
            (this.LogPlayInfo = function () {}),
            (this.pauseDecode = function () {
              v = !0;
            }),
            (this.continueDecode = function () {
              v = !1;
            }),
            (this.fast = function () {
              S <= 0 || (S <= 0.125 ? (S = 0) : (S /= 2));
            }),
            (this.slow = function () {
              S >= 4 || (S <= 0 ? (S = 0.25) : (S *= 2));
            }),
            (this.reset = function () {
              S = 1;
            }),
            (this.close = function () {
              (I = !1),
                (C = []),
                console.log("clear frameList"),
                (L = "snapshot.png");
            }),
            (this.cleanFrame = function () {
              console.log("clear frameList"), (C = []);
            }),
            (this.open = function () {
              console.log("open方法 kp2p play"),
                (I = !0),
                (C = []),
                (T = this.OnNeedFrames),
                X(this.OnNeedFrames);
            }),
            (this.SetStreamMode = function (e) {
              w = e;
            }),
            (this.GetVersion = function () {
              return "1.0.0.0";
            }),
            (this.LogPlayInfo_v2 = function () {}),
            (this.Snapshot = function (e, t, n, r, o) {
              t && (L = t),
                1 === e ||
                  (function (e, t, n) {
                    var r = document.createElement("a"),
                      o = "image/png",
                      a = "";
                    if (
                      ((o =
                        L.indexOf("jpg") > -1 || L.indexOf("jpeg") > -1
                          ? "image/jpeg"
                          : "image/png"),
                      e && t)
                    ) {
                      var _ = document.createElement("canvas"),
                        c = _.getContext("2d");
                      (_.width = e),
                        (_.height = t),
                        c.drawImage(i, 0, 0, i.width, i.height, 0, 0, e, t),
                        (a = _.toDataURL(o));
                    } else a = i.toDataURL(o);
                    n
                      ? n(a)
                      : ((r.href = a),
                        (r.download = L),
                        document.body.appendChild(r),
                        r.click(),
                        document.body.removeChild(r),
                        (L = "snapshot.png"));
                  })(n, r, o);
            }),
            (this.renderBackground = function () {
              V();
            }),
            (this.setDecodeTimeCallback = function (e, t) {
              (U.callback = t), (U.index = e);
            }),
            (this.setDecodeTime = function (e) {
              U.callback && U.callback(U.index, e);
            }),
            (this.setPlaybackTimeCallback = function (e) {
              F = e;
            }),
            (this.setPlaybackTime = function (e) {
              F && F(e);
            }),
            (this.stopStream = function () {
              this.fetchController && this.fetchController.abort(),
                this.httpflv &&
                  (this.httpflv.CloseStream(), (this.httpflv = null));
            }),
            (this.requestStream = function (e) {
              this.fetchController = new AbortController();
              const t = this.fetchController.signal;
              (this.httpflv = new JA_HttpFLVParse()),
                this.httpflv.Init(),
                (this.parsecount = 0),
                (this.flvpts = 0),
                (this.requestUrl = e),
                (this.lastframetime = new Date().getTime()),
                (this.httpflv.onFrame = function (e, t, n, r, i) {
                  1 == t && (o.DrawPicture(e, n, r), (o.flvpts = i));
                });
              var n = 0,
                r = !1;
              fetch(e, {
                signal: t,
                headers: { "Transfer-Encoding": "chunked" },
              })
                .then(function (e) {
                  var t = e.body.getReader();
                  return i();
                  function i() {
                    return t.read().then(a);
                  }
                  function a(e) {
                    return e.done
                      ? (console.log("returning"), "Completed")
                      : o.httpflv
                      ? ((n += e.value.byteLength),
                        o.httpflv.sendData(e.value),
                        n > 32768 &&
                          !r &&
                          (o.httpflv.OpenStream(),
                          (r = !0),
                          window.requestAnimationFrame(K)),
                        i())
                      : void 0;
                  }
                })
                .then(function (e) {
                  console.log("all done!", e);
                })
                .then(function (e) {
                  console.log(e);
                });
            }),
            (this.ctrlRecord = function (e, t, n) {
              e && (k = e),
                (function (e, t) {
                  let n = [];
                  const r = i.captureStream();
                  (q = new MediaRecorder(r, {
                    mimeType: "video/webm; codecs=vp9",
                    video: { frameRate: "60fps" },
                  })).addEventListener("dataavailable", (e) => {
                    n.push(e.data), console.log("dataavailable", e.data);
                  }),
                    q.addEventListener("stop", () => {
                      const e = new Blob(n, { type: "video/mp4" }),
                        t = document.createElement("video");
                      (t.src = URL.createObjectURL(e)), (t.controls = !0);
                      const r = document.createElement("a");
                      (r.href = t.src),
                        (r.download = k),
                        document.body.appendChild(r),
                        r.click(),
                        document.body.removeChild(r);
                    }),
                    q.start();
                })();
            }),
            (this.ctrlRecordOff = function () {
              setTimeout(() => {
                q.stop();
              }, 2e3);
            });
          let q = null;
        }),
        (window.remoteApi = e);
    })();
})();

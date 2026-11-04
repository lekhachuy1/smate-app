/* SMate - interactive UI prototype. No backend: every booking, match and reward
   point below is computed in the page and lives only for this session. */
(function () {
  "use strict";

  var LOGO = "assets/logo.png";

  /* ---------------- data ---------------- */

  var SPORTS = [
    { id: "pickleball", name: "Pickleball", pin: "#2f6bff", deep: "#1b3fae" },
    { id: "cau-long", name: "Cầu lông", pin: "#22b573", deep: "#11794b" },
    { id: "bong-da", name: "Bóng đá", pin: "#1d9b3f", deep: "#115c26" },
    { id: "bong-ro", name: "Bóng rổ", pin: "#efa021", deep: "#a3650c" },
    { id: "tennis", name: "Quần vợt", pin: "#b6762a", deep: "#6d4415" }
  ];

  var VENUES = [
    {
      id: "arena1", name: "Sân Arena.01", sport: "cau-long",
      addr: "40 Hoàng Văn Thái, phường Hòa Khánh Nam, Đà Nẵng", area: "Thanh Khê",
      lo: 60000, hi: 80000, courts: 3, rating: 4.8, reviews: 126,
      open: 6, close: 23, phone: "0236 3765 112", owner: "Trần Quốc Việt",
      blurb: "Cụm 3 sân cầu lông thảm Enlio, trần cao 9 m, hệ đèn LED chống chói đạt chuẩn thi đấu phong trào.",
      amen: ["Bãi giữ xe", "Nước uống", "Phòng thay đồ", "Cho thuê vợt", "Căng vợt tại chỗ"],
      dist: 1.2
    },
    {
      id: "hoamy", name: "Hòa Mỹ Pickleball", sport: "pickleball",
      addr: "67 Tô Hiệu, phường Hòa Minh, Đà Nẵng", area: "Thanh Khê",
      lo: 80000, hi: 150000, courts: 4, rating: 4.7, reviews: 98,
      open: 6, close: 22, phone: "0236 3822 404", owner: "Nguyễn Hòa Mỹ",
      blurb: "4 sân pickleball mặt acrylic ngoài trời, có mái che lưới, mở sớm cho khung giờ sáng.",
      amen: ["Bãi giữ xe", "Nước uống", "Cho thuê paddle", "Bóng thi đấu", "Khu nghỉ có quạt"],
      dist: 2.4
    },
    {
      id: "ankhe", name: "Sân Bóng Đá An Khê", sport: "bong-da",
      addr: "21 Hồ Tương, phường An Khê, quận Thanh Khê, Đà Nẵng", area: "Thanh Khê",
      lo: 200000, hi: 400000, courts: 5, rating: 4.6, reviews: 211,
      open: 5, close: 22, phone: "0236 3789 575", owner: "Lê Văn An",
      blurb: "Gồm cụm 5 sân bóng cỏ nhân tạo thế hệ 3, kích thước sân 7 người, lưới chắn bóng cao 6 m.",
      amen: ["Bãi giữ xe", "Căng tin", "Phòng thay đồ", "Cho thuê áo bib", "Trọng tài theo yêu cầu"],
      dist: 3.1
    },
    {
      id: "golden", name: "Golden Tennis Academy", sport: "tennis",
      addr: "Tầng 7, 271 Nguyễn Văn Linh, phường Hải Châu, Đà Nẵng", area: "Hải Châu",
      lo: 100000, hi: 160000, courts: 2, rating: 4.9, reviews: 64,
      open: 6, close: 22, phone: "0236 3651 889", owner: "Phạm Hoàng Long",
      blurb: "2 sân tennis mặt cứng trên tầng thượng, có HLV kèm theo giờ và máy bắn bóng cho buổi tập cá nhân.",
      amen: ["Thang máy", "Nước uống", "Phòng thay đồ", "Cho thuê vợt", "Máy bắn bóng"],
      dist: 4.6
    },
    {
      id: "trongnghia", name: "Sân Trọng Nghĩa", sport: "cau-long",
      addr: "194 Bế Văn Đàn, phường Chính Gián, Đà Nẵng", area: "Thanh Khê",
      lo: 55000, hi: 75000, courts: 6, rating: 4.5, reviews: 142,
      open: 6, close: 22, phone: "0905 414 272", owner: "Đặng Trọng Nghĩa",
      blurb: "6 sân cầu lông trong nhà, sàn gỗ công nghiệp, giá mềm nhất khu vực Chính Gián.",
      amen: ["Bãi giữ xe", "Nước uống", "Cho thuê vợt", "Quầy cầu Hải Yến"],
      dist: 2.0
    },
    {
      id: "betaera", name: "Sân BetaEra", sport: "cau-long",
      addr: "273 – 275 Nguyễn Tri Phương, phường Thạc Gián, Đà Nẵng", area: "Thanh Khê",
      lo: 65000, hi: 90000, courts: 5, rating: 4.7, reviews: 175,
      open: 6, close: 23, phone: "0236 3702 456", owner: "Hồ Thanh Bình",
      blurb: "5 sân thảm, điều hòa toàn khu, có khu khán đài nhỏ cho giải phong trào cuối tuần.",
      amen: ["Điều hòa", "Bãi giữ xe", "Nước uống", "Phòng thay đồ", "Khán đài"],
      dist: 1.8
    },
    {
      id: "tienson", name: "Nhà thi đấu Tiên Sơn", sport: "bong-ro",
      addr: "1 Phan Đăng Lưu, phường Hòa Cường Bắc, Đà Nẵng", area: "Hải Châu",
      lo: 120000, hi: 180000, courts: 2, rating: 4.6, reviews: 88,
      open: 6, close: 22, phone: "0236 3621 999", owner: "Ban quản lý NTĐ",
      blurb: "2 sân bóng rổ tiêu chuẩn trong nhà thi đấu, vành rổ lò xo, bảng mica thi đấu.",
      amen: ["Bãi giữ xe", "Phòng thay đồ", "Cho thuê bóng", "Nước uống"],
      dist: 5.3
    },
    {
      id: "sontra", name: "Pickleball Sơn Trà Bay", sport: "pickleball",
      addr: "25 Võ Nguyên Giáp, phường Phước Mỹ, Đà Nẵng", area: "Sơn Trà",
      lo: 90000, hi: 160000, courts: 3, rating: 4.8, reviews: 73,
      open: 5, close: 22, phone: "0905 778 221", owner: "Võ Thị Bay",
      blurb: "3 sân sát biển, gió nhẹ buổi chiều, khung giờ bình minh 05:00 rất đông khách quen.",
      amen: ["Bãi giữ xe", "Tắm nước ngọt", "Cho thuê paddle", "Quán cà phê"],
      dist: 6.8
    }
  ];

  var REVIEWS = {
    arena1: [["Ngọc Ánh", 5, "Sân sạch, đèn sáng đều, không bị chói khi đánh cầu cao."],
             ["Trần Hải", 4, "Giờ cao điểm hơi khó đặt, nên giữ chỗ trước 2 ngày."]],
    hoamy: [["Minh Thư", 5, "Mặt sân bám tốt, chủ sân cho mượn paddle miễn phí buổi đầu."],
            ["Quang Huy", 4, "Chiều nắng xiên hơi chói ở sân số 1."]],
    ankhe: [["Đức Anh", 5, "Cỏ mới thay, bóng đi chuẩn. Căng tin có nước mát."],
            ["Hoàng Nam", 4, "Bãi xe hơi chật khi có hai trận cùng giờ."]],
    golden: [["Lan Phương", 5, "HLV nhiệt tình, máy bắn bóng rất đáng tiền."]],
    trongnghia: [["Bảo Trân", 4, "Giá tốt, sàn gỗ hơi trơn nếu mang giày cũ."]],
    betaera: [["Tuấn Kiệt", 5, "Có điều hòa nên đánh buổi trưa vẫn thoải mái."]],
    tienson: [["Gia Bảo", 5, "Sân chuẩn thi đấu, vành rổ nảy đẹp."]],
    sontra: [["Thu Hà", 5, "Đánh sớm ngắm biển, không khí quá đã."]]
  };

  var MATCHES = [
    { id: "m1", sport: "cau-long", kind: "Cầu lông", venue: "arena1", day: 0, time: "19:00 – 21:00",
      level: "Trung bình", cost: 35000, cap: 6, joined: 4, host: "Anh Tuấn", rating: 5, mine: false,
      note: "Mang vợt riêng, đến sớm 10 phút. Có cầu sẵn tại sân.",
      names: ["Tuấn", "Hải", "Ngọc", "Bình"] },
    { id: "m2", sport: "bong-da", kind: "Bóng đá 7 người", venue: "ankhe", day: 0, time: "20:30 – 22:00",
      level: "Khá", cost: 50000, cap: 14, joined: 11, host: "Minh Khoa", rating: 4, mine: false,
      note: "Thiếu 3 chân sút. Áo sáng màu, có bib dự phòng tại sân.",
      names: ["Khoa", "Nam", "Sơn", "Đạt", "Phúc", "Lâm", "Vũ", "Kiên", "Tú", "Hòa", "Dũng"] },
    { id: "m3", sport: "pickleball", kind: "Pickleball đôi", venue: "hoamy", day: 1, time: "17:00 – 19:00",
      level: "Mới chơi", cost: 45000, cap: 4, joined: 3, host: "Thu Hà", rating: 5, mine: false,
      note: "Nhóm mới tập, đánh nhẹ nhàng vui là chính.", names: ["Hà", "Mai", "Linh"] },
    { id: "m4", sport: "cau-long", kind: "Cầu lông đôi nam", venue: "betaera", day: 1, time: "06:00 – 08:00",
      level: "Giỏi", cost: 40000, cap: 4, joined: 2, host: "Quốc Việt", rating: 5, mine: false,
      note: "Đánh ăn điểm, ưu tiên bạn đã chơi trên 2 năm.", names: ["Việt", "Thành"] },
    { id: "m5", sport: "bong-ro", kind: "Bóng rổ 3x3", venue: "tienson", day: 2, time: "18:00 – 20:00",
      level: "Trung bình", cost: 30000, cap: 6, joined: 6, host: "Gia Bảo", rating: 4, mine: false,
      note: "Đã đủ người, có thể đăng ký dự bị.", names: ["Bảo", "An", "Khôi", "Lộc", "Trí", "Duy"] }
  ];

  var LEVELS = ["Mới chơi", "Trung bình", "Khá", "Giỏi"];

  var METHODS = [
    { id: "momo", icon: "i-wallet", name: "Ví MoMo / ZaloPay", sub: "Liên kết sẵn · xác nhận tức thì" },
    { id: "bank", icon: "i-card", name: "Thẻ ngân hàng / QR", sub: "VietQR, Napas, Visa, Mastercard" },
    { id: "cash", icon: "i-cash", name: "Trả tại sân", sub: "Giữ chỗ 30 phút, thanh toán khi đến" }
  ];

  var VOUCHERS = {
    SMATE10: { label: "SMATE10 · giảm 10%", kind: "pct", value: 10 },
    NEWBIE: { label: "NEWBIE · giảm 20.000đ", kind: "abs", value: 20000 }
  };

  /* ---------------- state ---------------- */

  var state = {
    role: "player",
    user: { name: "Lê Khắc Huy", phone: "0905 123 456", since: "03/2026" },
    sport: null,
    area: "all",
    query: "",
    venue: null,
    fav: {},
    vTab: "info",
    book: { dateIdx: 0, court: 1, hours: [] },
    method: "momo",
    voucher: null,
    bookings: [],
    match: null,
    mTab: "open",
    mFilter: null,
    nm: { sport: "cau-long", venue: "arena1", date: 0, time: "19:00 – 21:00", need: 2, level: "Trung bình" },
    points: 1250,
    played: 18,
    mapPick: "arena1",
    listKind: null,
    screen: "login",
    stack: []
  };

  /* ---------------- helpers ---------------- */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function vnd(n) { return new Intl.NumberFormat("vi-VN").format(Math.round(n)) + "đ"; }
  function kk(n) { return Math.round(n / 1000) + "k"; }
  function sport(id) { for (var i = 0; i < SPORTS.length; i++) if (SPORTS[i].id === id) return SPORTS[i]; return SPORTS[0]; }
  function venue(id) { for (var i = 0; i < VENUES.length; i++) if (VENUES[i].id === id) return VENUES[i]; return VENUES[0]; }
  function match(id) { for (var i = 0; i < MATCHES.length; i++) if (MATCHES[i].id === id) return MATCHES[i]; return null; }
  function initials(n) {
    var p = String(n).trim().split(/\s+/);
    return (p.length > 1 ? p[p.length - 2][0] + p[p.length - 1][0] : p[0].slice(0, 2)).toUpperCase();
  }
  function hash32(s) {
    var h = 2166136261, i;
    for (i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0);
  }
  function hhmm(h) { return (h < 10 ? "0" + h : h) + ":00"; }

  var WD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  function dayList(n) {
    var out = [], base = new Date(), i, d;
    base.setHours(0, 0, 0, 0);
    for (i = 0; i < n; i++) {
      d = new Date(base.getTime() + i * 86400000);
      out.push({
        d: d,
        key: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
        wd: WD[d.getDay()],
        dm: ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2),
        rel: i === 0 ? "hôm nay" : i === 1 ? "ngày mai" : WD[d.getDay()] + " " + ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2)
      });
    }
    return out;
  }
  var DAYS = dayList(7);

  function priceAt(v, h) { return (h >= 17 && h <= 21) ? v.hi : v.lo; }
  function isBooked(v, dayKey, court, h) {
    var own = state.bookings.some(function (b) {
      return b.venue === v.id && b.key === dayKey && b.court === court && b.hours.indexOf(h) >= 0;
    });
    if (own) return true;
    return hash32(v.id + dayKey + court + h) % 100 < 26;
  }

  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("on"); }, 2100);
  }

  /* ---------------- svg bits ---------------- */

  function glyph(sid, size, color) {
    var c = color || "#ffffff", s = size || 54;
    var g = {
      "cau-long": '<path d="M30 46 46 30" stroke="' + c + '" stroke-width="4" stroke-linecap="round"/><path d="M44 28c6-10 14-18 20-20 2 6-6 16-16 22z" fill="' + c + '"/><path d="M26 42c-6 4-10 9-12 15 6-2 11-6 15-12z" fill="' + c + '" opacity=".85"/>',
      "pickleball": '<rect x="20" y="12" width="28" height="34" rx="12" fill="' + c + '"/><path d="M30 46h8l2 18h-12z" fill="' + c + '"/><circle cx="54" cy="52" r="9" fill="' + c + '" opacity=".9"/><circle cx="51" cy="49" r="1.6" fill="#0b2a5b"/><circle cx="57" cy="52" r="1.6" fill="#0b2a5b"/><circle cx="52" cy="56" r="1.6" fill="#0b2a5b"/>',
      "bong-da": '<circle cx="38" cy="38" r="24" fill="' + c + '"/><path d="m38 22 9 6-3 11h-12l-3-11zM23 42l5-4 4 10-5 7zM53 42l-5-4-4 10 5 7zM32 55h12l2 7H30z" fill="#12306b"/>',
      "bong-ro": '<circle cx="38" cy="38" r="24" fill="' + c + '"/><path d="M38 14v48M14 38h48M22 20c8 9 8 27 0 36M54 20c-8 9-8 27 0 36" stroke="#8a3f0b" stroke-width="2.4" fill="none"/>',
      "tennis": '<ellipse cx="34" cy="28" rx="17" ry="21" fill="none" stroke="' + c + '" stroke-width="5"/><path d="M20 16h28M18 28h32M20 40h28M26 9v38M34 7v42M42 9v38" stroke="' + c + '" stroke-width="1.4" opacity=".75"/><path d="M34 49v16" stroke="' + c + '" stroke-width="5" stroke-linecap="round"/><circle cx="55" cy="55" r="8" fill="' + c + '" opacity=".9"/>'
    }[sid] || "";
    return '<svg class="glyph" width="' + s + '" height="' + s + '" viewBox="0 0 76 76" aria-hidden="true">' + g + "</svg>";
  }

  function pinSvg(s) {
    return '<svg class="pin" viewBox="0 0 44 52" aria-hidden="true">' +
      '<defs><linearGradient id="pg-' + s.id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + s.pin + '"/><stop offset="1" stop-color="' + s.deep + '"/></linearGradient></defs>' +
      '<path d="M22 1c11 0 20 8.6 20 19.3C42 33 22 51 22 51S2 33 2 20.3C2 9.6 11 1 22 1z" fill="url(#pg-' + s.id + ')" stroke="#ffffff" stroke-width="2.4"/>' +
      '<circle cx="22" cy="20" r="13" fill="rgba(255,255,255,.22)"/>' +
      '<g transform="translate(22 20) scale(.36) translate(-38 -38)">' + glyph(s.id, 76).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "") + "</g></svg>";
  }

  function photo(v, cls, cap) {
    return '<div class="photo sp-' + v.sport + ' ' + (cls || "") + '">' + glyph(v.sport, 64) +
      (cap ? '<div class="cap"><b>' + esc(v.name) + "</b><span>" + esc(v.addr.split(",")[0]) + "</span></div>" : "") + "</div>";
  }

  function stars(n) {
    var s = "", i;
    for (i = 1; i <= 5; i++) s += i <= Math.round(n) ? "★" : "☆";
    return '<span class="stars">' + s + "</span>";
  }

  function qr(code) {
    var N = 29, seed = hash32(code), out = "", x, y, on;
    function fin(ox, oy) {
      out += '<rect x="' + ox + '" y="' + oy + '" width="7" height="7" fill="currentColor"/>';
      out += '<rect x="' + (ox + 1) + '" y="' + (oy + 1) + '" width="5" height="5" fill="var(--surface)"/>';
      out += '<rect x="' + (ox + 2) + '" y="' + (oy + 2) + '" width="3" height="3" fill="currentColor"/>';
    }
    for (y = 0; y < N; y++) {
      for (x = 0; x < N; x++) {
        if ((x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9)) continue;
        seed = (seed * 1664525 + 1013904223) >>> 0;
        on = (seed >>> 13) & 1;
        if (on) out += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="currentColor"/>';
      }
    }
    fin(0, 0); fin(N - 7, 0); fin(0, N - 7);
    return '<rect width="' + N + '" height="' + N + '" fill="var(--surface)"/>' + out;
  }

  /* ---------------- screen chrome ---------------- */

  var SCREENS = {
    login: { chrome: "none" },
    register: { chrome: "none" },
    home: { chrome: "app", tab: "home" },
    search: { chrome: "app", tab: "search", title: "Tìm sân" },
    venue: { chrome: "back", title: "Chi tiết sân", fav: true, share: true, cta: "Chọn giờ đặt sân" },
    booking: { chrome: "back", title: "Đặt sân", cta: "Tiếp tục" },
    payment: { chrome: "back", title: "Thanh toán", cta: "Thanh toán" },
    done: { chrome: "back", title: "Hoàn tất" },
    matches: { chrome: "app", tab: "matches", title: "Ghép kèo" },
    match: { chrome: "back", title: "Chi tiết kèo", cta: "Tham gia kèo" },
    newmatch: { chrome: "back", title: "Tạo kèo mới", cta: "Đăng kèo" },
    map: { chrome: "app", tab: "map", title: "Bản đồ" },
    profile: { chrome: "app", tab: "profile", title: "Cá nhân" },
    list: { chrome: "back", title: "Danh sách" }
  };

  var TABS = [
    { id: "home", name: "Trang chủ", ic: "i-home" },
    { id: "search", name: "Tìm sân", ic: "i-search" },
    { id: "matches", name: "Ghép kèo", ic: "i-star" },
    { id: "map", name: "Bản đồ", ic: "i-pin" },
    { id: "profile", name: "Cá nhân", ic: "i-user" }
  ];

  function go(name, push) {
    var cur = state.screen;
    if (push !== false && cur !== name) state.stack.push(cur);
    state.screen = name;
    render();
    try { if (location.hash.slice(1) !== name) location.hash = name; } catch (e) {}
    $("#view").scrollTop = 0;
  }
  function back() {
    var prev = state.stack.pop();
    if (!prev || prev === state.screen) prev = "home";
    state.screen = prev;
    render();
    try { location.hash = prev; } catch (e) {}
  }

  function render() {
    var n = state.screen, cfg = SCREENS[n] || SCREENS.home;

    $$(".pane").forEach(function (p) { p.classList.toggle("on", p.dataset.pane === n); });

    $("#appbar").hidden = cfg.chrome === "none";
    $("#tabbar").hidden = cfg.chrome !== "app";
    $("#ctabar").hidden = !cfg.cta;
    var tb = $("#titlebar");
    tb.hidden = cfg.chrome === "none" || !cfg.title;
    if (!tb.hidden) {
      $("#titleText").textContent = n === "list" ? (state.listKind ? state.listKind.title : cfg.title) : cfg.title;
      $("#btnBack").hidden = cfg.chrome !== "back";
      $("#btnFav").hidden = !cfg.fav;
      $("#btnShare").hidden = !cfg.share;
      if (cfg.fav && state.venue) $("#btnFav").setAttribute("aria-pressed", state.fav[state.venue] ? "true" : "false");
    }
    $("#barAv").textContent = initials(state.user.name);

    $$("#tabbar button").forEach(function (b) {
      b.setAttribute("aria-current", b.dataset.tab === cfg.tab ? "page" : "false");
    });
    $$("#jump button").forEach(function (b) {
      b.setAttribute("aria-current", b.dataset.go === n ? "true" : "false");
    });

    var painters = {
      home: paintHome, search: paintSearch, venue: paintVenue, booking: paintBooking,
      payment: paintPayment, matches: paintMatches, match: paintMatch, newmatch: paintNewMatch,
      map: paintMap, profile: paintProfile, list: paintList
    };
    if (painters[n]) painters[n]();
    if (cfg.cta) paintCta(n);
  }

  function paintCta(n) {
    var b = $("#ctaBtn"), m;
    b.disabled = false;
    if (n === "venue") b.textContent = "Chọn giờ đặt sân";
    else if (n === "booking") {
      b.textContent = state.book.hours.length ? "Tiếp tục · " + vnd(bookTotal()) : "Tiếp tục";
      b.disabled = !state.book.hours.length;
    } else if (n === "payment") b.textContent = "Thanh toán " + vnd(payTotal().total);
    else if (n === "match") {
      m = match(state.match);
      if (!m) return;
      if (m.mine) b.textContent = "Rời kèo";
      else if (m.joined >= m.cap) { b.textContent = "Kèo đã đủ người"; b.disabled = true; }
      else b.textContent = "Tham gia kèo · " + kk(m.cost);
    } else if (n === "newmatch") b.textContent = "Đăng kèo";
  }

  /* ---------------- home ---------------- */

  function filtered() {
    return VENUES.filter(function (v) {
      if (state.sport && v.sport !== state.sport) return false;
      if (state.area !== "all" && v.area !== state.area) return false;
      return true;
    });
  }

  function paintHome() {
    var list = filtered(), body;
    body = list.slice(0, state.seeAll ? list.length : 5).map(function (v) {
      return '<button class="vrow" data-venue="' + v.id + '">' +
        '<span class="th photo sp-' + v.sport + '">' + glyph(v.sport, 30) + "</span>" +
        '<span class="mid"><span class="nm">' + esc(v.name) + "</span>" +
        '<span class="mt">' + v.courts + " sân · " + esc(v.addr.split(",")[0]) + "</span>" +
        '<span class="mt">' + (v.lo === v.hi ? vnd(v.lo) : vnd(v.lo) + " – " + vnd(v.hi)) + "/ giờ</span></span>" +
        '<span class="bk">ĐẶT</span></button>';
    }).join("");
    $("#homeList").innerHTML = body || '<p class="empty">Chưa có sân nào khớp bộ lọc. Thử chọn môn khác hoặc bỏ lọc địa điểm.</p>';
    $("#seeAll").textContent = state.seeAll ? "THU GỌN" : "XEM TẤT CẢ";
    $("#seeAll").hidden = list.length <= 5;
    $$("#sportRow button").forEach(function (b) {
      b.setAttribute("aria-pressed", state.sport === b.dataset.sport ? "true" : "false");
    });
  }

  /* ---------------- search ---------------- */

  function paintSearch() {
    var q = state.query.trim().toLowerCase();
    var list = VENUES.filter(function (v) {
      if (state.sport && v.sport !== state.sport) return false;
      if (!q) return true;
      return (v.name + " " + v.addr + " " + sport(v.sport).name).toLowerCase().indexOf(q) >= 0;
    });
    $("#searchList").innerHTML = list.length ? list.map(function (v) {
      return '<button class="gcard" data-venue="' + v.id + '">' + photo(v, "", true) + "</button>";
    }).join("") : '<p class="empty">Không tìm thấy sân nào cho “' + esc(state.query) + "”.</p>";
    $$("#searchChips button").forEach(function (b) {
      b.setAttribute("aria-pressed", (b.dataset.sport || null) === state.sport ? "true" : "false");
    });
    $("#qClear").hidden = !state.query;
  }

  /* ---------------- venue ---------------- */

  function paintVenue() {
    var v = venue(state.venue), h = "";
    $("#vHero").className = "photo vhero sp-" + v.sport;
    $("#vHero").innerHTML = glyph(v.sport, 76);
    $("#vName").textContent = v.name;
    $("#vAddr").textContent = v.addr + " · cách bạn " + String(v.dist).replace(".", ",") + " km";
    $("#vFacts").innerHTML = [
      '<span class="badge">★ ' + String(v.rating).replace(".", ",") + " · " + v.reviews + " đánh giá</span>",
      '<span class="badge">' + esc(sport(v.sport).name) + "</span>",
      '<span class="badge">' + v.courts + " sân</span>",
      '<span class="badge">Mở ' + hhmm(v.open) + " – " + hhmm(v.close) + "</span>"
    ].join("");
    $$("#vTabs button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.t === state.vTab ? "true" : "false"); });

    if (state.vTab === "info") {
      h = '<p class="muted" style="margin:0 0 12px;font-size:13.5px">' + esc(v.blurb) + "</p>" +
        '<div class="card" style="padding:12px 14px;margin-bottom:10px"><p class="sect">Tiện ích</p>' +
        '<div class="amen">' + v.amen.map(function (a) { return "<span>" + esc(a) + "</span>"; }).join("") + "</div></div>" +
        '<div class="card" style="padding:12px 14px;margin-bottom:10px"><p class="sect">Sơ đồ sân</p>' + courtMap(v) + "</div>" +
        '<div class="card" style="padding:12px 14px"><p class="sect">Liên hệ</p>' +
        '<div class="kv"><span>Chủ sân</span><b>' + esc(v.owner) + "</b></div>" +
        '<div class="kv"><span>Điện thoại</span><b>' + esc(v.phone) + "</b></div>" +
        '<div class="kv"><span>Giờ mở cửa</span><b>' + hhmm(v.open) + " – " + hhmm(v.close) + "</b></div></div>";
    } else if (state.vTab === "price") {
      h = '<div class="card" style="padding:12px 14px"><p class="sect">Bảng giá thuê sân</p>' +
        '<div class="kv"><span>Khung giờ thường (' + hhmm(v.open) + " – 17:00)</span><b>" + vnd(v.lo) + "/giờ</b></div>" +
        '<div class="kv"><span>Giờ cao điểm (17:00 – 22:00)</span><b>' + vnd(v.hi) + "/giờ</b></div>" +
        '<div class="kv"><span>Thuê trọn buổi (3 giờ liên tiếp)</span><b>' + vnd(v.hi * 3 * 0.9) + "</b></div>" +
        '<div class="kv"><span>Cọc giữ chỗ</span><b>Không bắt buộc</b></div></div>' +
        '<p class="tiny muted" style="margin:10px 0 0">Giá đã gồm điện, nước và phí vệ sinh sân. Huỷ miễn phí trước 4 giờ.</p>';
    } else {
      var rs = REVIEWS[v.id] || [];
      h = '<div class="card" style="padding:12px 14px"><div class="sb" style="margin-bottom:8px">' +
        '<div><b style="font-size:26px;font-family:var(--display)">' + String(v.rating).replace(".", ",") + "</b> " + stars(v.rating) + "</div>" +
        '<span class="tiny muted">' + v.reviews + " lượt đánh giá</span></div>" +
        rs.map(function (r) {
          return '<div class="rev"><span class="av">' + initials(r[0]) + "</span><div><b style=\"font-size:13.5px\">" + esc(r[0]) + "</b> " +
            stars(r[1]) + '<p class="tiny muted" style="margin:2px 0 0">' + esc(r[2]) + "</p></div></div>";
        }).join("") + "</div>";
    }
    $("#vBody").innerHTML = h;
  }

  function courtMap(v) {
    var n = Math.min(v.courts, 6), cols = n <= 3 ? n : 3, rows = Math.ceil(n / cols);
    var w = 326, pad = 10, gap = 8;
    var cw = (w - pad * 2 - gap * (cols - 1)) / cols, ch = 54;
    var hgt = pad * 2 + rows * ch + (rows - 1) * gap + 22;
    var s = '<svg class="courtmap" viewBox="0 0 ' + w + " " + hgt + '" role="img" aria-label="Sơ đồ ' + n + ' sân">';
    s += '<rect width="' + w + '" height="' + hgt + '" rx="10" fill="var(--surface-3)"/>';
    for (var i = 0; i < n; i++) {
      var r = Math.floor(i / cols), c = i % cols;
      var x = pad + c * (cw + gap), y = pad + r * (ch + gap);
      s += '<rect x="' + x + '" y="' + y + '" width="' + cw + '" height="' + ch + '" rx="5" fill="' + sport(v.sport).deep + '" opacity=".92"/>';
      s += '<rect x="' + (x + 6) + '" y="' + (y + 6) + '" width="' + (cw - 12) + '" height="' + (ch - 12) + '" rx="2" fill="none" stroke="#fff" stroke-width="1.3" opacity=".8"/>';
      s += '<path d="M' + (x + cw / 2) + " " + (y + 6) + "V" + (y + ch - 6) + '" stroke="#fff" stroke-width="1.3" opacity=".8"/>';
      s += '<text x="' + (x + cw / 2) + '" y="' + (y + ch / 2 + 4) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="system-ui">Sân ' + (i + 1) + "</text>";
    }
    s += '<text x="' + pad + '" y="' + (hgt - 7) + '" font-size="10.5" fill="var(--ink-2)" font-family="system-ui">Lối vào · quầy lễ tân ở cạnh dưới</text>';
    return s + "</svg>";
  }

  /* ---------------- booking ---------------- */

  function bookHours() { return state.book.hours.slice().sort(function (a, b) { return a - b; }); }
  function bookTotal() {
    var v = venue(state.venue);
    return bookHours().reduce(function (s, h) { return s + priceAt(v, h); }, 0);
  }

  function paintBooking() {
    var v = venue(state.venue), b = state.book, d = DAYS[b.dateIdx], i;
    $("#bVenue").textContent = v.name + " · " + v.addr.split(",")[0];
    $("#bDates").innerHTML = DAYS.map(function (x, i) {
      return '<button class="chip" data-date="' + i + '" aria-pressed="' + (i === b.dateIdx) + '">' + x.wd + " " + x.dm + "</button>";
    }).join("");
    var courts = "";
    for (i = 1; i <= v.courts; i++) courts += '<button class="chip" data-court="' + i + '" aria-pressed="' + (i === b.court) + '">Sân ' + i + "</button>";
    $("#bCourts").innerHTML = courts;

    var slots = "", start = Math.max(v.open, 6);
    for (i = start; i < v.close; i++) {
      var booked = isBooked(v, d.key, b.court, i);
      var on = b.hours.indexOf(i) >= 0;
      slots += '<button class="slot" data-hour="' + i + '" aria-pressed="' + on + '"' + (booked ? " disabled" : "") + ">" +
        hhmm(i) + "<small>" + kk(priceAt(v, i)) + "</small></button>";
    }
    $("#bSlots").innerHTML = slots;

    var hs = bookHours();
    $("#bSummary").innerHTML = hs.length
      ? '<div class="sb"><span class="tiny muted">Sân ' + b.court + " · " + hhmm(hs[0]) + " – " + hhmm(hs[hs.length - 1] + 1) + " · " + d.dm + "</span>" +
        '<span class="badge ok">' + hs.length + " giờ</span></div>" +
        '<div class="sb" style="margin-top:8px"><b>Tạm tính</b><b class="num" style="font-size:17px">' + vnd(bookTotal()) + "</b></div>"
      : '<p class="tiny muted" style="margin:0">Chọn ít nhất một khung giờ để xem tạm tính.</p>';
  }

  function toggleHour(h) {
    var hs = state.book.hours, i = hs.indexOf(h);
    if (i >= 0) { hs.splice(i, 1); return; }
    if (!hs.length) { hs.push(h); return; }
    var s = bookHours(), lo = s[0], hi = s[s.length - 1];
    if (h === lo - 1 || h === hi + 1) hs.push(h);
    else { state.book.hours = [h]; toast("Chỉ đặt được các khung giờ liền nhau."); }
  }

  /* ---------------- payment ---------------- */

  function payTotal() {
    var sub = bookTotal(), off = 0, vc = state.voucher ? VOUCHERS[state.voucher] : null;
    if (vc) off = vc.kind === "pct" ? Math.round(sub * vc.value / 100) : Math.min(vc.value, sub);
    return { sub: sub, off: off, total: Math.max(0, sub - off) };
  }

  function paintPayment() {
    var v = venue(state.venue), hs = bookHours(), d = DAYS[state.book.dateIdx], t = payTotal();
    $("#pVenue").textContent = v.name + " · Sân " + state.book.court;
    $("#pWhen").textContent = hhmm(hs[0]) + " – " + hhmm(hs[hs.length - 1] + 1) + " · " + d.wd + " " + d.dm + " (" + d.rel + ")";
    $("#pWhere").textContent = sport(v.sport).name + " · " + v.addr;
    $("#pMethods").innerHTML = METHODS.map(function (m) {
      return '<button class="pay" role="radio" data-m="' + m.id + '" aria-checked="' + (state.method === m.id) + '">' +
        '<span class="lg"><svg class="ic"><use href="#' + m.ic + '"/></svg></span>' +
        '<span class="t"><b>' + esc(m.name) + "</b><span>" + esc(m.sub) + "</span></span>" +
        '<span class="ir"></span></button>';
    }).join("");
    $("#pTotals").innerHTML =
      '<div class="kv"><span>Tiền sân (' + hs.length + " giờ)</span><b>" + vnd(t.sub) + "</b></div>" +
      '<div class="kv"><span>Giảm giá' + (state.voucher ? " · " + esc(state.voucher) : "") + "</span><b>" + (t.off ? "−" + vnd(t.off) : "—") + "</b></div>" +
      '<div class="kv" style="padding-top:10px"><b style="font-size:15px">Tổng cộng</b><b style="font-size:19px;color:var(--brand-ink)">' + vnd(t.total) + "</b></div>";
  }

  function pay() {
    var v = venue(state.venue), hs = bookHours(), d = DAYS[state.book.dateIdx], t = payTotal();
    var code = "SM-" + d.dm.replace("/", "") + "-" + String(hash32(v.id + d.key + hs.join()) % 9000 + 1000);
    state.bookings.unshift({
      code: code, venue: v.id, key: d.key, court: state.book.court, hours: hs.slice(),
      dm: d.dm, wd: d.wd, rel: d.rel, total: t.total, method: state.method,
      paid: state.method !== "cash"
    });
    state.points += Math.round(t.total / 1000);
    state.voucher = null;
    $("#pCode").value = "";
    $("#dCode").textContent = code;
    $("#dQr").innerHTML = qr(code);
    $("#dLines").innerHTML =
      '<div class="kv"><span>Sân</span><b>' + esc(v.name) + " · Sân " + state.book.court + "</b></div>" +
      '<div class="kv"><span>Thời gian</span><b>' + hhmm(hs[0]) + " – " + hhmm(hs[hs.length - 1] + 1) + "</b></div>" +
      '<div class="kv"><span>Ngày</span><b>' + d.wd + " " + d.dm + "</b></div>" +
      '<div class="kv"><span>Thanh toán</span><b>' + (state.method === "cash" ? "Trả tại sân" : "Đã thanh toán") + "</b></div>" +
      '<div class="kv"><span>Số tiền</span><b>' + vnd(t.total) + "</b></div>";
    state.stack = ["home"];
    go("done");
    toast("+" + Math.round(t.total / 1000) + " điểm thưởng");
  }

  /* ---------------- matches ---------------- */

  function visibleMatches() {
    return MATCHES.filter(function (m) {
      if (state.mTab === "mine" && !m.mine) return false;
      if (state.mFilter === "today" && m.day !== 0) return false;
      if (state.mFilter && state.mFilter !== "today" && m.sport !== state.mFilter) return false;
      return true;
    });
  }

  function paintMatches() {
    var list = visibleMatches();
    $$("#mTabs button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.t === state.mTab ? "true" : "false"); });
    $$("#mFilters button").forEach(function (b) { b.setAttribute("aria-pressed", (b.dataset.f || null) === state.mFilter ? "true" : "false"); });
    $("#mList").innerHTML = list.length ? list.map(function (m) {
      var v = venue(m.venue), need = m.cap - m.joined;
      return '<div class="mcard"><div class="sb"><h4>' + esc(m.kind) + " · " + esc(m.time.split(" – ")[0]) + " " + DAYS[m.day].rel + "</h4>" +
        (need > 0 ? '<span class="badge need">Thiếu ' + need + "</span>" : '<span class="badge ok">Đủ người</span>') + "</div>" +
        '<p class="meta">' + esc(v.name) + " · Trình " + esc(m.level) + " · " + kk(m.cost) + "/người</p>" +
        '<div class="sb" style="margin-top:10px"><span class="tiny muted">Chủ kèo: ' + esc(m.host) + " · " + m.joined + "/" + m.cap + " người</span>" +
        '<button class="btn sm" data-match="' + m.id + '">' + (m.mine ? "Xem kèo" : "Tham gia") + "</button></div></div>";
    }).join("") : '<p class="empty">' + (state.mTab === "mine" ? "Bạn chưa tham gia kèo nào. Mở tab “Kèo đang mở” để tìm kèo." : "Không có kèo nào khớp bộ lọc.") + "</p>";
  }

  function paintMatch() {
    var m = match(state.match);
    if (!m) return;
    var v = venue(m.venue), need = m.cap - m.joined, i, avs = "";
    for (i = 0; i < m.cap; i++) {
      avs += i < m.joined
        ? '<span class="av">' + initials(m.names[i] || "Bạn") + "</span>"
        : '<span class="av empty">+</span>';
    }
    $("#mDetail").innerHTML =
      '<div class="card" style="padding:13px 14px"><div class="sb"><h4 style="margin:0;font-size:17px;font-weight:800">' + esc(m.kind) + "</h4>" +
      (need > 0 ? '<span class="badge need">Thiếu ' + need + "</span>" : '<span class="badge ok">Đủ người</span>') + "</div>" +
      '<div class="kv" style="margin-top:8px"><span>Sân</span><b>' + esc(v.name) + "</b></div>" +
      '<div class="kv"><span>Địa chỉ</span><b style="font-weight:600;white-space:normal;text-align:right">' + esc(v.addr.split(",").slice(0, 2).join(",")) + "</b></div>" +
      '<div class="kv"><span>Thời gian</span><b>' + esc(m.time) + " · " + DAYS[m.day].rel + "</b></div>" +
      '<div class="kv"><span>Trình độ</span><b>' + esc(m.level) + "</b></div>" +
      '<div class="kv"><span>Chi phí</span><b>' + vnd(m.cost) + "/người</b></div></div>" +

      '<div class="card" style="padding:12px 14px;margin-top:10px"><div class="host">' +
      '<span class="big">' + initials(m.host) + "</span>" +
      '<div style="flex:1;min-width:0"><b style="font-size:15px">' + esc(m.host) + "</b>" +
      '<p class="tiny muted" style="margin:2px 0 0">Chủ kèo · ' + stars(m.rating) + " · " + (hash32(m.host) % 40 + 6) + " kèo đã tạo</p></div>" +
      '<button class="btn sm ghost" data-toast="Đã mở hộp thoại với ' + esc(m.host) + '.">Nhắn tin</button></div></div>' +

      '<div class="card" style="padding:12px 14px;margin-top:10px"><div class="sb" style="margin-bottom:9px">' +
      '<p class="sect" style="margin:0">Người tham gia</p><span class="tiny muted">' + m.joined + "/" + m.cap + " người</span></div>" +
      '<div class="avs">' + avs + "</div></div>" +

      '<div class="card" style="padding:12px 14px;margin-top:10px"><p class="sect">Ghi chú của chủ kèo</p>' +
      '<p class="tiny muted" style="margin:0">' + esc(m.note) + "</p></div>" +
      '<p class="tiny muted" style="text-align:center;margin:12px 0 0">Có thể rời kèo miễn phí trước 3 giờ.</p>';
  }

  function paintNewMatch() {
    $("#nmSports").innerHTML = SPORTS.map(function (s) {
      return '<button class="chip" data-nms="' + s.id + '" aria-pressed="' + (state.nm.sport === s.id) + '">' + esc(s.name) + "</button>";
    }).join("");
    $("#nmLevels").innerHTML = LEVELS.map(function (l) {
      return '<button class="chip" data-nml="' + esc(l) + '" aria-pressed="' + (state.nm.level === l) + '">' + esc(l) + "</button>";
    }).join("");
    var vs = VENUES.filter(function (v) { return v.sport === state.nm.sport; });
    if (!vs.length) vs = VENUES;
    if (!vs.some(function (v) { return v.id === state.nm.venue; })) state.nm.venue = vs[0].id;
    $("#nmVenue").innerHTML = vs.map(function (v) {
      return '<option value="' + v.id + '"' + (state.nm.venue === v.id ? " selected" : "") + ">" + esc(v.name) + "</option>";
    }).join("");
    $("#nmDate").innerHTML = DAYS.map(function (d, i) {
      return '<option value="' + i + '"' + (state.nm.date === i ? " selected" : "") + ">" + d.wd + " " + d.dm + "</option>";
    }).join("");
    var times = ["06:00 – 08:00", "08:00 – 10:00", "15:00 – 17:00", "17:00 – 19:00", "19:00 – 21:00", "20:30 – 22:00"];
    $("#nmTime").innerHTML = times.map(function (t) {
      return '<option' + (state.nm.time === t ? " selected" : "") + ">" + t + "</option>";
    }).join("");
    $("#nmNeed").textContent = state.nm.need;
  }

  /* ---------------- map ---------------- */

  var MAPPOS = {
    arena1: [96, 168], betaera: [168, 236], trongnghia: [122, 300],
    hoamy: [60, 252], ankhe: [196, 118], golden: [252, 352],
    tienson: [300, 420], sontra: [330, 196]
  };

  function paintMap() {
    var s = "", v, p, id;
    s += '<rect width="390" height="520" fill="#dce8f4"/>';
    s += '<path d="M300 0c-18 90-6 170 22 250 26 74 40 160 34 270h34V0z" fill="#9fd0ea"/>';
    s += '<path d="M0 436c120-10 210 4 300 36v48H0z" fill="#9fd0ea"/>';
    [[18, 40, 120, 78], [150, 30, 118, 64], [26, 134, 96, 72], [138, 112, 136, 90],
     [20, 224, 112, 84], [146, 218, 120, 96], [30, 326, 128, 86], [174, 326, 96, 78]]
      .forEach(function (b, i) {
        s += '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '" rx="6" fill="' + (i % 2 ? "#e9eff6" : "#eef3f9") + '"/>';
      });
    s += '<g stroke="#ffffff" stroke-width="13" stroke-linecap="round">' +
      '<path d="M0 118h300M0 210h300M0 314h300M0 420h300"/>' +
      '<path d="M140 0v440M258 0v430M34 0v430"/></g>';
    s += '<g stroke="#f5c84a" stroke-width="4" stroke-dasharray="12 10" opacity=".85">' +
      '<path d="M0 210h300M140 0v440"/></g>';
    s += '<text x="318" y="120" font-size="11" fill="#2f6b96" font-family="system-ui" transform="rotate(90 318 120)">Sông Hàn</text>';

    VENUES.forEach(function (vv) {
      p = MAPPOS[vv.id]; if (!p) return;
      var sp = sport(vv.sport), on = state.mapPick === vv.id;
      s += '<g class="mpin" data-mp="' + vv.id + '" transform="translate(' + (p[0] - 14) + "," + (p[1] - 36) + ") scale(" + (on ? 1.18 : .94) + ')">' +
        '<path d="M15 1c7.7 0 14 6 14 13.5C29 24 15 36 15 36S1 24 1 14.5C1 7 7.3 1 15 1z" fill="' + sp.pin + '" stroke="#fff" stroke-width="2"/>' +
        '<circle cx="15" cy="14" r="5.4" fill="#fff" opacity=".92"/></g>';
    });
    s += '<g><circle cx="150" cy="268" r="19" fill="#1540d9" opacity=".16"/><circle cx="150" cy="268" r="7" fill="#1540d9" stroke="#fff" stroke-width="2.6"/></g>';
    s += '<text x="150" y="300" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1540d9" font-family="system-ui">Bạn đang ở đây</text>';
    $("#mapSvg").innerHTML = s;

    v = venue(state.mapPick);
    $("#mapSheet").innerHTML = '<div class="grab"></div>' +
      '<div class="row" style="align-items:flex-start">' +
      '<span class="th photo sp-' + v.sport + '" style="width:46px;height:46px;border-radius:10px">' + glyph(v.sport, 28) + "</span>" +
      '<div style="flex:1;min-width:0"><b style="font-size:15px;display:block">' + esc(v.name) + "</b>" +
      '<span class="tiny muted">' + esc(v.addr.split(",")[0]) + " · " + String(v.dist).replace(".", ",") + " km · ★ " + String(v.rating).replace(".", ",") + "</span>" +
      '<p class="tiny" style="margin:3px 0 0;color:var(--brand-ink);font-weight:600">' +
      (v.lo === v.hi ? vnd(v.lo) : vnd(v.lo) + " – " + vnd(v.hi)) + "/ giờ</p></div></div>" +
      '<div class="row" style="margin-top:11px"><button class="btn sm" data-venue="' + v.id + '" style="flex:1">Xem sân</button>' +
      '<button class="btn sm ghost" data-toast="Đang mở chỉ đường tới ' + esc(v.name) + '." style="flex:1">Chỉ đường</button></div>';
  }

  /* ---------------- profile ---------------- */

  function paintProfile() {
    var u = state.user;
    $("#pfAv").textContent = initials(u.name);
    $("#pfName").textContent = u.name;
    $("#pfSub").textContent = u.phone + " · Tham gia từ " + u.since;
    $("#pfSports").innerHTML =
      '<span class="chip on">Cầu lông · Trung bình</span><span class="chip">Pickleball · Mới chơi</span>' +
      '<button class="chip" data-toast="Chọn thêm môn bạn hay chơi.">+ Thêm môn</button>';
    $("#pfStats").innerHTML =
      '<div class="stat"><b>' + (state.played + MATCHES.filter(function (m) { return m.mine; }).length) + "</b><span>Trận đã chơi</span></div>" +
      '<div class="stat"><b>' + (7 + state.bookings.length) + "</b><span>Lượt đặt sân</span></div>" +
      '<div class="stat"><b>' + state.points + "</b><span>Điểm thưởng</span></div>";

    var b = state.bookings[0], v, hs;
    if (b) {
      v = venue(b.venue); hs = b.hours;
      $("#pfUpcoming").innerHTML = '<div class="card" style="padding:12px 14px">' +
        '<div class="sb"><b style="font-size:14.5px">' + esc(v.name) + " · Sân " + b.court + "</b>" +
        '<span class="badge ' + (b.paid ? "ok" : "need") + '">' + (b.paid ? "Đã thanh toán" : "Trả tại sân") + "</span></div>" +
        '<p class="tiny muted" style="margin:4px 0 10px">' + hhmm(hs[0]) + " – " + hhmm(hs[hs.length - 1] + 1) + " · " + b.rel + " · " + esc(sport(v.sport).name) + "</p>" +
        '<div class="row"><button class="btn sm" data-code="' + b.code + '">Xem mã đặt sân</button>' +
        '<button class="btn sm ghost" data-toast="Đổi giờ cần báo trước 4 tiếng.">Đổi giờ</button></div></div>';
    } else {
      $("#pfUpcoming").innerHTML = '<div class="card" style="padding:16px 14px;text-align:center">' +
        '<p class="tiny muted" style="margin:0 0 10px">Bạn chưa có lịch nào sắp tới.</p>' +
        '<button class="btn sm" data-go="home">Đặt sân ngay</button></div>';
    }

    $("#pfMenu").innerHTML = [
      ["i-hist", "Lịch sử đặt sân", "history"],
      ["i-star", "Kèo của tôi", "mymatch"],
      ["i-heart", "Sân yêu thích", "fav"],
      ["i-ticket", "Ưu đãi và điểm thưởng", "reward"],
      ["i-card", "Phương thức thanh toán", "pay"],
      ["i-gear", "Cài đặt và hỗ trợ", "help"]
    ].map(function (m) {
      return '<button data-menu="' + m[2] + '"><svg class="ic"><use href="#' + m[0] + '"/></svg><span class="sp">' + m[1] + "</span>" +
        '<svg class="ic cv"><use href="#i-right"/></svg></button>';
    }).join("");
  }

  /* ---------------- generic list ---------------- */

  function paintList() {
    var k = state.listKind, h = "";
    if (!k) return;
    if (k.id === "history") {
      h = state.bookings.length ? state.bookings.map(function (b) {
        var v = venue(b.venue), hs = b.hours;
        return '<div class="card" style="padding:12px 14px;margin-bottom:10px"><div class="sb">' +
          '<b style="font-size:14.5px">' + esc(v.name) + " · Sân " + b.court + "</b>" +
          '<span class="badge ' + (b.paid ? "ok" : "need") + '">' + (b.paid ? "Đã thanh toán" : "Trả tại sân") + "</span></div>" +
          '<p class="tiny muted" style="margin:4px 0 0">' + b.wd + " " + b.dm + " · " + hhmm(hs[0]) + " – " + hhmm(hs[hs.length - 1] + 1) + "</p>" +
          '<div class="sb" style="margin-top:8px"><span class="tiny muted num">Mã ' + esc(b.code) + "</span>" +
          '<b class="num">' + vnd(b.total) + "</b></div></div>";
      }).join("") : '<p class="empty">Chưa có lượt đặt sân nào trong phiên này. Đặt thử một sân ở trang chủ.</p>';
    } else if (k.id === "fav") {
      var favs = VENUES.filter(function (v) { return state.fav[v.id]; });
      h = favs.length ? favs.map(function (v) {
        return '<button class="gcard" data-venue="' + v.id + '" style="margin-bottom:12px">' + photo(v, "", true) + "</button>";
      }).join("") : '<p class="empty">Chưa có sân yêu thích. Mở một sân rồi bấm trái tim ở góc trên.</p>';
    } else if (k.id === "reward") {
      h = '<div class="card" style="padding:16px 14px;text-align:center;margin-bottom:12px">' +
        '<p class="tiny muted" style="margin:0">Điểm thưởng hiện có</p>' +
        '<b style="font-family:var(--display);font-size:40px;line-height:1.1;color:var(--brand-ink)" class="num">' + state.points + "</b>" +
        '<p class="tiny muted" style="margin:0">1.000đ chi tiêu = 1 điểm</p></div>' +
        Object.keys(VOUCHERS).map(function (c) {
          return '<div class="card" style="padding:12px 14px;margin-bottom:10px"><div class="sb">' +
            '<div><b style="font-size:14.5px">' + esc(VOUCHERS[c].label) + "</b>" +
            '<p class="tiny muted" style="margin:2px 0 0">Áp dụng ở bước thanh toán</p></div>' +
            '<button class="btn sm ghost" data-copy="' + c + '">' + c + "</button></div></div>";
        }).join("");
    }
    $("#listBody").innerHTML = h;
  }

  /* ---------------- static build ---------------- */

  function build() {
    $("#logoLogin").src = LOGO; $("#logoReg").src = LOGO; $("#logoHome").src = LOGO;

    $("#sportRow").innerHTML = SPORTS.map(function (s) {
      return '<button data-sport="' + s.id + '" aria-pressed="false">' + pinSvg(s) + '<span class="nm">' + esc(s.name) + "</span></button>";
    }).join("");

    var areas = ["all"].concat(VENUES.map(function (v) { return v.area; }).filter(function (a, i, arr) { return arr.indexOf(a) === i; }));
    $("#areaSel").innerHTML = areas.map(function (a) {
      return '<option value="' + esc(a) + '">' + (a === "all" ? "Tất cả địa điểm" : esc("Quận " + a)) + "</option>";
    }).join("");

    $("#searchChips").innerHTML = '<button class="chip" aria-pressed="true">Tất cả</button>' +
      SPORTS.map(function (s) { return '<button class="chip" data-sport="' + s.id + '">' + esc(s.name) + "</button>"; }).join("");

    $("#regSports").innerHTML = SPORTS.map(function (s, i) {
      return '<button class="chip" data-regsport="' + s.id + '" aria-pressed="' + (i < 2) + '">' + esc(s.name) + "</button>";
    }).join("");

    $("#mFilters").innerHTML = '<button class="chip" aria-pressed="true">Tất cả</button>' +
      '<button class="chip" data-f="today">Hôm nay</button>' +
      SPORTS.map(function (s) { return '<button class="chip" data-f="' + s.id + '">' + esc(s.name) + "</button>"; }).join("");

    $("#tabbar").innerHTML = TABS.map(function (t) {
      return '<button data-tab="' + t.id + '"><svg class="ic"><use href="#' + t.ic + '"/></svg>' + t.name + "</button>";
    }).join("");

    $("#jump").innerHTML = [
      ["login", "Đăng nhập"], ["register", "Đăng ký"], ["home", "Trang chủ"], ["search", "Tìm sân"],
      ["venue", "Chi tiết sân"], ["booking", "Chọn giờ"], ["payment", "Thanh toán"], ["done", "Hoàn tất"],
      ["matches", "Ghép kèo"], ["match", "Chi tiết kèo"], ["newmatch", "Tạo kèo"], ["map", "Bản đồ"], ["profile", "Cá nhân"]
    ].map(function (j) { return '<button data-go="' + j[0] + '">' + j[1] + "</button>"; }).join("");

    tickClock();
    setInterval(tickClock, 20000);
  }

  function tickClock() {
    var d = new Date();
    $("#clock").textContent = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }

  /* ---------------- events ---------------- */

  function openVenue(id) {
    state.venue = id; state.vTab = "info";
    state.book = { dateIdx: 0, court: 1, hours: [] };
    go("venue");
  }

  function wire() {
    document.addEventListener("click", function (e) {
      var t;

      t = e.target.closest("[data-toast]"); if (t) { toast(t.dataset.toast); return; }
      t = e.target.closest("[data-oauth]"); if (t) { toast("Liên kết " + t.dataset.oauth + " chưa bật ở bản mẫu."); return; }
      t = e.target.closest("[data-venue]"); if (t) { openVenue(t.dataset.venue); return; }
      t = e.target.closest("[data-go]"); if (t) { go(t.dataset.go); return; }
      t = e.target.closest("[data-mp]"); if (t) { state.mapPick = t.dataset.mp; paintMap(); return; }
      t = e.target.closest("[data-copy]"); if (t) {
        var code = t.dataset.copy;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(function () { toast("Đã chép mã " + code); }, function () { toast("Mã: " + code); });
        } else toast("Mã: " + code);
        return;
      }
      t = e.target.closest("[data-code]"); if (t) { go("done"); return; }

      t = e.target.closest("[data-sport]");
      if (t) {
        var sid = t.dataset.sport;
        state.sport = state.sport === sid ? null : sid;
        state.seeAll = false;
        render(); return;
      }
      if (e.target.closest("#searchChips button") && !e.target.closest("[data-sport]")) { state.sport = null; render(); return; }

      t = e.target.closest("[data-regsport]");
      if (t) { t.setAttribute("aria-pressed", t.getAttribute("aria-pressed") === "true" ? "false" : "true"); return; }

      t = e.target.closest("[data-date]"); if (t) { state.book.dateIdx = +t.dataset.date; state.book.hours = []; paintBooking(); paintCta("booking"); return; }
      t = e.target.closest("[data-court]"); if (t) { state.book.court = +t.dataset.court; state.book.hours = []; paintBooking(); paintCta("booking"); return; }
      t = e.target.closest("[data-hour]"); if (t) { toggleHour(+t.dataset.hour); paintBooking(); paintCta("booking"); return; }
      t = e.target.closest("[data-m]"); if (t) { state.method = t.dataset.m; paintPayment(); return; }

      t = e.target.closest("[data-match]"); if (t) { state.match = t.dataset.match; go("match"); return; }
      t = e.target.closest("#mTabs [data-t]"); if (t) { state.mTab = t.dataset.t; paintMatches(); return; }
      t = e.target.closest("#mFilters button"); if (t) { state.mFilter = t.dataset.f || null; paintMatches(); return; }
      t = e.target.closest("#vTabs [data-t]"); if (t) { state.vTab = t.dataset.t; paintVenue(); return; }
      t = e.target.closest("[data-nms]"); if (t) { state.nm.sport = t.dataset.nms; paintNewMatch(); return; }
      t = e.target.closest("[data-nml]"); if (t) { state.nm.level = t.dataset.nml; paintNewMatch(); return; }

      t = e.target.closest("[data-menu]"); if (t) { menu(t.dataset.menu); return; }
      t = e.target.closest("[data-role]"); if (t) {
        var box = t.parentElement;
        $$("[data-role]", box).forEach(function (b) { b.setAttribute("aria-pressed", b === t ? "true" : "false"); });
        state.role = t.dataset.role; return;
      }
      t = e.target.closest("#tabbar button"); if (t) { state.stack = []; go(t.dataset.tab, false); return; }
    });

    $("#btnBack").addEventListener("click", back);
    $("#btnFav").addEventListener("click", function () {
      state.fav[state.venue] = !state.fav[state.venue];
      this.setAttribute("aria-pressed", state.fav[state.venue] ? "true" : "false");
      toast(state.fav[state.venue] ? "Đã thêm vào sân yêu thích." : "Đã bỏ khỏi sân yêu thích.");
    });

    $("#doLogin").addEventListener("click", function () {
      if (!$("#loginId").value.trim() || !$("#loginPw").value) { toast("Nhập đủ tài khoản và mật khẩu."); return; }
      state.stack = []; go("home", false);
      toast("Xin chào, " + state.user.name.split(" ").pop() + "!");
    });
    $("#goReg").addEventListener("click", function () { go("register"); });
    $("#goLogin").addEventListener("click", function () { go("login"); });
    $("#doReg").addEventListener("click", function () {
      var n = $("#regName").value.trim(), p = $("#regPw").value, p2 = $("#regPw2").value;
      if (!n) { toast("Nhập họ và tên."); return; }
      if (p.length < 8) { toast("Mật khẩu cần ít nhất 8 ký tự."); return; }
      if (p !== p2) { toast("Hai mật khẩu chưa khớp."); return; }
      if (!$("#regAgree").checked) { toast("Cần đồng ý điều khoản sử dụng."); return; }
      state.user.name = n;
      state.user.phone = $("#regId").value.trim() || state.user.phone;
      state.stack = []; go("home", false);
      toast("Tạo tài khoản thành công.");
    });

    $("#areaSel").addEventListener("change", function () { state.area = this.value; state.seeAll = false; paintHome(); });
    $("#seeAll").addEventListener("click", function () { state.seeAll = !state.seeAll; paintHome(); });

    $("#q").addEventListener("input", function () { state.query = this.value; paintSearch(); });
    $("#qClear").addEventListener("click", function () { state.query = ""; $("#q").value = ""; paintSearch(); });

    $("#pApply").addEventListener("click", function () {
      var c = $("#pCode").value.trim().toUpperCase();
      if (!c) { toast("Nhập mã giảm giá."); return; }
      if (VOUCHERS[c]) { state.voucher = c; $("#pCodeMsg").innerHTML = "Đã áp dụng <b>" + esc(c) + "</b> · " + esc(VOUCHERS[c].label.split("· ")[1]); toast("Áp dụng mã " + c + "."); }
      else { state.voucher = null; $("#pCodeMsg").textContent = "Mã " + c + " không hợp lệ hoặc đã hết hạn."; toast("Mã không hợp lệ."); }
      paintPayment(); paintCta("payment");
    });

    $("#dHome").addEventListener("click", function () { state.stack = []; go("home", false); });
    $("#dMatch").addEventListener("click", function () {
      var b = state.bookings[0];
      if (b) { state.nm.venue = b.venue; state.nm.sport = venue(b.venue).sport; state.nm.date = DAYS.findIndex(function (d) { return d.key === b.key; }); if (state.nm.date < 0) state.nm.date = 0; }
      go("newmatch");
    });

    $("#mNew").addEventListener("click", function () { go("newmatch"); });
    $("#nmVenue").addEventListener("change", function () { state.nm.venue = this.value; });
    $("#nmDate").addEventListener("change", function () { state.nm.date = +this.value; });
    $("#nmTime").addEventListener("change", function () { state.nm.time = this.value; });
    $("#nmMinus").addEventListener("click", function () { state.nm.need = Math.max(1, state.nm.need - 1); $("#nmNeed").textContent = state.nm.need; });
    $("#nmPlus").addEventListener("click", function () { state.nm.need = Math.min(20, state.nm.need + 1); $("#nmNeed").textContent = state.nm.need; });

    $("#pfOut").addEventListener("click", function () {
      state.stack = []; go("login", false); toast("Đã đăng xuất khỏi thiết bị này.");
    });

    $("#ctaBtn").addEventListener("click", function () {
      var n = state.screen, m;
      if (n === "venue") go("booking");
      else if (n === "booking") { state.voucher = null; $("#pCodeMsg").innerHTML = "Thử mã <b>SMATE10</b> (giảm 10%) hoặc <b>NEWBIE</b> (giảm 20.000đ)."; go("payment"); }
      else if (n === "payment") pay();
      else if (n === "match") {
        m = match(state.match); if (!m) return;
        if (m.mine) { m.mine = false; m.joined--; m.names.pop(); toast("Đã rời kèo."); }
        else { m.mine = true; m.joined++; m.names.push(state.user.name); toast("Đã tham gia kèo của " + m.host + "."); }
        paintMatch(); paintCta("match");
      } else if (n === "newmatch") {
        var cost = parseInt(String($("#nmCost").value).replace(/\D/g, ""), 10) || 0;
        if (!cost) { toast("Nhập chi phí mỗi người."); return; }
        var id = "m" + (MATCHES.length + 1) + "-" + Date.now();
        MATCHES.unshift({
          id: id, sport: state.nm.sport, kind: sport(state.nm.sport).name + " · kèo của bạn",
          venue: state.nm.venue, day: state.nm.date, time: state.nm.time, level: state.nm.level,
          cost: cost, cap: state.nm.need + 1, joined: 1, host: state.user.name, rating: 5, mine: true,
          note: $("#nmNote").value.trim() || "Chưa có ghi chú.", names: [state.user.name]
        });
        state.match = id; state.mTab = "mine";
        state.stack = ["matches"]; go("match");
        toast("Đã đăng kèo. Đang chờ người tham gia.");
      }
    });

    window.addEventListener("hashchange", function () {
      var h = location.hash.slice(1);
      if (SCREENS[h] && h !== state.screen) { state.screen = h; render(); }
    });
  }

  function menu(k) {
    if (k === "mymatch") { state.mTab = "mine"; go("matches"); return; }
    if (k === "history") { state.listKind = { id: "history", title: "Lịch sử đặt sân" }; go("list"); return; }
    if (k === "fav") { state.listKind = { id: "fav", title: "Sân yêu thích" }; go("list"); return; }
    if (k === "reward") { state.listKind = { id: "reward", title: "Ưu đãi và điểm thưởng" }; go("list"); return; }
    if (k === "pay") { toast("Đã lưu 1 ví MoMo và 1 thẻ Napas."); return; }
    toast("Trung tâm hỗ trợ: 1900 1234 (08:00 – 22:00).");
  }

  /* ---------------- boot ---------------- */

  function start() {
    build();
    wire();
    var h = location.hash.slice(1);
    state.screen = SCREENS[h] ? h : "login";
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

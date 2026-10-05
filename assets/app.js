/* Yas & Sea — protótipo navegável (Altivy Growth.MKT) */
(() => {
const S = window.STORE, B = S.brand;
const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];
const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const pix = v => v * (1 - B.pixDiscount);
const inst = v => `${B.installments}x de ${brl(v / B.installments)} sem juros`;
const byId = id => S.products.find(p => p.id === id);
const qs = new URLSearchParams(location.search);
const page = document.body.dataset.page;
const img = (src, alt = "", eager = false) =>
  `<img src="${src}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} onerror="this.classList.add('err')">`;

/* ---------- ícones ---------- */
const I = {
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
  l: '<svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>',
  r: '<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>',
  truck: '<svg viewBox="0 0 24 24"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  pix: '<svg viewBox="0 0 24 24"><path d="m12 3 9 9-9 9-9-9 9-9Z"/><path d="m8 12 4-4 4 4-4 4-4-4Z"/></svg>',
  card: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  swap: '<svg viewBox="0 0 24 24"><path d="M4 8h14l-3-3M20 16H6l3 3"/></svg>',
  wa: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"/></svg>',
};

/* ---------- logo (monograma YS) ---------- */
const logo = (light = false) => `
<svg viewBox="0 0 160 70" aria-label="${B.name}" role="img">
  <defs><linearGradient id="g${light?1:0}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#D4B57A"/><stop offset=".5" stop-color="#B08D57"/><stop offset="1" stop-color="#8C6D3F"/></linearGradient></defs>
  <text x="68" y="40" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="48" font-weight="500" fill="url(#g${light?1:0})">Y</text>
  <text x="92" y="46" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="48" font-style="italic" fill="url(#g${light?1:0})">S</text>
  <text x="80" y="64" text-anchor="middle" font-family="Jost, sans-serif" font-size="9" letter-spacing="4" fill="${light ? "#E8DCC4" : "#4A5559"}">YAS &amp; SEA</text>
</svg>`;

/* ---------- carrinho ---------- */
const KEY = "yasesea-cart";
let cart = [];
try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} renderCart(); };
const subtotal = () => cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
const addToCart = (id, color, size, qty = 1) => {
  const f = cart.find(l => l.id === id && l.color === color && l.size === size);
  f ? (f.qty += qty) : cart.push({ id, color, size, qty });
  save();
};

/* ---------- layout comum ---------- */
const navLinks = [
  ["Novidades", "colecao.html?c=todos"],
  ["Praia", "colecao.html?c=praia"],
  ["Óculos", "colecao.html?c=oculos"],
  ["Fitness", "colecao.html?c=fitness"],
  ["Sobre", "index.html#sobre"],
];
const cur = qs.get("c");
function layout() {
  document.body.insertAdjacentHTML("afterbegin", `
  <div class="proto">Protótipo de apresentação <b>Altivy Growth.MKT</b> para ${B.name}<span class="long"> · não é a loja oficial · compras desativadas</span></div>
  <div class="announce">${S.announcements.map((a, i) => `<span class="${i ? "" : "on"}">${a}</span>`).join("")}</div>
  <header class="hdr"><div class="wrap">
    <nav class="nav">${navLinks.slice(0, 4).map(([t, h]) => `<a href="${h}" class="${cur && h.includes("c=" + cur) ? "on" : ""}">${t}</a>`).join("")}</nav>
    <button class="burger" aria-label="Menu" data-open-nav>${I.menu}</button>
    <a class="logo" href="index.html">${logo()}</a>
    <div class="icons">
      <button aria-label="Buscar" data-soon="A busca">${I.search}</button>
      <button aria-label="Minha conta" data-soon="A área do cliente">${I.user}</button>
      <button class="cart-btn" aria-label="Sacola" data-open-cart>${I.bag}<span class="cart-count">0</span></button>
    </div>
  </div></header>
  <div class="drawer-nav"><div class="bg" data-close></div><div class="panel">
    <div style="margin-bottom:18px">${logo()}</div>
    ${navLinks.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}
  </div></div>`);

  document.body.insertAdjacentHTML("beforeend", `
  <section class="news"><div class="wrap">
    <div class="sec-head" style="margin-bottom:14px"><div class="kicker">Clube Yas & Sea</div><h2>Ganhe <em>10% off</em> na primeira compra</h2></div>
    <p>Receba lançamentos, coleções exclusivas e convites antes de todo mundo.</p>
    <form data-news><input type="email" required placeholder="Seu melhor e-mail"><button>Quero</button></form>
  </div></section>
  <footer><div class="wrap">
    <div class="cols">
      <div><div class="logo-ft">${logo(true)}</div><p>${B.tagline}</p><p style="margin-top:12px">${B.address}</p></div>
      <div><h5>Loja</h5><ul>${navLinks.slice(0, 4).map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
      <div><h5>Ajuda</h5><ul><li><a href="#" data-sizes>Guia de medidas</a></li><li><a href="#" data-soon="A página de trocas">Trocas e devoluções</a></li><li><a href="#" data-soon="A página de envios">Prazos e envios</a></li><li><a href="https://wa.me/${B.whatsapp}" target="_blank" rel="noopener">Fale conosco</a></li></ul></div>
      <div><h5>Pagamento</h5><div class="pay"><span>Pix</span><span>Visa</span><span>Master</span><span>Elo</span><span>Amex</span><span>Boleto</span></div>
        <h5 style="margin-top:22px">Redes</h5><ul><li><a href="https://www.instagram.com/${B.instagram}/" target="_blank" rel="noopener">@${B.instagram}</a></li></ul></div>
    </div>
    <div class="legal"><span>© ${new Date().getFullYear()} ${B.name} · Enviamos para todo o Brasil</span><span>Protótipo desenvolvido por Altivy Growth.MKT</span></div>
  </div></footer>
  <a class="wa" href="https://wa.me/${B.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a>
  <div class="drawer" id="cart"><div class="bg" data-close></div><div class="panel">
    <header><h3>Sua sacola</h3><button class="x" data-close aria-label="Fechar">×</button></header>
    <div class="freebar"></div><div class="lines"></div><footer></footer>
  </div></div>
  <div class="modal" id="sizes"><div class="bg" data-close></div><div class="box">
    <button class="x" data-close aria-label="Fechar">×</button><h3>Guia de medidas</h3>
    <p style="font-size:14px;color:var(--ink-2)">Medidas do corpo em centímetros. Entre dois tamanhos, prefira o maior.</p>
    <table><tr><th>Tam.</th><th>Busto</th><th>Cintura</th><th>Quadril</th></tr>
      <tr><td>P</td><td>82–86</td><td>62–66</td><td>90–94</td></tr><tr><td>M</td><td>87–91</td><td>67–71</td><td>95–99</td></tr>
      <tr><td>G</td><td>92–96</td><td>72–76</td><td>100–104</td></tr><tr><td>GG</td><td>97–101</td><td>77–81</td><td>105–109</td></tr></table>
  </div></div>
  <div class="toast"></div>`);

  // anúncio rotativo
  const ann = $$(".announce span"); let ai = 0;
  setInterval(() => { ann[ai].classList.remove("on"); ai = (ai + 1) % ann.length; ann[ai].classList.add("on"); }, 3800);

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-open-cart],[data-open-nav],[data-close],[data-soon],[data-sizes],[data-checkout],[data-qty],[data-rm]");
    if (!t) return;
    if (t.matches("[data-open-cart]")) openCart();
    else if (t.matches("[data-open-nav]")) $(".drawer-nav").classList.add("open");
    else if (t.matches("[data-close]")) t.closest(".drawer,.drawer-nav,.modal").classList.remove("open");
    else if (t.matches("[data-soon]")) { e.preventDefault(); toast(`${t.dataset.soon} fica ativa na loja oficial.`); }
    else if (t.matches("[data-sizes]")) { e.preventDefault(); $("#sizes").classList.add("open"); }
    else if (t.matches("[data-checkout]")) { e.preventDefault(); toast("Protótipo: o checkout seguro da Nuvemshop entra aqui, com Pix, cartão e boleto."); }
    else if (t.matches("[data-qty]")) { const l = cart[+t.dataset.i]; l.qty = Math.max(1, l.qty + +t.dataset.qty); save(); }
    else if (t.matches("[data-rm]")) { cart.splice(+t.dataset.i, 1); save(); }
  });
  $("[data-news]").addEventListener("submit", e => { e.preventDefault(); e.target.reset(); toast("Pronto! Seu cupom de 10% chegaria por e-mail."); });
}

let tt;
function toast(msg) { const t = $(".toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 3400); }
function openCart() { $("#cart").classList.add("open"); }

function lineHTML(l, i) {
  const p = byId(l.id);
  return `<div class="line"><a class="ph" href="produto.html?p=${p.id}">${img(p.images[0], p.name)}</a><div>
    <h4>${p.name}</h4><div class="meta">${l.color} · ${l.size}</div>
    <div class="row"><div class="qty"><button data-qty="-1" data-i="${i}">−</button><input value="${l.qty}" readonly aria-label="Quantidade"><button data-qty="1" data-i="${i}">+</button></div><b>${brl(p.price * l.qty)}</b></div>
    <button class="rm" data-rm data-i="${i}">Remover</button></div></div>`;
}
function freebar(total) {
  const left = B.freeShippingFrom - total, pct = Math.min(100, (total / B.freeShippingFrom) * 100);
  return `${left > 0 ? `Faltam <b>${brl(left)}</b> para o frete grátis` : "Você ganhou <b>frete grátis</b>"}<div class="track"><div class="fill" style="width:${pct}%"></div></div>`;
}
function renderCart() {
  const n = cart.reduce((s, l) => s + l.qty, 0), st = subtotal();
  $$(".cart-count").forEach(c => (c.textContent = n));
  const d = $("#cart"); if (!d) return;
  $(".freebar", d).innerHTML = freebar(st);
  $(".lines", d).innerHTML = cart.length ? cart.map(lineHTML).join("")
    : `<div class="empty"><p>Sua sacola está vazia</p><a class="btn btn-line" href="colecao.html?c=todos">Ver produtos</a></div>`;
  $("footer", d).innerHTML = cart.length ? `<div class="tot"><span>Subtotal</span><b>${brl(st)}</b></div>
    <div class="tot-pix">ou ${brl(pix(st))} no Pix</div>
    <a class="btn btn-dark" href="carrinho.html">Ver sacola e finalizar</a>` : "";
  if (page === "cart") renderCartPage();
}

/* ---------- componentes ---------- */
const card = p => `<a class="card reveal" href="produto.html?p=${p.id}">
  <div class="ph">${p.badge ? `<span class="badge">${p.badge}</span>` : ""}${img(p.images[0], p.name)}${p.images[1] ? img(p.images[1], "") : ""}</div>
  <div class="type">${p.type}</div><h3>${p.name}</h3>
  <div class="price"><span class="now">${brl(p.price)}</span>${p.compareAt ? `<s>${brl(p.compareAt)}</s>` : ""}</div>
  <div class="pix">${brl(pix(p.price))} no Pix</div>
  <div class="swatches">${p.colors.map(c => `<i style="background:${c.hex}" title="${c.name}"></i>`).join("")}</div></a>`;

function rail(el) {
  const r = $(".rail", el), step = () => r.firstElementChild.getBoundingClientRect().width + 20;
  $("[data-prev]", el).onclick = () => r.scrollBy({ left: -step(), behavior: "smooth" });
  $("[data-next]", el).onclick = () => r.scrollBy({ left: step(), behavior: "smooth" });
}

/* ---------- HOME ---------- */
function home() {
  const m = $("main");
  const look = S.products.filter(p => p.look === "mare");
  m.innerHTML = `
  <div class="hero">${S.slides.map((s, i) => `<div class="slide ${i ? "" : "on"}"><div class="ph">${img(s.img, s.title, !i)}</div>
    <div class="txt"><div class="kicker">${s.kicker}</div><h1>${s.title}</h1><p>${s.text}</p><a class="btn btn-light" href="${s.href}">${s.cta}</a></div></div>`).join("")}
    <div class="dots">${S.slides.map((_, i) => `<button class="${i ? "" : "on"}" aria-label="Banner ${i + 1}"></button>`).join("")}</div></div>
  <div class="perks"><div class="wrap">
    <div class="perk">${I.truck}<div><b>Frete grátis</b>acima de ${brl(B.freeShippingFrom)}</div></div>
    <div class="perk">${I.pix}<div><b>${B.pixDiscount * 100}% OFF no Pix</b>desconto automático</div></div>
    <div class="perk">${I.card}<div><b>${B.installments}x sem juros</b>em todos os cartões</div></div>
    <div class="perk">${I.swap}<div><b>Primeira troca grátis</b>em até 30 dias</div></div>
  </div></div>
  <section><div class="wrap">
    <div class="sec-head reveal"><div class="kicker">Explore</div><h2>Para cada <em>momento</em> de sol</h2></div>
    <div class="cats">${S.categories.map(c => `<a class="cat reveal" href="colecao.html?c=${c.id}"><div class="ph">${img(c.img, c.name)}</div><span>${c.name}<small>Ver coleção</small></span></a>`).join("")}</div>
  </div></section>
  <section style="padding-top:0" id="lanc"><div class="wrap">
    <div class="sec-head reveal"><div class="kicker">Lançamentos</div><h2>Novidades da <em>estação</em></h2></div>
    <div class="rail">${S.products.map(card).join("")}</div>
    <div class="rail-ctrl"><button data-prev aria-label="Anterior">${I.l}</button><button data-next aria-label="Próximo">${I.r}</button></div>
  </div></section>
  <section style="background:var(--sand)"><div class="wrap look">
    <div class="ph reveal">${img(S.products[0].images[0], "Look Maré")}</div>
    <div class="reveal"><div class="kicker" style="color:var(--gold-dark)">Compre o look</div>
      <h2 style="font-family:var(--serif);font-weight:400;font-size:clamp(36px,4.4vw,52px);line-height:1.05;margin-top:10px">Conjunto <em>Maré</em></h2>
      <p style="color:var(--ink-2);margin-top:12px">Top e calcinha vendidos separados, para você escolher o tamanho certo de cada peça.</p>
      <div class="look-items">${look.map(p => `<div class="look-item"><a class="ph" href="produto.html?p=${p.id}">${img(p.images[0], p.name)}</a>
        <div><div class="type" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)">${p.type}</div><h4>${p.name}</h4><div style="font-size:14px">${brl(p.price)}</div></div>
        <a class="btn btn-line" style="height:40px;padding:0 16px" href="produto.html?p=${p.id}">Ver</a></div>`).join("")}</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:18px"><span>Look completo</span><b>${brl(look.reduce((s, p) => s + p.price, 0))}</b></div>
      <a class="btn btn-dark" href="produto.html?p=top-mare">Montar meu conjunto</a></div>
  </div></section>
  <section class="about" id="sobre"><div class="ph">${img(S.about.img, "")}</div><div class="wrap reveal">
    <div class="kicker">Nossa essência</div><h2>${S.about.title}</h2><p>${S.about.text}</p>
    <a class="btn btn-light" href="colecao.html?c=todos">Conheça a coleção</a></div></section>
  <section><div class="wrap">
    <div class="sec-head reveal"><div class="kicker">@${B.instagram}</div><h2>Siga a <em>alma do mar</em></h2></div>
  </div><div class="insta">${S.instagramFeed.map(u => `<a href="https://www.instagram.com/${B.instagram}/" target="_blank" rel="noopener"><div class="ph">${img(u, "Post do Instagram")}</div></a>`).join("")}</div></section>`;

  const slides = $$(".slide"), dots = $$(".dots button"); let si = 0, timer;
  const go = i => { slides[si].classList.remove("on"); dots[si].classList.remove("on"); si = i; slides[si].classList.add("on"); dots[si].classList.add("on"); };
  const auto = () => { clearInterval(timer); timer = setInterval(() => go((si + 1) % slides.length), 6000); };
  dots.forEach((d, i) => (d.onclick = () => { go(i); auto(); })); auto();
  rail($("#lanc"));
}

/* ---------- COLEÇÃO ---------- */
const catNames = { todos: "Novidades", praia: "Praia", oculos: "Óculos", fitness: "Fitness" };
const catText = {
  todos: "Tudo o que acabou de chegar.",
  praia: "Biquínis, maiôs e saídas para dias de sol.",
  oculos: "Armações exclusivas com proteção UV400.",
  fitness: "Do treino ao café, com o mesmo cuidado.",
};
function collection() {
  let c = qs.get("c"); if (!catNames[c]) c = "todos";
  const base = c === "todos" ? S.products : S.products.filter(p => p.category === c);
  const types = [...new Set(base.map(p => p.type))];
  let type = "", sort = "rel";
  document.title = `${catNames[c]} | ${B.name}`;
  $("main").innerHTML = `<div class="wrap">
    <div class="crumbs"><a href="index.html">Início</a> / ${catNames[c]}</div>
    <div class="col-hero"><h1>${catNames[c]}</h1><p>${catText[c]}</p></div>
    <div class="toolbar"><div class="chips"><button class="chip on" data-t="">Todos</button>${types.map(t => `<button class="chip" data-t="${t}">${t}</button>`).join("")}</div>
      <div style="display:flex;gap:14px;align-items:center"><span class="count"></span>
      <select aria-label="Ordenar"><option value="rel">Mais relevantes</option><option value="asc">Menor preço</option><option value="desc">Maior preço</option></select></div></div>
    <div class="grid"></div></div><div style="height:80px"></div>`;
  const draw = () => {
    let list = base.filter(p => !type || p.type === type);
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    $(".grid").innerHTML = list.map(card).join("");
    $(".count").textContent = `${list.length} produto${list.length > 1 ? "s" : ""}`;
    observe();
  };
  $$(".chip").forEach(b => (b.onclick = () => { $$(".chip").forEach(x => x.classList.remove("on")); b.classList.add("on"); type = b.dataset.t; draw(); }));
  $("select").onchange = e => { sort = e.target.value; draw(); };
  draw();
}

/* ---------- PRODUTO ---------- */
function product() {
  const p = byId(qs.get("p")) || S.products[0];
  document.title = `${p.name} | ${B.name}`;
  let color = p.colors[0].name, size = p.sizes.length === 1 ? p.sizes[0] : "", qty = 1;
  const mates = p.look ? S.products.filter(x => x.look === p.look && x.id !== p.id) : [];
  const related = S.products.filter(x => x.category === p.category && x.id !== p.id && !mates.includes(x)).slice(0, 4);
  $("main").innerHTML = `<div class="wrap">
    <div class="crumbs"><a href="index.html">Início</a> / <a href="colecao.html?c=${p.category}">${catNames[p.category]}</a> / ${p.name}</div>
    <div class="pdp">
      <div class="gallery">${[...p.images, p.images[0]].slice(0, 3).map((u, i) => `<div class="ph">${img(u, p.name, !i)}</div>`).join("")}</div>
      <div class="buy">
        <div class="type" style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)">${p.type}${p.badge ? " · " + p.badge : ""}</div>
        <h1>${p.name}</h1>
        <div class="price"><span class="now">${brl(p.price)}</span>${p.compareAt ? `<s>${brl(p.compareAt)}</s>` : ""}</div>
        <div class="inst">${inst(p.price)}</div>
        <div class="pix-box"><span>${I.pix.replace("<svg", '<svg style="width:16px;height:16px;stroke:var(--sea);fill:none;vertical-align:-3px;margin-right:6px"')}<b>${brl(pix(p.price))}</b> no Pix</span><span>${B.pixDiscount * 100}% de desconto</span></div>
        <div class="opt"><div class="opt-label">Cor <span data-cl>${color}</span></div>
          <div class="colors">${p.colors.map((c, i) => `<button class="${i ? "" : "on"}" style="background:${c.hex}" data-c="${c.name}" aria-label="${c.name}"></button>`).join("")}</div></div>
        <div class="opt"><div class="opt-label">Tamanho ${p.sizes.length > 1 ? `<a href="#" data-sizes>Guia de medidas</a>` : ""}</div>
          <div class="sizes">${p.sizes.map(s => `<button data-s="${s}" class="${s === size ? "on" : ""}">${s}</button>`).join("")}</div>
          <div class="err-msg"></div></div>
        <div class="qty-row"><div class="qty"><button data-q="-1">−</button><input value="1" readonly aria-label="Quantidade"><button data-q="1">+</button></div>
          <button class="btn btn-dark" data-add style="flex:1">Adicionar à sacola</button></div>
        <div class="ship"><input inputmode="numeric" maxlength="9" placeholder="Calcule o frete: digite seu CEP"><button data-ship>Calcular</button></div>
        <div class="ship-out"></div>
        <div class="acc">
          <details open><summary>Descrição</summary><div class="body">${p.description}</div></details>
          <details><summary>Composição e cuidados</summary><div class="body">${p.category === "oculos" ? "Acetato premium e metal banhado. Limpe apenas com a flanela que acompanha o produto." : "82% poliamida, 18% elastano. Lave à mão com água fria e seque à sombra. Enxágue após o contato com cloro ou água salgada."}</div></details>
          <details><summary>Trocas e devoluções</summary><div class="body">Primeira troca grátis em até 30 dias. Peças de banho devem estar com o forro de proteção intacto.</div></details>
        </div>
      </div>
    </div>
    ${mates.length ? `<section style="padding-top:40px"><div class="sec-head"><div class="kicker">Compre o look</div><h2>Complete o <em>conjunto</em></h2></div>
      <div class="grid">${mates.map(card).join("")}</div></section>` : ""}
    ${related.length ? `<section style="padding-top:${mates.length ? 0 : 40}px"><div class="sec-head"><div class="kicker">Você também vai amar</div><h2>Produtos <em>relacionados</em></h2></div>
      <div class="grid">${related.map(card).join("")}</div></section>` : ""}
  </div>`;

  $$(".colors button").forEach(b => (b.onclick = () => { $$(".colors button").forEach(x => x.classList.remove("on")); b.classList.add("on"); color = b.dataset.c; $("[data-cl]").textContent = color; }));
  $$(".sizes button").forEach(b => (b.onclick = () => { $$(".sizes button").forEach(x => x.classList.remove("on")); b.classList.add("on"); size = b.dataset.s; $(".err-msg").textContent = ""; }));
  $$("[data-q]").forEach(b => (b.onclick = () => { qty = Math.max(1, qty + +b.dataset.q); $(".qty-row input").value = qty; }));
  $("[data-add]").onclick = () => {
    if (!size) { $(".err-msg").textContent = "Escolha um tamanho para continuar."; return; }
    addToCart(p.id, color, size, qty); openCart();
  };
  const cep = $(".ship input");
  cep.oninput = () => { let v = cep.value.replace(/\D/g, "").slice(0, 8); cep.value = v.length > 5 ? v.slice(0, 5) + "-" + v.slice(5) : v; };
  $("[data-ship]").onclick = () => {
    const out = $(".ship-out");
    if (cep.value.replace(/\D/g, "").length < 8) { out.textContent = "Digite um CEP válido."; return; }
    const free = p.price >= B.freeShippingFrom;
    out.innerHTML = `PAC: ${free ? "<b>Grátis</b>" : brl(19.9)} · 5 a 8 dias úteis<br>SEDEX: ${brl(32.9)} · 2 a 4 dias úteis<br><small style="color:var(--muted)">Valores simulados no protótipo</small>`;
  };
}

/* ---------- CARRINHO ---------- */
function renderCartPage() {
  const m = $("main"), st = subtotal();
  if (!cart.length) { m.innerHTML = `<div class="wrap"><div class="col-hero" style="padding-top:60px"><h1>Sua sacola</h1></div><div class="empty"><p>Sua sacola está vazia</p><a class="btn btn-dark" style="width:auto" href="colecao.html?c=todos">Explorar produtos</a></div><div style="height:80px"></div></div>`; return; }
  const ship = st >= B.freeShippingFrom ? 0 : 19.9;
  m.innerHTML = `<div class="wrap"><div class="crumbs"><a href="index.html">Início</a> / Sacola</div>
    <div class="col-hero" style="text-align:left;padding-top:0"><h1>Sua sacola</h1></div>
    <div class="cart-page"><div><div style="padding:14px 0;border-bottom:1px solid var(--line)" class="freebar">${freebar(st)}</div>${cart.map(lineHTML).join("")}</div>
    <aside class="summary"><h3>Resumo</h3>
      <div class="r"><span>Subtotal</span><span>${brl(st)}</span></div>
      <div class="r"><span>Frete (PAC)</span><span>${ship ? brl(ship) : "Grátis"}</span></div>
      <div class="coupon"><input placeholder="Cupom de desconto"><button data-soon="O cupom">Aplicar</button></div>
      <div class="r big"><span>Total</span><span>${brl(st + ship)}</span></div>
      <div class="r" style="color:var(--sea)"><span>No Pix</span><b>${brl(pix(st) + ship)}</b></div>
      <div class="r" style="color:var(--muted);font-size:13px;padding-top:0"><span>ou ${inst(st + ship)}</span></div>
      <button class="btn btn-dark" style="margin-top:16px" data-checkout>Finalizar compra</button>
      <a class="btn btn-line" style="width:100%;margin-top:10px" href="colecao.html?c=todos">Continuar comprando</a>
      <div class="safe">Compra 100% segura · Pix, cartão e boleto</div>
    </aside></div></div>`;
}

/* ---------- animação de entrada ---------- */
let io;
function observe() {
  io = io || new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .12 });
  $$(".reveal:not(.in)").forEach(el => io.observe(el));
}

/* ---------- init ---------- */
layout();
({ home, collection, product, cart: renderCartPage })[page]?.();
renderCart();
observe();
})();

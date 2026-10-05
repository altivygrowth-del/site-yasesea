/* =========================================================
   CONFIGURAÇÃO DA MARCA — troque aqui para reaproveitar o modelo
   Cada bloco corresponde a uma seção editável da Nuvemshop.
   ========================================================= */
const IMG = (id, w = 1000) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

window.STORE = {
  brand: {
    name: "Yas & Sea",
    tagline: "O luxo do natural, a alma do mar.",
    city: "Guaratuba – PR",
    address: "Avenida Paraná, 2035 – Guaratuba/PR",
    instagram: "yaseseaoficial",
    whatsapp: "5541999999999", // trocar pelo número real
    pixDiscount: 0.05,          // 5% de desconto no Pix
    installments: 6,            // parcelas sem juros
    freeShippingFrom: 299,      // frete grátis a partir de
  },

  // Barra de anúncio (Nuvemshop: "Mensagem de anúncio")
  announcements: [
    "Frete grátis acima de R$ 299 para todo o Brasil",
    "5% OFF pagando no Pix",
    "Parcele em até 6x sem juros",
  ],

  // Slider principal (Nuvemshop: "Carrossel de banners")
  slides: [
    {
      img: IMG("photo-1687610121428-d4c1805f0e66", 1800),
      kicker: "Coleção Verão 2027",
      title: "A alma do mar",
      text: "Biquínis feitos para o sol do litoral.",
      cta: "Ver coleção praia",
      href: "colecao.html?c=praia",
    },
    {
      img: IMG("photo-1584280282203-143dd29f3fcc", 1800),
      kicker: "Óculos exclusivos",
      title: "Olhar de verão",
      text: "Armações com detalhes dourados e proteção UV400.",
      cta: "Ver óculos",
      href: "colecao.html?c=oculos",
    },
    {
      img: IMG("photo-1606903037631-f09fd0bd74b4", 1800),
      kicker: "Fitness",
      title: "Movimento com elegância",
      text: "Conjuntos que vão do treino ao café.",
      cta: "Ver fitness",
      href: "colecao.html?c=fitness",
    },
  ],

  // Categorias (Nuvemshop: "Banners de categorias")
  categories: [
    { id: "praia",   name: "Praia",   img: IMG("photo-1700131299909-af5e02bc7c3c", 900) },
    { id: "oculos",  name: "Óculos",  img: IMG("photo-1646200772842-8fc49ff7e771", 900) },
    { id: "fitness", name: "Fitness", img: IMG("photo-1645318800735-737d3a422de6", 900) },
  ],

  // Banner institucional (Nuvemshop: "Banner com texto" / "Módulo institucional")
  about: {
    img: IMG("photo-1537726043141-dabf1c48d0a8", 1600),
    title: "Nascida no litoral do Paraná",
    text:
      "A Yas & Sea une o luxo do natural à leveza do mar. Peças pensadas para mulheres que vivem a praia, o movimento e o sol com a mesma elegância.",
  },

  // Feed do Instagram (Nuvemshop: "Instagram" — conecta a conta e puxa sozinho)
  instagramFeed: [
    IMG("photo-1593836788196-9fd68e904906", 600),
    IMG("photo-1700131299853-126577f5666d", 600),
    IMG("photo-1632682782861-badeaf2c240a", 600),
    IMG("photo-1687610035685-3e6e734bbc90", 600),
    IMG("photo-1582757236529-771a58f8340c", 600),
    IMG("photo-1632682940163-b496d377d3b8", 600),
  ],

  // Produtos (Nuvemshop: Produtos > variações de cor/tamanho)
  // "look" agrupa peças para o "Compre o look"
  products: [
    {
      id: "top-mare", name: "Top Cortininha Maré", category: "praia", type: "Top",
      price: 129.9, compareAt: 159.9, look: "mare", badge: "Mais vendido",
      colors: [{ name: "Azul Maré", hex: "#3E6E86" }, { name: "Areia", hex: "#D9C3A0" }],
      sizes: ["P", "M", "G", "GG"],
      images: [IMG("photo-1592736878717-62665508941e"), IMG("photo-1645764039609-f17851e0248c")],
      description: "Top cortininha com bojo removível e alças reguláveis. Tecido com proteção UV50+ e toque acetinado.",
    },
    {
      id: "calcinha-mare", name: "Calcinha Asa Delta Maré", category: "praia", type: "Calcinha",
      price: 109.9, look: "mare",
      colors: [{ name: "Azul Maré", hex: "#3E6E86" }, { name: "Areia", hex: "#D9C3A0" }],
      sizes: ["P", "M", "G", "GG"],
      images: [IMG("photo-1526784507872-e8ffc369bb77"), IMG("photo-1592736878717-62665508941e")],
      description: "Calcinha asa delta com cós duplo e modelagem que valoriza. Combina com o Top Cortininha Maré.",
    },
    {
      id: "top-areia", name: "Top Faixa Areia Dourada", category: "praia", type: "Top",
      price: 139.9, look: "areia", badge: "Novo",
      colors: [{ name: "Off-white", hex: "#F1ECE2" }, { name: "Dourado", hex: "#B8955A" }],
      sizes: ["P", "M", "G"],
      images: [IMG("photo-1606792109910-340f5e672ccd"), IMG("photo-1617525256581-d6a0e80470e7")],
      description: "Top faixa com argola dourada central. Sem marquinha de alça, com bojo e silicone interno.",
    },
    {
      id: "calcinha-areia", name: "Calcinha Laço Areia Dourada", category: "praia", type: "Calcinha",
      price: 119.9, look: "areia",
      colors: [{ name: "Off-white", hex: "#F1ECE2" }, { name: "Dourado", hex: "#B8955A" }],
      sizes: ["P", "M", "G"],
      images: [IMG("photo-1617525256581-d6a0e80470e7"), IMG("photo-1606792109910-340f5e672ccd")],
      description: "Calcinha de amarração lateral com ponteiras douradas. Ajuste perfeito para todos os corpos.",
    },
    {
      id: "maio-concha", name: "Maiô Concha", category: "praia", type: "Maiô",
      price: 289.9, badge: "Exclusivo",
      colors: [{ name: "Terracota", hex: "#B5654A" }, { name: "Preto", hex: "#1F2326" }],
      sizes: ["P", "M", "G", "GG"],
      images: [IMG("photo-1656466610826-112b67d85de5"), IMG("photo-1697739348487-75f668fdb6fb")],
      description: "Maiô decote profundo com costas abertas e recorte franzido. Vai da praia ao beach club.",
    },
    {
      id: "saida-brisa", name: "Saída de Praia Brisa", category: "praia", type: "Saída de praia",
      price: 219.9,
      colors: [{ name: "Linho", hex: "#E8DFD0" }],
      sizes: ["Único"],
      images: [IMG("photo-1582205524573-ac35c641d947"), IMG("photo-1523791596943-436f446e5725")],
      description: "Camisa oversized em viscolinho, leve e fluida. Perfeita sobre o biquíni.",
    },
    {
      id: "oculos-riviera", name: "Óculos Riviera", category: "oculos", type: "Óculos",
      price: 249.9, compareAt: 299.9, badge: "Mais vendido",
      colors: [{ name: "Tartaruga", hex: "#6B4A2F" }, { name: "Preto", hex: "#1F2326" }],
      sizes: ["Único"],
      images: [IMG("photo-1760446031507-ed534e0f9605"), IMG("photo-1632411289956-276cdf398f61")],
      description: "Armação em acetato com hastes douradas. Lentes com proteção UV400. Acompanha estojo e flanela.",
    },
    {
      id: "oculos-marina", name: "Óculos Marina", category: "oculos", type: "Óculos",
      price: 229.9, badge: "Novo",
      colors: [{ name: "Preto", hex: "#1F2326" }, { name: "Champagne", hex: "#CDB48A" }],
      sizes: ["Único"],
      images: [IMG("photo-1646200772842-8fc49ff7e771"), IMG("photo-1654648342143-4dab6c62bb4d")],
      description: "Formato gatinho com acabamento polido. Lentes degradê e proteção UV400.",
    },
    {
      id: "top-onda", name: "Top Fitness Onda", category: "fitness", type: "Top",
      price: 149.9, look: "onda",
      colors: [{ name: "Malva", hex: "#A88290" }, { name: "Preto", hex: "#1F2326" }],
      sizes: ["P", "M", "G"],
      images: [IMG("photo-1606903037631-f09fd0bd74b4"), IMG("photo-1645318800735-737d3a422de6")],
      description: "Top de sustentação média com tecido compressor e secagem rápida.",
    },
    {
      id: "legging-onda", name: "Legging Onda", category: "fitness", type: "Legging",
      price: 199.9, look: "onda",
      colors: [{ name: "Malva", hex: "#A88290" }, { name: "Preto", hex: "#1F2326" }],
      sizes: ["P", "M", "G", "GG"],
      images: [IMG("photo-1606902965551-dce093cda6e7"), IMG("photo-1597586785094-c9c247ec343f")],
      description: "Legging cintura alta, não fica transparente e modela sem apertar.",
    },
  ],
};

# Yas & Sea — protótipo de loja virtual

Protótipo navegável criado pela **Altivy Growth.MKT** para apresentar à Yas & Sea (@yaseseaoficial) como ficaria a loja online da marca. Não é a loja oficial. O checkout está desativado e o site não é indexado pelo Google.

Site estático (HTML, CSS e JS puro), sem build. Publicado na Vercel.

## Estrutura

```
index.html       Home
colecao.html     Coleção (?c=todos | praia | oculos | fitness)
produto.html     Página de produto (?p=<id do produto>)
carrinho.html    Sacola
assets/config.js Marca, banners, categorias e produtos (edite aqui)
assets/style.css Cores, fontes e layout (tokens em :root)
assets/app.js    Renderização e interações
```

## Reaproveitar para outra marca

1. Em `assets/config.js`, troque `brand`, `announcements`, `slides`, `categories`, `about`, `instagramFeed` e `products`.
2. Em `assets/style.css`, ajuste as cores em `:root` (`--cream`, `--gold`, `--ink` etc.) e as fontes.
3. Em `assets/app.js`, troque a função `logo()` pelo SVG ou imagem do logo do cliente.
4. Substitua as fotos de banco de imagem pelas fotos reais da marca.

## Como replicar na Nuvemshop

Todas as seções do protótipo existem nativamente nos temas da Nuvemshop (recomendado: temas **Amazonas**, **Rio** ou **Lima**, que têm slider em tela cheia e banners de categoria). Caminho no painel: **Minha Nuvemshop > Layout > Editar layout**. Os nomes exatos das seções variam um pouco de tema para tema.

| Seção do protótipo | Onde configurar na Nuvemshop |
| --- | --- |
| Barra de anúncio rotativa | Cabeçalho > Mensagem de anúncio (alguns temas aceitam várias mensagens) |
| Logo centralizado + menu | Cabeçalho > Logo e posição; menu em Navegação > Menu principal |
| Slider de banners | Página inicial > Carrossel de imagens (desktop e mobile separados) |
| Faixa de benefícios | Página inicial > Informações de envio / Banner de benefícios |
| Banners de categoria | Página inicial > Banners de categorias |
| Carrossel "Novidades" | Página inicial > Produtos em destaque / Novidades |
| Compre o look | App "Compre Junto" ou "Produtos relacionados" na página de produto; na home, use um Banner com texto + produtos em destaque |
| Banner institucional | Página inicial > Módulo institucional / Banner com texto |
| Feed do Instagram | Página inicial > Instagram (conectar a conta) |
| Newsletter | Rodapé > Newsletter (integrar com Perfit ou outro app de e-mail) |
| Botão de WhatsApp | Configurações > Redes sociais > WhatsApp |
| Guia de medidas | Página de produto > Guia de medidas (ou app de tabela de medidas) |
| Desconto no Pix | Pagamentos > configurar desconto por meio de pagamento |
| Frete grátis acima de R$ 299 | Envios > Frete grátis por valor mínimo |
| Barra de frete grátis no carrinho | Layout > Carrinho > Mostrar progresso de frete grátis |
| Cores e fontes | Layout > Cores e Tipografia (Cormorant Garamond e Jost estão disponíveis ou podem ser carregadas via CSS avançado) |

### Produtos

- **Top e calcinha separados:** cadastre como produtos independentes, cada um com variações de Cor e Tamanho.
- **Variações:** Produtos > Variações > Cor (com amostra de cor) e Tamanho.
- **Etiquetas** ("Novo", "Mais vendido"): use o campo de etiqueta/tag do tema ou o preço promocional para "de/por".

---

Protótipo desenvolvido por Altivy Growth.MKT.

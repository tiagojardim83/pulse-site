# Pulse — Soluções Criativas

Site estático responsivo em português, baseado no PDF fornecido. Conteúdo publicado em `dist/`.

## Visualizar

Execute `python3 -m http.server 4187 --bind 127.0.0.1 --directory dist` nesta pasta e abra http://127.0.0.1:4187.

## Editar

- `dist/index.html`: conteúdo, contatos e estrutura.
- `dist/style.css`: identidade visual e comportamento responsivo.
- `dist/script.js`: abertura animada, carrossel de clientes, menu móvel e ano do rodapé.
- `dist/assets/`: imagens extraídas do PDF original.

A faixa laranja apresenta estratégia, essência, conexão e movimento em um loop da esquerda para a direita. O carrossel de clientes reúne três cards tipográficos de marcas e dois espaços reservados para marcas adicionais. Substitua os placeholders quando houver nomes aprovados; as fotos serão adicionadas posteriormente.

Fontes DM Sans e Manrope carregadas pelo Google Fonts, com alternativas locais. Sem formulário ou coleta de dados. Links para WhatsApp, Instagram e e-mail usam os contatos fornecidos.

## Validação

Verificado no Chrome em 1440px e 390px: ausência de overflow horizontal, imagens carregadas, expansão dos serviços, abertura e fechamento do menu móvel. A abertura mantém os batimentos em loop até o visitante rolar, arrastar para cima, deslizar no celular ou usar a tecla de navegação. Há opção de pular e a marca do cabeçalho reinicia a abertura; ela é ignorada quando há preferência por movimento reduzido. O site inclui foco visível e navegação por teclado.

## Hospedagem

O site não exige instalação nem compilação. Configure `dist` como pasta pública na hospedagem escolhida.

O envio ao GitHub versiona os arquivos; a publicação do site em um endereço público é uma etapa separada.

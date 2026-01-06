# Guia de Adequação Visual - Padrão SEMEC

Este documento serve como um prompt padrão para que o Cursor (ou outra IA) aplique a nova identidade visual da SEMEC em sites legados.

---

## Prompt de Execução

"Atue como um desenvolvedor front-end especialista. Preciso que você aplique a nova identidade visual da SEMEC (disponível na pasta `Nav_Bar_Footer_Semec-main`) ao arquivo `index.html` e `styles.css` deste projeto.

Siga rigorosamente estas etapas:

### 1. Preparação de Dependências e Estilos Base
- Adicione no `<head>` do `index.html`:
  - Fonte **Poppins** via Google Fonts.
  - **Favicon**: Adicione `<link rel="icon" type="image/png" href="Nav_Bar_Footer_Semec-main/public/imagem_icon-removebg-preview.png">`.
  - **Tailwind CSS** via CDN.
  - Configuração do Tailwind com as cores oficiais:
    ```javascript
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    'pv-blue-900': '#1e3a5f',
                    'pv-blue-700': '#26476f',
                    'pv-yellow-500': '#f2c94c',
                    'pv-green-600': '#70b643',
                }
            }
        }
    }
    ```
- No `styles.css`, defina as variáveis `:root` equivalentes e atualize o `body` para usar `font-family: 'Poppins'`.
- Adicione o estilo de destaque para a busca no `styles.css`:
  ```css
  .site-search-highlight {
      background-color: #fff3a4;
      color: inherit;
      padding: 0 0.15em;
      border-radius: 0.2rem;
      box-shadow: 0 0 0 2px rgba(255, 235, 59, 0.35);
  }
  ```

### 2. Implementação do Header (com Busca Retrátil Alinhada)
- Substitua o cabeçalho antigo por um novo `<header>` utilizando as classes Tailwind do componente `Header.tsx`.
- Certifique-se de incluir:
  - O logotipo `logo-semec.svg`.
  - A ilustração `PortoVelhoPintura.svg`.
  - Os links de redes sociais (Instagram e WhatsApp) e o botão de busca **centralizados e com tamanho de destaque**.
  - **Tamanho dos Botões**: Use `h-14 w-14` para os botões e `width="24" height="24"` (ou `26`) para os SVGs internos.
  - **Alinhamento**: Use `justify-center` no container dos ícones e `lg:items-center` na coluna lateral do header.
  - **WhatsApp**: Use o link `https://api.whatsapp.com/send?phone=556999425251`.
  - **Remova** qualquer botão de "Acessar o sistema".
- **Busca Retrátil**:
  - O botão `<button id="search-toggle">` deve estar ao lado do ícone do WhatsApp.
  - O formulário de busca `<form id="site-search-form">` deve iniciar com a classe `hidden` e ter posição `absolute top-[12px] left-1/2 -translate-x-1/2` para aparecer centralizado logo abaixo dos ícones quando ativado.
- O header deve ficar **fora** do container principal do conteúdo.

### 3. Implementação do Footer
- Adicione ao final do `body` (antes dos scripts) o `<footer>` baseado no componente `Footer.tsx`.
- Use os assets: `Logo_Semec_Borda_Branca.png` e `footer-banner.png`.
- **Nota**: A logo `logo-nfse.png` não deve ser incluída no footer padrão.
- **WhatsApp no Footer**: Use o link `https://api.whatsapp.com/send?phone=556999425251`.
- Garanta que os cards de Endereço, Contatos e Redes Sociais sigam o layout responsivo.

### 4. Ajustes de Conteúdo e PDF
- Envolva o conteúdo principal em um container Tailwind: `<div class="container mx-auto px-4 py-8 max-w-4xl" data-search-root>`.
- Estilize o formulário/conteúdo para usar `bg-white`, `rounded-lg`, `shadow-lg` e bordas `pv-gray-200`.
- **Importante para sites com PDF**: Adicione um bloco de cabeçalho interno ao container de impressão com a classe `hidden print-block`, garantindo que o PDF gerado mantenha a identidade oficial mesmo sem o header do site.

### 5. Lógica de Busca e Toggle (JavaScript)
- Implemente no `script.js`:
  - **Toggle da Busca**: Lógica para mostrar/esconder o formulário ao clicar no botão de lupa e fechar ao clicar fora.
  - **Busca Estilo Ctrl+F**:
    - Use `TreeWalker` para percorrer os nós de texto dentro de `[data-search-root]`.
    - Destaque as ocorrências usando a tag `<mark class="site-search-highlight">`.
    - Role a página até o primeiro resultado encontrado.

### 6. Finalização e Independência (Assets)
- **Cópia de Arquivos**: Copie todos os arquivos `.svg` e `.png` das pastas `Nav_Bar_Footer_Semec-main/public` e `Nav_Bar_Footer_Semec-main/src/assets/images` diretamente para a **raiz do projeto**.
- **Caminhos Relativos**: Certifique-se de que todos os caminhos no `index.html` (imagens e favicon) apontem para a raiz (ex: `href="imagem_icon-removebg-preview.png"` em vez de caminhos dentro da pasta de componentes).

---

## Checkpoint de Cores Oficiais
- Azul Escuro: `#1e3a5f` (`pv-blue-900`)
- Azul Médio: `#26476f` (`pv-blue-700`)
- Amarelo: `#f2c94c` (`pv-yellow-500`)
- Verde: `#70b643` (`pv-green-600`)
- Fundo: `#f5f5f5` (`pv-gray-100`)

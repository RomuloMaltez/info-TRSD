// Configuração de busca
const SEARCH_ROOT_SELECTOR = "[data-search-root]";
const HIGHLIGHT_ATTRIBUTE = "data-search-highlight";
const HIGHLIGHT_CLASS_NAME = "site-search-highlight";

// Obter elementos de busca
const getSearchRoots = () => {
    return Array.from(document.querySelectorAll(SEARCH_ROOT_SELECTOR));
};

// Abrir elementos details ancestrais
const openDetailsAncestors = (element) => {
    let parent = element.parentElement;
    while (parent) {
        if (parent instanceof HTMLDetailsElement) {
            parent.open = true;
        }
        parent = parent.parentElement;
    }
};

// Coletar nós de texto
const collectTextNodes = (root) => {
    const nodes = [];
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node.textContent?.trim()) {
                    return NodeFilter.FILTER_REJECT;
                }

                const parent = node.parentElement;
                if (!parent) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (
                    parent.closest(`[${HIGHLIGHT_ATTRIBUTE}]`) ||
                    parent.closest("[data-search-ignore='true']") ||
                    parent.closest("script, style") ||
                    parent.closest("[aria-hidden='true']")
                ) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            },
        }
    );

    let currentNode = walker.nextNode();
    while (currentNode) {
        nodes.push(currentNode);
        currentNode = walker.nextNode();
    }

    return nodes;
};

// Destacar correspondências em um nó
const highlightNodeMatches = (node, normalizedTerm, hits) => {
    if (!node.data || !normalizedTerm) {
        return;
    }

    const termLength = normalizedTerm.length;
    let currentNode = node;
    let remainingText = currentNode.data;
    let matchIndex = remainingText.toLowerCase().indexOf(normalizedTerm);

    while (matchIndex !== -1) {
        const matchNode = currentNode.splitText(matchIndex);
        const afterMatchNode = matchNode.splitText(termLength);
        const highlight = document.createElement("mark");
        highlight.className = HIGHLIGHT_CLASS_NAME;
        highlight.setAttribute(HIGHLIGHT_ATTRIBUTE, "true");
        highlight.setAttribute("tabindex", "-1");
        matchNode.parentNode?.insertBefore(highlight, matchNode);
        highlight.appendChild(matchNode);
        openDetailsAncestors(highlight);
        hits.push(highlight);
        currentNode = afterMatchNode;
        remainingText = currentNode.data ?? "";
        matchIndex = remainingText.toLowerCase().indexOf(normalizedTerm);
    }
};

// Destacar todas as correspondências
const highlightMatches = (term) => {
    const normalizedTerm = term.toLowerCase();
    if (!normalizedTerm) {
        return [];
    }

    const hits = [];
    const roots = getSearchRoots();

    roots.forEach((root) => {
        const textNodes = collectTextNodes(root);
        textNodes.forEach((node) =>
            highlightNodeMatches(node, normalizedTerm, hits)
        );
    });

    return hits;
};

// Limpar destaques
const clearHighlights = () => {
    const highlights = document.querySelectorAll(
        `mark[${HIGHLIGHT_ATTRIBUTE}]`
    );

    highlights.forEach((highlight) => {
        const parent = highlight.parentNode;
        if (!parent) {
            return;
        }

        const textContent = highlight.textContent ?? "";
        parent.replaceChild(document.createTextNode(textContent), highlight);

        if (parent instanceof Element || parent instanceof DocumentFragment) {
            parent.normalize();
        }
    });

    getSearchRoots().forEach((root) => root.normalize());
};

// Toggle da busca
const searchToggle = document.getElementById("search-toggle");
const searchForm = document.getElementById("site-search-form");
const searchInput = document.getElementById("site-search");
const searchFeedback = document.getElementById("search-feedback");

let searchTimeout = null;

// Mostrar/esconder formulário de busca
if (searchToggle && searchForm) {
    searchToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        searchForm.classList.toggle("hidden");
        if (!searchForm.classList.contains("hidden")) {
            searchInput.focus();
        }
    });

    // Fechar ao clicar fora
    document.addEventListener("click", (e) => {
        if (
            !searchForm.contains(e.target) &&
            !searchToggle.contains(e.target) &&
            !searchForm.classList.contains("hidden")
        ) {
            searchForm.classList.add("hidden");
            clearHighlights();
            if (searchFeedback) {
                searchFeedback.textContent = "";
            }
        }
    });
}

// Função de feedback
const showFeedback = (message) => {
    if (searchFeedback) {
        searchFeedback.textContent = message;
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => {
            searchFeedback.textContent = "";
            searchTimeout = null;
        }, 4000);
    }
};

// Manipular busca
if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const trimmedQuery = searchInput.value.trim();

        if (trimmedQuery.length < 3) {
            clearHighlights();
            showFeedback("Por favor, informe ao menos 3 caracteres para buscar.");
            return;
        }

        const hasSearchableContent = getSearchRoots().length > 0;
        if (!hasSearchableContent) {
            showFeedback("Não há conteúdo disponível para pesquisa nesta página.");
            return;
        }

        clearHighlights();

        const hits = highlightMatches(trimmedQuery);

        if (!hits.length) {
            showFeedback("Nenhum resultado encontrado.");
            return;
        }

        const firstHit = hits[0];
        firstHit.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof firstHit.focus === "function") {
            firstHit.focus({ preventScroll: true });
        }

        showFeedback(
            hits.length === 1
                ? "1 resultado encontrado."
                : `${hits.length} resultados encontrados.`
        );
    });
}

// Limpar destaques quando o campo estiver vazio
if (searchInput) {
    searchInput.addEventListener("input", () => {
        if (!searchInput.value.trim()) {
            clearHighlights();
            if (searchFeedback) {
                searchFeedback.textContent = "";
            }
        }
    });
}

// Atualizar ano no footer
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

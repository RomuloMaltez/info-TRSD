"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { Instagram, Search, User2 } from "lucide-react";

import IlustracaoCidade from "@/components/ui/ilustracao-cidade";
import LogoPrefeitura from "@/components/ui/logo-prefeitura";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";

const SEARCH_ROOT_SELECTOR = "[data-search-root]";
const HIGHLIGHT_ATTRIBUTE = "data-search-highlight";
const HIGHLIGHT_CLASS_NAME = "site-search-highlight";

const getSearchRoots = () => {
  if (typeof document === "undefined") {
    return [];
  }

  return Array.from(
    document.querySelectorAll<HTMLElement>(SEARCH_ROOT_SELECTOR),
  );
};

const openDetailsAncestors = (element: HTMLElement) => {
  let parent: HTMLElement | null = element.parentElement;

  while (parent) {
    if (parent instanceof HTMLDetailsElement) {
      parent.open = true;
    }
    parent = parent.parentElement;
  }
};

const collectTextNodes = (root: HTMLElement): Text[] => {
  const nodes: Text[] = [];
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
    },
  );

  let currentNode = walker.nextNode();
  while (currentNode) {
    nodes.push(currentNode as Text);
    currentNode = walker.nextNode();
  }

  return nodes;
};

const highlightNodeMatches = (
  node: Text,
  normalizedTerm: string,
  hits: HTMLElement[],
) => {
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

const highlightMatches = (term: string) => {
  if (typeof document === "undefined") {
    return [];
  }

  const normalizedTerm = term.toLowerCase();
  if (!normalizedTerm) {
    return [];
  }

  const hits: HTMLElement[] = [];
  const roots = getSearchRoots();

  roots.forEach((root) => {
    const textNodes = collectTextNodes(root);
    textNodes.forEach((node) =>
      highlightNodeMatches(node, normalizedTerm, hits),
    );
  });

  return hits;
};

const clearHighlights = () => {
  if (typeof document === "undefined") {
    return;
  }

  const highlights = document.querySelectorAll<HTMLElement>(
    `mark[${HIGHLIGHT_ATTRIBUTE}]`,
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

export default function Header() {
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFeedback = useCallback((message: string) => {
    setFeedback(message);

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback(null);
      feedbackTimeoutRef.current = null;
    }, 4000);
  }, []);

  const handleSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedQuery = query.trim();

      if (trimmedQuery.length < 3) {
        clearHighlights();
        showFeedback("Por favor, informe ao menos 3 caracteres para buscar.");
        return;
      }

      if (typeof document === "undefined") {
        showFeedback("Não foi possível executar a busca.");
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
          : `${hits.length} resultados encontrados.`,
      );
    },
    [query, showFeedback],
  );

  useEffect(() => {
    if (!query.trim()) {
      clearHighlights();
    }
  }, [query]);

  useEffect(() => {
    return () => {
      clearHighlights();
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:items-center lg:gap-8">
          <div className="order-1 flex w-full items-center justify-center self-center lg:order-1 lg:w-auto lg:justify-start lg:self-start lg:pr-4">
            <Link
              href="/"
              aria-label="Ir para a página inicial da SEMEC Porto Velho"
              className="shrink-0"
            >
              <LogoPrefeitura size="hero" />
            </Link>
          </div>

          <div className="order-3 flex w-full items-center lg:order-2">
            <IlustracaoCidade />
          </div>

          <div className="order-2 flex flex-col gap-3 lg:order-3 lg:items-end">
            <div className="flex w-full items-center justify-end gap-3 lg:w-[300px]">
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/semec.pvh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da SEMEC"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-rose-100 bg-rose-50 text-[#E1306C] shadow-sm transition hover:border-rose-200 hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E1306C]"
                >
                  <Instagram size={18} aria-hidden />
                </a>
                <a
                  href="https://wa.me/556999422066"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp da SEMEC"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                >
                  <WhatsappIcon size={18} aria-hidden />
                </a>
              </div>
              <a
                href="https://nfse.portovelho.ro.gov.br/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[color:var(--pv-blue-900)] px-3 text-sm font-semibold text-white transition hover:bg-[color:var(--pv-blue-700)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--pv-blue-700)]"
              >
                <User2 size={18} aria-hidden />
                Acessar o sistema
              </a>
            </div>

            <form
              className="relative flex w-full flex-col gap-2 lg:w-[300px]"
              onSubmit={handleSearch}
              aria-label="Barra de busca do portal"
            >
              <div className="flex w-full items-center rounded-md border border-slate-200 bg-white shadow-sm focus-within:border-[color:var(--pv-blue-900)] focus-within:ring-2 focus-within:ring-[color:var(--pv-blue-900)]/10">
                <label htmlFor="site-search" className="sr-only">
                  O que você procura?
                </label>
                <span className="pl-3 text-slate-500">
                  <Search size={18} aria-hidden />
                </span>
                <input
                  id="site-search"
                  name="search"
                  type="search"
                  minLength={3}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="O que você procura?"
                  className="w-full border-0 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-[color:var(--pv-yellow-500)] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                >
                  Buscar
                </button>
              </div>
              {feedback && (
                <p className="text-xs font-medium text-[color:var(--pv-blue-900)]">
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>
      </header>
      <div
        aria-hidden="true"
        className="h-5 w-full border-b-4 border-[#FFDD00] bg-[#70B643]"
      />
    </>
  );
}

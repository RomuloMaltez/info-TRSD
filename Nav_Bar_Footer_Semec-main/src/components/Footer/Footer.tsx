import Image from "next/image";
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import SemecLogo from "@/assets/images/Logo_Semec_Borda_Branca.png";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";

const contactItems = [
  {
    label: "Gabinete",
    value: "(69) 3901-6281",
    icon: Phone,
  },
  {
    label: "E-mail institucional",
    value: "gab.semec@portovelho.ro.gov.br",
    icon: Mail,
    href: "mailto:gab.semec@portovelho.ro.gov.br",
  },
  {
    label: "Dúvidas Tributárias",
    value: "reformatrib.semec@portovelho.ro.gov.br",
    icon: Mail,
    href: "mailto:reformatrib.semec@portovelho.ro.gov.br",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/semec.pvh/",
    icon: Instagram,
  },
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t-4 border-[#FFDD00] bg-[#70B643]">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8 md:py-10">
        {/* Header do Footer */}
        <div className="mb-6 flex flex-col items-center gap-4 sm:mb-8 sm:flex-row sm:justify-between sm:gap-6">
          {/* Logos */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src={SemecLogo}
              alt="Logo oficial da SEMEC Porto Velho"
              width={100}
              height={100}
              className="h-auto w-[80px] drop-shadow-md sm:w-[90px] md:w-[100px]"
              priority
            />
            <div className="h-12 w-px bg-white/30 sm:h-14" aria-hidden="true" />
            <Image
              src="/logo-nfse.png"
              alt="Logo da Nota Fiscal de Serviço Eletrônica"
              width={100}
              height={100}
              className="h-auto w-[80px] drop-shadow-md sm:w-[90px] md:w-[100px]"
              priority
            />
          </div>

          {/* Texto da Secretaria */}
          <div className="text-center sm:text-right">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/90 sm:text-xs sm:tracking-[0.25em]">
              Secretaria Municipal de Economia
            </p>
            <p className="text-[0.6rem] font-light uppercase tracking-[0.15em] text-white/70 sm:text-[0.7rem] sm:tracking-[0.2em]">
              Porto Velho — Rondônia
            </p>
          </div>
        </div>

        {/* Cards Grid - Responsivo */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Endereço */}
          <article className="flex flex-col rounded-xl border border-white/40 bg-white/95 p-4 text-[color:var(--pv-blue-900)] shadow-lg shadow-black/10 sm:p-5">
            {/* Header do Card */}
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3 sm:gap-3 sm:pb-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--pv-blue-900)] text-white shadow-md sm:h-11 sm:w-11 sm:rounded-xl">
                <MapPin size={18} className="sm:hidden" aria-hidden />
                <MapPin size={20} className="hidden sm:block" aria-hidden />
              </span>
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--pv-blue-700)] sm:text-[0.65rem] sm:tracking-[0.15em]">
                  Endereço
                </p>
                <h3 className="text-sm font-bold leading-tight text-[color:var(--pv-blue-900)] sm:text-base">
                  Sede SEMEC
                </h3>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="mt-3 flex-1 space-y-3 sm:mt-4 sm:space-y-4">
              <address className="not-italic text-[0.8rem] leading-relaxed text-[color:var(--pv-blue-900)]/80 sm:text-sm">
                <span className="font-medium text-[color:var(--pv-blue-900)]">
                  Av. Sete de Setembro, 744
                </span>
                <br />
                Bairro Centro — Porto Velho, RO
              </address>

              <div className="flex items-center gap-2 rounded-lg bg-[color:var(--pv-blue-900)]/5 px-2.5 py-2 sm:px-3">
                <Clock size={13} className="shrink-0 text-[color:var(--pv-blue-900)] sm:hidden" aria-hidden />
                <Clock size={14} className="hidden shrink-0 text-[color:var(--pv-blue-900)] sm:block" aria-hidden />
                <span className="text-[0.7rem] font-semibold text-[color:var(--pv-blue-900)] sm:text-xs">
                  Atendimento: 08h às 14h
                </span>
              </div>
            </div>
          </article>

          {/* Card 2: Contatos */}
          <article className="flex flex-col rounded-xl border border-white/40 bg-white/95 p-4 text-[color:var(--pv-blue-900)] shadow-lg shadow-black/10 sm:p-5">
            {/* Header do Card */}
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3 sm:gap-3 sm:pb-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--pv-blue-900)] text-white shadow-md sm:h-11 sm:w-11 sm:rounded-xl">
                <Phone size={18} className="sm:hidden" aria-hidden />
                <Phone size={20} className="hidden sm:block" aria-hidden />
              </span>
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--pv-blue-700)] sm:text-[0.65rem] sm:tracking-[0.15em]">
                  Contatos
                </p>
                <h3 className="text-sm font-bold leading-tight text-[color:var(--pv-blue-900)] sm:text-base">
                  Fale Conosco
                </h3>
              </div>
            </div>

            {/* Lista de Contatos */}
            <div className="mt-3 flex-1 space-y-2.5 sm:mt-4 sm:space-y-3">
              {contactItems.map(({ label, value, icon: Icon, href }) => (
                <div key={label} className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[color:var(--pv-blue-900)]/10 text-[color:var(--pv-blue-900)] sm:h-6 sm:w-6 sm:rounded-md">
                    <Icon size={10} className="sm:hidden" aria-hidden />
                    <Icon size={12} className="hidden sm:block" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.55rem] font-semibold uppercase tracking-wider text-[color:var(--pv-blue-700)] sm:text-[0.6rem]">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="block break-all text-[0.75rem] font-medium text-[color:var(--pv-blue-900)] underline-offset-2 hover:underline sm:text-sm sm:break-normal sm:truncate"
                        title={value}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-[0.75rem] font-medium text-[color:var(--pv-blue-900)] sm:text-sm">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href="https://wa.me/556999422066"
                target="_blank"
                rel="noopener noreferrer"
                className="group !mt-3 flex items-center gap-2.5 rounded-lg border border-[#70B643] bg-white p-2.5 transition hover:bg-[#70B643]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#70B643] sm:!mt-4 sm:gap-3 sm:p-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#70B643] bg-white text-[#70B643] shadow-sm transition group-hover:scale-105 sm:h-10 sm:w-10">
                  <WhatsappIcon size={16} className="sm:hidden" aria-hidden />
                  <WhatsappIcon size={18} className="hidden sm:block" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.55rem] font-semibold uppercase tracking-wider text-[color:var(--pv-blue-700)] sm:text-[0.6rem]">
                    WhatsApp
                  </p>
                  <p className="text-[0.7rem] font-medium text-[color:var(--pv-blue-900)] sm:text-xs">
                    (69) 9 9942-2066
                  </p>
                </div>
              </a>
            </div>
          </article>

          {/* Card 3: Redes Sociais */}
          <article className="flex flex-col rounded-xl border border-white/40 bg-white/95 p-4 text-[color:var(--pv-blue-900)] shadow-lg shadow-black/10 sm:p-5 md:col-span-2 lg:col-span-1">
            {/* Header do Card */}
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3 sm:gap-3 sm:pb-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--pv-blue-900)] text-white shadow-md sm:h-11 sm:w-11 sm:rounded-xl">
                <Instagram size={18} className="sm:hidden" aria-hidden />
                <Instagram size={20} className="hidden sm:block" aria-hidden />
              </span>
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--pv-blue-700)] sm:text-[0.65rem] sm:tracking-[0.15em]">
                  Redes Sociais
                </p>
                <h3 className="text-sm font-bold leading-tight text-[color:var(--pv-blue-900)] sm:text-base">
                  Siga a SEMEC
                </h3>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="mt-3 flex-1 space-y-3 sm:mt-4 sm:space-y-4">
              <p className="text-[0.8rem] leading-relaxed text-[color:var(--pv-blue-900)]/80 sm:text-sm">
                Acompanhe nossos canais oficiais e fique por dentro das novidades sobre a{" "}
                <strong className="text-[color:var(--pv-blue-900)]">
                  Reforma Tributária do Consumo
                </strong>
                .
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => {
                  const isInstagram = label === "Instagram";
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm transition hover:shadow-md sm:px-4 sm:py-2.5 ${
                        isInstagram
                          ? "border-[#F7A1C4] bg-[#FDE9F1] hover:bg-[#F9C5DA]"
                          : "border-[#70B643] bg-white hover:bg-[#70B643]/10"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded transition group-hover:scale-110 sm:h-8 sm:w-8 sm:rounded-md ${
                          isInstagram
                            ? "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] p-[1px]"
                            : "border-2 border-[#70B643] bg-white"
                        }`}
                      >
                        <span
                          className={`flex h-full w-full items-center justify-center rounded sm:rounded-md ${
                            isInstagram ? "bg-white text-[#C13584]" : "bg-white text-[#70B643]"
                          }`}
                        >
                          <Icon size={14} className="sm:hidden" aria-hidden />
                          <Icon size={16} className="hidden sm:block" aria-hidden />
                        </span>
                      </span>
                      <span className="text-[0.8rem] font-semibold text-[color:var(--pv-blue-900)] sm:text-sm">
                        @semec.pvh
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-white/20 pt-4 text-center sm:mt-8">
          <p className="text-[0.6rem] text-white/60 sm:text-[0.65rem]">
            © {new Date().getFullYear()} Prefeitura Municipal de Porto Velho • Todos os direitos reservados
          </p>
        </div>
      </div>

      {/* Banner decorativo */}
      <div
        aria-hidden="true"
        className="h-7 w-full bg-repeat-x sm:h-9"
        style={{
          backgroundImage: "url('/footer-banner.png')",
          backgroundSize: "328px 48px",
          backgroundPosition: "left center",
        }}
      />
    </footer>
  );
}

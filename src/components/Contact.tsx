"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Contact — Section 07
   Dark bg. Two-col layout: left = details + social icons, right = form.
   GSAP: heading reveal, left details stagger, form fields stagger.
   Framer Motion: input focus glow.
   Form: react-hook-form → Formspree → sonner toast on success/error.
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { SocialIconsRow } from "@/components/SocialIcons";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

/* ── Form field types ──────────────────────────────────────────────────── */
interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/* ── Styled form field ─────────────────────────────────────────────────── */
interface FieldProps {
  label: string;
  name: keyof FormValues;
  type?: string;
  rows?: number;
  focused: string | null;
  setFocused: (v: string | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: string;
}

function Field({ label, name, type = "text", rows, focused, setFocused, register, error }: FieldProps) {
  const isActive = focused === name;
  const hasError = Boolean(error);

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-surface)",
    border: `1px solid ${hasError ? "var(--molten-500)" : isActive ? "var(--steel-400)" : "var(--border-dim)"}`,
    color: "var(--text-white)",
    padding: "0.75rem 1rem",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    outline: "none",
    resize: "none" as const,
    transition: "border-color 0.22s ease",
    boxShadow: isActive ? "0 0 0 3px rgba(232,94,34,0.12)" : "none",
  };

  const fieldProps = register(name, {
    required: true,
    ...(name === "email" && {
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
    }),
  });

  return (
    <div className="contact-field">
      <label
        htmlFor={name}
        className="font-mono text-[0.56rem] tracking-[0.28em] uppercase block mb-2"
        style={{ color: isActive ? "var(--molten-400)" : "var(--text-muted)", transition: "color 0.2s" }}
      >
        {label}
      </label>

      {rows ? (
        <textarea
          id={name}
          rows={rows}
          style={sharedStyle}
          onFocus={() => setFocused(name)}
          {...fieldProps}
          onBlur={(e: React.FocusEvent) => { setFocused(null); fieldProps.onBlur(e); }}
          placeholder=""
        />
      ) : (
        <input
          id={name}
          type={type}
          style={sharedStyle}
          onFocus={() => setFocused(name)}
          {...fieldProps}
          onBlur={(e: React.FocusEvent) => { setFocused(null); fieldProps.onBlur(e); }}
          placeholder=""
        />
      )}
    </div>
  );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Contact() {
  const t = useTranslations("contact");

  const DETAILS = [
    { Icon: Phone, label: t("phone_label"), value: "+998 (55) 900-00-77", href: "tel:+998559000077" },
    { Icon: Mail, label: t("email_label"), value: "jv.steelpipe@gmail.com", href: "mailto:jv.steelpipe@gmail.com" },
    { Icon: MapPin, label: t("address_label"), value: t("address_value"), href: "https://maps.google.com/?q=Akhangaran+Uzbekistan" },
  ];

  const sectionRef      = useRef<HTMLElement>(null);
  const headingLineRef  = useRef<HTMLDivElement>(null);
  const headingLabelRef = useRef<HTMLSpanElement>(null);
  const headingTitleRef = useRef<HTMLHeadingElement>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<FormValues>();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Heading ─────────────────────────────────────────────── */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section.querySelector(".contact-heading"),
            start: "top 85%",
            once: true,
          },
        })
        .fromTo(headingLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.45, ease: "power3.out", transformOrigin: "left center" }
        )
        .fromTo(headingLabelRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          "-=0.1"
        )
        .fromTo(headingTitleRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.65, ease: "power2.out" },
          "-=0.15"
        );

      /* ── Left column details stagger ─────────────────────────── */
      gsap.from(".contact-detail", {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".contact-details-list"),
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".contact-social", {
        opacity: 0,
        y: 12,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".contact-details-list"),
          start: "top 78%",
          once: true,
        },
        delay: 0.4,
      });

      /* ── Right column form stagger ───────────────────────────── */
      gsap.from(".contact-field", {
        x: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".contact-form"),
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".contact-submit", {
        opacity: 0,
        y: 12,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".contact-form"),
          start: "top 72%",
          once: true,
        },
        delay: 0.5,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormValues) => {
    if (!FORMSPREE_ID) {
      toast.error("Form not configured. Please email us directly at jv.steelpipe@gmail.com");
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Message sent! We'll reply within 1 business day.");
        reset();
      } else {
        toast.error("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      toast.error("Network error. Please email us at jv.steelpipe@gmail.com");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-navy)" }}
    >
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--bg-dark)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-white)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
          },
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top molten accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, var(--molten-600) 0%, var(--molten-400) 40%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 xl:px-20 py-20 md:py-24 lg:py-36">

        {/* ── Section heading ──────────────────────────────────── */}
        <header className="contact-heading mb-10 md:mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-mono text-xs select-none"
              style={{ color: "var(--molten-500)" }}
            >
              07
            </span>
            <div
              ref={headingLineRef}
              className="flex-shrink-0 w-[80px] sm:w-[120px]"
              style={{
                height: 2,
                background: "var(--molten-500)",
                transformOrigin: "left center",
              }}
            />
            <span
              ref={headingLabelRef}
              className="font-mono text-xs tracking-[0.28em] uppercase select-none min-w-0 truncate"
              style={{ color: "var(--text-muted)", opacity: 0 }}
            >
              {t("label")}
            </span>
          </div>

          <h2
            ref={headingTitleRef}
            className="font-display font-bold uppercase leading-[0.92] tracking-tight"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
              color: "var(--text-white)",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            {t("heading1")}
            <br />
            <span style={{ color: "var(--molten-500)" }}>{t("heading2_accent")}</span>
          </h2>
        </header>

        {/* ── Two-column layout ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24">

          {/* ── LEFT: details + social ───────────────────────── */}
          <div>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--text-secondary)", maxWidth: "38ch" }}
            >
              {t("intro")}
            </p>

            {/* Contact details */}
            <ul className="contact-details-list space-y-6 mb-10">
              {DETAILS.map(({ Icon, label, value, href }) => (
                <li key={label} className="contact-detail flex items-start gap-4">
                  <span
                    className="flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      width: 36,
                      height: 36,
                      border: "1px solid var(--border-dim)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <Icon size={15} strokeWidth={1.5} style={{ color: "var(--molten-400)" }} />
                  </span>

                  <div>
                    <p
                      className="font-mono text-[0.56rem] tracking-[0.26em] uppercase mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {label}
                    </p>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-primary)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--molten-400)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                    >
                      {value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div
              className="mb-6"
              style={{ height: 1, background: "var(--border-subtle)" }}
            />

            {/* Social icons row */}
            <div className="contact-social">
              <p
                className="font-mono text-[0.56rem] tracking-[0.26em] uppercase mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {t("social_label")}
              </p>
              <SocialIconsRow />
            </div>
          </div>

          {/* ── RIGHT: form ──────────────────────────────────── */}
          <form
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-5">
              <Field
                label={t("field_name")}
                name="name"
                focused={focused}
                setFocused={setFocused}
                register={register}
                error={errors.name?.message}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label={t("field_email")}
                  name="email"
                  type="email"
                  focused={focused}
                  setFocused={setFocused}
                  register={register}
                  error={errors.email?.message}
                />
                <Field
                  label={t("field_phone")}
                  name="phone"
                  type="tel"
                  focused={focused}
                  setFocused={setFocused}
                  register={register}
                />
              </div>
              <Field
                label={t("field_message")}
                name="message"
                rows={5}
                focused={focused}
                setFocused={setFocused}
                register={register}
                error={errors.message?.message}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-submit group w-full mt-6 flex items-center justify-between px-6 py-4 font-mono text-xs tracking-[0.22em] uppercase"
              style={{
                background: isSubmitting ? "var(--molten-700)" : "var(--molten-500)",
                color: "var(--text-white)",
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = "var(--molten-600)";
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = "var(--molten-500)";
              }}
            >
              <span>{t("submit")}</span>
              {isSubmitting ? (
                <Loader2 size={16} strokeWidth={2} className="animate-spin" />
              ) : (
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  style={{ transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)" }}
                  className="group-hover:translate-x-1"
                />
              )}
            </button>

            {/* Small disclaimer */}
            <p
              className="mt-4 font-mono text-[0.52rem] tracking-wider uppercase leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {t("disclaimer")}
            </p>
          </form>

        </div>
      </div>
    </section>
  );
}

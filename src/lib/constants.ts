export const SITE = {
  name: "SPC",
  fullName: "Steel Pipe Company",
  legalName: "ООО «STEEL PIPE COMPANY»",
  tagline: "Совершенство в каждом миллиметре",
  description: "Узбекско-китайское совместное предприятие по производству стальных труб",
  founded: 2018,
  url: "https://steelpipe.uz",
} as const;

export const CONTACT = {
  phone: "+998(55)900-00-77",
  whatsapp: "+998908064448",
  email: "jv.steelpipe@gmail.com",
  emailAlt: "ohangaronsteelpipe@gmail.com",
  telegram: "@DiliSultonov",
  telegramChannel: "@spc_uzbekistan",
  instagram: "@spc_uzbekistan",
  address: {
    ru: "Республика Узбекистан, Ташкентская область, Ахангаранский район, Бирлик МФЙ, СЭЗ «Ангрен», Индустриальная зона-3",
    en: "Republic of Uzbekistan, Tashkent Region, Angren SEZ, Industrial Zone-3",
    uz: "O'zbekiston Respublikasi, Toshkent viloyati, Ohangaron tumani, Birlik MFY, EIZ «Angren», Sanoat zonasi-3",
  },
} as const;

export const STATS = [
  { label: { ru: "Год основания", en: "Founded", uz: "Tashkil etilgan yil" }, value: "2005", suffix: "" },
  { label: { ru: "Площадь завода", en: "Factory Area", uz: "Zavod maydoni" }, value: "50k", suffix: " м²" },
  { label: { ru: "Сотрудников", en: "Employees", uz: "Xodimlar" }, value: "1200", suffix: "" },
  { label: { ru: "Тонн в год", en: "Tons per Year", uz: "Yiliga tonna" }, value: "500k", suffix: "" },
] as const;

export const PARTNERS = [
  "ArcelorMittal KZ",
  "EVRAZ",
  "HUAYE",
  "SAP ERP",
  "MMK",
  "TTZ",
] as const;

export const NAV_ITEMS = [
  { href: "/process", label: { ru: "Процесс", en: "Process", uz: "Jarayon" } },
  { href: "/products", label: { ru: "Продукция", en: "Products", uz: "Mahsulotlar" } },
  { href: "/about", label: { ru: "О компании", en: "About", uz: "Kompaniya haqida" } },
  { href: "/contact", label: { ru: "Контакты", en: "Contact", uz: "Aloqa" } },
] as const;

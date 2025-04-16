import { getLocales } from "expo-localization";

const permittedTags = [
  "es-AR",
  "es-CL",
  "es-CO",
  "es-MX",
  "es-VE",
  "es-UY",
  "es-PE",
  "pt-BR",
] as const;

type LanguageTag = (typeof permittedTags)[number];

export default function getLanguageTag(): LanguageTag {
  const languageTag = getLocales()[0]?.languageTag;
  return permittedTags.includes(languageTag as LanguageTag)
    ? (languageTag as LanguageTag)
    : "pt-BR";
}

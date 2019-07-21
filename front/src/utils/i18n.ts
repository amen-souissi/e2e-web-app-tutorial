import { I18n } from "react-redux-i18n";

import translations from "./translations";

import { DEFAULT_LOCALE } from "../constants";

const myHandleMissingTranslation = function(
  key: string,
  replacements: { count: number }
) {
  // We need to use a function, not a arrow function here to be able to use 'this'.
  let translation = "";
  // @ts-ignore
  const self = this;
  try {
    translation = self._fetchTranslation(
      self._translations,
      `${DEFAULT_LOCALE}.${key}`,
      replacements.count
    ); // eslint-disable-line
  } catch (err) {
    return `Missing translation: ${key}`;
  }
  return self._replace(translation, replacements); // eslint-disable-line
};

// @ts-ignore
I18n.setHandleMissingTranslation(myHandleMissingTranslation);

export const getTranslations = () => {
  return translations;
};

export const getLocale = (sourceLocale: string) => {
  let locale: string;
  if (sourceLocale === "zh" || sourceLocale === "zh-CN") {
    locale = "zh_CN";
  } else {
    locale = sourceLocale.split("-")[0].toLowerCase();
  }
  if (!translations[locale]) {
    locale = DEFAULT_LOCALE;
  }
  return locale;
};

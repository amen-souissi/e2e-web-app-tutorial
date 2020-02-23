import I18n from "react-native-i18n";

export const LOCALES_MAPPING = {
  "fr-FR": "fr"
};

interface ITranslations {
  [locale: string]: any;
}

const Translations: ITranslations = {
  fr: {
    hello: "Bonjour !",
    channels: {
      channels: "Chaînes",
      comment: "Notez quelque chose"
    }
  },
  en: {
    hello: "Hello!",
    channels: {
      channels: "Channels",
      comment: "Send a message"
    }
  }
};

I18n.fallbacks = true;
I18n.translations = Translations;

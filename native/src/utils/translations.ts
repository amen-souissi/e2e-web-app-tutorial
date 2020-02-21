interface ITranslations {
  [locale: string]: any;
}

const Translations: ITranslations = {
  fr: {
    channels: {
      channels: "Chaînes",
      comment: "Notez quelque chose"
    }
  },
  en: {
    channels: {
      channels: "Channels",
      comment: "Send a message"
    }
  }
};

export default Translations;

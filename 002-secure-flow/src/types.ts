export type Languages = "ru" | "gb"
type TranslationEntry = Record<Languages, string>

export type Translation = {
  description: TranslationEntry
  note: TranslationEntry
  activeServers: TranslationEntry
  uptime: TranslationEntry
  speed: TranslationEntry
  chooseType: TranslationEntry
  enterUrl: TranslationEntry
  load: TranslationEntry
  autoDescription: TranslationEntry
  beta: TranslationEntry
  formats: {
    auto: TranslationEntry
    video: TranslationEntry
    audio: TranslationEntry
    document: TranslationEntry
    archive: TranslationEntry

    "4k": TranslationEntry
    "2k": TranslationEntry
    "1080": TranslationEntry
    "720": TranslationEntry
    "480": TranslationEntry

    high: TranslationEntry
    premium: TranslationEntry
    standart: TranslationEntry
    basic: TranslationEntry

    pdf: TranslationEntry
    docx: TranslationEntry
    xlsx: TranslationEntry
    pptx: TranslationEntry
    txt: TranslationEntry

    zip: TranslationEntry
    rar: TranslationEntry
    "7z": TranslationEntry
    "tar.gz": TranslationEntry
  }
  authTitle: TranslationEntry
  authDescription: TranslationEntry
  emailPlaceholder: TranslationEntry
  emailError: TranslationEntry
  authError: TranslationEntry
  check: TranslationEntry
  authButton: TranslationEntry
  emptyUrlError: TranslationEntry
  urlTemplateError: TranslationEntry
  incorrectUrlError: TranslationEntry
  features: {
    speed: {
      header: TranslationEntry
      description: TranslationEntry
    }
    security: {
      header: TranslationEntry
      description: TranslationEntry
    }
    network: {
      header: TranslationEntry
      description: TranslationEntry
    }
  }
}

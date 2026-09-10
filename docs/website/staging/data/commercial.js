/* BB610 WATER staging commercial data
 * Admin-ready shape: version x zone -> combination-specific commercial state.
 * Source checked: current production index.html repository pricing table.
 * No missing price is inferred. Legacy F1-PH/F2-PH values are NOT silently renamed to F1-P/F2-P.
 */
window.BB610_COMMERCIAL = {
  currency: "UAH",
  priceDisplayUnit: "тис. грн",
  hmi: {
    enabled: true,
    label: "Локальна HMI",
    note: "Опційно; current repository source provides no-HMI / with-HMI pairs where mapped."
  },
  zones: [
    { id: "Z4(8)", baseZones: 4, maxZones: 8, label: "Z4(8)", description: "4 базові зони, розширення до 8" },
    { id: "Z8(12)", baseZones: 8, maxZones: 12, label: "Z8(12)", description: "8 базових зон, розширення до 12" },
    { id: "Z12(16)", baseZones: 12, maxZones: 16, label: "Z12(16)", description: "12 базових зон, розширення до 16" }
  ],
  versions: [
    {
      id: "I", family: "IRRIGATION", label: "I",
      description: "Полив без фертигації",
      features: ["полив за об’ємом", "полив за часом", "контроль фактичного результату"]
    },
    {
      id: "F1", family: "F1", label: "F1",
      description: "Полив + 1 канал фертигації",
      features: ["1 канал фертигації", "полив за об’ємом/часом"]
    },
    {
      id: "F1-P", family: "F1", label: "F1-P",
      description: "F1 + керування/корекція pH",
      features: ["1 канал фертигації", "pH management/correction"]
    },
    {
      id: "F1-PE", family: "F1", label: "F1-PE",
      description: "F1 + pH + моніторинг EC",
      features: ["1 канал фертигації", "pH management/correction", "EC monitoring + deviation notification"]
    },
    {
      id: "F2", family: "F2", label: "F2",
      description: "Полив + 2 канали фертигації",
      features: ["2 канали фертигації", "полив за об’ємом/часом"]
    },
    {
      id: "F2-P", family: "F2", label: "F2-P",
      description: "F2 + керування/корекція pH",
      features: ["2 канали фертигації", "pH management/correction"]
    },
    {
      id: "F2-PE", family: "F2", label: "F2-PE",
      description: "F2 + pH + моніторинг EC",
      features: ["2 канали фертигації", "pH management/correction", "EC monitoring + deviation notification"]
    }
  ],
  combinations: {
    "I|Z4(8)":      { noHmi: 209, withHmi: 234, status: "repository-mapped" },
    "I|Z8(12)":     { noHmi: 229, withHmi: 254, status: "repository-mapped" },
    "I|Z12(16)":    { noHmi: 252, withHmi: 277, status: "repository-mapped" },

    "F1|Z4(8)":     { noHmi: 244, withHmi: 269, status: "repository-mapped" },
    "F1|Z8(12)":    { noHmi: 265, withHmi: 290, status: "repository-mapped" },
    "F1|Z12(16)":   { noHmi: 287, withHmi: 312, status: "repository-mapped" },

    "F1-P|Z4(8)":   { noHmi: null, withHmi: null, status: "needs-commercial-confirmation", sourceNote: "Repository has legacy F1-PH row; not auto-renamed." },
    "F1-P|Z8(12)":  { noHmi: null, withHmi: null, status: "needs-commercial-confirmation", sourceNote: "Repository has legacy F1-PH row; not auto-renamed." },
    "F1-P|Z12(16)": { noHmi: null, withHmi: null, status: "needs-commercial-confirmation", sourceNote: "Repository has legacy F1-PH row; not auto-renamed." },

    "F1-PE|Z4(8)":   { noHmi: 337, withHmi: 362, status: "repository-mapped" },
    "F1-PE|Z8(12)":  { noHmi: 357, withHmi: 382, status: "repository-mapped" },
    "F1-PE|Z12(16)": { noHmi: 380, withHmi: 405, status: "repository-mapped" },

    "F2|Z4(8)":     { noHmi: 280, withHmi: 305, status: "repository-mapped" },
    "F2|Z8(12)":    { noHmi: 300, withHmi: 325, status: "repository-mapped" },
    "F2|Z12(16)":   { noHmi: 322, withHmi: 347, status: "repository-mapped" },

    "F2-P|Z4(8)":   { noHmi: null, withHmi: null, status: "needs-commercial-confirmation", sourceNote: "Repository has legacy F2-PH row; not auto-renamed." },
    "F2-P|Z8(12)":  { noHmi: null, withHmi: null, status: "needs-commercial-confirmation", sourceNote: "Repository has legacy F2-PH row; not auto-renamed." },
    "F2-P|Z12(16)": { noHmi: null, withHmi: null, status: "needs-commercial-confirmation", sourceNote: "Repository has legacy F2-PH row; not auto-renamed." },

    "F2-PE|Z4(8)":   { noHmi: 372, withHmi: 397, status: "repository-mapped" },
    "F2-PE|Z8(12)":  { noHmi: 392, withHmi: 417, status: "repository-mapped" },
    "F2-PE|Z12(16)": { noHmi: 415, withHmi: 440, status: "repository-mapped" }
  }
};
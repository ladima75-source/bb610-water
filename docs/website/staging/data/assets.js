/* BB610 WATER staging asset registry.
 * Swap paths here when approved PULS/engineering/product photography changes.
 * Existing files are reused; production assets are not modified.
 */
window.BB610_ASSETS = {
  logo: {
    src: "../../../assets/extracted/02_ae24f7eff9c5.webp",
    alt: "BB610 WATER"
  },
  puls: {
    desktop: {
      src: "../../../assets/extracted/13_b432ba406d4c.webp",
      alt: "Наявний екран BB610 PULS / SCADA з репозиторію",
      status: "existing-repository-asset"
    },
    mobile: {
      src: "../../../assets/extracted/12_09ab0debbc03.webp",
      alt: "Наявний мобільний інтерфейс BB610 з репозиторію",
      status: "existing-repository-asset"
    }
  },
  engineering: {
    CONTROL: {
      src: "../../../assets/extracted/08_a48110ba0ba8.webp",
      alt: "Інженерна візуалізація CONTROL",
      label: "ENGINEERING VISUAL"
    },
    HYDRAULIC: {
      src: "../../../assets/extracted/09_63f4616bc782.webp",
      alt: "Інженерна візуалізація HYDRAULIC",
      label: "ENGINEERING VISUAL"
    },
    ZONE: {
      src: "../../../assets/extracted/10_131ed62b8eb2.webp",
      alt: "Інженерна візуалізація ZONE",
      label: "ENGINEERING VISUAL"
    }
  },
  proofNeeded: {
    targetVsActual: "ASSET/PROOF NEEDED — approved BB610 PULS crop showing target vs actual for one zone/cycle if current repository screenshot is insufficient at review size."
  }
};
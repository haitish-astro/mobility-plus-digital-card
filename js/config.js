/*
  Mobility Plus digital business card configuration.

  Replace every fictional placeholder below with approved public Mobility Plus
  business information before launch. Do not put official company or
  representative details in index.html or app.js.
*/
window.CARD_CONFIG = Object.freeze({
  isPlaceholder: true,
  placeholderNotice:
    "Fictional placeholder information only. Replace all fields in js/config.js before launch.",

  // Replace this section with approved public company information.
  company: {
    name: "Mobility Plus - Norristown, PA",
    tagline: "Digital Business Card",
    description:
      "This fictional card represents a local mobility equipment provider. Replace this copy with approved public Mobility Plus messaging before launch.",
    serviceArea: "Norristown, PA. & nearby communities",
    services: [
      "Mobility scooter consultations",
      "Power chair support",
      "Lift chair guidance",
      "Accessibility equipment recommendations"
    ],
    phoneDisplay: "(215) 907-7587",
    phoneHref: "+12159077587",
    smsHref: "+12159077587",
    email: "hello.placeholder@example.com",
    websiteUrl: "https://www.mobilityplus.com/pennsylvania/norristown/",
    publicCardUrl: "https://haitish-astro.github.io/mobility-plus-digital-card/",
    logo: {
      src: "assets/images/logo-placeholder.svg",
      alt: "Fictional Mobility Plus Demo logo placeholder"
    },
    address: {
      display: "2123 W Main St, Norristown, PA 19403",
      street: "2123 W Main St",
      locality: "Norristown",
      region: "PA",
      postalCode: "19403",
      country: "US",
      mapUrl:
        "google.com/maps?sca_esv=8841194606cfa8ed&output=search&q=mobility+plus+norristown&source=lnms&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8cTs4PJElQ4Z4ROUfAdKhH1s1TzWjRqm_NBkfHz-gLe8PwsNEEDTn6x1hajjzth4V1xRzgnxLeWKOQZnqpZMeTiot3ORrOj6Upv_V9TaAJ7Ck72aAmkHcqXbadfjliNGtlFW3EhP7XgCiXXbf4jyh9WRREVVkzdMzBM_7uX_1xtVa5jpfHvjI1kefHIUXd9W7Pio_Edw&entry=mc&ved=1t:200715&ictx=111"
    }
  },

  // Replace this section with approved public representative information.
  representative: {
    fullName: "Vishal Gandhi",
    firstName: "Vishal",
    lastName: "Gandhi",
    title: "Co-Partner / Lead Tech",
    photo: {
      src: "assets/images/representative-placeholder.svg",
      alt: "Fictional representative photo placeholder"
    }
  },

  // Keep this target aligned with the deployed GitHub Pages URL.
  card: {
    shareTitle: "",
    shareText:
      "Fictional placeholder digital business card. Replace before launch.",
    qrLabel: "Permanent public card link"
  },

  // vCard output is generated only from this configuration.
  vCard: {
    fileName: "mobility-plus-contact.vcf",
    organization: "",
    note:
      "Fictional placeholder contact generated from the static digital business card."
  }
});

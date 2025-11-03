import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: "Home",
          admin: "Admin",
          staff: "Staff",
          developer: "Developer",
          business: "Business",
          createBusiness: "Create Business",
          viewBusiness: "View Business",
          logout: "Logout",
          welcome: "Welcome to the Dashboard",
          submit: "Submit",
          search: "Search",
          businessType: "Business Type",
          businessName: "Business Name",
           "Chat with AI": "Chat with AI",
    "Thinking...": "Thinking...",
    "Type your message...": "Type your message...",
    "Send": "Send",
        },
      },
      te: {
        translation: {
          home: "హోమ్",
          admin: "అడ్మిన్",
          staff: "సిబ్బంది",
          developer: "డెవలపర్",
          business: "వ్యాపారం",
          createBusiness: "వ్యాపారం సృష్టించండి",
          viewBusiness: "వ్యాపారాన్ని చూడండి",
          logout: "లాగ్ అవుట్",
          welcome: "డ్యాష్‌బోర్డ్‌కు స్వాగతం",
          submit: "సమర్పించండి",
          search: "శోధించండి",
          businessType: "వ్యాపార రకం",
          businessName: "వ్యాపార పేరు",
           "Chat with AI": "ఏఐతో చాట్ చేయండి",
    "Thinking...": "ఆలోచిస్తోంది...",
    "Type your message...": "మీ సందేశాన్ని టైప్ చేయండి...",
    "Send": "పంపు",
        },
      },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

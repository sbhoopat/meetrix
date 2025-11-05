import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      // ===================== ENGLISH =====================
      en: {
        translation: {
          // ===== General =====
          dashboard: "Dashboard",
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
          Send: "Send",
          studentPortal: "Student Portal",

          // ===== Student Section =====
          assignments: "Assignments",
          attendance: "Attendance",
          notifications: "Notifications",
          gpa: "GPA",

          // ===== Attendance =====
          attendanceOverview: "Attendance Overview",
          attendancePercentage: "Attendance Percentage",
          applyShortage: "Apply for Attendance Shortage",
          medicalEmergency: "Medical / Emergency",
          lowAttendanceAlert: "Attendance below 75%",

          // ===== Assignments =====
          upcomingAssignments: "Upcoming Assignments",
          deadline: "Deadline",
          subject: "Subject",
          noAssignments: "No assignments due soon.",

          // ===== GPA =====
          currentGPA: "Current GPA",
          semesterGrades: "Semester Grades",
          noGPAData: "No grade data available.",

          // ===== Notifications =====
          notificationCenter: "Notification Center",
          noNotifications: "You're all caught up!",
          markAllRead: "Mark All as Read",

          // ===== Infrastructure CRM =====
          infrastructureCRM: "Infrastructure CRM",
          customerManagement: "Customer Management",
          addLead: "Add New Lead",
          name: "Name",
          contactInfo: "Contact Information",
          requirements: "Requirements",
          budget: "Budget",
          preferredLocation: "Preferred Location",
          leadSource: "Lead Source",
          saveLead: "Save Lead",
          timeline: "Customer Interactions Timeline",
          noLeads: "No leads found.",

          // ===== Sales Pipeline =====
          salesPipeline: "Sales Pipeline",
          prospect: "Prospect",
          qualification: "Qualification",
          proposal: "Proposal",
          negotiation: "Negotiation",
          closure: "Closure",
          won: "Won",
          lost: "Lost",
          dragDropHint: "Drag and drop leads between stages.",

          // ===== Appointments =====
          appointments: "Appointments & Communication",
          addAppointment: "Add Appointment",
          integrationNote: "Integrated with Google Calendar",
          communicationLog: "Communication Log",
          noAppointments: "No appointments scheduled.",
          reminders: "Reminders & Notifications",
          followUps: "Follow-ups",

          // ===== Analytics =====
          analytics: "Analytics & Reports",
          leadsPerStage: "Leads Per Stage",
          conversionRate: "Conversion Rate",
          salesPerformance: "Salesperson Performance",
          monthlyRevenue: "Monthly Revenue",
          targets: "Targets",

          // ===== Objection Handling =====
          aiObjectionHandler: "Objection Handling",
          aiAssistant: "AI Objection Assistant",
          enterCustomerConcern: "Enter Customer Concern",
          suggestedResponse: "AI Suggested Response",
          generateResponse: "Generate AI Response",
          logObjection: "Log Objection",
          viewHistory: "View Objection History",
          sales: "Sales",
          salesDashboard: "Sales Dashboard",
          transportManagement: "Transport Management",
          dashboard: "Dashboard",
          driverManagement: "Driver Management",
          studentTransport: "Student Transport",
          tripRouteManagement: "Trip Route Management",
          parentApp: "Parent App",
          tripTracking: "Trip Tracking",
          safetyAlerts: "Safety Alerts",
          finance: "Finance Dashboard",
        },
      },

      // ===================== TELUGU =====================
      te: {
        translation: {
          // ===== General =====
          dashboard: "డ్యాష్‌బోర్డ్",
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
          Send: "పంపు",
          studentPortal: "విద్యార్థి పోర్టల్",

          // ===== Student Section =====
          assignments: "అసైన్‌మెంట్లు",
          attendance: "హాజరు",
          notifications: "నోటిఫికేషన్లు",
          gpa: "జిపిఎ",

          // ===== Attendance =====
          attendanceOverview: "హాజరు సమీక్ష",
          attendancePercentage: "హాజరు శాతం",
          applyShortage: "హాజరు కొరతకు దరఖాస్తు చేయండి",
          medicalEmergency: "వైద్య / అత్యవసర పరిస్థితి",
          lowAttendanceAlert: "హాజరు 75% కంటే తక్కువగా ఉంది",

          // ===== Assignments =====
          upcomingAssignments: "రాబోయే అసైన్‌మెంట్లు",
          deadline: "గడువు",
          subject: "విషయం",
          noAssignments: "రాబోయే అసైన్‌మెంట్లు లేవు.",

          // ===== GPA =====
          currentGPA: "ప్రస్తుత GPA",
          semesterGrades: "సెమిస్టర్ గ్రేడ్స్",
          noGPAData: "గ్రేడ్ డేటా అందుబాటులో లేదు.",

          // ===== Notifications =====
          notificationCenter: "నోటిఫికేషన్ సెంటర్",
          noNotifications: "మీరు అన్ని అప్డేట్‌లను చూసారు!",
          markAllRead: "అన్నింటినీ చదివినట్లుగా గుర్తించండి",

          // ===== Infrastructure CRM =====
          infrastructureCRM: "ఇన్‌ఫ్రాస్ట్రక్చర్ CRM",
          customerManagement: "కస్టమర్ నిర్వహణ",
          addLead: "క్రొత్త లీడ్ జోడించండి",
          name: "పేరు",
          contactInfo: "సంప్రదింపు సమాచారం",
          requirements: "అవసరాలు",
          budget: "బడ్జెట్",
          preferredLocation: "అభిరుచి ప్రదేశం",
          leadSource: "లీడ్ సోర్స్",
          saveLead: "లీడ్ సేవ్ చేయండి",
          timeline: "కస్టమర్ పరస్పర చర్యల టైమ్‌లైన్",
          noLeads: "లీడ్లు లేవు.",

          // ===== Sales Pipeline =====
          salesPipeline: "సేల్స్ పైప్‌లైన్",
          prospect: "ప్రాస్పెక్ట్",
          qualification: "అర్హత",
          proposal: "ప్రతిపాదన",
          negotiation: "చర్చలు",
          closure: "మూసివేత",
          won: "గెలిచారు",
          lost: "ఓడిపోయారు",
          dragDropHint: "లీడ్లను దశల మధ్య లాగి వదలండి.",

          // ===== Appointments =====
          appointments: "అపాయింట్‌మెంట్లు & కమ్యూనికేషన్",
          addAppointment: "అపాయింట్‌మెంట్ జోడించండి",
          integrationNote: "గూగుల్ క్యాలెండర్‌తో అనుసంధానించబడింది",
          communicationLog: "కమ్యూనికేషన్ లాగ్",
          noAppointments: "ఏ అపాయింట్‌మెంట్లు షెడ్యూల్ చేయబడలేదు.",
          reminders: "రిమైండర్లు & నోటిఫికేషన్లు",
          followUps: "ఫాలో-అప్స్",

          // ===== Analytics =====
          analytics: "విశ్లేషణలు & నివేదికలు",
          leadsPerStage: "ప్రతి దశలో లీడ్లు",
          conversionRate: "మార్పిడి రేటు",
          salesPerformance: "సేల్స్ ప్రతినిధి పనితీరు",
          monthlyRevenue: "నెలవారీ ఆదాయం",
          targets: "లక్ష్యాలు",

          // ===== Objection Handling =====
          aiObjectionHandler: "ఆక్షేపణ నిర్వహణ",
          aiAssistant: "AI సహాయకుడు",
          enterCustomerConcern: "కస్టమర్ ఆందోళనను నమోదు చేయండి",
          suggestedResponse: "AI సూచించిన సమాధానం",
          generateResponse: "AI సమాధానం సృష్టించండి",
          logObjection: "ఆక్షేపణను నమోదు చేయండి",
          viewHistory: "చరిత్రను చూడండి",
          sales: "అమ్మకాలు",
          salesDashboard: "అమ్మకాల డాష్‌బోర్డ్",
          transportManagement: "రవాణా నిర్వహణ",
          dashboard: "డ్యాష్‌బోర్డ్",
          driverManagement: "డ్రైవర్ నిర్వహణ",
          studentTransport: "విద్యార్థుల రవాణా",
          tripRouteManagement: "ప్రయాణ మార్గ నిర్వహణ",
          parentApp: "తల్లిదండ్రుల యాప్",
          tripTracking: "ప్రయాణ ట్రాకింగ్",
          safetyAlerts: "భద్రత హెచ్చరికలు",
          finance: "ఆర్థిక వ్యవహారాల డ్యాష్‌బోర్డ్",
        },
      },
    },

    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;

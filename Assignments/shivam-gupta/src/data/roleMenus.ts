
export const ROLE_NAVS = {
  ADMIN: [
    "Dashboard",
    {
      label: "Institute Registration",
      children: ["Register", "Profile"],
    },
    {
      label:"Verification",
      children:["Application"]
    },
    "Staffing",
    "Academics",
    "Workload",
    "NOC",
    "Assets",
    "Legal Cases",
    "Students",
    "RTI",
    "Grievance",
    "Reports",
    "Settings",
  ],
  INSTITUTE: [
    "Dashboard",
    {
      label: "Institute Registration",
      children: ["Register", "Profile"],
    },
    "Academics",
    "Workload",
    "NOC",
    "Assets",
    "Legal Cases",
    "Students",
    "RTI",
    "Grievance",
    "Settings",
  ],
  JD: [
    "Dashboard",
    {
      label:"Verification",
      children:["Application"]
    },
    "Staffing",
    "Workload",
    "NOC",
    "RTI",
    "Grievance",
    "Reports",
    "Settings",
  ],
  DIRECTOR: [
    "Dashboard",
    {
      label:"Verification",
      children:["Application"]
    },
    "NOC",
    "RTI",
    "Grievance",
    "Reports",
    "Settings",
  ],
  SECRETARY: [
    "Dashboard",
    {
      label:"Verification",
      children:["Application"]
    },
    "NOC",
    "RTI",
    "Grievance",
    "Reports",
    "Settings",
  ],
};

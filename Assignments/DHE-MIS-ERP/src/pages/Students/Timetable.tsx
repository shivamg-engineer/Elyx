import { useState } from "react";
import styles from "./Timetable.module.css";

type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

interface DayInfo {
  day: DayKey;
  date: string;
}


interface ClassInfo {
  title: string;
  code: string;
  type: "Lecture" | "Practical";
  time: string;
  professor: string;
  room: string;
}
type SlotValue = "-" | { subject: string; room: string };

interface TimeSlot {
  time: string;
  Mon: SlotValue;
  Tue: SlotValue;
  Wed: SlotValue;
  Thu: SlotValue;
  Fri: SlotValue;
  Sat: SlotValue;
}

export default function Timetable() {
  const [activeDay, setActiveDay] = useState<DayKey>("Mon");

  const days: DayInfo[] = [
    { day: "Mon", date: "03 Dec" },
    { day: "Tue", date: "04 Dec" },
    { day: "Wed", date: "05 Dec" },
    { day: "Thu", date: "06 Dec" },
    { day: "Fri", date: "07 Dec" },
    { day: "Sat", date: "08 Dec" },
  ];

  const weeklyClasses: Record<DayKey, ClassInfo[]> = {
    Mon: [
      {
        title: "Computer Networks",
        code: "CS304",
        type: "Practical",
        time: "9:00 AM - 10:00 AM",
        professor: "Prof. Singh",
        room: "Lab 3",
      },
      {
        title: "Operating Systems",
        code: "CS303",
        type: "Lecture",
        time: "10:00 AM - 11:00 AM",
        professor: "Dr. Kumar",
        room: "Room 102",
      },
      {
        title: "Operating Systems",
        code: "CS303",
        type: "Lecture",
        time: "12:15 PM - 1:15 PM",
        professor: "Dr. Kumar",
        room: "Room 103",
      },
      {
        title: "Operating Systems",
        code: "CS303",
        type: "Lecture",
        time: "2:00 PM - 3:00 PM",
        professor: "Dr. Kumar",
        room: "Room 101",
      },
    ],
    Tue: [
      {
        title: "Data Structures",
        code: "CS205",
        type: "Lecture",
        time: "9:00 AM - 10:00 AM",
        professor: "Dr. Patel",
        room: "Room 201",
      },
      {
        title: "Operating Systems Lab",
        code: "CS303",
        type: "Practical",
        time: "11:00 AM - 1:00 PM",
        professor: "Dr. Kumar",
        room: "Lab 2",
      },
    ],
    Wed: [
      {
        title: "Computer Networks",
        code: "CS304",
        type: "Lecture",
        time: "9:00 AM - 10:00 AM",
        professor: "Prof. Singh",
        room: "Room 110",
      },
      {
        title: "DBMS",
        code: "CS301",
        type: "Lecture",
        time: "11:00 AM - 12:00 PM",
        professor: "Dr. Mehta",
        room: "Room 209",
      },
      {
        title: "DBMS Lab",
        code: "CS301",
        type: "Practical",
        time: "2:00 PM - 4:00 PM",
        professor: "Dr. Mehta",
        room: "Lab 4",
      },
    ],
    Thu: [], // no classes
    Fri: [
      {
        title: "Theory of Computation",
        code: "CS402",
        type: "Lecture",
        time: "9:00 AM - 10:00 AM",
        professor: "Dr. Sharma",
        room: "Room 105",
      },
    ],
    Sat: [
      {
        title: "Seminar",
        code: "CS499",
        type: "Lecture",
        time: "10:00 AM - 12:00 PM",
        professor: "Guest Faculty",
        room: "Auditorium",
      },
    ],
  };

  const activeDayInfo = days.find((d) => d.day === activeDay);

  const timetable: TimeSlot[] = [
    {
      time: "09:00-10:00",
      Mon: { subject: "Computer Networks", room: "Lab 3" },
      Tue: { subject: "Database Management", room: "Room 107" },
      Wed: { subject: "Database Management", room: "Lab 1" },
      Thu: { subject: "Computer Networks", room: "Lab 3" },
      Fri: { subject: "Data Structures", room: "Room 105" },
      Sat: { subject: "Database Management", room: "Lab 3" },
    },
    {
      time: "10:00-11:00",
      Mon: { subject: "Operating Systems", room: "Room 102" },
      Tue: "-",
      Wed: { subject: "Software Engineering", room: "Room 105" },
      Thu: { subject: "Operating Systems", room: "Room 105" },
      Fri: { subject: "Database Management", room: "Lab 1" },
      Sat: { subject: "Computer Networks", room: "Room 107" },
    },
    {
      time: "11:15-12:15",
      Mon: "-",
      Tue: { subject: "Data Structures", room: "Room 107" },
      Wed: { subject: "Computer Networks", room: "Room 107" },
      Thu: "-",
      Fri: { subject: "Software Engineering", room: "Room 105" },
      Sat: { subject: "Computer Networks", room: "Room 101" },
    },
    {
      time: "12:15-13:15",
      Mon: { subject: "Operating Systems", room: "Room 103" },
      Tue: { subject: "Operating Systems", room: "Room 109" },
      Wed: { subject: "Computer Networks", room: "Room 101" },
      Thu: { subject: "Operating Systems", room: "Lab 2" },
      Fri: { subject: "Operating Systems", room: "Room 109" },
      Sat: "-",
    },
    {
      time: "14:00-15:00",
      Mon: { subject: "Operating Systems", room: "Room 101" },
      Tue: "-",
      Wed: { subject: "Software Engineering", room: "Room 103" },
      Thu: "-",
      Fri: "-",
      Sat: { subject: "Data Structures", room: "Room 106" },
    },
    {
      time: "15:00-16:00",
      Mon: "-",
      Tue: { subject: "Software Engineering", room: "Room 103" },
      Wed: "-",
      Thu: { subject: "Computer Networks", room: "Room 104" },
      Fri: { subject: "Computer Networks", room: "Lab 3" },
      Sat: "-",
    },
  ];



  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Class Timetable</h2>
      <p className={styles.subtitle}>
        B.Sc. Computer Science - Year 2, Semester 3
      </p>

      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Weekly Schedule</h3>
        <p className={styles.sectionSub}>
          View your class schedule for the week
        </p>

        {/* Week days */}
        <div className={styles.weekStrip}>
          {days.map((d) => (
            <div
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`${styles.dayBox} ${
                activeDay === d.day ? styles.activeDay : ""
              }`}
            >
              <span className={styles.dayName}>{d.day}</span>
              <span className={styles.dayDate}>{d.date}</span>
            </div>
          ))}
        </div>

        {/* Date Label */}
        <div className={styles.dateRow}>
          <span className={styles.dateLabel}>
            📅 {activeDay}, {activeDayInfo ? activeDayInfo.date : ""}
          </span>
          <span className={styles.classCount}>
            {weeklyClasses[activeDay].length} classes
          </span>
        </div>

        {/* Class Cards */}
        {weeklyClasses[activeDay].map((item, i) => (
          <div key={i} className={styles.classCard}>
            <div className={styles.cardHeader}>
              <span className={styles.classTitle}>{item.title}</span>
              <span
                className={`${styles.typeBadge} ${
                  item.type === "Lecture"
                    ? styles.lectureBadge
                    : styles.practicalBadge
                }`}
              >
                {item.type}
              </span>
            </div>

            <p className={styles.code}>{item.code}</p>

            <div className={styles.detailsRow}>
              <span className={styles.iconText}>⏱ {item.time}</span>
              <span className={styles.iconText}>👤 {item.professor}</span>
              <span className={styles.iconText}>📍 {item.room}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.card}>
        <h3 className={styles.title}>Complete Week Schedule</h3>
        <p className={styles.subtitle}>Overview of all classes for the week</p>

        <div className={styles.table}>
          <div className={`${styles.row} ${styles.headerRow}`}>
            <div className={styles.timeCol}>Time</div>
            {days.map((d) => (
              <div key={d.day} className={styles.dayCol}>
                {d.day}
              </div>
            ))}
          </div>

          {timetable.map((slot, idx) => (
            <div key={idx} className={styles.row}>
              <div className={styles.timeCol}>{slot.time}</div>

              {days.map((d) => {
                const entry = slot[d.day as DayKey];
                return (
                  <div key={d.day} className={styles.dayCol}>
                    {entry === "-" ? (
                      <span className={styles.empty}>-</span>
                    ) : (
                      <>
                        <div className={styles.subject}>{entry.subject}</div>
                        <div className={styles.room}>{entry.room}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

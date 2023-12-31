import React, { Fragment, forwardRef, useMemo, useRef, useState } from "react";
import { Course } from "../interface";
import { useLoaderData } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import clsx from "clsx";

const DAYS = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
] as const;
type Day = (typeof DAYS)[number];
type CourseSchedulePointer = [Course, number];

interface DayScheduleProps {
  day: Day;
  courses: CourseSchedulePointer[];
}

function DaySchedule({ day, courses }: DayScheduleProps) {
  return (
    <div className="p-4 rounded-md bg-gray-200 flex flex-col gap-2">
      <strong>{day}</strong>

      {courses.map((course) => (
        <div
          className="flex flex-row gap-4 items-center border rounded-md border-black w-full p-2"
          key={`${course[0].class_name}-${day}`}
        >
          <div className="flex flex-col gap-1">
            <strong className="text-sm">{course[0].name}</strong>
            <span className="text-xs">
              {course[0].schedule[course[1]]} (Ruang{" "}
              {course[0].rooms[course[1]]})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function toMinutes(time: string) {
  const [hour, minute] = time.split(".").map(Number);
  return (hour - 6) * 60 + minute;
}

function DayTableSchedule({
  course,
  day,
}: {
  course: CourseSchedulePointer;
  day: Day;
}) {
  const columnStart = DAYS.indexOf(day) + 2;
  const dt = course[0].schedule[course[1]];
  const [startTime, endTime] = dt.split(", ")[1].split("-");
  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);

  return (
    <div
      className="p-2 bg-primary-0 rounded-md flex flex-col"
      style={{
        gridColumnStart: columnStart,
        gridColumnEnd: columnStart + 1,
        gridRowStart: startMinutes,
        gridRowEnd: endMinutes,
      }}
    >
      <strong>{course[0].class_name}</strong>
      <span className="text-xs">
        {course[0].schedule[course[1]]} (Ruang {course[0].rooms[course[1]]})
      </span>
    </div>
  );
}

const TableSchedule = forwardRef(function TableSchedule(
  {
    courses,
  }: {
    courses: Map<Day, CourseSchedulePointer[]>;
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div className="w-full overflow-x-scroll">
      <div
        className="grid grid-cols-[auto_repeat(6,_calc(15%))] grid-rows-[repeat(990,_1px)] w-[120rem] gap-x-2"
        ref={ref}
      >
        <div className="bg-primary-0 row-start-1 row-end-[60] flex items-center justify-center font-bold">
          Jam
        </div>
        <div className="bg-primary-0 row-start-1 row-end-[60] flex items-center justify-center font-bold">
          Senin
        </div>
        <div className="bg-primary-0 row-start-1 row-end-[60] flex items-center justify-center font-bold">
          Selasa
        </div>
        <div className="bg-primary-0 row-start-1 row-end-[60] flex items-center justify-center font-bold">
          Rabu
        </div>
        <div className="bg-primary-0 row-start-1 row-end-[60] flex items-center justify-center font-bold">
          Kamis
        </div>
        <div className="bg-primary-0 row-start-1 row-end-[60] flex items-center justify-center font-bold">
          Jumat
        </div>
        <div className="bg-primary-0 row-start-1 row-end-[60] flex items-center justify-center font-bold">
          Sabtu
        </div>

        {Array.from({ length: 15 }, (_, i) => i + 7).map((t) => (
          <Fragment key={t}>
            <div
              className="flex items-center justify-center font-bold"
              style={{
                gridRowStart: (t - 7 + 1) * 60 + 31,
                gridRowEnd: (t - 7 + 1 + 1) * 60 + 30,
                gridColumnStart: 1,
                gridColumnEnd: 1,
              }}
            >
              {t}.00
            </div>
            <div
              className="border-b border-gray-400"
              style={{
                gridRowStart: (t - 7 + 1) * 60,
                gridRowEnd: (t - 7 + 1 + 1) * 60 + 1,
                gridColumnStart: 2,
                gridColumnEnd: 8,
              }}
            ></div>
          </Fragment>
        ))}

        {Array.from(courses).map(([day, coursesDay]) =>
          coursesDay.map((course) => (
            <DayTableSchedule course={course} day={day} />
          ))
        )}
      </div>
    </div>
  );
});

export default function SchedulePage() {
  const [currentTab, setCurrentTab] = useState<"table" | "list">("list");
  const tableRef = useRef<HTMLDivElement>(null);
  const courses = useLoaderData() as Course[];
  const scheduleByDay = useMemo(() => {
    const schedule = new Map<Day, CourseSchedulePointer[]>();

    for (const course of courses) {
      for (let i = 0; i < course.schedule.length; i++) {
        const sched = course.schedule[i];
        const [day, time] = sched.split(", ");

        let existingSchedule = schedule.get(day as Day);
        if (!existingSchedule) {
          existingSchedule = [];
        }
        existingSchedule.push([course, i]);
        schedule.set(day as Day, existingSchedule);
      }
    }

    return schedule;
  }, [courses]);

  async function onSave() {
    const curr = currentTab;
    setCurrentTab("table");
    await new Promise((r) => setTimeout(r, 100));

    const jpegImage = await htmlToImage.toJpeg(tableRef.current!, {
      backgroundColor: "white",
    });
    const link = document.createElement("a");
    link.download = "schedule.jpeg";
    link.href = jpegImage;
    link.click();
    setCurrentTab(curr);
  }

  return (
    <div className="bg-primary-0">
      <h1 className="font-bold p-4 text-xl">Jadwal</h1>
      <div className="flex flex-col gap-4 bg-gray-100 rounded-t-3xl p-4">
        <button
          className="font-semibold px-4 py-2 bg-primary-0 rounded-md"
          onClick={() => onSave()}
        >
          Save Schedule
        </button>

        <div className="font-semibold border-primary-0 border-2 rounded-md flex flex-row">
          <button
            className={clsx(
              "w-full py-2 pl-4",
              currentTab === "table" && "bg-primary-0"
            )}
            onClick={() => setCurrentTab("table")}
          >
            Table view
          </button>
          <button
            className={clsx(
              "w-full py-2 pr-4",
              currentTab === "list" && "bg-primary-0"
            )}
            onClick={() => setCurrentTab("list")}
          >
            List view
          </button>
        </div>

        {currentTab == "table" ? (
          <TableSchedule courses={scheduleByDay} ref={tableRef} />
        ) : (
          <>
            <DaySchedule
              day="Senin"
              courses={scheduleByDay.get("Senin") ?? []}
            />
            <DaySchedule
              day="Selasa"
              courses={scheduleByDay.get("Selasa") ?? []}
            />
            <DaySchedule day="Rabu" courses={scheduleByDay.get("Rabu") ?? []} />
            <DaySchedule
              day="Kamis"
              courses={scheduleByDay.get("Kamis") ?? []}
            />
            <DaySchedule
              day="Jumat"
              courses={scheduleByDay.get("Jumat") ?? []}
            />
          </>
        )}
      </div>
    </div>
  );
}

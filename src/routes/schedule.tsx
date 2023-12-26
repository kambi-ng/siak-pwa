import React, { useMemo } from "react";
import { Course } from "../interface";
import { useLoaderData } from "react-router-dom";

type Day = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
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

export default function SchedulePage() {
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

  return (
    <div className="bg-primary-0">
      <h1 className="font-bold p-4 text-xl">Jadwal</h1>
      <div className="flex flex-col gap-4 bg-gray-100 rounded-t-3xl p-4">
        <DaySchedule day="Senin" courses={scheduleByDay.get("Senin") ?? []} />
        <DaySchedule day="Selasa" courses={scheduleByDay.get("Selasa") ?? []} />
        <DaySchedule day="Rabu" courses={scheduleByDay.get("Rabu") ?? []} />
        <DaySchedule day="Kamis" courses={scheduleByDay.get("Kamis") ?? []} />
        <DaySchedule day="Jumat" courses={scheduleByDay.get("Jumat") ?? []} />
      </div>
    </div>
  );
}

import { SemesterHistory, UserSummary } from "../interface";
import { useLoaderData } from "react-router-dom";
import IPGraph from "../components/ScorePage/IPGraph";
import SemesterBox from "../components/ScorePage/SemesterBox";
import CaptionBox from "../components/general/CaptionBox";

export default function Score() {
  const { history, summary } = useLoaderData() as {
    summary: UserSummary;
    history: SemesterHistory[];
  };

  const cleanedSemesters = summary.terms.filter((term) => term.data !== null);
  const lastSemester = summary.terms.find(
    (term) => term.data?.total_grade_point_average
  );

  return (
    <div className="bg-primary-0">
      <h1 className="font-bold p-4 text-xl">Nilai</h1>
      <div className="flex flex-col gap-4 bg-gray-100 rounded-t-3xl p-4">
        <h2 className="font-bold text-lg ">Graf IPK</h2>
        <div className="aspect-[16/9]">
          <IPGraph summary={summary} />
        </div>

        <div className="flex flex-row gap-2">
          <CaptionBox
            content={summary.student.gpa.toPrecision(3) ?? "0.00"}
            label="IPK"
          />
          <CaptionBox
            content={`${lastSemester?.period ?? "??/??"} - ${
              lastSemester?.term ?? "?"
            }`}
            label="Tahun Ajaran"
          />
        </div>

        {history.map((sem, i) => (
          <SemesterBox
            sem={sem}
            key={sem.period + sem.semester}
            term={cleanedSemesters[cleanedSemesters.length - 1 - i]}
          />
        ))}
      </div>
    </div>
  );
}

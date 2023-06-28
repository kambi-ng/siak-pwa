import { Link } from "react-router-dom";
import { SemesterHistory, Term } from "../../interface";

export default function SemesterBox({
  sem,
  term,
}: {
  sem: SemesterHistory;
  term: Term;
}) {
  return (
    <div className="p-4 rounded-md bg-gray-200 flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <strong>
          {sem.period} - Semester {sem.semester}
        </strong>
        <p>IPS: {term.data?.grade_point_average.toPrecision(3)}</p>
      </div>

      {sem.scores.map((score) => (
        <Link
          to={`/score/${score.class_id}`}
          className="flex flex-row gap-4 items-center border rounded-md border-black w-full"
        >
          <div className="min-w-[4rem] min-h-[4rem] text-center font-bold text-lg bg-gray-400 rounded-tl-md rounded-bl-md items-center justify-center flex flex-col flex-none">
            <span>{score.final_index}</span>
            <span className="text-xs">{score.final_score}</span>
          </div>

          <div className="flex flex-col gap-1">
            <strong className="text-sm">{score.name}</strong>
            <span className="text-xs">
              {score.class} - {score.credits} SKS - {score.code}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

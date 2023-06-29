import { useLoaderData } from "react-router-dom";
import { UserSummary } from "../interface";
import CaptionBox from "../components/general/CaptionBox";
import { usePhoto } from "../components/usePhoto";

export default function Profile() {
  const profile = useLoaderData() as UserSummary;
  const pfpRef = usePhoto();

  return (
    <div className="flex flex-col items-center justify-center gap-1 h-[100%] p-4">
      <img ref={pfpRef} className="w-48 h-48 rounded-full" />
      <strong>{profile.student.name}</strong>
      <p>{profile.student.npm}</p>
      <p>{profile.student.major}</p>

      <hr className="h-1 border-t border-black w-full my-4" />

      <div className="grid grid-cols-2 gap-2 w-full">
        <CaptionBox content={profile.student.status} label="Status Akademis" />
        <CaptionBox
          content={profile.student.year.toString()}
          label="Angkatan"
        />
        <CaptionBox
          content={profile.student.gpa.toFixed(2).toString()}
          label="IPK"
        />
        <CaptionBox
          content={profile.student.grade_points.toFixed(2).toString()}
          label="Total Mutu"
        />
        <CaptionBox
          content={profile.student.credits_passed.toString()}
          label="SKS Lulus"
        />
        <CaptionBox
          content={profile.student.credits_earned.toString()}
          label="SKS Diperoleh"
        />
      </div>
    </div>
  );
}

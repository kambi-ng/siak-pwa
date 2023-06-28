import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { UserSummary } from "../../interface";

export default function IPGraph({ summary }: { summary: UserSummary }) {
  const data = summary.terms
    .slice()
    .reverse()
    .filter((term) => term.data !== null)
    .map((term) => ({
      name: term.period + "-" + term.term,
      gp: term.data?.grade_point_average,
      gpa: term.data?.total_passed_grade_point_average,
    }));

  return (
    <ResponsiveContainer aspect={16 / 9}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="text-xs" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="gp" stroke="#8884d8" />
        <Line type="monotone" dataKey="gpa" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

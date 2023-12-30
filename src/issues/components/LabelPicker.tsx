import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/github.api";
import { Label } from "../interfaces/label";
const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>("/labels");
  return data;
};
export const LabelPicker = () => {
  const labelsQuery = useQuery(["todos"], getLabels, {
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <span className="badge rounded-pill m-1 label-picker" style={{ border: `1px solid #ffccd3`, color: "#ffccd3" }}>
        Primary
      </span>
    </div>
  );
};

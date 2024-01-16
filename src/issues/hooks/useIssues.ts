import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/github.api";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers/sleep";

interface UseIssuesProps {
  state?: State;
  labels: string[];
}
const getIssues = async ({ state, labels }: UseIssuesProps): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (state) params.append("state", state);
  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  console.log({ params });
  return data;
};

export const useIssues = ({ state, labels }: UseIssuesProps) => {
  const issuesQuery = useQuery(["issues", { state, labels }], () => getIssues({ state, labels }));

  return { issuesQuery };
};

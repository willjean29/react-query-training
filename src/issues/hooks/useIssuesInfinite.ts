import { useInfiniteQuery } from "@tanstack/react-query";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers";
import { githubApi } from "../../api/github.api";

interface UseIssuesProps {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | UseIssuesProps)[];
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issue[]> => {
  const [_, __, props] = queryKey;
  const { state, labels, page = pageParam } = props as UseIssuesProps;
  await sleep(2);
  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }
  params.append("page", page.toString());
  params.append("per_page", "5");
  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: UseIssuesProps) => {
  const issuesQuery = useInfiniteQuery(["issues", "infinite", { state, labels }], (data) => getIssues(data), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;
      return pages.length + 1;
    },
  });
  return { issuesQuery };
};

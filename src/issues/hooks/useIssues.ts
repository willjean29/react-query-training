import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/github.api";
import { Issue, State } from "../interfaces";
import { sleep } from "../../helpers/sleep";
import { useEffect, useState } from "react";

interface UseIssuesProps {
  state?: State;
  labels: string[];
  page?: number;
}
const getIssues = async ({ state, labels, page = 1 }: UseIssuesProps): Promise<Issue[]> => {
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

export const useIssues = ({ state, labels }: UseIssuesProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const issuesQuery = useQuery(["issues", { state, labels, page }], () => getIssues({ state, labels, page }), { refetchOnWindowFocus: false });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? "Loading" : page,
    nextPage,
    prevPage,
  };
};

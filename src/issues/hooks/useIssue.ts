import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers/sleep";
import { Issue } from "../interfaces";

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);

  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);

  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () => getIssueInfo(issueNumber));

  const commentsQuery = useQuery(["issue", issueNumber, "comments"], () => getIssueComments(issueNumber), {
    enabled: !!issueQuery.data,
  });

  return { issueQuery, commentsQuery };
};

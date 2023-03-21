import type { NextPage } from 'next';
import useSWR from 'swr';

type RepositoryProps = {
  id: number
  name: string
  full_name: string,
  description: string
  stargazers_count: number
} & Record<string, unknown>

const Posts = () => {
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const { data, error } = useSWR('https://api.github.com/orgs/rails/repos', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  
  return (
    <>
      { data.map((repo: RepositoryProps) => {
        return (
          <p key={repo.id}>{repo.name} / {repo.description}</p>
        );
      })}
    </>
  );
};

const FetchPage: NextPage = () => {
  return (
    <>
      <Posts></Posts>
    </>
  );
};

export default FetchPage;

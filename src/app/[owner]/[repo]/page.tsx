import { notFound } from "next/navigation";
import { getRepository } from "@/bff/client/repositories/getRepository";
import { Repository } from "@/components/ui/organisms/Repository";

type Props = {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
};

export default async function RepositoryPage({ params }: Props) {
  const { owner, repo } = await params;

  const result = await getRepository(owner, repo);

  if (result.error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{result.error}</p>
      </div>
    );
  }

  if (!result.data) {
    notFound();
  }

  return <Repository repository={result.data} />;
}

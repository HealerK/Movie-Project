import Movie from "@/components/MoviePage";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  return <Movie params={{ id }} />;
}

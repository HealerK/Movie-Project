import Movie from "@/components/MoviePage";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  return <Movie params={params} />;
}

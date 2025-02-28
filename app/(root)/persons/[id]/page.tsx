import React from "react";
import PersonDetail from "@/components/PersonDetail";

interface PersonDetailProps {
  params: { id: number };
}

const page = ({ params }: PersonDetailProps) => {
  return (
    <>
      <PersonDetail params={params} />
    </>
  );
};

export default page;

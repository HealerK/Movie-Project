import React from "react";
import PersonDetail from "@/components/PersonDetail";

const page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;
  return (
    <>
      <PersonDetail params={{ id }} />
    </>
  );
};

export default page;

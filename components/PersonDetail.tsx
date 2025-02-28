import axios from "axios";
import React from "react";
import Image from "next/image";

interface PersonDetails {
  id: number;
  name: string;
  profile_path: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  known_for_department: string;
  gender: number;
  popularity: number;
}

const token = process.env.TMDB_TOKEN;

async function fetchPersonDetails(id: number): Promise<PersonDetails> {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?append_to_response=string`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching person details:", error);
    throw error;
  }
}

interface PersonDetailProps {
  params: {
    id: number;
  };
}

const PersonDetail = async ({ params }: PersonDetailProps) => {
  const { id: personId } = await params;
  const person = await fetchPersonDetails(personId);
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const getGender = (genderCode: number) => {
    switch (genderCode) {
      case 1:
        return "Female";
      case 2:
        return "Male";
      default:
        return "Not specified";
    }
  };
  const cover = "https://image.tmdb.org/t/p/w1280";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/3 flex-shrink-0">
          {person.profile_path ? (
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden">
              <Image
                src={cover + person.profile_path}
                alt={person.name}
                height={500}
                width={768}
              />
            </div>
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        {/* Person details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{person.name}</h1>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="font-medium">Personal Info</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Known For : </span>
                  {person.known_for_department}
                </p>
                <p>
                  <span className="font-medium">Gender : </span>
                  {getGender(person.gender)}
                </p>
                <p>
                  <span className="font-medium">Birthday : </span>
                  {formatDate(person.birthday)}
                </p>
                <p>
                  <span className="font-medium">Place of Birth : </span>
                  {person.place_of_birth || "Unknown"}
                </p>
                <p>
                  <span className="font-medium">Popularity : </span>
                  {person.popularity.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Biography */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Biography</h3>
          {person.biography ? (
            <p className="text-gray-700 whitespace-pre-line text-justify">
              {person.biography}
            </p>
          ) : (
            <p className="text-gray-700">No biography available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;

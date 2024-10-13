import { FaLinkedin } from "react-icons/fa";

interface TeamMemberCardProps {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
}

export default function TeamMemberCard({
  name,
  role,
  photo,
  linkedin,
}: TeamMemberCardProps) {
  return (
    <div className="mb-4 flex items-center justify-evenly gap-2">
      <img
        src={photo}
        alt={name}
        className="mr-2 size-11 rounded-full object-cover sm:mr-6"
      />
      <div className="w-1/2 text-[15px] font-bold leading-4">
        <p>{name}</p>
        <p>{role}</p>
      </div>
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="flex-1 text-xl text-[#0A66C2]" />
      </a>
    </div>
  );
}

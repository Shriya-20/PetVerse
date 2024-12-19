import Image from "next/image";

export default function ProfileIcon({
  profile_pic,
  height = "h-12",
  width = "w-12",
  custom_style,
}) {
  return (
    <>
      <Image
        src={profile_pic}
        alt="avatar"
        className={`relative inline-block ${custom_style} ${height} ${width} !rounded-full`}
      />
    </>
  );
}

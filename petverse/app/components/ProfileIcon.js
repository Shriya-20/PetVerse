import Image from "next/image";

export default function ProfileIcon(props, height = "h-12", width = "w-12") {
  return (
    <>
      <Image
        src={props.profile_pic}
        alt="avatar"
        className={`relative inline-block ${height} ${width} !rounded-full`}
      />
    </>
  );
}

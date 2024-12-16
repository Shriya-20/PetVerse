import Image from "next/image";

export default function ProfileIcon(props) {
  return (
    <>
      <Image
        src={props.profile_pic}
        alt="avatar"
        className="relative inline-block h-12 w-12 !rounded-full"
      />
    </>
  );
}

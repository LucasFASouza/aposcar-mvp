import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div>
      <AiOutlineLoading size={64} color={"yellow"} className={"animate-spin"} />
    </div>
  );
}

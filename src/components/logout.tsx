import { useSession, signOut } from "next-auth/react";
import Image from "next/future/image";

export const Logout = () => {
  const { data } = useSession();

  const handleLogout = () =>
    signOut({
      callbackUrl: "/",
    });

  if (!data?.user) return null;

  return (
    <div className="absolute top-8 right-8 flex items-center space-x-4">
      <div>
        <p className="text-sm uppercase tracking-tight text-neutral-500">
          Logged in as:{" "}
        </p>
        <p className="font-medium text-neutral-400">{data.user?.name}</p>
      </div>
      {data.user?.image && (
        <Image
          src={data.user.image}
          width={75}
          height={75}
          alt={`Profile image of ${data.user.name}`}
        />
      )}
      <button
        onClick={handleLogout}
        className="relative z-10 rounded-lg border border-neutral-400 p-2 text-sm text-white transition-colors hover:bg-neutral-200 hover:text-neutral-800 "
      >
        Leave
      </button>
    </div>
  );
};

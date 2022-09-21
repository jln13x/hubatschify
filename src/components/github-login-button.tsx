import { IoLogoGithub } from "react-icons/io5/index";
import { signIn } from "next-auth/react";
import clsx from "clsx";

interface Props {
  className?: string;
}
export const GitHubLoginButton = ({ className }: Props) => {
  return (
    <button
      onClick={() => signIn("github")}
      className={clsx(
        "flex items-center rounded-lg border-2 border-white from-violet-700 to-amber-700 px-2 py-3 text-lg text-white transition-colors  duration-1000 hover:bg-gradient-to-tr",
        className
      )}
    >
      <IoLogoGithub />
      <span className="ml-2">Sign in with Github</span>
    </button>
  );
};

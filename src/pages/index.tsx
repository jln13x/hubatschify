import type { NextPage } from "next";
import { GitHubLoginButton } from "../components/github-login-button";

const Home: NextPage = () => {
  return (
    <div className="grid h-screen w-screen place-items-center bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="-mt-56">
        <h1 className="text-6xl tracking-tight text-white">
          <span className="bg-gradient-to-br  from-violet-700  to-amber-700 bg-clip-text font-bold text-transparent">
            Hubatschify
          </span>
          <span> your links</span>
        </h1>
        <GitHubLoginButton className="mx-auto mt-12" />
      </div>
    </div>
  );
};

export default Home;

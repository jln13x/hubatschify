import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import type { GetServerSideProps, NextPage } from "next";
import { GitHubLoginButton } from "../components/github-login-button";

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-6xl tracking-tight text-white">
        <span className="bg-gradient-to-br  from-violet-700  to-amber-700 bg-clip-text font-bold text-transparent">
          Hubatschify
        </span>
        <span> your links</span>
      </h1>
      <GitHubLoginButton className="mx-auto mt-12" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/generate-link",
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;

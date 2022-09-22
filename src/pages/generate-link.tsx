import { GenerateLinkForm } from "@/components/generate-link-form";
import { Logout } from "@/components/logout";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import type { GetServerSideProps, NextPage } from "next";

const GenerateLink: NextPage = () => {
  return (
    <div>
      <Logout />
      <GenerateLinkForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

export default GenerateLink;

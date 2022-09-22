import { trpc } from "@/utils/trpc";
import { FormEventHandler } from "react";
import { IoArrowUndo, IoCopy } from "react-icons/io5/index";

export const GenerateLinkForm = () => {
  const {
    data: link,
    mutate: generateLink,
    isLoading,
    error,
    reset,
  } = trpc.useMutation("link.generate");

  if (link) return <LinkCreated slug={link.slug} reset={reset} />;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = formData.get("url");

    if (!url) return;

    generateLink(
      {
        url: url.toString(),
      },
      {
        onSuccess: (data) => toClipboard(appendSlugToUrl(data.slug)),
      }
    );
  };

  const invalidUrl = !!error?.message.includes("Invalid url");
  const unknownError = error && !invalidUrl;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl flex-col items-start  space-y-8 px-4 md:w-1/2 "
    >
      <div className="flex w-full flex-col md:flex-row md:items-center md:space-x-8 md:space-y-0 ">
        <input
          type="text"
          placeholder="Enter your Link..."
          name="url"
          className="relative w-full border-b-2 border-white border-opacity-40 bg-transparent  py-4 text-2xl text-white transition-colors duration-200 placeholder:opacity-60 focus:border-opacity-100 focus:outline-none"
        />

        <button
          className="rounded-lg bg-gradient-to-br from-violet-700 to-amber-700  px-2 py-4 font-bold uppercase tracking-[0.4em] text-white"
          type="submit"
        >
          {isLoading ? "Loading..." : "Hubatschify"}
        </button>
      </div>
      {invalidUrl && <Error msg="The URL is invalid!" />}
      {unknownError && <Error msg="An unknown error occured!" />}
    </form>
  );
};

interface ErrorProps {
  msg: string;
}
const Error = ({ msg }: ErrorProps) => {
  return (
    <p className="w-full rounded-lg bg-rose-900 py-2 px-1 text-center font-bold text-rose-200">
      {msg}
    </p>
  );
};

interface LinkCreatedProps {
  slug: string;
  reset: () => void;
}

const LinkCreated = ({ slug, reset }: LinkCreatedProps) => {
  const handleCopyToClipboard = () => {
    toClipboard(appendSlugToUrl(slug));
  };

  return (
    <div className="flex flex-col items-center space-x-2">
      <div className="text-center">
        <p className="text-xl text-white">
          Your link has been{" "}
          <strong className="inline bg-gradient-to-br from-violet-700 to-amber-700  bg-clip-text font-bold text-transparent">
            hubatschified
          </strong>{" "}
          and copied to your clipboard.
        </p>
        <p className="text-sm text-neutral-400">
          (Yes that&apos;s a real word as of now)
        </p>
      </div>

      <div className="mt-6 flex space-x-6 ">
        <button
          className="flex items-center space-x-2 rounded-lg border p-2 text-sm text-neutral-300"
          onClick={reset}
        >
          <IoArrowUndo />
          <span>Another one</span>
        </button>
        <button
          className="flex items-center space-x-2 rounded-lg border p-2 text-sm text-neutral-300"
          onClick={handleCopyToClipboard}
        >
          <IoCopy />
          <span>Copy to clipboard (again)</span>
        </button>
      </div>
    </div>
  );
};

const appendSlugToUrl = (slug: string) => {
  return `${window.location.origin}/${slug}`;
};

const toClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

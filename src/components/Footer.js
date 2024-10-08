import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-indigo-800 flex w-full flex-row flex-wrap items-center justify-between gap-x-2 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="white" className="font-normal ml-10">
        &copy; 2023 Santino Vitale
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="https://github.com/SantinoVitale"
            color="white"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 mr-10"
          >
            Github
          </Typography>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;

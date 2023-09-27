import { Typography } from "@material-tailwind/react";
 
function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal ml-10">
        &copy; 2023 Santino Vitale
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="https://github.com/SantinoVitale"
            color="blue-gray"
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
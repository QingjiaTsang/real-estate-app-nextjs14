import { Link } from "@nextui-org/react";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type PageTitleProps = {
  title: string;
  backCaption?: string;
  backHref?: string;
  backIcon?: React.ReactNode;
};

const PageTitle = ({
  title,
  backCaption,
  backHref,
  backIcon = <ArrowLeftIcon className="h-6 w-6 md:h-7 md:w-7" />,
}: PageTitleProps) => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-4">
      <Link
          href={backHref}
          className="text-lg font-bold text-black md:text-xl"
        >
          {backIcon}
      </Link>
      <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
      <div/>
    </div>
    // <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-4">
    //   <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
    //   {backCaption && backHref && (
    //     <div className="flex cursor-pointer items-center gap-1">
    //       <div>{backIcon}</div>
    //       <Link
    //         href={backHref}
    //         className="text-lg font-bold text-black md:text-xl"
    //       >
    //         {backCaption}
    //       </Link>
    //     </div>
    //   )}
    // </div>
  );
};

export default PageTitle;

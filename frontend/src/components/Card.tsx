import { ReactNode } from "react";

export interface CardProps {
  title: string;
  titeIcon: ReactNode;
  subTitle?: string;
  body: string;
  date?: string;
  shareIcon: ReactNode;
  deleteIcon: ReactNode;
}

const Card = (props: CardProps) => {
  return (
    <>
      <div className="bg-white shadow-md p-5 rounded-md mt-10 border-[1px] border-gray-300 w-[300px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">
            {props.titeIcon} {props.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-700 text-xl ">
            <h3 className="cursor-pointer">{props.shareIcon}</h3>
            <h3 className="cursor-pointer">{props.deleteIcon}</h3>
          </div>
        </div>
        <h2 className="font-bold text-2xl mb-4">{props.subTitle}</h2>
        <p className="text-md mb-4">{props.body}</p>
        {props.date && (
          <p className="text-gray-500 text-sm">Added on {props.date}</p>
        )}
      </div>
    </>
  );
};

export default Card;

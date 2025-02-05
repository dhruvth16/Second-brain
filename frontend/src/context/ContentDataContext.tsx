import { createContext, Dispatch, SetStateAction } from "react";

export type ContentType = {
  title: string;
  link: string;
  content: string;
  type: string;
};

type ContentContextType = {
  contentData: ContentType[];

  setContentData: Dispatch<SetStateAction<ContentType[]>>;
};

export const ContentDataContext = createContext<ContentContextType>({
  contentData: [],

  setContentData: () => [],
});

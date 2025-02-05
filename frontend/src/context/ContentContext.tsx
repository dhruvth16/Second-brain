import { useState } from "react";
import { ContentDataContext, ContentType } from "./ContentDataContext";

import { ReactNode } from "react";

const ContentContext = ({ children }: { children: ReactNode }) => {
  const [contentData, setContentData] = useState<ContentType[]>([
    {
      title: "",
      link: "",
      content: "",
      type: "",
    },
  ]);

  return (
    <ContentDataContext.Provider value={{ contentData, setContentData }}>
      {children}
    </ContentDataContext.Provider>
  );
};

export default ContentContext;

import SideBar from "../components/SideBar";
import "../App.css";
import "remixicon/fonts/remixicon.css";
import Button from "../components/Button";
import Card from "../components/Card";
import { useContext, useEffect, useRef, useState } from "react";
import AddContent from "../components/AddContent";
import gsap from "gsap";
import { ContentDataContext } from "../context/ContentDataContext";

interface Content {
  title: string;
  type: string;
  content: string;
}

function Home() {
  const [content, setContent] = useState(false);
  const contentRef = useRef(null);
  const { contentData } = useContext(ContentDataContext);

  useEffect(() => {
    if (content && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.3,
      });
    } else if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.3,
      });
    }
  }, [content]);

  return (
    <>
      <div
        className={`h-screen w-full flex relative ${
          content ? "bg-slate-400 opacity-40 blur-[2px]" : ""
        }`}
      >
        <div className="w-[20%] border-r-[1px] border-gray-300 h-screen p-4">
          <SideBar
            title="Second Brain"
            titleLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeemlI4oHh5P482LNs8t88BJrsamSaPCpNDoolJmQsxyMyTX8l"
          />
        </div>
        <div className="w-[80%] py-5 px-8">
          <nav className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">All Notes</h2>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                text="Share Brain"
                size="lg"
                icon={<i className="ri-share-line"></i>}
              />
              <Button
                onClick={() => {
                  setContent(true);
                }}
                variant="primary"
                text="Add Content"
                size="lg"
                icon={<i className="ri-add-large-line"></i>}
              />
            </div>
          </nav>
          <div className="flex flex-wrap gap-5 mt-10">
            {contentData.map((content: Content, index: number) => (
              <Card
                key={index}
                title={content.title}
                titeIcon={<i className="ri-file-add-line"></i>}
                subTitle={content.type}
                body={content.content}
                date="02/02/2025"
                shareIcon={<i className="ri-share-line"></i>}
                deleteIcon={<i className="ri-delete-bin-line"></i>}
              />
            ))}
            <Card
              title="Project Ideas"
              titeIcon={<i className="ri-file-add-line"></i>}
              subTitle="Future Projects"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus vel dolor."
              date="02/02/2025"
              shareIcon={<i className="ri-share-line"></i>}
              deleteIcon={<i className="ri-delete-bin-line"></i>}
            />
          </div>
        </div>
      </div>
      <AddContent contentRef={contentRef} setContent={setContent} />
    </>
  );
}

export default Home;

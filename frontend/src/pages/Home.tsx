import SideBar from "../components/SideBar";
import "../App.css";
import "remixicon/fonts/remixicon.css";
import Button from "../components/Button";
import Card from "../components/Card";
// import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AddContent from "../components/AddContent";
import gsap from "gsap";
// import { useEffect } from "react";
// import axios from "axios";

function Home() {
  //   const [content, setContent] = useState([]);
  const [content, setContent] = useState(false);
  //   const navigate = useNavigate();
  const contentRef = useRef(null);

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

  // useEffect(() => {
  //     const fetchContent = async () => {
  //         const response = axios.post(`${import.meta.env.VITE_BASE_URL}/content`, {
  //             link,
  //             title,
  //             type
  //         })
  //     }
  // },[])

  return (
    <>
      <div className="h-screen w-full flex relative">
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
                  console.log(content);
                }}
                variant="primary"
                text="Add Content"
                size="lg"
                icon={<i className="ri-add-large-line"></i>}
              />
            </div>
          </nav>
          <div className="flex flex-wrap gap-5 mt-10">
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

        <AddContent contentRef={contentRef} setContent={setContent} />
      </div>
    </>
  );
}

export default Home;

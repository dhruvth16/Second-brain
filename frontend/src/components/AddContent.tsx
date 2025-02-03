import { useState } from "react";
import { inputVariants } from "../pages/LoginPage";

interface AddContentProps {
  contentRef: React.MutableRefObject<null>;
  setContent: (value: boolean) => void;
}

const AddContent: React.FC<AddContentProps> = (props) => {
  const [tittle, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      <div
        ref={props.contentRef}
        className="absolute opacity-0 right-[100px] top-[30px]"
      >
        <div className="bg-[#E0E7FF] p-4 w-[500px] rounded-md m-auto mt-10">
          <h2 className="text-2xl font-semibold text-center flex items-center justify-between">
            Add your Rememberings!
            <i
              onClick={() => {
                props.setContent(false);
                console.log("clicked");
              }}
              className="ri-close-line"
            ></i>
          </h2>
          <form
            onClick={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-4 mt-4 w-full">
              <input
                value={tittle}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                className={inputVariants}
              />
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="text"
                placeholder="Link"
                className={inputVariants}
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inputVariants}
                name="type"
                id="type"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="article">Article</option>
                <option value="audio">Audio</option>
              </select>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                className={inputVariants}
              ></textarea>
              <button className="bg-[#5046E2] text-white  px-4 py-2 cursor-pointer rounded-md text-lg flex items-center justify-center gap-2">
                <i className="ri-add-line"></i>
                Add Content
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContent;

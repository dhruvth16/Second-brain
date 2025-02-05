import { inputVariants } from "../pages/LoginPage";
import axios from "axios";
import { ContentDataContext } from "../context/ContentDataContext";
import { Input } from "./Input";
import { useContext, useState } from "react";
import Button from "./Button";

interface AddContentProps {
  contentRef: React.MutableRefObject<null>;
  setContent: (value: boolean) => void;
}

const AddContent: React.FC<AddContentProps> = (props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const { setContentData } = useContext(ContentDataContext);

  const emptyInputFields = () => {
    setTitle("");
    setLink("");
    setContent("");
    setType("");
    setDate("");
  };

  const fetchContent = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/content`,
        {
          link,
          title,
          type,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setContentData(response.data);
      props.setContent(false);
      emptyInputFields();
    } catch (error) {
      console.log(error);
    }
  };

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
              }}
              className="ri-close-line"
            ></i>
          </h2>
          <form
            // onClick={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-4 mt-4 w-full">
              <Input
                value={title}
                setValue={setTitle}
                placeholder="Title"
                type="text"
              />
              <Input
                value={link}
                setValue={setLink}
                placeholder="Link"
                type="text"
              />
              <Input type="date" value={date} setValue={setDate} />

              <select
                value={type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setType(e.target.value)
                }
                className={inputVariants}
                name="type"
                id="type"
              >
                <option value="select an option">Choose one</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="article">Article</option>
                <option value="audio">Audio</option>
              </select>
              <textarea
                value={content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setContent(e.target.value)
                }
                placeholder="Content"
                className={inputVariants}
              ></textarea>
              <Button
                variant="tertiary"
                text="Add Content"
                size="lg"
                onClick={fetchContent}
                icon={<i className="ri-add-line"></i>}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContent;

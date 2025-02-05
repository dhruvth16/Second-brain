import { Link } from "react-router-dom";

export interface SideBarProps {
  title: string;
  titleLink: string;
}

const SideBar = (props: SideBarProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <img className="h-14" src={props.titleLink} alt="" />
        <h1 className="text-2xl tracking-tight font-bold">{props.title}</h1>
      </div>
      <main className="mt-8 ml-5 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-xl text-gray-700">
          <i className="ri-movie-line"></i>
          <h3>Videos</h3>
        </div>
        <div className="flex items-center gap-2 text-xl text-gray-700">
          <i className="ri-file-add-line"></i>
          <h3>Documents</h3>
        </div>
        <div className="flex items-center gap-2 text-xl text-gray-700">
          <i className="ri-link-m"></i>
          <h3>Links</h3>
        </div>
        <div className="flex items-center gap-2 text-xl text-gray-700">
          <i className="ri-hashtag"></i>
          <h3>Tags</h3>
        </div>
      </main>
      <Link className="absolute bottom-1 cursor-pointer" to="/logout">
        <button className="text-xl text-red-600 p-2 rounded-md flex items-center gap-2">
          Logout{" "}
          <h3>
            <i className="ri-logout-circle-r-line"></i>
          </h3>
        </button>
      </Link>
    </>
  );
};

export default SideBar;

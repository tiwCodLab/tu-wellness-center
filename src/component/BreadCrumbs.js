import { useLocation, Link } from "react-router-dom";
const BreadCrumbs = () => {
  const location = useLocation();
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div
          className="crumb bg-gray-200 px-2 py-1 rounded-md text-gray-500 text-sm"
          key={crumb}
        >
          <Link to={currentLink} className="hover:underline">
            {crumb}
          </Link>
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
};
export default BreadCrumbs;

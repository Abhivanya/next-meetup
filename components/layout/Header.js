import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-white flex justify-between items-center  text-black p-3 px-9">
      <Link
        href="/"
        className="text-xl text-white rounded-md font-bold bg-green-500 px-5 py-1"
      >
        My Todos
      </Link>
      <Link href="/completed-todos" className="text-green-600 font-bold">
        Completed Todo's
      </Link>
    </div>
  );
};

export default Header;

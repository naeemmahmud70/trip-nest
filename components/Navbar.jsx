import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import Logout from "./auth/Logout";
import brand from "../public/brand.png";

const Navbar = async ({ sideMenu }) => {
  const session = await auth();
  return (
    <nav>
      <Link href="/">
        <Image src={brand} alt="TripNest Logo" className="w-[200px] h-[70px]" />
      </Link>
      {sideMenu && (
        <ul>
          <li>
            <Link href="/hotels">Hotels</Link>
          </li>

          <li>
            <Link href="/bookings">Bookings</Link>
          </li>

          <li>
            {session?.user ? (
              <idiv>
                <span className="mx-1"> {session?.user?.name} </span>
                <span> | </span>
                <Logout />
              </idiv>
            ) : (
              <Link href="/login" className="login">
                Login
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

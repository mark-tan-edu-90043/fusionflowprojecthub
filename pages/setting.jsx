import Image from "next/image";
import Link from "next/link";

const Setting = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-blue-100">
      <header className="flex justify-between items-center w-full p-4">
        <div className="logo">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          {/* Replace "/logo.svg" with the path to your actual logo */}
        </div>
        <div className="user-info flex items-center">
          <span className="mr-2">&quot;placeholder&quot;</span>
          <Image src="/Group 21.svg" alt="User Icon" width={24} height={24} />
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">Sign out</button>
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        <div className="menu-card bg-white p-6 rounded-lg shadow-md">
          {/* Replace "#" with the actual paths to your routes */}
          <MenuItem icon="/Vector.png" text="Management" link="#" />
          {/*<MenuItem icon="/Group 15.png" text="Setting" link="#" />*/}
          <MenuItem icon="/Group 44.png" text="Notifications" link="#" />
          <MenuItem icon="/Group 23.png" text="Search" link="#" />
          <MenuItem icon="/Group 25.png" text="Help &amp; Support" link="#" />
        </div>
      
      </main>

      <footer className="w-full p-4 flex justify-between items-center">
        <Link href="/admin-sign-in" legacyBehavior>
          <a className="flex items-center">
            <Image src="/Group 4.svg" alt="Admin Sign In" width={24} height={24} />
            <span className="ml-2 text-blue-600">Admin Sign in</span>
          </a>
        </Link>
        <div className="text-gray-500 text-sm">
          <p>Copy Right 2023</p>
          <Link href="/report" legacyBehavior><a>Report</a></Link>
        </div>
      </footer>
    </div>
  );
}

const MenuItem = ({ icon, text, link }) => (
  <Link href={link} legacyBehavior>
    <a className="flex items-center p-2 my-2 bg-gray-100 rounded hover:bg-gray-200">
      <Image src={icon} alt={text} width={24} height={24} />
      {/* Replace the icon prop with the path to the actual icons */}
      <span className="ml-2">{text}</span>
    </a>
  </Link>
);
export default Setting;

import Link from "next/link";

export default function Home() {
  return (

      
        <div className="bg-[#614419] min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-200 rounded-xl shadow-2xl max-w-4xl w-full p-10  min-h-[65vh] transition-all duration-300 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-4 py-11">
                 <h1>Welcome to </h1>
                 <h1>YourApp Profile</h1>
              </div>
              <p className="text-gray-900 mb-8">
                Get started by logging in or creating a new account.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 py-8">
                <Link href="/login">
                  <button className="bg-[#614419] text-white px-6 py-3 rounded-lg hover:bg-[#FFB343] transition-colors duration-300">
                    Log In
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-[#614419] text-white px-6 py-3 rounded-lg hover:bg-[#FFB343] transition-colors duration-300">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    



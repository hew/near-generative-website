export default function AuthFailure() {
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col pb-12">
        <h1 className="text-xl mt-6 font-bold">
          Failed to authenticate with the NEAR network.
        </h1>
        <a href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go back to home page
          </button>
        </a>
      </div>
    </div>
  );
}

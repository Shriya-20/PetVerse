export default function DeleteAccount() {
  return (
    <>
      <div className="m-2">
        <p className="text-red-400 block mb-2">
          * Warning! Once deleted account cannot be restored
        </p>
        <input
          placeholder="type 'CONFIRM' to delete your account"
          className="w-1/3 p-2 border-1 border-dark1 rounded hover:bg-slate-100 mr-2 dark:bg-mid4"
        />
        <button className="bg-red-600 text-textLighter p-2 rounded-md md:w-1/6 hover:bg-red-700">
          Delete
        </button>
      </div>
    </>
  );
}

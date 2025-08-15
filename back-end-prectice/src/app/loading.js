export default function Loading() {
  return (
    <div className="h-screen bg-amber-100">
      <img src="loading-img.gif" alt="loading.." className='rounded-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' />
    </div>
  );
}
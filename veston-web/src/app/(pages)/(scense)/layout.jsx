import HeaderHome from '@/app/layouts/home/HeaderMain';
import NavHome from '@/app/layouts/home/NavMain';

export default function HomeLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <NavHome />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <HeaderHome />
          <main className="flex flex-1 items-start gap-4 p-6">{children}</main>
        </div>
      </div>
    </>
  );
}

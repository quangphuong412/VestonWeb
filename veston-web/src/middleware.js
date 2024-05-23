import { NextResponse } from 'next/server';
const authPaths = ['/auth/login', '/auth/register', '/api/auth/login'];

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get('token')?.value;
  console.log('Jay Trương');
  console.log('========>start<========');
  console.log(`sessionToken-> ${sessionToken ? true : false}`);
  console.log(`request -> --${pathname}--`);
  let endPoint = false;
  // Chưa đăng nhập thì không cho vào private paths
  if (!sessionToken) {
    if (
      pathname !== '/auth/login' &&
      pathname !== '/auth/register' &&
      pathname !== '/auth/logout'
    ) {
      console.log('server redirect to logout');
      endPoint = '/auth/logout';
    } else if (pathname === '/auth/logout') {
      console.log('server redirect to login');
      endPoint = '/auth/login';
    }
  } else {
    // Đăng nhập rồi thì không cho vào login/register nữa
    if (authPaths.some((path) => pathname.startsWith(path))) {
      console.log('server redirect to Home');
      endPoint = '/home';
    }
  }
  if (pathname === '/') {
    console.log('server redirect to home with /');
    endPoint = '/home';
  }
  console.log(`endpoint -> --${endPoint}--`);
  console.log(`========> end <========`);
  if (endPoint) {
    return NextResponse.redirect(new URL(endPoint, request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/home',
    '/branch',
    '/employee',
    '/api/resource/employee/searchemployee',
  ],
};

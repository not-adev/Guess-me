import { NextResponse } from "next/server";

export function  middleware(Request){
    const token = Request.cookies.get('token')?.value || '' 
    const prot= Request.nextUrl.pathname.startsWith('/user_login_sinup')
    if (token && prot){
        return NextResponse.redirect(new URL ('/main' , Request.url))

    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/user_login_sinup/:path*'],
};
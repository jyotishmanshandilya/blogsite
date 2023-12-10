// middleware.js
// 'use server'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function setCookie() {
    // Set a cookie
    const cookie = cookies().set('name', 'value', {
        httpOnly: true,
        maxAge: 60 * 60 , //1 hr 
        path: '/',
        sameSite: true,
    });

    // Get the cookie
    const response = cookies(req).get('name');
    console.log('Cookie:', response);

    // Call next to move to the next middleware or the API route
    return NextResponse.next();

}

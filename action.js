// middleware.js
'use server'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import uuid4 from "uuid4";

export async function setCookie(username) {
    // Get the cookie 
    const cookie = cookies().get('token');
    if(cookie){
        console.log('cookie exits:', cookie);
        return NextResponse.next();
    }

    // Generate a new UUID
    //var id = uuid4();

    // Validate a UUID as proper V4 format (case-insensitive)
   // uuid4.valid(id); // true

    // Set a cookie
    const response = cookies().set('token', username, {
        httpOnly: true,
        maxAge: 60 * 60 , //1 hr 
        path: '/',
        sameSite: true,
    });

    console.log('Cookie:', response);

    // Call next to move to the next middleware or the API route
    return NextResponse.next();
}

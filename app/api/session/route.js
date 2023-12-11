import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const session = cookies().get('token');
    if(session){
        console.log('Session: ', session);
        return NextResponse.json(session, {status: 200});
    }
    return NextResponse.json({err: "Session does not exists"}, {status: 404});
}
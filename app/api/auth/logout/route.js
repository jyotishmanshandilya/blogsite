import { NextResponse } from "next/server";
import { deleteCookie } from '@/action';

export async function GET(){
    const response = deleteCookie();
    if(!response){
        return NextResponse.json({error: "Failed to delete cookie"}, {status: 200});
    }
    return NextResponse.json(response, {status: 200});
}
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(){
    //get username from cookies
    const token = cookies().get('token');
    const username = token.value;
    console.log('Username: ', username);

    // get userinfo using the username
    try {
        const userData = await prisma.user.findUnique({
            where:{
                username: username,
            }, 
            include: {
                blogs: true,
            }
        })
        if(!userData){
            return NextResponse.json({msg: "User Not Found"}, {status: 404});
        }
        console.log("user Data: ", userData);
        return NextResponse.json(userData, {status: 200});
    } catch (error) {
        return NextResponse.json({err: error}, {status: 500});
    }
}
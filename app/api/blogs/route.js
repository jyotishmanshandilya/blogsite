import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(){
    try{
        const allBlogs = await prisma.blog.findMany()
        if(!allBlogs){
            console.log("No blogs currently");
            return NextResponse.json({error: "No blogs found"}, {status: 404});
        }
        //console.log(allBlogs);
        return NextResponse.json(allBlogs, {status: 200});
    }
    catch(err){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
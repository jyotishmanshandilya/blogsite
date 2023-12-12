import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { json } from "express";
const prisma = new PrismaClient();

export async function POST(req){
    
    try {
        //first get cookie value (i.e the username)
        const token = cookies().get('token');
        console.log("token: ", token);
        //next, get the authorId using the username
        try{
            const userInfo = await prisma.user.findUnique({
                where:{
                    username:token.value,
                }
            });
            console.log('User info: ', userInfo);
            try {
                //enter the authorId while getting creating the blog
                const body = await req.json();
                const {title, content} = body;
                
                const newBlog = await prisma.blog.create({
                    data:{
                        title: title,
                        content: content,
                        authorId: userInfo.u_id,
                    }
                });
                console.log('New Blog: ', newBlog);
                return NextResponse.json(newBlog, {status: 200}); 

            } catch (error) {
                return NextResponse.json({err: error}, {status: 500});
            }
        }
        catch(error){
            return NextResponse.json({err: error}, {status: 500});
        }  
    } catch (error) {
        return NextResponse.json({err: error}, {status: 500});
    }
}
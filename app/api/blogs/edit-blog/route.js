import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
const prisma = new PrismaClient();

export async function PATCH(req){
    const body = await req.json();
    const { blog_id, blogData} = body;
    // console.log("Blog_id, BlogData", blog_id, blogData);
    // console.log("Blog Data title, content", blogData.title, blogData.content);
    try {
        const editBlog = await prisma.blog.update({
            where: {
                b_id: blog_id,
            },
            data:{
                title: blogData.title,
                content: blogData.content,
            }
        });
        if(editBlog){
            console.log("Edited Blog ",editBlog);
            return NextResponse.json(editBlog, {status: 200});
        }
        return NextResponse.json({error: "Failed to edit blog"}, {status: 401});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
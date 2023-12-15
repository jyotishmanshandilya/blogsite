import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PATCH(req) {
    const body = await req.json();
    const { blog_id } = body;
    // console.log("Blog Id:", blog_id);

    try {
        const updateStatus = await prisma.blog.update({
            where: {
                b_id: blog_id,
            },
            data:{
                published: true,
            }
        })
        // console.log("Updated Status: ", updateStatus);
        return NextResponse.json(updateStatus, {status: 200});
    } catch (error) {
        return NextResponse.json({err: "Internal Server Error"}, {status: 500});   
    }
}
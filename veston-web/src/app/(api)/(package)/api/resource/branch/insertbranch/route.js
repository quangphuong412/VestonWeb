import { NextResponse } from 'next/server';
import * as z from 'zod';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    //input validation
    const userSchema = z.object({
      area_id: z.string().min(1),
      area_nm: z.string().min(1),
      branch_id: z.string().min(1),
      branch_nm: z.string().min(1),
      email: z.string().min(1),
      phone: z.string().min(1),
      address: z.string().min(1),
      del_yn: z.string().min(1),
      headoffice_yn: z.string().min(1),
      cre_usr_id: z.string().min(1),
      upd_usr_id: z.string().min(1),
    });
    const body = await req.json();

    const {
      area_id,
      area_nm,
      branch_id,
      branch_nm,
      email,
      phone,
      address,
      headoffice_yn,
      cre_usr_id,
      upd_usr_id,
      del_yn,
    } = userSchema.parse(body);
    const existingBranch = await prisma.branch.findFirst({
      where: {
        AND: [
          { area_id: { equals: area_id } },
          { branch_id: { equals: branch_id } },
        ],
      },
      select: {
        area_id: true,
        branch_id: true,
      },
    });

    if (!existingBranch) {
      const creBranch = await prisma.branch.create({
        data: {
          area_id: area_id,
          area_nm: area_nm,
          branch_id: branch_id,
          branch_nm: branch_nm,
          email: email,
          phone: phone,
          address: address,
          headoffice_yn: headoffice_yn,
          cre_usr_id: cre_usr_id,
          upd_usr_id: upd_usr_id,
          del_yn: del_yn,
        },
      });
      return NextResponse.json(
        ResponseObject(200, LOGIN_MESSAGE.SAVE_SUCCESS, [], {
          area_id,
          area_nm,
          branch_id,
          branch_nm,
          email,
          phone,
          address,
          headoffice_yn,
          cre_usr_id,
          upd_usr_id,
          del_yn,
        })
      );
    } else {
      NextResponse.json(
        ResponseObject(409, LOGIN_MESSAGE.EXISTING_DATA, [], 'Branch', null)
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(400, LOGIN_MESSAGE.FAILED, [], 'Branch', null)
    );
  } finally {
    await prisma.$disconnect();
  }
}

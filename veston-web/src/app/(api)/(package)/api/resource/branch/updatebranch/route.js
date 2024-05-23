import { NextResponse } from 'next/server';
import * as z from 'zod';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const userSchema = z.object({
      area_id: z.string(),
      //   area_nm: z.string(),
      branch_id: z.string(),
      //   branch_nm: z.string(),
      //   email: z.string(),
      //   phone: z.string(),
      //   address: z.string(),
      //   del_yn: z.string(),
      //   headoffice_yn: z.string(),
      //   upd_usr_id: z.string(),
    });

    const body = await req.json();

    if (Object.keys(body).length > 0) {
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
      } = body;

      var searchOtp = {
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
      };

      const filteredObj = Object.fromEntries(
        Object.entries(searchOtp).filter(
          ([key, value]) =>
            value !== null && value !== undefined && value !== ''
        )
      );

      if (area_id && branch_id) {
        const updateBranch = await prisma.branch.updateMany({
          where: {
            branch_id: { equals: branch_id },
            area_id: { equals: area_id },
          },
          data: filteredObj,
        });
        if (updateBranch.count > 0) {
          return NextResponse.json(
            ResponseObject(
              200,
              LOGIN_MESSAGE.SAVE_SUCCESS,
              [],
              'Branch',
              filteredObj
            )
          );
        } else {
          return NextResponse.json(
            ResponseObject(404, LOGIN_MESSAGE.UPDATE_FAILED, [], 'Branch', null)
          );
        }
      } else {
        return NextResponse.json(
          ResponseObject(
            404,
            LOGIN_MESSAGE.MISSING_PRIMARY_KEY,
            [],
            'Branch',
            null
          )
        );
      }

      // console.log(updateBranch);
    } else {
      return NextResponse.json(
        ResponseObject(
          404,
          LOGIN_MESSAGE.MISSING_PARAMETER,
          [],
          'Branch',
          error
        )
      );
    }
  } catch (error) {
    return NextResponse.json(
      ResponseObject(400, LOGIN_MESSAGE.FAILED, [], 'Branch', error)
    );
  } finally {
    await prisma.$disconnect();
  }
}

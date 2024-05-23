import prisma from '@/app/(api)/db/db';
import { NextResponse } from 'next/server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { LOGIN_MESSAGE } from '@/message';

export async function POST(req) {
  try {
    //input validation
    const userSchema = z
      .object({
        usrname: z.string().min(1, 'Yêu cầu tài khoản.').max(100),
        email: z.string().min(1, 'Yêu cầu email.').email('Invalid email'),
        password: z
          .string()
          .min(1, 'Yêu cầu nhập mật khẩu.')
          .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.'),
        confirmPassword: z.string().min(1, 'Yêu cầu xác nhận lại mật khẩu.'),
        employee_nm: z.string(),
        branch_id: z.string(),
        employee_id: z.string(),
        cre_usr_id: z.string(),
        upd_usr_id: z.string()
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Mật khẩu xác thực không chính xác.',
      });

    //get data from Form
    const body = await req.json();
    //init data
    const {
      usrname,
      password,
      confirmPassword,
      email,
      employee_nm,
      role = "SUPPERADMIN",
      cre_usr_id,
      employee_id,
      branch_id,
      del_yn = "N",
    } = userSchema.parse(body);

    const existingUser = await prisma.account.findFirst({
      where: {
        OR: [
          { usrname: { equals: usrname } },
          { usr_email: { equals: email } },
        ],
      },
      select: {
        usrname: true,
        usr_email: true,
      },
    });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 16);
      console.log(hashedPassword);
      const creAccount = await prisma.account.create({
        data: {
          usr_email: email,
          usr_name: employee_nm,
          usrname: usrname,
          password: hashedPassword,
          role: role,
          branch_id: branch_id,
          del_yn: del_yn,
          cre_usr_id: cre_usr_id,
          upd_usr_id: cre_usr_id,
          employee: {
            connect: {
              employee_id: employee_id,
            },
          },
        },
      });
      return NextResponse.json(
        {
          user: {
            usrname,
            password,
            email,
            employee_nm,
            role,
            cre_usr_id,
            branch_id,
            del_yn,
          },
          message: LOGIN_MESSAGE.REGISTER_SUCCESS,
        },
        { status: 1 }
      );
    } else {
      return NextResponse.json(
        { usrname: existingUser, message: LOGIN_MESSAGE.REGISTER_FAILED },
        { status: 0 }
      );
    }
  } catch (error) {
    console.log('Failed: ', error);
    return NextResponse.json({ succes: false, message: error });
  } finally {
    await prisma.$disconnect();
  }
}

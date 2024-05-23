import { NextResponse } from 'next/server';
import * as z from 'zod';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const body = await req.json();

    if (Object.keys(body).length > 0)  {

      const {
        position,
        salary,
        employee_id,
        employee_nm,
        birthday,
        gender,
        password,
        address,
        phone,
        email
      } = body;

      const salInt = parseInt(salary, 10);

      const hashedPassword = await bcrypt.hash(password, 16);

      const updateEmp = await prisma.employee.update({
        where: {
          employee_id: employee_id,
        },
        data: {
          employee_nm: employee_nm,
          position: position,
          salary: salInt,
          birthday: birthday,
          gender: gender,
          address: address,
          phone: phone,
          email: email,
        },
      });
      if(updateEmp){
        return NextResponse.json(
          ResponseObject(
            1,
            LOGIN_MESSAGE.SAVE_SUCCESS,
            updateEmp,
            'Employee',
            null
          )
        );
      }else{
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.UPDATE_FAILED, [], 'Employee', null)
        );
      }
    }
    // if(checkEmp.length > 0 ){
    //   
  } catch (error) {
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Employee', error)
    );
  } finally {
    await prisma.$disconnect();
  }
}

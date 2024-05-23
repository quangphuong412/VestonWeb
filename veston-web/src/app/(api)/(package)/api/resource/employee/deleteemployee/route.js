import { NextResponse } from 'next/server';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';

export async function POST(req) {
  try {
    const body = await req.json();
    
    const {
      employee_id,
    } = body;

    const del_ynEmp = 'Y';

      if(body){
        const updateEmp = await prisma.employee.updateMany({
          where: {
            employee_id: {
              in: employee_id
            }
          },
          data: {
            del_yn: del_ynEmp,
          },
        });
        if(updateEmp){
          return NextResponse.json(
            ResponseObject(
              1,
              LOGIN_MESSAGE.DELETE_SUCESS,
              updateEmp,
              'Employee',
              null
            )
          );
        }
      }else{
        return NextResponse.json(
          ResponseObject(0, LOGIN_MESSAGE.DELETE_FAILED, [], 'Employee', null)
        );
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

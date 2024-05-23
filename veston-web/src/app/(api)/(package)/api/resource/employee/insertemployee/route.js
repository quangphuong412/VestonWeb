import { NextResponse } from 'next/server';
import * as z from 'zod';
import { LOGIN_MESSAGE } from '@/message';
import ResponseObject from '../../responseObject';
import prisma from '@/app/(api)/db/db';
import moment from 'moment';

export async function POST(req) {
  try {
    //input validation
    
    const body = await req.json();


    const {
      area_id,
      branch_id,
      employee_nm,
      position,
      salary,
      birthday,
      gender,
      address,
      phone,
      email,
      cre_usr_id,
    } = body;

  
    const salInt = parseInt(salary, 10);

    const existingEmployee = await prisma.employee.findFirst({
      select: {
        employee_id: true,
      },
      orderBy: { cre_dt: 'desc' },
    });

    const existEmail = await prisma.employee.findFirst({
      where: {
        email: email
      },
      select: {
        employee_id: true,
      },
    })

    var cre_emp = '';
    var empDate = moment(new Date()).format('YYYYMMDD');
    
    empDate = empDate.substring(2, 6);


    if (existingEmployee) {
      cre_emp = existingEmployee.employee_id.slice(4);
      cre_emp = (cre_emp * 1 + 1).toString().padStart(cre_emp.length, '0');
      cre_emp = empDate + cre_emp;
    } else {
      cre_emp = empDate + '01';
    }

    var datetimeBirth = new Date(birthday).toISOString();


    if(!existEmail){
      const insertEmployee = await prisma.employee.create({
        data: {
          employee_id: cre_emp,
          employee_nm: employee_nm,
          email: email,
          position: position,
          salary: salInt,
          birthday: datetimeBirth,
          del_yn: 'N',
          gender: gender,
          address: address,
          phone: phone,
          cre_usr_id: cre_usr_id,
          upd_usr_id: cre_usr_id,
          Branch: {
            connect: {
              area_id_branch_id: { area_id, branch_id },
            },
          },
        },
      });
      return NextResponse.json(
        ResponseObject(1, LOGIN_MESSAGE.SAVE_SUCCESS, insertEmployee, 'Employee', body)
      );
    }else{
      return NextResponse.json(
        ResponseObject(0, LOGIN_MESSAGE.EXISTING_EMAIL, existEmail, 'Employee', body)
      );
    }
  
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      ResponseObject(0, LOGIN_MESSAGE.FAILED, [], 'Employee', error)
    );
  } finally {
    await prisma.$disconnect();
  }
}

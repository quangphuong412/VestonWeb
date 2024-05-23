'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CustomTable from '@/app/components/CustomTable';
import {
  setItemDetailRequest,
  refreshBranch,
} from '@/app/redux/slice/scense/branch';

export default function TableBranch() {
  const dataSource = useSelector((state) => state.branch.dataSource);
  const dispatch = useDispatch();
  const [selecteds, setSelecteds] = useState([]);

  const getSelectedKeys = (selectedArray) => {
    setSelecteds(selectedArray);
  };
  const handleEditRequest = async (paramsEdit) => {
    paramsEdit = { ...paramsEdit, flgTp: 'U' };
    dispatch(setItemDetailRequest(paramsEdit));
  };
  const handleDetailRequest = async (paramsDetail) => {
    paramsDetail = { ...paramsDetail, flgTp: 'R' };
    dispatch(setItemDetailRequest(paramsDetail));
  };

  const handleAddRequest = async (paramsAdd) => {
    paramsAdd = { ...paramsAdd, flgTp: 'I' };
    dispatch(setItemDetailRequest(paramsAdd));
  };

  const columns = [
    {
      isSelect: true,
    },
    {
      title: 'No.',
      children: (_record, index) => {
        return <>{index}</>;
      },
    },
    {
      title: 'Name',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.branch_nm}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              (ID: {record.branch_id})
            </div>
          </>
        );
      },
    },
    {
      title: 'Phone',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.phone}</div>
          </>
        );
      },
    },
    {
      title: 'Email',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.email}</div>
          </>
        );
      },
    },
    {
      title: 'Address',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.address}</div>
          </>
        );
      },
    },
    {
      title: 'Area',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.area_nm}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              (ID: {record.area_id})
            </div>
          </>
        );
      },
    },
    {
      title: 'Head Office',
      children: (record, _index) => {
        return (
          <>
            <div className="font-medium">{record.headoffice_yn}</div>
          </>
        );
      },
    },
    {
      title: 'Action',
      children: (record, _index) => {
        return (
          <>
            <Button onClick={() => handleEditRequest(record)}>Edit</Button>
            <Button onClick={() => handleDetailRequest(record)}>Detail</Button>
          </>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle className="text-2xl">Result</CardTitle>
        {/* <CardDescription>Recent Users.</CardDescription> */}
      </CardHeader>
      <CardContent className="flex justify-end">
        <div className="flex space-x-4 p-4 rounded-lg">
          <Button onClick={() => handleAddRequest({})}>Add</Button>
          <Button>Delete</Button>
        </div>
      </CardContent>
      <CardContent>
        <CustomTable
          keyTable={'branch_id'}
          columns={columns}
          dataSource={dataSource}
          getSelectedKeys={getSelectedKeys}
        />
      </CardContent>
    </Card>
  );
}

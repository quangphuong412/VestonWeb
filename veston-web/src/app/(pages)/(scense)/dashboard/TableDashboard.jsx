'use client';
import React, { useState } from 'react'
import CustomTable from '@/app/components/CustomTable';

export default function TableDashboard() {
    const [selecteds, setSelecteds] = useState([]);

    const getSelectedKeys = (selectedArray) => {
        console.log(selecteds)
        setSelecteds(selectedArray);
    }

    const colums = [
        {
            isSelect: true
        },
        {
            title: 'No.',
            children: (_record, index) => {
                return (
                    <>
                        {index}
                    </>
                )
            },
        },
        {
            title: 'Name',
            children: (record, _index) => {
                return (
                    <>
                        <div className="font-medium">{record.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            {record.email}
                        </div>
                    </>
                )
            },
        },
        {
            title: 'Age',
            children: (record, _index) => {
                return (
                    <>
                        <div className="font-medium">{record.age}</div>
                    </>
                )
            },
        },
    ]

    const dataSource = [
        {
            id: 0,
            usr_email: 'anh@asdasd.com',
            usr_name: "Truong Dinh Anh",
            age: "25",
            email: "1123123@3123123"
        },
        {
            id: 1,
            usr_email: 'quy@asdasd.com',
            usr_name: "Tran Phu Quy",
            age: "25",
            email: "1123123@3123123"
        }
    ];
    return (
        <CustomTable
            keyTable='id'
            getSelectedKeys={getSelectedKeys}
            colums={colums}
            dataSource={dataSource}
        />
    )
}

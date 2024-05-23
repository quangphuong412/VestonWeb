'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

export default function CustomTable({
  dataSource,
  className,
  columns,
  props,
  getSelectedKeys,
  keyTable = '',
}) {
  const [selectedArray, setSelectedArray] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState(null);
  const [selectedObj, setSelectedObj] = useState({});
  const [isCheckAll, setIsCheckAll] = useState(false);


  useEffect(() => {
    let selectedArrayTmp = selectedArray;
    let selectedObjTMP = selectedObj;
    if (selectedRowKeys !== null) {
      if (!selectedRowKeys.includes('checkAll')) {
        setIsCheckAll(false);
        if (selectedRowKeys.includes('-')) {
          const arraySlit = selectedRowKeys.split('-');
          if (arraySlit[0].includes('uncheck')) {
            selectedArrayTmp.splice(selectedArrayTmp.indexOf(arraySlit[1]), 1);
            selectedObjTMP[arraySlit[1]] = false;
          } else {
            selectedArrayTmp.push(arraySlit[1]);
            selectedObjTMP[arraySlit[1]] = true;
          }
          if (selectedArrayTmp.length == dataSource.length) {
            setIsCheckAll(true);
          }
        }
      } else {
        if (selectedRowKeys.includes('uncheckAll')) {
          setIsCheckAll(false);
          selectedArrayTmp = [];
          selectedObjTMP = {};
        } else {
          selectedArrayTmp = [];
          selectedObjTMP = {};
          dataSource.map((record) => {
            const id = record[keyTable];
            selectedArrayTmp.push(id);
            selectedObjTMP[id] = true;
          });
          setIsCheckAll(true);
        }
      }
      setSelectedObj(selectedObjTMP);
      setSelectedArray(selectedArrayTmp);
      getSelectedKeys(selectedArrayTmp);
    }

    setSelectedRowKeys(null);
  }, [selectedRowKeys]);

  return (
    <>
      <Table {...props} className={className ?? ''}>
        <TableHeader>
          <TableRow>
            {columns &&
              columns.map((e) => {
                const onCheckedChange = (checked) => {
                  checked
                    ? setSelectedRowKeys(`checkAll`)
                    : setSelectedRowKeys(`uncheckAll`);
                };
                return (
                  <TableHead
                    key={`header-${e.title}`}
                    className={`hidden sm:table-cell ${
                      e.className ? e.className : ''
                    }`}
                  >
                    {e.isSelect && e.isSelect ? (
                      <>
                        <Checkbox
                          key="all"
                          checked={isCheckAll}
                          onCheckedChange={onCheckedChange}
                        />
                      </>
                    ) : (
                      <>{e.title ?? ''}</>
                    )}
                  </TableHead>
                );
              })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSource &&
            dataSource.map((record, index) => {
              return (
                <>
                  <TableRow key={record[keyTable]} className="bg-accent">
                    {columns &&
                      columns.map((col) => {
                        if (col.isSelect) {
                          const onCheckedChange = (checked) => {
                            checked
                              ? setSelectedRowKeys(`check-${record[keyTable]}`)
                              : setSelectedRowKeys(
                                  `uncheck-${record[keyTable]}`
                                );
                          };

                          return (
                            <>
                              <TableCell
                                key={`body-${col.coll}`}
                                className={col.className ? col.className : ''}
                              >
                                <Checkbox
                                  key={record[keyTable]}
                                  checked={
                                    selectedObj[record[keyTable]] &&
                                    selectedObj[record[keyTable]]
                                      ? true
                                      : false
                                  }
                                  onCheckedChange={onCheckedChange}
                                  id={record[keyTable]}
                                />
                              </TableCell>
                            </>
                          );
                        } else {
                          return (
                            <TableCell
                              key={`body-${col.coll}`}
                              className={col.className ? col.className : ''}
                            >
                              {col.children(record, index)}
                            </TableCell>
                          );
                        }
                      })}
                  </TableRow>
                </>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
